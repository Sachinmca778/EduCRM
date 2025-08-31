"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu, PlusCircle, CalendarCheck2, Mail, MessageCircle, BellRing, Home,
  Users, BookOpen, CalendarClock, AlertTriangle, User, Settings, UserCircle2,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, TrendingUp, DollarSign, CreditCard,
  GraduationCap, Clock, Star, Phone, MoreHorizontal, Eye, Edit, Download,
  Share2, BarChart3, PieChart, Activity, Receipt, Send, Filter, Search, Bell, Trophy
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

// Enhanced Data
const feeCollectionData = [
  { month: "Jan", collected: 450000, pending: 150000, overdue: 50000 },
  { month: "Feb", collected: 520000, pending: 120000, overdue: 30000 },
  { month: "Mar", collected: 480000, pending: 180000, overdue: 40000 },
  { month: "Apr", collected: 550000, pending: 100000, overdue: 25000 },
  { month: "May", collected: 600000, pending: 80000, overdue: 20000 },
  { month: "Jun", collected: 580000, pending: 90000, overdue: 15000 },
];

const paymentMethods = [
  { method: "Razorpay", amount: 350000, percentage: 45, color: "#3b82f6" },
  { method: "Paytm", amount: 200000, percentage: 25, color: "#10b981" },
  { method: "UPI", amount: 150000, percentage: 20, color: "#f59e0b" },
  { method: "Cash", amount: 80000, percentage: 10, color: "#ef4444" },
];

const pendingDues = [
  { 
    id: 1,
    student: "Ananya Kumar", 
    course: "JEE Advanced",
    dueDate: "2024-01-15", 
    amount: 25000, 
    status: "pending",
    phone: "+91 98765 43210",
    email: "ananya@email.com",
    installment: "2/4",
    lateFee: 0,
    totalDue: 25000
  },
  { 
    id: 2,
    student: "Siddharth Patil", 
    course: "NEET",
    dueDate: "2024-01-10", 
    amount: 30000, 
    status: "overdue",
    phone: "+91 98765 43211",
    email: "siddharth@email.com",
    installment: "3/4",
    lateFee: 1500,
    totalDue: 31500
  },
  { 
    id: 3,
    student: "Priya Sharma", 
    course: "CAT",
    dueDate: "2024-01-20", 
    amount: 18000, 
    status: "pending",
    phone: "+91 98765 43212",
    email: "priya@email.com",
    installment: "1/3",
    lateFee: 0,
    totalDue: 18000
  },
  { 
    id: 4,
    student: "Rahul Verma", 
    course: "GATE",
    dueDate: "2024-01-05", 
    amount: 22000, 
    status: "overdue",
    phone: "+91 98765 43213",
    email: "rahul@email.com",
    installment: "2/3",
    lateFee: 2200,
    totalDue: 24200
  },
];

// Enhanced fee structures
const feeStructures = [
  {
    id: 1,
    course: "JEE Advanced",
    totalFee: 85000,
    installments: 4,
    discount: "10%",
    installmentAmount: 21250,
    dueDates: ["2024-01-15", "2024-04-15", "2024-07-15", "2024-10-15"],
    lateFee: "₹500/month",
    refundPolicy: "50% refund within 30 days"
  },
  {
    id: 2,
    course: "NEET",
    totalFee: 75000,
    installments: 4,
    discount: "5%",
    installmentAmount: 18750,
    dueDates: ["2024-02-01", "2024-05-01", "2024-08-01", "2024-11-01"],
    lateFee: "₹400/month",
    refundPolicy: "30% refund within 15 days"
  },
  {
    id: 3,
    course: "CAT",
    totalFee: 65000,
    installments: 3,
    discount: "15%",
    installmentAmount: 21667,
    dueDates: ["2024-03-01", "2024-06-01", "2024-09-01"],
    lateFee: "₹300/month",
    refundPolicy: "25% refund within 20 days"
  }
];

// Invoice templates
const invoiceTemplates = [
  {
    id: 1,
    name: "Standard Invoice",
    template: "default",
    logo: true,
    terms: true,
    signature: false
  },
  {
    id: 2,
    name: "Professional Invoice",
    template: "premium",
    logo: true,
    terms: true,
    signature: true
  },
  {
    id: 3,
    name: "Simple Invoice",
    template: "minimal",
    logo: false,
    terms: false,
    signature: false
  }
];

