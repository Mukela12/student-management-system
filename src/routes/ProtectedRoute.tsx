import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (!isAuthenticated) {
    // Redirect to login, save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const dashboardPath = getRoleBasedDashboard(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}

// Helper function to get dashboard path based on role
export function getRoleBasedDashboard(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/student/dashboard';
    case 'lecturer':
      return '/lecturer/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'finance':
      return '/finance/dashboard';
    default:
      return '/';
  }
}
