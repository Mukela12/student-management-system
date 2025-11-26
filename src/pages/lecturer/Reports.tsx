import { useState } from 'react';
import {
  BookOpen,
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

export default function LecturerReports() {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('fall-2024');

  // Mock lecturer analytics data
  const overviewMetrics = {
    totalStudents: { current: 156, previous: 142, change: 9.9 },
    averageGPA: { current: 3.28, previous: 3.15, change: 4.1 },
    passRate: { current: 87.8, previous: 84.2, change: 4.3 },
    attendanceRate: { current: 92.5, previous: 89.3, change: 3.6 },
  };

  const coursePerformance = [
    {
      code: 'CS301',
      name: 'Data Structures & Algorithms',
      students: 45,
      avgGPA: 3.42,
      passRate: 91.1,
      attendance: 94.2,
      assignmentsCompleted: 88.9,
      gradeDistribution: { A: 12, B: 18, C: 10, D: 3, F: 2 }
    },
    {
      code: 'CS401',
      name: 'Advanced Database Systems',
      students: 38,
      avgGPA: 3.15,
      passRate: 84.2,
      attendance: 91.3,
      assignmentsCompleted: 82.4,
      gradeDistribution: { A: 8, B: 14, C: 10, D: 4, F: 2 }
    },
    {
      code: 'CS201',
      name: 'Object-Oriented Programming',
      students: 52,
      avgGPA: 3.38,
      passRate: 90.4,
      attendance: 93.8,
      assignmentsCompleted: 91.3,
      gradeDistribution: { A: 15, B: 22, C: 11, D: 3, F: 1 }
    },
    {
      code: 'CS101',
      name: 'Introduction to Programming',
      students: 21,
      avgGPA: 2.95,
      passRate: 81.0,
      attendance: 88.1,
      assignmentsCompleted: 76.2,
      gradeDistribution: { A: 4, B: 8, C: 5, D: 3, F: 1 }
    },
  ];

  const studentProgress = [
    {
      category: 'Excellent (GPA >= 3.5)',
      count: 42,
      percentage: 26.9,
      trend: 'up' as const,
      avgAttendance: 96.5
    },
    {
      category: 'Good (GPA 3.0-3.49)',
      count: 68,
      percentage: 43.6,
      trend: 'up' as const,
      avgAttendance: 93.2
    },
    {
      category: 'Satisfactory (GPA 2.5-2.99)',
      count: 28,
      percentage: 17.9,
      trend: 'stable' as const,
      avgAttendance: 89.7
    },
    {
      category: 'At Risk (GPA < 2.5)',
      count: 18,
      percentage: 11.5,
      trend: 'down' as const,
      avgAttendance: 78.4
    },
  ];

  const assignmentAnalytics = [
    {
      assignment: 'Midterm Project',
      course: 'CS301',
      dueDate: '2024-10-15',
      submitted: 42,
      total: 45,
      avgScore: 82.5,
      onTime: 38,
      late: 4,
      missing: 3
    },
    {
      assignment: 'Database Design Assignment',
      course: 'CS401',
      dueDate: '2024-10-20',
      submitted: 35,
      total: 38,
      avgScore: 76.8,
      onTime: 30,
      late: 5,
      missing: 3
    },
    {
      assignment: 'OOP Lab Exercise 5',
      course: 'CS201',
      dueDate: '2024-10-18',
      submitted: 49,
      total: 52,
      avgScore: 88.2,
      onTime: 45,
      late: 4,
      missing: 3
    },
    {
      assignment: 'Programming Fundamentals Quiz',
      course: 'CS101',
      dueDate: '2024-10-22',
      submitted: 18,
      total: 21,
      avgScore: 71.5,
      onTime: 16,
      late: 2,
      missing: 3
    },
  ];

  const attendanceTrends = [
    { week: 'Week 1', attendance: 95.2, avgScore: 0 },
    { week: 'Week 2', attendance: 94.8, avgScore: 0 },
    { week: 'Week 3', attendance: 93.5, avgScore: 0 },
    { week: 'Week 4', attendance: 92.1, avgScore: 78.5 },
    { week: 'Week 5', attendance: 91.8, avgScore: 82.3 },
    { week: 'Week 6', attendance: 90.5, avgScore: 79.8 },
    { week: 'Week 7', attendance: 92.3, avgScore: 85.2 },
    { week: 'Week 8', attendance: 93.1, avgScore: 83.7 },
  ];

  const strugglingStudents = [
    {
      name: 'Chilufya Mwale',
      studentId: 'CS2024-089',
      course: 'CS101',
      gpa: 2.1,
      attendance: 72.5,
      assignmentsCompleted: 60.0,
      lastActive: '2 days ago',
      concerns: ['Low attendance', 'Missing assignments']
    },
    {
      name: 'Bwalya Tembo',
      studentId: 'CS2024-156',
      course: 'CS401',
      gpa: 2.3,
      attendance: 81.2,
      assignmentsCompleted: 70.0,
      lastActive: '1 day ago',
      concerns: ['Declining scores', 'Late submissions']
    },
    {
      name: 'Mutale Zulu',
      studentId: 'CS2024-234',
      course: 'CS301',
      gpa: 2.4,
      attendance: 78.8,
      assignmentsCompleted: 75.0,
      lastActive: '3 days ago',
      concerns: ['Inconsistent attendance', 'Low quiz scores']
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Analytics</h1>
          <p className="text-gray-600 mt-1">Performance insights and student progress tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
          >
            <option value="fall-2024">Fall 2024</option>
            <option value="spring-2024">Spring 2024</option>
            <option value="fall-2023">Fall 2023</option>
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
          >
            <option value="all">All Courses</option>
            {coursePerformance.map(course => (
              <option key={course.code} value={course.code}>{course.code} - {course.name}</option>
            ))}
          </select>
          <Button
            variant="primary"
            leftIcon={<Download className="h-5 w-5" />}
            onClick={() => alert('Exporting lecturer report...')}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-primary-600 mt-2">{overviewMetrics.totalStudents.current}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{overviewMetrics.totalStudents.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Average GPA</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{overviewMetrics.averageGPA.current.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{overviewMetrics.averageGPA.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{overviewMetrics.passRate.current.toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{overviewMetrics.passRate.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{overviewMetrics.attendanceRate.current.toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{overviewMetrics.attendanceRate.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Course-by-Course Performance</CardTitle>
          <CardDescription>Detailed metrics for each course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg GPA</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Pass Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Assignments</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Grade Distribution</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course) => (
                  <tr key={course.code} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary-600" />
                        <div>
                          <p className="font-medium text-gray-900">{course.code}</p>
                          <p className="text-xs text-gray-600">{course.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">{course.students}</td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={course.avgGPA >= 3.3 ? 'success' : course.avgGPA >= 3.0 ? 'warning' : 'danger'}>
                        {course.avgGPA.toFixed(2)}
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={course.passRate >= 90 ? 'success' : course.passRate >= 80 ? 'warning' : 'danger'}>
                        {course.passRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={course.attendance >= 93 ? 'success' : course.attendance >= 88 ? 'warning' : 'danger'}>
                        {course.attendance.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              course.assignmentsCompleted >= 85 ? 'bg-green-600' :
                              course.assignmentsCompleted >= 75 ? 'bg-orange-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${course.assignmentsCompleted}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12">{course.assignmentsCompleted.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {Object.entries(course.gradeDistribution).map(([grade, count]) => (
                          <div
                            key={grade}
                            className="flex items-center gap-0.5 px-2 py-1 bg-gray-100 rounded text-xs"
                            title={`${grade}: ${count} students`}
                          >
                            <span className="font-semibold text-gray-700">{grade}</span>
                            <span className="text-gray-600">{count}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Student Progress & Assignment Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student Progress Distribution */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Student Progress Distribution</CardTitle>
            <CardDescription>Performance categories and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentProgress.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {category.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : category.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{category.count} students</p>
                      <p className="text-xs text-gray-600">{category.avgAttendance.toFixed(1)}% attendance</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        category.trend === 'up' ? 'bg-green-600' :
                        category.trend === 'down' ? 'bg-red-600' : 'bg-gray-600'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{category.percentage.toFixed(1)}% of total students</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignment Analytics */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Recent Assignment Analytics</CardTitle>
            <CardDescription>Submission rates and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignmentAnalytics.map((assignment) => {
                const submissionRate = (assignment.submitted / assignment.total) * 100;
                const onTimeRate = (assignment.onTime / assignment.total) * 100;

                return (
                  <div key={`${assignment.course}-${assignment.assignment}`} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" size="sm">{assignment.course}</Badge>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 mt-1">{assignment.assignment}</p>
                      </div>
                      <Badge variant={assignment.avgScore >= 80 ? 'success' : assignment.avgScore >= 70 ? 'warning' : 'danger'}>
                        Avg: {assignment.avgScore.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs mt-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">On Time</span>
                          <span className="font-medium text-green-600">{assignment.onTime}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-green-600 h-1 rounded-full" style={{ width: `${onTimeRate}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">Late</span>
                          <span className="font-medium text-orange-600">{assignment.late}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-orange-600 h-1 rounded-full" style={{ width: `${(assignment.late / assignment.total) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">Missing</span>
                          <span className="font-medium text-red-600">{assignment.missing}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-red-600 h-1 rounded-full" style={{ width: `${(assignment.missing / assignment.total) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Struggling Students Alert */}
      <Card variant="default" className="border-2 border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-900">Students Requiring Attention</CardTitle>
          </div>
          <CardDescription className="text-orange-700">Students showing warning signs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strugglingStudents.map((student) => (
              <div key={student.studentId} className="p-4 bg-white rounded-xl border border-orange-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <Badge variant="outline" size="sm">{student.studentId}</Badge>
                      <Badge variant="danger" size="sm">{student.course}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Last active: {student.lastActive}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">GPA</p>
                    <p className="text-lg font-bold text-red-600">{student.gpa.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className="text-lg font-bold text-orange-600">{student.attendance.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Assignments</p>
                    <p className="text-lg font-bold text-orange-600">{student.assignmentsCompleted.toFixed(0)}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {student.concerns.map((concern) => (
                    <Badge key={concern} variant="warning" size="sm">
                      {concern}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200">
            <Button variant="primary" fullWidth>
              Contact All At-Risk Students
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
