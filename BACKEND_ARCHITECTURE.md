# DegreeDesk Backend Architecture

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Authentication & Authorization](#authentication--authorization)
6. [TechPay Integration](#techpay-integration)
7. [Deployment Guide](#deployment-guide)
8. [Scalability & Performance](#scalability--performance)

---

## Overview

DegreeDesk backend is a comprehensive university management system API built to support student enrollment, course management, financial transactions, and academic tracking for small to medium-sized Zambian universities.

### Core Requirements
- **Target Scale**: 500-2000 students per institution
- **Multi-tenant**: Support multiple university instances
- **Real-time**: WebSocket support for notifications and live updates
- **Mobile-first**: Optimized for mobile money payments (TechPay)
- **Compliance**: GDPR-compliant data handling

---

## Technology Stack

### Backend Framework
- **Node.js** (v20.19+ LTS)
- **Express.js** (v4.18+)
- **TypeScript** (v5.3+)

### Database
- **PostgreSQL** (v15+) - Primary database
- **Redis** (v7+) - Caching and session storage

### Hosting & Infrastructure
- **Railway.app** - Primary hosting platform
- **PostgreSQL Plugin** - Managed database
- **Redis Plugin** - Managed cache
- **GitHub** - Version control and CI/CD

### Additional Tools
- **Prisma** - ORM for database management
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Socket.io** - Real-time notifications
- **node-cron** - Scheduled tasks (reminders, reports)
- **multer** - File uploads (documents, transcripts)

---

## Database Schema

### Core Entities

#### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'lecturer', 'admin', 'finance')),
    phone_number VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### 2. Students Table
```sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., CS2024-001
    department VARCHAR(100) NOT NULL,
    program VARCHAR(100) NOT NULL,
    year_of_study INTEGER NOT NULL,
    enrollment_date DATE NOT NULL,
    expected_graduation DATE,
    current_gpa DECIMAL(3,2) DEFAULT 0.00,
    total_credits INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'graduated', 'withdrawn')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_department ON students(department);
CREATE INDEX idx_students_status ON students(status);
```

#### 3. Lecturers Table
```sql
CREATE TABLE lecturers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    staff_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., LEC-2024-001
    department VARCHAR(100) NOT NULL,
    specialization VARCHAR(200),
    title VARCHAR(50), -- Dr., Prof., etc.
    hire_date DATE NOT NULL,
    office_location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lecturers_user_id ON lecturers(user_id);
CREATE INDEX idx_lecturers_department ON lecturers(department);
```

#### 4. Courses Table
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g., CS301
    name VARCHAR(200) NOT NULL,
    description TEXT,
    department VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    enrolled_count INTEGER DEFAULT 0,
    waitlist_count INTEGER DEFAULT 0,
    lecturer_id UUID REFERENCES lecturers(id),
    semester VARCHAR(20) NOT NULL, -- Fall 2024, Spring 2025
    year INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_enrolled_capacity CHECK (enrolled_count <= capacity)
);

CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_department ON courses(department);
CREATE INDEX idx_courses_lecturer_id ON courses(lecturer_id);
CREATE INDEX idx_courses_semester ON courses(semester, year);
```

#### 5. Course Schedules Table
```sql
CREATE TABLE course_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50) NOT NULL,
    building VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_schedules_course_id ON course_schedules(course_id);
```

#### 6. Enrollments Table
```sql
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'waitlisted', 'dropped', 'completed')),
    grade VARCHAR(2), -- A, B+, B, C+, C, D, F
    grade_points DECIMAL(3,2), -- 4.00, 3.70, 3.30, etc.
    attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(student_id, course_id)
);

CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

#### 7. Assignments Table
```sql
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    total_points INTEGER NOT NULL,
    due_date TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('homework', 'quiz', 'exam', 'project', 'lab')),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_course_id ON assignments(course_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
```

#### 8. Submissions Table
```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score DECIMAL(5,2),
    feedback TEXT,
    file_url TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'late', 'missing')),
    graded_by UUID REFERENCES lecturers(id),
    graded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(assignment_id, student_id)
);

CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);
```

