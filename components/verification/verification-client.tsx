'use client';

import { useLanguage } from '@/contexts/language-context';
import { OfficerVerification } from '@/components/dashboard/officer-verification';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Shield } from 'lucide-react';

interface VerificationClientProps {
  user: any;
  profile: any;
}

export function VerificationClient({ user, profile }: VerificationClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Report Verification Center
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <OfficerVerification userRole={profile.role} />
      </main>
    </div>
  );
}