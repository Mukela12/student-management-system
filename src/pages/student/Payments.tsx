import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Smartphone, CheckCircle2, Clock, XCircle, Download, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Badge, LoadingSpinner } from '../../components/ui';
import { useUIStore } from '../../stores/uiStore';
import { api } from '../../services/api';
import { Payment, FinancialStatement } from '../../types';
import { formatCurrency, validateZambianMobile, formatZambianMobile } from '../../lib/utils';

export default function Payments() {
  const { showToast } = useUIStore();
  const [statement, setStatement] = useState<FinancialStatement | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    type: 'tuition' as const,
    provider: 'airtel' as 'airtel' | 'mtn' | 'zamtel',
    mobileNumber: '',
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadFinancialStatement();
  }, []);

  const loadFinancialStatement = async () => {
    try {
      setLoading(true);
      const response = await api.getFinancialStatement('student-1');
      if (response.success && response.data) {
        setStatement(response.data);
      }
    } catch (error) {
      showToast({
        title: 'Error',
        message: 'Failed to load financial statement',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!validateZambianMobile(paymentForm.mobileNumber)) {
      showToast({
        title: 'Invalid Number',
        message: 'Please enter a valid Zambian mobile number (09X or 07X)',
        type: 'error',
      });
      return;
    }

    const amount = parseFloat(paymentForm.amount);
    if (isNaN(amount) || amount <= 0) {
      showToast({
        title: 'Invalid Amount',
        message: 'Please enter a valid amount',
        type: 'error',
      });
      return;
    }

    try {
      setProcessing(true);

      const response = await api.initiatePayment({
        studentId: 'student-1',
        amount,
        type: paymentForm.type,
        mobileNumber: paymentForm.mobileNumber,
        paymentProvider: paymentForm.provider,
      });

      if (response.success) {
        showToast({
          title: 'Payment Initiated!',
          message: 'Please check your phone to complete the payment',
          type: 'success',
          duration: 7000,
        });

        // Reset form
        setPaymentForm({
          amount: '',
          type: 'tuition',
          provider: 'airtel',
          mobileNumber: '',
        });
        setShowPaymentForm(false);

        // Reload statement
        setTimeout(() => loadFinancialStatement(), 2000);
      }
    } catch (error) {
      showToast({
        title: 'Payment Failed',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading financial information..." />;
  }

  if (!statement) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments & Fees</h1>
        <p className="text-gray-600 mt-1">Manage your university fees and payments</p>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatCurrency(statement.totalFees)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {formatCurrency(statement.totalPaid)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance Due</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {formatCurrency(statement.balance)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Breakdown */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Fee Breakdown</CardTitle>
          <CardDescription>Your fees for the current academic year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {statement.feeBreakdown.map((fee, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{fee.type}</p>
                  <p className="text-sm text-gray-600">Due: {fee.dueDate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-900">{formatCurrency(fee.amount)}</p>
                  <Badge
                    variant={
                      fee.status === 'paid'
                        ? 'success'
                        : fee.status === 'partial'
                        ? 'warning'
                        : fee.status === 'overdue'
                        ? 'danger'
                        : 'default'
                    }
                  >
                    {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      {!showPaymentForm ? (
        <Card variant="glass">
          <CardContent className="p-6">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Smartphone className="h-5 w-5" />}
              onClick={() => setShowPaymentForm(true)}
            >
              Make a Payment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Pay using mobile money (Airtel, MTN, Zamtel)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <select
                  value={paymentForm.type}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, type: e.target.value as any })
                  }
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-300/20 transition-all"
                  required
                >
                  <option value="tuition">Tuition Fees</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="library">Library Fees</option>
                  <option value="registration">Registration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Amount */}
              <Input
                label="Amount (ZMW)"
                type="number"
                step="0.01"
                min="1"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                leftIcon={<DollarSign className="h-5 w-5" />}
                placeholder="0.00"
                required
              />

              {/* Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Mobile Money Provider
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['airtel', 'mtn', 'zamtel'] as const).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => setPaymentForm({ ...paymentForm, provider })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentForm.provider === provider
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 capitalize">{provider}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Number */}
              <Input
                label="Mobile Number"
                type="tel"
                value={paymentForm.mobileNumber}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, mobileNumber: e.target.value })
                }
                leftIcon={<Phone className="h-5 w-5" />}
                placeholder="0977123456"
                helperText="Enter your mobile money number (09X or 07X)"
                required
              />

              {/* Info Box */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-900 font-semibold mb-1">
                  How it works:
                </p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Click "Pay Now" below</li>
                  <li>You'll receive a USSD prompt on your phone</li>
                  <li>Enter your mobile money PIN to confirm</li>
                  <li>Payment will be processed instantly</li>
                </ol>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowPaymentForm(false)}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={processing}
                  leftIcon={<Smartphone className="h-5 w-5" />}
                >
                  Pay Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {statement.payments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No payment history yet</p>
            ) : (
              statement.payments.slice(0, 10).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        payment.status === 'completed'
                          ? 'bg-green-100'
                          : payment.status === 'pending'
                          ? 'bg-orange-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {payment.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : payment.status === 'pending' ? (
                        <Clock className="h-5 w-5 text-orange-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{payment.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                        {payment.paymentProvider && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{payment.paymentProvider}</span>
                          </>
                        )}
                        {payment.transactionReference && (
                          <>
                            <span>•</span>
                            <span>{payment.transactionReference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </p>
                    <Badge
                      variant={
                        payment.status === 'completed'
                          ? 'success'
                          : payment.status === 'pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
