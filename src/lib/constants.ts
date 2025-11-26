// Application constants

export const APP_NAME = 'DegreeDesk';
export const APP_DESCRIPTION = 'Comprehensive University Management System';

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  LECTURER: 'lecturer',
  ADMIN: 'admin',
  FINANCE: 'finance',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'mobile_money',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
} as const;

// Mobile money providers
export const MOBILE_MONEY_PROVIDERS = {
  AIRTEL: 'airtel',
  MTN: 'mtn',
  ZAMTEL: 'zamtel',
} as const;

// Payment statuses
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Enrollment statuses
export const ENROLLMENT_STATUS = {
  ENROLLED: 'enrolled',
  WAITLISTED: 'waitlisted',
  DROPPED: 'dropped',
} as const;

// Semesters
export const SEMESTERS = ['Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025'] as const;

// Academic years
export const ACADEMIC_YEARS = {
  FIRST_YEAR: 1,
  SECOND_YEAR: 2,
  THIRD_YEAR: 3,
  FOURTH_YEAR: 4,
  FIFTH_YEAR: 5,
} as const;

// Days of the week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

// Grade scale
export const GRADE_SCALE = {
  A_PLUS: { min: 95, max: 100, points: 4.0 },
  A: { min: 90, max: 94, points: 4.0 },
  B_PLUS: { min: 85, max: 89, points: 3.5 },
  B: { min: 80, max: 84, points: 3.0 },
  C_PLUS: { min: 75, max: 79, points: 2.5 },
  C: { min: 70, max: 74, points: 2.0 },
  D_PLUS: { min: 65, max: 69, points: 1.5 },
  D: { min: 60, max: 64, points: 1.0 },
  F: { min: 0, max: 59, points: 0.0 },
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Announcement priorities
export const ANNOUNCEMENT_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Fee types
export const FEE_TYPES = {
  TUITION: 'tuition',
  ACCOMMODATION: 'accommodation',
  LIBRARY: 'library',
  REGISTRATION: 'registration',
  OTHER: 'other',
} as const;

// API endpoints (mock)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  STUDENTS: {
    GET_ALL: '/students',
    GET_ONE: '/students/:id',
    CREATE: '/students',
    UPDATE: '/students/:id',
    DELETE: '/students/:id',
  },
  COURSES: {
    GET_ALL: '/courses',
    GET_ONE: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
    DROP: '/courses/:id/drop',
  },
  PAYMENTS: {
    CREATE: '/payments',
    GET_STATUS: '/payments/:id/status',
    GET_STATEMENT: '/payments/statement',
  },
  GRADES: {
    GET_STUDENT_GRADES: '/grades/student/:id',
    GET_TRANSCRIPT: '/grades/transcript/:id',
    SUBMIT_GRADE: '/grades/submit',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'degreedesk_auth_token',
  USER_DATA: 'degreedesk_user_data',
  THEME: 'degreedesk_theme',
  LANGUAGE: 'degreedesk_language',
} as const;

// Departments
export const DEPARTMENTS = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Medicine',
  'Education',
  'Law',
  'Agriculture',
  'Natural Sciences',
  'Social Sciences',
  'Arts and Humanities',
] as const;

// Programs
export const PROGRAMS = [
  'Bachelor of Science in Computer Science',
  'Bachelor of Business Administration',
  'Bachelor of Engineering',
  'Bachelor of Medicine',
  'Bachelor of Education',
  'Bachelor of Laws',
  'Bachelor of Agriculture',
  'Master of Science in Computer Science',
  'Master of Business Administration',
  'PhD in Computer Science',
] as const;