const recentPayments = [
  { id: 1, student: "Amit Patel", amount: 25000, method: "Razorpay", date: "2024-01-12", status: "completed" },
  { id: 2, student: "Neha Singh", amount: 18000, method: "Paytm", date: "2024-01-11", status: "completed" },
  { id: 3, student: "Karan Malhotra", amount: 30000, method: "UPI", date: "2024-01-10", status: "completed" },
  { id: 4, student: "Zara Khan", amount: 15000, method: "Cash", date: "2024-01-09", status: "completed" },
];

export default function FeeTrackerWithSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Collection",
      value: "₹28,50,000",
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="w-6 h-6 text-primary" />,
    },
    {
      title: "Pending Dues",
      value: "₹4,20,000",
      change: "-8.2%",
      changeType: "positive",
      icon: <AlertTriangle className="w-6 h-6 text-warning" />,
    },
    {
      title: "Overdue Amount",
      value: "₹1,80,000",
      change: "+5.1%",
      changeType: "negative",
      icon: <XCircle className="w-6 h-6 text-destructive" />,
    },
    {
      title: "Collection Rate",
      value: "87.2%",
      change: "+2.3%",
      changeType: "positive",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
  ];

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: <DollarSign size={20} />, label: "Fees", active: true, href: "/dashboard/fees" },
    { icon: <Receipt size={20} />, label: "Invoices", active: false, href: "/finance" },
    { icon: <CreditCard size={20} />, label: "Payments", active: false, href: "/finance" },
    { icon: <BarChart3 size={20} />, label: "Reports", active: false, href: "/finance" },
    { icon: <Users size={20} />, label: "Leads", badge: "24", href: "/admin" },
    { icon: <BellRing size={20} />, label: "Follow-ups", badge: "12", href: "/admin" },
    { icon: <CalendarClock size={20} />, label: "Demo Classes", badge: "8", href: "/scheduler" },
    { icon: <BookOpen size={20} />, label: "Students", href: "/dashboard/student" },
    { icon: <AlertTriangle size={20} />, label: "Fees", active: true, badge: "15", href: "/dashboard/fees" },
    { icon: <Bell size={20} />, label: "Notifications", badge: "3", href: "/notifications" },
    { icon: <Trophy size={20} />, label: "Gamification", badge: "NEW", href: "/gamification" },
    { icon: <BookOpen size={20} />, label: "Courses", badge: "4", href: "/courses" },
    { icon: <DollarSign size={20} />, label: "Finance", badge: "NEW", href: "/finance" },
    { icon: <UserCircle2 size={20} />, label: "Branches", href: "/admin" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return <Badge variant="success">Completed</Badge>;
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "overdue": return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Razorpay": return <CreditCard className="w-4 h-4 text-blue-600" />;
      case "Paytm": return <CreditCard className="w-4 h-4 text-green-600" />;
      case "UPI": return <CreditCard className="w-4 h-4 text-orange-600" />;
      case "Cash": return <DollarSign className="w-4 h-4 text-red-600" />;
      default: return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const simulatePayment = (student, amount) => {
    alert(`💳 Payment Gateway Integration\nStudent: ${student}\nAmount: ₹${amount.toLocaleString()}\n\nRedirecting to payment gateway...`);
  };

  const sendReminder = (student, type) => {
    alert(`📧 ${type} Reminder Sent\nStudent: ${student}\n\nReminder will be delivered shortly.`);
  };

  const generateReceipt = (student, amount) => {
    alert(`📄 Receipt Generated\nStudent: ${student}\nAmount: ₹${amount.toLocaleString()}\n\nReceipt downloaded successfully.`);
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
              href={item.href}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
            <img 
              src="https://i.pravatar.cc/32?img=1" 
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
                <h1 className="text-2xl font-bold text-foreground">Fees Collection & Tracker</h1>
                <p className="text-muted-foreground">Manage student fees and payment tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SearchInput placeholder="Search students, payments..." className="w-80" />
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <PlusCircle size={16} />
                Add Fee Structure
              </button>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                <img 
                  src="https://i.pravatar.cc/32?img=1" 
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
          {/* Tabs */}
          <div className="bg-card border border-border rounded-xl">
            <div className="flex border-b border-border">
              {[
                { id: "overview", label: "📊 Overview", icon: BarChart3 },
                { id: "structures", label: "💰 Fee Structures", icon: DollarSign },
                { id: "invoices", label: "📄 Invoices", icon: Receipt },
                { id: "reports", label: "📈 Reports", icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
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
                    {/* Fee Collection Trends */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">Fee Collection Trends</h3>
                            <p className="text-sm text-muted-foreground">Monthly collection overview</p>
                          </div>
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={feeCollectionData}>
                              <defs>
                                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
                                dataKey="collected" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                fill="url(#colorCollected)"
                                name="Collected"
                              />
                              <Area 
                                type="monotone" 
                                dataKey="pending" 
                                stroke="#f59e0b" 
                                strokeWidth={2}
                                fill="url(#colorPending)"
                                name="Pending"
                              />
                              <Area 
                                type="monotone" 
                                dataKey="overdue" 
                                stroke="#ef4444" 
                                strokeWidth={2}
                                fill="url(#colorOverdue)"
                                name="Overdue"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
                            <p className="text-sm text-muted-foreground">Revenue by payment gateway</p>
                          </div>
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {paymentMethods.map((method, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: method.color }}
                                />
                                <span className="text-sm font-medium text-foreground">{method.method}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-foreground">₹{method.amount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">{method.percentage}%</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Pending Dues */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Pending & Overdue Dues</h3>
                          <p className="text-sm text-muted-foreground">Students with outstanding payments</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">View all</button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingDues.map((due) => (
                          <div key={due.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium text-foreground">{due.student}</p>
                                {getStatusBadge(due.status)}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {due.course}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {due.phone}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {due.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Due: {due.dueDate}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground">₹{due.amount.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => simulatePayment(due.student, due.amount)}
                                className="p-2 rounded-lg hover:bg-background transition-colors"
                                title="Track Payment"
                              >
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button 
                                onClick={() => generateReceipt(due.student, due.amount)}
                                className="p-2 rounded-lg hover:bg-background transition-colors"
                                title="Generate Receipt"
                              >
                                <Receipt className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button 
                                onClick={() => sendReminder(due.student, "Email")}
                                className="p-2 rounded-lg hover:bg-background transition-colors"
                                title="Send Email Reminder"
                              >
                                <Mail className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button 
                                onClick={() => sendReminder(due.student, "WhatsApp")}
                                className="p-2 rounded-lg hover:bg-background transition-colors"
                                title="Send WhatsApp Reminder"
                              >
                                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Payments */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
                          <p className="text-sm text-muted-foreground">Latest successful transactions</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">View all</button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                            <div className="flex-shrink-0">
                              {getPaymentMethodIcon(payment.method)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{payment.student}</p>
                              <p className="text-xs text-muted-foreground">{payment.method} • {payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-foreground">₹{payment.amount.toLocaleString()}</p>
                              {getStatusBadge(payment.status)}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-background transition-colors">
                                <Download className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-background transition-colors">
                                <Share2 className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "structures" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Fee Structures</h3>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add New Structure
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feeStructures.map((structure) => (
                      <Card key={structure.id}>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-foreground">{structure.course}</h4>
                              <Badge variant="primary">{structure.discount} off</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Fee:</span>
                                <span className="text-sm font-medium text-foreground">₹{structure.totalFee.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Installments:</span>
                                <span className="text-sm font-medium text-foreground">{structure.installments}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Per Installment:</span>
                                <span className="text-sm font-medium text-foreground">₹{structure.installmentAmount.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground">Late Fee: {structure.lateFee}</p>
                              <p className="text-xs text-muted-foreground">Refund: {structure.refundPolicy}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "invoices" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Invoice Templates</h3>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Template
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {invoiceTemplates.map((template) => (
                      <Card key={template.id}>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-foreground">{template.name}</h4>
                              <Badge variant="default">{template.template}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Logo: {template.logo ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Terms: {template.terms ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Signature: {template.signature ? 'Yes' : 'No'}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reports" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Financial Reports</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <h4 className="text-lg font-semibold text-foreground">Revenue Analytics</h4>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feeCollectionData}>
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
                              <Bar dataKey="collected" fill="#10b981" name="Collected" />
                              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <h4 className="text-lg font-semibold text-foreground">Payment Methods Distribution</h4>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={paymentMethods}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="amount"
                                nameKey="method"
                              >
                                {paymentMethods.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: 'var(--card)',
                                  border: '1px solid var(--border)',
                                  borderRadius: '8px',
                                }}
                              />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
