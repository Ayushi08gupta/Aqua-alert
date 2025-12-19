'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface CitizenPanelProps {
  realtimeData: any;
}

export function CitizenPanel({ realtimeData }: CitizenPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Report Ocean Hazard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Help protect your community by reporting ocean hazards you observe.
          </p>
          <Link href="/report">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Submit New Report
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Current Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
              <span className="text-sm">High Wave Warning</span>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
              <span className="text-sm">Storm Surge Risk</span>
              <Badge variant="secondary">Moderate</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            My Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Track the status of your submitted reports and their verification progress.
          </p>
          <Button variant="outline" className="w-full mt-3">
            View My Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}