#### 9. Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZMW',
    type VARCHAR(50) NOT NULL CHECK (type IN ('tuition', 'accommodation', 'library', 'registration', 'other')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('mobile_money', 'card', 'bank_transfer', 'cash')),
    payment_provider VARCHAR(50), -- airtel, mtn, zamtel
    mobile_number VARCHAR(20),
    transaction_reference VARCHAR(100) UNIQUE,
    techpay_token VARCHAR(255),
    processed_at TIMESTAMP,
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_reference ON payments(transaction_reference);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

#### 10. Fee Structures Table
```sql
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program VARCHAR(100) NOT NULL,
    year_of_study INTEGER NOT NULL,
    tuition_fee DECIMAL(10,2) NOT NULL,
    accommodation_fee DECIMAL(10,2),
    library_fee DECIMAL(10,2),
    registration_fee DECIMAL(10,2),
    other_fees DECIMAL(10,2),
    academic_year VARCHAR(20) NOT NULL, -- 2024/2025
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(program, year_of_study, academic_year)
);

CREATE INDEX idx_fee_structures_program ON fee_structures(program);
CREATE INDEX idx_fee_structures_academic_year ON fee_structures(academic_year);
```

#### 11. Attendance Table
```sql
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    notes TEXT,
    marked_by UUID REFERENCES lecturers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(enrollment_id, date)
);

CREATE INDEX idx_attendance_enrollment_id ON attendance(enrollment_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_status ON attendance(status);
```

#### 12. Notifications Table
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('payment', 'grade', 'enrollment', 'announcement', 'reminder', 'system')),
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

### Relationships Diagram
```
users (1) ----< (1) students ----< (*) enrollments >---- (*) courses
users (1) ----< (1) lecturers ----< (*) courses
students (1) ----< (*) payments
courses (1) ----< (*) course_schedules
courses (1) ----< (*) assignments >---- (*) submissions >---- (1) students
enrollments (1) ----< (*) attendance
```

---

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "student@unza.zm",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@unza.zm",
      "firstName": "Mwape",
      "lastName": "Banda",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /api/auth/register
**Description**: Register new user (admin only)

#### POST /api/auth/refresh-token
**Description**: Refresh JWT token

#### POST /api/auth/forgot-password
**Description**: Send password reset email

#### POST /api/auth/reset-password
**Description**: Reset password with token

---

### Student Endpoints

#### GET /api/students/:id
**Description**: Get student profile
**Auth**: Required (student, lecturer, admin)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "studentId": "CS2024-001",
    "user": {
      "firstName": "Mwape",
      "lastName": "Banda",
      "email": "mwape.banda@student.unza.zm"
    },
    "department": "Computer Science",
    "program": "BSc Computer Science",
    "yearOfStudy": 2,
    "currentGPA": 3.45,
    "totalCredits": 45,
    "status": "active"
  }
}
```

#### GET /api/students/:id/courses
**Description**: Get enrolled courses for a student

#### GET /api/students/:id/grades
**Description**: Get all grades for a student

#### GET /api/students/:id/payments
**Description**: Get payment history

#### GET /api/students/:id/transcript
**Description**: Generate and download transcript (PDF)

---

### Course Endpoints

#### GET /api/courses
**Description**: Get all available courses with pagination

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 50)
- `department` (optional)
- `semester` (optional)
- `search` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "code": "CS301",
      "name": "Data Structures & Algorithms",
      "department": "Computer Science",
      "credits": 3,
      "capacity": 120,
      "enrolled": 95,
      "waitlisted": 8,
      "lecturer": {
        "name": "Dr. John Mwanza",
        "email": "j.mwanza@unza.zm"
      },
      "schedules": [
        {
          "day": "Monday",
          "startTime": "08:00",
          "endTime": "10:00",
          "room": "CS-101",
          "building": "Computer Science Building"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 50,
    "totalPages": 1
  }
}
```

