import { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Calendar, DollarSign, BookOpen, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

const mockNotifications = [
  {
    id: '1',
    type: 'grade',
    icon: CheckCircle,
    color: 'green',
    title: 'New Grade Posted',
    message: 'Your grade for CS301 Assignment 3 has been posted: A',
    date: '2024-09-17 14:30',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    icon: DollarSign,
    color: 'orange',
    title: 'Payment Reminder',
    message: 'Your tuition payment is due in 7 days. Amount: ZMW 12,000',
    date: '2024-09-17 09:00',
    read: false,
  },
  {
    id: '3',
    type: 'course',
    icon: BookOpen,
    color: 'blue',
    title: 'Course Material Uploaded',
    message: 'New lecture notes uploaded for CS302 - Database Systems',
    date: '2024-09-16 16:20',
    read: true,
  },
  {
    id: '4',
    type: 'announcement',
    icon: Info,
    color: 'primary',
    title: 'University Announcement',
    message: 'Registration for Fall 2025 semester opens on October 1st',
    date: '2024-09-16 10:15',
    read: true,
  },
  {
    id: '5',
    type: 'schedule',
    icon: Calendar,
    color: 'purple',
    title: 'Class Schedule Change',
    message: 'CS301 class moved from LAB1 to LAB2 for next Monday',
    date: '2024-09-15 18:45',
    read: true,
  },
  {
    id: '6',
    type: 'alert',
    icon: AlertCircle,
    color: 'red',
    title: 'Attendance Alert',
    message: 'Your attendance in CS303 is below 75%. Current: 72%',
    date: '2024-09-15 08:30',
    read: true,
  },
];

export default function Notifications() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIconBg = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-100',
      orange: 'bg-orange-100',
      blue: 'bg-blue-100',
      primary: 'bg-primary-100',
      purple: 'bg-purple-100',
      red: 'bg-red-100',
    };
    return colors[color] || 'bg-gray-100';
  };

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'text-green-600',
      orange: 'text-orange-600',
      blue: 'text-blue-600',
      primary: 'text-primary-600',
      purple: 'text-purple-600',
      red: 'text-red-600',
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with your activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 truncate">{notifications.length}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl shrink-0">
                <Bell className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{unreadCount}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <Bell className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Announcements</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">
                  {notifications.filter(n => n.type === 'announcement').length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">
                  {notifications.filter(n => n.type === 'alert').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === 'grade' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('grade')}
            >
              Grades
            </Button>
            <Button
              variant={filter === 'payment' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('payment')}
            >
              Payments
            </Button>
            <Button
              variant={filter === 'course' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('course')}
            >
              Courses
            </Button>
            <Button
              variant={filter === 'announcement' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('announcement')}
            >
              Announcements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      notification.read
                        ? 'bg-white border-gray-200'
                        : 'bg-primary-50 border-primary-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shrink-0 ${getIconBg(notification.color)}`}>
                        <Icon className={`h-5 w-5 ${getIconColor(notification.color)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            {!notification.read && (
                              <Badge variant="primary" size="sm">New</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 shrink-0">{notification.date}</p>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <div className="flex gap-2 mt-3">
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
