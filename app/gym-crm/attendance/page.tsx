'use client';

import { useState, useEffect } from 'react';
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


// New MemberCheckIn component
function MemberCheckIn({ memberId, memberName }: { memberId: string; memberName: string }) {
  const [formData, setFormData] = useState({
    // Personal Information
    memberId: '',
    memberName: '',
    checkIn: '',
    checkOut: '',
    durationMinutes: '',
    method: '',
    notes: ''
  });

  const [message, setMessage] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState<string>('00:00:00');

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const todayKey = `checkin-${memberId}`;

  // Load check-in state from localStorage (one check-in per day)
  useEffect(() => {
    const stored = localStorage.getItem(todayKey);
    if (stored) {
      setCheckedIn(true);
      setCheckInTime(new Date(stored));
    }
  }, [todayKey]);

  // Handle check-in
  const handleCheckIn = async (e) => {
    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    const memberId = typeof window !== "undefined" ? localStorage.getItem('memberId') : null;

    const now = new Date();

    try {
      const res = await fetch(`${API_BASE_URL}/gym/attendance/check_in/${memberId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer '+ token
        },
        body:JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem('attendence_id', data.id);
      }
      setMessage(`Member created successfully. Code: ${data.memberCode}`);
    } catch (error) {
      setMessage("Error creating member");
    }
    setCheckedIn(true);
    setCheckInTime(now);
    if (typeof window !== "undefined") {
      localStorage.setItem(todayKey, now.toISOString());
    }
  };

  // Handle check-out
  const handleCheckOut = async (e) => {
    const attendenceId = typeof window !== "undefined" ? localStorage.getItem('attendence_id') : null;
    try {
      const res = await fetch(`${API_BASE_URL}/gym/attendance/check_out/${attendenceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer '+ token
        },
        body:JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.removeItem('attendence_id');
      }
      setMessage(`Member Checkout successfully. Code: ${data.memberCode}`);
    } catch (error) {
      setMessage("Error creating member");
    }
    setCheckedIn(false);
    setCheckInTime(null);
    setTimer('00:00:00');
    if (typeof window !== "undefined") {
      localStorage.removeItem(todayKey);
    }
    alert(`${memberName} checked out successfully!`);
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimer(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkedIn, checkInTime]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-2xl w-full max-w-md p-8 transition-all hover:shadow-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-blue-400/10 to-transparent pointer-events-none" />

        <div className="relative text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Mark Your Attendence
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Manage your daily attendance seamlessly
          </p>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 mb-6 shadow-inner">
            <p className="text-lg font-semibold text-gray-900">{memberName}</p>
            <p className="text-sm text-gray-600 mt-1">{memberId}</p>
          </div>

          {!checkedIn ? (
            <button
              onClick={handleCheckIn}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <CheckCircle className="w-5 h-5" />
              Check In
            </button>
          ) : (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 font-mono font-semibold tracking-wider shadow-sm">
                <Clock className="w-4 h-4 animate-pulse" />
                {timer}
              </div>

              <button
                onClick={handleCheckOut}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <XCircle className="w-5 h-5" />
                Check Out
              </button>
            </div>
          )}

          <div className="mt-8 text-xs text-gray-500">
            {checkedIn && checkInTime ? (
              <>
                Checked in at{' '}
                <span className="font-medium text-gray-700">
                  {checkInTime.toLocaleTimeString()}
                </span>
              </>
            ) : (
              'Not checked in yet today'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function AttendancePage() {
  const [role, setRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scan');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const allowedRoles = ['ADMIN', 'MANAGER', 'RECEPTIONIST'];

  const name = typeof window !== "undefined" ? localStorage.getItem('name') : null;
  const id = `ID : ${typeof window !== "undefined" ? localStorage.getItem('userId') : null}`;

  useEffect(() => {
    const storedRole = typeof window !== "undefined" ? localStorage.getItem('role') : null;
    setRole(storedRole);
  }, []);


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
      case 'checked-in': return 'bg-primary/10 text-primary';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'QR Code': return 'bg-purple-100 text-purple-800';
      case 'Manual': return 'bg-orange-100 text-orange-800';
      case 'Biometric': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
        <p className="mt-2 text-muted-foreground">Track member attendance using QR codes, biometric, or manual entry</p>
      </div>

      {/* Quick Stats */}
    {allowedRoles.includes(role) && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Members</p>
              <p className="text-2xl font-semibold text-foreground">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Present Today</p>
              <p className="text-2xl font-semibold text-foreground">89</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
              <p className="text-2xl font-semibold text-foreground">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avg. Duration</p>
              <p className="text-2xl font-semibold text-foreground">1h 32m</p>
            </div>
          </div>
        </div>
      </div>
    )}

    {role === 'MEMBER' && (
      <MemberCheckIn memberId={id} memberName={name} />
    )}

    {/* Attendance Methods Tabs */}
    {allowedRoles.includes(role) && (
        <div className="bg-card rounded-xl border border-border">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('scan')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'scan'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <QrCode className="h-5 w-5 inline mr-2" />
                QR Code Scanner
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'manual'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <UserCheck className="h-5 w-5 inline mr-2" />
                Manual Entry
              </button>
              <button
                onClick={() => setActiveTab('biometric')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'biometric'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
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
              <div className="mx-auto w-64 h-64 bg-muted/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">QR Code Scanner</p>
                  <p className="text-xs text-muted-foreground">Point camera at member's QR code</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  <QrCode className="h-4 w-4 mr-2" />
                  Start Scanner
                </button>
                <p className="text-sm text-muted-foreground">
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
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </button>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button className="p-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors">
                    Check In
                  </button>
                  <button className="p-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors">
                    Check Out
                  </button>
                  <button className="p-2 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors">
                    Mark Late
                  </button>
                  <button className="p-2 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                    Bulk Entry
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'biometric' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-64 h-64 bg-muted/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Biometric Scanner</p>
                  <p className="text-xs text-muted-foreground">Place finger on scanner</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  <Users className="h-4 w-4 mr-2" />
                  Start Biometric Scanner
                </button>
                <p className="text-sm text-muted-foreground">
                  Connect biometric device to enable fingerprint scanning
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

      {/* Attendance History */}
    {allowedRoles.includes(role) && (
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium text-foreground">Today's Attendance</h3>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search attendance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredAttendance.map((attendance) => (
                <tr key={attendance.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-medium">
                            {attendance.memberName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{attendance.memberName}</div>
                        <div className="text-sm text-muted-foreground">{attendance.memberId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {attendance.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {attendance.checkOut || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
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
                        <button className="text-red-600 hover:text-red-800 transition-colors">
                          Check Out
                        </button>
                      )}
                      <button className="text-primary hover:text-primary/80 transition-colors">
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
    )}
    </div>
  );
}
