import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { Avatar, Badge } from '../ui';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navigationByRole: Record<UserRole, NavItem[]> = {
  student: [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/student/courses', icon: BookOpen },
    { name: 'Register Courses', href: '/student/register', icon: GraduationCap },
    { name: 'Grades', href: '/student/grades', icon: FileText },
    { name: 'Payments', href: '/student/payments', icon: DollarSign },
    { name: 'Schedule', href: '/student/schedule', icon: Calendar },
  ],
  lecturer: [
    { name: 'Dashboard', href: '/lecturer/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/lecturer/courses', icon: BookOpen },
    { name: 'Grading', href: '/lecturer/grading', icon: FileText },
    { name: 'Attendance', href: '/lecturer/attendance', icon: Calendar },
    { name: 'Reports', href: '/lecturer/reports', icon: FileText },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: User },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Lecturers', href: '/admin/lecturers', icon: GraduationCap },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
  finance: [
    { name: 'Dashboard', href: '/finance/dashboard', icon: LayoutDashboard },
    { name: 'Payments', href: '/finance/payments', icon: DollarSign },
    { name: 'Reconciliation', href: '/finance/reconciliation', icon: FileText },
    { name: 'Reports', href: '/finance/reports', icon: FileText },
    { name: 'Settings', href: '/finance/settings', icon: Settings },
  ],
};

export default function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, notifications } = useUIStore();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const navigation = user ? navigationByRole[user.role] : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 transition-all duration-300 ${
          sidebarOpen ? 'lg:w-64' : 'lg:w-20'
        }`}
      >
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-lg overflow-y-auto custom-scrollbar">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {sidebarOpen ? (
              <Link to="/" className="flex items-center gap-2">
                <div className="p-2 bg-primary-600 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">DegreeDesk</span>
              </Link>
            ) : (
              <div className="p-2 bg-primary-600 rounded-lg mx-auto">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Avatar
                  name={`${user.firstName} ${user.lastName}`}
                  size={sidebarOpen ? 'lg' : 'md'}
                  src={user.avatar}
                />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    <Badge variant="primary" size="sm" className="mt-1">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 font-medium">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge variant="danger" size="sm">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-200 space-y-1">
            <button
              onClick={() => navigate('/notifications')}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-semibold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              {sidebarOpen && <span className="flex-1 font-medium text-left">Notifications</span>}
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              {sidebarOpen && <span className="flex-1 font-medium text-left">Settings</span>}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span className="flex-1 font-medium text-left">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
