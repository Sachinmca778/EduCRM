'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleLogout = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      await fetch(`${API_BASE_URL}/gym/auth/logout?token=` + token, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      setRole(null);
      router.push('/gym-crm/login');
    }
  };


  const navigation = [
    { name: 'Dashboard', href: '/gym-crm', icon: BarChart3 , roles: ['ADMIN', 'MANAGER', 'RECEPTIONIST'] },
    { name: 'Members', href: '/gym-crm/members', icon: Users , roles: ['ADMIN', 'MANAGER', 'RECEPTIONIST'] },
    { name: 'Memberships', href: '/gym-crm/memberships', icon: Calendar , roles: ['ADMIN', 'MANAGER'] },
    { name: 'Attendance', href: '/gym-crm/attendance', icon: UserCheck , roles: ['ADMIN','MEMBER'] },
    { name: 'Progress Tracking', href: '/gym-crm/progress', icon: TrendingUp , roles: ['ADMIN', 'MANAGER'] },
    { name: 'Trainers', href: '/gym-crm/trainers', icon: Dumbbell , roles: ['ADMIN', 'MANAGER'] },
    { name: 'Staff', href: '/gym-crm/staff', icon: Users , roles: ['ADMIN', 'MANAGER'] },
    { name: 'Payments', href: '/gym-crm/payments', icon: CreditCard , roles: ['ADMIN', 'MANAGER'] },
    { name: 'Reports', href: '/gym-crm/reports', icon: BarChart3 , roles: ['ADMIN', 'MANAGER'] },
  ];


  if (pathname === "/gym-crm/signup/" || pathname === "/gym-crm/login/") {
    return (
      <div className="min-h-screen bg-background">
      {/* Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Gym CRM</span>
            </div>

            <div className="flex space-x-3">
              <Link href="/gym-crm/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link
                href="/gym-crm/signup"
                className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition"
              >
                Sign Up
              </Link>
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
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Gym CRM</span>
          </div>

          <div className="flex items-center space-x-4">
            {role ? (
              <>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">{role?.[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{role}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm font-medium bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link href="/gym-crm/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Login
                </Link>
                <Link
                  href="/gym-crm/signup"
                  className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-1">
              {navigation
                .filter((item) => item.roles.includes(role || '')) 
                .map((item) => {
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
