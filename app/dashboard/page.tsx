import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HazardMap } from "@/components/dashboard/hazard-map"
import { HazardStats } from "@/components/dashboard/hazard-stats"
import { ResearcherControls } from "@/components/dashboard/researcher-controls"
import { VerifiedMap } from "@/components/dashboard/verified-map"
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { DemoDashboard } from "@/components/dashboard/demo-dashboard"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    // Return demo dashboard component that will check localStorage
    return <DemoDashboard />
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
    <DashboardClient 
      user={data.user} 
      profile={profile} 
      reports={reports || []} 
    />
  )
}
