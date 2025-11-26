import { useState } from 'react';
import { Settings as SettingsIcon, Save, DollarSign, Bell, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '../../components/ui';

export default function FinanceSettings() {
  const [settings, setSettings] = useState({
    // Payment Provider Settings
    airtelApiKey: '••••••••••••••••',
    airtelSecretKey: '••••••••••••••••',
    mtnApiKey: '••••••••••••••••',
    mtnSecretKey: '••••••••••••••••',
    zamtelApiKey: '••••••••••••••••',
    zamtelSecretKey: '••••••••••••••••',

    // Fee Settings
    defaultCurrency: 'ZMW',
    latePaymentPenalty: 5,
    paymentGracePeriod: 14,
    installmentAllowed: true,
    minInstallmentAmount: 5000,

    // Notification Settings
    sendPaymentConfirmations: true,
    sendPaymentReminders: true,
    sendReceiptByEmail: true,
    sendReceiptBySMS: false,
    reminderDaysBefore: 7,

    // Reconciliation Settings
    autoReconcile: false,
    reconciliationFrequency: 'daily',
    discrepancyThreshold: 100,
    notifyOnDiscrepancy: true,

    // Security Settings
    requireTwoFactor: false,
    sessionTimeout: 30,
    allowBulkPayments: true,
    maxBulkTransactions: 100,
  });

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Finance settings saved successfully!');
  };

  const handleTestConnection = (provider: string) => {
    console.log('Testing connection for:', provider);
    alert(`Testing ${provider} API connection...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Settings</h1>
          <p className="text-gray-600 mt-1">Configure payment providers and finance preferences</p>
        </div>
        <Button variant="primary" leftIcon={<Save className="h-4 w-4" />} onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      {/* Payment Provider Settings */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-600" />
            <CardTitle>Payment Provider Settings</CardTitle>
          </div>
          <CardDescription>Configure API credentials for mobile money providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Airtel Money */}
          <div className="p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Airtel Money</h3>
              <Button variant="outline" size="sm" onClick={() => handleTestConnection('Airtel Money')}>
                Test Connection
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  value={settings.airtelApiKey}
                  onChange={(e) => handleChange('airtelApiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                <input
                  type="password"
                  value={settings.airtelSecretKey}
                  onChange={(e) => handleChange('airtelSecretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* MTN Money */}
          <div className="p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">MTN Mobile Money</h3>
              <Button variant="outline" size="sm" onClick={() => handleTestConnection('MTN Money')}>
                Test Connection
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  value={settings.mtnApiKey}
                  onChange={(e) => handleChange('mtnApiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                <input
                  type="password"
                  value={settings.mtnSecretKey}
                  onChange={(e) => handleChange('mtnSecretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Zamtel Kwacha */}
          <div className="p-4 border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Zamtel Kwacha</h3>
              <Button variant="outline" size="sm" onClick={() => handleTestConnection('Zamtel Kwacha')}>
                Test Connection
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  value={settings.zamtelApiKey}
                  onChange={(e) => handleChange('zamtelApiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                <input
                  type="password"
                  value={settings.zamtelSecretKey}
                  onChange={(e) => handleChange('zamtelSecretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Settings */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Fee Settings</CardTitle>
          <CardDescription>Configure payment and fee policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="ZMW">ZMW (Zambian Kwacha)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Late Payment Penalty (%)</label>
              <input
                type="number"
                value={settings.latePaymentPenalty}
                onChange={(e) => handleChange('latePaymentPenalty', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Grace Period (days)</label>
              <input
                type="number"
                value={settings.paymentGracePeriod}
                onChange={(e) => handleChange('paymentGracePeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Allow Installment Payments</p>
                <p className="text-sm text-gray-600">Enable students to pay in installments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.installmentAllowed}
                  onChange={(e) => handleChange('installmentAllowed', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Installment Amount (ZMW)</label>
              <input
                type="number"
                value={settings.minInstallmentAmount}
                onChange={(e) => handleChange('minInstallmentAmount', parseInt(e.target.value))}
                disabled={!settings.installmentAllowed}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>Configure payment notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Payment Confirmations</p>
                <p className="text-sm text-gray-600">Send confirmation after payment</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sendPaymentConfirmations}
                  onChange={(e) => handleChange('sendPaymentConfirmations', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Payment Reminders</p>
                <p className="text-sm text-gray-600">Send reminders before due date</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sendPaymentReminders}
                  onChange={(e) => handleChange('sendPaymentReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Receipts</p>
                <p className="text-sm text-gray-600">Send receipts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sendReceiptByEmail}
                  onChange={(e) => handleChange('sendReceiptByEmail', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Receipts</p>
                <p className="text-sm text-gray-600">Send receipts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sendReceiptBySMS}
                  onChange={(e) => handleChange('sendReceiptBySMS', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Days Before Due Date
            </label>
            <input
              type="number"
              value={settings.reminderDaysBefore}
              onChange={(e) => handleChange('reminderDaysBefore', parseInt(e.target.value))}
              disabled={!settings.sendPaymentReminders}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Settings */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Reconciliation Settings</CardTitle>
          <CardDescription>Configure automatic reconciliation preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto Reconciliation</p>
                <p className="text-sm text-gray-600">Automatically reconcile matching amounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoReconcile}
                  onChange={(e) => handleChange('autoReconcile', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notify on Discrepancy</p>
                <p className="text-sm text-gray-600">Alert when amounts don't match</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyOnDiscrepancy}
                  onChange={(e) => handleChange('notifyOnDiscrepancy', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reconciliation Frequency</label>
              <select
                value={settings.reconciliationFrequency}
                onChange={(e) => handleChange('reconciliationFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discrepancy Threshold (ZMW)
              </label>
              <input
                type="number"
                value={settings.discrepancyThreshold}
                onChange={(e) => handleChange('discrepancyThreshold', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>Configure security and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Require Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Extra security for finance operations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireTwoFactor}
                  onChange={(e) => handleChange('requireTwoFactor', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Allow Bulk Payments</p>
                <p className="text-sm text-gray-600">Process multiple payments at once</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowBulkPayments}
                  onChange={(e) => handleChange('allowBulkPayments', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Bulk Transactions
              </label>
              <input
                type="number"
                value={settings.maxBulkTransactions}
                onChange={(e) => handleChange('maxBulkTransactions', parseInt(e.target.value))}
                disabled={!settings.allowBulkPayments}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg" leftIcon={<Save className="h-5 w-5" />} onClick={handleSave}>
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
