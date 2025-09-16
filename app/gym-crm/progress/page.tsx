'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Plus,
  Weight,
  Ruler,
  Activity,
  Target,
  Calendar,
  BarChart3,
  Download,
  Share2
} from 'lucide-react';

export default function ProgressPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const members = [
    {
      id: 1,
      name: 'Rahul Sharma',
      membershipType: 'Premium',
      startDate: '2024-01-15',
      currentWeight: 75.5,
      targetWeight: 70.0,
      height: 175,
      bmi: 24.7,
      bodyFat: 18.5,
      muscleMass: 45.2,
      measurements: {
        chest: 95,
        waist: 82,
        hips: 98,
        biceps: 32,
        thighs: 58
      },
      progress: [
        { date: '2024-01-15', weight: 80.0, bmi: 26.1, bodyFat: 22.0 },
        { date: '2024-02-15', weight: 78.5, bmi: 25.6, bodyFat: 20.5 },
        { date: '2024-03-15', weight: 77.0, bmi: 25.1, bodyFat: 19.5 },
        { date: '2024-04-15', weight: 76.0, bmi: 24.8, bodyFat: 19.0 },
        { date: '2024-05-15', weight: 75.5, bmi: 24.7, bodyFat: 18.5 }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      membershipType: 'Standard',
      startDate: '2024-02-01',
      currentWeight: 58.0,
      targetWeight: 55.0,
      height: 162,
      bmi: 22.1,
      bodyFat: 25.0,
      muscleMass: 38.5,
      measurements: {
        chest: 82,
        waist: 68,
        hips: 88,
        biceps: 26,
        thighs: 52
      },
      progress: [
        { date: '2024-02-01', weight: 62.0, bmi: 23.6, bodyFat: 28.0 },
        { date: '2024-03-01', weight: 60.5, bmi: 23.0, bodyFat: 26.5 },
        { date: '2024-04-01', weight: 59.0, bmi: 22.5, bodyFat: 25.5 },
        { date: '2024-05-01', weight: 58.5, bmi: 22.3, bodyFat: 25.0 },
        { date: '2024-06-01', weight: 58.0, bmi: 22.1, bodyFat: 25.0 }
      ]
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMemberData = selectedMember === 'all' ? members[0] : members.find(m => m.id.toString() === selectedMember);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const getProgressPercentage = (current: number, target: number, start: number) => {
    const totalChange = Math.abs(target - start);
    const currentChange = Math.abs(current - start);
    return Math.min((currentChange / totalChange) * 100, 100);
  };

  const getBodyFatCategory = (bodyFat: number, gender: string = 'male') => {
    if (gender === 'male') {
      if (bodyFat < 6) return { category: 'Essential', color: 'text-blue-600' };
      if (bodyFat < 14) return { category: 'Athletes', color: 'text-green-600' };
      if (bodyFat < 18) return { category: 'Fitness', color: 'text-yellow-600' };
      if (bodyFat < 25) return { category: 'Average', color: 'text-orange-600' };
      return { category: 'Obese', color: 'text-red-600' };
    } else {
      if (bodyFat < 14) return { category: 'Essential', color: 'text-blue-600' };
      if (bodyFat < 21) return { category: 'Athletes', color: 'text-green-600' };
      if (bodyFat < 25) return { category: 'Fitness', color: 'text-yellow-600' };
      if (bodyFat < 32) return { category: 'Average', color: 'text-orange-600' };
      return { category: 'Obese', color: 'text-red-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
          <p className="mt-2 text-muted-foreground">Track member fitness progress, measurements, and goals</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Progress Entry
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="all">All Members</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="weight">Weight</option>
              <option value="bmi">BMI</option>
              <option value="bodyFat">Body Fat</option>
              <option value="measurements">Measurements</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      {selectedMemberData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weight Progress */}
          <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Weight Progress</h3>
              <Weight className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Weight</span>
                <span className="text-lg font-semibold text-foreground">{selectedMemberData.currentWeight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Target Weight</span>
                <span className="text-lg font-semibold text-foreground">{selectedMemberData.targetWeight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-primary">
                  {getProgressPercentage(selectedMemberData.currentWeight, selectedMemberData.targetWeight, selectedMemberData.progress[0].weight).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(selectedMemberData.currentWeight, selectedMemberData.targetWeight, selectedMemberData.progress[0].weight)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* BMI & Body Composition */}
          <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Body Composition</h3>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">BMI</span>
                <div className="text-right">
                  <span className="text-lg font-semibold text-foreground">{selectedMemberData.bmi}</span>
                  <span className={`ml-2 text-sm font-medium ${getBMICategory(selectedMemberData.bmi).color}`}>
                    ({getBMICategory(selectedMemberData.bmi).category})
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Body Fat</span>
                <div className="text-right">
                  <span className="text-lg font-semibold text-foreground">{selectedMemberData.bodyFat}%</span>
                  <span className={`ml-2 text-sm font-medium ${getBodyFatCategory(selectedMemberData.bodyFat).color}`}>
                    ({getBodyFatCategory(selectedMemberData.bodyFat).category})
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Muscle Mass</span>
                <span className="text-lg font-semibold text-foreground">{selectedMemberData.muscleMass} kg</span>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Body Measurements</h3>
              <Ruler className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Chest</span>
                <span className="text-sm font-medium text-foreground">{selectedMemberData.measurements.chest} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Waist</span>
                <span className="text-sm font-medium text-foreground">{selectedMemberData.measurements.waist} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Hips</span>
                <span className="text-sm font-medium text-foreground">{selectedMemberData.measurements.hips} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Biceps</span>
                <span className="text-sm font-medium text-foreground">{selectedMemberData.measurements.biceps} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Thighs</span>
                <span className="text-sm font-medium text-foreground">{selectedMemberData.measurements.thighs} cm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Chart */}
      {selectedMemberData && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-foreground">Progress Over Time</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Progress Chart</p>
              <p className="text-xs text-muted-foreground">Chart visualization would go here</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            {selectedMemberData.progress.map((entry, index) => (
              <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium text-foreground">{entry.weight} kg</div>
                <div className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">BMI: {entry.bmi}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members Progress List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">All Members Progress</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Start Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Current Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Target Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  BMI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.membershipType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member.progress[0].weight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member.currentWeight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member.targetWeight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-muted rounded-full h-2 mr-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${getProgressPercentage(member.currentWeight, member.targetWeight, member.progress[0].weight)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-foreground">
                        {getProgressPercentage(member.currentWeight, member.targetWeight, member.progress[0].weight).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{member.bmi}</div>
                    <div className={`text-xs ${getBMICategory(member.bmi).color}`}>
                      {getBMICategory(member.bmi).category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80 transition-colors">View Details</button>
                      <button className="text-indigo-600 hover:text-indigo-800 transition-colors">Add Entry</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Plus className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">Add Progress</span>
            <span className="text-xs text-muted-foreground">New entry</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Target className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Set Goals</span>
            <span className="text-xs text-muted-foreground">Target metrics</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Download className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Export Report</span>
            <span className="text-xs text-muted-foreground">PDF/Excel</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Share2 className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Share Progress</span>
            <span className="text-xs text-muted-foreground">With members</span>
          </button>
        </div>
      </div>
    </div>
  );
}
