'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/contexts/language-context';
import { useRealtimeData } from '@/hooks/use-realtime-data';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { HazardMap } from '@/components/dashboard/hazard-map';
import { HazardStats } from '@/components/dashboard/hazard-stats';
import { ResearcherControls } from '@/components/dashboard/researcher-controls';
import { OfficerVerification } from '@/components/dashboard/officer-verification';
import { AlertSystem } from '@/components/alerts/alert-system';

import { RealtimePanel } from '@/components/dashboard/realtime-panel';
import { CitizenPanel } from '@/components/dashboard/citizen-panel';
import { GovernmentPanel } from '@/components/dashboard/government-panel';
import { ReportVerification } from '@/components/dashboard/report-verification';
import { ResearcherPanel } from '@/components/dashboard/researcher-panel';
import { EmergencyPanel } from '@/components/dashboard/emergency-panel';


interface DashboardClientProps {
  user: any;
  profile: any;
  reports: any[];
}

export function DashboardClient({ user, profile, reports }: DashboardClientProps) {
  const { t } = useLanguage();
  const [currentProfile, setCurrentProfile] = useState(profile);
  const realtimeData = useRealtimeData();

  // Check localStorage for role
  useEffect(() => {
    const storedProfile = localStorage.getItem('user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setCurrentProfile(parsed);
    }
  }, []);

  const handleRoleFixed = (role: string) => {
    setCurrentProfile({
      ...currentProfile,
      role: role,
      full_name: 'Government Official',
      organization: 'Government Department'
    });
  };

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

          {/* Role-specific Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <RealtimePanel data={realtimeData} />
            
            {/* Role-specific panels */}
            {currentProfile?.role === 'citizen' && <CitizenPanel realtimeData={realtimeData} />}
            {currentProfile?.role === 'government' && <GovernmentPanel realtimeData={realtimeData} />}
            {currentProfile?.role === 'researcher' && <ResearcherPanel realtimeData={realtimeData} />}
            {currentProfile?.role === 'emergency_responder' && <EmergencyPanel realtimeData={realtimeData} />}
            
            {/* Default to citizen panel if no role */}
            {!currentProfile?.role && <CitizenPanel realtimeData={realtimeData} />}
          </div>
        </div>

        {/* Report Verification Panel - Government Officials */}
        {(currentProfile?.role === 'government' || currentProfile?.role === 'emergency_responder') && (
          <div className="mt-6">
            <ReportVerification userRole={currentProfile.role} />
          </div>
        )}

        {/* Officer Verification Panel */}
        {currentProfile?.role && (
          <div className="mt-6">
            <OfficerVerification userRole={currentProfile.role} reports={reports} />
          </div>
        )}

        {/* Researcher Controls - Only visible for researchers/analysts */}
        {currentProfile && ['researcher', 'analyst', 'admin'].includes(currentProfile.role) && (
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