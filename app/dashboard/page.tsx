import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HazardMap } from "@/components/dashboard/hazard-map"
import { HazardStats } from "@/components/dashboard/hazard-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch recent hazard reports
  const { data: reports } = await supabase
    .from("hazard_reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-2xl font-bold text-foreground mb-2">Ocean Hazard Map</h2>
                <p className="text-muted-foreground">Real-time visualization of reported hazards</p>
              </div>
              <div className="h-[600px]">
                <HazardMap reports={reports || []} />
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <HazardStats reports={reports || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
