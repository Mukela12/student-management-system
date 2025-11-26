import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockLecturerCourses = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures and Algorithms',
    semester: 'Fall 2024',
    enrolled: 45,
    capacity: 50,
    schedule: 'Mon, Wed 10:00-12:00',
    room: 'LAB1, Science Building',
    pendingGrading: 3,
    averageGrade: 75,
    attendance: 92,
  },
  {
    id: '2',
    code: 'CS302',
    name: 'Database Systems',
    semester: 'Fall 2024',
    enrolled: 48,
    capacity: 50,
    schedule: 'Tue, Thu 14:00-16:00',
    room: 'R201, Main Block',
    pendingGrading: 5,
    averageGrade: 78,
    attendance: 88,
  },
  {
    id: '3',
    code: 'CS401',
    name: 'Software Engineering',
    semester: 'Fall 2024',
    enrolled: 35,
    capacity: 40,
    schedule: 'Wed, Fri 08:00-10:00',
    room: 'R305, Main Block',
    pendingGrading: 2,
    averageGrade: 82,
    attendance: 95,
  },
  {
    id: '4',
    code: 'CS101',
    name: 'Introduction to Programming',
    semester: 'Fall 2024',
    enrolled: 28,
    capacity: 30,
    schedule: 'Mon, Thu 14:00-16:00',
    room: 'LAB2, Science Building',
    pendingGrading: 2,
    averageGrade: 71,
    attendance: 85,
  },
];

export default function LecturerMyCourses() {
  const navigate = useNavigate();

  const totalStudents = mockLecturerCourses.reduce((sum, course) => sum + course.enrolled, 0);
  const totalPendingGrading = mockLecturerCourses.reduce((sum, course) => sum + course.pendingGrading, 0);
  const averageAttendance = Math.round(
    mockLecturerCourses.reduce((sum, course) => sum + course.attendance, 0) / mockLecturerCourses.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Fall 2024 • {mockLecturerCourses.length} courses</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{totalStudents}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending Grading</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{totalPendingGrading}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{averageAttendance}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockLecturerCourses.map((course) => (
          <Card key={course.id} variant="default" hover>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="primary">{course.code}</Badge>
                <div className="p-2 bg-primary-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription>{course.semester}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Course Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled}/{course.capacity} students enrolled</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Room:</span> {course.room}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600">Avg Grade</p>
                  <p className="text-lg font-semibold text-gray-900">{course.averageGrade}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Attendance</p>
                  <p className="text-lg font-semibold text-gray-900">{course.attendance}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">To Grade</p>
                  <p className="text-lg font-semibold text-orange-600">{course.pendingGrading}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate(`/lecturer/courses/${course.id}`)}
                >
                  View Course
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => navigate(`/lecturer/grading?course=${course.id}`)}
                >
                  Grade
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button
              variant="outline"
              leftIcon={<FileText className="h-4 w-4" />}
              onClick={() => navigate('/lecturer/grading')}
            >
              View All Grading
            </Button>
            <Button
              variant="outline"
              leftIcon={<Users className="h-4 w-4" />}
              onClick={() => navigate('/lecturer/attendance')}
            >
              Take Attendance
            </Button>
            <Button
              variant="outline"
              leftIcon={<Calendar className="h-4 w-4" />}
              onClick={() => navigate('/lecturer/schedule')}
            >
              View Schedule
            </Button>
            <Button
              variant="outline"
              leftIcon={<BookOpen className="h-4 w-4" />}
              onClick={() => navigate('/lecturer/materials')}
            >
              Upload Materials
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
