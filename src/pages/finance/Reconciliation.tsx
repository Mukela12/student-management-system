import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Download, Calendar, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { formatCurrency } from '../../lib/utils';

const mockReconciliationData = [
  {
    id: '1',
    date: '2024-09-15',
    provider: 'Airtel Money',
    expectedAmount: 36000,
    receivedAmount: 36000,
    transactionCount: 3,
    status: 'reconciled',
    discrepancy: 0,
  },
  {
    id: '2',
    date: '2024-09-16',
    provider: 'MTN Money',
    expectedAmount: 25000,
    receivedAmount: 17000,
    transactionCount: 3,
    status: 'discrepancy',
    discrepancy: 8000,
  },
  {
    id: '3',
    date: '2024-09-17',
    provider: 'Zamtel Kwacha',
    expectedAmount: 17000,
    receivedAmount: 17000,
    transactionCount: 2,
    status: 'reconciled',
    discrepancy: 0,
  },
  {
    id: '4',
    date: '2024-09-17',
    provider: 'Airtel Money',
    expectedAmount: 24000,
    receivedAmount: 24000,
    transactionCount: 2,
    status: 'reconciled',
    discrepancy: 0,
  },
  {
    id: '5',
    date: '2024-09-17',
    provider: 'MTN Money',
    expectedAmount: 12000,
    receivedAmount: null,
    transactionCount: 1,
    status: 'pending',
    discrepancy: null,
  },
];

const mockProviderStatements = [
  {
    provider: 'Airtel Money',
    lastReconciled: '2024-09-17',
    totalExpected: 60000,
    totalReceived: 60000,
    pendingCount: 0,
    discrepancyCount: 0,
  },
  {
    provider: 'MTN Money',
    lastReconciled: '2024-09-16',
    totalExpected: 37000,
    totalReceived: 17000,
    pendingCount: 1,
    discrepancyCount: 1,
  },
  {
    provider: 'Zamtel Kwacha',
    lastReconciled: '2024-09-17',
    totalExpected: 17000,
    totalReceived: 17000,
    pendingCount: 0,
    discrepancyCount: 0,
  },
];

export default function FinanceReconciliation() {
  const [selectedDate, setSelectedDate] = useState('2024-09-17');
  const [selectedProvider, setSelectedProvider] = useState('all');

  const filteredData = mockReconciliationData.filter(item => {
    const matchesDate = !selectedDate || item.date === selectedDate;
    const matchesProvider = selectedProvider === 'all' || item.provider === selectedProvider;
    return matchesDate && matchesProvider;
  });

  const reconciledCount = mockReconciliationData.filter(r => r.status === 'reconciled').length;
  const discrepancyCount = mockReconciliationData.filter(r => r.status === 'discrepancy').length;
  const pendingCount = mockReconciliationData.filter(r => r.status === 'pending').length;
  const totalDiscrepancy = mockReconciliationData
    .filter(r => r.status === 'discrepancy')
    .reduce((sum, r) => sum + r.discrepancy, 0);

  const handleReconcile = (id: string) => {
    console.log('Reconciling:', id);
    alert('Reconciliation marked as complete!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reconciliation</h1>
          <p className="text-gray-600 mt-1">Reconcile payments with provider statements</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Reconciled</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{reconciledCount}</p>
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
                <p className="text-sm font-medium text-gray-600">Discrepancies</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">{discrepancyCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{pendingCount}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Total Discrepancy</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">{formatCurrency(totalDiscrepancy)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Overview */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Provider Overview</CardTitle>
          <CardDescription>Summary by payment provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockProviderStatements.map((provider) => (
              <div key={provider.provider} className="p-4 border-2 border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{provider.provider}</h3>
                  <Badge
                    variant={provider.discrepancyCount > 0 ? 'danger' : provider.pendingCount > 0 ? 'warning' : 'success'}
                    size="sm"
                  >
                    {provider.discrepancyCount > 0 ? 'Issues' : provider.pendingCount > 0 ? 'Pending' : 'Clear'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Expected:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(provider.totalExpected)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Received:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(provider.totalReceived)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Last Reconciled:</span>
                    <span className="text-xs text-gray-600">{provider.lastReconciled}</span>
                  </div>
                  {(provider.pendingCount > 0 || provider.discrepancyCount > 0) && (
                    <div className="pt-2 border-t border-gray-200">
                      {provider.pendingCount > 0 && (
                        <p className="text-xs text-orange-600">{provider.pendingCount} pending</p>
                      )}
                      {provider.discrepancyCount > 0 && (
                        <p className="text-xs text-red-600">{provider.discrepancyCount} discrepancy</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Providers</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="MTN Money">MTN Money</option>
                <option value="Zamtel Kwacha">Zamtel Kwacha</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Reconciliation Records</CardTitle>
          <CardDescription>{filteredData.length} records found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Provider</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transactions</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Expected Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Received Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Discrepancy</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record) => (
                  <tr
                    key={record.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      record.status === 'discrepancy' ? 'bg-red-50' : record.status === 'pending' ? 'bg-orange-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">{record.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.provider}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{record.transactionCount}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(record.expectedAmount)}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">
                      {record.receivedAmount ? formatCurrency(record.receivedAmount) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      {record.discrepancy !== null && record.discrepancy !== 0 ? (
                        <span className="text-sm font-semibold text-red-600">
                          {formatCurrency(record.discrepancy)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          record.status === 'reconciled'
                            ? 'success'
                            : record.status === 'discrepancy'
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {record.status !== 'reconciled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReconcile(record.id)}
                        >
                          Reconcile
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Instructions */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Reconciliation Guide</CardTitle>
          <CardDescription>Steps to reconcile payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold text-primary-600">1.</span>
              <span>Download payment provider statements for the reconciliation period</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary-600">2.</span>
              <span>Compare received amounts with expected transaction totals</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary-600">3.</span>
              <span>Investigate any discrepancies with the payment provider</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary-600">4.</span>
              <span>Mark records as reconciled once amounts match and are confirmed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary-600">5.</span>
              <span>Generate reconciliation reports for accounting records</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
