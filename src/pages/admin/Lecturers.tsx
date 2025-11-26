import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, UserPlus, Download, Edit, Trash2, BookOpen, Mail, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockLecturers = [
  {
    id: '1',
    lecturerId: 'LEC001',
    name: 'Dr. Mwape Banda',
    email: 'mwape.banda@degreedesk.zm',
    phone: '+260 97 123 4567',
    department: 'Computer Science',
    title: 'Senior Lecturer',
    courses: 4,
    students: 156,
    officeHours: 'Mon, Wed 14:00-16:00',
    status: 'active',
    joinDate: '2018-01-15',
  },
  {
    id: '2',
    lecturerId: 'LEC002',
    name: 'Prof. Chanda Phiri',
    email: 'chanda.phiri@degreedesk.zm',
    phone: '+260 96 234 5678',
    department: 'Computer Science',
    title: 'Professor',
    courses: 3,
    students: 135,
    officeHours: 'Tue, Thu 10:00-12:00',
    status: 'active',
    joinDate: '2015-08-20',
  },
  {
    id: '3',
    lecturerId: 'LEC003',
    name: 'Dr. Mutale Zulu',
    email: 'mutale.zulu@degreedesk.zm',
    phone: '+260 97 345 6789',
    department: 'Computer Science',
    title: 'Lecturer',
    courses: 2,
    students: 85,
    officeHours: 'Wed, Fri 14:00-16:00',
    status: 'active',
    joinDate: '2020-09-01',
  },
  {
    id: '4',
    lecturerId: 'LEC004',
    name: 'Prof. Kabwe Ng\'ombe',
    email: 'kabwe.ngombe@degreedesk.zm',
    phone: '+260 95 456 7890',
    department: 'Business Administration',
    title: 'Associate Professor',
    courses: 3,
    students: 180,
    officeHours: 'Mon, Wed 10:00-12:00',
    status: 'active',
    joinDate: '2016-03-15',
  },
  {
    id: '5',
    lecturerId: 'LEC005',
    name: 'Dr. Musonda Kapila',
    email: 'musonda.kapila@degreedesk.zm',
    phone: '+260 97 567 8901',
    department: 'Engineering',
    title: 'Senior Lecturer',
    courses: 3,
    students: 125,
    officeHours: 'Tue, Thu 14:00-16:00',
    status: 'active',
    joinDate: '2019-01-10',
  },
  {
    id: '6',
    lecturerId: 'LEC006',
    name: 'Dr. Nsama Lungu',
    email: 'nsama.lungu@degreedesk.zm',
    phone: '+260 96 678 9012',
    department: 'Medicine',
    title: 'Lecturer',
    courses: 2,
    students: 75,
    officeHours: 'Mon, Fri 08:00-10:00',
    status: 'active',
    joinDate: '2021-08-01',
  },
];

export default function AdminLecturers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = ['all', 'Computer Science', 'Business Administration', 'Engineering', 'Medicine'];

  const filteredLecturers = mockLecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecturer.lecturerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecturer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || lecturer.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });

  const totalLecturers = mockLecturers.length;
  const activeLecturers = mockLecturers.filter(l => l.status === 'active').length;
  const totalCourses = mockLecturers.reduce((sum, l) => sum + l.courses, 0);
  const totalStudents = mockLecturers.reduce((sum, l) => sum + l.students, 0);

  const handleDeleteLecturer = (lecturerId: string) => {
    if (window.confirm('Are you sure you want to delete this lecturer? This will affect their assigned courses.')) {
      console.log('Deleting lecturer:', lecturerId);
      alert('Lecturer deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lecturer Management</h1>
          <p className="text-gray-600 mt-1">Manage faculty and teaching staff</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Lecturer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Lecturers</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{totalLecturers}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Lecturers</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{activeLecturers}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">{totalCourses}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{totalStudents}</p>
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
          <div className="grid gap-4 md:grid-cols-2">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lecturers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lecturer Table */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Lecturers</CardTitle>
              <CardDescription>{filteredLecturers.length} lecturers found</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting lecturer data to CSV...')}
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lecturer ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Courses</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Office Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{lecturer.lecturerId}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lecturer.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <Mail className="h-3 w-3" />
                          <span>{lecturer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lecturer.department}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lecturer.title}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{lecturer.courses}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{lecturer.students}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lecturer.officeHours}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">{lecturer.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Edit lecturer: ${lecturer.name}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteLecturer(lecturer.id)}>
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

      {/* Department Distribution */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Lecturers by Department</CardTitle>
          <CardDescription>Faculty distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.filter(d => d !== 'all').map((dept) => {
              const count = mockLecturers.filter(l => l.department === dept).length;
              const percentage = Math.round((count / mockLecturers.length) * 100);
              return (
                <div key={dept}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{dept}</span>
                    <span className="text-sm text-gray-600">{count} lecturers ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Lecturer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card variant="default" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Lecturer</CardTitle>
              <CardDescription>Enter lecturer information</CardDescription>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                    <option>Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Lecturer</option>
                    <option>Senior Lecturer</option>
                    <option>Associate Professor</option>
                    <option>Professor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
                <input type="text" placeholder="Mon, Wed 14:00-16:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="primary" fullWidth onClick={() => { alert('Lecturer added!'); setShowAddModal(false); }}>
                  Add Lecturer
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
