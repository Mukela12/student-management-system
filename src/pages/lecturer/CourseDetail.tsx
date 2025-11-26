import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Calendar, FileText, Upload, Download, UserCheck, ArrowLeft, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockCourseDetails: Record<string, any> = {
  '1': {
    id: '1',
    code: 'CS301',
    name: 'Data Structures and Algorithms',
    semester: 'Fall 2024',
    enrolled: 45,
    capacity: 50,
    schedule: 'Mon, Wed 10:00-12:00',
    room: 'LAB1, Science Building',
    description: 'Advanced study of data structures including trees, graphs, hash tables, and their algorithms. Emphasis on algorithm analysis and complexity theory.',
    students: [
      { id: '1', name: 'Mwape Banda', studentId: 'ST001', attendance: 95, currentGrade: 85, status: 'active' },
      { id: '2', name: 'Chanda Phiri', studentId: 'ST002', attendance: 88, currentGrade: 78, status: 'active' },
      { id: '3', name: 'Mutale Zulu', studentId: 'ST003', attendance: 92, currentGrade: 82, status: 'active' },
      { id: '4', name: 'Chilufya Mwale', studentId: 'ST004', attendance: 85, currentGrade: 75, status: 'active' },
      { id: '5', name: 'Bwalya Tembo', studentId: 'ST005', attendance: 90, currentGrade: 88, status: 'active' },
    ],
    materials: [
      { id: '1', title: 'Lecture Notes - Trees & Graphs', uploadDate: '2024-09-15', type: 'PDF', size: '2.4 MB' },
      { id: '2', title: 'Lab Assignment 3 - Hash Tables', uploadDate: '2024-09-10', type: 'PDF', size: '1.1 MB' },
      { id: '3', title: 'Sample Code - Binary Search Trees', uploadDate: '2024-09-08', type: 'ZIP', size: '450 KB' },
    ],
    assignments: [
      { id: '1', title: 'Assignment 3 - Graph Algorithms', dueDate: '2024-09-25', submitted: 42, total: 45, graded: 39 },
      { id: '2', title: 'Assignment 4 - Dynamic Programming', dueDate: '2024-10-02', submitted: 38, total: 45, graded: 33 },
      { id: '3', title: 'Midterm Project - Data Structure Implementation', dueDate: '2024-10-15', submitted: 28, total: 45, graded: 0 },
    ],
    announcements: [
      { id: '1', title: 'Midterm Exam Schedule', content: 'The midterm exam will be held on October 20th at 10:00 AM in LAB1.', date: '2024-09-18' },
      { id: '2', title: 'Office Hours Update', content: 'Office hours moved to Thursdays 2-4 PM this week.', date: '2024-09-16' },
    ],
  },
  '2': {
    id: '2',
    code: 'CS302',
    name: 'Database Systems',
    semester: 'Fall 2024',
    enrolled: 48,
    capacity: 50,
    schedule: 'Tue, Thu 14:00-16:00',
    room: 'R201, Main Block',
    description: 'Introduction to database management systems, SQL, normalization, transaction processing, and database design principles.',
    students: [
      { id: '6', name: 'Kabwe Ng\'ombe', studentId: 'ST006', attendance: 92, currentGrade: 80, status: 'active' },
      { id: '7', name: 'Musonda Kapila', studentId: 'ST007', attendance: 85, currentGrade: 76, status: 'active' },
      { id: '8', name: 'Nsama Lungu', studentId: 'ST008', attendance: 88, currentGrade: 82, status: 'active' },
    ],
    materials: [
      { id: '4', title: 'SQL Basics Tutorial', uploadDate: '2024-09-12', type: 'PDF', size: '1.8 MB' },
      { id: '5', title: 'Database Design Examples', uploadDate: '2024-09-05', type: 'PDF', size: '3.2 MB' },
    ],
    assignments: [
      { id: '4', title: 'SQL Queries Lab', dueDate: '2024-09-28', submitted: 45, total: 48, graded: 40 },
      { id: '5', title: 'Database Design Project', dueDate: '2024-10-05', submitted: 40, total: 48, graded: 35 },
    ],
    announcements: [
      { id: '3', title: 'Guest Lecture Next Week', content: 'Industry expert will present on NoSQL databases next Thursday.', date: '2024-09-17' },
    ],
  },
};

export default function LecturerCourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = courseId ? mockCourseDetails[courseId] : null;

  if (!course) {
    return (
      <div className="p-6">
        <Card variant="default">
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">Course not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/lecturer/courses')}>
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/lecturer/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <Badge variant="primary">{course.code}</Badge>
          </div>
          <p className="text-gray-600">{course.semester} • {course.schedule} • {course.room}</p>
        </div>
      </div>

      {/* Course Info & Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{course.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Enrolled Students</p>
                <p className="text-2xl font-bold text-gray-900">{course.enrolled}/{course.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Schedule</p>
                <p className="text-lg font-semibold text-gray-900">{course.schedule}</p>
              </div>
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
              onClick={() => navigate(`/lecturer/grading?course=${course.id}`)}
            >
              Grade Assignments
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<UserCheck className="h-5 w-5" />}
              onClick={() => navigate(`/lecturer/attendance?course=${course.id}`)}
            >
              Take Attendance
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Upload className="h-5 w-5" />}
              onClick={() => navigate(`/lecturer/materials?course=${course.id}`)}
            >
              Upload Materials
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Bell className="h-5 w-5" />}
              onClick={() => navigate(`/lecturer/announcements?course=${course.id}`)}
            >
              Post Announcement
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>{course.students.length} students</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(`/lecturer/students?course=${course.id}`)}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Current Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((student: any) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{student.studentId}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.attendance}%</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{student.currentGrade}%</td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">{student.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assignments & Materials */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Assignments */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Track submission and grading progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {course.assignments.map((assignment: any) => (
                <div key={assignment.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                    </div>
                    <Badge variant={assignment.submitted === assignment.total ? 'success' : 'warning'} size="sm">
                      {assignment.submitted}/{assignment.total}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                    <span>Graded: {assignment.graded}/{assignment.submitted}</span>
                    {assignment.graded < assignment.submitted && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/lecturer/grading?assignment=${assignment.id}`)}
                      >
                        Grade Pending
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Materials */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Course Materials</CardTitle>
            <CardDescription>Resources uploaded for students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {course.materials.map((material: any) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Download className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{material.title}</p>
                      <p className="text-sm text-gray-600">{material.type} • {material.size}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{material.uploadDate}</p>
                </div>
              ))}
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Upload className="h-4 w-4" />}
                onClick={() => navigate(`/lecturer/materials?course=${course.id}`)}
              >
                Upload New Material
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Messages posted to students</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/lecturer/announcements?course=${course.id}`)}
            >
              New Announcement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {course.announcements.map((announcement: any) => (
              <div key={announcement.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Bell className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
