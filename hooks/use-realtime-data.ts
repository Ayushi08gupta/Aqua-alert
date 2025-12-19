'use client';

import { useState, useEffect } from 'react';
import { MockDataService } from '@/lib/mock-data-service';

export function useRealtimeData() {
  const [data, setData] = useState(MockDataService.getRealtimeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(MockDataService.getRealtimeData());
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
}