import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Search, Download, Filter, CheckCircle2, Clock, XCircle, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../../components/ui';
import { formatCurrency } from '../../lib/utils';

const mockTransactions = [
  {
    id: 'TXN001',
    studentId: 'ST001',
    studentName: 'Mwape Banda',
    amount: 12000,
    type: 'Tuition',
    status: 'completed',
    provider: 'Airtel Money',
    reference: 'AM-2024-001234',
    date: '2024-09-15 14:30:22',
    feeType: 'Tuition Fee - Fall 2024',
  },
  {
    id: 'TXN002',
    studentId: 'ST002',
    studentName: 'Chanda Phiri',
    amount: 5000,
    type: 'Accommodation',
    status: 'completed',
    provider: 'MTN Money',
    reference: 'MTN-2024-567890',
    date: '2024-09-15 16:45:10',
    feeType: 'Accommodation Fee',
  },
  {
    id: 'TXN003',
    studentId: 'ST003',
    studentName: 'Mutale Zulu',
    amount: 15000,
    type: 'Tuition',
    status: 'pending',
    provider: 'Zamtel Kwacha',
    reference: 'ZK-2024-111222',
    date: '2024-09-16 09:20:15',
    feeType: 'Tuition Fee - Fall 2024',
  },
  {
    id: 'TXN004',
    studentId: 'ST004',
    studentName: 'Chilufya Mwale',
    amount: 3000,
    type: 'Library',
    status: 'completed',
    provider: 'Airtel Money',
    reference: 'AM-2024-002345',
    date: '2024-09-16 11:15:30',
    feeType: 'Library Fee',
  },
  {
    id: 'TXN005',
    studentId: 'ST005',
    studentName: 'Bwalya Tembo',
    amount: 8000,
    type: 'Registration',
    status: 'failed',
    provider: 'MTN Money',
    reference: 'MTN-2024-678901',
    date: '2024-09-16 13:45:22',
    feeType: 'Registration Fee',
  },
  {
    id: 'TXN006',
    studentId: 'ST006',
    studentName: 'Kabwe Ng\'ombe',
    amount: 12000,
    type: 'Tuition',
    status: 'completed',
    provider: 'Airtel Money',
    reference: 'AM-2024-003456',
    date: '2024-09-17 08:30:45',
    feeType: 'Tuition Fee - Fall 2024',
  },
  {
    id: 'TXN007',
    studentId: 'ST007',
    studentName: 'Musonda Kapila',
    amount: 5000,
    type: 'Accommodation',
    status: 'completed',
    provider: 'Zamtel Kwacha',
    reference: 'ZK-2024-222333',
    date: '2024-09-17 10:20:10',
    feeType: 'Accommodation Fee',
  },
  {
    id: 'TXN008',
    studentId: 'ST008',
    studentName: 'Nsama Lungu',
    amount: 12000,
    type: 'Tuition',
    status: 'pending',
    provider: 'MTN Money',
    reference: 'MTN-2024-789012',
    date: '2024-09-17 14:15:30',
    feeType: 'Tuition Fee - Fall 2024',
  },
];

export default function FinanceTransactions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const statuses = ['all', 'completed', 'pending', 'failed'];
  const providers = ['all', 'Airtel Money', 'MTN Money', 'Zamtel Kwacha'];
  const types = ['all', 'Tuition', 'Accommodation', 'Registration', 'Library'];

  const filteredTransactions = mockTransactions.filter(txn => {
    const matchesSearch = txn.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const matchesProvider = filterProvider === 'all' || txn.provider === filterProvider;
    const matchesType = filterType === 'all' || txn.type === filterType;

    return matchesSearch && matchesStatus && matchesProvider && matchesType;
  });

  const totalTransactions = mockTransactions.length;
  const completedTransactions = mockTransactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = mockTransactions.filter(t => t.status === 'pending').length;
  const failedTransactions = mockTransactions.filter(t => t.status === 'failed').length;
  const totalRevenue = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600 mt-1">View and manage all payment transactions</p>
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
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2 truncate">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mt-2 truncate">{completedTransactions}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                <CheckCircle2 className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2 truncate">{pendingTransactions}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2 truncate">{failedTransactions}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl shrink-0">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Provider Filter */}
            <div>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {providers.map(provider => (
                  <option key={provider} value={provider}>
                    {provider === 'all' ? 'All Providers' : provider}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Provider</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reference</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Badge variant="outline" size="sm">{txn.id}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{txn.studentName}</p>
                      <p className="text-xs text-gray-600">{txn.studentId}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(txn.amount)}</p>
                      <p className="text-xs text-gray-600">{txn.feeType}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{txn.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{txn.provider}</td>
                    <td className="py-3 px-4 text-xs text-gray-600">{txn.reference}</td>
                    <td className="py-3 px-4 text-xs text-gray-600">{txn.date}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={txn.status === 'completed' ? 'success' : txn.status === 'pending' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Breakdown */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Payment Methods Distribution</CardTitle>
          <CardDescription>Revenue by payment provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.filter(p => p !== 'all').map((provider) => {
              const providerTransactions = mockTransactions.filter(t => t.provider === provider && t.status === 'completed');
              const count = providerTransactions.length;
              const total = providerTransactions.reduce((sum, t) => sum + t.amount, 0);
              const percentage = totalRevenue > 0 ? Math.round((total / totalRevenue) * 100) : 0;

              return (
                <div key={provider}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{provider}</span>
                    <span className="text-sm text-gray-600">{formatCurrency(total)} ({percentage}%) • {count} transactions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
