'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Clock, MapPin, User } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  reporter: string;
  reporterRole: string;
  severity: string;
  timestamp: string;
  status: string;
  images: number;
  verifiedBy?: string;
  verificationNote?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'High waves at Puri Beach',
    description: 'Observed 4-5 meter waves with strong currents. Multiple fishing boats struggling to return.',
    location: 'Puri Beach, Odisha',
    reporter: 'Ravi Krishnan',
    reporterRole: 'citizen',
    severity: 'critical',
    timestamp: '2024-01-15T14:30:00Z',
    status: 'pending',
    images: 2
  },
  {
    id: '2', 
    title: 'Coastal flooding in Kochi',
    description: 'Water level rising rapidly near Marine Drive. Road access getting blocked.',
    location: 'Marine Drive, Kochi',
    reporter: 'Lakshmi Nair',
    reporterRole: 'citizen',
    severity: 'high',
    timestamp: '2024-01-15T13:45:00Z',
    status: 'pending',
    images: 3
  },
  {
    id: '3',
    title: 'Strong rip currents detected',
    description: 'Dangerous rip currents observed. Two swimmers rescued by lifeguards.',
    location: 'Juhu Beach, Mumbai',
    reporter: 'Anita Patel',
    reporterRole: 'citizen', 
    severity: 'moderate',
    timestamp: '2024-01-15T12:20:00Z',
    status: 'verified',
    images: 1,
    verifiedBy: 'Captain Rajesh Kumar'
  }
];

interface ReportVerificationProps {
  userRole: string;
}

export function ReportVerification({ userRole }: ReportVerificationProps) {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [verificationNote, setVerificationNote] = useState('');

  const handleVerify = (reportId: string, action: 'verify' | 'reject') => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: action === 'verify' ? 'verified' : 'rejected',
            verifiedBy: action === 'verify' ? 'Government Official' : undefined,
            verificationNote: verificationNote || undefined
          }
        : report
    ));
    setSelectedReport(null);
    setVerificationNote('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  if (userRole !== 'government' && userRole !== 'emergency_responder') {
    return null;
  }

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Report Verification
          <Badge variant="secondary">{pendingReports.length} Pending</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{report.title}</h4>
                  {getStatusIcon(report.status)}
                </div>
                <Badge className={`text-xs ${getSeverityColor(report.severity)}`}>
                  {report.severity}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(report.timestamp).toLocaleString()}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{report.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {report.location}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {report.reporter}
              </div>
              {report.images && (
                <span>{report.images} images</span>
              )}
            </div>

            {report.status === 'verified' && report.verifiedBy && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✓ Verified by {report.verifiedBy}
              </div>
            )}

            {report.status === 'pending' && (
              <div className="flex gap-2">
                {selectedReport === report.id ? (
                  <div className="w-full space-y-2">
                    <Textarea
                      placeholder="Add verification note (optional)..."
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                      className="h-20"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleVerify(report.id, 'verify')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleVerify(report.id, 'reject')}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedReport(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedReport(report.id)}
                  >
                    Review Report
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No reports to verify
          </div>
        )}
      </CardContent>
    </Card>
  );
}