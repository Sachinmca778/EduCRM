"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Home, Users, BellRing, CalendarClock, BookOpen, AlertTriangle, User,
  Settings, UserCircle2, Menu, ArrowLeft, ArrowRight, CheckCircle, 
  GraduationCap, FileText, CreditCard, Building, UserPlus, Clock,
  Mail, Phone, MapPin, Upload, Eye, EyeOff, ChevronDown
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

function Badge({ variant = "default", children, className = "" }) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    primary: "bg-primary/10 text-primary",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

function SidebarItem({ icon, label, active, collapsed, badge }) {
  return (
    <button
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
    </button>
  );
}

function StepHeader({ step, context }) {
  const stepMap = {
    student: [
      { title: "Student Info", icon: <UserPlus className="w-4 h-4" /> },
      { title: "Course Selection", icon: <BookOpen className="w-4 h-4" /> },
      { title: "Documents", icon: <FileText className="w-4 h-4" /> },
      { title: "Payment", icon: <CreditCard className="w-4 h-4" /> },
      { title: "Complete", icon: <CheckCircle className="w-4 h-4" /> }
    ],
    teacher: [
      { title: "Basic Info", icon: <User className="w-4 h-4" /> },
      { title: "Subject", icon: <BookOpen className="w-4 h-4" /> },
      { title: "Documents", icon: <FileText className="w-4 h-4" /> },
      { title: "Verification", icon: <CheckCircle className="w-4 h-4" /> },
      { title: "Complete", icon: <CheckCircle className="w-4 h-4" /> }
    ],
    staff: [
      { title: "Basic Info", icon: <User className="w-4 h-4" /> },
      { title: "Role", icon: <Settings className="w-4 h-4" /> },
      { title: "Documents", icon: <FileText className="w-4 h-4" /> },
      { title: "Verification", icon: <CheckCircle className="w-4 h-4" /> },
      { title: "Complete", icon: <CheckCircle className="w-4 h-4" /> }
    ],
    batch: [
      { title: "Batch Info", icon: <Users className="w-4 h-4" /> },
      { title: "Schedule", icon: <Clock className="w-4 h-4" /> },
      { title: "Subjects", icon: <BookOpen className="w-4 h-4" /> },
      { title: "Confirmation", icon: <CheckCircle className="w-4 h-4" /> },
      { title: "Complete", icon: <CheckCircle className="w-4 h-4" /> }
    ],
    institute: [
      { title: "Institute Info", icon: <Building className="w-4 h-4" /> },
      { title: "Admin Contact", icon: <User className="w-4 h-4" /> },
      { title: "Documents", icon: <FileText className="w-4 h-4" /> },
      { title: "Setup", icon: <Settings className="w-4 h-4" /> },
      { title: "Complete", icon: <CheckCircle className="w-4 h-4" /> }
    ]
  };
  
  const steps = stepMap[context] || stepMap.student;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
              i < step 
                ? "bg-primary border-primary text-primary-foreground" 
                : i === step 
                ? "bg-primary/10 border-primary text-primary" 
                : "bg-muted border-border text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle className="w-5 h-5" /> : s.icon}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                i < step ? "bg-primary" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div key={i} className="text-center flex-1">
            <p className={`text-sm font-medium ${
              i === step ? "text-primary" : "text-muted-foreground"
            }`}>
              {s.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, icon, value, onChange, required = false, className = "" }) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function FileUpload({ label, accept = "*", onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default function Onboarding({ type = "student" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStudentForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              icon={<User className="w-4 h-4" />}
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              icon={<Phone className="w-4 h-4" />}
              value={formData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Address"
                placeholder="Enter complete address"
                icon={<MapPin className="w-4 h-4" />}
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Branch <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.branch || ""}
                  onChange={(e) => handleInputChange("branch", e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select Branch</option>
                  <option value="north">North Branch</option>
                  <option value="south">South Branch</option>
                  <option value="east">East Branch</option>
                  <option value="west">West Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.course || ""}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select Course</option>
                  <option value="jee">JEE Advanced</option>
                  <option value="neet">NEET</option>
                  <option value="cat">CAT</option>
                  <option value="gate">GATE</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Batch
              </label>
              <select
                value={formData.batch || ""}
                onChange={(e) => handleInputChange("batch", e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select Batch</option>
                <option value="morning">Morning (8 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (2 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 10 PM)</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload label="Profile Photo" accept="image/*" />
            <FileUpload label="ID Proof (Aadhar/PAN)" accept=".pdf,.jpg,.png" />
            <FileUpload label="Previous Certificates" accept=".pdf,.jpg,.png" />
            <FileUpload label="Transfer Certificate" accept=".pdf,.jpg,.png" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-foreground mb-4">Fee Structure</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course Selected:</span>
                    <span className="font-medium">{formData.course || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fee:</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-medium text-green-600">-₹5,000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Final Amount:</span>
                      <span className="font-bold text-lg">₹45,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Payment Method"
                placeholder="Select payment method"
                value={formData.paymentMethod || ""}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              />
              <Input
                label="Transaction ID"
                placeholder="Enter transaction ID"
                value={formData.transactionId || ""}
                onChange={(e) => handleInputChange("transactionId", e.target.value)}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">🎉 Onboarding Complete!</h2>
              <p className="text-muted-foreground">Welcome to our institution, <strong>{formData.name}</strong>!</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Next Steps:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You'll receive a welcome email with login credentials</li>
                <li>• Attend orientation session on {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}</li>
                <li>• Classes will begin from next week</li>
              </ul>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (type) {
      case "student":
        return renderStudentForm();
      default:
        return renderStudentForm(); // Default to student form for now
    }
  };

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: false },
    { icon: <Users size={20} />, label: "Leads", badge: "24" },
    { icon: <BellRing size={20} />, label: "Follow-ups", badge: "12" },
    { icon: <CalendarClock size={20} />, label: "Demo Classes", badge: "8" },
    { icon: <BookOpen size={20} />, label: "Students" },
    { icon: <AlertTriangle size={20} />, label: "Fees" },
    { icon: <User size={20} />, label: "Notifications", badge: "3" },
    { icon: <UserCircle2 size={20} />, label: "Branches" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

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
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Onboarding
                </h1>
                <p className="text-muted-foreground">Complete the registration process</p>
              </div>
            </div>
            <Badge variant="primary">Step {step + 1} of 5</Badge>
          </div>
        </header>

        <div className="p-6">
          <StepHeader step={step} context={type} />
          
          <Card>
            <CardContent>
              {renderForm()}
              
              {step < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <button 
                    onClick={handleBack}
                    disabled={step === 0}
                    className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {step === 3 ? "Complete" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
