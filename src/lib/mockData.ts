import { User, Student, Course, Enrollment, Payment, Announcement, Grade } from '../types';

// Zambian names for realistic data
const zambianFirstNames = [
  'Mwape', 'Chanda', 'Chilufya', 'Mutale', 'Bwalya', 'Kabwe', 'Musonda', 'Chipampe',
  'Natasha', 'Mercy', 'Grace', 'Faith', 'Moses', 'Joseph', 'Emmanuel', 'Daniel',
  'Sarah', 'Ruth', 'Esther', 'Mary', 'John', 'Peter', 'Paul', 'David',
  'Temwani', 'Taonga', 'Thandiwe', 'Tabeth', 'Chileshe', 'Chimwemwe', 'Kondwani', 'Chipo',
  'Mukuka', 'Mulenga', 'Ng\'andu', 'Nkole', 'Nchimunya', 'Nsofwa', 'Monde', 'Mulwanda'
];

const zambianLastNames = [
  'Banda', 'Phiri', 'Tembo', 'Zulu', 'Mwale', 'Sakala', 'Mbewe', 'Lungu',
  'Chanda', 'Kabwe', 'Mulenga', 'Siame', 'Sichone', 'Sikazwe', 'Simpemba', 'Simwinga',
  'Mutale', 'Musonda', 'Mumba', 'Mwanza', 'Katongo', 'Kalaba', 'Kampamba', 'Kangwa',
  'Nkhata', 'Nyirenda', 'Phiri', 'Chibesa', 'Chibuye', 'Chikwanda', 'Chilufya', 'Chimfwembe'
];

const departments = [
  'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
  'Education', 'Law', 'Agriculture', 'Natural Sciences', 'Social Sciences', 'Arts and Humanities'
];

const programs = [
  'Bachelor of Science in Computer Science',
  'Bachelor of Business Administration',
  'Bachelor of Engineering (Civil)',
  'Bachelor of Engineering (Electrical)',
  'Bachelor of Medicine and Surgery',
  'Bachelor of Education',
  'Bachelor of Laws',
  'Bachelor of Agriculture',
  'Bachelor of Science in Mathematics',
  'Bachelor of Arts in Economics'
];

// Helper functions
function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStudentId(): string {
  const year = randomInt(2021, 2024);
  const number = String(randomInt(1000, 9999));
  return `${year}${number}`;
}

function generateStaffId(): string {
  const prefix = 'STF';
  const number = String(randomInt(1000, 9999));
  return `${prefix}${number}`;
}

function generateZambianMobile(): string {
  const prefix = randomItem(['097', '096', '077', '076']);
  const number = String(randomInt(1000000, 9999999));
  return `${prefix}${number}`;
}

// Generate mock students
export function generateMockStudents(count: number = 500): Student[] {
  const students: Student[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = randomItem(zambianFirstNames);
    const lastName = randomItem(zambianLastNames);
    const year = randomInt(1, 4);
    const program = randomItem(programs);
    const department = randomItem(departments);

    students.push({
      id: `student-${i + 1}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.unza.zm`,
      firstName,
      lastName,
      role: 'student',
      studentId: generateStudentId(),
      program,
      department,
      year,
      semester: randomInt(1, 2),
      gpa: parseFloat((2.5 + Math.random() * 1.5).toFixed(2)),
      creditsEarned: year * 30 + randomInt(0, 30),
      creditsRequired: 120,
      phone: generateZambianMobile(),
      isEmailVerified: Math.random() > 0.1,
      hasCompletedOnboarding: Math.random() > 0.05,
      createdAt: new Date(2021 + year - 1, randomInt(0, 11), randomInt(1, 28)).toISOString(),
    });
  }

  return students;
}

