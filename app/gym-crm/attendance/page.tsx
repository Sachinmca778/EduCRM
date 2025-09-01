'use client';

import { useState } from 'react';
import { 
  UserCheck, 
  QrCode, 
  Search, 
  Calendar, 
  Clock, 
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Filter
} from 'lucide-react';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState('scan');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceData = [
    {
      id: 1,
      memberId: 'M001',
      memberName: 'Rahul Sharma',
      checkIn: '2024-12-20 06:30:00',
      checkOut: '2024-12-20 08:15:00',
      duration: '1h 45m',
      status: 'completed',
      method: 'QR Code'
    },
    {
      id: 2,
      memberId: 'M002',
      memberName: 'Priya Patel',
      checkIn: '2024-12-20 07:00:00',
      checkOut: null,
      duration: null,
      status: 'checked-in',
      method: 'Manual'
    },
    {
      id: 3,
      memberId: 'M003',
      memberName: 'Amit Kumar',
      checkIn: '2024-12-20 06:45:00',
      checkOut: '2024-12-20 08:00:00',
      duration: '1h 15m',
      status: 'completed',
      method: 'Biometric'
    }
  ];

  const filteredAttendance = attendanceData.filter(attendance =>
    attendance.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendance.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'QR Code': return 'bg-purple-100 text-purple-800';
      case 'Manual': return 'bg-orange-100 text-orange-800';
      case 'Biometric': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
        <p className="mt-2 text-gray-600">Track member attendance using QR codes, biometric, or manual entry</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Present Today</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Absent Today</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Duration</p>
              <p className="text-2xl font-semibold text-gray-900">1h 32m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Methods Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('scan')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scan'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <QrCode className="h-5 w-5 inline mr-2" />
              QR Code Scanner
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserCheck className="h-5 w-5 inline mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('biometric')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'biometric'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Biometric
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'scan' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-64 h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">QR Code Scanner</p>
                  <p className="text-xs text-gray-400">Point camera at member's QR code</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  <QrCode className="h-4 w-4 mr-2" />
                  Start Scanner
                </button>
                <p className="text-sm text-gray-500">
                  Members can also scan their QR code at the entrance
                </p>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search member by name or ID..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button className="p-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Check In
                  </button>
                  <button className="p-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Check Out
                  </button>
                  <button className="p-2 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">
                    Mark Late
                  </button>
                  <button className="p-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    Bulk Entry
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'biometric' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-64 h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Biometric Scanner</p>
                  <p className="text-xs text-gray-400">Place finger on scanner</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Start Biometric Scanner
                </button>
                <p className="text-sm text-gray-500">
                  Connect biometric device to enable fingerprint scanning
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search attendance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((attendance) => (
                <tr key={attendance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {attendance.memberName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{attendance.memberName}</div>
                        <div className="text-sm text-gray-500">{attendance.memberId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attendance.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attendance.checkOut || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attendance.duration || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(attendance.status)}`}>
                      {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(attendance.method)}`}>
                      {attendance.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {!attendance.checkOut && (
                        <button className="text-red-600 hover:text-red-900">
                          Check Out
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
