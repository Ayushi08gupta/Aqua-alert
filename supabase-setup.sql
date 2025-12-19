-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  organization TEXT,
  role TEXT DEFAULT 'citizen',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hazard_reports table for storing citizen reports
CREATE TABLE IF NOT EXISTS public.hazard_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  hazard_type TEXT NOT NULL CHECK (hazard_type IN ('tsunami', 'hurricane', 'storm_surge', 'coastal_flooding', 'rip_current', 'marine_debris', 'oil_spill', 'harmful_algae', 'other')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'investigating', 'resolved', 'false_alarm')),
  image_url TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hazard_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Hazard reports policies
CREATE POLICY "reports_select_all" ON public.hazard_reports
  FOR SELECT USING (true);

CREATE POLICY "reports_insert_own" ON public.hazard_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reports_update_own" ON public.hazard_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hazard_reports_user_id ON public.hazard_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_created_at ON public.hazard_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_hazard_type ON public.hazard_reports(hazard_type);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_severity ON public.hazard_reports(severity);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_status ON public.hazard_reports(status);

-- Insert sample data for testing
INSERT INTO public.hazard_reports (
  user_id, title, description, hazard_type, severity, 
  latitude, longitude, location_name, status
) VALUES 
  (
    '00000000-0000-0000-0000-000000000000',
    'High waves at Marina Beach',
    'Observed 3-4 meter waves with strong currents near the shore.',
    'storm_surge',
    'high',
    13.0827,
    80.2707,
    'Marina Beach, Chennai',
    'verified'
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'Oil spill near Kochi port',
    'Small oil spill detected near the fishing harbor.',
    'oil_spill',
    'medium',
    9.9312,
    76.2673,
    'Kochi Port, Kerala',
    'investigating'
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'Strong rip currents at Juhu Beach',
    'Dangerous rip currents observed. Swimmers advised to stay away.',
    'rip_current',
    'critical',
    19.1075,
    72.8263,
    'Juhu Beach, Mumbai',
    'pending'
  )
ON CONFLICT DO NOTHING;