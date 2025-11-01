"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Users, MessageSquare, BarChart3 } from "lucide-react"

interface AnalyticsOverviewProps {
  reports: any[]
  socialPosts: any[]
}

export function AnalyticsOverview({ reports, socialPosts }: AnalyticsOverviewProps) {
  // Calculate metrics
  const totalReports = reports.length
  const criticalReports = reports.filter((r) => r.severity === "critical").length
  const verifiedReports = reports.filter((r) => r.status === "verified").length
  const totalSocialPosts = socialPosts.length

  // Calculate trends (last 7 days vs previous 7 days)
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const recentReports = reports.filter((r) => new Date(r.created_at) > weekAgo).length
  const previousReports = reports.filter(
    (r) => new Date(r.created_at) > twoWeeksAgo && new Date(r.created_at) <= weekAgo,
  ).length

  const reportsTrend = previousReports > 0 ? ((recentReports - previousReports) / previousReports) * 100 : 0

  // Average sentiment from social posts
  const avgSentiment =
    socialPosts.length > 0
      ? socialPosts.reduce((sum, post) => sum + (post.sentiment_score || 0), 0) / socialPosts.length
      : 0

  const metrics = [
    {
      title: "Total Reports",
      value: totalReports.toLocaleString(),
      change: reportsTrend,
      icon: BarChart3,
      color: "text-primary",
    },
    {
      title: "Critical Alerts",
      value: criticalReports.toLocaleString(),
      change: null,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Verified Reports",
      value: verifiedReports.toLocaleString(),
      change: null,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Social Media Posts",
      value: totalSocialPosts.toLocaleString(),
      change: null,
      icon: MessageSquare,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                {metric.change !== null && (
                  <div className="flex items-center gap-1 mt-2">
                    {metric.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {Math.abs(metric.change).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-full bg-primary/10`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Sentiment Overview */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg">Social Media Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{avgSentiment.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Average Sentiment</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={avgSentiment > 0.1 ? "default" : avgSentiment < -0.1 ? "destructive" : "secondary"}
                  className="capitalize"
                >
                  {avgSentiment > 0.1 ? "Positive" : avgSentiment < -0.1 ? "Negative" : "Neutral"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Based on {totalSocialPosts} social media posts analyzed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
