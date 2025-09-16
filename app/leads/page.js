"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, Search, Filter, Plus, Phone, Mail, MessageCircle, MapPin, Clock,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, Star,
  MoreHorizontal, Eye, Edit, Trash2, Calendar, UserPlus, TrendingUp,
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

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // Sample leads data
  const leads = [
    {
      id: 1,
      name: "Ananya Kumar",
      phone: "+91 98765 43210",
      email: "ananya@email.com",
      course: "JEE Advanced",
      status: "new",
      source: "Website",
      assignedTo: "Rajesh Sharma",
      lastContact: "2024-01-15",
      nextFollowUp: "2024-01-18",
      priority: "high",
      notes: "Interested in Physics coaching"
    },
    {
      id: 2,
      name: "Siddharth Patil",
      phone: "+91 98765 43211",
      email: "siddharth@email.com",
      course: "NEET",
      status: "contacted",
      source: "Referral",
      assignedTo: "Priya Singh",
      lastContact: "2024-01-14",
      nextFollowUp: "2024-01-17",
      priority: "medium",
      notes: "Wants demo class"
    },
    {
      id: 3,
      name: "Zara Khan",
      phone: "+91 98765 43212",
      email: "zara@email.com",
      course: "CAT",
      status: "qualified",
      source: "Social Media",
      assignedTo: "Amit Kumar",
      lastContact: "2024-01-13",
      nextFollowUp: "2024-01-16",
      priority: "high",
      notes: "Ready for enrollment"
    },
    {
      id: 4,
      name: "Rahul Verma",
      phone: "+91 98765 43213",
      email: "rahul@email.com",
      course: "GATE",
      status: "lost",
      source: "Website",
      assignedTo: "Rajesh Sharma",
      lastContact: "2024-01-12",
      nextFollowUp: null,
      priority: "low",
      notes: "Went to competitor"
    },
    {
      id: 5,
      name: "Neha Singh",
      phone: "+91 98765 43214",
      email: "neha@email.com",
      course: "JEE Advanced",
      status: "enrolled",
      source: "Referral",
      assignedTo: "Priya Singh",
      lastContact: "2024-01-11",
      nextFollowUp: null,
      priority: "high",
      notes: "Successfully enrolled"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "new": return <Badge variant="info">New</Badge>;
      case "contacted": return <Badge variant="warning">Contacted</Badge>;
      case "qualified": return <Badge variant="primary">Qualified</Badge>;
      case "enrolled": return <Badge variant="success">Enrolled</Badge>;
      case "lost": return <Badge variant="destructive">Lost</Badge>;
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

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesCourse = courseFilter === "all" || lead.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const stats = [
    {
      title: "Total Leads",
      value: leads.length.toString(),
      change: "+12%",
      changeType: "positive",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "New Leads",
      value: leads.filter(l => l.status === "new").length.toString(),
      change: "+8%",
      changeType: "positive",
      icon: <UserPlus className="w-6 h-6 text-info" />,
    },
    {
      title: "Qualified",
      value: leads.filter(l => l.status === "qualified").length.toString(),
      change: "+15%",
      changeType: "positive",
      icon: <Target className="w-6 h-6 text-success" />,
    },
    {
      title: "Enrolled",
      value: leads.filter(l => l.status === "enrolled").length.toString(),
      change: "+5%",
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
              <h1 className="text-2xl font-bold text-foreground">Leads Management</h1>
              <p className="text-muted-foreground">Track and manage all your leads</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowAddLeadModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Lead
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
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">
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

          {/* Filters and Search */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search leads by name, email, or phone..." 
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
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="lost">Lost</option>
                </Select>
                <Select 
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-40"
                >
                  <option value="all">All Courses</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="NEET">NEET</option>
                  <option value="CAT">CAT</option>
                  <option value="GATE">GATE</option>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">All Leads</h3>
                <p className="text-sm text-muted-foreground">{filteredLeads.length} leads found</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{lead.name}</h4>
                        {getStatusBadge(lead.status)}
                        {getPriorityBadge(lead.priority)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {lead.course}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCircle2 className="w-3 h-3" />
                          {lead.assignedTo}
                        </span>
                      </div>
                      {lead.notes && (
                        <p className="text-xs text-muted-foreground mt-1">{lead.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        Last Contact: {lead.lastContact}
                      </div>
                      {lead.nextFollowUp && (
                        <div className="text-xs text-muted-foreground">
                          Next: {lead.nextFollowUp}
                        </div>
                      )}
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
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
