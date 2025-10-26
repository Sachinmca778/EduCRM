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
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState<string>('00:00:00');

  const todayKey = `checkin-${memberId}-${new Date().toDateString()}`;

  // Load check-in state from localStorage (one check-in per day)
  useEffect(() => {
    const stored = localStorage.getItem(todayKey);
    if (stored) {
      setCheckedIn(true);
      setCheckInTime(new Date(stored));
    }
  }, [todayKey]);

  // Handle check-in
  const handleCheckIn = () => {
    const now = new Date();
    setCheckedIn(true);
    setCheckInTime(now);
    localStorage.setItem(todayKey, now.toISOString());
  };

  // Handle check-out
  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
    setTimer('00:00:00');
    localStorage.removeItem(todayKey);
    alert(`${memberName} checked out successfully!`);
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timer;
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
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Member Attendance</h1>
        <p className="text-sm text-gray-600 mb-6">Track your daily check-in and check-out</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-base font-medium text-gray-900">{memberName}</p>
          <p className="text-sm text-gray-500">{memberId}</p>
        </div>

        {!checkedIn ? (
          <button
            onClick={handleCheckIn}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            Check In
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-100 text-yellow-800 font-mono py-2 px-4 rounded-lg inline-block">
              <Clock className="w-4 h-4 inline mr-2" />
              {timer}
            </div>
            <button
              onClick={handleCheckOut}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              <XCircle className="w-5 h-5" />
              Check Out
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-500">
          {checkedIn && checkInTime
            ? `Checked in at ${checkInTime.toLocaleTimeString()}`
            : 'Not checked in yet today'}
        </p>
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


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
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

    {/* 👇 Updated Member-only section */}
    {role === 'MEMBER' && (
      <MemberCheckIn memberId="M001" memberName="Rahul Sharma" />
    )}

    {/* Attendance Methods Tabs + History (for admins) */}
    {allowedRoles.includes(role) && (
      <>
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
        </div>
      </>
    )}
    </div>
  );
}
