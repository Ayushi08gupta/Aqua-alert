'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MapPin, Calendar, CheckCircle, Search, Filter, Award, MessageCircle } from 'lucide-react';
import { communityMembers, communityStats } from '@/lib/community-data';
import { HazardPredictions } from './hazard-predictions';

interface CommunityClientProps {
  user: any;
  profile: any;
  profiles: any[];
}

export function CommunityClient({ user, profile, profiles }: CommunityClientProps) {
  const { t } = useLanguage();
  const [filteredMembers, setFilteredMembers] = useState(communityMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    filterMembers();
  }, [searchTerm, roleFilter]);

  const filterMembers = () => {
    let filtered = communityMembers;

    if (searchTerm) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    setFilteredMembers(filtered);
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'citizen': return t('auth.roles.citizen');
      case 'researcher': return t('auth.roles.researcher');
      case 'emergency_responder': return t('auth.roles.emergency');
      case 'government': return t('auth.roles.government');
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('community.directory')}</h1>
          <p className="text-muted-foreground">Connect with fellow ocean guardians and coastal protection experts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('community.total')}</p>
                  <p className="text-2xl font-bold text-foreground">{communityStats.totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active This Week</p>
                  <p className="text-2xl font-bold text-foreground">{communityStats.activeThisWeek}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified Members</p>
                  <p className="text-2xl font-bold text-green-600">{communityStats.verifiedMembers}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{communityStats.totalReports}</p>
                </div>
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          {/* Filters */}
          <div className="lg:col-span-3">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search members, organizations, or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by role" />
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
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Hazard Predictions Sidebar */}
          <div className="lg:col-span-1">
            <HazardPredictions />
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('community.nomembers')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                        {member.verified && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                      </div>
                      <Badge className={`text-xs mb-2 ${getRoleColor(member.role)}`}>
                        {getRoleLabel(member.role)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-1 truncate">{member.organization}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Expertise Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {member.expertise.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{member.reportsSubmitted}</span>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}