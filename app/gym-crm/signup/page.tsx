"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, Dumbbell, ArrowLeft } from "lucide-react";

export default function GymSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordHash: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "RECEPTIONIST" // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    passwordHash: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      password: "",
      passwordHash: ""
    });

    //validation
    const newErrors = {
      password: "",
      passwordHash: ""
    };
    if (formData.password !== formData.passwordHash) {
      newErrors.passwordHash = "Passwords do not match";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (newErrors.password || newErrors.passwordHash) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/gym/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      alert(`Register successfully!`);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login
      window.location.href = "/gym-crm/login";
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-16 bg-background">
        <div className="max-w-md w-full space-y-10 bg-card shadow-xl rounded-2xl p-8 border border-border/30">
          {/* Header */}
          <div className="text-center space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-3xl font-extrabold text-foreground tracking-tight">
                GymCRM
              </span>
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="text-muted-foreground text-sm">
              Join our gym management platform today
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-2">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              >
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="TRAINER">Trainer</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none ${errors.password ? 'border-red-500' : 'border-input'}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="passwordHash" className="block text-sm font-semibold text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="passwordHash"
                  name="passwordHash"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.passwordHash}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none ${errors.passwordHash ? 'border-red-500' : 'border-input'}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.passwordHash && <p className="text-red-500 text-sm mt-1">{errors.passwordHash}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 focus:ring-4 focus:ring-primary/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/gym-crm/login"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center">
        <div className="max-w-lg text-center px-10">
          <div className="w-32 h-32 bg-primary/25 rounded-full flex items-center justify-center mx-auto mb-8 shadow-md">
            <Dumbbell className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Join the Fitness Revolution
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            Start managing your gym efficiently with our powerful CRM tools.
            Track progress, manage memberships, and grow your business effortlessly.
          </p>

          <div className="mt-10 space-y-3 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">Easy Member Registration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">Secure Data Management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">24/7 Support Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
