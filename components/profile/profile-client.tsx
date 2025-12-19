'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Building, Calendar, Edit, Save, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileClientProps {
  user: any;
  profile: any;
}

export function ProfileClient({ user, profile }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    organization: profile?.organization || '',
    role: profile?.role || 'citizen'
  });
  const [loading, setLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setFormData({
        full_name: parsed.full_name || '',
        organization: parsed.organization || '',
        role: parsed.role || 'citizen'
      });
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    
    // Save to localStorage for permanent storage
    const profileData = {
      id: user.id,
      ...formData,
      email: user.email
    };
    
    localStorage.setItem('user-profile', JSON.stringify(profileData));
    
    // Also try to save to database
    try {
      const supabase = createClient();
      await supabase.from('profiles').upsert(profileData);
    } catch (error) {
      console.log('Database save failed, using localStorage');
    }
    
    setIsEditing(false);
    setLoading(false);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'citizen': return 'Citizen Reporter';
      case 'researcher': return 'Researcher';
      case 'emergency_responder': return 'Emergency Responder';
      case 'government': return 'Government Official';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'citizen': return 'bg-blue-100 text-blue-800';
      case 'researcher': return 'bg-purple-100 text-purple-800';
      case 'emergency_responder': return 'bg-red-100 text-red-800';
      case 'government': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">View and manage your account information</p>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {formData.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{formData.full_name || 'Unknown User'}</h3>
                  <Badge className={`${getRoleColor(formData.role)} mt-1`}>
                    {getRoleLabel(formData.role)}
                  </Badge>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="email" value={user.email} disabled className="bg-muted" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.full_name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization</Label>
                  {isEditing ? (
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="Your organization (optional)"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.organization || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizen">Citizen Reporter</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="emergency_responder">Emergency Responder</SelectItem>
                        <SelectItem value="government">Government Official</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(formData.role)}>
                        {getRoleLabel(formData.role)}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Account Created</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(user.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}