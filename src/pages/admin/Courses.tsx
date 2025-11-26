import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Plus, Download, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockCourses = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures and Algorithms',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2024',
    lecturer: 'Dr. Mwape Banda',
    lecturerId: 'LEC001',
    enrolled: 45,
    capacity: 50,
    schedule: 'Mon, Wed 10:00-12:00',
    room: 'LAB1, Science Building',
    status: 'active',
  },
  {
    id: '2',
    code: 'CS302',
    name: 'Database Systems',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2024',
    lecturer: 'Prof. Chanda Phiri',
    lecturerId: 'LEC002',
    enrolled: 48,
    capacity: 50,
    schedule: 'Tue, Thu 14:00-16:00',
    room: 'R201, Main Block',
    status: 'active',
  },
  {
    id: '3',
    code: 'CS401',
    name: 'Software Engineering',
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall 2024',
    lecturer: 'Dr. Mutale Zulu',
    lecturerId: 'LEC003',
    enrolled: 35,
    capacity: 40,
    schedule: 'Wed, Fri 08:00-10:00',
    room: 'R305, Main Block',
    status: 'active',
  },
  {
    id: '4',
    code: 'BUS201',
    name: 'Marketing Fundamentals',
    department: 'Business Administration',
    credits: 3,
    semester: 'Fall 2024',
    lecturer: 'Prof. Kabwe Ng\'ombe',
    lecturerId: 'LEC004',
    enrolled: 60,
    capacity: 65,
    schedule: 'Mon, Wed 14:00-16:00',
    room: 'R102, Business Block',
    status: 'active',
  },
  {
    id: '5',
    code: 'ENG101',
    name: 'Engineering Mechanics',
    department: 'Engineering',
    credits: 4,
    semester: 'Fall 2024',
    lecturer: 'Dr. Musonda Kapila',
    lecturerId: 'LEC005',
    enrolled: 42,
    capacity: 45,
    schedule: 'Tue, Thu 10:00-12:00',
    room: 'LAB3, Engineering Block',
    status: 'active',
  },
  {
    id: '6',
    code: 'MED201',
    name: 'Anatomy and Physiology',
    department: 'Medicine',
    credits: 5,
    semester: 'Fall 2024',
    lecturer: 'Dr. Nsama Lungu',
    lecturerId: 'LEC006',
    enrolled: 38,
    capacity: 40,
    schedule: 'Mon, Wed, Fri 08:00-10:00',
    room: 'MED1, Medical Block',
    status: 'active',
  },
];

export default function AdminCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = ['all', 'Computer Science', 'Business Administration', 'Engineering', 'Medicine'];
  const semesters = ['all', 'Fall 2024', 'Spring 2024', 'Fall 2023'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    const matchesSemester = filterSemester === 'all' || course.semester === filterSemester;

    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const totalCourses = mockCourses.length;
  const activeCourses = mockCourses.filter(c => c.status === 'active').length;
  const totalEnrolled = mockCourses.reduce((sum, c) => sum + c.enrolled, 0);
  const avgEnrollment = Math.round(totalEnrolled / mockCourses.length);

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      console.log('Deleting course:', courseId);
      alert('Course deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage courses and class schedules</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{totalCourses}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{activeCourses}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">{totalEnrolled}</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Enrollment</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{avgEnrollment}</p>
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
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
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

            {/* Semester Filter */}
            <div>
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>
                    {sem === 'all' ? 'All Semesters' : sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Table */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>{filteredCourses.length} courses found</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting course data to CSV...')}
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Credits</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lecturer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Schedule</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Enrollment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Badge variant="primary" size="sm">{course.code}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{course.name}</p>
                      <p className="text-xs text-gray-600">{course.room}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.department}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.credits}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.lecturer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.schedule}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <span className={course.enrolled >= course.capacity ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                          {course.enrolled}/{course.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${course.enrolled >= course.capacity ? 'bg-red-600' : 'bg-primary-600'}`}
                          style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">{course.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Edit course: ${course.name}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id)}>
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

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card variant="default" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Course</CardTitle>
              <CardDescription>Enter course information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                  <input type="text" placeholder="CS301" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input type="number" placeholder="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input type="text" placeholder="Data Structures and Algorithms" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input type="number" placeholder="50" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <input type="text" placeholder="Mon, Wed 10:00-12:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input type="text" placeholder="LAB1, Science Building" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="primary" fullWidth onClick={() => { alert('Course added!'); setShowAddModal(false); }}>
                  Add Course
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
