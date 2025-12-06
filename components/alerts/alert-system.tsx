'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Volume2, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'high';
  title: string;
  message: string;
  location: string;
  timestamp: string;
}

export function AlertSystem() {
  const { language, t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setIsEnabled(permission === 'granted');
      });
    }

    const checkForAlerts = () => {
      const verifications = JSON.parse(localStorage.getItem('reportVerifications') || '{}');
      const userReports = JSON.parse(localStorage.getItem('userHazardReports') || '[]');
      
      const newAlerts: Alert[] = [];
      
      Object.entries(verifications).forEach(([reportId, verification]: [string, any]) => {
        if (verification.status === 'verified') {
          const report = userReports.find((r: any) => r.id === reportId);
          if (report && (report.severity === 'critical' || report.severity === 'high')) {
            const alertExists = alerts.some(a => a.id === reportId);
            if (!alertExists) {
              const alert: Alert = {
                id: reportId,
                type: report.severity,
                title: getLocalizedTitle(report.hazard_type),
                message: getLocalizedMessage(report.hazard_type, report.location, report.severity),
                location: report.location,
                timestamp: new Date().toISOString()
              };
              newAlerts.push(alert);
            }
          }
        }
      });

      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 5));
        newAlerts.forEach(alert => {
          showAlert(alert);
          speakAlert(alert);
        });
      }
    };

    const interval = setInterval(checkForAlerts, 2000);
    return () => clearInterval(interval);
  }, [alerts, language]);

  const getLocalizedTitle = (hazardType: string) => {
    return t(`alerts.${hazardType}` as any) || 'HAZARD ALERT';
  };

  const getLocalizedMessage = (hazardType: string, location: string, severity: string) => {
    const hazardName = hazardType.replace('_', ' ');
    const message = t(`alerts.${severity}` as any) || `Hazard in ${location}`;
    return message.replace('{hazard}', hazardName).replace('{location}', location);
  };

  const showAlert = (alert: Alert) => {
    if (isEnabled) {
      new Notification(alert.title, {
        body: alert.message,
        icon: '/favicon.ico'
      });
    }
  };

  const speakAlert = (alert: Alert) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${alert.title}. ${alert.message}`);
      utterance.rate = 0.8;
      utterance.volume = 1;
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const replayAlert = (alert: Alert) => {
    speakAlert(alert);
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {alerts.map(alert => (
        <Card key={alert.id} className={`border-2 shadow-xl ${
          alert.type === 'critical' ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'
        }`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${
                  alert.type === 'critical' ? 'text-red-600' : 'text-orange-600'
                }`} />
                <CardTitle className={`text-sm ${
                  alert.type === 'critical' ? 'text-red-800' : 'text-orange-800'
                }`}>
                  {alert.title}
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-xs mb-3 ${
              alert.type === 'critical' ? 'text-red-700' : 'text-orange-700'
            }`}>
              {alert.message}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">{alert.location}</Badge>
              <Button size="sm" variant="outline" onClick={() => replayAlert(alert)} className="h-6 px-2">
                <Volume2 className="h-3 w-3 mr-1" />
                {t('alerts.replay')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}