"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

          {/* Hazard markers */}
          {reports.map((report) => {
            const { x, y } = projectToSVG(report.latitude, report.longitude)
            const Icon = HAZARD_ICONS[report.hazard_type as keyof typeof HAZARD_ICONS] || MapPin
            const severityColor = SEVERITY_COLORS[report.severity as keyof typeof SEVERITY_COLORS]

            return (
              <g key={report.id}>
                {/* Pulsing circle animation */}
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  className={`${severityColor.replace("bg-", "fill-")} opacity-20`}
                  style={{
                    animation: `pulse 2s infinite ${Math.random() * 2}s`,
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  className={`${severityColor.replace("bg-", "fill-")} opacity-40`}
                  style={{
                    animation: `pulse 2s infinite ${Math.random() * 2}s`,
                  }}
                />

                {/* Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  className={`${severityColor.replace("bg-", "fill-")} cursor-pointer hover:opacity-80`}
                  onClick={() => setSelectedReport(report)}
                />

                {/* Icon overlay */}
                <foreignObject x={x - 6} y={y - 6} width="12" height="12" className="pointer-events-none">
                  <Icon className="h-3 w-3 text-white" />
                </foreignObject>
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

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="font-semibold text-sm mb-3">Hazard Severity</h3>
          <div className="space-y-2">
            {Object.entries(SEVERITY_COLORS).map(([severity, color]) => (
              <div key={severity} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-xs capitalize">{severity}</span>
              </div>
            ))}
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
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{selectedReport.description}</p>
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
                  <span>{new Date(selectedReport.created_at).toLocaleDateString()}</span>
                </div>
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
