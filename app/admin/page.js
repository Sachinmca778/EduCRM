"use client";
import { useState, useEffect } from "react";
import {
  Menu, DollarSign, AlertTriangle, Users, BookOpen, CalendarClock, BellRing,
  Home, User, Settings, UserCircle2, TrendingUp, Banknote, Search, Filter,
  ChevronDown, ChevronUp, Plus, MoreHorizontal, Download, Eye, Edit, Trash2,
  Phone, Mail, MapPin, Clock, Star, CheckCircle, XCircle, Activity, Target,
  GraduationCap, Award, BarChart3, PieChart, LineChart, ArrowUpRight, ArrowDownRight, Bell
} from "lucide-react";
import SmartNotification from "../components/SmartNotification";
import LiveActivityFeed from "../components/LiveActivityFeed";

import {
  LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, Area, AreaChart
} from "recharts";

// Enhanced Data
const monthlyRevenue = [
  { month: "Jan", revenue: 80000, growth: 12, students: 280 },
  { month: "Feb", revenue: 95000, growth: 18, students: 320 },
  { month: "Mar", revenue: 105000, growth: 10, students: 350 },
  { month: "Apr", revenue: 110000, growth: 5, students: 380 },
  { month: "May", revenue: 120000, growth: 9, students: 420 },
  { month: "Jun", revenue: 125000, growth: 4, students: 450 },
];

const paymentGateways = [
  { name: "Razorpay", amount: 60000, percentage: 50, color: "#3b82f6" },
  { name: "Paytm", amount: 30000, percentage: 25, color: "#10b981" },
  { name: "UPI", amount: 30000, percentage: 25, color: "#f59e0b" },
];

const recentActivities = [
  { id: 1, type: "enrollment", student: "Rahul Kumar", course: "JEE Advanced", amount: 25000, time: "2 hours ago", status: "completed" },
  { id: 2, type: "payment", student: "Priya Sharma", course: "NEET", amount: 18000, time: "4 hours ago", status: "pending" },
  { id: 3, type: "demo", student: "Amit Patel", course: "CAT", amount: 0, time: "6 hours ago", status: "scheduled" },
  { id: 4, type: "followup", student: "Neha Singh", course: "GATE", amount: 0, time: "1 day ago", status: "completed" },
];

const topCourses = [
  { name: "JEE Advanced", students: 120, revenue: 3000000, growth: 15 },
  { name: "NEET", students: 95, revenue: 2375000, growth: 12 },
  { name: "CAT", students: 78, revenue: 1950000, growth: 8 },
  { name: "GATE", students: 65, revenue: 1625000, growth: 20 },
];

// Enhanced Components
function Card({ className = "", children, ...props }) {
  return (
    <div 
      className={`bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      {...props}
    >
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

function SidebarItem({ icon, label, active, collapsed, badge, href, onClick }) {
  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };
  
  return (
    <Component
      {...props}
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
    </Component>
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

function Select({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {children}
    </select>
  );
}

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("June");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const stats = [
    {
      title: "Total Revenue",
      value: "₹12,50,000",
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="w-6 h-6 text-primary" />,
    },
    {
      title: "Active Students",
      value: "1,247",
      change: "+8.2%",
      changeType: "positive",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Outstanding Dues",
      value: "₹3,45,000",
      change: "-5.1%",
      changeType: "negative",
      icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
    },
    {
      title: "Conversion Rate",
      value: "68.5%",
      change: "+2.3%",
      changeType: "positive",
      icon: <Target className="w-6 h-6 text-primary" />,
    },
  ];

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <Users size={20} />, label: "Leads", badge: "24" },
    { icon: <BellRing size={20} />, label: "Follow-ups", badge: "12" },
    { icon: <CalendarClock size={20} />, label: "Demo Classes", badge: "8" },
    { icon: <BookOpen size={20} />, label: "Students" },
    { icon: <AlertTriangle size={20} />, label: "Fees" },
    { icon: <Bell size={20} />, label: "Notifications", badge: "3", href: "/notifications" },
    { icon: <UserCircle2 size={20} />, label: "Branches" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

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
              href={item.href}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
            <img 
              src="https://i.pravatar.cc/32?img=9" 
              alt="Admin" 
              className="w-8 h-8 rounded-full"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
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
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your institution.</p>
            </div>
            <div className="flex items-center gap-4">
              <SearchInput placeholder="Search students, courses..." className="w-80" />
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Settings size={20} className="text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                <img 
                  src="https://i.pravatar.cc/32?img=9" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@educrm.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <Select 
              value={selectedBranch} 
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="min-w-[150px]"
            >
              <option value="All">All Branches</option>
              <option value="North">North Branch</option>
              <option value="South">South Branch</option>
              <option value="East">East Branch</option>
              <option value="West">West Branch</option>
            </Select>
            <Select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="min-w-[120px]"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
            </Select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus size={16} />
              Add Student
            </button>
          </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
                    <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">+12.5%</Badge>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                        dataKey="revenue" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payment Gateways */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Revenue by gateway</p>
                  </div>
                  <Banknote className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentGateways.map((gateway, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: gateway.color }}
                        />
                        <span className="text-sm font-medium text-foreground">{gateway.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">₹{gateway.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{gateway.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Activity Feed & Top Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Activity Feed */}
            <LiveActivityFeed />

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Top Performing Courses</h3>
                    <p className="text-sm text-muted-foreground">Revenue by course</p>
                  </div>
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{course.name}</p>
                          <p className="text-xs text-muted-foreground">{course.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">₹{(course.revenue / 100000).toFixed(1)}L</p>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">{course.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </main>
      <SmartNotification />
    </div>
  );
}
