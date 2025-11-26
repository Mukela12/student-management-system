import { useState, useEffect } from 'react';
import { Search, Filter, Users, Clock, MapPin, GraduationCap, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Badge, LoadingSpinner } from '../../components/ui';
import { useUIStore } from '../../stores/uiStore';
import { api } from '../../services/api';
import { Course } from '../../types';
import { formatCurrency } from '../../lib/utils';

export default function CourseRegistration() {
  const { showToast } = useUIStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await api.getCourses(1, 50);
      if (response.success && response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      showToast({
        title: 'Error',
        message: 'Failed to load courses',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (course: Course) => {
    if (course.enrolled >= course.capacity) {
      showToast({
        title: 'Course Full',
        message: `${course.name} has reached maximum capacity`,
        type: 'warning',
      });
      return;
    }

    try {
      setEnrolling(course.id);
      const response = await api.enrollInCourse(course.id, 'student-1');

      if (response.success) {
        showToast({
          title: 'Success!',
          message: `You've been enrolled in ${course.name}`,
          type: 'success',
        });
        // Reload courses
        await loadCourses();
      }
    } catch (error) {
      showToast({
        title: 'Enrollment Failed',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setEnrolling(null);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.lecturerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const departments = ['all', ...Array.from(new Set(courses.map((c) => c.department)))];

  if (loading) {
    return <LoadingSpinner message="Loading available courses..." />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Course Registration</h1>
        <p className="text-gray-600 mt-1">Browse and enroll in available courses for Fall 2024</p>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search courses, codes, or lecturers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-5 w-5" />}
            />

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Waiting Room Notice */}
      {filteredCourses.some((c) => c.enrolled >= c.capacity - 5) && (
        <Card variant="default" className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Virtual Waiting Room Active</p>
                <p className="text-sm text-blue-700">
                  Some courses are filling up fast. Enrollments are processed in order to ensure fairness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCourses.map((course) => {
          const availableSeats = course.capacity - course.enrolled;
          const isNearlyFull = availableSeats <= 5;
          const isFull = availableSeats <= 0;

          return (
            <Card key={course.id} variant="default" hover className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="primary">{course.code}</Badge>
                      <Badge variant={isFull ? 'danger' : isNearlyFull ? 'warning' : 'success'}>
                        {isFull ? 'Full' : isNearlyFull ? 'Filling Fast' : 'Available'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.department}</CardDescription>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {course.enrolled}/{course.capacity} enrolled
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{course.credits} credits</span>
                  </div>
                </div>

                {/* Lecturer */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{course.lecturerName}</span>
                </div>

                {/* Schedule */}
                {course.schedule.map((sched, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {sched.day}, {sched.startTime} - {sched.endTime} • {sched.room}, {sched.building}
                    </span>
                  </div>
                ))}

                {/* Waitlist */}
                {course.waitlisted > 0 && (
                  <Badge variant="warning" size="sm">
                    {course.waitlisted} on waitlist
                  </Badge>
                )}

                {/* Enroll Button */}
                <Button
                  variant={isFull ? 'secondary' : 'primary'}
                  fullWidth
                  isLoading={enrolling === course.id}
                  onClick={() => handleEnroll(course)}
                  disabled={isFull}
                  leftIcon={isFull ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                >
                  {isFull ? 'Join Waitlist' : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
