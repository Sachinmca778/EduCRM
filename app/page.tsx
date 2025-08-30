"use client";
import Link from "next/link";
import { useState } from "react";
import {
  GraduationCap, Users, DollarSign, BarChart3, Shield, Zap, 
  CheckCircle, ArrowRight, Star, Play, Menu, X, ChevronDown
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Management",
      description: "Comprehensive student database with enrollment tracking, attendance, and performance analytics.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Fee Management",
      description: "Automated fee collection, payment tracking, and outstanding dues management with multiple payment gateways.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reports",
      description: "Real-time insights into revenue, student performance, and institutional growth with detailed reports.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with data encryption, backup, and compliance with educational standards.",
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Director, IIT Academy",
      content: "EduCRM has transformed how we manage our coaching center. The analytics help us make data-driven decisions.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Principal, Excellence School",
      content: "The fee management system is excellent. We've reduced payment delays by 80% since implementing EduCRM.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Founder, Success Institute",
      content: "Best investment for our educational institution. The student tracking features are incredibly useful.",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Institutions" },
    { number: "50,000+", label: "Students" },
    { number: "₹100Cr+", label: "Revenue Managed" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EduCRM</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/admin" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="block text-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="block text-foreground hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="block text-foreground hover:text-primary transition-colors">Contact</a>
              <div className="pt-4 space-y-2">
                <Link 
                  href="/login" 
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/admin" 
                  className="block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Transform Your
              <span className="text-primary block">Educational Institution</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The complete CRM solution for schools, colleges, and coaching centers. 
              Manage students, track fees, analyze performance, and grow your institution with data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/admin" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From student enrollment to fee collection, we've got you covered with comprehensive tools and analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer ${
                    activeFeature === index ? 'bg-primary/5 border-primary' : 'bg-card'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${feature.bg} ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about EduCRM
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of educational institutions that trust EduCRM to manage their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admin" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">EduCRM</span>
              </div>
              <p className="text-muted-foreground">
                The complete CRM solution for educational institutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
