// Social Media Analytics Engine
interface SocialPost {
  id: string
  text: string
  created_at: string
  user: {
    id: string
    username: string
    verified: boolean
    follower_count: number
  }
  location: {
    lat?: number
    lon?: number
    place_text?: string
  } | null
  language?: string
  platform: string
  attachments: string[]
}

interface AnalyticsResult {
  id: string
  lang: string
  mentions_keywords: string[]
  keyword_category: 'flood' | 'storm' | 'high_wave' | 'tsunami' | 'coastal_currents' | 'other'
  confidence_score: number
  sentiment: 'negative' | 'neutral' | 'positive'
  urgency: 'low' | 'medium' | 'high'
  geo: {
    lat: number | null
    lon: number | null
    source: 'explicit_coords' | 'place_text' | 'ip_infer' | 'none'
  }
  credible_flag: boolean
  evidence: {
    keyword_matches: Array<{kw: string, span: [number, number], score: number}>
    hashtags: string[]
    mentions: string[]
    image_evidence: boolean
  }
  raw_text_clean: string
  notes: string
}

interface FilterResult {
  id: string
  decision: 'APPROVE' | 'REJECT'
  reason_codes: string[]
  matched_keywords: string[]
  normalized_text: string
  geo: {
    lat: number | null
    lon: number | null
    method: 'explicit' | 'geoparse' | 'none'
  }
  confidence: number
  explain: string
}

export class SocialAnalyticsEngine {
  private static readonly PRIMARY_KEYWORDS = [
    'flood', 'flooding', 'storm', 'stormy', 'cyclone', 'typhoon', 'tornado',
    'high wave', 'swell', 'tsunami', 'surge', 'storm surge', 'coastal current',
    'inundation', 'water rising', 'overflow'
  ]

  private static readonly SECONDARY_KEYWORDS = [
    'deluge', 'heavy rain', 'river burst', 'overflowing', 'flash flood',
    'gale', 'squall', 'monsoon surge'
  ]

  private static readonly TIME_INDICATORS = [
    'now', 'right now', 'just', 'happening', 'reports of', 'currently'
  ]

  static analyzePost(post: SocialPost): AnalyticsResult {
    const cleanText = this.normalizeText(post.text)
    const keywords = this.extractKeywords(cleanText)
    const category = this.categorizeKeywords(keywords)
    const geo = this.extractGeo(post.location)
    const sentiment = this.analyzeSentiment(cleanText)
    const confidence = this.calculateConfidence(post, keywords, geo)
    
    return {
      id: post.id,
      lang: post.language || 'en',
      mentions_keywords: keywords,
      keyword_category: category,
      confidence_score: confidence,
      sentiment,
      urgency: this.calculateUrgency(confidence, sentiment, geo),
      geo,
      credible_flag: this.assessCredibility(post, confidence),
      evidence: {
        keyword_matches: keywords.map(kw => ({
          kw,
          span: this.findKeywordSpan(cleanText, kw),
          score: 0.9
        })),
        hashtags: this.extractHashtags(post.text),
        mentions: this.extractMentions(post.text),
        image_evidence: post.attachments.length > 0
      },
      raw_text_clean: cleanText,
      notes: confidence > 0.7 ? 'High confidence hazard report' : 'Requires verification'
    }
  }

  static filterPost(post: SocialPost): FilterResult {
    const cleanText = this.normalizeText(post.text)
    const keywords = this.extractKeywords(cleanText)
    const geo = this.extractGeo(post.location)
    const hasTimeIndicator = this.TIME_INDICATORS.some(indicator => 
      cleanText.toLowerCase().includes(indicator)
    )
    
    let decision: 'APPROVE' | 'REJECT' = 'REJECT'
    let reasonCodes: string[] = []
    let confidence = 0

    // Check keyword presence
    if (keywords.length > 0) {
      reasonCodes.push('kw_found')
      confidence += 0.3
    } else {
      reasonCodes.push('no_keywords')
      return {
        id: post.id,
        decision: 'REJECT',
        reason_codes: reasonCodes,
        matched_keywords: [],
        normalized_text: cleanText,
        geo: { lat: null, lon: null, method: 'none' },
        confidence: 0,
        explain: 'No relevant keywords found'
      }
    }

    // Check time relevance
    if (hasTimeIndicator) {
      reasonCodes.push('time_recent')
      confidence += 0.2
    }

    // Check geo presence
    if (geo.lat && geo.lon) {
      reasonCodes.push('geo_ok')
      confidence += 0.3
    } else {
      reasonCodes.push('no_geo')
    }

    // Check for metaphorical usage
    if (this.isMetaphorical(cleanText)) {
      reasonCodes.push('metaphor')
      confidence -= 0.4
    }

    // Final decision
    if (confidence >= 0.5 && geo.lat && geo.lon && !this.isMetaphorical(cleanText)) {
      decision = 'APPROVE'
    }

    return {
      id: post.id,
      decision,
      reason_codes: reasonCodes,
      matched_keywords: keywords,
      normalized_text: cleanText,
      geo: {
        lat: geo.lat,
        lon: geo.lon,
        method: geo.source === 'explicit_coords' ? 'explicit' : 
                geo.source === 'place_text' ? 'geoparse' : 'none'
      },
      confidence,
      explain: decision === 'APPROVE' ? 
        'Relevant keywords with location and time context' :
        'Insufficient confidence or missing location data'
    }
  }

