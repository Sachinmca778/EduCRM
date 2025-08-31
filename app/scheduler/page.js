"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar, Clock, Users, MapPin, Phone, Mail, Plus, Search, Filter,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, Bell,
  Settings, Download, Share2, Edit, Trash2, Eye, MoreHorizontal,
  GraduationCap, BookOpen, User, CalendarDays, Clock4, Building,
  Smartphone, MessageCircle, Mail as MailIcon, CalendarCheck,
  ChevronDown, ChevronUp, Star, StarHalf, UserCheck, UserX
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

function CardHeader({ className = "", children }) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

function Badge({ variant = "default", children, className = "" }) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    primary: "bg-primary/10 text-primary",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

function Button({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ placeholder, className = "", ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export default function AppointmentScheduler() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed": return <Badge variant="success">Confirmed</Badge>;
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Appointment & Demo Scheduler</h1>
              <p className="text-muted-foreground">Manage bookings, calendar sync, and resource allocation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowBookingModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
            <Button variant="outline" onClick={() => setShowResourceModal(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Manage Resources
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Confirmations</p>
                    <p className="text-2xl font-bold text-foreground">5</p>
                  </div>
                  <Bell className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Teachers</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                  <Users className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                    <p className="text-2xl font-bold text-foreground">6</p>
                  </div>
                  <Building className="w-8 h-8 text-info" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Card>
            <div className="flex border-b border-border">
              {[
                { id: "calendar", label: "📅 Calendar View", icon: Calendar },
                { id: "bookings", label: "📋 All Bookings", icon: BookOpen },
                { id: "resources", label: "👥 Resource Management", icon: Users },
                { id: "integrations", label: "🔗 Calendar Sync", icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
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

            <div className="p-6">
              {activeTab === "calendar" && (
                <div className="space-y-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <h3 className="text-lg font-semibold text-foreground">
                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Today</Button>
                      <Select className="w-32">
                        <option>Week</option>
                        <option>Month</option>
                        <option>Day</option>
                      </Select>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground bg-accent rounded-lg">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar Days */}
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                      date.setDate(date.getDate() + i - date.getDay());
                      const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                      const isToday = date.toDateString() === new Date().toDateString();
                      
                      return (
                        <div
                          key={i}
                          className={`p-3 min-h-[100px] border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                            !isCurrentMonth ? 'text-muted-foreground/50' : ''
                          } ${isToday ? 'bg-primary/10 border-primary' : ''}`}
                          onClick={() => setShowBookingModal(true)}
                        >
                          <div className="text-sm font-medium mb-2">{date.getDate()}</div>
                          <div className="space-y-1">
                            {/* Sample appointments */}
                            {isCurrentMonth && i % 3 === 0 && (
                              <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded">
                                Demo Class - 10:00 AM
                              </div>
                            )}
                            {isCurrentMonth && i % 5 === 0 && (
                              <div className="text-xs p-1 bg-green-100 text-green-800 rounded">
                                Consultation - 2:00 PM
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Booking */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-foreground">Quick Booking</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Student Name</label>
                          <Input placeholder="Enter student name" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Course</label>
                          <Select>
                            <option>JEE Advanced</option>
                            <option>NEET</option>
                            <option>CAT</option>
                            <option>GATE</option>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Date & Time</label>
                          <Input type="datetime-local" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <Button>
                          <CalendarCheck className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                        <Button variant="outline">
                          <Bell className="w-4 h-4 mr-2" />
                          Send Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="flex items-center gap-4">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search bookings..." className="w-64" />
                    <Select className="w-32">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </Select>
                    <Select className="w-32">
                      <option>All Courses</option>
                      <option>JEE Advanced</option>
                      <option>NEET</option>
                      <option>CAT</option>
                    </Select>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        student: "Ananya Kumar",
                        course: "JEE Advanced",
                        date: "2024-01-15",
                        time: "10:00 AM",
                        duration: "60 min",
                        teacher: "Dr. Rajesh Sharma",
                        room: "Room 101",
                        status: "confirmed",
                        phone: "+91 98765 43210",
                        email: "ananya@email.com"
                      },
                      {
                        id: 2,
                        student: "Siddharth Patil",
                        course: "NEET",
                        date: "2024-01-15",
                        time: "2:00 PM",
                        duration: "45 min",
                        teacher: "Dr. Priya Singh",
                        room: "Room 102",
                        status: "pending",
                        phone: "+91 98765 43211",
                        email: "siddharth@email.com"
                      },
                      {
                        id: 3,
                        student: "Zara Khan",
                        course: "CAT",
                        date: "2024-01-16",
                        time: "11:30 AM",
                        duration: "90 min",
                        teacher: "Prof. Amit Kumar",
                        room: "Room 103",
                        status: "confirmed",
                        phone: "+91 98765 43212",
                        email: "zara@email.com"
                      }
                    ].map((booking) => (
                      <Card key={booking.id}>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{booking.student}</h4>
                                <p className="text-sm text-muted-foreground">{booking.course}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {booking.date}
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {booking.time} ({booking.duration})
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium text-foreground">{booking.teacher}</p>
                                <p className="text-xs text-muted-foreground">{booking.room}</p>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Mail className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-6">
                  {/* Teachers Management */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-foreground">Teachers & Availability</h4>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Teacher
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          {
                            id: 1,
                            name: "Dr. Rajesh Sharma",
                            subject: "Physics",
                            availability: "Mon-Fri, 9AM-5PM",
                            rating: 4.8,
                            status: "available",
                            avatar: "https://i.pravatar.cc/40?img=1"
                          },
                          {
                            id: 2,
                            name: "Dr. Priya Singh",
                            subject: "Chemistry",
                            availability: "Mon-Sat, 10AM-6PM",
                            rating: 4.9,
                            status: "busy",
                            avatar: "https://i.pravatar.cc/40?img=2"
                          },
                          {
                            id: 3,
                            name: "Prof. Amit Kumar",
                            subject: "Mathematics",
                            availability: "Mon-Fri, 8AM-4PM",
                            rating: 4.7,
                            status: "available",
                            avatar: "https://i.pravatar.cc/40?img=3"
                          }
                        ].map((teacher) => (
                          <Card key={teacher.id}>
                            <CardContent>
                              <div className="flex items-center gap-3 mb-3">
                                <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full" />
                                <div>
                                  <h5 className="font-semibold text-foreground">{teacher.name}</h5>
                                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                                </div>
                                <div className="ml-auto">
                                  {teacher.status === "available" ? (
                                    <UserCheck className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <UserX className="w-5 h-5 text-red-600" />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{teacher.availability}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm text-muted-foreground">{teacher.rating}/5.0</span>
                                </div>
                                <Badge variant={teacher.status === "available" ? "success" : "warning"}>
                                  {teacher.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rooms Management */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-foreground">Rooms & Equipment</h4>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Room
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          {
                            id: 1,
                            name: "Room 101",
                            capacity: 25,
                            equipment: ["Projector", "Whiteboard", "AC"],
                            status: "available",
                            currentBooking: null
                          },
                          {
                            id: 2,
                            name: "Room 102",
                            capacity: 15,
                            equipment: ["Smart TV", "Whiteboard"],
                            status: "occupied",
                            currentBooking: "Demo Class - 2:00 PM"
                          },
                          {
                            id: 3,
                            name: "Room 103",
                            capacity: 30,
                            equipment: ["Projector", "Sound System", "AC"],
                            status: "available",
                            currentBooking: null
                          }
                        ].map((room) => (
                          <Card key={room.id}>
                            <CardContent>
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-foreground">{room.name}</h5>
                                <Badge variant={room.status === "available" ? "success" : "warning"}>
                                  {room.status}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Capacity: {room.capacity}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground mb-1">Equipment:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {room.equipment.map((item, index) => (
                                      <Badge key={index} variant="default" className="text-xs">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {room.currentBooking && (
                                  <div className="mt-2 p-2 bg-accent rounded-lg">
                                    <p className="text-xs text-muted-foreground">Current Booking:</p>
                                    <p className="text-sm font-medium text-foreground">{room.currentBooking}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "integrations" && (
                <div className="space-y-6">
                  {/* Calendar Sync */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-foreground">Calendar Integrations</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Google Calendar */}
                        <Card>
                          <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-red-600" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-foreground">Google Calendar</h5>
                                <p className="text-sm text-muted-foreground">Sync with Google Calendar</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Auto-sync appointments</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Two-way sync</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Real-time updates</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Outlook Calendar */}
                        <Card>
                          <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-foreground">Outlook Calendar</h5>
                                <p className="text-sm text-muted-foreground">Sync with Outlook</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Auto-sync appointments</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Two-way sync</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-foreground">Real-time updates</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Auto Confirmations */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-foreground">Auto Confirmations & Reminders</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Email Reminders */}
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                              <h5 className="font-semibold text-foreground">Email Reminders</h5>
                              <p className="text-sm text-muted-foreground">Send email confirmations and reminders</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="success">Active</Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>

                        {/* SMS Reminders */}
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-green-600" />
                            <div>
                              <h5 className="font-semibold text-foreground">SMS Reminders</h5>
                              <p className="text-sm text-muted-foreground">Send SMS notifications</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="success">Active</Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>

                        {/* WhatsApp Reminders */}
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <h5 className="font-semibold text-foreground">WhatsApp Reminders</h5>
                              <p className="text-sm text-muted-foreground">Send WhatsApp notifications</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="warning">Pending</Badge>
                            <Button variant="outline" size="sm">Setup</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-foreground">Notification Settings</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h5 className="font-semibold text-foreground">Reminder Timing</h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">24 hours before</span>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">2 hours before</span>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">30 minutes before</span>
                              <Badge variant="warning">Inactive</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h5 className="font-semibold text-foreground">Auto Actions</h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">Auto-confirm bookings</span>
                              <Badge variant="success">Enabled</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">Auto-cancel no-shows</span>
                              <Badge variant="warning">Disabled</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">Auto-reschedule conflicts</span>
                              <Badge variant="success">Enabled</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
