import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { SocialMediaAnalytics } from "@/components/analytics/social-media-analytics"
import { SocialAnalyticsEngine } from "@/lib/social-analytics"
import { HazardTrends } from "@/components/analytics/hazard-trends"
import { GeographicAnalysis } from "@/components/analytics/geographic-analysis"

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Check if user has analytics access (admin/moderator)
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile || !["admin", "moderator"].includes(profile.role)) {
    redirect("/dashboard")
  }

  // Fetch analytics data
  const { data: reports } = await supabase.from("hazard_reports").select("*").order("created_at", { ascending: false })

  // Mock social media data with analytics
  const mockSocialPosts = [
    {
      id: '1',
      text: 'Severe flooding happening right now in Mumbai Marine Drive area. Water rising rapidly!',
      created_at: new Date().toISOString(),
      user: { id: '1', username: 'mumbai_news', verified: true, follower_count: 50000 },
      location: { lat: 18.9220, lon: 72.8347, place_text: 'Mumbai Marine Drive' },
      language: 'en',
      platform: 'twitter',
      attachments: ['flood_image.jpg']
    },
    {
      id: '2', 
      text: 'High waves and storm surge reported near Chennai coast. Fishermen advised to stay away.',
      created_at: new Date().toISOString(),
      user: { id: '2', username: 'chennai_weather', verified: false, follower_count: 1200 },
      location: { lat: 13.0827, lon: 80.2707, place_text: 'Chennai' },
      language: 'en',
      platform: 'twitter', 
      attachments: []
    }
  ]

  // Process posts through analytics engine
  const analyzedPosts = mockSocialPosts.map(post => ({
    ...post,
    analytics: SocialAnalyticsEngine.analyzePost(post),
    filter: SocialAnalyticsEngine.filterPost(post)
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into ocean hazard patterns and social media sentiment
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview Section */}
          <AnalyticsOverview reports={reports || []} socialPosts={analyzedPosts || []} />

          {/* Charts and Trends */}
          <div className="grid lg:grid-cols-2 gap-6">
            <HazardTrends reports={reports || []} />
            <GeographicAnalysis reports={reports || []} />
          </div>

          {/* Social Media Analytics */}
          <SocialMediaAnalytics socialPosts={analyzedPosts} />
        </div>
      </main>
    </div>
  )
}
