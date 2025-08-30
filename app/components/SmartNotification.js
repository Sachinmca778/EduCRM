"use client";
import { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertTriangle, Star, Trophy, Zap, X } from "lucide-react";

export default function SmartNotification() {
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const notificationTypes = [
    {
      type: "achievement",
      icon: <Trophy className="w-5 h-5 text-yellow-600" />,
      title: "🎉 Achievement Unlocked!",
      message: "Perfect Attendance for 30 days!",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      duration: 5000
    },
    {
      type: "improvement",
      icon: <Star className="w-5 h-5 text-blue-600" />,
      title: "📈 Performance Boost!",
      message: "Your Math score improved by 15%!",
      color: "bg-gradient-to-r from-blue-400 to-purple-500",
      duration: 4000
    },
    {
      type: "reminder",
      icon: <Bell className="w-5 h-5 text-green-600" />,
      title: "⏰ Smart Reminder",
      message: "Physics assignment due in 2 hours",
      color: "bg-gradient-to-r from-green-400 to-teal-500",
      duration: 6000
    },
    {
      type: "alert",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      title: "⚠️ Attention Needed",
      message: "Attendance dropped below 90%",
      color: "bg-gradient-to-r from-red-400 to-pink-500",
      duration: 7000
    }
  ];


  //For test purpose nofication (delete after making feature)
  useEffect(() => {
    // Show first notification immediately
    const firstNotification = notificationTypes[0];
    const newNotification = {
      id: Date.now(),
      ...firstNotification
    };
    
    setNotifications([newNotification]);
    setShowNotification(true);
    
    // Auto remove after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, firstNotification.duration);

    // Then show random notifications every 5 seconds
    const interval = setInterval(() => {
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const newNotification = {
        id: Date.now(),
        ...randomNotification
      };
      
      setNotifications(prev => [...prev, newNotification]);
      setShowNotification(true);
      
      // Auto remove after duration
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, randomNotification.duration);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${notification.color} text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in-right max-w-sm`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {notification.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
