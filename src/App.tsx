import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import { ToastContainer } from './components/ui';

// Auth Pages
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import CourseRegistration from './pages/student/CourseRegistration';
import MyCourses from './pages/student/MyCourses';
import CourseDetail from './pages/student/CourseDetail';
import Schedule from './pages/student/Schedule';
import Grades from './pages/student/Grades';
import Payments from './pages/student/Payments';
import StudentProfile from './pages/student/Profile';

// Lecturer Pages
import LecturerDashboard from './pages/lecturer/Dashboard';
import LecturerMyCourses from './pages/lecturer/MyCourses';
import LecturerCourseDetail from './pages/lecturer/CourseDetail';
import LecturerGrading from './pages/lecturer/Grading';
import LecturerAttendance from './pages/lecturer/Attendance';
import LecturerProfile from './pages/lecturer/Profile';
import LecturerReports from './pages/lecturer/Reports';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminStudentDetail from './pages/admin/StudentDetail';
import AdminCourses from './pages/admin/Courses';
import AdminLecturers from './pages/admin/Lecturers';
import AdminSettings from './pages/admin/Settings';
import AdminReports from './pages/admin/Reports';

// Finance Pages
import FinanceDashboard from './pages/finance/Dashboard';
import FinanceTransactions from './pages/finance/Transactions';
import FinanceReconciliation from './pages/finance/Reconciliation';
import FinanceSettings from './pages/finance/Settings';
import FinanceProfile from './pages/finance/Profile';
import FinanceReports from './pages/finance/Reports';

// Shared Pages
import Notifications from './pages/shared/Notifications';
import SharedSettings from './pages/shared/Settings';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Student */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="register" element={<CourseRegistration />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="grades" element={<Grades />} />
        <Route path="payments" element={<Payments />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Protected Routes - Lecturer */}
      <Route
        path="/lecturer/*"
        element={
          <ProtectedRoute allowedRoles={['lecturer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="courses" element={<LecturerMyCourses />} />
        <Route path="courses/:courseId" element={<LecturerCourseDetail />} />
        <Route path="grading" element={<LecturerGrading />} />
        <Route path="attendance" element={<LecturerAttendance />} />
        <Route path="reports" element={<LecturerReports />} />
        <Route path="profile" element={<LecturerProfile />} />
      </Route>

      {/* Protected Routes - Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="students/:studentId" element={<AdminStudentDetail />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="lecturers" element={<AdminLecturers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Protected Routes - Finance */}
      <Route
        path="/finance/*"
        element={
          <ProtectedRoute allowedRoles={['finance']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<FinanceDashboard />} />
        <Route path="transactions" element={<FinanceTransactions />} />
        <Route path="reconciliation" element={<FinanceReconciliation />} />
        <Route path="reports" element={<FinanceReports />} />
        <Route path="settings" element={<FinanceSettings />} />
        <Route path="profile" element={<FinanceProfile />} />
      </Route>

      {/* Shared Routes */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Notifications />} />
      </Route>

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SharedSettings />} />
      </Route>

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
