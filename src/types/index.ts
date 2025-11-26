// User roles
export type UserRole = 'student' | 'lecturer' | 'admin' | 'finance';

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  studentId?: string;  // For students
  staffId?: string;    // For staff
  department?: string;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  hasCompletedOnboarding: boolean;
  createdAt: string;
}

// Student specific
export interface Student extends User {
  role: 'student';
  studentId: string;
  program: string;
  year: number;
  semester: number;
  gpa: number;
  creditsEarned: number;
  creditsRequired: number;
}

// Course interface
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  level: number;
  semester: number;
  lecturerId: string;
  lecturerName: string;
  capacity: number;
  enrolled: number;
  waitlisted: number;
  schedule: CourseSchedule[];
  prerequisites?: string[];
}

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
}

// Enrollment interface
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  course: Course;
  semester: string;
  status: 'enrolled' | 'waitlisted' | 'dropped';
  grade?: string;
  gradePoints?: number;
  enrolledAt: string;
}

// Assignment interface
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  submittedPoints?: number;
  status: 'not-submitted' | 'submitted' | 'graded' | 'late';
  submittedAt?: string;
  feedback?: string;
}

// Payment interface
export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'accommodation' | 'library' | 'registration' | 'other';
  description: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'mobile_money' | 'card' | 'bank_transfer';
  paymentProvider?: 'airtel' | 'mtn' | 'zamtel';
  mobileNumber?: string;
  transactionReference?: string;
  techpayToken?: string;
  createdAt: string;
  completedAt?: string;
}

// Financial statement
export interface FinancialStatement {
  studentId: string;
  totalFees: number;
  totalPaid: number;
  balance: number;
  payments: Payment[];
  feeBreakdown: FeeBreakdown[];
}

export interface FeeBreakdown {
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue';
}

// Announcement interface
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'financial' | 'event';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: UserRole[];
  postedBy: string;
  postedByName: string;
  createdAt: string;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

// Grade interface
export interface Grade {
  courseId: string;
  courseName: string;
  courseCode: string;
  credits: number;
  grade: string;
  gradePoints: number;
  semester: string;
}

// Transcript interface
export interface Transcript {
  studentId: string;
  studentName: string;
  program: string;
  grades: Grade[];
  gpa: number;
  creditsEarned: number;
}

// Report interface
export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'enrollment' | 'financial' | 'academic' | 'attendance';
  generatedBy: string;
  generatedAt: string;
  data: unknown;
}

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Pagination interface
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
