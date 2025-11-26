import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { mockData } from '../lib/mockData';
import { sleep } from '../lib/utils';
import type {
  User,
  Student,
  Course,
  Enrollment,
  Payment,
  Announcement,
  ApiResponse,
  PaginatedResponse,
  FinancialStatement,
} from '../types';

class API {
  private client: AxiosInstance;
  private mockDelay: number = 500; // Simulate network delay

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('degreedesk_auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear auth and redirect to login
          localStorage.removeItem('degreedesk_auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Simulate API delay
  private async delay() {
    await sleep(this.mockDelay);
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await this.delay();

    // Mock login logic
    const user = mockData.allUsers.find(u => u.email === email);

    if (!user || password !== 'password123') {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    return {
      success: true,
      data: {
        user,
        token: `mock-jwt-token-${Date.now()}`,
      },
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    await this.delay();
    return { success: true };
  }

  // Student endpoints
  async getStudents(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Student>> {
    await this.delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const students = mockData.students.slice(start, end);

    return {
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total: mockData.students.length,
        totalPages: Math.ceil(mockData.students.length / limit),
      },
    };
  }

  async getStudent(id: string): Promise<ApiResponse<Student>> {
    await this.delay();

    const student = mockData.students.find(s => s.id === id);

    if (!student) {
      return {
        success: false,
        error: 'Student not found',
      };
    }

    return {
      success: true,
      data: student,
    };
  }

  // Course endpoints
  async getCourses(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Course>> {
    await this.delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const courses = mockData.courses.slice(start, end);

    return {
      success: true,
      data: courses,
      pagination: {
        page,
        limit,
        total: mockData.courses.length,
        totalPages: Math.ceil(mockData.courses.length / limit),
      },
    };
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    await this.delay();

    const course = mockData.courses.find(c => c.id === id);

    if (!course) {
      return {
        success: false,
        error: 'Course not found',
      };
    }

    return {
      success: true,
      data: course,
    };
  }

  async enrollInCourse(courseId: string, studentId: string): Promise<ApiResponse<Enrollment>> {
    await this.delay();

    const course = mockData.courses.find(c => c.id === courseId);
    const student = mockData.students.find(s => s.id === studentId);

    if (!course || !student) {
      return {
        success: false,
        error: 'Course or student not found',
      };
    }

    if (course.enrolled >= course.capacity) {
      return {
        success: false,
        error: 'Course is full',
      };
    }

    const enrollment: Enrollment = {
      id: `enrollment-${Date.now()}`,
      studentId,
      courseId,
      course,
      semester: 'Fall 2024',
      status: 'enrolled',
      enrolledAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: enrollment,
      message: 'Successfully enrolled in course',
    };
  }

  async dropCourse(courseId: string, studentId: string): Promise<ApiResponse<null>> {
    await this.delay();

    return {
      success: true,
      message: 'Successfully dropped course',
    };
  }

  // Payment endpoints
  async initiatePayment(data: {
    studentId: string;
    amount: number;
    type: 'tuition' | 'accommodation' | 'library' | 'registration' | 'other';
    mobileNumber?: string;
    paymentProvider?: 'airtel' | 'mtn' | 'zamtel';
  }): Promise<ApiResponse<Payment>> {
    await this.delay();

    const payment: Payment = {
      id: `payment-${Date.now()}`,
      ...data,
      description: `${data.type} payment`,
      status: 'pending',
      paymentMethod: 'mobile_money',
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: payment,
      message: 'Payment initiated. Please complete on your phone.',
    };
  }

  async checkPaymentStatus(paymentId: string): Promise<ApiResponse<Payment>> {
    await this.delay();

    const payment = mockData.payments.find(p => p.id === paymentId);

    if (!payment) {
      return {
        success: false,
        error: 'Payment not found',
      };
    }

    return {
      success: true,
      data: payment,
    };
  }

  async getFinancialStatement(studentId: string): Promise<ApiResponse<FinancialStatement>> {
    await this.delay();

    const studentPayments = mockData.payments.filter(p => p.studentId === studentId);
    const totalPaid = studentPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalFees = 20000; // Mock total fees
    const balance = totalFees - totalPaid;

    const statement: FinancialStatement = {
      studentId,
      totalFees,
      totalPaid,
      balance,
      payments: studentPayments,
      feeBreakdown: [
        {
          type: 'Tuition',
          amount: 12000,
          dueDate: '2024-12-31',
          status: totalPaid >= 12000 ? 'paid' : totalPaid > 0 ? 'partial' : 'unpaid',
        },
        {
          type: 'Accommodation',
          amount: 5000,
          dueDate: '2024-12-31',
          status: totalPaid >= 17000 ? 'paid' : totalPaid > 12000 ? 'partial' : 'unpaid',
        },
        {
          type: 'Library',
          amount: 1000,
          dueDate: '2024-12-31',
          status: totalPaid >= 18000 ? 'paid' : 'unpaid',
        },
        {
          type: 'Registration',
          amount: 2000,
          dueDate: '2024-12-31',
          status: totalPaid >= 20000 ? 'paid' : 'unpaid',
        },
      ],
    };

    return {
      success: true,
      data: statement,
    };
  }

  // Announcement endpoints
  async getAnnouncements(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Announcement>> {
    await this.delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const announcements = mockData.announcements
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(start, end);

    return {
      success: true,
      data: announcements,
      pagination: {
        page,
        limit,
        total: mockData.announcements.length,
        totalPages: Math.ceil(mockData.announcements.length / limit),
      },
    };
  }

  // Enrollment endpoints
  async getStudentEnrollments(studentId: string): Promise<ApiResponse<Enrollment[]>> {
    await this.delay();

    const enrollments = mockData.enrollments.filter(e => e.studentId === studentId);

    return {
      success: true,
      data: enrollments,
    };
  }

  async getCourseEnrollments(courseId: string): Promise<ApiResponse<Enrollment[]>> {
    await this.delay();

    const enrollments = mockData.enrollments.filter(e => e.courseId === courseId);

    return {
      success: true,
      data: enrollments,
    };
  }
}

export const api = new API();
export default api;
