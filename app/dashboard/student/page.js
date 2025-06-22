"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Menu, X, Users, BookOpen, CalendarClock, CalendarDays,
  FileText, ThumbsUp, AlertTriangle, Bell, Home, User, Settings, UserCircle2
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// Reusable Components
function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-white/70 backdrop-blur shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function Button({ children, className = "", variant = "primary", size = "base", ...props }) {
  const base = "rounded-lg px-4 py-2 font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
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

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testScores = [
    { name: "Jan", score: 72 },
    { name: "Feb", score: 78 },
    { name: "Mar", score: 85 },
    { name: "Apr", score: 81 },
    { name: "May", score: 88 },
  ];
  const attendanceStats = { totalDays: 120, present: 110, absent: 10 };
  const feedbackList = [
    { date: "2024-05-12", feedback: "Great improvement in communication skills." },
    { date: "2024-05-05", feedback: "Needs to focus more on math assignments." },
    { date: "2024-04-28", feedback: "Consistent and punctual in attending classes." },
    { date: "2024-04-15", feedback: "Excellent class participation." },
    { date: "2024-04-01", feedback: "Homework is consistently submitted on time." },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-sky-100 via-white to-indigo-100 transition-all">
      {/* Sidebar */}
      <aside className={`bg-[#1E2A38] text-white flex flex-col py-6 px-4 shadow-2xl transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-10">
          <span className={`text-2xl font-bold tracking-wide transition-all duration-300 ${!isSidebarOpen && "hidden"}`}>
            EduCRM
          </span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-3">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active={true} open={isSidebarOpen} />
          <SidebarItem icon={<Users size={18} />} label="Leads" open={isSidebarOpen} />
          <SidebarItem icon={<Bell size={18} />} label="Follow-ups" open={isSidebarOpen} />
          <SidebarItem icon={<CalendarClock size={18} />} label="Demo Classes" open={isSidebarOpen} />
          <SidebarItem icon={<BookOpen size={18} />} label="Students" open={isSidebarOpen} />
          <SidebarItem icon={<AlertTriangle size={18} />} label="Fees" open={isSidebarOpen} />
          <SidebarItem icon={<User size={18} />} label="Notifications" open={isSidebarOpen} />
          <SidebarItem icon={<UserCircle2 size={18} />} label="Branches" open={isSidebarOpen} />
          <SidebarItem icon={<Settings size={18} />} label="Users" open={isSidebarOpen} />
        </nav>

        <div className={`mt-auto text-sm text-gray-400 ${!isSidebarOpen && "hidden"}`}>Version 1.0</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 transition-all">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Student Dashboard</h1>
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40?img=8" alt="student" className="rounded-full w-10 h-10 shadow-md" />
            <span className="font-medium text-gray-700">Ananya Kumar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<FileText />} title="Tests Taken" value="5" />
          <StatCard icon={<CalendarDays />} title="Attendance" value="91.7%" />
          <StatCard icon={<ThumbsUp />} title="Positive Feedbacks" value="7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Test Score Progress</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={testScores}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Attendance Overview</h2>
              <div className="text-gray-700 text-base space-y-4">
                <div className="flex justify-between">
                  <span>Total Days</span>
                  <span>{attendanceStats.totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Present</span>
                  <span className="text-green-700 font-semibold">{attendanceStats.present}</span>
                </div>
                <div className="flex justify-between">
                  <span>Absent</span>
                  <span className="text-red-600 font-semibold">{attendanceStats.absent}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback */}
        <Card className="mt-8">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Feedback</h2>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                View All
              </Button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-700">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.slice(0, 3).map((fb, index) => (
                  <tr key={index} className="border-b text-gray-600">
                    <td className="py-2">{fb.date}</td>
                    <td className="py-2">{fb.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Subject-wise Progress */}
        <Card className="mt-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Subject-wise Progress</h2>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", progress: 85 },
                { subject: "Science", progress: 78 },
                { subject: "English", progress: 90 },
                { subject: "Social Studies", progress: 72 },
              ].map((sub, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{sub.subject}</span>
                    <span className="text-sm text-gray-500">{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${sub.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 z-50">
              <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800">Full Feedback History</Dialog.Title>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {feedbackList.map((fb, i) => (
                  <div key={i} className="border-b pb-2">
                    <div className="text-sm text-gray-600 font-medium">{fb.date}</div>
                    <div className="text-gray-800">{fb.feedback}</div>
                  </div>
                ))}
              </div>
              <div className="text-right mt-6">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </Dialog>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, open }) {
    return (
      <div
        className={`flex items-center px-4 py-2 rounded-md transition cursor-pointer hover:bg-blue-800 ${
          active ? "bg-blue-700" : ""
        }`}
      >
        <div className="min-w-[24px] text-white">{icon}</div>
  
        <span
          className={`ml-3 text-sm font-medium text-white transition-all duration-300 ${
            !open ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          {label}
        </span>
      </div>
    );
  }
  

function StatCard({ icon, title, value }) {
  return (
    <Card className="bg-white/80 shadow-md backdrop-blur border border-gray-200">
      <CardContent className="flex items-center space-x-4 p-6">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-full">{icon}</div>
        <div>
          <div className="text-lg font-semibold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}
