'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Users, Search, MessageCircle, UserPlus, Shield, Microscope, AlertTriangle, Building } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  role: string;
  organization?: string;
  created_at: string;
}

interface CommunityClientProps {
  user: any;
  profile: Profile;
  profiles: Profile[];
}

const roleIcons = {
  citizen: Users,
  researcher: Microscope,
  emergency_responder: Shield,
  government: Building,
  analyst: AlertTriangle,
  admin: Shield
};

export function CommunityClient({ user, profile, profiles }: CommunityClientProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleStats = profiles.reduce((acc, p) => {
    acc[p.role] = (acc[p.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('features.community.title')}
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Community Stats */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{t('community.stats')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t('community.total')}</span>
                  <Badge variant="secondary">{profiles.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('auth.roles.citizen')}</span>
                  <Badge variant="outline">{roleStats.citizen || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('auth.roles.researcher')}</span>
                  <Badge variant="outline">{roleStats.researcher || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('auth.roles.emergency')}</span>
                  <Badge variant="outline">{roleStats.emergency_responder || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('auth.roles.government')}</span>
                  <Badge variant="outline">{roleStats.government || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Directory */}
          <div className="lg:col-span-3">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t('community.directory')}</CardTitle>
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('community.allroles')}</SelectItem>
                      <SelectItem value="citizen">{t('auth.roles.citizen')}</SelectItem>
                      <SelectItem value="researcher">{t('auth.roles.researcher')}</SelectItem>
                      <SelectItem value="emergency_responder">{t('auth.roles.emergency')}</SelectItem>
                      <SelectItem value="government">{t('auth.roles.government')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredProfiles.map((member) => {
                    const IconComponent = roleIcons[member.role as keyof typeof roleIcons] || Users;
                    return (
                      <Card key={member.id} className="border border-border/40">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{member.full_name}</h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {t(`auth.roles.${member.role}` as any)}
                                </p>
                                {member.organization && (
                                  <p className="text-xs text-muted-foreground">{member.organization}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                {filteredProfiles.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">{t('community.nomembers')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}