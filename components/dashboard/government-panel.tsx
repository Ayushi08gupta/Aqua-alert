'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Users, TrendingUp } from 'lucide-react';

interface GovernmentPanelProps {
  realtimeData: any;
}

export function GovernmentPanel({ realtimeData }: GovernmentPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Policy Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <p className="text-2xl font-bold text-blue-600">{realtimeData?.crowd?.total_reports_last_hour || 74}</p>
              <p className="text-xs text-muted-foreground">Reports Today</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="text-2xl font-bold text-green-600">{realtimeData?.crowd?.verified_reports || 18}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Weekly Summary Report
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <TrendingUp className="h-4 w-4 mr-2" />
            Risk Assessment Report
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Verify Citizen Reports
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Resource Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Emergency Teams</span>
              <Badge variant="secondary">12 Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Evacuation Centers</span>
              <Badge variant="secondary">8 Ready</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Alert Systems</span>
              <Badge variant="secondary">Online</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}