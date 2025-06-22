"use client";
import { useState } from "react";
import {
  Home, Users, BellRing, CalendarClock, BookOpen, AlertTriangle, User,
  Settings, UserCircle2, Menu
} from "lucide-react";

function Card({ children, className = "" }) {
  return <div className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-gray-700 ${className}`}>{children}</div>;
}

function SidebarItem({ icon, label, active, collapsed }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition hover:bg-blue-900 cursor-pointer ${active ? "bg-blue-700" : ""}`}>
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}

function StepHeader({ step, context }) {
  const stepMap = {
    student: ["Student Info", "Course", "Documents", "Fee", "Done"],
    teacher: ["Basic Info", "Subject", "Documents", "Verification", "Done"],
    staff: ["Basic Info", "Role", "Documents", "Verification", "Done"],
    batch: ["Batch Info", "Schedule", "Subjects", "Confirmation", "Done"],
    institute: ["Institute Info", "Admin Contact", "Documents", "Setup", "Done"]
  };
  const steps = stepMap[context] || stepMap.student;
  return (
    <div className="flex justify-between mb-8">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`text-sm font-semibold flex-1 text-center py-3 rounded-xl transition-all duration-200 ${i === step ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : "bg-gray-100 text-gray-600"}`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

export default function Onboarding({ type = "student" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({});

  function handleNext() {
    if (step < 4) setStep(step + 1);
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  const renderField = (label, field, type = "text") => (
    <input
      type={type}
      placeholder={label}
      className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full"
      onChange={e => setFormData({ ...formData, [field]: e.target.value })}
    />
  );

  const renderStepForm = () => {
    const commonFields = {
      student: [
        [renderField("Full Name", "name"), renderField("Contact Number", "contact"), renderField("Date of Birth", "dob", "date"), renderField("Address", "address")],
        [renderField("Branch", "branch"), renderField("Course", "course"), renderField("Preferred Batch", "batch")],
        ["Photo", "ID Proof", "Certificates"].map(label => (
          <div key={label}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input type="file" className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full" />
          </div>
        )),
        [
          <p><strong>Course Selected:</strong> {formData.course}</p>,
          <p><strong>Base Fee:</strong> ₹50,000</p>,
          <p><strong>Discount:</strong> ₹5,000</p>,
          <p><strong>Final Payable:</strong> ₹45,000</p>
        ]
      ],
      teacher: [
        [renderField("Name", "name"), renderField("Email", "email"), renderField("Contact", "contact")],
        [renderField("Subject", "subject")],
        ["Photo", "ID Proof", "Degree Certificates"].map(label => (
          <div key={label}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input type="file" className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full" />
          </div>
        )),
        [renderField("Verification Code", "verifyCode")]
      ],
      staff: [
        [renderField("Full Name", "name"), renderField("Contact", "contact")],
        [renderField("Role", "role")],
        ["Photo", "ID Proof"].map(label => (
          <div key={label}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input type="file" className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full" />
          </div>
        )),
        [renderField("Verification Code", "verifyCode")]
      ],
      batch: [
        [renderField("Batch Name", "batchName"), renderField("Branch", "branch"), renderField("Start Date", "startDate", "date")],
        [renderField("Schedule", "schedule")],
        [renderField("Subjects", "subjects")],
        [<p className="text-gray-700">Confirm Batch Details and Proceed</p>]
      ]
    };

    const stepFields = commonFields[type];

    if (type === "institute") {
      switch (step) {
        case 0:
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Institute Name", "name")}
              {renderField("Registration Number", "regNumber")}
              {renderField("Address", "address")}
            </div>
          );
        case 1:
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Admin Name", "adminName")}
              {renderField("Admin Email", "email")}
              {renderField("Contact Number", "contact")}
            </div>
          );
        case 2:
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Registration Certificate", "Affiliation Letter", "Upload Logo"].map(label => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                  <input type="file" className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full" />
                </div>
              ))}
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              {renderField("Number of Branches", "branches", "number")}
              <select className="border px-4 py-3 rounded-lg text-gray-800 shadow w-full" onChange={e => setFormData({ ...formData, plan: e.target.value })}>
                <option>Select Plan</option>
                <option>Basic</option>
                <option>Premium</option>
              </select>
              <div>
                <label className="text-sm text-gray-700 font-semibold">Enable Modules:</label>
                <div className="flex gap-4 mt-2">
                  {["CRM", "Fees", "Admissions"].map(m => (
                    <label key={m} className="flex items-center gap-2">
                      <input type="checkbox" onChange={e => {
                        const modules = formData.modules?.includes(m)
                          ? formData.modules.filter(mod => mod !== m)
                          : [...(formData.modules || []), m];
                        setFormData({ ...formData, modules });
                      }} /> {m}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
      }
    } else if (stepFields && stepFields[step]) {
      return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{stepFields[step]}</div>;
    }

    return (
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-600">🎉 Onboarding Complete</h2>
        <p className="text-gray-700 text-lg">Welcome, <strong>{formData.name}</strong>!</p>
        <p className="text-gray-600">You have been successfully onboarded.</p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <aside className={`bg-[#1E2A38] text-white transition-all duration-300 shadow-2xl ${sidebarCollapsed ? "w-20" : "w-64"} flex flex-col py-6 px-4`}>
        <div className="flex justify-between items-center mb-8">
          <span className={`text-2xl font-bold tracking-wide ${sidebarCollapsed ? "hidden" : ""}`}>EduCRM</span>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-white">
            <Menu size={20} />
          </button>
        </div>
        <nav className="space-y-4">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Users size={18} />} label="Leads" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BellRing size={18} />} label="Follow-ups" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<CalendarClock size={18} />} label="Demo Classes" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<BookOpen size={18} />} label="Students" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<AlertTriangle size={18} />} label="Fees" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<User size={18} />} label="Notifications" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<UserCircle2 size={18} />} label="Branches" collapsed={sidebarCollapsed} />
          <SidebarItem icon={<Settings size={18} />} label="Users" collapsed={sidebarCollapsed} />
        </nav>
        <div className="mt-auto text-sm text-gray-400 text-center pt-6">{!sidebarCollapsed && "Version 1.0"}</div>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 tracking-tight">📋 {type.charAt(0).toUpperCase() + type.slice(1)} Onboarding</h1>
        <StepHeader step={step} context={type} />
        <Card>
          {renderStepForm()}
          <div className="flex justify-between mt-8">
            {step > 0 && <button onClick={handleBack} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-semibold">Back</button>}
            {step < 4 && <button onClick={handleNext} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Next</button>}
          </div>
        </Card>
      </main>
    </div>
  );
}
