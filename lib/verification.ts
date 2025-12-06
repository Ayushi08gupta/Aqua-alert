// Multi-layered verification system for ocean hazard reports

export interface VerificationScore {
  overall: number
  geospatial: number
  temporal: number
  source: number
  content: number
  crossSource: number
}

export interface VerificationResult {
  status: 'pending' | 'verified' | 'unverified' | 'false'
  score: VerificationScore
  tier: 1 | 2 | 3
  flags: string[]
  confidence: 'low' | 'medium' | 'high'
}

// Tier 1: Automated Verification
export class AutomatedVerification {
  static async verifyReport(report: any): Promise<VerificationResult> {
    const score: VerificationScore = {
      overall: 0,
      geospatial: await this.checkGeospatial(report),
      temporal: await this.checkTemporal(report),
      source: await this.checkSource(report),
      content: await this.checkContent(report),
      crossSource: 0
    }

    score.overall = (score.geospatial + score.temporal + score.source + score.content) / 4

    return {
      status: score.overall > 0.7 ? 'verified' : 'pending',
      score,
      tier: 1,
      flags: this.generateFlags(score),
      confidence: score.overall > 0.8 ? 'high' : score.overall > 0.5 ? 'medium' : 'low'
    }
  }

  private static async checkGeospatial(report: any): Promise<number> {
    // Check GPS metadata and location validity
    if (!report.latitude || !report.longitude) return 0.2
    
    // Validate coordinates are within Indian coastal regions
    const isValidCoastal = this.isIndianCoastalRegion(report.latitude, report.longitude)
    return isValidCoastal ? 0.8 : 0.4
  }

  private static async checkTemporal(report: any): Promise<number> {
    const now = new Date()
    const reportTime = new Date(report.created_at)
    const timeDiff = Math.abs(now.getTime() - reportTime.getTime()) / (1000 * 60 * 60) // hours
    
    // Recent reports get higher scores
    if (timeDiff < 1) return 0.9
    if (timeDiff < 6) return 0.7
    if (timeDiff < 24) return 0.5
    return 0.3
  }

  private static async checkSource(report: any): Promise<number> {
    // User reputation scoring
    const userScore = report.user_reputation || 0.5
    const hasMedia = report.image_url ? 0.3 : 0
    return Math.min(userScore + hasMedia, 1.0)
  }

  private static async checkContent(report: any): Promise<number> {
    // Content authenticity checks
    let score = 0.5
    
    // Check for duplicate content
    if (await this.isDuplicate(report)) score -= 0.3
    
    // Severity keyword analysis
    const severityScore = this.analyzeSeverity(report.description)
    score += severityScore * 0.3
    
    return Math.max(0, Math.min(score, 1.0))
  }

  private static isIndianCoastalRegion(lat: number, lng: number): boolean {
    // Simplified check for Indian coastal regions
    return lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97
  }

  private static async isDuplicate(report: any): Promise<boolean> {
    // Simplified duplicate detection
    return false // Would implement perceptual hashing
  }

  private static analyzeSeverity(description: string): number {
    const criticalWords = ['tsunami', 'cyclone', 'flood', 'emergency', 'urgent']
    const words = description.toLowerCase().split(' ')
    const matches = words.filter(word => criticalWords.includes(word)).length
    return Math.min(matches / criticalWords.length, 1.0)
  }

  private static generateFlags(score: VerificationScore): string[] {
    const flags: string[] = []
    if (score.geospatial < 0.5) flags.push('Invalid location')
    if (score.temporal < 0.3) flags.push('Outdated report')
    if (score.source < 0.4) flags.push('Low source credibility')
    if (score.content < 0.4) flags.push('Content quality issues')
    return flags
  }
}

// Tier 2: Cross-Source Validation
export class CrossSourceValidation {
  static async validateReport(report: any, relatedReports: any[]): Promise<VerificationResult> {
    const crossSourceScore = await this.calculateCrossSourceScore(report, relatedReports)
    
    return {
      status: crossSourceScore > 0.8 ? 'verified' : 'pending',
      score: { ...report.verification_score, crossSource: crossSourceScore },
      tier: 2,
      flags: crossSourceScore < 0.5 ? ['Insufficient corroboration'] : [],
      confidence: crossSourceScore > 0.8 ? 'high' : 'medium'
    }
  }

  private static async calculateCrossSourceScore(report: any, relatedReports: any[]): Promise<number> {
    let score = 0
    
    // Triangulation: multiple sources reporting same event
    const nearbyReports = relatedReports.filter(r => 
      this.calculateDistance(report.latitude, report.longitude, r.latitude, r.longitude) < 10 // 10km radius
    )
    
    if (nearbyReports.length > 2) score += 0.4
    else if (nearbyReports.length > 0) score += 0.2
    
    // Social media sentiment correlation
    score += await this.checkSocialMediaCorrelation(report) * 0.3
    
    // Official data correlation (INCOIS, weather services)
    score += await this.checkOfficialDataCorrelation(report) * 0.3
    
    return Math.min(score, 1.0)
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  private static async checkSocialMediaCorrelation(report: any): Promise<number> {
    // Simulate social media sentiment analysis
    return Math.random() * 0.5 + 0.3 // Mock implementation
  }

  private static async checkOfficialDataCorrelation(report: any): Promise<number> {
    // Check against INCOIS/weather data
    return Math.random() * 0.4 + 0.2 // Mock implementation
  }
}

// Tier 3: Human Validation Queue
export class HumanValidationQueue {
  static async addToQueue(report: any): Promise<void> {
    // Add report to human validation queue
    console.log(`Report ${report.id} added to human validation queue`)
  }

  static async processValidation(reportId: string, analystId: string, decision: 'verified' | 'unverified' | 'false', notes?: string): Promise<void> {
    // Process human analyst decision
    console.log(`Report ${reportId} processed by ${analystId}: ${decision}`)
  }
}