// Generate mock lecturers
export function generateMockLecturers(count: number = 20): User[] {
  const lecturers: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = randomItem(zambianFirstNames);
    const lastName = randomItem(zambianLastNames);
    const department = randomItem(departments);

    lecturers.push({
      id: `lecturer-${i + 1}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@unza.zm`,
      firstName,
      lastName,
      role: 'lecturer',
      staffId: generateStaffId(),
      department,
      phone: generateZambianMobile(),
      isEmailVerified: true,
      hasCompletedOnboarding: true,
      createdAt: new Date(2015 + randomInt(0, 8), randomInt(0, 11), randomInt(1, 28)).toISOString(),
    });
  }

  return lecturers;
}

// Generate mock courses
export function generateMockCourses(lecturers: User[], count: number = 50): Course[] {
  const courses: Course[] = [];

  const courseNames = [
    'Introduction to Programming', 'Data Structures and Algorithms', 'Database Systems',
    'Web Development', 'Software Engineering', 'Computer Networks', 'Operating Systems',
    'Artificial Intelligence', 'Machine Learning', 'Cybersecurity',
    'Microeconomics', 'Macroeconomics', 'Financial Accounting', 'Marketing Management',
    'Business Statistics', 'Organizational Behavior', 'Strategic Management',
    'Circuit Analysis', 'Digital Electronics', 'Control Systems', 'Power Systems',
    'Structural Analysis', 'Hydraulics', 'Geotechnical Engineering',
    'Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Surgery',
    'Educational Psychology', 'Curriculum Development', 'Teaching Methods',
    'Constitutional Law', 'Criminal Law', 'Contract Law', 'Property Law',
    'Crop Production', 'Animal Husbandry', 'Soil Science', 'Agricultural Economics',
    'Calculus I', 'Calculus II', 'Linear Algebra', 'Differential Equations',
    'General Chemistry', 'Organic Chemistry', 'Physics I', 'Physics II',
    'Sociology', 'Political Science', 'Development Studies', 'African History'
  ];

  const rooms = ['LH1', 'LH2', 'LH3', 'R101', 'R102', 'R201', 'R202', 'LAB1', 'LAB2', 'LAB3'];
  const buildings = ['Main Block', 'Science Building', 'Engineering Block', 'Library Block'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
  ];

  for (let i = 0; i < Math.min(count, courseNames.length); i++) {
    const lecturer = randomItem(lecturers);
    const level = randomInt(1, 4) * 100;
    const credits = randomItem([3, 4, 5]);
    const capacity = randomInt(30, 100);
    const enrolled = randomInt(15, capacity - 5);

    const firstDay = randomItem(days);
    const schedule = [
      {
        day: firstDay,
        ...randomItem(times),
        room: randomItem(rooms),
        building: randomItem(buildings),
      },
      {
        day: randomItem(days.filter(d => d !== firstDay)),
        ...randomItem(times),
        room: randomItem(rooms),
        building: randomItem(buildings),
      },
    ];

    courses.push({
      id: `course-${i + 1}`,
      code: `${randomItem(departments).substring(0, 3).toUpperCase()}${level + randomInt(1, 9)}`,
      name: courseNames[i],
      description: `An comprehensive course covering ${courseNames[i].toLowerCase()} with practical applications.`,
      credits,
      department: lecturer.department || randomItem(departments),
      level: Math.floor(level / 100),
      semester: randomInt(1, 2),
      lecturerId: lecturer.id,
      lecturerName: `${lecturer.firstName} ${lecturer.lastName}`,
      capacity,
      enrolled,
      waitlisted: enrolled >= capacity - 5 ? randomInt(0, 15) : 0,
      schedule,
    });
  }

  return courses;
}

