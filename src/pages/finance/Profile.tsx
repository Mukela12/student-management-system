import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Save, Edit2, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function FinanceProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Tamara',
    lastName: user?.lastName || 'Chanda',
    email: user?.email || 'tamara.chanda@degreedesk.zm',
    phone: '+260 97 987 6543',
    department: 'Finance Department',
    title: 'Finance Officer',
    office: 'F102, Administration Block',
    bio: 'Experienced finance professional managing university payment systems and financial reconciliation. Specializing in mobile money integration and financial reporting.',
    qualifications: 'MBA in Finance, ACCA Certified',
    joinDate: '2019-03-01',
    permissions: ['view_transactions', 'reconcile_payments', 'generate_reports', 'manage_settings'],
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

  const permissions = [
    { key: 'view_transactions', label: 'View Transactions', granted: true },
    { key: 'reconcile_payments', label: 'Reconcile Payments', granted: true },
    { key: 'generate_reports', label: 'Generate Reports', granted: true },
    { key: 'manage_settings', label: 'Manage Settings', granted: true },
    { key: 'approve_refunds', label: 'Approve Refunds', granted: false },
    { key: 'bulk_operations', label: 'Bulk Operations', granted: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
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
              <p className="text-gray-600 mt-1">{formData.title}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {formData.department}
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
                <span>{formData.office}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Briefcase className="h-4 w-4 shrink-0" />
                <span>Joined {formData.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details and professional information</CardDescription>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.department}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.title}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Office Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{formData.office}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{formData.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              {isEditing ? (
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{formData.qualifications}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions & Access */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <CardTitle>Permissions & Access</CardTitle>
          </div>
          <CardDescription>Your system permissions and access rights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {permissions.map((permission) => (
              <div
                key={permission.key}
                className={`p-4 rounded-xl border-2 ${
                  permission.granted
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {permission.granted ? (
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-gray-200 rounded-lg">
                        <Shield className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <span className={`font-medium ${permission.granted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {permission.label}
                    </span>
                  </div>
                  {permission.granted ? (
                    <span className="text-xs font-semibold text-green-600 px-2 py-1 bg-green-100 rounded">
                      Granted
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-200 rounded">
                      Not Granted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Your recent activity statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Transactions Reviewed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Reconciliations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="text-sm font-bold text-gray-900 mt-1">Today</p>
              <p className="text-xs text-gray-500 mt-1">09:30 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
