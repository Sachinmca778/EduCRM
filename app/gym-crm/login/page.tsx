"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Dumbbell, ArrowLeft } from "lucide-react";
import { error } from "console";
import AlertMessage from "../components/AlertMessage";

export default function GymLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const res = await fetch("http://localhost:8080/gym/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        setErrorMessage("Login failed due to invalid credentials");
        setIsLoading(false);
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);
      localStorage.setItem('memberId',data.memberId)
      localStorage.setItem('accessToken',data.accessToken);
      localStorage.setItem('role',data.role);

      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/gym-crm";
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
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
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to your gym account to continue
            </p>
          </div>

          <AlertMessage type="success" message={successMessage} />
          <AlertMessage type="error" message={errorMessage} />


          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-2">
                Username
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  placeholder="Enter your username"
                />
              </div>
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
                  className="w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 group-hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-input rounded cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-foreground">
                  Remember me
                </label>
              </div>
              <Link
                href="/gym-crm/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 focus:ring-4 focus:ring-primary/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Don’t have an account?{" "}
              <Link
                href="/gym-crm/signup"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center">
        <div className="max-w-lg text-center px-10">
          <div className="w-32 h-32 bg-primary/25 rounded-full flex items-center justify-center mx-auto mb-8 shadow-md">
            <Dumbbell className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Manage Your Gym Operations
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            Streamline your gym management with our comprehensive CRM solution.
            Track members, manage memberships, and grow your fitness business effortlessly.
          </p>

          <div className="mt-10 space-y-3 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">Member Management & Analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">Membership & Payment Tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground text-sm">Trainer & Staff Management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
