import { useState } from 'react';
import { GraduationCap, Download, TrendingUp, Award, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { formatDate } from '../../lib/utils';

const mockGrades = [
  { courseCode: 'CS301', courseName: 'Data Structures and Algorithms', credits: 4, grade: 'A', gradePoints: 4.0, semester: 'Fall 2024' },
  { courseCode: 'CS302', courseName: 'Database Systems', credits: 3, grade: 'A-', gradePoints: 3.7, semester: 'Fall 2024' },
  { courseCode: 'CS303', courseName: 'Web Development', credits: 4, grade: 'B+', gradePoints: 3.3, semester: 'Fall 2024' },
  { courseCode: 'BUS201', courseName: 'Business Statistics', credits: 3, grade: 'A', gradePoints: 4.0, semester: 'Fall 2024' },
  { courseCode: 'ENG102', courseName: 'Technical Writing', credits: 2, grade: 'B+', gradePoints: 3.3, semester: 'Fall 2024' },
  { courseCode: 'CS201', courseName: 'Computer Networks', credits: 4, grade: 'A', gradePoints: 4.0, semester: 'Spring 2024' },
  { courseCode: 'CS202', courseName: 'Operating Systems', credits: 4, grade: 'B+', gradePoints: 3.3, semester: 'Spring 2024' },
  { courseCode: 'MATH201', courseName: 'Linear Algebra', credits: 3, grade: 'A-', gradePoints: 3.7, semester: 'Spring 2024' },
];

export default function Grades() {
  const [selectedSemester, setSelectedSemester] = useState('all');

  const semesters = ['all', ...Array.from(new Set(mockGrades.map(g => g.semester)))];

  const filteredGrades = selectedSemester === 'all'
    ? mockGrades
    : mockGrades.filter(g => g.semester === selectedSemester);

  const calculateGPA = (grades: typeof mockGrades) => {
    const totalPoints = grades.reduce((sum, g) => sum + (g.gradePoints * g.credits), 0);
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const currentGPA = calculateGPA(filteredGrades);
  const cumulativeGPA = calculateGPA(mockGrades);
  const totalCredits = mockGrades.reduce((sum, g) => sum + g.credits, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grades & Transcript</h1>
          <p className="text-gray-600 mt-1">View your academic performance</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="h-5 w-5" />}>
          Download Transcript
        </Button>
      </div>

      {/* GPA Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cumulative GPA</p>
                <p className="text-4xl font-bold text-primary-600 mt-2">{cumulativeGPA}</p>
                <p className="text-xs text-gray-500 mt-1">Out of 4.0</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{totalCredits}</p>
                <p className="text-xs text-gray-500 mt-1">Out of 120 required</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Academic Standing</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Good Standing</p>
                <Badge variant="success" className="mt-2">Dean's List</Badge>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Filter */}
      <Card variant="glass">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Semester:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-300/20 transition-all"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>
                  {sem === 'all' ? 'All Semesters' : sem}
                </option>
              ))}
            </select>
            {selectedSemester !== 'all' && (
              <Badge variant="primary">
                GPA: {currentGPA}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
          <CardDescription>
            {selectedSemester === 'all' ? 'All semesters' : selectedSemester}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Credits</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade Points</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Semester</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <Badge variant="outline">{grade.courseCode}</Badge>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{grade.courseName}</td>
                    <td className="py-4 px-4 text-center text-gray-700">{grade.credits}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge
                        variant={
                          grade.gradePoints >= 3.7 ? 'success' :
                          grade.gradePoints >= 3.0 ? 'primary' :
                          grade.gradePoints >= 2.0 ? 'warning' : 'danger'
                        }
                      >
                        {grade.grade}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-gray-900">
                      {grade.gradePoints.toFixed(1)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{grade.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Your performance across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['A', 'B+', 'B', 'C+', 'C'].map(grade => {
              const count = mockGrades.filter(g => g.grade.startsWith(grade)).length;
              const percentage = (count / mockGrades.length) * 100;
              return (
                <div key={grade}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Grade {grade}</span>
                    <span className="text-sm text-gray-600">{count} courses ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
