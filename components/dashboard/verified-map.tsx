"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapVerificationEngine, DataFusionService } from "@/lib/verification-engine"
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin,
  Waves,
  Users,
  Satellite
} from "lucide-react"

interface VerifiedReport {
  id: string
  title: string
  description: string
  latitude: number
  longitude: number
  verification: {
    status: 'verified' | 'pending' | 'rejected'
    confidence: number
    sources: string[]
    timestamp: string
  }
  severity: string
  hazard_type: string
}

export function VerifiedMap() {
  const [reports, setReports] = useState<VerifiedReport[]>([])
  const [selectedReport, setSelectedReport] = useState<VerifiedReport | null>(null)
  const [verificationStats, setVerificationStats] = useState({
    verified: 0,
    pending: 0,
    rejected: 0,
    totalSources: 0
  })

  useEffect(() => {
    // Simulate real-time data
    const mockReports: VerifiedReport[] = [
      {
        id: '1',
        title: 'Coastal flooding at Mumbai Marine Drive',
        description: 'High tide causing water overflow on Marine Drive',
        latitude: 18.9220,
        longitude: 72.8347,
        verification: {
          status: 'verified',
          confidence: 0.85,
          sources: ['officer', 'social', 'sensor'],
          timestamp: new Date().toISOString()
        },
        severity: 'high',
        hazard_type: 'coastal_flooding'
      },
      {
        id: '2',
        title: 'Unusual wave activity near Chennai',
        description: 'Fishermen report abnormal wave patterns',
        latitude: 13.0827,
        longitude: 80.2707,
        verification: {
          status: 'pending',
          confidence: 0.65,
          sources: ['social', 'public'],
          timestamp: new Date().toISOString()
        },
        severity: 'medium',
        hazard_type: 'rip_current'
      }
    ]

    setReports(mockReports)
    
    // Update stats
    setVerificationStats({
      verified: mockReports.filter(r => r.verification.status === 'verified').length,
      pending: mockReports.filter(r => r.verification.status === 'pending').length,
      rejected: mockReports.filter(r => r.verification.status === 'rejected').length,
      totalSources: mockReports.reduce((acc, r) => acc + r.verification.sources.length, 0)
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'officer': return <Shield className="h-3 w-3" />
      case 'social': return <Users className="h-3 w-3" />
      case 'sensor': return <Satellite className="h-3 w-3" />
      default: return <MapPin className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Verification Dashboard Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{verificationStats.verified}</div>
            <div className="text-sm text-green-700">Verified</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{verificationStats.pending}</div>
            <div className="text-sm text-yellow-700">Pending</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{verificationStats.rejected}</div>
            <div className="text-sm text-red-700">Rejected</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Satellite className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{verificationStats.totalSources}</div>
            <div className="text-sm text-blue-700">Data Sources</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card className="bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Real-Time Verified Map Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg overflow-hidden">
            {/* Simplified map visualization */}
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Indian coastline */}
              <path
                d="M100 50 Q200 40 300 60 T500 50 Q600 70 700 60 L700 350 Q600 340 500 350 T300 340 Q200 360 100 350 Z"
                fill="rgba(34, 197, 94, 0.1)"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="2"
              />

              {/* Report markers */}
              {reports.map((report, index) => {
                const x = 150 + (index * 200)
                const y = 100 + (index * 50)
                const statusColor = report.verification.status === 'verified' ? '#22c55e' : 
                                  report.verification.status === 'pending' ? '#eab308' : '#ef4444'

                return (
                  <g key={report.id}>
                    {/* Pulsing animation for verified reports */}
                    {report.verification.status === 'verified' && (
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill={statusColor}
                        opacity="0.2"
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Main marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill={statusColor}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setSelectedReport(report)}
                    />
                    
                    {/* Confidence indicator */}
                    <circle
                      cx={x + 12}
                      cy={y - 12}
                      r="6"
                      fill="white"
                      stroke={statusColor}
                      strokeWidth="1"
                    />
                    <text
                      x={x + 12}
                      y={y - 8}
                      textAnchor="middle"
                      className="text-xs font-bold"
                      fill={statusColor}
                    >
                      {Math.round(report.verification.confidence * 100)}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-sm mb-2">Verification Status</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-xs">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs">Rejected</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Report Details */}
      {selectedReport && (
        <Card className="bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{selectedReport.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(selectedReport.verification.status)}>
                    {selectedReport.verification.status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getConfidenceColor(selectedReport.verification.confidence)}>
                    {Math.round(selectedReport.verification.confidence * 100)}% Confidence
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
            
            {/* Verification Details */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Verification Analysis
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence Score</span>
                    <span>{Math.round(selectedReport.verification.confidence * 100)}%</span>
                  </div>
                  <Progress value={selectedReport.verification.confidence * 100} className="h-2" />
                </div>
                
                <div>
                  <span className="text-sm font-medium">Data Sources:</span>
                  <div className="flex gap-2 mt-1">
                    {selectedReport.verification.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {getSourceIcon(source)}
                        <span className="ml-1 capitalize">{source}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Last verified: {new Date(selectedReport.verification.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}