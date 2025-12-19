'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RoleFixerProps {
  userId: string;
  onRoleFixed: (role: string) => void;
}

export function RoleFixer({ userId, onRoleFixed }: RoleFixerProps) {
  const [loading, setLoading] = useState(false);

  const fixRole = () => {
    setLoading(true);
    
    // Store role in localStorage as fallback
    localStorage.setItem('user-role', 'government');
    localStorage.setItem('user-profile', JSON.stringify({
      id: userId,
      role: 'government',
      full_name: 'Government Official',
      organization: 'Government Department'
    }));
    
    // Update parent component
    onRoleFixed('government');
    setLoading(false);
  };

  return (
    <Button onClick={fixRole} disabled={loading} className="bg-red-600 hover:bg-red-700">
      {loading ? 'Fixing...' : 'Fix Role to Government'}
    </Button>
  );
}