'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardClient } from './dashboard-client';

export function DemoDashboard() {
  const [demoUser, setDemoUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const demo = localStorage.getItem('demo-user');
    if (demo) {
      const user = JSON.parse(demo);
      setDemoUser({
        user: { id: user.id, email: user.email },
        profile: { id: user.id, full_name: 'Demo User', role: user.role, email: user.email }
      });
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  if (!demoUser) return <div>Loading...</div>;

  return (
    <DashboardClient 
      user={demoUser.user} 
      profile={demoUser.profile} 
      reports={[]} 
    />
  );
}