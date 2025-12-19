'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Siren, Radio, Users, Clock } from 'lucide-react';

interface EmergencyPanelProps {
  realtimeData: any;
}

export function EmergencyPanel({ realtimeData }: EmergencyPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Siren className="h-5 w-5 text-red-600" />
            Emergency Response
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-red-50 rounded">
              <p className="text-2xl font-bold text-red-600">{realtimeData?.crowd?.critical_reports || 29}</p>
              <p className="text-xs text-muted-foreground">Critical Alerts</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded">
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-xs text-muted-foreground">Teams Deployed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
            <Siren className="h-4 w-4 mr-2" />
            Issue Emergency Alert
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Deploy Response Team
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Radio className="h-4 w-4 mr-2" />
            Coordinate with Agencies
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-sm">Puri Beach - High Waves</span>
              <Badge variant="destructive">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="text-sm">Coastal Road - Flooding</span>
              <Badge variant="secondary">Monitoring</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span className="text-sm">Marina - Oil Spill</span>
              <Badge className="bg-green-100 text-green-800">Resolved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}