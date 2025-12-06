"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserVerification } from "@/components/ui/user-verification"
import { MapPin, Waves, AlertTriangle, Zap, Droplets } from "lucide-react"

interface HazardReport {
  id: string
  title: string
  description: string
  hazard_type: string
  severity: string
  latitude: number
  longitude: number
  location_name: string
  status: string
  created_at: string
}

interface HazardMapProps {
  reports: HazardReport[]
}

const HAZARD_ICONS = {
  tsunami: Waves,
  hurricane: Zap,
  storm_surge: Droplets,
  coastal_flooding: Droplets,
  rip_current: Waves,
  marine_debris: AlertTriangle,
  oil_spill: AlertTriangle,
  harmful_algae: AlertTriangle,
  other: MapPin,
}

const SEVERITY_COLORS = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
}

export function HazardMap({ reports }: HazardMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 25.7617, lng: -80.1918 }) // Miami default
  const [verifications, setVerifications] = useState<Record<string, any>>({})

  // Simulate interactive map with SVG visualization
  const mapWidth = 800
  const mapHeight = 600

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectToSVG = (lat: number, lng: number) => {
    // Simple mercator-like projection for demo
    const x = ((lng + 180) / 360) * mapWidth
    const y = ((90 - lat) / 180) * mapHeight
    return { x, y }
  }

  useEffect(() => {
    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Keep default location if geolocation fails
        },
      )
    }

    // Load verification status
    const loadVerifications = () => {
      const stored = JSON.parse(localStorage.getItem('reportVerifications') || '{}')
      setVerifications(stored)
    }
    
    loadVerifications()
    const interval = setInterval(loadVerifications, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
        {/* Ocean Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M0 20 Q10 10 20 20 T40 20"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-primary/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* Interactive SVG Map */}
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Coastline simulation */}
          <path
            d="M50 100 Q200 80 400 120 T750 100 L750 600 L50 600 Z"
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
          />

          {/* Social Media Analytics Hotspots */}
          <g>
            <circle cx="200" cy="150" r="25" className="fill-red-500 opacity-15" />
            <circle cx="200" cy="150" r="15" className="fill-red-500 cursor-pointer" 
              onClick={() => setSelectedReport({
                id: 'sm1', title: 'Social Media Alert: Mumbai Flooding', description: 'Multiple Twitter reports of severe flooding in Mumbai area',
                hazard_type: 'flood', severity: 'high', latitude: 19.0760, longitude: 72.8777,
                location_name: 'Mumbai (Social Media)', status: 'verified', created_at: new Date().toISOString()
              } as HazardReport)}
              stroke="#22c55e" strokeWidth="3" />
            <text x="200" y="155" textAnchor="middle" className="text-xs fill-white font-bold">📱</text>
            <text x="220" y="140" className="text-xs fill-green-600 font-bold">✓</text>
          </g>
          
          <g>
            <circle cx="400" cy="300" r="20" className="fill-orange-500 opacity-15" />
            <circle cx="400" cy="300" r="12" className="fill-orange-500 cursor-pointer" 
              onClick={() => setSelectedReport({
                id: 'sm2', title: 'Social Media Alert: Chennai Storm', description: 'Instagram posts showing high waves and storm conditions',
                hazard_type: 'storm', severity: 'medium', latitude: 13.0827, longitude: 80.2707,
                location_name: 'Chennai (Social Media)', status: 'pending', created_at: new Date().toISOString()
              } as HazardReport)}
              stroke="#eab308" strokeWidth="3" />
            <text x="400" y="305" textAnchor="middle" className="text-xs fill-white font-bold">📱</text>
            <text x="418" y="290" className="text-xs fill-yellow-600 font-bold">⏳</text>
          </g>
          
          <g>
            <circle cx="300" cy="400" r="22" className="fill-red-500 opacity-15" />
            <circle cx="300" cy="400" r="13" className="fill-red-500 cursor-pointer" 
              onClick={() => setSelectedReport({
                id: 'sm3', title: 'Social Media Alert: Goa Tsunami Warning', description: 'Official accounts posting tsunami evacuation alerts',
                hazard_type: 'tsunami', severity: 'critical', latitude: 15.2993, longitude: 74.1240,
                location_name: 'Goa (Social Media)', status: 'verified', created_at: new Date().toISOString()
              } as HazardReport)}
              stroke="#22c55e" strokeWidth="3" />
            <text x="300" y="405" textAnchor="middle" className="text-xs fill-white font-bold">📱</text>
            <text x="318" y="390" className="text-xs fill-green-600 font-bold">✓</text>
          </g>

          {/* Official Report Hotspots */}
          <g>
            <circle cx="180" cy="170" r="18" className="fill-blue-500 opacity-20" />
            <circle cx="180" cy="170" r="10" className="fill-blue-500 cursor-pointer" 
              onClick={() => setSelectedReport({
                id: 'or1', title: 'Official Report: Mumbai Marine Drive', description: 'Coast Guard confirms flooding at Marine Drive',
                hazard_type: 'coastal_flooding', severity: 'high', latitude: 18.9220, longitude: 72.8347,
                location_name: 'Mumbai Marine Drive (Official)', status: 'verified', created_at: new Date().toISOString()
              } as HazardReport)}
              stroke="#22c55e" strokeWidth="3" />
            <text x="180" y="175" textAnchor="middle" className="text-xs fill-white font-bold">🏛️</text>
            <text x="198" y="160" className="text-xs fill-green-600 font-bold">✓</text>
          </g>
          
          <g>
            <circle cx="420" cy="320" r="16" className="fill-yellow-500 opacity-20" />
            <circle cx="420" cy="320" r="9" className="fill-yellow-500 cursor-pointer" 
              onClick={() => setSelectedReport({
                id: 'or2', title: 'Citizen Report: Chennai Waves', description: 'Local fishermen report unusual wave patterns',
                hazard_type: 'rip_current', severity: 'medium', latitude: 13.0827, longitude: 80.2707,
                location_name: 'Chennai Coast (Citizen)', status: 'pending', created_at: new Date().toISOString()
              } as HazardReport)}
              stroke="#eab308" strokeWidth="3" />
            <text x="420" y="325" textAnchor="middle" className="text-xs fill-white font-bold">👤</text>
            <text x="435" y="310" className="text-xs fill-yellow-600 font-bold">⏳</text>
          </g>

          {/* Hazard markers */}
          {reports.map((report) => {
            const { x, y } = projectToSVG(report.latitude, report.longitude)
            const Icon = HAZARD_ICONS[report.hazard_type as keyof typeof HAZARD_ICONS] || MapPin
            const severityColor = SEVERITY_COLORS[report.severity as keyof typeof SEVERITY_COLORS]
            const verification = verifications[report.id]
            const verificationStatus = verification?.status || 'pending'

            return (
              <g key={report.id}>
                {/* Static circle background */}
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  className={`${severityColor.replace("bg-", "fill-")} opacity-20`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  className={`${severityColor.replace("bg-", "fill-")} opacity-40`}
                />

                {/* Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  className={`${severityColor.replace("bg-", "fill-")} cursor-pointer hover:opacity-80`}
                  onClick={() => setSelectedReport({...report, status: verificationStatus})}
                  stroke={verificationStatus === 'verified' ? '#22c55e' : verificationStatus === 'rejected' ? '#ef4444' : '#eab308'}
                  strokeWidth="3"
                />

                {/* Consistent citizen report symbol */}
                <text x={x} y={y+3} textAnchor="middle" className="text-xs fill-white font-bold pointer-events-none">
                  👤
                </text>
                
                {/* Verification status indicator */}
                <text x={x+12} y={y-8} className="text-xs font-bold pointer-events-none">
                  {verificationStatus === 'verified' ? '✓' : verificationStatus === 'rejected' ? '✗' : '⏳'}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="bg-card/80 backdrop-blur-sm"
            onClick={() => {
              // Zoom in functionality
              console.log("Zoom in")
            }}
          >
            +
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-card/80 backdrop-blur-sm"
            onClick={() => {
              // Zoom out functionality
              console.log("Zoom out")
            }}
          >
            -
          </Button>
        </div>

        {/* Enhanced Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
          <h3 className="font-semibold text-sm mb-3">Map Legend</h3>
          
          <div className="mb-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Source Types</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">📱</span>
                <span className="text-xs">Social Media</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">🏛️</span>
                <span className="text-xs">Official Report</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">👤</span>
                <span className="text-xs">Citizen Report</span>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Verification Status</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-green-500 rounded-full" />
                <span className="text-xs">✓ Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-yellow-500 rounded-full" />
                <span className="text-xs">⏳ Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-red-500 rounded-full" />
                <span className="text-xs">✗ Rejected</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Severity</h4>
            <div className="space-y-1">
              {Object.entries(SEVERITY_COLORS).map(([severity, color]) => (
                <div key={severity} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-xs capitalize">{severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Report Details */}
      {selectedReport && (
        <div className="absolute top-4 left-4 w-80">
          <Card className="bg-card/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedReport.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {selectedReport.hazard_type.replace("_", " ")}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`${SEVERITY_COLORS[selectedReport.severity as keyof typeof SEVERITY_COLORS]} text-white`}
                    >
                      {selectedReport.severity}
                    </Badge>
                    {selectedReport.status === 'verified' && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        ✓ VERIFIED
                      </Badge>
                    )}
                    {selectedReport.status === 'rejected' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        ✗ REJECTED
                      </Badge>
                    )}
                    {selectedReport.status === 'pending' && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        ⏳ PENDING
                      </Badge>
                    )}

                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{selectedReport.location_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="capitalize">
                    {selectedReport.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reported:</span>
                  <span>{new Date(selectedReport.created_at).toLocaleDateString('en-US')}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(`/report/${selectedReport.id}`, '_blank')}
                >
                  View Full Report →
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      )}

      {/* Pulsing animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
