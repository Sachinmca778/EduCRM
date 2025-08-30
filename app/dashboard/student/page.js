"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu, X, Users, BookOpen, CalendarClock, CalendarDays,
  FileText, ThumbsUp, AlertTriangle, Bell, Home, User, Settings, UserCircle2,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, TrendingUp, Target, Award,
  GraduationCap, Clock, Star, Phone, Mail, MapPin, MoreHorizontal, Eye, Edit,
  Download, Share2, BarChart3, PieChart, Activity
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, BarChart, Bar, Area, AreaChart, PieChart as RechartsPieChart, Pie, Cell
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
    primary: "bg-primary/10 text-primary",
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
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-red-600 mr-1 rotate-180" />
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

function ProgressBar({ value, max = 100, className = "" }) {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full bg-muted rounded-full h-2 ${className}`}>
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Enhanced Data
const testScores = [
  { month: "Jan", score: 72, target: 80 },
  { month: "Feb", score: 78, target: 80 },
  { month: "Mar", score: 85, target: 80 },
  { month: "Apr", score: 81, target: 80 },
  { month: "May", score: 88, target: 80 },
  { month: "Jun", score: 92, target: 80 },
];

const attendanceData = [
  { month: "Jan", present: 22, absent: 2 },
  { month: "Feb", present: 20, absent: 1 },
  { month: "Mar", present: 23, absent: 0 },
  { month: "Apr", present: 21, absent: 1 },
  { month: "May", present: 22, absent: 1 },
  { month: "Jun", present: 20, absent: 0 },
];

const subjectProgress = [
  { subject: "Mathematics", progress: 85, grade: "A", color: "#3b82f6" },
  { subject: "Physics", progress: 78, grade: "B+", color: "#10b981" },
  { subject: "Chemistry", progress: 90, grade: "A+", color: "#f59e0b" },
  { subject: "English", progress: 72, grade: "B", color: "#ef4444" },
  { subject: "Computer Science", progress: 88, grade: "A", color: "#8b5cf6" },
];

const recentAssignments = [
  { id: 1, title: "Calculus Integration", subject: "Mathematics", dueDate: "2024-01-15", status: "submitted", score: 85 },
  { id: 2, title: "Organic Chemistry Lab", subject: "Chemistry", dueDate: "2024-01-18", status: "pending", score: null },
  { id: 3, title: "Physics Mechanics", subject: "Physics", dueDate: "2024-01-20", status: "submitted", score: 92 },
  { id: 4, title: "English Essay", subject: "English", dueDate: "2024-01-22", status: "draft", score: null },
];

const feedbackList = [
  { 
    id: 1,
    date: "2024-01-12", 
    teacher: "Dr. Rajesh Kumar",
    subject: "Mathematics",
    feedback: "Excellent improvement in calculus concepts. Keep up the good work!",
    rating: 5,
    type: "positive"
  },
  { 
    id: 2,
    date: "2024-01-05", 
    teacher: "Prof. Priya Sharma",
    subject: "Physics",
    feedback: "Needs to focus more on practical applications. Good theoretical understanding.",
    rating: 4,
    type: "constructive"
  },
  { 
    id: 3,
    date: "2024-01-01", 
    teacher: "Dr. Amit Patel",
    subject: "Chemistry",
    feedback: "Consistent and punctual in attending classes. Excellent lab work.",
    rating: 5,
    type: "positive"
  },
];

export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Overall Grade",
      value: "A-",
      change: "+2.5%",
      changeType: "positive",
      icon: <Award className="w-6 h-6 text-primary" />,
    },
    {
      title: "Attendance",
      value: "94.2%",
      change: "+1.8%",
      changeType: "positive",
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
    },
    {
      title: "Assignments",
      value: "12/15",
      change: "On Track",
      changeType: "positive",
      icon: <FileText className="w-6 h-6 text-primary" />,
    },
    {
      title: "Tests Taken",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: <Target className="w-6 h-6 text-primary" />,
    },
  ];

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <BookOpen size={20} />, label: "Courses", badge: "5" },
    { icon: <FileText size={20} />, label: "Assignments", badge: "3" },
    { icon: <CalendarClock size={20} />, label: "Schedule" },
    { icon: <Bell size={20} />, label: "Notifications", badge: "2" },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted": return <Badge variant="success">Submitted</Badge>;
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "draft": return <Badge variant="default">Draft</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getFeedbackTypeIcon = (type) => {
    switch (type) {
      case "positive": return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case "constructive": return <Target className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
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
              src="https://i.pravatar.cc/32?img=8" 
              alt="Student" 
              className="w-8 h-8 rounded-full"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Ananya Kumar</p>
                <p className="text-xs text-muted-foreground">Student</p>
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
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
                <p className="text-muted-foreground">Track your academic progress and performance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                <img 
                  src="https://i.pravatar.cc/32?img=8" 
                  alt="Student" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">Ananya Kumar</p>
                  <p className="text-xs text-muted-foreground">Class XII - Science</p>
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
            {/* Test Score Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Test Score Progress</h3>
                    <p className="text-sm text-muted-foreground">Monthly performance trends</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={testScores}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis domain={[60, 100]} stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fill="url(#colorScore)"
                        name="Your Score"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="url(#colorTarget)"
                        name="Target Score"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Subject Progress</h3>
                    <p className="text-sm text-muted-foreground">Current performance by subject</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="text-sm font-medium text-foreground">{subject.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="primary">{subject.grade}</Badge>
                          <span className="text-sm font-semibold text-foreground">{subject.progress}%</span>
                        </div>
                      </div>
                      <ProgressBar value={subject.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Assignments & Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Recent Assignments</h3>
                    <p className="text-sm text-muted-foreground">Upcoming and completed tasks</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.subject} • Due: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {assignment.score && (
                          <span className="text-sm font-semibold text-foreground">{assignment.score}%</span>
                        )}
                        {getStatusBadge(assignment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Recent Feedback</h3>
                    <p className="text-sm text-muted-foreground">Teacher comments and ratings</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackList.map((feedback) => (
                    <div key={feedback.id} className="p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getFeedbackTypeIcon(feedback.type)}
                          <span className="text-sm font-medium text-foreground">{feedback.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{feedback.subject}</p>
                      <p className="text-sm text-foreground">{feedback.feedback}</p>
                      <p className="text-xs text-muted-foreground mt-2">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Attendance Overview</h3>
                  <p className="text-sm text-muted-foreground">Monthly attendance tracking</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">94.2%</p>
                    <p className="text-xs text-muted-foreground">Overall</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">128</p>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
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
                    <Bar dataKey="present" fill="#10b981" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
