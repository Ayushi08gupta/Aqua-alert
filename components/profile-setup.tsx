'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileSetupProps {
  userId: string;
  onComplete: () => void;
}

export function ProfileSetup({ userId, onComplete }: ProfileSetupProps) {
  const [role, setRole] = useState('citizen');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      role: role,
      full_name: 'User',
      email: ''
    });

    if (!error) {
      onComplete();
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <h3 className="font-semibold mb-2">Complete Your Profile</h3>
      <div className="flex gap-2 items-center">
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="citizen">Citizen Reporter</SelectItem>
            <SelectItem value="researcher">Researcher</SelectItem>
            <SelectItem value="emergency_responder">Emergency Responder</SelectItem>
            <SelectItem value="government">Government Official</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}