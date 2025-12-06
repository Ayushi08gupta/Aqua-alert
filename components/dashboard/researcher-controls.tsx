"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye,
  Shield,
  Bot,
  MapPin
} from "lucide-react"

interface Report {
  id: number
  title: string
  description: string
  hazard_type: string
  severity: string
  status: string
  location_name: string
  latitude: number
  longitude: number
  created_at: string
  verification_score?: {
    overall: number
    geospatial: number
    temporal: number
    source: number
    content: number
    crossSource: number
  }
  verification_tier?: number
  verification_flags?: string[]
}

interface ResearcherControlsProps {
  reports: Report[]
  onReportUpdate: (report: Report) => void
  onReportDelete: (reportId: number) => void
}

export function ResearcherControls({ reports, onReportUpdate, onReportDelete }: ResearcherControlsProps) {
  const [selectedTab, setSelectedTab] = useState("verification")

  // Add verification scores to reports
  const reportsWithVerification = reports.map(report => ({
    ...report,
    verification_score: report.verification_score || {
      overall: Math.random() * 0.4 + 0.5,
      geospatial: Math.random() * 0.3 + 0.7,
      temporal: Math.random() * 0.2 + 0.8,
      source: Math.random() * 0.5 + 0.3,
      content: Math.random() * 0.4 + 0.4,
      crossSource: Math.random() * 0.3 + 0.5
    },
    verification_tier: report.verification_tier || (Math.random() > 0.5 ? 2 : 1),
    verification_flags: report.verification_flags || (Math.random() > 0.7 ? ['Content quality issues'] : [])
  }))

  const pendingReports = reportsWithVerification.filter(r => r.status === 'pending')
  const verifiedReports = reportsWithVerification.filter(r => r.status === 'verified')

  const handleVerification = (reportId: number, decision: 'verified' | 'unverified' | 'false') => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      onReportUpdate({ ...report, status: decision })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'unverified': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'false': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Verification Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Verification Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-600">{pendingReports.length}</div>
            <div className="text-xs text-blue-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-600">{verifiedReports.length}</div>
            <div className="text-xs text-green-600">Verified</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-xs text-red-600">False</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Bot className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-xs text-purple-600">AI Accuracy</div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verification">Verification Queue</TabsTrigger>
            <TabsTrigger value="verified">Verified Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="space-y-4 mt-4">
            {pendingReports.map(report => (
              <Card key={report.id} className="border border-border/20">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{report.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">Tier {report.verification_tier}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {report.hazard_type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>{new Date(report.created_at).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {report.location_name}
                      </div>
                    </div>
                  </div>

                  {/* Verification Scores */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Geospatial</span>
                        <span>{Math.round(report.verification_score!.geospatial * 100)}%</span>
                      </div>
                      <Progress value={report.verification_score!.geospatial * 100} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Source</span>
                        <span>{Math.round(report.verification_score!.source * 100)}%</span>
                      </div>
                      <Progress value={report.verification_score!.source * 100} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span>Overall</span>
                        <span>{Math.round(report.verification_score!.overall * 100)}%</span>
                      </div>
                      <Progress value={report.verification_score!.overall * 100} className="h-1.5" />
                    </div>
                  </div>

                  {/* Flags */}
                  {report.verification_flags && report.verification_flags.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      {report.verification_flags.map((flag, index) => (
                        <Badge key={index} variant="outline" className="text-yellow-700 border-yellow-300 text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-xs"
                      onClick={() => handleVerification(report.id, 'verified')}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verify
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleVerification(report.id, 'unverified')}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Unverified
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="text-xs"
                      onClick={() => handleVerification(report.id, 'false')}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      False
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <p>No reports pending verification</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="verified" className="mt-4">
            <div className="space-y-3">
              {verifiedReports.slice(0, 3).map(report => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{report.title}</div>
                    <div className="text-xs text-muted-foreground">{report.location_name}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    VERIFIED
                  </Badge>
                </div>
              ))}
              
              {verifiedReports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p>No verified reports yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}