#### POST /api/courses/:id/enroll
**Description**: Enroll in a course

**Request Body**:
```json
{
  "studentId": "uuid"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully enrolled in CS301",
  "data": {
    "enrollmentId": "uuid",
    "status": "enrolled",
    "waitlistPosition": null
  }
}
```

#### DELETE /api/courses/:id/drop
**Description**: Drop a course

---

### Payment Endpoints

#### POST /api/payments/initiate
**Description**: Initiate a payment via TechPay

**Request Body**:
```json
{
  "studentId": "uuid",
  "amount": 15000,
  "type": "tuition",
  "paymentMethod": "mobile_money",
  "paymentProvider": "airtel",
  "mobileNumber": "0977123456"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "paymentId": "uuid",
    "transactionReference": "TXN-20241026-001",
    "techpayToken": "tp_xyz123",
    "status": "pending",
    "message": "USSD prompt sent to 0977123456. Please dial *115# to complete payment."
  }
}
```

#### GET /api/payments/:id/status
**Description**: Check payment status

#### POST /api/payments/webhook
**Description**: TechPay webhook callback (verify payment completion)

**Request Body** (from TechPay):
```json
{
  "transactionReference": "TXN-20241026-001",
  "status": "completed",
  "amount": 15000,
  "currency": "ZMW",
  "provider": "airtel",
  "timestamp": "2024-10-26T10:30:00Z",
  "signature": "hmac_signature"
}
```

---

### Lecturer Endpoints

#### GET /api/lecturers/:id/courses
**Description**: Get courses taught by lecturer

#### GET /api/lecturers/:id/students
**Description**: Get all students across lecturer's courses

#### POST /api/lecturers/:id/grades
**Description**: Submit or update grades

**Request Body**:
```json
{
  "enrollmentId": "uuid",
  "grade": "A",
  "gradePoints": 4.00
}
```

#### POST /api/lecturers/:id/attendance
**Description**: Mark attendance for a class

**Request Body**:
```json
{
  "courseId": "uuid",
  "date": "2024-10-26",
  "attendance": [
    { "studentId": "uuid", "status": "present" },
    { "studentId": "uuid", "status": "absent" }
  ]
}
```

---

### Admin Endpoints

#### GET /api/admin/analytics
**Description**: Get institutional analytics

**Response**:
```json
{
  "success": true,
  "data": {
    "totalStudents": 500,
    "totalRevenue": 8500000,
    "averageGPA": 3.25,
    "retentionRate": 94.5,
    "enrollmentByDepartment": [...],
    "revenueByMonth": [...]
  }
}
```

#### POST /api/admin/students
**Description**: Create new student

#### PUT /api/admin/students/:id
**Description**: Update student information

#### POST /api/admin/courses
**Description**: Create new course

#### PUT /api/admin/courses/:id
**Description**: Update course information

---

### Finance Endpoints

#### GET /api/finance/reports
**Description**: Get financial reports

#### GET /api/finance/reconciliation
**Description**: Get reconciliation data

#### POST /api/finance/refund
**Description**: Process a refund

---

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "student",
  "iat": 1698307200,
  "exp": 1698393600
}
```

### Role-Based Access Control (RBAC)

| Endpoint | Student | Lecturer | Admin | Finance |
|----------|---------|----------|-------|---------|
| GET /api/courses | ✅ | ✅ | ✅ | ✅ |
| POST /api/courses/:id/enroll | ✅ | ❌ | ✅ | ❌ |
| POST /api/lecturers/:id/grades | ❌ | ✅ | ✅ | ❌ |
| GET /api/admin/analytics | ❌ | ❌ | ✅ | ❌ |
| GET /api/finance/reports | ❌ | ❌ | ✅ | ✅ |

### Middleware Implementation
```typescript
// middleware/auth.ts
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage
app.get('/api/admin/analytics', authenticate, authorize('admin'), getAnalytics);
```

---

## TechPay Integration

### Overview
TechPay is a Zambian mobile money aggregator supporting Airtel Money, MTN Mobile Money, and Zamtel Kwacha.

### Integration Flow

1. **Payment Initiation**
   - Student selects payment amount and provider
   - Frontend calls `POST /api/payments/initiate`
   - Backend creates payment record with status `pending`
   - Backend calls TechPay API to generate token
   - TechPay sends USSD prompt to user's phone

2. **User Authorization**
   - User dials USSD code (e.g., `*115#`)
   - User enters PIN to authorize payment
   - Mobile money provider processes transaction

