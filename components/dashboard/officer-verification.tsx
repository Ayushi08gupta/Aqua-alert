"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, Volume2, Shield } from "lucide-react"

interface OfficerVerificationProps {
  userRole?: string
  reports?: any[]
}

export function OfficerVerification({ userRole, reports = [] }: OfficerVerificationProps) {
  const [pendingReports, setPendingReports] = useState<any[]>([])
  const [verifiedReports, setVerifiedReports] = useState<any[]>([])

  useEffect(() => {
    // Load reports for verification
    const loadReports = () => {
      const userReports = JSON.parse(localStorage.getItem('userHazardReports') || '[]')
      const allReports = [...reports, ...userReports]
      const verifications = JSON.parse(localStorage.getItem('reportVerifications') || '{}')
      
      const pending = allReports.filter(report => !verifications[report.id])
      const verified = allReports.filter(report => verifications[report.id])
      
      setPendingReports(pending)
      setVerifiedReports(verified)
    }
    
    loadReports()
    const interval = setInterval(loadReports, 1000)
    return () => clearInterval(interval)
  }, [reports])

  const verifyReport = (reportId: string, status: 'verified' | 'rejected') => {
    const verifications = JSON.parse(localStorage.getItem('reportVerifications') || '{}')
    verifications[reportId] = { status, timestamp: new Date().toISOString() }
    localStorage.setItem('reportVerifications', JSON.stringify(verifications))
    
    if (status === 'verified') {
      // Trigger voice alert for verified reports
      const report = pendingReports.find(r => r.id === reportId)
      if (report) {
        triggerVoiceAlert(report)
      }
    }
  }

  const triggerVoiceAlert = (report: any) => {
    const message = `Alert! ${report.hazard_type.replace('_', ' ')} reported in ${report.location}. Severity level: ${report.severity}. Please take necessary precautions.`
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 0.8
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    }
    
    // Also show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Ocean Hazard Alert', {
        body: message,
        icon: '/favicon.ico'
      })
    }
  }

  // Debug: Show for all users
  // if (!userRole || !['officer', 'admin', 'researcher'].includes(userRole)) {
  //   return null
  // }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="h-5 w-5" />
            Officer Verification Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Pending Reports */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                Pending Verification ({pendingReports.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {pendingReports.map(report => (
                  <div key={report.id} className="bg-white rounded-lg p-3 border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{report.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {report.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                    <p className="text-xs text-gray-500 mb-3">📍 {report.location}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        onClick={() => verifyReport(report.id, 'verified')}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => verifyReport(report.id, 'rejected')}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingReports.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No pending reports
                  </p>
                )}
              </div>
            </div>

            {/* Verified Reports */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Recently Verified ({verifiedReports.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {verifiedReports.slice(-5).map(report => (
                  <div key={report.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{report.title}</h4>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ VERIFIED
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">📍 {report.location}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => triggerVoiceAlert(report)}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      Broadcast Alert
                    </Button>
                  </div>
                ))}
                {verifiedReports.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No verified reports yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}