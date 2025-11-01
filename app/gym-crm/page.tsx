"use client"
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useEffect,useState } from 'react';

export default function GymCRMDashboard() {
const [summary, setSummary] = useState<any>({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    // call your backend API
      fetch('http://localhost:8080/gym/members/dashborad/summary',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ token
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch summary');
        return res.json();
      })
      .then(data => {
        setSummary(data);
        return data;
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const stats = [
    { name: 'Total Members', value: summary?.totalMembers , change: '+12%', changeType: 'positive', icon: Users },
    { name: 'Active Memberships', value: summary?.activeMembers , change: '+8%', changeType: 'positive', icon: Calendar },
    { name: 'Monthly Revenue', value: summary?.totalPaymentsCurrentMonth , change: '+15%', changeType: 'positive', icon: DollarSign },
    { name: 'Expiring This Month', value: summary?.expiringMembersCount , change: '-5%', changeType: 'negative', icon: AlertTriangle },
  ];

  const quickActions = [
    { name: 'Add New Member', href: '/gym-crm/members/new', icon: Users, color: 'bg-primary' },
    { name: 'Record Attendance', href: '/gym-crm/attendance', icon: CheckCircle, color: 'bg-green-500' },
    { name: 'Process Payment', href: '/gym-crm/payments/new', icon: CreditCard, color: 'bg-purple-500' },
    { name: 'View Reports', href: '/gym-crm/reports', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { id: 1, member: 'Rahul Sharma', action: 'Membership renewed', time: '2 hours ago', type: 'renewal' },
    { id: 2, member: 'Priya Patel', action: 'New membership started', time: '4 hours ago', type: 'new' },
    { id: 3, member: 'Amit Kumar', action: 'Payment received', time: '6 hours ago', type: 'payment' },
    { id: 4, member: 'Neha Singh', action: 'Attendance marked', time: '8 hours ago', type: 'attendance' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your Gym CRM dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-foreground">{action.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'renewal' ? 'bg-green-500' :
                    activity.type === 'new' ? 'bg-primary' :
                    activity.type === 'payment' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.member}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">Alerts & Notifications</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">15 memberships expiring this week</p>
                <p className="text-sm text-yellow-600">Send renewal reminders to avoid lapses</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <Clock className="h-5 w-5 text-red-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">8 pending payments overdue</p>
                <p className="text-sm text-red-600">Total outstanding: ₹45,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
