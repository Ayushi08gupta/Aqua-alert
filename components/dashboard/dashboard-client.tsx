'use client';

import { useLanguage } from '@/contexts/language-context';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { HazardMap } from '@/components/dashboard/hazard-map';
import { HazardStats } from '@/components/dashboard/hazard-stats';
import { ResearcherControls } from '@/components/dashboard/researcher-controls';
import { OfficerVerification } from '@/components/dashboard/officer-verification';
import { AlertSystem } from '@/components/alerts/alert-system';

interface DashboardClientProps {
  user: any;
  profile: any;
  reports: any[];
}

export function DashboardClient({ user, profile, reports }: DashboardClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.title')}</h2>
                <p className="text-muted-foreground">{t('dashboard.overview')}</p>
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

        {/* Officer Verification Panel - Debug: Always show */}
        <div className="mt-6">
          <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm">Debug Info - User Role: <strong>{profile?.role || 'No role'}</strong></p>
            <p className="text-sm">User ID: {user?.id}</p>
          </div>
          <OfficerVerification userRole={profile?.role || 'citizen'} reports={reports} />
        </div>

        {/* Researcher Controls - Only visible for researchers/analysts */}
        {profile && ['researcher', 'analyst', 'admin'].includes(profile.role) && (
          <div className="mt-6">
            <ResearcherControls
              reports={reports || []}
              onReportUpdate={(updatedReport) => {
                console.log('Report updated:', updatedReport);
              }}
              onReportDelete={(reportId) => {
                console.log('Report deleted:', reportId);
              }}
            />
          </div>
        )}
      </main>
      
      <AlertSystem />
    </div>
  );
}