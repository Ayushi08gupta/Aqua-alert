// Real-time verification engine for map dashboard
export interface VerificationResult {
  status: 'verified' | 'pending' | 'rejected'
  confidence: number
  sources: string[]
  timestamp: string
}

export interface ReportSource {
  type: 'officer' | 'social' | 'sensor' | 'public'
  data: any
  timestamp: string
  location: { lat: number; lng: number }
  credibility: number
}

export class MapVerificationEngine {
  private static readonly VERIFICATION_THRESHOLD = 0.7
  private static readonly PROXIMITY_THRESHOLD = 5 // km
  private static readonly TIME_THRESHOLD = 3600000 // 1 hour in ms

  static async verifyReport(report: any, sources: ReportSource[]): Promise<VerificationResult> {
    const scores = {
      temporal: this.calculateTemporalScore(report, sources),
      geospatial: this.calculateGeospatialScore(report, sources),
      source: this.calculateSourceScore(sources),
      nlp: await this.calculateNLPScore(report, sources)
    }

    const confidence = Object.values(scores).reduce((a, b) => a + b, 0) / 4
    const matchingSources = sources.filter(s => this.isRelevantSource(report, s))

    return {
      status: confidence >= this.VERIFICATION_THRESHOLD ? 'verified' : 
              confidence >= 0.4 ? 'pending' : 'rejected',
      confidence,
      sources: matchingSources.map(s => s.type),
      timestamp: new Date().toISOString()
    }
  }

  private static calculateTemporalScore(report: any, sources: ReportSource[]): number {
    const reportTime = new Date(report.created_at).getTime()
    const recentSources = sources.filter(s => {
      const sourceTime = new Date(s.timestamp).getTime()
      return Math.abs(reportTime - sourceTime) <= this.TIME_THRESHOLD
    })
    return Math.min(recentSources.length / 3, 1.0)
  }

  private static calculateGeospatialScore(report: any, sources: ReportSource[]): number {
    const nearbySources = sources.filter(s => 
      this.calculateDistance(report.latitude, report.longitude, s.location.lat, s.location.lng) <= this.PROXIMITY_THRESHOLD
    )
    return Math.min(nearbySources.length / 2, 1.0)
  }

  private static calculateSourceScore(sources: ReportSource[]): number {
    const officerSources = sources.filter(s => s.type === 'officer')
    const socialSources = sources.filter(s => s.type === 'social' && s.credibility > 0.6)
    
    let score = 0
    if (officerSources.length > 0) score += 0.5
    if (socialSources.length >= 2) score += 0.3
    if (sources.filter(s => s.type === 'sensor').length > 0) score += 0.2
    
    return Math.min(score, 1.0)
  }

  private static async calculateNLPScore(report: any, sources: ReportSource[]): Promise<number> {
    const emergencyKeywords = ['tsunami', 'flood', 'cyclone', 'emergency', 'urgent', 'danger', 'evacuation']
    const reportText = report.description.toLowerCase()
    
    let keywordMatches = 0
    emergencyKeywords.forEach(keyword => {
      if (reportText.includes(keyword)) keywordMatches++
    })
    
    const socialTexts = sources
      .filter(s => s.type === 'social')
      .map(s => s.data.text?.toLowerCase() || '')
    
    let socialMatches = 0
    socialTexts.forEach(text => {
      emergencyKeywords.forEach(keyword => {
        if (text.includes(keyword)) socialMatches++
      })
    })
    
    return Math.min((keywordMatches + socialMatches) / 10, 1.0)
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  private static isRelevantSource(report: any, source: ReportSource): boolean {
    const timeMatch = Math.abs(new Date(report.created_at).getTime() - new Date(source.timestamp).getTime()) <= this.TIME_THRESHOLD
    const locationMatch = this.calculateDistance(report.latitude, report.longitude, source.location.lat, source.location.lng) <= this.PROXIMITY_THRESHOLD
    return timeMatch && locationMatch
  }
}

// Real-time data fusion service
export class DataFusionService {
  private static sources: ReportSource[] = []

  static addSource(source: ReportSource) {
    this.sources.push(source)
    this.cleanOldSources()
  }

  static getSources(): ReportSource[] {
    return this.sources
  }

  private static cleanOldSources() {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000) // 24 hours
    this.sources = this.sources.filter(s => new Date(s.timestamp).getTime() > cutoff)
  }

  static async processIncomingReport(report: any): Promise<VerificationResult> {
    const relevantSources = this.sources.filter(s => 
      MapVerificationEngine['isRelevantSource'](report, s)
    )
    return MapVerificationEngine.verifyReport(report, relevantSources)
  }
}