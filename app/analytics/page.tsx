import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { SocialMediaAnalytics } from "@/components/analytics/social-media-analytics"
import { HazardTrends } from "@/components/analytics/hazard-trends"
import { GeographicAnalysis } from "@/components/analytics/geographic-analysis"

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

  const { data: socialPosts } = await supabase
    .from("social_media_posts")
    .select("*")
    .order("posted_at", { ascending: false })
    .limit(100)

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
          <AnalyticsOverview reports={reports || []} socialPosts={socialPosts || []} />

          {/* Charts and Trends */}
          <div className="grid lg:grid-cols-2 gap-6">
            <HazardTrends reports={reports || []} />
            <GeographicAnalysis reports={reports || []} />
          </div>

          {/* Social Media Analytics */}
          <SocialMediaAnalytics socialPosts={socialPosts || []} />
        </div>
      </main>
    </div>
  )
}
