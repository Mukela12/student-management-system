import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Smartphone,
  Calendar,
  Download,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { formatCurrency } from '../../lib/utils';

export default function FinanceReports() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tuition' | 'accommodation' | 'other'>('all');

  // Mock financial analytics data
  const revenueMetrics = {
    totalCollected: { current: 8500000, previous: 7850000, change: 8.3 },
    pendingPayments: { current: 2500000, previous: 2850000, change: -12.3 },
    collectionRate: { current: 77.3, previous: 73.4, change: 5.3 },
    averageTransaction: { current: 28150, previous: 26200, change: 7.4 },
  };

  const paymentMethodPerformance = [
    {
      provider: 'Airtel Money',
      transactions: 145,
      amount: 4080000,
      percentage: 48.0,
      successRate: 96.5,
      avgProcessingTime: '45s',
      fees: 40800
    },
    {
      provider: 'MTN Mobile Money',
      transactions: 98,
      amount: 2720000,
      percentage: 32.0,
      successRate: 94.2,
      avgProcessingTime: '52s',
      fees: 27200
    },
    {
      provider: 'Zamtel Kwacha',
      transactions: 60,
      amount: 1700000,
      percentage: 20.0,
      successRate: 91.7,
      avgProcessingTime: '1m 8s',
      fees: 17000
    },
  ];

  const monthlyTrends = [
    { month: 'Aug 2024', collected: 7200000, pending: 2800000, failed: 120000, collectionRate: 71.2 },
    { month: 'Sep 2024', collected: 7850000, pending: 2850000, failed: 95000, collectionRate: 73.4 },
    { month: 'Oct 2024', collected: 8500000, pending: 2500000, failed: 80000, collectionRate: 77.3 },
  ];

  const feeCategories = [
    {
      category: 'Tuition Fees',
      collected: 6000000,
      pending: 1800000,
      total: 7800000,
      students: 425,
      collectionRate: 76.9
    },
    {
      category: 'Accommodation',
      collected: 1500000,
      pending: 450000,
      total: 1950000,
      students: 312,
      collectionRate: 76.9
    },
    {
      category: 'Registration',
      collected: 700000,
      pending: 150000,
      total: 850000,
      students: 500,
      collectionRate: 82.4
    },
    {
      category: 'Library & Other',
      collected: 300000,
      pending: 100000,
      total: 400000,
      students: 156,
      collectionRate: 75.0
    },
  ];

  const recentReconciliation = [
    {
      date: '2024-10-25',
      transactions: 45,
      expectedAmount: 1250000,
      receivedAmount: 1250000,
      status: 'matched' as const,
      discrepancy: 0
    },
    {
      date: '2024-10-24',
      transactions: 52,
      expectedAmount: 1480000,
      receivedAmount: 1465000,
      status: 'discrepancy' as const,
      discrepancy: -15000
    },
    {
      date: '2024-10-23',
      transactions: 38,
      expectedAmount: 980000,
      receivedAmount: 980000,
      status: 'matched' as const,
      discrepancy: 0
    },
    {
      date: '2024-10-22',
      transactions: 41,
      expectedAmount: 1120000,
      receivedAmount: 1135000,
      status: 'discrepancy' as const,
      discrepancy: 15000
    },
  ];

  const failedPayments = [
    { reason: 'Insufficient Balance', count: 42, amount: 680000, percentage: 52.5 },
    { reason: 'Network Timeout', count: 18, amount: 285000, percentage: 22.5 },
    { reason: 'Invalid Account', count: 12, amount: 156000, percentage: 15.0 },
    { reason: 'User Cancelled', count: 8, amount: 130000, percentage: 10.0 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Detailed payment analytics and reconciliation</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button
            variant="outline"
            leftIcon={<FileText className="h-5 w-5" />}
            onClick={() => alert('Generating financial statement...')}
          >
            Generate Statement
          </Button>
          <Button
            variant="primary"
            leftIcon={<Download className="h-5 w-5" />}
            onClick={() => alert('Exporting financial data...')}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Collected</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {formatCurrency(revenueMetrics.totalCollected.current)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{revenueMetrics.totalCollected.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {formatCurrency(revenueMetrics.pendingPayments.current)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    {revenueMetrics.pendingPayments.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {revenueMetrics.collectionRate.current.toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{revenueMetrics.collectionRate.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                <p className="text-3xl font-bold text-primary-600 mt-2">
                  {formatCurrency(revenueMetrics.averageTransaction.current)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{revenueMetrics.averageTransaction.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Performance */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Payment Method Performance</CardTitle>
          <CardDescription>Detailed analytics by mobile money provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Provider</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Transactions</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Market Share</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Success Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Time</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Fees Paid</th>
                </tr>
              </thead>
              <tbody>
                {paymentMethodPerformance.map((method) => (
                  <tr key={method.provider} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary-600" />
                        <span className="font-medium text-gray-900">{method.provider}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">{method.transactions}</td>
                    <td className="text-right py-4 px-4 font-medium text-gray-900">
                      {formatCurrency(method.amount)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${method.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12">{method.percentage.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={method.successRate >= 95 ? 'success' : method.successRate >= 90 ? 'warning' : 'danger'}>
                        {method.successRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-4 text-sm text-gray-600">
                      {method.avgProcessingTime}
                    </td>
                    <td className="text-right py-4 px-4 text-sm text-red-600">
                      -{formatCurrency(method.fees)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-900">Total</td>
                  <td className="text-right py-4 px-4 font-semibold text-gray-900">
                    {paymentMethodPerformance.reduce((sum, m) => sum + m.transactions, 0)}
                  </td>
                  <td className="text-right py-4 px-4 font-semibold text-gray-900">
                    {formatCurrency(paymentMethodPerformance.reduce((sum, m) => sum + m.amount, 0))}
                  </td>
                  <td className="text-right py-4 px-4 font-semibold text-gray-900">100%</td>
                  <td colSpan={2}></td>
                  <td className="text-right py-4 px-4 font-semibold text-red-600">
                    -{formatCurrency(paymentMethodPerformance.reduce((sum, m) => sum + m.fees, 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends & Fee Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Trends */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly collection performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrends.map((month, idx) => {
                const isLatest = idx === monthlyTrends.length - 1;
                const totalRevenue = month.collected + month.pending + month.failed;
                const collectedPercentage = (month.collected / totalRevenue) * 100;

                return (
                  <div key={month.month} className={isLatest ? 'p-4 bg-green-50 rounded-xl' : ''}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">{month.month}</span>
                        {isLatest && <Badge variant="success">Current</Badge>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{formatCurrency(month.collected)}</p>
                        <p className="text-xs text-gray-600">{month.collectionRate.toFixed(1)}% collected</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Collected</span>
                        <span className="font-medium text-green-600">{formatCurrency(month.collected)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${collectedPercentage}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="text-orange-600">{formatCurrency(month.pending)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Failed:</span>
                          <span className="text-red-600">{formatCurrency(month.failed)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fee Categories */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Fee Category Performance</CardTitle>
            <CardDescription>Collection rates by fee type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeCategories.map((fee) => (
                <div key={fee.category}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{fee.category}</span>
                      <p className="text-xs text-gray-500">{fee.students} students</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(fee.collected)} / {formatCurrency(fee.total)}
                      </p>
                      <Badge
                        variant={fee.collectionRate >= 80 ? 'success' : fee.collectionRate >= 70 ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {fee.collectionRate.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        fee.collectionRate >= 80 ? 'bg-green-600' :
                        fee.collectionRate >= 70 ? 'bg-orange-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${fee.collectionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation & Failed Payments */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Reconciliation */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Recent Reconciliation</CardTitle>
            <CardDescription>Daily settlement matching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReconciliation.map((recon) => (
                <div
                  key={recon.date}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    recon.status === 'matched'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {recon.status === 'matched' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {new Date(recon.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <Badge variant={recon.status === 'matched' ? 'success' : 'warning'}>
                        {recon.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{recon.transactions} txns</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Expected</p>
                      <p className="font-medium text-gray-900">{formatCurrency(recon.expectedAmount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Received</p>
                      <p className="font-medium text-gray-900">{formatCurrency(recon.receivedAmount)}</p>
                    </div>
                  </div>
                  {recon.discrepancy !== 0 && (
                    <div className="mt-2 pt-2 border-t border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">Discrepancy:</span>
                        <span className={`font-semibold ${recon.discrepancy > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {recon.discrepancy > 0 ? '+' : ''}{formatCurrency(Math.abs(recon.discrepancy))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Failed Payments Analysis */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Failed Payments Analysis</CardTitle>
            <CardDescription>Common failure reasons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failedPayments.map((failure, idx) => (
                <div key={failure.reason}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{failure.reason}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600">{formatCurrency(failure.amount)}</p>
                      <p className="text-xs text-gray-600">{failure.count} failures</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${failure.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total Failed</span>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(failedPayments.reduce((sum, f) => sum + f.amount, 0))}
                    </p>
                    <p className="text-xs text-gray-600">
                      {failedPayments.reduce((sum, f) => sum + f.count, 0)} transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
