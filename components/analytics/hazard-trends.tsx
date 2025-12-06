"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HazardTrendsProps {
  reports: any[]
}

export function HazardTrends({ reports }: HazardTrendsProps) {
  // Group reports by month for the last 6 months
  const months = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      name: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      date: date,
    })
  }

  const monthlyData = months.map((month) => {
    const monthReports = reports.filter((report) => {
      const reportDate = new Date(report.created_at)
      return reportDate.getMonth() === month.date.getMonth() && reportDate.getFullYear() === month.date.getFullYear()
    })

    return {
      month: month.name,
      total: monthReports.length,
      critical: monthReports.filter((r) => r.severity === "critical").length,
      verified: monthReports.filter((r) => r.status === "verified").length,
    }
  })

  const maxReports = Math.max(...monthlyData.map((d) => d.total), 1)

  // Hazard type distribution
  const hazardTypes = reports.reduce(
    (acc, report) => {
      acc[report.hazard_type] = (acc[report.hazard_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topHazards = Object.entries(hazardTypes)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 6)

  return (
    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Hazard Trends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Trend Chart */}
        <div>
          <h3 className="font-semibold text-sm mb-4">Monthly Report Volume</h3>
          <div className="space-y-3">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-16 text-xs text-muted-foreground">{data.month}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(data.total / maxReports) * 100}%` }}
                    />
                  </div>
                  <div className="w-8 text-xs text-right">{data.total}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hazard Type Distribution */}
        <div>
          <h3 className="font-semibold text-sm mb-4">Top Hazard Types</h3>
          <div className="space-y-2">
            {topHazards.map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm capitalize">{type.replace("_", " ")}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${((count as number) / reports.length) * 100}%` }}
                    />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {count as number}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
