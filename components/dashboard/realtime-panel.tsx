'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Wind, Thermometer, Activity } from 'lucide-react';

interface RealtimePanelProps {
  data: any;
}

export function RealtimePanel({ data }: RealtimePanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Live Ocean Data
            <Badge variant="outline" className="text-xs">INCOIS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          Live Ocean Data
          <Badge variant="outline" className="text-xs">INCOIS</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Wave Height</p>
              <p className="font-semibold">{data.incois?.ocean_parameters?.wave_height_m?.toFixed(1)}m</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{data.incois?.atmospheric_parameters?.wind_speed_kmph?.toFixed(0)} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-xs text-muted-foreground">Sea Temp</p>
              <p className="font-semibold">{data.incois?.ocean_parameters?.sea_surface_temperature_c}°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Risk Score</p>
              <p className="font-semibold text-red-600">{data.severity?.risk_score?.toFixed(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mb-1">Social Media Activity</p>
          <div className="flex justify-between text-sm">
            <span>Posts/hour: {data.social?.total_posts_last_hour}</span>
            <Badge variant={data.social?.panic_index > 0.7 ? "destructive" : "secondary"}>
              Panic: {(data.social?.panic_index * 100)?.toFixed(0)}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}