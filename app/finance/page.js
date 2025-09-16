"use client";
import { useState } from "react";
import { 
  DollarSign, Receipt, CreditCard, BarChart3, TrendingUp, 
  AlertTriangle, XCircle, CheckCircle, Plus, Search, Filter,
  ArrowLeft, Settings, Download, Share2, Mail, MessageCircle,
  Phone, Clock, Calendar, Users, BookOpen, Eye, Edit, Trash2,
  FileText, Calculator, Percent, CalendarDays, UserCheck, X
} from "lucide-react";
import Link from "next/link";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddModal, setShowAddModal] = useState(false);

  // Enhanced data
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
      refundPolicy: "50% refund within 30 days",
      students: 45,
      collectionRate: 92
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
      refundPolicy: "30% refund within 15 days",
      students: 38,
      collectionRate: 88
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
      refundPolicy: "25% refund within 20 days",
      students: 28,
      collectionRate: 95
    }
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
    }
  ];

  const recentPayments = [
    { id: 1, student: "Amit Patel", amount: 25000, method: "Razorpay", date: "2024-01-12", status: "completed" },
    { id: 2, student: "Neha Singh", amount: 18000, method: "Paytm", date: "2024-01-11", status: "completed" },
    { id: 3, student: "Karan Malhotra", amount: 30000, method: "UPI", date: "2024-01-10", status: "completed" }
  ];

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

  const stats = [
    {
      title: "Total Collection",
      value: "₹28,50,000",
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="w-6 h-6 text-primary" />
    },
    {
      title: "Pending Dues",
      value: "₹4,20,000",
      change: "-8.2%",
      changeType: "positive",
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Overdue Amount",
      value: "₹1,80,000",
      change: "+5.1%",
      changeType: "negative",
      icon: <XCircle className="w-6 h-6 text-red-600" />
    },
    {
      title: "Collection Rate",
      value: "87.2%",
      change: "+2.3%",
      changeType: "positive",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "pending": return "text-orange-600 bg-orange-50";
      case "overdue": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Razorpay": return <CreditCard className="w-5 h-5 text-blue-600" />;
      case "Paytm": return <CreditCard className="w-5 h-5 text-green-600" />;
      case "UPI": return <CreditCard className="w-5 h-5 text-purple-600" />;
      case "Cash": return <DollarSign className="w-5 h-5 text-green-600" />;
      default: return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-accent rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Financial Management</h1>
                  <p className="text-sm text-muted-foreground">Complete financial control and reporting</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Fee Structure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-foreground">₹28.5L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending Dues</span>
                  <span className="font-semibold text-orange-600">₹4.2L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Collection Rate</span>
                  <span className="font-semibold text-green-600">87.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Students</span>
                  <span className="font-semibold text-blue-600">111</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                  <Receipt className="w-4 h-4" />
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Send Reminders</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
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
                        <div key={index} className="bg-card border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                              {stat.change && (
                                <div className="flex items-center mt-2">
                                  <span className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                                    {stat.change}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-3 bg-primary/10 rounded-lg">
                              {stat.icon}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Payments */}
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="font-semibold text-foreground mb-4">Recent Payments</h3>
                      <div className="space-y-3">
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
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "structures" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Fee Structures</h3>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Add Structure
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {feeStructures.map((structure) => (
                        <div key={structure.id} className="bg-card border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-foreground text-lg">{structure.course}</h4>
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              {structure.collectionRate}% collection
                            </span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Total Fee:</span>
                              <span className="font-semibold text-foreground">₹{structure.totalFee.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Installments:</span>
                              <span className="font-semibold text-foreground">{structure.installments}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Discount:</span>
                              <span className="font-semibold text-green-600">{structure.discount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Late Fee:</span>
                              <span className="font-semibold text-orange-600">{structure.lateFee}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{structure.students} students</span>
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "invoices" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Invoice Management</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                        <Plus className="w-4 h-4" />
                        Generate Invoice
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {invoiceTemplates.map((template) => (
                        <div key={template.id} className="bg-card border border-border rounded-xl p-6">
                          <h4 className="font-semibold text-foreground mb-2">{template.name}</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Logo: {template.logo ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Terms: {template.terms ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Signature: {template.signature ? "Yes" : "No"}</span>
                            </div>
                          </div>
                          <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                            Use Template
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reports" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Financial Reports</h3>
                      <div className="flex items-center gap-2">
                        <select className="px-3 py-2 border border-border rounded-lg text-sm bg-background">
                          <option>This Month</option>
                          <option>Last Month</option>
                          <option>This Quarter</option>
                          <option>This Year</option>
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h4 className="font-semibold text-foreground mb-4">Revenue Summary</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Revenue</span>
                            <span className="font-semibold text-foreground">₹28,50,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Collection Rate</span>
                            <span className="font-semibold text-green-600">87.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Average per Student</span>
                            <span className="font-semibold text-foreground">₹25,675</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h4 className="font-semibold text-foreground mb-4">Payment Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Razorpay</span>
                            <span className="font-semibold text-foreground">45%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Paytm</span>
                            <span className="font-semibold text-foreground">25%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">UPI</span>
                            <span className="font-semibold text-foreground">20%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Cash</span>
                            <span className="font-semibold text-foreground">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Fee Structure Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Add Fee Structure</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-accent rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Course Name" className="w-full p-2 border border-border rounded-lg bg-background text-foreground" />
              <input type="number" placeholder="Total Fee" className="w-full p-2 border border-border rounded-lg bg-background text-foreground" />
              <input type="number" placeholder="Number of Installments" className="w-full p-2 border border-border rounded-lg bg-background text-foreground" />
              <input type="text" placeholder="Discount %" className="w-full p-2 border border-border rounded-lg bg-background text-foreground" />
              <input type="text" placeholder="Late Fee" className="w-full p-2 border border-border rounded-lg bg-background text-foreground" />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                Create Structure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
