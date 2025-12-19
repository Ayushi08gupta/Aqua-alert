export const communityMembers = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    role: 'researcher',
    organization: 'Indian Institute of Technology, Chennai',
    location: 'Chennai, Tamil Nadu',
    joinDate: '2023-08-15',
    reportsSubmitted: 47,
    verified: true,
    expertise: ['Coastal Engineering', 'Tsunami Research'],
    avatar: 'PS'
  },
  {
    id: '2', 
    name: 'Captain Rajesh Kumar',
    role: 'emergency_responder',
    organization: 'Indian Coast Guard',
    location: 'Mumbai, Maharashtra',
    joinDate: '2023-09-22',
    reportsSubmitted: 89,
    verified: true,
    expertise: ['Marine Rescue', 'Emergency Response'],
    avatar: 'RK'
  },
  {
    id: '3',
    name: 'Anita Patel',
    role: 'citizen',
    organization: 'Local Fishing Community',
    location: 'Porbandar, Gujarat',
    joinDate: '2024-01-10',
    reportsSubmitted: 23,
    verified: true,
    expertise: ['Local Weather Patterns', 'Fishing Safety'],
    avatar: 'AP'
  },
  {
    id: '4',
    name: 'Dr. Mohammed Hassan',
    role: 'government',
    organization: 'Ministry of Earth Sciences',
    location: 'New Delhi',
    joinDate: '2023-07-03',
    reportsSubmitted: 12,
    verified: true,
    expertise: ['Policy Development', 'Disaster Management'],
    avatar: 'MH'
  },
  {
    id: '5',
    name: 'Lakshmi Nair',
    role: 'citizen',
    organization: 'Coastal Residents Association',
    location: 'Kochi, Kerala',
    joinDate: '2024-02-18',
    reportsSubmitted: 31,
    verified: true,
    expertise: ['Community Outreach', 'Local Knowledge'],
    avatar: 'LN'
  },
  {
    id: '6',
    name: 'Prof. Suresh Babu',
    role: 'researcher',
    organization: 'National Institute of Oceanography',
    location: 'Goa',
    joinDate: '2023-06-12',
    reportsSubmitted: 67,
    verified: true,
    expertise: ['Marine Biology', 'Ocean Currents'],
    avatar: 'SB'
  },
  {
    id: '7',
    name: 'Inspector Meera Singh',
    role: 'emergency_responder',
    organization: 'State Disaster Response Force',
    location: 'Bhubaneswar, Odisha',
    joinDate: '2023-11-08',
    reportsSubmitted: 54,
    verified: true,
    expertise: ['Disaster Response', 'Community Safety'],
    avatar: 'MS'
  },
  {
    id: '8',
    name: 'Ravi Krishnan',
    role: 'citizen',
    organization: 'Fishermen Welfare Society',
    location: 'Visakhapatnam, Andhra Pradesh',
    joinDate: '2024-03-05',
    reportsSubmitted: 19,
    verified: false,
    expertise: ['Traditional Fishing', 'Sea Conditions'],
    avatar: 'RK'
  }
];

export const communityStats = {
  totalMembers: 1247,
  activeThisWeek: 89,
  verifiedMembers: 892,
  totalReports: 3456,
  roleDistribution: {
    citizen: 687,
    researcher: 234,
    emergency_responder: 189,
    government: 137
  }
};