  private static normalizeText(text: string): string {
    return text.replace(/\s+/g, ' ')
                .replace(/https?:\/\/[^\s]+/g, '')
                .replace(/[!]{2,}/g, '!')
                .trim()
  }

  private static extractKeywords(text: string): string[] {
    const allKeywords = [...this.PRIMARY_KEYWORDS, ...this.SECONDARY_KEYWORDS]
    const lowerText = text.toLowerCase()
    return allKeywords.filter(keyword => lowerText.includes(keyword.toLowerCase()))
  }

  private static categorizeKeywords(keywords: string[]): AnalyticsResult['keyword_category'] {
    if (keywords.some(k => ['flood', 'flooding', 'inundation'].includes(k))) return 'flood'
    if (keywords.some(k => ['storm', 'cyclone', 'typhoon'].includes(k))) return 'storm'
    if (keywords.some(k => ['high wave', 'swell'].includes(k))) return 'high_wave'
    if (keywords.some(k => ['tsunami'].includes(k))) return 'tsunami'
    if (keywords.some(k => ['coastal current', 'surge'].includes(k))) return 'coastal_currents'
    return 'other'
  }

  private static extractGeo(location: SocialPost['location']): AnalyticsResult['geo'] {
    if (!location) return { lat: null, lon: null, source: 'none' }
    
    if (location.lat && location.lon) {
      return { lat: location.lat, lon: location.lon, source: 'explicit_coords' }
    }
    
    if (location.place_text) {
      // Mock geoparsing - in production, use actual geoparser
      const mockCoords = this.mockGeoparse(location.place_text)
      return {
        lat: mockCoords.lat,
        lon: mockCoords.lon,
        source: 'place_text'
      }
    }
    
    return { lat: null, lon: null, source: 'none' }
  }

  private static mockGeoparse(placeText: string): { lat: number | null, lon: number | null } {
    const places: Record<string, [number, number]> = {
      'mumbai': [19.0760, 72.8777],
      'chennai': [13.0827, 80.2707],
      'kolkata': [22.5726, 88.3639],
      'goa': [15.2993, 74.1240],
      'kochi': [9.9312, 76.2673]
    }
    
    const place = Object.keys(places).find(p => 
      placeText.toLowerCase().includes(p)
    )
    
    return place ? 
      { lat: places[place][0], lon: places[place][1] } :
      { lat: null, lon: null }
  }

  private static analyzeSentiment(text: string): AnalyticsResult['sentiment'] {
    const negativeWords = ['danger', 'emergency', 'urgent', 'help', 'disaster', 'damage']
    const positiveWords = ['safe', 'clear', 'calm', 'normal']
    
    const lowerText = text.toLowerCase()
    const negCount = negativeWords.filter(w => lowerText.includes(w)).length
    const posCount = positiveWords.filter(w => lowerText.includes(w)).length
    
    if (negCount > posCount) return 'negative'
    if (posCount > negCount) return 'positive'
    return 'neutral'
  }

  private static calculateConfidence(post: SocialPost, keywords: string[], geo: AnalyticsResult['geo']): number {
    let confidence = 0
    
    // Keyword strength
    confidence += keywords.length * 0.2
    
    // User credibility
    if (post.user.verified) confidence += 0.3
    if (post.user.follower_count > 1000) confidence += 0.1
    
    // Geo presence
    if (geo.lat && geo.lon) confidence += 0.2
    
    // Recency (assume recent for mock)
    confidence += 0.1
    
    return Math.min(confidence, 1.0)
  }

  private static calculateUrgency(confidence: number, sentiment: AnalyticsResult['sentiment'], geo: AnalyticsResult['geo']): AnalyticsResult['urgency'] {
    if (confidence > 0.75 && sentiment === 'negative' && geo.lat && geo.lon) return 'high'
    if (confidence > 0.5 && sentiment === 'negative') return 'medium'
    return 'low'
  }

  private static assessCredibility(post: SocialPost, confidence: number): boolean {
    return post.user.verified || confidence > 0.7 || post.user.follower_count > 5000
  }

  private static findKeywordSpan(text: string, keyword: string): [number, number] {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase())
    return index >= 0 ? [index, index + keyword.length] : [0, 0]
  }

  private static extractHashtags(text: string): string[] {
    return (text.match(/#\w+/g) || []).map(tag => tag.slice(1))
  }

  private static extractMentions(text: string): string[] {
    return (text.match(/@\w+/g) || []).map(mention => mention.slice(1))
  }

  private static isMetaphorical(text: string): boolean {
    const metaphorIndicators = [
      'flooded with messages', 'storm of', 'wave of', 'like a tsunami',
      'album', 'song', 'buy', 'sale', 'offer'
    ]
    const lowerText = text.toLowerCase()
    return metaphorIndicators.some(indicator => lowerText.includes(indicator))
  }
}