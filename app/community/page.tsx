import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CommunityClient } from "@/components/community/community-client"

export default async function CommunityPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
  const { data: profiles } = await supabase.from("profiles").select("*").neq("id", data.user.id).limit(50)

  return <CommunityClient user={data.user} profile={profile} profiles={profiles || []} />
}