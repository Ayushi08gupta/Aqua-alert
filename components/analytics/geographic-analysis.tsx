"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface GeographicAnalysisProps {
  reports: any[]
}

export function GeographicAnalysis({ reports }: GeographicAnalysisProps) {
  // Group reports by general geographic regions (simplified)
  const getRegion = (lat: number, lng: number) => {
    // Simplified regional classification for demo
    if (lat > 40) return "Northeast Coast"
    if (lat > 35) return "Mid-Atlantic"
    if (lat > 30) return "Southeast Coast"
    if (lat > 25) return "Florida Keys"
    if (lng < -100) return "West Coast"
    return "Gulf Coast"
  }

  const regionData = reports.reduce(
    (acc, report) => {
      const region = getRegion(report.latitude, report.longitude)
      if (!acc[region]) {
        acc[region] = {
          total: 0,
          critical: 0,
          verified: 0,
          hazardTypes: {},
        }
      }
      acc[region].total++
      if (report.severity === "critical") acc[region].critical++
      if (report.status === "verified") acc[region].verified++
      acc[region].hazardTypes[report.hazard_type] = (acc[region].hazardTypes[report.hazard_type] || 0) + 1
      return acc
    },
    {} as Record<string, any>,
  )

  const sortedRegions = Object.entries(regionData).sort(([, a], [, b]) => (b as any).total - (a as any).total)

  // Hotspot analysis
  const hotspots = reports
    .filter((r) => r.severity === "critical")
    .slice(0, 5)
    .map((report) => ({
      location: report.location_name || `${report.latitude.toFixed(2)}, ${report.longitude.toFixed(2)}`,
      type: report.hazard_type,
      severity: report.severity,
      date: new Date(report.created_at).toLocaleDateString(),
    }))

  return (
    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Geographic Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Regional Distribution */}
        <div>
          <h3 className="font-semibold text-sm mb-4">Reports by Region</h3>
          <div className="space-y-3">
            {sortedRegions.map(([region, data]) => (
              <div key={region} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{region}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{(data as any).total} reports</Badge>
                    {(data as any).critical > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {(data as any).critical} critical
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 text-xs text-muted-foreground">
                  {Object.entries((data as any).hazardTypes)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .slice(0, 3)
                    .map(([type, count]) => (
                      <span key={type} className="capitalize">
                        {type.replace("_", " ")} ({count as number})
                      </span>
                    ))
                    .reduce((prev, curr, i) => (i === 0 ? [curr] : [...prev, " • ", curr]), [] as any)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Hotspots */}
        <div>
          <h3 className="font-semibold text-sm mb-4">Recent Critical Hotspots</h3>
          <div className="space-y-2">
            {hotspots.length > 0 ? (
              hotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20"
                >
                  <MapPin className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{hotspot.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {hotspot.type.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{hotspot.date}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No critical hotspots in recent data</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
