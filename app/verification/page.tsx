import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { VerificationClient } from "@/components/verification/verification-client"

export default async function VerificationPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
  
  // Only allow officers/officials
  if (!profile || !['officer', 'admin', 'government', 'emergency_responder'].includes(profile.role)) {
    redirect("/dashboard")
  }

  return <VerificationClient user={data.user} profile={profile} />
}