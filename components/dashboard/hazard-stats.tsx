"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface HazardReport {
  id: string
  hazard_type: string
  severity: string
  status: string
  created_at: string
}

interface HazardStatsProps {
  reports: HazardReport[]
}

export function HazardStats({ reports }: HazardStatsProps) {
  // Calculate statistics
  const totalReports = reports.length
  const pendingReports = reports.filter((r) => r.status === "pending").length
  const verifiedReports = reports.filter((r) => r.status === "verified").length
  const criticalReports = reports.filter((r) => r.severity === "critical").length

  // Hazard type distribution
  const hazardTypes = reports.reduce(
    (acc, report) => {
      acc[report.hazard_type] = (acc[report.hazard_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topHazards = Object.entries(hazardTypes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Recent activity (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const recentReports = reports.filter((r) => new Date(r.created_at) > weekAgo).length

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-foreground">{totalReports}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{recentReports}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{criticalReports}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">{verifiedReports}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Report Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Pending Review</span>
            <Badge variant="outline">{pendingReports}</Badge>
          </div>
          <Progress value={(pendingReports / totalReports) * 100} className="h-2" />

          <div className="flex justify-between items-center">
            <span className="text-sm">Verified</span>
            <Badge variant="outline">{verifiedReports}</Badge>
          </div>
          <Progress value={(verifiedReports / totalReports) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Top Hazard Types */}
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Top Hazard Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topHazards.map(([type, count]) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-sm capitalize">{type.replace("_", " ")}</span>
              <div className="flex items-center gap-2">
                <Progress value={(count / totalReports) * 100} className="h-2 w-16" />
                <Badge variant="secondary">{count}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">View Pending Reports</p>
            <p className="text-xs text-muted-foreground">{pendingReports} awaiting review</p>
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">Critical Alerts</p>
            <p className="text-xs text-muted-foreground">{criticalReports} high priority</p>
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">Export Data</p>
            <p className="text-xs text-muted-foreground">Download reports</p>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
