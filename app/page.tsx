import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Waves, Shield, Users, BarChart3, MapPin, AlertTriangle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Waves className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Ocean Hazard Platform</h1>
                <p className="text-sm text-muted-foreground">Protecting coastal communities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button asChild variant="outline">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
              Crowdsourced Ocean Hazard Reporting & Analytics
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join our community-driven platform to report, track, and analyze ocean hazards. Together, we protect
              coastal communities through real-time data and social media insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/auth/signup">Start Reporting</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for ocean hazard monitoring and community protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interactive Mapping</CardTitle>
                <CardDescription>
                  Real-time hazard visualization with pulsing hotspots and geographic clustering
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-fit">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Citizen Reporting</CardTitle>
                <CardDescription>
                  Easy-to-use forms for reporting tsunamis, hurricanes, oil spills, and other ocean hazards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-chart-3/10 p-3 rounded-lg w-fit">
                  <BarChart3 className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>Social Media Analytics</CardTitle>
                <CardDescription>
                  AI-powered analysis of social media posts for early hazard detection and sentiment tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-chart-4/10 p-3 rounded-lg w-fit">
                  <Shield className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle>Verification System</CardTitle>
                <CardDescription>
                  Multi-level verification process ensuring data accuracy and reliability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-chart-5/10 p-3 rounded-lg w-fit">
                  <Users className="h-6 w-6 text-chart-5" />
                </div>
                <CardTitle>Community Collaboration</CardTitle>
                <CardDescription>Connect with researchers, emergency responders, and fellow citizens</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>Instant notifications for critical hazards in your area</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="border-0 shadow-xl bg-primary/5 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of citizens, researchers, and emergency responders working together to protect our
                coastal communities.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/auth/signup">Join the Platform</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Ocean Hazard Platform</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Protecting coastal communities through collaborative hazard reporting and analytics.
          </p>
        </div>
      </footer>
    </div>
  )
}
