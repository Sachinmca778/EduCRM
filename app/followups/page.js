"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BellRing, Search, Filter, Plus, Phone, Mail, MessageCircle, Calendar, Clock,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, Star,
  MoreHorizontal, Eye, Edit, Trash2, UserPlus, TrendingUp, Users,
  GraduationCap, BookOpen, DollarSign, Bell, Settings, UserCircle2,
  ChevronDown, ChevronUp, Target, Activity, BarChart3, PieChart
} from "lucide-react";

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
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

function Button({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ placeholder, className = "", ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export default function FollowUpsManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Sample follow-ups data
  const followUps = [
    {
      id: 1,
      leadName: "Ananya Kumar",
      phone: "+91 98765 43210",
      email: "ananya@email.com",
      course: "JEE Advanced",
      status: "pending",
      priority: "high",
      assignedTo: "Rajesh Sharma",
      dueDate: "2024-01-15",
      dueTime: "10:00 AM",
      type: "call",
      notes: "Follow up on demo class booking",
      lastContact: "2024-01-12"
    },
    {
      id: 2,
      leadName: "Siddharth Patil",
      phone: "+91 98765 43211",
      email: "siddharth@email.com",
      course: "NEET",
      status: "completed",
      priority: "medium",
      assignedTo: "Priya Singh",
      dueDate: "2024-01-14",
      dueTime: "2:00 PM",
      type: "email",
      notes: "Send course details and pricing",
      lastContact: "2024-01-14"
    },
    {
      id: 3,
      leadName: "Zara Khan",
      phone: "+91 98765 43212",
      email: "zara@email.com",
      course: "CAT",
      status: "pending",
      priority: "high",
      assignedTo: "Amit Kumar",
      dueDate: "2024-01-16",
      dueTime: "11:30 AM",
      type: "whatsapp",
      notes: "Confirm enrollment decision",
      lastContact: "2024-01-13"
    },
    {
      id: 4,
      leadName: "Rahul Verma",
      phone: "+91 98765 43213",
      email: "rahul@email.com",
      course: "GATE",
      status: "overdue",
      priority: "low",
      assignedTo: "Rajesh Sharma",
      dueDate: "2024-01-13",
      dueTime: "3:00 PM",
      type: "call",
      notes: "Final attempt to convert",
      lastContact: "2024-01-10"
    },
    {
      id: 5,
      leadName: "Neha Singh",
      phone: "+91 98765 43214",
      email: "neha@email.com",
      course: "JEE Advanced",
      status: "scheduled",
      priority: "medium",
      assignedTo: "Priya Singh",
      dueDate: "2024-01-17",
      dueTime: "4:00 PM",
      type: "meeting",
      notes: "In-person consultation",
      lastContact: "2024-01-15"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "completed": return <Badge variant="success">Completed</Badge>;
      case "overdue": return <Badge variant="destructive">Overdue</Badge>;
      case "scheduled": return <Badge variant="info">Scheduled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge variant="warning">Medium</Badge>;
      case "low": return <Badge variant="default">Low</Badge>;
      default: return <Badge variant="default">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "call": return <Phone className="w-4 h-4 text-blue-600" />;
      case "email": return <Mail className="w-4 h-4 text-green-600" />;
      case "whatsapp": return <MessageCircle className="w-4 h-4 text-green-600" />;
      case "meeting": return <Users className="w-4 h-4 text-purple-600" />;
      default: return <BellRing className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredFollowUps = followUps.filter(followUp => {
    const matchesSearch = followUp.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         followUp.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || followUp.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || followUp.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    {
      title: "Total Follow-ups",
      value: followUps.length.toString(),
      change: "+8%",
      changeType: "positive",
      icon: <BellRing className="w-6 h-6 text-primary" />,
    },
    {
      title: "Pending",
      value: followUps.filter(f => f.status === "pending").length.toString(),
      change: "+12%",
      changeType: "positive",
      icon: <Clock className="w-6 h-6 text-warning" />,
    },
    {
      title: "Overdue",
      value: followUps.filter(f => f.status === "overdue").length.toString(),
      change: "-5%",
      changeType: "negative",
      icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
    },
    {
      title: "Completed",
      value: followUps.filter(f => f.status === "completed").length.toString(),
      change: "+15%",
      changeType: "positive",
      icon: <CheckCircle className="w-6 h-6 text-success" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Follow-ups Management</h1>
              <p className="text-muted-foreground">Track and manage lead follow-ups</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className={`w-4 h-4 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"} mr-1`} />
                        <span className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Card>
            <div className="flex border-b border-border">
              {[
                { id: "pending", label: "⏰ Pending", icon: Clock },
                { id: "overdue", label: "🚨 Overdue", icon: AlertTriangle },
                { id: "scheduled", label: "📅 Scheduled", icon: Calendar },
                { id: "completed", label: "✅ Completed", icon: CheckCircle }
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
              {/* Filters and Search */}
              <div className="flex items-center gap-4 mb-6">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search follow-ups..." 
                  className="flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-32"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </Select>
                <Select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-32"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Follow-ups List */}
              <div className="space-y-4">
                {filteredFollowUps.map((followUp) => (
                  <div key={followUp.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(followUp.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{followUp.leadName}</h4>
                        {getStatusBadge(followUp.status)}
                        {getPriorityBadge(followUp.priority)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {followUp.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {followUp.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {followUp.course}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCircle2 className="w-3 h-3" />
                          {followUp.assignedTo}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{followUp.notes}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        Due: {followUp.dueDate} at {followUp.dueTime}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last: {followUp.lastContact}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
