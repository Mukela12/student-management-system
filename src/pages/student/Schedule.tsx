import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../../components/ui';
import { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeSlots = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
];

interface ScheduleEvent {
  courseCode: string;
  courseName: string;
  lecturer: string;
  room: string;
  building: string;
  type: 'lecture' | 'lab' | 'tutorial';
  color: string;
}

const mockSchedule: Record<string, Record<string, ScheduleEvent | null>> = {
  Monday: {
    '08:00 - 10:00': null,
    '10:00 - 12:00': {
      courseCode: 'CS301',
      courseName: 'Data Structures and Algorithms',
      lecturer: 'Dr. Mwape Banda',
      room: 'LAB1',
      building: 'Science Building',
      type: 'lecture',
      color: 'bg-blue-100 border-blue-300 text-blue-900',
    },
    '12:00 - 14:00': null,
    '14:00 - 16:00': null,
    '16:00 - 18:00': null,
  },
  Tuesday: {
    '08:00 - 10:00': null,
    '10:00 - 12:00': null,
    '12:00 - 14:00': null,
    '14:00 - 16:00': {
      courseCode: 'CS302',
      courseName: 'Database Systems',
      lecturer: 'Prof. Chanda Phiri',
      room: 'R201',
      building: 'Main Block',
      type: 'lecture',
      color: 'bg-green-100 border-green-300 text-green-900',
    },
    '16:00 - 18:00': null,
  },
  Wednesday: {
    '08:00 - 10:00': null,
    '10:00 - 12:00': {
      courseCode: 'CS301',
      courseName: 'Data Structures and Algorithms',
      lecturer: 'Dr. Mwape Banda',
      room: 'LAB1',
      building: 'Science Building',
      type: 'lab',
      color: 'bg-blue-100 border-blue-300 text-blue-900',
    },
    '12:00 - 14:00': null,
    '14:00 - 16:00': null,
    '16:00 - 18:00': null,
  },
  Thursday: {
    '08:00 - 10:00': null,
    '10:00 - 12:00': null,
    '12:00 - 14:00': null,
    '14:00 - 16:00': {
      courseCode: 'CS302',
      courseName: 'Database Systems',
      lecturer: 'Prof. Chanda Phiri',
      room: 'R201',
      building: 'Main Block',
      type: 'tutorial',
      color: 'bg-green-100 border-green-300 text-green-900',
    },
    '16:00 - 18:00': null,
  },
  Friday: {
    '08:00 - 10:00': {
      courseCode: 'CS303',
      courseName: 'Web Development',
      lecturer: 'Dr. Mutale Zulu',
      room: 'LAB2',
      building: 'Science Building',
      type: 'lab',
      color: 'bg-purple-100 border-purple-300 text-purple-900',
    },
    '10:00 - 12:00': {
      courseCode: 'CS303',
      courseName: 'Web Development',
      lecturer: 'Dr. Mutale Zulu',
      room: 'LAB2',
      building: 'Science Building',
      type: 'lecture',
      color: 'bg-purple-100 border-purple-300 text-purple-900',
    },
    '12:00 - 14:00': null,
    '14:00 - 16:00': null,
    '16:00 - 18:00': null,
  },
  Saturday: {
    '08:00 - 10:00': null,
    '10:00 - 12:00': null,
    '12:00 - 14:00': null,
    '14:00 - 16:00': null,
    '16:00 - 18:00': null,
  },
};

const upcomingClasses = [
  {
    courseCode: 'CS301',
    courseName: 'Data Structures and Algorithms',
    lecturer: 'Dr. Mwape Banda',
    time: 'Today, 10:00 - 12:00',
    room: 'LAB1, Science Building',
    type: 'lecture' as const,
  },
  {
    courseCode: 'CS302',
    courseName: 'Database Systems',
    lecturer: 'Prof. Chanda Phiri',
    time: 'Tomorrow, 14:00 - 16:00',
    room: 'R201, Main Block',
    type: 'lecture' as const,
  },
  {
    courseCode: 'CS303',
    courseName: 'Web Development',
    lecturer: 'Dr. Mutale Zulu',
    time: 'Friday, 08:00 - 12:00',
    room: 'LAB2, Science Building',
    type: 'lab' as const,
  },
];

export default function Schedule() {
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'lab':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'tutorial':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-1">Fall 2024 - Week View</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'week'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Week View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {viewMode === 'week' ? (
        /* Week View */
        <Card variant="default">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10 w-32">
                      Time
                    </th>
                    {daysOfWeek.map((day) => (
                      <th
                        key={day}
                        className="p-4 text-center font-semibold text-gray-700 bg-gray-50 min-w-[150px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600 bg-gray-50 sticky left-0 z-10">
                        {time}
                      </td>
                      {daysOfWeek.map((day) => {
                        const event = mockSchedule[day]?.[time];
                        return (
                          <td key={`${day}-${time}`} className="p-2">
                            {event ? (
                              <div
                                className={`${event.color} p-3 rounded-lg border-2 h-full min-h-[100px] hover:shadow-md transition-shadow cursor-pointer`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <Badge
                                    variant="outline"
                                    size="sm"
                                    className={getTypeColor(event.type)}
                                  >
                                    {event.type.toUpperCase()}
                                  </Badge>
                                  <span className="font-bold text-xs">
                                    {event.courseCode}
                                  </span>
                                </div>
                                <p className="font-semibold text-sm mb-1 line-clamp-2">
                                  {event.courseName}
                                </p>
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span className="truncate">{event.lecturer}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate">
                                      {event.room}, {event.building}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full min-h-[100px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* List View - Upcoming Classes */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingClasses.map((cls, index) => (
            <Card key={index} variant="default" hover>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="primary">{cls.courseCode}</Badge>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={getTypeColor(cls.type)}
                  >
                    {cls.type.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{cls.courseName}</CardTitle>
                <CardDescription>{cls.lecturer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{cls.room}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Legend */}
      <Card variant="default">
        <CardHeader>
          <CardTitle className="text-lg">Class Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700">Lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-700">Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Tutorial</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
