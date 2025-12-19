'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Database, Download, Microscope } from 'lucide-react';

interface ResearcherPanelProps {
  realtimeData: any;
}

export function ResearcherPanel({ realtimeData }: ResearcherPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-purple-600" />
            Research Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded">
              <p className="text-2xl font-bold text-purple-600">{realtimeData?.severity?.risk_score?.toFixed(1) || '82.6'}</p>
              <p className="text-xs text-muted-foreground">Risk Score</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded">
              <p className="text-2xl font-bold text-orange-600">{(realtimeData?.severity?.confidence * 100)?.toFixed(0) || '87'}%</p>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Trend Analysis
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Database className="h-4 w-4 mr-2" />
            Data Validation
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Dataset
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Prediction Accuracy</span>
              <Badge variant="secondary">94.2%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Quality Score</span>
              <Badge variant="secondary">8.7/10</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Model Status</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}