import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  DollarSign,
  User,
  FileText,
  GraduationCap,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mobile navigation - max 5 items following PWA best practices
const mobileNavigationByRole: Record<UserRole, NavItem[]> = {
  student: [
    { name: 'Home', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/student/courses', icon: BookOpen },
    { name: 'Register', href: '/student/register', icon: GraduationCap },
    { name: 'Payments', href: '/student/payments', icon: DollarSign },
    { name: 'Profile', href: '/student/profile', icon: User },
  ],
  lecturer: [
    { name: 'Home', href: '/lecturer/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/lecturer/courses', icon: BookOpen },
    { name: 'Grading', href: '/lecturer/grading', icon: FileText },
    { name: 'Reports', href: '/lecturer/reports', icon: FileText },
    { name: 'Profile', href: '/lecturer/profile', icon: User },
  ],
  admin: [
    { name: 'Home', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: User },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
  finance: [
    { name: 'Home', href: '/finance/dashboard', icon: LayoutDashboard },
    { name: 'Payments', href: '/finance/payments', icon: DollarSign },
    { name: 'Reports', href: '/finance/reports', icon: FileText },
    { name: 'Settings', href: '/finance/settings', icon: Settings },
    { name: 'Profile', href: '/finance/profile', icon: User },
  ],
};

export default function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navigation = user ? mobileNavigationByRole[user.role] : [];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg safe-area-bottom">
      <nav className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px] touch-manipulation ${
                isActive
                  ? 'bg-gradient-to-b from-primary-50 to-primary-100 text-primary-700'
                  : 'text-gray-600'
              }`}
              style={{ minHeight: '48px' }} // Touch target size
            >
              <item.icon
                className={`h-6 w-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-primary-700' : 'text-gray-600'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
