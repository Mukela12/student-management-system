import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, DollarSign, Calendar, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your studies</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Current GPA</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">3.45</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <GraduationCap className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">6</p>
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
                <p className="text-sm font-medium text-gray-600">Fee Balance</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">ZMW 5K</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Upcoming Classes</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">3</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Announcements */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Stay updated with university news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Bell className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">Announcement Title {i}</h4>
                      <Badge variant="primary" size="sm">New</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Important information about upcoming events and deadlines.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/student/register')}
                className="w-full p-4 bg-primary-50 hover:bg-primary-100 rounded-xl text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Register Courses</p>
                    <p className="text-xs text-gray-600">Add new courses</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/student/grades')}
                className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">View Grades</p>
                    <p className="text-xs text-gray-600">Check your results</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/student/payments')}
                className="w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Pay Fees</p>
                    <p className="text-xs text-gray-600">Mobile money payment</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
