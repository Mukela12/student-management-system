import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, UserPlus, Download, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockStudents = [
  { id: '1', studentId: 'ST001', name: 'Mwape Banda', email: 'mwape.banda@student.zm', program: 'Computer Science', year: 2, gpa: 3.45, status: 'active', enrolledCourses: 6, feeBalance: 0 },
  { id: '2', studentId: 'ST002', name: 'Chanda Phiri', email: 'chanda.phiri@student.zm', program: 'Business Administration', year: 3, gpa: 3.22, status: 'active', enrolledCourses: 5, feeBalance: 2500 },
  { id: '3', studentId: 'ST003', name: 'Mutale Zulu', email: 'mutale.zulu@student.zm', program: 'Engineering', year: 1, gpa: 3.78, status: 'active', enrolledCourses: 7, feeBalance: 0 },
  { id: '4', studentId: 'ST004', name: 'Chilufya Mwale', email: 'chilufya.mwale@student.zm', program: 'Medicine', year: 4, gpa: 3.91, status: 'active', enrolledCourses: 8, feeBalance: 5000 },
  { id: '5', studentId: 'ST005', name: 'Bwalya Tembo', email: 'bwalya.tembo@student.zm', program: 'Computer Science', year: 2, gpa: 3.15, status: 'active', enrolledCourses: 6, feeBalance: 1200 },
  { id: '6', studentId: 'ST006', name: 'Kabwe Ng\'ombe', email: 'kabwe.ngombe@student.zm', program: 'Business Administration', year: 3, gpa: 2.98, status: 'active', enrolledCourses: 5, feeBalance: 0 },
  { id: '7', studentId: 'ST007', name: 'Musonda Kapila', email: 'musonda.kapila@student.zm', program: 'Engineering', year: 1, gpa: 3.56, status: 'active', enrolledCourses: 7, feeBalance: 3000 },
  { id: '8', studentId: 'ST008', name: 'Nsama Lungu', email: 'nsama.lungu@student.zm', program: 'Computer Science', year: 4, gpa: 3.67, status: 'active', enrolledCourses: 5, feeBalance: 0 },
  { id: '9', studentId: 'ST009', name: 'Kunda Sakala', email: 'kunda.sakala@student.zm', program: 'Medicine', year: 2, gpa: 3.82, status: 'probation', enrolledCourses: 6, feeBalance: 8000 },
  { id: '10', studentId: 'ST010', name: 'Lubasi Mumba', email: 'lubasi.mumba@student.zm', program: 'Business Administration', year: 1, gpa: 2.75, status: 'active', enrolledCourses: 4, feeBalance: 1500 },
];

export default function AdminStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const programs = ['all', 'Computer Science', 'Business Administration', 'Engineering', 'Medicine'];
  const years = ['all', '1', '2', '3', '4'];
  const statuses = ['all', 'active', 'probation', 'suspended'];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram;
    const matchesYear = filterYear === 'all' || student.year.toString() === filterYear;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;

    return matchesSearch && matchesProgram && matchesYear && matchesStatus;
  });

  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const totalEnrolled = mockStudents.reduce((sum, s) => sum + s.enrolledCourses, 0);
  const avgGPA = (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2);
  const studentsWithBalance = mockStudents.filter(s => s.feeBalance > 0).length;

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      console.log('Deleting student:', studentId);
      alert('Student deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage student records and enrollment</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Student
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{mockStudents.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{activeStudents}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Average GPA</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">{avgGPA}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending Fees</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{studentsWithBalance}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Program Filter */}
            <div>
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {programs.map(program => (
                  <option key={program} value={program}>
                    {program === 'all' ? 'All Programs' : program}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : `Year ${year}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Students</CardTitle>
              <CardDescription>{filteredStudents.length} students found</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting student data to CSV...')}
            >
              Export CSV
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Program</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">GPA</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Courses</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fee Balance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.studentId}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.program}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Year {student.year}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{student.gpa}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.enrolledCourses}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={student.feeBalance > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        ZMW {student.feeBalance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={student.status === 'active' ? 'success' : student.status === 'probation' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/students/${student.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card variant="default" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Student</CardTitle>
              <CardDescription>Enter student information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                    <option>Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="primary" fullWidth onClick={() => { alert('Student added!'); setShowAddModal(false); }}>
                  Add Student
                </Button>
                <Button variant="outline" fullWidth onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
