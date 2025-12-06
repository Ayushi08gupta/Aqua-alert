'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { ArrowLeft, MapPin, Clock, User, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ReportDetailsPage() {
  const params = useParams();
  const { t } = useLanguage();
  const reportId = params.id as string;

  // Mock report data - in real app, fetch from database
  const report = {
    id: reportId,
    title: 'Social Media Alert: Mumbai Flooding',
    description: 'Multiple Twitter reports of severe flooding in Mumbai area. Citizens posting images of waterlogged streets and requesting immediate assistance. Emergency services have been notified.',
    hazard_type: 'flood',
    severity: 'high',
    location_name: 'Mumbai (Social Media)',
    latitude: 19.0760,
    longitude: 72.8777,
    status: 'verified',
    created_at: '2025-01-03T10:30:00Z',
    reporter: 'Social Media Analytics',
    source: 'Twitter API',
    verification_notes: 'Verified by Mumbai Emergency Services at 11:45 AM',
    affected_area: '15 sq km',
    estimated_impact: 'High - Major transportation disruption'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-3">{report.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="capitalize">
                      {report.hazard_type}
                    </Badge>
                    <Badge className={`${
                      report.severity === 'high' ? 'bg-orange-500' : 
                      report.severity === 'critical' ? 'bg-red-500' : 
                      report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    } text-white`}>
                      {report.severity.toUpperCase()}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✓ VERIFIED
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Report Description</h3>
                <p className="text-muted-foreground leading-relaxed">{report.description}</p>
              </div>

              {/* Location & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{report.location_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coordinates:</span>
                      <span>{report.latitude}, {report.longitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Affected Area:</span>
                      <span>{report.affected_area}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reported:</span>
                      <span>{new Date(report.created_at).toLocaleDateString()} {new Date(report.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="capitalize">{report.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span>{report.source}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Assessment */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Impact Assessment
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-orange-800">{report.estimated_impact}</p>
                </div>
              </div>

              {/* Verification Details */}
              <div>
                <h3 className="font-semibold mb-3">Verification Details</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">{report.verification_notes}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <Button asChild className="flex-1">
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}