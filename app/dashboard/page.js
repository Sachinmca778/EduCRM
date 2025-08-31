"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users, BookOpen, CalendarClock, AlertTriangle, Bell,
  Home, User, Settings, UserCircle2, Menu, Search, Filter,
  Plus, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign,
  GraduationCap, Target, Activity, MoreHorizontal, Eye, Edit, Trash2,
  Phone, Mail, MapPin, Clock, Star, CheckCircle, XCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, BarChart, Bar, Area, AreaChart
} from "recharts";

// Enhanced Components
function Card({ children, className = "" }) {
  return (
    <div className={`bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

function Badge({ variant = "default", children, className = "" }) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

function StatCard({ icon, title, value, change, changeType = "positive", className = "" }) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                {changeType === "positive" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarItem({ icon, label, active, collapsed, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
        active 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && (
        <>
          <span className="text-sm font-medium flex-1 text-left">{label}</span>
          {badge && (
            <Badge variant="default" className="ml-auto">
              {badge}
            </Badge>
          )}
        </>
      )}
      {collapsed && badge && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
      )}
    </button>
  );
}

function SearchInput({ placeholder = "Search...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
    </div>
  );
}

// Enhanced Data
const chartData = [
  { month: "Jan", inquiries: 20, conversions: 15, demos: 28, admissions: 12 },
  { month: "Feb", inquiries: 25, conversions: 18, demos: 32, admissions: 15 },
  { month: "Mar", inquiries: 30, conversions: 22, demos: 35, admissions: 18 },
  { month: "Apr", inquiries: 28, conversions: 20, demos: 30, admissions: 16 },
  { month: "May", inquiries: 35, conversions: 25, demos: 40, admissions: 22 },
  { month: "Jun", inquiries: 40, conversions: 30, demos: 45, admissions: 25 },
];

const recentActivities = [
  { 
    id: 1, 
    name: "Ananya Kumar", 
    type: "inquiry", 
    date: "2 hours ago", 
    status: "pending",
    phone: "+91 98765 43210",
    email: "ananya@email.com"
  },
  { 
    id: 2, 
    name: "Siddharth Patil", 
    type: "demo", 
    date: "4 hours ago", 
    status: "completed",
    phone: "+91 98765 43211",
    email: "siddharth@email.com"
  },
  { 
    id: 3, 
    name: "Priya Sharma", 
    type: "followup", 
    date: "1 day ago", 
    status: "scheduled",
    phone: "+91 98765 43212",
    email: "priya@email.com"
  },
  { 
    id: 4, 
    name: "Rahul Verma", 
    type: "admission", 
    date: "2 days ago", 
    status: "completed",
    phone: "+91 98765 43213",
    email: "rahul@email.com"
  },
];

const topLeads = [
  { name: "Ananya Kumar", score: 95, status: "Hot Lead", course: "JEE Advanced" },
  { name: "Siddharth Patil", score: 88, status: "Warm Lead", course: "NEET" },
  { name: "Priya Sharma", score: 82, status: "Warm Lead", course: "CAT" },
  { name: "Rahul Verma", score: 78, status: "Cold Lead", course: "GATE" },
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Inquiries",
      value: "156",
      change: "+12.5%",
      changeType: "positive",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Conversions",
      value: "89",
      change: "+8.2%",
      changeType: "positive",
      icon: <Target className="w-6 h-6 text-primary" />,
    },
    {
      title: "Pending Demos",
      value: "23",
      change: "-5.1%",
      changeType: "negative",
      icon: <CalendarClock className="w-6 h-6 text-warning" />,
    },
    {
      title: "Fees Due",
      value: "₹2,45,000",
      change: "+15.3%",
      changeType: "negative",
      icon: <DollarSign className="w-6 h-6 text-destructive" />,
    },
  ];

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true, href: "/dashboard" },
    { icon: <Users size={20} />, label: "Leads", badge: "24", href: "/admin" },
    { icon: <Bell size={20} />, label: "Follow-ups", badge: "12", href: "/admin" },
    { icon: <CalendarClock size={20} />, label: "Demo Classes", badge: "8", href: "/scheduler" },
    { icon: <BookOpen size={20} />, label: "Students", href: "/dashboard/student" },
    { icon: <DollarSign size={20} />, label: "Fees", href: "/dashboard/fees" },
    { icon: <Bell size={20} />, label: "Notifications", badge: "3", href: "/notifications" },
    { icon: <Trophy size={20} />, label: "Gamification", badge: "NEW", href: "/gamification" },
    { icon: <BookOpen size={20} />, label: "Courses", badge: "4", href: "/courses" },
    { icon: <DollarSign size={20} />, label: "Finance", badge: "NEW", href: "/finance" },
    { icon: <UserCircle2 size={20} />, label: "Branches", href: "/admin" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin" },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "inquiry": return <Users className="w-5 h-5 text-blue-600" />;
      case "demo": return <CalendarClock className="w-5 h-5 text-orange-600" />;
      case "followup": return <Phone className="w-5 h-5 text-purple-600" />;
      case "admission": return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return <Badge variant="success">Completed</Badge>;
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "scheduled": return <Badge variant="pending">Scheduled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Enhanced Sidebar */}
      <aside className={`bg-card border-r border-border transition-all duration-300 shadow-lg ${
        sidebarCollapsed ? "w-20" : "w-64"
      } flex flex-col`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">EduCRM</span>
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Menu size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              collapsed={sidebarCollapsed}
              badge={item.badge}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
            <img 
              src="https://i.pravatar.cc/32?img=1" 
              alt="User" 
              className="w-8 h-8 rounded-full"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Rahul Sharma</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome Back 👋</h1>
              <p className="text-muted-foreground">Here's what's happening with your leads today.</p>
            </div>
            <div className="flex items-center gap-4">
              <SearchInput placeholder="Search leads, students..." className="w-80" />
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus size={16} />
                Add Lead
              </button>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                <img 
                  src="https://i.pravatar.cc/32?img=1" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">Rahul Sharma</p>
                  <p className="text-xs text-muted-foreground">rahul@educrm.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Overview Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Activity Overview</h3>
                    <p className="text-sm text-muted-foreground">Monthly lead progression</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="inquiries" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fill="url(#colorInquiries)"
                        name="Inquiries"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="conversions" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fill="url(#colorConversions)"
                        name="Conversions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Leads */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Top Leads</h3>
                    <p className="text-sm text-muted-foreground">High priority leads</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLeads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.course}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">{lead.score}%</p>
                        <Badge 
                          variant={lead.status === "Hot Lead" ? "destructive" : lead.status === "Warm Lead" ? "warning" : "default"}
                        >
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
                  <p className="text-sm text-muted-foreground">Latest lead interactions</p>
                </div>
                <button className="text-sm text-primary hover:underline">View all</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{activity.name}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {activity.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {activity.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-background transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-background transition-colors">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-background transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
