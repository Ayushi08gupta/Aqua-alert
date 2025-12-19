"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

interface HazardReport {
  id: string
  hazard_type: string
  severity: string
  status: string
  created_at: string
}

interface HazardStatsProps {
  reports: HazardReport[]
  realtimeData?: any
}

export function HazardStats({ reports, realtimeData }: HazardStatsProps) {
  const { t } = useLanguage();
  const [verifications, setVerifications] = useState<Record<string, any>>({})
  
  useEffect(() => {
    const loadVerifications = () => {
      const stored = JSON.parse(localStorage.getItem('reportVerifications') || '{}')
      setVerifications(stored)
    }
    
    loadVerifications()
    const interval = setInterval(loadVerifications, 1000)
    return () => clearInterval(interval)
  }, [])
  
  // Use real-time data if available, otherwise fall back to reports
  const totalReports = realtimeData?.crowd?.total_reports_last_hour || reports.length
  const verifiedCount = realtimeData?.crowd?.verified_reports || Object.values(verifications).filter(v => v.status === 'verified').length
  const pendingCount = totalReports - verifiedCount
  const criticalReports = realtimeData?.crowd?.critical_reports || reports.filter((r) => r.severity === "critical").length

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
                <p className="text-sm text-muted-foreground">{t('stats.total')}</p>
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
                <p className="text-sm text-muted-foreground">{t('stats.thisweek')}</p>
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
                <p className="text-sm text-muted-foreground">{t('stats.critical')}</p>
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
                <p className="text-sm text-muted-foreground">{t('stats.verified')}</p>
                <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t('stats.status')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">{t('stats.pending')}</span>
            <Badge variant="outline">{pendingCount}</Badge>
          </div>
          <Progress value={totalReports > 0 ? (pendingCount / totalReports) * 100 : 0} className="h-2" />

          <div className="flex justify-between items-center">
            <span className="text-sm">{t('stats.verified')}</span>
            <Badge variant="outline">{verifiedCount}</Badge>
          </div>
          <Progress value={totalReports > 0 ? (verifiedCount / totalReports) * 100 : 0} className="h-2" />
        </CardContent>
      </Card>

      {/* Top Hazard Types */}
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t('stats.tophazards')}</CardTitle>
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
          <CardTitle className="text-lg">{t('stats.quickactions')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">{t('stats.viewpending')}</p>
            <p className="text-xs text-muted-foreground">{pendingCount} {t('stats.awaitingreview')}</p>
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">{t('stats.criticalalerts')}</p>
            <p className="text-xs text-muted-foreground">{criticalReports} {t('stats.highpriority')}</p>
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <p className="text-sm font-medium">{t('stats.exportdata')}</p>
            <p className="text-xs text-muted-foreground">{t('stats.downloadreports')}</p>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
