'use client';

import { useLanguage } from '@/contexts/language-context';
import { ReportForm } from '@/components/report/report-form';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Waves } from 'lucide-react';

interface ReportClientProps {
  userId: string;
}

export function ReportClient({ userId }: ReportClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('report.title')}
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('report.title')}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {t('hero.description')}
            </p>
          </div>

          <ReportForm userId={userId} />
        </div>
      </main>
    </div>
  );
}