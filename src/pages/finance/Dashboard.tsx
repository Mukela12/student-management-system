import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, CreditCard, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';
import { formatCurrency } from '../../lib/utils';

export default function FinanceDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user?.firstName} • Financial Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{formatCurrency(8500000)}</p>
                <p className="text-xs text-green-600 mt-1">↗ +8.5% vs last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{formatCurrency(2500000)}</p>
                <p className="text-xs text-gray-500 mt-1">125 transactions</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Processed Today</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 truncate">{formatCurrency(450000)}</p>
                <p className="text-xs text-gray-500 mt-1">23 transactions</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl shrink-0">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Failed Payments</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">8</p>
                <p className="text-xs text-gray-500 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment activities</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/finance/transactions')}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'TXN001', student: 'Mwape Banda', amount: 12000, type: 'Tuition', status: 'completed', provider: 'Airtel' },
              { id: 'TXN002', student: 'Chanda Phiri', amount: 5000, type: 'Accommodation', status: 'completed', provider: 'MTN' },
              { id: 'TXN003', student: 'Mutale Zulu', amount: 15000, type: 'Tuition', status: 'pending', provider: 'Zamtel' },
              { id: 'TXN004', student: 'Chilufya Mwale', amount: 3000, type: 'Library', status: 'completed', provider: 'Airtel' },
              { id: 'TXN005', student: 'Bwalya Tembo', amount: 8000, type: 'Registration', status: 'failed', provider: 'MTN' },
            ].map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    txn.status === 'completed' ? 'bg-green-100' :
                    txn.status === 'pending' ? 'bg-orange-100' : 'bg-red-100'
                  }`}>
                    {txn.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : txn.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-orange-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{txn.student}</p>
                      <Badge variant="outline" size="sm">{txn.id}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{txn.type} • {txn.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(txn.amount)}</p>
                  <Badge
                    variant={
                      txn.status === 'completed' ? 'success' :
                      txn.status === 'pending' ? 'warning' : 'danger'
                    }
                    size="sm"
                  >
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { provider: 'Airtel Money', count: 145, percentage: 48 },
                { provider: 'MTN Mobile Money', count: 98, percentage: 32 },
                { provider: 'Zamtel Kwacha', count: 60, percentage: 20 },
              ].map((method) => (
                <div key={method.provider}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{method.provider}</span>
                    <span className="text-sm text-gray-600">{method.count} ({method.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Fee Types</CardTitle>
            <CardDescription>Revenue by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Tuition Fees', amount: 6000000, percentage: 70 },
                { type: 'Accommodation', amount: 1500000, percentage: 18 },
                { type: 'Registration', amount: 700000, percentage: 8 },
                { type: 'Library & Other', amount: 300000, percentage: 4 },
              ].map((fee) => (
                <div key={fee.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{fee.type}</span>
                    <span className="text-sm text-gray-600">{formatCurrency(fee.amount)} ({fee.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${fee.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