// Generate mock payments
export function generateMockPayments(students: Student[], count: number = 100): Payment[] {
  const payments: Payment[] = [];
  const providers: Array<'airtel' | 'mtn' | 'zamtel'> = ['airtel', 'mtn', 'zamtel'];
  const types: Array<'tuition' | 'accommodation' | 'library' | 'registration'> =
    ['tuition', 'accommodation', 'library', 'registration'];

  for (let i = 0; i < count; i++) {
    const student = randomItem(students);
    const type = randomItem(types);
    const amount = type === 'tuition' ? randomInt(5000, 15000) :
                   type === 'accommodation' ? randomInt(2000, 5000) :
                   type === 'library' ? randomInt(100, 500) :
                   randomInt(500, 1000);
    const status: 'pending' | 'completed' | 'failed' =
      Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'pending' : 'failed';

    payments.push({
      id: `payment-${i + 1}`,
      studentId: student.id,
      amount,
      type,
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} payment`,
      status,
      paymentMethod: 'mobile_money',
      paymentProvider: randomItem(providers),
      mobileNumber: student.phone,
      transactionReference: status === 'completed' ? `TXN${randomInt(100000, 999999)}` : undefined,
      createdAt: new Date(2024, randomInt(0, 11), randomInt(1, 28)).toISOString(),
      completedAt: status === 'completed' ?
        new Date(2024, randomInt(0, 11), randomInt(1, 28)).toISOString() : undefined,
    });
  }

  return payments;
}

// Generate mock announcements
export function generateMockAnnouncements(count: number = 20): Announcement[] {
  const announcements: Announcement[] = [];

  const titles = [
    'Registration Deadline Extended',
    'Mid-Semester Examinations Schedule',
    'Library Renovation Notice',
    'New Course Offerings for Next Semester',
    'Fee Payment Reminder',
    'Graduation Ceremony Information',
    'Student Council Elections',
    'Campus Maintenance Notice',
    'Guest Lecturer Series',
    'Sports Day Announcement',
    'Career Fair 2025',
    'Scholarship Opportunities',
    'Health Services Update',
    'Academic Calendar Changes',
    'IT System Maintenance',
    'Student Accommodation Applications',
    'Research Grant Opportunities',
    'Community Service Initiative',
    'Holiday Schedule',
    'Academic Advising Week'
  ];

  for (let i = 0; i < Math.min(count, titles.length); i++) {
    const type = randomItem(['general', 'academic', 'financial', 'event'] as const);
    const priority = randomItem(['low', 'medium', 'high', 'urgent'] as const);

    announcements.push({
      id: `announcement-${i + 1}`,
      title: titles[i],
      content: `Important information regarding ${titles[i].toLowerCase()}. Please check your email for more details or contact the registrar's office.`,
      type,
      priority,
      targetAudience: ['student', 'lecturer'],
      postedBy: 'registrar-1',
      postedByName: 'Registrar Office',
      createdAt: new Date(2024, randomInt(8, 11), randomInt(1, 28)).toISOString(),
    });
  }

  return announcements;
}

// Generate mock enrollments
export function generateMockEnrollments(
  students: Student[],
  courses: Course[],
  count: number = 1000
): Enrollment[] {
  const enrollments: Enrollment[] = [];

  for (let i = 0; i < count; i++) {
    const student = randomItem(students);
    const course = randomItem(courses);
    const status = randomItem(['enrolled', 'enrolled', 'enrolled', 'waitlisted'] as const);
    const grade = Math.random() > 0.3 ? randomItem(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']) : undefined;

    enrollments.push({
      id: `enrollment-${i + 1}`,
      studentId: student.id,
      courseId: course.id,
      course,
      semester: 'Fall 2024',
      status,
      grade,
      gradePoints: grade ? { 'A+': 4.0, 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D': 1.0, 'F': 0 }[grade] : undefined,
      enrolledAt: new Date(2024, 7, randomInt(1, 31)).toISOString(),
    });
  }

  return enrollments;
}

// Initialize all mock data
export function initializeMockData() {
  const students = generateMockStudents(500);
  const lecturers = generateMockLecturers(20);
  const courses = generateMockCourses(lecturers, 50);
  const payments = generateMockPayments(students, 200);
  const announcements = generateMockAnnouncements(20);
  const enrollments = generateMockEnrollments(students, courses, 1000);

  return {
    students,
    lecturers,
    courses,
    payments,
    announcements,
    enrollments,
    allUsers: [...students, ...lecturers],
  };
}

// Export singleton instance
export const mockData = initializeMockData();
