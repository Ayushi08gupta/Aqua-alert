import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ReportForm } from "@/components/report/report-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function ReportPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Report Ocean Hazard</h1>
            <p className="text-muted-foreground">
              Help protect coastal communities by reporting hazards you've observed
            </p>
          </div>

          <ReportForm userId={data.user.id} />
        </div>
      </main>
    </div>
  )
}
