'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Plus, 
  Search, 
  Filter, 
  Users,
  Calendar,
  Star,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  MoreVertical
} from 'lucide-react';

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const trainers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gym.com',
      phone: '+91 98765 43210',
      specialization: 'Weight Training',
      experience: '8 years',
      certifications: ['ACE Certified', 'ISSA Personal Trainer'],
      rating: 4.8,
      status: 'active',
      assignedMembers: 24,
      schedule: 'Mon-Fri: 6AM-2PM, Sat: 6AM-12PM',
      location: 'Main Gym Floor',
      bio: 'Specialized in strength training and muscle building programs. Expert in Olympic lifting and powerlifting techniques.',
      hourlyRate: 800
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@gym.com',
      phone: '+91 98765 43211',
      specialization: 'Yoga & Flexibility',
      experience: '6 years',
      certifications: ['RYT 200', 'Pilates Certified'],
      rating: 4.9,
      status: 'active',
      assignedMembers: 18,
      schedule: 'Mon-Sat: 7AM-1PM, 5PM-9PM',
      location: 'Yoga Studio',
      bio: 'Certified yoga instructor specializing in Vinyasa flow, meditation, and flexibility training. Helps members achieve mind-body balance.',
      hourlyRate: 600
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@gym.com',
      phone: '+91 98765 43212',
      specialization: 'Cardio & HIIT',
      experience: '5 years',
      certifications: ['NASM Certified', 'CrossFit Level 1'],
      rating: 4.7,
      status: 'active',
      assignedMembers: 22,
      schedule: 'Mon-Fri: 2PM-10PM, Sun: 8AM-4PM',
      location: 'Cardio Zone',
      bio: 'High-energy trainer specializing in cardiovascular fitness, HIIT workouts, and endurance training. Motivates members to push their limits.',
      hourlyRate: 700
    }
  ];

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = filterSpecialization === 'all' || trainer.specialization === filterSpecialization;
    const matchesStatus = filterStatus === 'all' || trainer.status === filterStatus;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const specializations = ['Weight Training', 'Yoga & Flexibility', 'Cardio & HIIT', 'CrossFit', 'Pilates', 'Boxing'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSpecializationColor = (specialization: string) => {
    const colors = [
      'bg-primary/10 text-primary',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800'
    ];
    const index = specializations.indexOf(specialization);
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trainers</h1>
          <p className="mt-2 text-muted-foreground">Manage gym trainers, their schedules, and assigned members</p>
        </div>
        <Link
          href="/gym-crm/trainers/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Trainer
        </Link>
      </div>

      {/* Trainer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Trainers</p>
              <p className="text-2xl font-semibold text-foreground">{trainers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Members</p>
              <p className="text-2xl font-semibold text-foreground">
                {trainers.reduce((sum, trainer) => sum + trainer.assignedMembers, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
              <p className="text-2xl font-semibold text-foreground">
                {(trainers.reduce((sum, trainer) => sum + trainer.rating, 0) / trainers.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-semibold text-foreground">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search trainers by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="all">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-200">
            {/* Trainer Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-lg">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{trainer.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSpecializationColor(trainer.specialization)}`}>
                      {trainer.specialization}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-foreground">{trainer.rating}</span>
                </div>
              </div>
            </div>

            {/* Trainer Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>{trainer.experience} experience</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{trainer.assignedMembers} members assigned</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>₹{trainer.hourlyRate}/hour</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{trainer.location}</span>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Schedule</h4>
                <p className="text-sm text-muted-foreground">{trainer.schedule}</p>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{trainer.bio}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/gym-crm/trainers/${trainer.id}`}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/gym-crm/trainers/${trainer.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Calendar className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">View Schedules</span>
            <span className="text-xs text-muted-foreground">All trainers</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Users className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Assign Members</span>
            <span className="text-xs text-muted-foreground">To trainers</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Star className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Performance Review</span>
            <span className="text-xs text-muted-foreground">Trainer ratings</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Dumbbell className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Training Programs</span>
            <span className="text-xs text-muted-foreground">Create & assign</span>
          </button>
        </div>
      </div>
    </div>
  );
}
