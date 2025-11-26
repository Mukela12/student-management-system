import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Calendar, Download, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockEnrolledCourses = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures and Algorithms',
    lecturer: 'Dr. Mwape Banda',
    schedule: 'Mon, Wed 10:00-12:00',
    room: 'LAB1, Science Building',
    enrolled: 45,
    capacity: 50,
    materials: 12,
    assignments: 3,
  },
  {
    id: '2',
    code: 'CS302',
    name: 'Database Systems',
    lecturer: 'Prof. Chanda Phiri',
    schedule: 'Tue, Thu 14:00-16:00',
    room: 'R201, Main Block',
    enrolled: 48,
    capacity: 50,
    materials: 8,
    assignments: 2,
  },
  {
    id: '3',
    code: 'CS303',
    name: 'Web Development',
    lecturer: 'Dr. Mutale Zulu',
    schedule: 'Fri 08:00-12:00',
    room: 'LAB2, Science Building',
    enrolled: 40,
    capacity: 45,
    materials: 15,
    assignments: 4,
  },
];

export default function MyCourses() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Fall 2024 • {mockEnrolledCourses.length} courses enrolled</p>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEnrolledCourses.map((course) => (
          <Card key={course.id} variant="default" hover>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="primary">{course.code}</Badge>
                <div className="p-2 bg-primary-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription>{course.lecturer}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled}/{course.capacity} students</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" size="sm">{course.materials} materials</Badge>
                <Badge variant="outline" size="sm">{course.assignments} assignments</Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  leftIcon={<ExternalLink className="h-4 w-4" />}
                  onClick={() => navigate(`/student/courses/${course.id}`)}
                >
                  View Course
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Materials */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Recent Course Materials</CardTitle>
          <CardDescription>Latest uploads from your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Download className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lecture Notes - Week {i}</p>
                    <p className="text-sm text-gray-600">CS301 • Uploaded 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
