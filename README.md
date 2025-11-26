# DegreeDesk - University Management System

A modern, comprehensive university portal SaaS for Zambian universities.

## Project Overview

DegreeDesk is a professional university management system designed specifically for small to medium-sized universities in Zambia. It provides a complete solution for students, lecturers, administrators, and finance staff to manage all university operations efficiently.

### Key Features

- **Student Portal**: Course registration, grades, transcripts, assignments, fee payments
- **Lecturer Portal**: Course management, grading, attendance tracking, materials upload
- **Admin Portal**: Student/course management, reports, institutional analytics
- **Finance Portal**: Payment tracking, reconciliation, financial reports
- **Mobile Money Integration**: TechPay integration for Airtel, MTN, Zamtel payments
- **Modern UI/UX**: Professional, accessible design following WCAG 2.1 AA standards
- **PWA Support**: Offline-first, mobile-optimized progressive web app
- **Real-time Updates**: Mock data with realistic API simulation

## Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library (Button, Card, Input, Badge, Avatar, etc.)
- **State Management**: Zustand
- **Routing**: React Router
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React (professional icons, no emojis)
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Design System
- **Primary Color**: Blue (`#1e3a8a` to `#3b82f6`) - matching graduation cap logo
- **Typography**: System font stack (Apple-first)
- **Components**: Glass morphism, gradient effects, smooth animations
- **Accessibility**: WCAG 2.1 Level AA compliant

## Prerequisites

**IMPORTANT**: This project requires Node.js version **20.19+** or **22.12+**

Check your Node.js version:
```bash
node --version
```

If you need to upgrade:
- Using nvm: `nvm install 22 && nvm use 22`
- Or download from: https://nodejs.org/

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server (requires Node.js 20.19+ or 22.12+)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Demo Credentials

The system includes mock data for 500 students and 50 courses. Use these credentials to explore different roles:

#### Student Account
- **Email**: `student@unza.zm`
- **Password**: `password`
- **Features**: Course registration, grades, payments, schedule

#### Lecturer Account
- **Email**: `lecturer@unza.zm`
- **Password**: `password`
- **Features**: Course management, grading, attendance, analytics

#### Admin Account
- **Email**: `admin@unza.zm`
- **Password**: `password`
- **Features**: Student/course/lecturer management, institutional analytics

#### Finance Account
- **Email**: `finance@unza.zm`
- **Password**: `password`
- **Features**: Payment management, financial reports, reconciliation

## Project Structure

```
degreedesk-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── layout/             # Layout components (Desktop/Mobile)
│   │   ├── features/           # Feature-specific components
│   │   └── shared/             # Shared components
│   ├── stores/                 # Zustand state management
│   ├── services/               # API service layer (mock)
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   ├── lib/                    # Utilities and helpers
│   │   ├── utils.ts           # Common utility functions
│   │   └── constants.ts       # Application constants
│   ├── assets/                 # Images, fonts, etc.
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles + Tailwind
├── public/                     # Public assets
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Development Progress

### ✅ Completed (Phase 1 & 2)
- [x] Project setup with Vite + React + TypeScript
- [x] Tailwind CSS configuration with DegreeDesk design system
- [x] Base UI component library (Button, Card, Input, Badge, Avatar, LoadingSpinner)
- [x] TypeScript types and interfaces (20+ interfaces)
- [x] Utility functions (currency formatting, date formatting, mobile validation)
- [x] Application constants (100+ constants)
- [x] React Router setup with role-based routing
- [x] Zustand stores for authentication and state management
- [x] Mock data architecture (500 students, 50 courses, 200 payments)
- [x] Mock API service layer with realistic delays
- [x] Authentication pages (Login with role-based redirect)
- [x] Student Portal (Dashboard, Course Registration, Grades, Payments, My Courses)
- [x] Lecturer Portal (Dashboard, Analytics & Reports)
- [x] Admin Portal (Dashboard, Analytics & Reports)
- [x] Finance Portal (Dashboard, Reports & Reconciliation)
- [x] Mobile Money Integration (TechPay payment flow)
- [x] Separate Desktop/Mobile layouts (Sidebar + Bottom Navigation)
- [x] Reports and Analytics dashboards (Admin, Finance, Lecturer)
- [x] Virtual waiting room for course enrollment
- [x] Comprehensive backend architecture documentation

### 📋 Upcoming (Phase 3)
- [ ] Backend implementation (Node.js + PostgreSQL + Railway)
- [ ] Real TechPay API integration
- [ ] File uploads (transcripts, documents)
- [ ] Real-time notifications (Socket.io)
- [ ] Email notifications for payments and grades
- [ ] Advanced search and filtering
- [ ] Student profile management pages
- [ ] Lecturer course content management
- [ ] Admin student/course CRUD operations
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Production deployment

## Design Standards

This project follows the agency standards:

### UI/UX Principles
- **Inline-first interactions**: Minimal use of modals
- **Professional icons**: Lucide React only (NO emojis in production)
- **Accessibility**: WCAG 2.1 AA compliance
- **Smooth animations**: 300ms transitions with easing
- **Responsive design**: Mobile-first approach
- **Separate mobile/desktop components**: Following PWA best practices

### Code Quality
- **TypeScript strict mode**: No `any` types
- **Component organization**: Atomic design principles
- **Error handling**: Comprehensive try-catch with user-friendly messages
- **Loading states**: Skeleton screens and spinners
- **Consistent naming**: PascalCase for components, camelCase for utilities

## Utility Functions

### Currency Formatting
```typescript
formatCurrency(5000) // "ZMW 5,000.00"
```

### Mobile Number Validation
```typescript
validateZambianMobile("0977123456") // true
validateZambianMobile("0967123456") // true
validateZambianMobile("1234567890") // false
```

### Date Formatting
```typescript
formatDate(new Date()) // "26 November 2025"
formatDateTime(new Date()) // "26 Nov 2025, 14:30"
```

## UI Components

### Button
```tsx
<Button variant="primary" size="md" isLoading={false} fullWidth={false}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
Sizes: `sm`, `md`, `lg`, `xl`

### Card
```tsx
<Card variant="default" hover padding="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

Variants: `default`, `glass`, `elevated`, `flat`, `gradient`

### Input
```tsx
<Input
  label="Email"
  type="email"
  error="Error message"
  leftIcon={<MailIcon />}
  showPasswordToggle
/>
```

## Deployment

### Netlify (Frontend)
```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Backend Implementation

For complete backend implementation guide, see [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)

The backend documentation includes:
- Complete database schema (PostgreSQL with Prisma)
- API endpoint specifications
- TechPay payment integration guide
- Railway deployment instructions
- Authentication & authorization patterns
- Scalability and performance optimization
- Security best practices

## Key Features

### Virtual Waiting Room
When courses approach capacity (within 5 seats), a virtual waiting room notice appears to ensure fair enrollment processing.

### Mobile Money Payments
Students can pay fees using TechPay integration with:
- **Airtel Money** - Dial `*115#`
- **MTN Mobile Money** - Dial `*303#`
- **Zamtel Kwacha** - Dial `*555#`

### Analytics Dashboards
Comprehensive analytics for:
- **Admin**: Enrollment trends, department performance, revenue tracking
- **Finance**: Payment analytics, collection rates, reconciliation
- **Lecturer**: Course performance, student progress, at-risk students

## License

Proprietary - Built for Zambian universities

## Contact

For questions or support, contact the development team.

---

**Built with ❤️ for Zambian Education**
