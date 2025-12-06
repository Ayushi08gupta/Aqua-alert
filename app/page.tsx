'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Waves, Shield, Users, BarChart3, MapPin, AlertTriangle } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <div className="relative">
                  <Waves className="h-6 w-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('header.title')}</h1>
                <p className="text-sm text-muted-foreground">{t('header.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <Button asChild variant="outline">
                <Link href="/auth/login">{t('header.signin')}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">{t('header.getstarted')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-xl">
                <Waves className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-balance">
                {t('hero.title')}
              </h1>
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">
              {t('hero.subtitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/auth/signup">{t('hero.startreporting')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/dashboard">{t('hero.viewdashboard')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('features.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('features.mapping.title')}</CardTitle>
                <CardDescription>
                  {t('features.mapping.desc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-fit">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t('features.reporting.title')}</CardTitle>
                <CardDescription>
                  {t('features.reporting.desc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-chart-3/10 p-3 rounded-lg w-fit">
                  <BarChart3 className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>{t('features.analytics.title')}</CardTitle>
                <CardDescription>
                  {t('features.analytics.desc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-chart-4/10 p-3 rounded-lg w-fit">
                  <Shield className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle>{t('features.verification.title')}</CardTitle>
                <CardDescription>
                  {t('features.verification.desc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
              <Link href="/community">
                <CardHeader>
                  <div className="bg-chart-5/10 p-3 rounded-lg w-fit">
                    <Users className="h-6 w-6 text-chart-5" />
                  </div>
                  <CardTitle>{t('features.community.title')}</CardTitle>
                  <CardDescription>{t('features.community.desc')}</CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('features.alerts.title')}</CardTitle>
                <CardDescription>{t('features.alerts.desc')}</CardDescription>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('cta.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/auth/signup">{t('cta.join')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('header.title')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.description')}
          </p>
        </div>
      </footer>
    </div>
  )
}
