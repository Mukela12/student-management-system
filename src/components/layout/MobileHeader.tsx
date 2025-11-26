import { GraduationCap, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { Badge } from '../ui';

export default function MobileHeader() {
  const { notifications } = useUIStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm safe-area-top">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 bg-primary-600 rounded-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">DegreeDesk</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-semibold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
