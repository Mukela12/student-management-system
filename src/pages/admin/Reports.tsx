import { useState } from 'react';
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { formatCurrency } from '../../lib/utils';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester' | 'year'>('semester');

  // Mock analytics data
  const kpiData = {
    totalStudents: { current: 500, previous: 446, change: 12.1 },
    totalRevenue: { current: 8500000, previous: 7850000, change: 8.3 },
    averageGPA: { current: 3.25, previous: 3.10, change: 4.8 },
    retentionRate: { current: 94.5, previous: 92.3, change: 2.4 },
  };

  const enrollmentTrends = [
    { semester: 'Fall 2023', students: 420, revenue: 7200000 },
    { semester: 'Spring 2024', students: 446, revenue: 7850000 },
    { semester: 'Fall 2024', students: 500, revenue: 8500000 },
  ];

  const departmentPerformance = [
    {
      department: 'Computer Science',
      students: 145,
      avgGPA: 3.42,
      retention: 96.2,
      revenue: 2465000,
      growth: 15.3
    },
    {
      department: 'Business Administration',
      students: 120,
      avgGPA: 3.28,
      retention: 94.8,
      revenue: 2040000,
      growth: 8.7
    },
    {
      department: 'Engineering',
      students: 95,
      avgGPA: 3.15,
      retention: 92.1,
      revenue: 1615000,
      growth: 12.4
    },
    {
      department: 'Medicine',
      students: 75,
      avgGPA: 3.38,
      retention: 97.3,
      revenue: 1875000,
      growth: 5.6
    },
    {
      department: 'Arts & Humanities',
      students: 65,
      avgGPA: 3.02,
      retention: 89.5,
      revenue: 975000,
      growth: -2.1
    },
  ];

  const coursePopularity = [
    { code: 'CS101', name: 'Introduction to Programming', enrolled: 145, capacity: 150, waitlist: 23 },
    { code: 'BUS201', name: 'Marketing Fundamentals', enrolled: 120, capacity: 120, waitlist: 15 },
    { code: 'ENG301', name: 'Advanced Circuit Design', enrolled: 95, capacity: 100, waitlist: 8 },
    { code: 'MED401', name: 'Clinical Practice', enrolled: 75, capacity: 80, waitlist: 12 },
    { code: 'CS301', name: 'Data Structures & Algorithms', enrolled: 118, capacity: 120, waitlist: 19 },
  ];

  const financialBreakdown = [
    { category: 'Tuition Fees', amount: 6000000, percentage: 70.6, payments: 425 },
    { category: 'Accommodation', amount: 1500000, percentage: 17.6, payments: 312 },
    { category: 'Registration Fees', amount: 700000, percentage: 8.2, payments: 500 },
    { category: 'Library & Other', amount: 300000, percentage: 3.5, payments: 156 },
  ];

  const KPICard = ({
    title,
    current,
    change,
    icon: Icon,
    format = 'number',
    color = 'primary'
  }: {
    title: string;
    current: number;
    change: number;
    icon: React.ElementType;
    format?: 'number' | 'currency' | 'percentage' | 'decimal';
    color?: string;
  }) => {
    const isPositive = change > 0;
    const colorClass = color === 'primary' ? 'primary' : color === 'green' ? 'green' : color === 'blue' ? 'blue' : 'orange';

    const formatValue = (value: number) => {
      switch (format) {
        case 'currency':
          return formatCurrency(value);
        case 'percentage':
          return `${value}%`;
        case 'decimal':
          return value.toFixed(2);
        default:
          return value.toLocaleString();
      }
    };

    return (
      <Card variant="elevated" hover>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className={`text-3xl font-bold text-${colorClass}-600 mt-2`}>
                {formatValue(current)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {isPositive ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-500">vs previous</span>
              </div>
            </div>
            <div className={`p-3 bg-${colorClass}-100 rounded-xl`}>
              <Icon className={`h-6 w-6 text-${colorClass}-600`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive institutional performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <Button
            variant="primary"
            leftIcon={<Download className="h-5 w-5" />}
            onClick={() => alert('Exporting admin report...')}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Students"
          current={kpiData.totalStudents.current}
          change={kpiData.totalStudents.change}
          icon={Users}
          color="primary"
        />
        <KPICard
          title="Total Revenue"
          current={kpiData.totalRevenue.current}
          change={kpiData.totalRevenue.change}
          icon={DollarSign}
          format="currency"
          color="green"
        />
        <KPICard
          title="Average GPA"
          current={kpiData.averageGPA.current}
          change={kpiData.averageGPA.change}
          icon={GraduationCap}
          format="decimal"
          color="blue"
        />
        <KPICard
          title="Retention Rate"
          current={kpiData.retentionRate.current}
          change={kpiData.retentionRate.change}
          icon={TrendingUp}
          format="percentage"
          color="orange"
        />
      </div>

      {/* Enrollment Trends */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
          <CardDescription>Student growth and revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="semester"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#3b82f6"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Students', angle: -90, position: 'insideLeft', style: { fill: '#3b82f6' } }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#22c55e"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`}
                  label={{ value: 'Revenue (ZMW)', angle: 90, position: 'insideRight', style: { fill: '#22c55e' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
                    return [value, 'Students'];
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Students"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Performance Analysis</CardTitle>
              <CardDescription>Comprehensive metrics by academic department</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg GPA</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Retention</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Growth</th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((dept) => (
                  <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary-600" />
                        <span className="font-medium text-gray-900">{dept.department}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">{dept.students}</td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={dept.avgGPA >= 3.3 ? 'success' : dept.avgGPA >= 3.0 ? 'warning' : 'danger'}>
                        {dept.avgGPA.toFixed(2)}
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={dept.retention >= 95 ? 'success' : dept.retention >= 90 ? 'warning' : 'danger'}>
                        {dept.retention.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4 font-medium text-gray-900">
                      {formatCurrency(dept.revenue)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        {dept.growth > 0 ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`font-medium ${dept.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(dept.growth).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Course Popularity & Financial Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Popularity */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Most Popular Courses</CardTitle>
            <CardDescription>High-demand courses with waitlists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePopularity.map((course, idx) => {
                const enrollmentPercentage = (course.enrolled / course.capacity) * 100;
                const isFull = enrollmentPercentage >= 100;

                return (
                  <div key={course.code} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-400">#{idx + 1}</span>
                          <Badge variant="outline" size="sm">{course.code}</Badge>
                          {isFull && <Badge variant="danger" size="sm">Full</Badge>}
                        </div>
                        <p className="font-medium text-gray-900 mt-1">{course.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {course.enrolled}/{course.capacity}
                        </p>
                        <p className="text-xs text-orange-600">{course.waitlist} waitlisted</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isFull ? 'bg-red-600' : enrollmentPercentage >= 80 ? 'bg-orange-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min(enrollmentPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Income distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.category}: ${entry.percentage.toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {financialBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#3b82f6', '#f97316', '#8b5cf6'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: number, _name: string, props: any) => [
                      `${formatCurrency(value)} (${props.payload.percentage.toFixed(1)}%)`,
                      props.payload.category
                    ]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(_value: string, entry: any) => `${entry.payload.category} - ${formatCurrency(entry.payload.amount)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total Revenue</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(financialBreakdown.reduce((sum, item) => sum + item.amount, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
