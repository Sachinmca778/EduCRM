"use client";
import { useState } from "react";
import {
  Menu, DollarSign, AlertTriangle, Users, BookOpen, CalendarClock, BellRing,
  Home, User, Settings, UserCircle2, TrendingUp, Banknote
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// Dummy Data
const monthlyRevenue = [
  { month: "Jan", revenue: 80000 },
  { month: "Feb", revenue: 95000 },
  { month: "Mar", revenue: 105000 },
  { month: "Apr", revenue: 110000 },
  { month: "May", revenue: 120000 },
  { month: "Jun", revenue: 125000 },
];

const gatewaySummary = [
  { label: "Razorpay", value: "₹60,000" },
  { label: "Paytm", value: "₹30,000" },
  { label: "UPI", value: "₹30,000" },
];

// Reusable Components
function Card({ className = "", children }) {
  return <div className={`rounded-2xl bg-white/70 backdrop-blur shadow-md border border-gray-200 ${className}`}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function SidebarItem({ icon, label, active, collapsed }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-800 cursor-pointer ${
        active ? "bg-blue-700" : ""
      }`}
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}
function StatCard({ icon, title, value, color = "text-blue-600", bg = "bg-blue-100" }) {
  return (
    <Card className="text-center">
      <CardContent>
        <div className="flex justify-center mb-3">
          <div className={`p-3 ${bg} ${color} rounded-full shadow-sm`}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm font-medium text-gray-600 mt-1">{title}</div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("June");

  const stats = [
    {
      title: "Monthly Revenue",
      value: "₹1,20,000",
      icon: <DollarSign size={20} />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Outstanding Dues",
      value: "₹35,000",
      icon: <AlertTriangle size={20} />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Active Students",
      value: "342",
      icon: <Users size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-sky-100 via-white to-indigo-100">

      {/* Sidebar */}
      <aside className={`bg-[#1E2A38] text-white transition-all duration-300 shadow-2xl ${sidebarCollapsed ? "w-20" : "w-64"} flex flex-col py-6 px-4`}>
        <div className="flex justify-between items-center mb-8">
          <span className={`text-2xl font-bold ${sidebarCollapsed ? "hidden" : ""}`}>EduCRM</span>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-white">
            <Menu size={20} />
          </button>
        </div>
        <nav className="space-y-3">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Users size={18} />} label="Leads" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BellRing size={18} />} label="Follow-ups" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<CalendarClock size={18} />} label="Demo Classes" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BookOpen size={18} />} label="Students" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<AlertTriangle size={18} />} label="Fees" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<User size={18} />} label="Notifications" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<UserCircle2 size={18} />} label="Branches" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Settings size={18} />} label="Users" collapsed={sidebarCollapsed} />
        </nav>
        <div className="mt-auto text-sm text-gray-400 text-center">{!sidebarCollapsed && "Version 1.0"}</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40?img=9" alt="admin" className="rounded-full w-10 h-10 shadow-md" />
            <span className="font-medium text-gray-700">Admin User</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 text-gray-800">
          <select
            className="border rounded-md px-4 py-2"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="All">All Branches</option>
            <option value="North">North Branch</option>
            <option value="South">South Branch</option>
          </select>
          <select
            className="border rounded-md px-4 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} bg={stat.bg} />
          ))}
        </div>

        {/* Revenue Chart */}
        <Card className="mb-10">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Revenue Trends</h2>
              <TrendingUp className="text-blue-600" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway Overview */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Payment Gateway Overview</h2>
              <Banknote className="text-green-600" />
            </div>
            <ul className="divide-y text-sm text-gray-700">
              {gatewaySummary.map((item, i) => (
                <li key={i} className="flex justify-between py-2">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
