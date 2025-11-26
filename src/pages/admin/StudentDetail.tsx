import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, BookOpen, DollarSign, TrendingUp, Calendar, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockStudentDetails: Record<string, any> = {
  '1': {
    id: '1',
    studentId: 'ST001',
    firstName: 'Mwape',
    lastName: 'Banda',
    email: 'mwape.banda@student.zm',
    phone: '+260 97 123 4567',
    address: '123 University Road, Lusaka',
    dateOfBirth: '2002-05-15',
    program: 'Computer Science',
    year: 2,
    semester: 'Fall 2024',
    gpa: 3.45,
    status: 'active',
    enrollmentDate: '2022-09-01',
    expectedGraduation: '2026-06-30',
    enrolledCourses: [
      { code: 'CS301', name: 'Data Structures and Algorithms', credits: 3, grade: 'A', lecturer: 'Dr. Mwape Banda' },
      { code: 'CS302', name: 'Database Systems', credits: 3, grade: 'B+', lecturer: 'Prof. Chanda Phiri' },
      { code: 'CS303', name: 'Web Development', credits: 3, grade: 'A-', lecturer: 'Dr. Mutale Zulu' },
      { code: 'MATH201', name: 'Calculus II', credits: 4, grade: 'B', lecturer: 'Dr. Kabwe Ngombe' },
      { code: 'ENG102', name: 'Technical Writing', credits: 2, grade: 'A', lecturer: 'Prof. Musonda Kapila' },
    ],
    gradeHistory: [
      { semester: 'Fall 2024', gpa: 3.45, credits: 15 },
      { semester: 'Spring 2024', gpa: 3.52, credits: 16 },
      { semester: 'Fall 2023', gpa: 3.38, credits: 15 },
      { semester: 'Spring 2023', gpa: 3.41, credits: 14 },
    ],
    paymentHistory: [
      { date: '2024-09-01', description: 'Tuition Fee - Fall 2024', amount: 12000, status: 'paid', method: 'Airtel Money' },
      { date: '2024-08-25', description: 'Accommodation Fee', amount: 5000, status: 'paid', method: 'MTN Money' },
      { date: '2024-08-20', description: 'Library Fee', amount: 500, status: 'paid', method: 'Cash' },
    ],
    feeBalance: 0,
    totalPaid: 17500,
    totalDue: 17500,
    attendance: 95,
  },
};

export default function AdminStudentDetail() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const student = studentId ? mockStudentDetails[studentId] : null;

  if (!student) {
    return (
      <div className="p-6">
        <Card variant="default">
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">Student not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/students')}>
              Back to Students
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
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/students')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {student.firstName} {student.lastName}
            </h1>
            <Badge variant={student.status === 'active' ? 'success' : 'warning'}>
              {student.status}
            </Badge>
          </div>
          <p className="text-gray-600">{student.studentId} • {student.program} • Year {student.year}</p>
        </div>
        <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
          Edit Student
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Current GPA</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{student.gpa}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">{student.enrolledCourses.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Fee Balance</p>
                <p className={`text-2xl md:text-3xl font-bold mt-2 truncate ${student.feeBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ZMW {student.feeBalance.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-xl shrink-0 ${student.feeBalance > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                <DollarSign className={`h-6 w-6 ${student.feeBalance > 0 ? 'text-red-600' : 'text-green-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{student.attendance}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Student contact and basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{student.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">{student.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-900">{student.dateOfBirth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>Enrollment and program details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-900">{student.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Program</p>
                <p className="font-semibold text-gray-900">{student.program}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Year</p>
                <p className="font-semibold text-gray-900">Year {student.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Semester</p>
                <p className="font-semibold text-gray-900">{student.semester}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrollment Date</p>
                <p className="font-semibold text-gray-900">{student.enrollmentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Graduation</p>
                <p className="font-semibold text-gray-900">{student.expectedGraduation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Courses */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Current Courses ({student.semester})</CardTitle>
          <CardDescription>{student.enrolledCourses.length} courses enrolled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Credits</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lecturer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                {student.enrolledCourses.map((course: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Badge variant="outline" size="sm">{course.code}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{course.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.credits}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.lecturer}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">{course.grade}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Grade History */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Grade History</CardTitle>
            <CardDescription>Semester-by-semester performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.gradeHistory.map((record: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{record.semester}</p>
                    <p className="text-sm text-gray-600">{record.credits} credits</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{record.gpa}</p>
                    <p className="text-xs text-gray-600">GPA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Recent fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.paymentHistory.map((payment: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{payment.description}</p>
                    <p className="text-sm text-gray-600">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">ZMW {payment.amount.toLocaleString()}</p>
                    <Badge variant="success" size="sm">{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Paid:</span>
                <span className="font-bold text-green-600">ZMW {student.totalPaid.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Balance:</span>
                <span className={`font-bold ${student.feeBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ZMW {student.feeBalance.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
