'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Brain, Activity } from 'lucide-react';
import { useRealtimeData } from '@/hooks/use-realtime-data';

export function HazardPredictions() {
  const [mounted, setMounted] = useState(false);
  const realtimeData = useRealtimeData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Hazard Predictions
            <Badge variant="outline" className="text-xs">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  const prediction = realtimeData.severity;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Hazard Predictions
          <Badge variant="outline" className="text-xs">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Prediction */}
        <div className="p-4 rounded-lg border-2 border-dashed border-red-200 bg-red-50">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${getSeverityColor(prediction.predicted_severity)} border`}>
              {prediction.predicted_severity}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              Live
            </div>
          </div>
          <p className="text-sm font-medium text-red-800 mb-2">
            {prediction.recommended_action}
          </p>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{prediction.risk_score?.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Risk Score</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{(prediction.confidence * 100)?.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Confidence</p>
          </div>
        </div>

        {/* Contributing Factors */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Key Factors
          </h4>
          <div className="space-y-1">
            {prediction.contributing_factors?.slice(0, 3).map((factor: string, index: number) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                {factor}
              </div>
            ))}
          </div>
        </div>

        {/* Ocean Data Summary */}
        <div className="pt-3 border-t">
          <h4 className="text-sm font-medium mb-2">Current Conditions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wave Height:</span>
              <span className="font-medium">{realtimeData.incois?.ocean_parameters?.wave_height_m?.toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wind Speed:</span>
              <span className="font-medium">{realtimeData.incois?.atmospheric_parameters?.wind_speed_kmph?.toFixed(0)} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reports/hr:</span>
              <span className="font-medium">{realtimeData.crowd?.total_reports_last_hour}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Social Posts:</span>
              <span className="font-medium">{realtimeData.social?.total_posts_last_hour}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}