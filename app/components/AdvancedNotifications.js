"use client";
import { useState, useEffect } from "react";
import { 
  Bell, Mail, MessageSquare, Settings, Plus, 
  Send, Clock, Users, Target, Zap, CheckCircle,
  AlertCircle, Info, X, Edit, Trash2, Copy
} from "lucide-react";

export default function AdvancedNotifications() {
  const [activeTab, setActiveTab] = useState("push");
  const [notifications, setNotifications] = useState([]);
  const [showComposer, setShowComposer] = useState(false);
  const [composerData, setComposerData] = useState({
    type: "push",
    title: "",
    message: "",
    recipients: "all",
    scheduled: false,
    scheduleTime: "",
    template: ""
  });

  const notificationTemplates = {
    push: [
      { name: "Test Reminder", title: "📚 Test Tomorrow!", message: "Don't forget your Mathematics test tomorrow at 10 AM. Good luck!" },
      { name: "Payment Due", title: "💰 Payment Due", message: "Your monthly fee payment is due. Please complete it before the deadline." },
      { name: "Achievement", title: "🏆 Congratulations!", message: "You've achieved 90% attendance this month. Keep it up!" }
    ],
    email: [
      { name: "Welcome Email", title: "Welcome to EduCRM", message: "Dear {student_name}, welcome to our learning platform!" },
      { name: "Progress Report", title: "Monthly Progress Report", message: "Here's your detailed progress report for this month." },
      { name: "Event Invitation", title: "Parent-Teacher Meeting", message: "You're invited to attend the upcoming parent-teacher meeting." }
    ],
    sms: [
      { name: "Attendance Alert", title: "Attendance Alert", message: "Your child was absent today. Please inform us if there's any issue." },
      { name: "Test Result", title: "Test Result", message: "Your test result is ready. Check your dashboard for details." },
      { name: "Payment Confirmation", title: "Payment Received", message: "Thank you! Your payment of ₹{amount} has been received." }
    ]
  };

  const sampleNotifications = [
    {
      id: 1,
      type: "push",
      title: "📚 Test Tomorrow!",
      message: "Mathematics test scheduled for tomorrow at 10 AM",
      recipients: 45,
      status: "sent",
      time: "2 min ago",
      icon: "📚"
    },
    {
      id: 2,
      type: "email",
      title: "Welcome Email",
      message: "Sent to 12 new students",
      recipients: 12,
      status: "scheduled",
      time: "5 min ago",
      icon: "📧"
    },
    {
      id: 3,
      type: "sms",
      title: "Payment Due Alert",
      message: "Sent to 8 students with pending fees",
      recipients: 8,
      status: "sent",
      time: "10 min ago",
      icon: "📱"
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  const handleSendNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: composerData.type,
      title: composerData.title,
      message: composerData.message,
      recipients: Math.floor(Math.random() * 50) + 5,
      status: "sent",
      time: "Just now",
      icon: composerData.type === "push" ? "📚" : composerData.type === "email" ? "📧" : "📱"
    };

    setNotifications([newNotification, ...notifications]);
    setShowComposer(false);
    setComposerData({
      type: "push",
      title: "",
      message: "",
      recipients: "all",
      scheduled: false,
      scheduleTime: "",
      template: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sent": return "text-green-600 bg-green-50";
      case "scheduled": return "text-blue-600 bg-blue-50";
      case "failed": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "push": return <Bell className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "sms": return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Advanced Notifications</h3>
              <p className="text-sm text-muted-foreground">Push, Email & SMS notifications</p>
            </div>
          </div>
          <button
            onClick={() => setShowComposer(true)}
            className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Notification
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {[
          { id: "push", label: "Push Notifications", icon: Bell },
          { id: "email", label: "Email Templates", icon: Mail },
          { id: "sms", label: "SMS Integration", icon: MessageSquare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
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

      {/* Content */}
      <div className="p-4">
        {activeTab === "push" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Total Sent</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">1,247</p>
                <p className="text-sm text-blue-600">+12% this week</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Delivered</span>
                </div>
                <p className="text-2xl font-bold text-green-800">98.5%</p>
                <p className="text-sm text-green-600">High delivery rate</p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Active Users</span>
                </div>
                <p className="text-2xl font-bold text-orange-800">892</p>
                <p className="text-sm text-orange-600">Receiving notifications</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Emails Sent</span>
                </div>
                <p className="text-2xl font-bold text-purple-800">456</p>
                <p className="text-sm text-purple-600">This month</p>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-800">Open Rate</span>
                </div>
                <p className="text-2xl font-bold text-indigo-800">67.2%</p>
                <p className="text-sm text-indigo-600">Industry average: 45%</p>
              </div>
              <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold text-pink-800">Subscribers</span>
                </div>
                <p className="text-2xl font-bold text-pink-800">1,234</p>
                <p className="text-sm text-pink-600">Active email list</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sms" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-teal-800">SMS Sent</span>
                </div>
                <p className="text-2xl font-bold text-teal-800">789</p>
                <p className="text-sm text-teal-600">This month</p>
              </div>
              <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span className="font-semibold text-cyan-800">Delivery Rate</span>
                </div>
                <p className="text-2xl font-bold text-cyan-800">99.1%</p>
                <p className="text-sm text-cyan-600">Excellent delivery</p>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-800">Avg Response</span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">2.3s</p>
                <p className="text-sm text-emerald-600">Fast delivery</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Notifications */}
        <div className="mt-6">
          <h4 className="font-semibold text-foreground mb-3">Recent Notifications</h4>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex-shrink-0">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{notification.recipients} recipients</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(notification.status)}`}>
                    {notification.status}
                  </span>
                  <button className="p-1 hover:bg-accent rounded">
                    <Edit className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Send Notification</h3>
              <button onClick={() => setShowComposer(false)} className="p-1 hover:bg-accent rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                <select
                  value={composerData.type}
                  onChange={(e) => setComposerData({...composerData, type: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                >
                  <option value="push">Push Notification</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={composerData.title}
                  onChange={(e) => setComposerData({...composerData, title: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                  placeholder="Enter notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  value={composerData.message}
                  onChange={(e) => setComposerData({...composerData, message: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background h-20"
                  placeholder="Enter notification message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Recipients</label>
                <select
                  value={composerData.recipients}
                  onChange={(e) => setComposerData({...composerData, recipients: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                >
                  <option value="all">All Students</option>
                  <option value="active">Active Students</option>
                  <option value="pending">Pending Payments</option>
                  <option value="custom">Custom Selection</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSendNotification}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Now
                </button>
                <button
                  onClick={() => setComposerData({...composerData, scheduled: !composerData.scheduled})}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
