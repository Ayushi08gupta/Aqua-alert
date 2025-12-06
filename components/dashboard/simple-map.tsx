"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SimpleMapProps {
  reports: any[]
  analyticsHotspots: any[]
}

export function SimpleMap({ reports, analyticsHotspots }: SimpleMapProps) {
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [userReports, setUserReports] = useState<any[]>([])

  useEffect(() => {
    // Listen for new user reports from localStorage
    const checkForNewReports = () => {
      const storedReports = localStorage.getItem('userHazardReports')
      if (storedReports) {
        setUserReports(JSON.parse(storedReports))
      }
    }
    
    checkForNewReports()
    const interval = setInterval(checkForNewReports, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full bg-blue-100">
      {/* Simple Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200">
        
        {/* Large Visible Hotspots */}
        <div 
          className="absolute w-8 h-8 bg-red-500 rounded-full animate-pulse cursor-pointer flex items-center justify-center text-white font-bold text-xs"
          style={{ left: '200px', top: '150px' }}
          onClick={() => setSelectedReport({
            id: 'h1', title: '🔥 Mumbai Flooding Hotspot', 
            description: 'AI detected massive flooding from social media',
            status: 'analytics', location_name: 'Mumbai (85% confidence)'
          })}
        >
          AI
        </div>
        
        <div 
          className="absolute w-8 h-8 bg-orange-500 rounded-full animate-pulse cursor-pointer flex items-center justify-center text-white font-bold text-xs"
          style={{ left: '400px', top: '300px' }}
          onClick={() => setSelectedReport({
            id: 'h2', title: '🔥 Chennai Storm Hotspot', 
            description: 'AI detected storm surge from Twitter',
            status: 'analytics', location_name: 'Chennai (78% confidence)'
          })}
        >
          AI
        </div>

        <div 
          className="absolute w-8 h-8 bg-red-600 rounded-full animate-pulse cursor-pointer flex items-center justify-center text-white font-bold text-xs"
          style={{ left: '300px', top: '400px' }}
          onClick={() => setSelectedReport({
            id: 'h3', title: '🔥 Goa Tsunami Hotspot', 
            description: 'AI detected tsunami warning from verified account',
            status: 'analytics', location_name: 'Goa (92% confidence)'
          })}
        >
          AI
        </div>

        {/* Verified Reports */}
        <div 
          className="absolute w-6 h-6 bg-green-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-xs border-2 border-green-700"
          style={{ left: '180px', top: '180px' }}
          onClick={() => setSelectedReport({
            id: 'r1', title: 'Mumbai Marine Drive Flooding', 
            description: 'High tide flooding verified by officials',
            status: 'verified', location_name: 'Mumbai Marine Drive'
          })}
        >
          ✓
        </div>

        <div 
          className="absolute w-6 h-6 bg-yellow-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-xs border-2 border-yellow-700"
          style={{ left: '420px', top: '320px' }}
          onClick={() => setSelectedReport({
            id: 'r2', title: 'Chennai Storm Surge', 
            description: 'Wave activity reported, pending verification',
            status: 'pending', location_name: 'Chennai Coast'
          })}
        >
          ⏰
        </div>

        <div 
          className="absolute w-6 h-6 bg-green-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-xs border-2 border-green-700"
          style={{ left: '280px', top: '420px' }}
          onClick={() => setSelectedReport({
            id: 'r3', title: 'Goa Rip Current', 
            description: 'Strong currents verified at Calangute Beach',
            status: 'verified', location_name: 'Calangute Beach, Goa'
          })}
        >
          ✓
        </div>

        {/* User Reported Hazards */}
        {userReports.map((report, index) => {
          const positions = [
            { left: '250px', top: '200px' },
            { left: '350px', top: '250px' },
            { left: '320px', top: '350px' },
            { left: '200px', top: '300px' },
            { left: '450px', top: '200px' }
          ]
          const pos = positions[index % positions.length]
          
          return (
            <div 
              key={report.id}
              className="absolute w-6 h-6 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-xs border-2 border-blue-700"
              style={pos}
              onClick={() => setSelectedReport({
                ...report,
                status: 'user_reported',
                location_name: report.location || 'User Location'
              })}
            >
              👤
            </div>
          )
        })}

        {/* Location Labels */}
        <div className="absolute text-sm font-bold text-gray-700" style={{ left: '150px', top: '120px' }}>
          MUMBAI
        </div>
        <div className="absolute text-sm font-bold text-gray-700" style={{ left: '380px', top: '270px' }}>
          CHENNAI
        </div>
        <div className="absolute text-sm font-bold text-gray-700" style={{ left: '260px', top: '370px' }}>
          GOA
        </div>

        {/* Stats Display */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-4 shadow-lg">
          <div className="text-xs font-bold mb-2">LIVE STATUS</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>2 Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>1 Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>3 AI Hotspots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{userReports.length} User Reports</span>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="text-xs font-bold mb-3">Map Legend</div>
          
          <div className="mb-3">
            <div className="text-xs font-medium mb-2 text-gray-600">Source Types</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">📱</span>
                <span>Social Media</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">🏛️</span>
                <span>Official Report</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">👤</span>
                <span>Citizen Report</span>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="text-xs font-medium mb-2 text-gray-600">Verification Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">✓</span>
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">⏳</span>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">✗</span>
                <span>Rejected</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-xs font-medium mb-2 text-gray-600">Severity</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>high</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Report Popup */}
      {selectedReport && (
        <div className="absolute top-4 left-4 w-80 z-10">
          <Card className="bg-white shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedReport.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedReport.status === 'verified' && (
                      <Badge className="bg-green-100 text-green-800">✓ VERIFIED</Badge>
                    )}
                    {selectedReport.status === 'pending' && (
                      <Badge className="bg-yellow-100 text-yellow-800">⏰ PENDING</Badge>
                    )}
                    {selectedReport.status === 'analytics' && (
                      <Badge className="bg-purple-100 text-purple-800">🤖 AI DETECTED</Badge>
                    )}
                    {selectedReport.status === 'user_reported' && (
                      <Badge className="bg-blue-100 text-blue-800">📍 USER REPORT</Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{selectedReport.description}</p>
              <div className="text-xs text-gray-500">
                <div>Location: {selectedReport.location_name}</div>
                <div>Status: {selectedReport.status}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}