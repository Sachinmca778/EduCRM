"use client";
import { useState, useEffect } from "react";
import { 
  Activity, User, BookOpen, Trophy, DollarSign, 
  TrendingUp, Clock, Star, Award, GraduationCap,
  Eye, MessageSquare, Heart
} from "lucide-react";

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [isLive, setIsLive] = useState(true);

  const activityTypes = [
    {
      type: "test_completed",
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800"
    },
    {
      type: "achievement",
      icon: <Trophy className="w-4 h-4 text-yellow-600" />,
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-800"
    },
    {
      type: "payment",
      icon: <DollarSign className="w-4 h-4 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-800"
    },
    {
      type: "enrollment",
      icon: <GraduationCap className="w-4 h-4 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-800"
    },
    {
      type: "improvement",
      icon: <TrendingUp className="w-4 h-4 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-800"
    }
  ];

  const sampleActivities = [
    { id: 1, student: "Rahul Kumar", action: "scored 95% in Mathematics test", type: "test_completed", time: "2 min ago" },
    { id: 2, student: "Priya Sharma", action: "achieved 'Perfect Week' badge", type: "achievement", time: "5 min ago" },
    { id: 3, student: "Amit Patel", action: "paid ₹25,000 for JEE course", type: "payment", time: "8 min ago" },
    { id: 4, student: "Neha Singh", action: "enrolled in NEET preparation", type: "enrollment", time: "12 min ago" },
    { id: 5, student: "Karan Malhotra", action: "improved Physics score by 15%", type: "improvement", time: "15 min ago" },
    { id: 6, student: "Zara Khan", action: "submitted Chemistry assignment", type: "test_completed", time: "18 min ago" },
    { id: 7, student: "Riya Verma", action: "earned 'Top Performer' award", type: "achievement", time: "22 min ago" },
    { id: 8, student: "Vikram Singh", action: "completed 30-day attendance streak", type: "achievement", time: "25 min ago" }
  ];

  useEffect(() => {
    // Initialize with sample activities
    setActivities(sampleActivities.slice(0, 5));

    // Add new activities every 8-15 seconds
    const interval = setInterval(() => {
      if (isLive) {
        const randomActivity = sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
        const newActivity = {
          ...randomActivity,
          id: Date.now(),
          time: "Just now"
        };

        setActivities(prev => {
          const updated = [newActivity, ...prev.slice(0, 4)];
          return updated;
        });
      }
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getActivityConfig = (type) => {
    return activityTypes.find(config => config.type === type) || activityTypes[0];
  };

  const handleActivityClick = (activity) => {
    // Simulate interaction
    console.log("Activity clicked:", activity);
    // You can add modal or navigation here
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Live Activity Feed</h3>
              <p className="text-sm text-muted-foreground">Real-time student activities</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs text-muted-foreground">{isLive ? 'LIVE' : 'OFFLINE'}</span>
            <button
              onClick={() => setIsLive(!isLive)}
              className="text-xs text-primary hover:underline"
            >
              {isLive ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            return (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${config.color} ${index === 0 ? 'animate-pulse-slow' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${config.textColor}`}>
                      <span className="font-semibold">{activity.student}</span> {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {index === 0 && (
                        <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-white/20 rounded transition-colors">
                      <Eye className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-white/20 rounded transition-colors">
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{activities.length} recent activities</span>
            <button className="text-primary hover:underline">View all</button>
          </div>
        </div>
      </div>
    </div>
  );
}
