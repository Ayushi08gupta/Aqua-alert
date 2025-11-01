"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, TrendingUp, Hash, Users } from "lucide-react"

interface SocialMediaAnalyticsProps {
  socialPosts: any[]
}

export function SocialMediaAnalytics({ socialPosts }: SocialMediaAnalyticsProps) {
  // Platform distribution
  const platformData = socialPosts.reduce(
    (acc, post) => {
      acc[post.platform] = (acc[post.platform] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Sentiment analysis
  const sentimentData = socialPosts.reduce(
    (acc, post) => {
      const score = post.sentiment_score || 0
      if (score > 0.1) acc.positive++
      else if (score < -0.1) acc.negative++
      else acc.neutral++
      return acc
    },
    { positive: 0, negative: 0, neutral: 0 },
  )

  // Top keywords
  const keywordCounts = socialPosts.reduce(
    (acc, post) => {
      if (post.hazard_keywords) {
        post.hazard_keywords.forEach((keyword: string) => {
          acc[keyword] = (acc[keyword] || 0) + 1
        })
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const topKeywords = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  // Engagement metrics
  const totalEngagement = socialPosts.reduce((sum, post) => sum + (post.engagement_count || 0), 0)
  const avgEngagement = socialPosts.length > 0 ? totalEngagement / socialPosts.length : 0

  // Recent high-engagement posts
  const topPosts = socialPosts
    .filter((post) => post.engagement_count > 0)
    .sort((a, b) => (b.engagement_count || 0) - (a.engagement_count || 0))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Social Media Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platform Distribution */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Platform Distribution</h3>
              <div className="space-y-2">
                {Object.entries(platformData).map(([platform, count]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{platform}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Sentiment Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Positive</span>
                    <span>{sentimentData.positive}</span>
                  </div>
                  <Progress value={(sentimentData.positive / socialPosts.length) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Neutral</span>
                    <span>{sentimentData.neutral}</span>
                  </div>
                  <Progress value={(sentimentData.neutral / socialPosts.length) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Negative</span>
                    <span>{sentimentData.negative}</span>
                  </div>
                  <Progress value={(sentimentData.negative / socialPosts.length) * 100} className="h-2" />
                </div>
              </div>
            </div>

            {/* Top Keywords */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Trending Keywords</h3>
              <div className="flex flex-wrap gap-1">
                {topKeywords.map(([keyword, count]) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    <Hash className="h-3 w-3 mr-1" />
                    {keyword} ({count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Engagement Metrics */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Engagement</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-lg font-bold">{totalEngagement.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Engagement</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-lg font-bold">{Math.round(avgEngagement)}</p>
                    <p className="text-xs text-muted-foreground">Avg per Post</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Engagement Posts */}
      {topPosts.length > 0 && (
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">High Engagement Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {post.platform}
                      </Badge>
                      <Badge variant="secondary">{post.engagement_count} engagements</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.posted_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">{post.content}</p>
                  {post.author_username && (
                    <p className="text-xs text-muted-foreground mt-2">@{post.author_username}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
