import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  CreditCard, 
  UserCheck, 
  Settings,
  Dumbbell,
  TrendingUp,
  Receipt,
  Bell
} from 'lucide-react';

export default function GymCRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    { name: 'Dashboard', href: '/gym-crm', icon: BarChart3 },
    { name: 'Members', href: '/gym-crm/members', icon: Users },
    { name: 'Memberships', href: '/gym-crm/memberships', icon: Calendar },
    { name: 'Attendance', href: '/gym-crm/attendance', icon: UserCheck },
    { name: 'Progress Tracking', href: '/gym-crm/progress', icon: TrendingUp },
    { name: 'Trainers', href: '/gym-crm/trainers', icon: Dumbbell },
    { name: 'Staff', href: '/gym-crm/staff', icon: Users },
    { name: 'Payments', href: '/gym-crm/payments', icon: CreditCard },
    { name: 'Reports', href: '/gym-crm/reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🏋️ Gym CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
