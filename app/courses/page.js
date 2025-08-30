"use client";
import { useState, useEffect } from "react";
import { 
  BookOpen, Calendar, Users, Clock, MapPin, Plus, 
  Edit, Trash2, Search, Filter, ArrowLeft, Settings,
  User, GraduationCap, Target, BarChart3, CheckCircle,
  AlertCircle, Star, TrendingUp, DollarSign, Eye,
  MoreHorizontal, Download, Share, Bookmark, Clock as ClockIcon,
  CalendarDays, UserCheck, UserX, Users2, Building2, X
} from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  // Sample data
  const courses = [
    {
      id: 1,
      name: "JEE Advanced Preparation",
      category: "Engineering",
      duration: "12 months",
      fee: "₹85,000",
      students: 45,
      maxCapacity: 60,
      teacher: "Dr. Rajesh Kumar",
      status: "active",
      rating: 4.8,
      description: "Comprehensive preparation for JEE Advanced with advanced problem solving techniques.",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      schedule: "Mon, Wed, Fri - 6:00 PM",
      location: "Main Campus - Block A",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "NEET Medical Entrance",
      category: "Medical",
      duration: "10 months",
      fee: "₹75,000",
      students: 38,
      maxCapacity: 50,
      teacher: "Dr. Priya Sharma",
      status: "active",
      rating: 4.7,
      description: "Focused preparation for NEET with biology emphasis and practical sessions.",
      subjects: ["Biology", "Physics", "Chemistry"],
      schedule: "Tue, Thu, Sat - 5:30 PM",
      location: "Main Campus - Block B",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "CAT MBA Preparation",
      category: "Management",
      duration: "8 months",
      fee: "₹65,000",
      students: 28,
      maxCapacity: 40,
      teacher: "Prof. Amit Patel",
      status: "active",
      rating: 4.6,
      description: "Strategic preparation for CAT with focus on quantitative aptitude and verbal ability.",
      subjects: ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation"],
      schedule: "Mon, Wed, Fri - 7:00 PM",
      location: "Main Campus - Block C",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "GATE Computer Science",
      category: "Engineering",
      duration: "6 months",
      fee: "₹55,000",
      students: 22,
      maxCapacity: 35,
      teacher: "Prof. Neha Singh",
      status: "upcoming",
      rating: 4.5,
      description: "Specialized preparation for GATE CS with programming and algorithms focus.",
      subjects: ["Computer Science", "Programming", "Algorithms"],
      schedule: "Tue, Thu, Sat - 6:30 PM",
      location: "Main Campus - Block D",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    }
  ];

  const batches = [
    {
      id: 1,
      courseId: 1,
      name: "JEE Advanced - Morning Batch",
      teacher: "Dr. Rajesh Kumar",
      students: 25,
      maxStudents: 30,
      schedule: "Mon, Wed, Fri - 8:00 AM",
      room: "Room 101",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-15"
    },
    {
      id: 2,
      courseId: 1,
      name: "JEE Advanced - Evening Batch",
      teacher: "Dr. Rajesh Kumar",
      students: 20,
      maxStudents: 30,
      schedule: "Mon, Wed, Fri - 6:00 PM",
      room: "Room 102",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-15"
    },
    {
      id: 3,
      courseId: 2,
      name: "NEET - Regular Batch",
      teacher: "Dr. Priya Sharma",
      students: 38,
      maxStudents: 50,
      schedule: "Tue, Thu, Sat - 5:30 PM",
      room: "Room 201",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-11-30"
    }
  ];

  const teachers = [
    { id: 1, name: "Dr. Rajesh Kumar", subjects: ["Physics", "Mathematics"], experience: "15 years", rating: 4.8, students: 45 },
    { id: 2, name: "Dr. Priya Sharma", subjects: ["Biology", "Chemistry"], experience: "12 years", rating: 4.7, students: 38 },
    { id: 3, name: "Prof. Amit Patel", subjects: ["Quantitative Aptitude", "Verbal Ability"], experience: "10 years", rating: 4.6, students: 28 },
    { id: 4, name: "Prof. Neha Singh", subjects: ["Computer Science", "Programming"], experience: "8 years", rating: 4.5, students: 22 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50";
      case "upcoming": return "text-blue-600 bg-blue-50";
      case "completed": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getCapacityPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Course & Batch Management</h1>
                  <p className="text-sm text-gray-600">Manage courses, batches, and teacher assignments</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Courses</span>
                  <span className="font-semibold text-gray-900">{courses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Batches</span>
                  <span className="font-semibold text-green-600">{batches.filter(b => b.status === 'active').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold text-blue-600">{courses.reduce((sum, course) => sum + course.students, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Available Teachers</span>
                  <span className="font-semibold text-purple-600">{teachers.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add New Course</span>
                </button>
                <button 
                  onClick={() => setShowBatchModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Create Batch</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Schedule Classes</span>
                </button>
              </div>
            </div>

            {/* Teacher Availability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Teacher Availability</h3>
              <div className="space-y-3">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{teacher.name}</p>
                      <p className="text-xs text-gray-600">{teacher.subjects.join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">{teacher.students} students</div>
                      <div className="text-xs text-yellow-600">⭐ {teacher.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                {[
                  { id: "catalog", label: "📚 Course Catalog", icon: BookOpen },
                  { id: "batches", label: "👥 Batch Management", icon: Users },
                  { id: "schedule", label: "📅 Class Schedule", icon: Calendar },
                  { id: "capacity", label: "📊 Capacity Planning", icon: BarChart3 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "catalog" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Available Courses</h3>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search courses..."
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courses.map((course) => (
                        <div key={course.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                          <div className="relative">
                            <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
                            <div className="absolute top-3 right-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                                {course.status}
                              </span>
                            </div>
                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium">{course.rating}</span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-gray-900 text-lg">{course.name}</h4>
                              <div className="text-right">
                                <div className="text-lg font-bold text-blue-600">{course.fee}</div>
                                <div className="text-xs text-gray-600">Total Fee</div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{course.students}/{course.maxCapacity} students</span>
                                <span className={`text-xs ${getCapacityColor(getCapacityPercentage(course.students, course.maxCapacity))}`}>
                                  ({getCapacityPercentage(course.students, course.maxCapacity)}% full)
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{course.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{course.teacher}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "batches" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Batch Management</h3>
                      <button
                        onClick={() => setShowBatchModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Create Batch
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {batches.map((batch) => (
                        <div key={batch.id} className="bg-white border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">{batch.name}</h4>
                              <p className="text-sm text-gray-600">{courses.find(c => c.id === batch.courseId)?.name}</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(batch.status)}`}>
                              {batch.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{batch.teacher}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{batch.students}/{batch.maxStudents} students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{batch.room}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{batch.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                View Details
                              </button>
                              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
                      <div className="flex items-center gap-2">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option>This Week</option>
                          <option>Next Week</option>
                          <option>This Month</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="grid grid-cols-7 gap-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <div key={day} className="text-center">
                            <div className="font-semibold text-gray-900 mb-2">{day}</div>
                            <div className="space-y-2">
                              {batches.filter(batch => batch.schedule.includes(day)).map((batch) => (
                                <div key={batch.id} className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="text-xs font-medium text-blue-800">{batch.name}</div>
                                  <div className="text-xs text-blue-600">{batch.room}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "capacity" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Capacity Planning</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courses.map((course) => (
                        <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">{course.name}</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Capacity Utilization</span>
                                <span className={`text-sm font-medium ${getCapacityColor(getCapacityPercentage(course.students, course.maxCapacity))}`}>
                                  {getCapacityPercentage(course.students, course.maxCapacity)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${
                                    getCapacityPercentage(course.students, course.maxCapacity) >= 90 
                                      ? 'bg-red-500' 
                                      : getCapacityPercentage(course.students, course.maxCapacity) >= 75 
                                        ? 'bg-orange-500' 
                                        : 'bg-green-500'
                                  }`}
                                  style={{width: `${getCapacityPercentage(course.students, course.maxCapacity)}%`}}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-lg font-bold text-green-600">{course.students}</div>
                                <div className="text-xs text-green-600">Current</div>
                              </div>
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-lg font-bold text-blue-600">{course.maxCapacity - course.students}</div>
                                <div className="text-xs text-blue-600">Available</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Total Capacity:</span>
                              <span className="font-semibold text-gray-900">{course.maxCapacity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Add New Course</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Course Name" className="w-full p-2 border border-gray-300 rounded-lg" />
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Select Category</option>
                <option>Engineering</option>
                <option>Medical</option>
                <option>Management</option>
              </select>
              <input type="text" placeholder="Duration" className="w-full p-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Fee" className="w-full p-2 border border-gray-300 rounded-lg" />
              <input type="number" placeholder="Max Capacity" className="w-full p-2 border border-gray-300 rounded-lg" />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Batch Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Create New Batch</h3>
              <button onClick={() => setShowBatchModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Batch Name" className="w-full p-2 border border-gray-300 rounded-lg" />
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Select Course</option>
                {courses.map(course => (
                  <option key={course.id}>{course.name}</option>
                ))}
              </select>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id}>{teacher.name}</option>
                ))}
              </select>
              <input type="number" placeholder="Max Students" className="w-full p-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Schedule" className="w-full p-2 border border-gray-300 rounded-lg" />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                Create Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
