import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, DollarSign, TrendingUp, UserPlus, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user?.firstName} • Institutional Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">500</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% from last year</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">50</p>
                <p className="text-xs text-gray-500 mt-1">Fall 2024 semester</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Revenue (YTD)</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">K8.5M</p>
                <p className="text-xs text-green-600 mt-1">↗ +8% vs target</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Avg GPA</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">3.25</p>
                <p className="text-xs text-green-600 mt-1">↗ +0.15 improvement</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <UserPlus className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Student Name {i}</p>
                      <p className="text-sm text-gray-600">Computer Science • Year 2</p>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              leftIcon={<UserPlus className="h-5 w-5" />}
              onClick={() => navigate('/admin/students')}
            >
              Add Student
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<BookOpen className="h-5 w-5" />}
              onClick={() => navigate('/admin/courses')}
            >
              Manage Courses
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<FileText className="h-5 w-5" />}
              onClick={() => navigate('/admin/reports')}
            >
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Stats */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Enrollment by Department</CardTitle>
          <CardDescription>Student distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Computer Science', count: 145, percentage: 29 },
              { name: 'Business Administration', count: 120, percentage: 24 },
              { name: 'Engineering', count: 95, percentage: 19 },
              { name: 'Medicine', count: 75, percentage: 15 },
              { name: 'Other Departments', count: 65, percentage: 13 },
            ].map((dept) => (
              <div key={dept.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  <span className="text-sm text-gray-600">{dept.count} students ({dept.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