3. **Webhook Callback**
   - TechPay sends POST request to `/api/payments/webhook`
   - Backend verifies signature (HMAC-SHA256)
   - Backend updates payment status to `completed` or `failed`
   - Backend sends notification to student

4. **Status Polling** (fallback)
   - Frontend polls `GET /api/payments/:id/status` every 5 seconds
   - Timeout after 5 minutes

### TechPay API Integration

#### Generate Payment Token
```typescript
// services/techpay.ts
import axios from 'axios';
import crypto from 'crypto';

interface TechPayPaymentRequest {
  amount: number;
  currency: string;
  provider: 'airtel' | 'mtn' | 'zamtel';
  mobileNumber: string;
  reference: string;
  callbackUrl: string;
}

export async function initiateTechPayPayment(
  paymentData: TechPayPaymentRequest
): Promise<{ token: string; message: string }> {
  const signature = crypto
    .createHmac('sha256', process.env.TECHPAY_SECRET_KEY!)
    .update(JSON.stringify(paymentData))
    .digest('hex');

  const response = await axios.post(
    `${process.env.TECHPAY_API_URL}/v1/payments/initiate`,
    paymentData,
    {
      headers: {
        'Authorization': `Bearer ${process.env.TECHPAY_API_KEY}`,
        'X-Signature': signature,
        'Content-Type': 'application/json'
      }
    }
  );

  return {
    token: response.data.token,
    message: response.data.message
  };
}
```

#### Verify Webhook Signature
```typescript
export function verifyTechPayWebhook(
  payload: any,
  signature: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.TECHPAY_SECRET_KEY!)
    .update(JSON.stringify(payload))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### Environment Variables
```bash
TECHPAY_API_URL=https://api.techpay.co.zm
TECHPAY_API_KEY=your_api_key
TECHPAY_SECRET_KEY=your_secret_key
TECHPAY_WEBHOOK_URL=https://yourdomain.com/api/payments/webhook
```

---

## Deployment Guide

### Railway Setup

1. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Initialize project
   railway init
   ```

2. **Add PostgreSQL Plugin**
   - Go to Railway dashboard
   - Click "New" → "Database" → "PostgreSQL"
   - Note the connection string: `DATABASE_URL`

3. **Add Redis Plugin**
   - Click "New" → "Database" → "Redis"
   - Note the connection string: `REDIS_URL`

4. **Environment Variables**
   ```bash
   # Set in Railway dashboard
   NODE_ENV=production
   PORT=8080
   DATABASE_URL=postgresql://...
   REDIS_URL=redis://...
   JWT_SECRET=your_random_secret_key_min_32_chars
   JWT_EXPIRES_IN=24h
   TECHPAY_API_URL=https://api.techpay.co.zm
   TECHPAY_API_KEY=your_api_key
   TECHPAY_SECRET_KEY=your_secret_key
   TECHPAY_WEBHOOK_URL=https://degreedesk-api.up.railway.app/api/payments/webhook
   CORS_ORIGIN=https://degreedesk.netlify.app
   ```

5. **Deploy**
   ```bash
   # Connect GitHub repo to Railway
   # Or deploy manually
   railway up
   ```

### Database Migrations

```bash
# Install Prisma CLI
npm install -D prisma

# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy
```

### Prisma Schema Example
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String    @map("first_name")
  lastName      String    @map("last_name")
  role          Role
  phoneNumber   String?   @map("phone_number")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  student       Student?
  lecturer      Lecturer?
  notifications Notification[]

  @@map("users")
}

