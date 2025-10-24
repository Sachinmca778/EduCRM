'use client';
import Link from 'next/link';
import { usePathname } from "next/navigation";
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

  const pathname = usePathname();

  if (pathname === "/gym-crm/signup/" || pathname === "/gym-crm/login/") {
    return (
      <div className="min-h-screen bg-background">
      {/* Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Gym CRM</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">A</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Gym CRM</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-foreground">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
