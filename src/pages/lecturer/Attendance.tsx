import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Users, CheckCircle2, XCircle, Clock, Save, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockCourses = [
  { id: '1', code: 'CS301', name: 'Data Structures and Algorithms', enrolled: 45 },
  { id: '2', code: 'CS302', name: 'Database Systems', enrolled: 48 },
  { id: '3', code: 'CS401', name: 'Software Engineering', enrolled: 35 },
  { id: '4', code: 'CS101', name: 'Introduction to Programming', enrolled: 28 },
];

const mockStudents = [
  { id: '1', studentId: 'ST001', name: 'Mwape Banda', attendanceRate: 95 },
  { id: '2', studentId: 'ST002', name: 'Chanda Phiri', attendanceRate: 88 },
  { id: '3', studentId: 'ST003', name: 'Mutale Zulu', attendanceRate: 92 },
  { id: '4', studentId: 'ST004', name: 'Chilufya Mwale', attendanceRate: 85 },
  { id: '5', studentId: 'ST005', name: 'Bwalya Tembo', attendanceRate: 90 },
  { id: '6', studentId: 'ST006', name: 'Kabwe Ng\'ombe', attendanceRate: 92 },
  { id: '7', studentId: 'ST007', name: 'Musonda Kapila', attendanceRate: 85 },
  { id: '8', studentId: 'ST008', name: 'Nsama Lungu', attendanceRate: 88 },
];

const mockAttendanceHistory = [
  { id: '1', date: '2024-09-23', courseId: '1', present: 42, absent: 3, total: 45 },
  { id: '2', date: '2024-09-20', courseId: '1', present: 41, absent: 4, total: 45 },
  { id: '3', date: '2024-09-18', courseId: '1', present: 43, absent: 2, total: 45 },
  { id: '4', date: '2024-09-24', courseId: '2', present: 45, absent: 3, total: 48 },
  { id: '5', date: '2024-09-22', courseId: '2', present: 44, absent: 4, total: 48 },
];

export default function LecturerAttendance() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseFilter = searchParams.get('course');

  const [selectedCourse, setSelectedCourse] = useState<string | null>(courseFilter);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const currentCourse = selectedCourse ? mockCourses.find(c => c.id === selectedCourse) : null;
  const attendanceHistory = selectedCourse
    ? mockAttendanceHistory.filter(a => a.courseId === selectedCourse)
    : mockAttendanceHistory;

  const presentCount = Object.values(attendanceStatus).filter(s => s === 'present' || s === 'late').length;
  const absentCount = Object.values(attendanceStatus).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendanceStatus).filter(s => s === 'late').length;

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const newStatus: Record<string, 'present' | 'absent' | 'late'> = {};
    mockStudents.forEach(student => {
      newStatus[student.id] = 'present';
    });
    setAttendanceStatus(newStatus);
  };

  const handleSaveAttendance = () => {
    if (!selectedCourse || Object.keys(attendanceStatus).length === 0) {
      alert('Please select a course and mark attendance');
      return;
    }
    // In real app, this would make an API call
    console.log('Saving attendance:', { courseId: selectedCourse, date: selectedDate, attendance: attendanceStatus });
    alert(`Attendance saved for ${selectedDate}!\nPresent: ${presentCount}, Absent: ${absentCount}, Late: ${lateCount}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">Take and manage student attendance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">4</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{presentCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">{absentCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{lateCount}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course Selection & Controls */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Take Attendance</CardTitle>
            <CardDescription>Select course and date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <div className="space-y-2">
                {mockCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedCourse === course.id
                        ? 'bg-primary-100 border-2 border-primary-600'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" size="sm">{course.code}</Badge>
                        <p className="text-sm font-medium text-gray-900 mt-1">{course.name}</p>
                      </div>
                      <div className="text-xs text-gray-600">{course.enrolled} students</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                fullWidth
                size="sm"
                onClick={handleMarkAllPresent}
                disabled={!selectedCourse}
              >
                Mark All Present
              </Button>
              <Button
                variant="primary"
                fullWidth
                leftIcon={<Save className="h-4 w-4" />}
                onClick={handleSaveAttendance}
                disabled={!selectedCourse || Object.keys(attendanceStatus).length === 0}
              >
                Save Attendance
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card variant="default" className="lg:col-span-2">
          {!selectedCourse ? (
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a course to take attendance</p>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentCourse?.name}</CardTitle>
                    <CardDescription>
                      {selectedDate} • {currentCourse?.enrolled} students
                    </CardDescription>
                  </div>
                  <Badge variant="primary">{currentCourse?.code}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStudents.map((student) => {
                    const status = attendanceStatus[student.id];
                    return (
                      <div
                        key={student.id}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          status === 'present'
                            ? 'bg-green-50 border-green-200'
                            : status === 'absent'
                            ? 'bg-red-50 border-red-200'
                            : status === 'late'
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">
                              {student.studentId} • Attendance Rate: {student.attendanceRate}%
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant={status === 'present' ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() => handleMarkAttendance(student.id, 'present')}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={status === 'late' ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() => handleMarkAttendance(student.id, 'late')}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={status === 'absent' ? 'danger' : 'outline'}
                              size="sm"
                              onClick={() => handleMarkAttendance(student.id, 'absent')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      {/* Attendance History */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Recent attendance records</CardDescription>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Present</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Absent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record) => {
                  const course = mockCourses.find(c => c.id === record.courseId);
                  const rate = Math.round((record.present / record.total) * 100);
                  return (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{record.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <Badge variant="outline" size="sm">{course?.code}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-semibold">{record.present}</td>
                      <td className="py-3 px-4 text-sm text-red-600 font-semibold">{record.absent}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{rate}%</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
