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
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="mt-2 text-gray-600">Track member fitness progress, measurements, and goals</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Progress Entry
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Members</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Weight Progress</h3>
              <Weight className="h-6 w-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Weight</span>
                <span className="text-lg font-semibold text-gray-900">{selectedMemberData.currentWeight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Target Weight</span>
                <span className="text-lg font-semibold text-gray-900">{selectedMemberData.targetWeight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-blue-600">
                  {getProgressPercentage(selectedMemberData.currentWeight, selectedMemberData.targetWeight, selectedMemberData.progress[0].weight).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(selectedMemberData.currentWeight, selectedMemberData.targetWeight, selectedMemberData.progress[0].weight)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* BMI & Body Composition */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Body Composition</h3>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">BMI</span>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">{selectedMemberData.bmi}</span>
                  <span className={`ml-2 text-sm font-medium ${getBMICategory(selectedMemberData.bmi).color}`}>
                    ({getBMICategory(selectedMemberData.bmi).category})
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Body Fat</span>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">{selectedMemberData.bodyFat}%</span>
                  <span className={`ml-2 text-sm font-medium ${getBodyFatCategory(selectedMemberData.bodyFat).color}`}>
                    ({getBodyFatCategory(selectedMemberData.bodyFat).category})
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Muscle Mass</span>
                <span className="text-lg font-semibold text-gray-900">{selectedMemberData.muscleMass} kg</span>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Body Measurements</h3>
              <Ruler className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Chest</span>
                <span className="text-sm font-medium text-gray-900">{selectedMemberData.measurements.chest} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Waist</span>
                <span className="text-sm font-medium text-gray-900">{selectedMemberData.measurements.waist} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Hips</span>
                <span className="text-sm font-medium text-gray-900">{selectedMemberData.measurements.hips} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Biceps</span>
                <span className="text-sm font-medium text-gray-900">{selectedMemberData.measurements.biceps} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Thighs</span>
                <span className="text-sm font-medium text-gray-900">{selectedMemberData.measurements.thighs} cm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Chart */}
      {selectedMemberData && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Progress Over Time</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Progress Chart</p>
              <p className="text-xs text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            {selectedMemberData.progress.map((entry, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">{entry.weight} kg</div>
                <div className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString()}</div>
                <div className="text-xs text-gray-400">BMI: {entry.bmi}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members Progress List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Members Progress</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BMI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.membershipType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.progress[0].weight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.currentWeight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.targetWeight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getProgressPercentage(member.currentWeight, member.targetWeight, member.progress[0].weight)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {getProgressPercentage(member.currentWeight, member.targetWeight, member.progress[0].weight).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.bmi}</div>
                    <div className={`text-xs ${getBMICategory(member.bmi).color}`}>
                      {getBMICategory(member.bmi).category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View Details</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Add Entry</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
            <Plus className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Progress</span>
            <span className="text-xs text-gray-500">New entry</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
            <Target className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">Set Goals</span>
            <span className="text-xs text-gray-500">Target metrics</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
            <Download className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">Export Report</span>
            <span className="text-xs text-gray-500">PDF/Excel</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
            <Share2 className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">Share Progress</span>
            <span className="text-xs text-gray-500">With members</span>
          </button>
        </div>
      </div>
    </div>
  );
}
