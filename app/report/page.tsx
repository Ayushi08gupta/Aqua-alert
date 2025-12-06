import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ReportClient } from "@/components/report/report-client"

export default async function ReportPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return <ReportClient userId={data.user.id} />
}