enum Role {
  student
  lecturer
  admin
  finance
}

// ... other models
```

---

## Scalability & Performance

### Caching Strategy
```typescript
// Cache frequently accessed data in Redis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache course list for 5 minutes
async function getCourses(page: number, limit: number) {
  const cacheKey = `courses:page:${page}:limit:${limit}`;

  // Try to get from cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from database
  const courses = await prisma.course.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: { lecturer: true, schedules: true }
  });

  // Store in cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(courses));

  return courses;
}
```

### Database Optimization
- **Indexes**: Add indexes on frequently queried columns (see schema above)
- **Connection Pooling**: Use Prisma's connection pooling
- **Query Optimization**: Use `select` to fetch only needed fields
- **Pagination**: Always paginate large result sets

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);
```

### Background Jobs
```typescript
import cron from 'node-cron';

// Send payment reminders daily at 9 AM
cron.schedule('0 9 * * *', async () => {
  const studentsWithPendingPayments = await prisma.student.findMany({
    where: {
      payments: {
        some: { status: 'pending' }
      }
    },
    include: { user: true }
  });

  for (const student of studentsWithPendingPayments) {
    await sendPaymentReminder(student);
  }
});
```

### Monitoring & Logging
- **Error Tracking**: Use Sentry or Railway logs
- **Performance**: Monitor API response times
- **Database**: Track slow queries with Prisma logging

---

## Security Best Practices

1. **Password Security**
   - Use bcrypt with salt rounds >= 10
   - Enforce strong password policy (min 8 chars, uppercase, lowercase, number)

2. **SQL Injection Prevention**
   - Use Prisma ORM (parameterized queries)
   - Never concatenate user input into SQL queries

3. **XSS Prevention**
   - Sanitize all user inputs
   - Use Content Security Policy headers

4. **CSRF Protection**
   - Use CSRF tokens for state-changing operations
   - Verify Origin/Referer headers

5. **HTTPS Only**
   - Railway provides free SSL certificates
   - Redirect all HTTP traffic to HTTPS

6. **Sensitive Data**
   - Never log passwords or payment details
   - Encrypt sensitive data at rest
   - Use environment variables for secrets

---

## Testing Strategy

### Unit Tests
```typescript
// tests/services/payment.test.ts
import { initiateTechPayPayment } from '../services/techpay';

describe('TechPay Payment Service', () => {
  it('should generate payment token', async () => {
    const result = await initiateTechPayPayment({
      amount: 15000,
      currency: 'ZMW',
      provider: 'airtel',
      mobileNumber: '0977123456',
      reference: 'TXN-TEST-001',
      callbackUrl: 'https://example.com/webhook'
    });

    expect(result.token).toBeDefined();
    expect(result.message).toContain('USSD');
  });
});
```

### Integration Tests
```typescript
// tests/integration/enrollment.test.ts
import request from 'supertest';
import app from '../app';

describe('Course Enrollment', () => {
  it('should enroll student in course', async () => {
    const response = await request(app)
      .post('/api/courses/cs301-uuid/enroll')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ studentId: 'student-uuid' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

---

## Next Steps

1. **Set up Railway project** and connect PostgreSQL
2. **Initialize Express + TypeScript** backend
3. **Implement Prisma schema** and run migrations
4. **Build authentication endpoints** (login, register)
5. **Implement core API endpoints** (students, courses, enrollments)
6. **Integrate TechPay** for mobile money payments
7. **Add real-time notifications** with Socket.io
8. **Deploy to Railway** and test with frontend
9. **Set up monitoring** and error tracking
10. **Performance optimization** and load testing

---

## Resources

- [Railway Documentation](https://docs.railway.app/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [TechPay API Docs](https://docs.techpay.co.zm) (placeholder - use actual docs)

---

**Document Version**: 1.0
**Last Updated**: October 26, 2024
**Maintained By**: DegreeDesk Development Team
