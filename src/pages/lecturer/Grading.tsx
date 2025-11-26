import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FileText, CheckCircle2, Clock, XCircle, Download, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';

const mockAssignments = [
  {
    id: '1',
    courseId: '1',
    courseCode: 'CS301',
    courseName: 'Data Structures and Algorithms',
    title: 'Assignment 3 - Graph Algorithms',
    dueDate: '2024-09-25',
    totalSubmissions: 42,
    totalStudents: 45,
    graded: 39,
    pending: 3,
    maxScore: 100,
  },
  {
    id: '2',
    courseId: '1',
    courseCode: 'CS301',
    courseName: 'Data Structures and Algorithms',
    title: 'Assignment 4 - Dynamic Programming',
    dueDate: '2024-10-02',
    totalSubmissions: 38,
    totalStudents: 45,
    graded: 33,
    pending: 5,
    maxScore: 100,
  },
  {
    id: '4',
    courseId: '2',
    courseCode: 'CS302',
    courseName: 'Database Systems',
    title: 'SQL Queries Lab',
    dueDate: '2024-09-28',
    totalSubmissions: 45,
    totalStudents: 48,
    graded: 40,
    pending: 5,
    maxScore: 50,
  },
];

const mockSubmissions = [
  { id: '1', assignmentId: '2', studentId: 'ST001', studentName: 'Mwape Banda', submittedAt: '2024-10-01 14:30', status: 'pending', score: null, feedback: '' },
  { id: '2', assignmentId: '2', studentId: 'ST002', studentName: 'Chanda Phiri', submittedAt: '2024-10-01 16:45', status: 'pending', score: null, feedback: '' },
  { id: '3', assignmentId: '2', studentId: 'ST003', studentName: 'Mutale Zulu', submittedAt: '2024-10-02 09:20', status: 'pending', score: null, feedback: '' },
  { id: '4', assignmentId: '2', studentId: 'ST004', studentName: 'Chilufya Mwale', submittedAt: '2024-10-02 11:15', status: 'pending', score: null, feedback: '' },
  { id: '5', assignmentId: '2', studentId: 'ST005', studentName: 'Bwalya Tembo', submittedAt: '2024-09-30 22:10', status: 'pending', score: null, feedback: '' },
  { id: '6', assignmentId: '2', studentId: 'ST006', studentName: 'Kabwe Ng\'ombe', submittedAt: '2024-10-01 08:30', status: 'graded', score: 85, feedback: 'Good work! Well-structured code.' },
  { id: '7', assignmentId: '2', studentId: 'ST007', studentName: 'Musonda Kapila', submittedAt: '2024-10-01 19:45', status: 'graded', score: 78, feedback: 'Good effort. Check edge cases.' },
];

export default function LecturerGrading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseFilter = searchParams.get('course');
  const assignmentFilter = searchParams.get('assignment');

  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(assignmentFilter);
  const [gradingData, setGradingData] = useState<Record<string, { score: number; feedback: string }>>({});

  const filteredAssignments = courseFilter
    ? mockAssignments.filter(a => a.courseId === courseFilter)
    : mockAssignments;

  const currentAssignment = selectedAssignment
    ? mockAssignments.find(a => a.id === selectedAssignment)
    : null;

  const submissions = selectedAssignment
    ? mockSubmissions.filter(s => s.assignmentId === selectedAssignment)
    : [];

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const gradedSubmissions = submissions.filter(s => s.status === 'graded');

  const handleScoreChange = (submissionId: string, score: number) => {
    setGradingData(prev => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], score },
    }));
  };

  const handleFeedbackChange = (submissionId: string, feedback: string) => {
    setGradingData(prev => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], feedback },
    }));
  };

  const handleSubmitGrade = (submissionId: string) => {
    const data = gradingData[submissionId];
    if (data && data.score !== undefined) {
      // In real app, this would make an API call
      console.log('Submitting grade for submission:', submissionId, data);
      alert(`Grade submitted: ${data.score}/${currentAssignment?.maxScore}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grading</h1>
        <p className="text-gray-600 mt-1">Review and grade student submissions</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{filteredAssignments.length}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending Grading</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">
                  {filteredAssignments.reduce((sum, a) => sum + a.pending, 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">
                  {filteredAssignments.reduce((sum, a) => sum + a.graded, 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Missing</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">
                  {filteredAssignments.reduce((sum, a) => sum + (a.totalStudents - a.totalSubmissions), 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Assignment List */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Select an assignment to grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAssignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className={`w-full p-4 rounded-xl text-left transition-colors ${
                    selectedAssignment === assignment.id
                      ? 'bg-primary-100 border-2 border-primary-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" size="sm">{assignment.courseCode}</Badge>
                        {assignment.pending > 0 && (
                          <Badge variant="warning" size="sm">{assignment.pending} pending</Badge>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{assignment.title}</p>
                      <p className="text-xs text-gray-600 mt-1">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                    <span>Submitted: {assignment.totalSubmissions}/{assignment.totalStudents}</span>
                    <span>Graded: {assignment.graded}/{assignment.totalSubmissions}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grading Interface */}
        <Card variant="default" className="lg:col-span-2">
          {!selectedAssignment ? (
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select an assignment to start grading</p>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{currentAssignment?.title}</CardTitle>
                      <Badge variant="primary">{currentAssignment?.courseCode}</Badge>
                    </div>
                    <CardDescription>
                      {pendingSubmissions.length} pending • {gradedSubmissions.length} graded • Max Score: {currentAssignment?.maxScore}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Pending Submissions */}
                  {pendingSubmissions.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Pending Grading ({pendingSubmissions.length})</h3>
                      <div className="space-y-3">
                        {pendingSubmissions.map((submission) => (
                          <div key={submission.id} className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-semibold text-gray-900">{submission.studentName}</p>
                                <p className="text-sm text-gray-600">{submission.studentId} • Submitted: {submission.submittedAt}</p>
                              </div>
                              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                                Download
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Score (out of {currentAssignment?.maxScore})
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max={currentAssignment?.maxScore}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                  placeholder="Enter score"
                                  value={gradingData[submission.id]?.score ?? ''}
                                  onChange={(e) => handleScoreChange(submission.id, parseInt(e.target.value) || 0)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                              <textarea
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter feedback for student..."
                                value={gradingData[submission.id]?.feedback ?? ''}
                                onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                              />
                            </div>
                            <Button
                              variant="primary"
                              size="sm"
                              className="mt-3"
                              leftIcon={<Save className="h-4 w-4" />}
                              onClick={() => handleSubmitGrade(submission.id)}
                            >
                              Submit Grade
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Graded Submissions */}
                  {gradedSubmissions.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Graded ({gradedSubmissions.length})</h3>
                      <div className="space-y-2">
                        {gradedSubmissions.map((submission) => (
                          <div key={submission.id} className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">{submission.studentName}</p>
                                <p className="text-sm text-gray-600">{submission.studentId}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-green-600">{submission.score}/{currentAssignment?.maxScore}</p>
                                <Badge variant="success" size="sm">Graded</Badge>
                              </div>
                            </div>
                            {submission.feedback && (
                              <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-green-200">
                                <span className="font-medium">Feedback:</span> {submission.feedback}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pendingSubmissions.length === 0 && gradedSubmissions.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No submissions yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
