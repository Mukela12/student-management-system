import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, GraduationCap, Save, Edit2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function StudentProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Mwape',
    lastName: user?.lastName || 'Banda',
    studentId: 'ST001',
    email: user?.email || 'mwape.banda@student.zm',
    phone: '+260 97 123 4567',
    address: '123 University Road, Lusaka',
    dateOfBirth: '2002-05-15',
    program: 'Computer Science',
    year: 2,
    semester: 'Fall 2024',
    enrollmentDate: '2022-09-01',
    expectedGraduation: '2026-06-30',
    emergencyContactName: 'John Banda',
    emergencyContactPhone: '+260 97 765 4321',
    emergencyContactRelation: 'Father',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const academicInfo = {
    gpa: 3.45,
    totalCredits: 60,
    enrolledCourses: 6,
    completedCourses: 20,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your personal information</p>
        </div>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          leftIcon={isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card variant="default" className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{formData.studentId}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {formData.program}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{formData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Born {formData.dateOfBirth}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Academic Year</p>
              <p className="text-sm text-gray-900">Year {formData.year} • {formData.semester}</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal and academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{formData.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <p className="text-gray-900">{formData.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <p className="text-gray-900">{formData.studentId}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.emergencyContactName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.emergencyContactPhone}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.emergencyContactRelation}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-gray-600" />
              <CardTitle>Academic Information</CardTitle>
            </div>
            <CardDescription>Your program and enrollment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Program</p>
                <p className="font-semibold text-gray-900">{formData.program}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Year</p>
                <p className="font-semibold text-gray-900">Year {formData.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Semester</p>
                <p className="font-semibold text-gray-900">{formData.semester}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current GPA</p>
                <p className="text-2xl font-bold text-primary-600">{academicInfo.gpa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrollment Date</p>
                <p className="font-semibold text-gray-900">{formData.enrollmentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Graduation</p>
                <p className="font-semibold text-gray-900">{formData.expectedGraduation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gray-600" />
              <CardTitle>Academic Progress</CardTitle>
            </div>
            <CardDescription>Your course and credit summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-gray-600">Total Credits Earned</p>
                <p className="text-3xl font-bold text-primary-600 mt-1">{academicInfo.totalCredits}</p>
                <p className="text-xs text-gray-500 mt-1">120 credits required for graduation</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{academicInfo.enrolledCourses}</p>
                  <p className="text-xs text-gray-500 mt-1">Current semester</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Completed Courses</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{academicInfo.completedCourses}</p>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
