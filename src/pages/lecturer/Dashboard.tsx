import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, FileText, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function LecturerDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName}!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your courses and students</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">My Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">4</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">156</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending Grading</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">12</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Classes Today</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">2</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Courses you're teaching this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { code: 'CS301', name: 'Data Structures', students: 45, pending: 3 },
                { code: 'CS302', name: 'Database Systems', students: 48, pending: 5 },
                { code: 'CS401', name: 'Software Engineering', students: 35, pending: 2 },
                { code: 'CS101', name: 'Intro to Programming', students: 28, pending: 2 },
              ].map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{course.code}</Badge>
                        <p className="font-semibold text-gray-900">{course.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{course.students} students</p>
                    </div>
                  </div>
                  {course.pending > 0 && (
                    <Badge variant="warning">{course.pending} to grade</Badge>
                  )}
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
              leftIcon={<FileText className="h-5 w-5" />}
              onClick={() => navigate('/lecturer/grading')}
            >
              Grade Assignments
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Users className="h-5 w-5" />}
              onClick={() => navigate('/lecturer/attendance')}
            >
              Take Attendance
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Calendar className="h-5 w-5" />}
              onClick={() => navigate('/lecturer/courses')}
            >
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
