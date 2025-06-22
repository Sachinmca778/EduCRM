"use client";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import "../globals.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Users, BookOpen, CalendarClock, AlertTriangle, Bell,
  Home, User, Settings, UserCircle2
} from "lucide-react";

const chartData = [
  { name: "Inquiries", value: 20 },
  { name: "Contacted", value: 40 },
  { name: "Trial", value: 28 },
  { name: "Admission", value: 15 },
  { name: "Admission", value: 14 },
];

const recentItems = [
  { name: "Ananya Kumar", date: "04/23/2024", action: "View" },
  { name: "Follow-up called Ananya", date: "04/23/2024", action: "Follow-up" },
  { name: "Siddharth Patil", date: "04/22/2024", action: "Demo Class" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-sky-100 via-white to-indigo-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E2A38] text-white flex flex-col py-6 px-5 shadow-2xl">
        <div className="text-2xl font-extrabold mb-10 tracking-wide">EduCRM</div>
        <nav className="space-y-3">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
          <SidebarItem icon={<Users size={18} />} label="Leads" />
          <SidebarItem icon={<Bell size={18} />} label="Follow-ups" />
          <SidebarItem icon={<CalendarClock size={18} />} label="Demo Classes" />
          <SidebarItem icon={<BookOpen size={18} />} label="Students" />
          <SidebarItem icon={<AlertTriangle size={18} />} label="Fees" />
          <SidebarItem icon={<User size={18} />} label="Notifications" />
          <SidebarItem icon={<UserCircle2 size={18} />} label="Branches" />
          <SidebarItem icon={<Settings size={18} />} label="Users" />
        </nav>
        <div className="mt-auto text-sm text-gray-400">Version 1.0</div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back 👋</h1>
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-full w-10 h-10 shadow-md" />
            <span className="font-medium text-gray-700">Rahul Sharma</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard value="50" label="Inquiries" color="bg-blue-100 text-blue-900" />
          <StatCard value="15" label="Conversions" color="bg-green-100 text-green-900" />
          <StatCard value="8" label="Pending Demos" color="bg-yellow-100 text-yellow-900" />
          <StatCard value="₹20,000" label="Fees Due" color="bg-red-100 text-red-900" />
        </div>

        <Card className="mb-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Activity Overview</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-700 border-b">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map((item, i) => (
                  <tr key={i} className="border-b text-gray-600">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.date}</td>
                    <td className="py-2">
                      <Button variant="outline" size="sm">{item.action}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-800 cursor-pointer ${
        active ? "bg-blue-700" : ""
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ value, label, color }) {
  return (
    <Card className={`${color} text-center`}>
      <CardContent className="py-6">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm mt-1 font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
