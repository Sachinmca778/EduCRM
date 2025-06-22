"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Menu, PlusCircle, CalendarCheck2, Mail, MessageCircle, BellRing, Home,
  Users, BookOpen, CalendarClock, AlertTriangle, User, Settings, UserCircle2
} from "lucide-react";

// Basic UI Components
function Card({ className = "", children }) {
  return <div className={`rounded-2xl bg-white/70 backdrop-blur shadow-md border border-gray-200 ${className}`}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function Button({ children, className = "", variant = "primary", size = "base", ...props }) {
  const base = "rounded-lg px-4 py-2 font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 shadow-md",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    base: "text-base",
    sm: "text-sm px-3 py-1.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
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

export default function FeeTrackerWithSidebar() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const dues = [
    { name: "Ananya Kumar", dueDate: "2025-07-05", amount: 5000, status: "Pending" },
    { name: "Siddharth Patil", dueDate: "2025-06-30", amount: 7500, status: "Overdue" },
  ];

  // Simulate payment-related frontend actions
  const simulatePayment = (name, amt) => alert(`💳 Simulated Razorpay/Paytm Payment\nStudent: ${name}\nAmount: ₹${amt}`);
  const triggerReminder = (name) => alert(`📩 Email/WhatsApp reminder sent to ${name}`);
  const generateReceipt = (name, amt) => alert(`📄 Receipt Generated for ₹${amt} - ${name}`);

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
          <SidebarItem icon={<Home size={18} />} label="Dashboard" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Users size={18} />} label="Leads" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BellRing size={18} />} label="Follow-ups" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<CalendarClock size={18} />} label="Demo Classes" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BookOpen size={18} />} label="Students" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<AlertTriangle size={18} />} label="Fees" active collapsed={sidebarCollapsed} />
          <SidebarItem icon={<User size={18} />} label="Notifications" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<UserCircle2 size={18} />} label="Branches" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Settings size={18} />} label="Users" collapsed={sidebarCollapsed} />
        </nav>
        <div className="mt-auto text-sm text-gray-400 text-center">{!sidebarCollapsed && "Version 1.0"}</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Fees Collection & Tracker</h1>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <PlusCircle className="inline w-5 h-5 mr-2" /> Add Fee Structure
          </Button>
        </div>

        {/* Installment and Reminder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <CalendarCheck2 className="text-green-600" /> Installments
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between bg-gray-100 p-3 rounded">
                  <span>June Installment</span>
                  <span>₹ 5,000</span>
                  <span className="text-green-700 font-semibold">Paid</span>
                </li>
                <li className="flex justify-between bg-gray-100 p-3 rounded">
                  <span>July Installment</span>
                  <span>₹ 5,000</span>
                  <span className="text-red-600 font-semibold">Due</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <BellRing className="text-yellow-600" /> Reminders
              </h2>
              <p className="text-gray-700 mb-2"><Mail className="inline w-5 h-5 mr-2 text-blue-500" /> Email reminder enabled</p>
              <p className="text-gray-700"><MessageCircle className="inline w-5 h-5 mr-2 text-green-500" /> WhatsApp reminder enabled</p>
            </CardContent>
          </Card>
        </div>

        {/* Dues Table */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending & Overdue Dues</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-700">
                  <th className="p-2">Student</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dues.map((d, i) => (
                  <tr key={i} className="border-b text-gray-700">
                    <td className="p-2">{d.name}</td>
                    <td className="p-2">{d.dueDate}</td>
                    <td className="p-2">₹ {d.amount}</td>
                    <td className={`p-2 font-semibold ${d.status === "Overdue" ? "text-red-600" : "text-yellow-600"}`}>{d.status}</td>
                    <td className="p-2 space-x-2">
                      <Button size="sm" variant="outline" onClick={() => simulatePayment(d.name, d.amount)}>Track Payment</Button>
                      <Button size="sm" variant="outline" onClick={() => generateReceipt(d.name, d.amount)}>Receipt</Button>
                      <Button size="sm" variant="outline" onClick={() => triggerReminder(d.name)}>Remind</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Add Fee Modal */}
        <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 z-50">
                <Dialog.Title className="text-lg font-semibold mb-4 text-gray-900">Add Fee Structure</Dialog.Title>
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input type="text" className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Total Fee (₹)</label>
                    <input type="number" className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Installments</label>
                    <input type="text" className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g. 3 x ₹5000" />
                    </div>
                </div>
                <div className="text-right mt-6">
                    <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button size="sm" className="ml-2">Save</Button>
                </div>
                </Dialog.Panel>
            </div>
        </Dialog>

      </main>
    </div>
  );
}
