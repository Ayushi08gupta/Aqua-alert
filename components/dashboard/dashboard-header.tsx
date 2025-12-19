"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Waves, Plus, User, LogOut, Settings, BarChart3, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
  profile: any
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const hasAnalyticsAccess = profile?.role && ["admin", "moderator"].includes(profile.role)

  return (
    <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <div className="relative">
                  <Waves className="h-6 w-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aqua-Alert</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">🌊 LIVE</span>
                </h1>
                <p className="text-sm text-muted-foreground">Welcome back, {profile?.full_name || user.email}</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/community">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Link>
            </Button>

            {profile?.role && ['officer', 'admin', 'government', 'emergency_responder'].includes(profile.role) && (
              <Button asChild variant="outline" className="bg-transparent border-green-200 text-green-700 hover:bg-green-50">
                <Link href="/verification">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Reports
                </Link>
              </Button>
            )}

            {hasAnalyticsAccess && (
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
              </Button>
            )}

            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/report">
                <Plus className="h-4 w-4 mr-2" />
                Report Hazard
              </Link>
            </Button>

            <Button asChild variant="ghost" className="relative h-10 w-10 rounded-full">
              <Link href="/profile">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {profile?.full_name ? getInitials(profile.full_name) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </Button>
            
            <Button variant="outline" onClick={handleSignOut} className="ml-2">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
