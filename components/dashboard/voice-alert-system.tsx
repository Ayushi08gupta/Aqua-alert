"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, VolumeX, Bell, BellOff } from "lucide-react"

export function VoiceAlertSystem() {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted')
      })
    } else if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true)
    }

    // Listen for verified reports
    const checkForVerifiedReports = () => {
      const verifications = JSON.parse(localStorage.getItem('reportVerifications') || '{}')
      const lastCheck = localStorage.getItem('lastAlertCheck') || '0'
      const currentTime = Date.now()
      
      Object.entries(verifications).forEach(([reportId, verification]: [string, any]) => {
        const verificationTime = new Date(verification.timestamp).getTime()
        if (verification.status === 'verified' && verificationTime > parseInt(lastCheck)) {
          const userReports = JSON.parse(localStorage.getItem('userHazardReports') || '[]')
          const report = userReports.find((r: any) => r.id === reportId)
          if (report && alertsEnabled) {
            playVoiceAlert(report)
          }
        }
      })
      
      localStorage.setItem('lastAlertCheck', currentTime.toString())
    }

    const interval = setInterval(checkForVerifiedReports, 2000)
    return () => clearInterval(interval)
  }, [alertsEnabled])

  const playVoiceAlert = (report: any) => {
    const message = `Attention! Official hazard alert. ${report.hazard_type.replace('_', ' ')} confirmed in ${report.location}. Severity: ${report.severity}. Take immediate precautions.`
    
    if ('speechSynthesis' in window && alertsEnabled) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 0.9
      utterance.volume = 1
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
    
    if (notificationsEnabled) {
      new Notification('🚨 OFFICIAL HAZARD ALERT', {
        body: `${report.hazard_type.replace('_', ' ').toUpperCase()} - ${report.location}`,
        icon: '/favicon.ico',
        requireInteraction: true
      })
    }
  }

  const testAlert = () => {
    const testReport = {
      hazard_type: 'tsunami',
      location: 'Mumbai Coast',
      severity: 'high'
    }
    playVoiceAlert(testReport)
  }

  return (
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Volume2 className="h-5 w-5" />
          Alert System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {alertsEnabled ? <Volume2 className="h-4 w-4 text-green-600" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
              <span className="text-sm font-medium">Voice Alerts</span>
            </div>
            <Button
              size="sm"
              variant={alertsEnabled ? "default" : "outline"}
              onClick={() => setAlertsEnabled(!alertsEnabled)}
            >
              {alertsEnabled ? "ON" : "OFF"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {notificationsEnabled ? <Bell className="h-4 w-4 text-green-600" /> : <BellOff className="h-4 w-4 text-gray-400" />}
              <span className="text-sm font-medium">Browser Notifications</span>
            </div>
            <Button
              size="sm"
              variant={notificationsEnabled ? "default" : "outline"}
              onClick={() => {
                if (!notificationsEnabled && 'Notification' in window) {
                  Notification.requestPermission().then(permission => {
                    setNotificationsEnabled(permission === 'granted')
                  })
                }
              }}
            >
              {notificationsEnabled ? "ON" : "ENABLE"}
            </Button>
          </div>

          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={testAlert}
          >
            <Volume2 className="h-3 w-3 mr-1" />
            Test Alert
          </Button>

          <div className="text-xs text-gray-600 bg-white/50 rounded p-2">
            <strong>Auto-alerts:</strong> Voice announcements will play automatically when officers verify hazard reports as genuine threats.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}