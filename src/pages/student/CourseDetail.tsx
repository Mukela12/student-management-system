import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  User,
  Calendar,
  MapPin,
  Download,
  FileText,
  ArrowLeft,
  Users,
  Clock,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '../../components/ui';

// Mock data - in real app this would come from API
const mockCourseDetails: Record<string, any> = {
  '1': {
    id: '1',
    code: 'CS301',
    name: 'Data Structures and Algorithms',
    lecturer: 'Dr. Mwape Banda',
    lecturerEmail: 'mwape.banda@unza.zm',
    description:
      'This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs. Students will learn to analyze algorithm complexity and implement efficient solutions to common programming problems.',
    credits: 4,
    schedule: [
      { day: 'Monday', time: '10:00-12:00', room: 'LAB1', building: 'Science Building', type: 'Lecture' },
      { day: 'Wednesday', time: '10:00-12:00', room: 'LAB1', building: 'Science Building', type: 'Lab' },
    ],
    enrolled: 45,
    capacity: 50,
    materials: [
      {
        id: 1,
        title: 'Lecture Notes - Week 1: Introduction',
        type: 'PDF',
        size: '2.3 MB',
        uploadedAt: '2024-11-20',
      },
      {
        id: 2,
        title: 'Lecture Notes - Week 2: Arrays and Lists',
        type: 'PDF',
        size: '3.1 MB',
        uploadedAt: '2024-11-18',
      },
      {
        id: 3,
        title: 'Lab Assignment 1: Linked Lists',
        type: 'PDF',
        size: '1.5 MB',
        uploadedAt: '2024-11-15',
      },
      {
        id: 4,
        title: 'Reference: Introduction to Algorithms',
        type: 'PDF',
        size: '15.2 MB',
        uploadedAt: '2024-11-10',
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Assignment 1: Array Operations',
        dueDate: '2024-11-30',
        status: 'submitted',
        grade: 'A',
      },
      {
        id: 2,
        title: 'Assignment 2: Linked List Implementation',
        dueDate: '2024-12-15',
        status: 'pending',
        grade: null,
      },
      {
        id: 3,
        title: 'Assignment 3: Binary Trees',
        dueDate: '2025-01-10',
        status: 'not_started',
        grade: null,
      },
    ],
    announcements: [
      {
        id: 1,
        title: 'Quiz Next Week',
        message: 'There will be a quiz on Arrays and Linked Lists next Monday.',
        date: '2024-11-22',
      },
      {
        id: 2,
        title: 'Office Hours Changed',
        message: 'Office hours moved to Thursdays 2-4 PM.',
        date: '2024-11-20',
      },
    ],
  },
  '2': {
    id: '2',
    code: 'CS302',
    name: 'Database Systems',
    lecturer: 'Prof. Chanda Phiri',
    lecturerEmail: 'chanda.phiri@unza.zm',
    description:
      'Introduction to database design, SQL, normalization, and database management systems. Covers relational databases, transactions, and basic database administration.',
    credits: 3,
    schedule: [
      { day: 'Tuesday', time: '14:00-16:00', room: 'R201', building: 'Main Block', type: 'Lecture' },
      { day: 'Thursday', time: '14:00-16:00', room: 'R201', building: 'Main Block', type: 'Tutorial' },
    ],
    enrolled: 48,
    capacity: 50,
    materials: [],
    assignments: [],
    announcements: [],
  },
  '3': {
    id: '3',
    code: 'CS303',
    name: 'Web Development',
    lecturer: 'Dr. Mutale Zulu',
    lecturerEmail: 'mutale.zulu@unza.zm',
    description:
      'Modern web development using HTML5, CSS3, JavaScript, and popular frameworks. Students will build responsive web applications and learn about web standards and best practices.',
    credits: 4,
    schedule: [
      { day: 'Friday', time: '08:00-12:00', room: 'LAB2', building: 'Science Building', type: 'Lab' },
    ],
    enrolled: 40,
    capacity: 45,
    materials: [],
    assignments: [],
    announcements: [],
  },
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courseId ? mockCourseDetails[courseId] : null;

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
          <p className="text-gray-600 mt-2">The course you're looking for doesn't exist.</p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/student/courses')}>
            Back to My Courses
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'not_started':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'pending':
        return 'In Progress';
      case 'not_started':
        return 'Not Started';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        onClick={() => navigate('/student/courses')}
      >
        Back to My Courses
      </Button>

      {/* Course Header */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="primary" className="text-base px-3 py-1">
                  {course.code}
                </Badge>
                <Badge variant="outline">{course.credits} Credits</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{course.lecturer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {course.enrolled}/{course.capacity} students
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-primary-100 rounded-xl">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </CardContent>
          </Card>

          {/* Course Materials */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
              <CardDescription>{course.materials.length} files available</CardDescription>
            </CardHeader>
            <CardContent>
              {course.materials.length > 0 ? (
                <div className="space-y-3">
                  {course.materials.map((material: any) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                          <FileText className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{material.title}</p>
                          <p className="text-sm text-gray-600">
                            {material.type} • {material.size} • {material.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Download className="h-4 w-4" />}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No materials uploaded yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>{course.assignments.length} assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {course.assignments.length > 0 ? (
                <div className="space-y-3">
                  {course.assignments.map((assignment: any) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{assignment.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>Due: {assignment.dueDate}</span>
                          {assignment.grade && <span>Grade: {assignment.grade}</span>}
                        </div>
                      </div>
                      <Badge variant={getStatusColor(assignment.status) as any}>
                        {getStatusText(assignment.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No assignments yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Announcements */}
          {course.announcements.length > 0 && (
            <Card variant="default">
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.announcements.map((announcement: any) => (
                    <div key={announcement.id} className="border-l-4 border-primary-500 pl-4 py-2">
                      <p className="font-semibold text-gray-900">{announcement.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lecturer Info */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Lecturer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-full">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{course.lecturer}</p>
                  <p className="text-sm text-gray-600">{course.lecturerEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.schedule.map((item: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{item.day}</span>
                    <Badge variant="outline" size="sm">
                      {item.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {item.room}, {item.building}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="primary" fullWidth leftIcon={<Calendar className="h-4 w-4" />}>
                View Full Schedule
              </Button>
              <Button variant="outline" fullWidth leftIcon={<FileText className="h-4 w-4" />}>
                View Grades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
