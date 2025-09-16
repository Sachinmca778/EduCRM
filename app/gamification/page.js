"use client";
import { useState, useEffect } from "react";
import { 
  Trophy, Medal, Star, Target, TrendingUp, Award, 
  Crown, Zap, Fire, Heart, Brain, BookOpen,
  ArrowLeft, Filter, Search, Calendar, BarChart3,
  Users, Target as TargetIcon, Clock, CheckCircle,
  Plus, Gift, Sparkles, Rocket, Diamond, Gem
} from "lucide-react";
import Link from "next/link";

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showAchievement, setShowAchievement] = useState(false);

  // Sample data
  const leaderboardData = [
    {
      id: 1,
      name: "Rahul Kumar",
      avatar: "https://i.pravatar.cc/40?img=1",
      points: 2847,
      level: 15,
      rank: 1,
      badge: "🏆",
      streak: 12,
      achievements: 8,
      subjects: ["Math", "Physics", "Chemistry"],
      recentActivity: "Completed Advanced Math Test"
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/40?img=2",
      points: 2654,
      level: 14,
      rank: 2,
      badge: "🥈",
      streak: 8,
      achievements: 7,
      subjects: ["Biology", "Chemistry"],
      recentActivity: "Earned Perfect Attendance Badge"
    },
    {
      id: 3,
      name: "Amit Patel",
      avatar: "https://i.pravatar.cc/40?img=3",
      points: 2432,
      level: 13,
      rank: 3,
      badge: "🥉",
      streak: 15,
      achievements: 6,
      subjects: ["Physics", "Math"],
      recentActivity: "Solved 50 Physics Problems"
    },
    {
      id: 4,
      name: "Neha Singh",
      avatar: "https://i.pravatar.cc/40?img=4",
      points: 2218,
      level: 12,
      rank: 4,
      badge: "💎",
      streak: 6,
      achievements: 5,
      subjects: ["English", "History"],
      recentActivity: "Won Essay Competition"
    },
    {
      id: 5,
      name: "Karan Malhotra",
      avatar: "https://i.pravatar.cc/40?img=5",
      points: 1987,
      level: 11,
      rank: 5,
      badge: "⭐",
      streak: 9,
      achievements: 4,
      subjects: ["Computer Science", "Math"],
      recentActivity: "Completed Coding Challenge"
    }
  ];

  const badges = [
    { id: 1, name: "Perfect Week", icon: "🌟", description: "7 days perfect attendance", earned: true, rarity: "common" },
    { id: 2, name: "Math Master", icon: "🧮", description: "Score 95%+ in 10 math tests", earned: true, rarity: "rare" },
    { id: 3, name: "Streak Champion", icon: "🔥", description: "15 days continuous study", earned: true, rarity: "epic" },
    { id: 4, name: "Problem Solver", icon: "💡", description: "Solve 100 problems", earned: false, rarity: "rare" },
    { id: 5, name: "Team Player", icon: "🤝", description: "Help 10 classmates", earned: false, rarity: "common" },
    { id: 6, name: "Speed Demon", icon: "⚡", description: "Complete test in half time", earned: true, rarity: "epic" },
    { id: 7, name: "Knowledge Seeker", icon: "📚", description: "Read 50 study materials", earned: false, rarity: "rare" },
    { id: 8, name: "Perfect Score", icon: "🎯", description: "Get 100% in any test", earned: true, rarity: "legendary" }
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", points: 50, earned: true },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons in a day", points: 100, earned: true },
    { id: 3, name: "Consistent", description: "Study for 7 days straight", points: 200, earned: true },
    { id: 4, name: "Subject Master", description: "Master any subject", points: 500, earned: false },
    { id: 5, name: "Perfect Score", description: "Get 100% in any test", points: 300, earned: true },
    { id: 6, name: "Helpful Friend", description: "Help 5 classmates", points: 150, earned: false }
  ];

  const challenges = [
    { id: 1, name: "Math Marathon", description: "Solve 50 math problems", progress: 35, total: 50, reward: 200, deadline: "3 days" },
    { id: 2, name: "Study Streak", description: "Study for 10 days", progress: 7, total: 10, reward: 150, deadline: "3 days" },
    { id: 3, name: "Perfect Week", description: "100% attendance this week", progress: 4, total: 5, reward: 100, deadline: "2 days" },
    { id: 4, name: "Knowledge Quest", description: "Read 20 study materials", progress: 12, total: 20, reward: 250, deadline: "5 days" }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level) => {
    if (level >= 15) return "text-yellow-600";
    if (level >= 10) return "text-purple-600";
    if (level >= 5) return "text-blue-600";
    return "text-green-600";
  };

  useEffect(() => {
    // Simulate achievement unlock
    const timer = setTimeout(() => {
      setShowAchievement(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Gamification Center</h1>
                  <p className="text-sm text-gray-600">Level up your learning journey!</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white">
                <Star className="w-4 h-4" />
                <span className="font-semibold">2,847</span>
                <span className="text-sm">points</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Level 15</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Stats & Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <img 
                  src="https://i.pravatar.cc/80?img=1" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-yellow-400"
                />
                <h3 className="font-bold text-gray-900">Rahul Kumar</h3>
                <p className="text-sm text-gray-600">Rank #1 • Level 15</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Points</span>
                  <span className="font-semibold text-gray-900">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Study Streak</span>
                  <span className="font-semibold text-orange-600">12 days 🔥</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Achievements</span>
                  <span className="font-semibold text-purple-600">8/12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Badges Earned</span>
                  <span className="font-semibold text-blue-600">6/15</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Next Level</span>
                  <span className="text-sm font-semibold text-gray-900">847/1000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: '84.7%'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">Start Learning</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Take Challenge</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">View Friends</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                {[
                  { id: "leaderboard", label: "🏆 Leaderboard", icon: Trophy },
                  { id: "badges", label: "🎖️ Badges", icon: Medal },
                  { id: "achievements", label: "⭐ Achievements", icon: Star },
                  { id: "challenges", label: "🎯 Challenges", icon: Target }
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
                {activeTab === "leaderboard" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
                      <select 
                        value={selectedPeriod} 
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="semester">This Semester</option>
                      </select>
                    </div>
                    
                    {leaderboardData.map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {student.rank}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{student.name}</h4>
                            <span className="text-2xl">{student.badge}</span>
                            <span className={`text-sm font-medium ${getLevelColor(student.level)}`}>
                              Level {student.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{student.recentActivity}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">🔥 {student.streak} day streak</span>
                            <span className="text-xs text-gray-500">⭐ {student.achievements} achievements</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{student.points.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "badges" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge) => (
                      <div key={badge.id} className={`p-4 rounded-lg border transition-all ${
                        badge.earned 
                          ? 'bg-white border-gray-200 hover:shadow-md' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}>
                        <div className="text-center">
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </span>
                          {badge.earned && (
                            <div className="mt-2 text-green-600 text-sm font-medium">✓ Earned</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "achievements" && (
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                        achievement.earned ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-300'
                        }`}>
                          {achievement.earned ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Target className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">+{achievement.points}</div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "challenges" && (
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{challenge.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Reward:</span>
                            <span className="font-semibold text-yellow-600">+{challenge.reward} points</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {challenge.progress}/{challenge.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all" 
                            style={{width: `${(challenge.progress/challenge.total)*100}%`}}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Deadline: {challenge.deadline}</span>
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                            Continue
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Unlock Modal */}
      {showAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Achievement Unlocked!</h3>
            <p className="text-gray-600 mb-4">You've earned the "Perfect Week" badge!</p>
            <button 
              onClick={() => setShowAchievement(false)}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
