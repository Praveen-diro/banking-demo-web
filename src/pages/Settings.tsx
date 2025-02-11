import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    bankName: 'Corporate Banking Division',
    branchCode: 'CBD-001',
    email: 'dirolabs@gmail.com',
    registrationNumber: 'REG123456789',
    corporateAddress: '123 Financial District, San Francisco',
    branchAddress: 'Floor 25, Financial Tower',
    regulatoryRegion: 'North America',
    swiftCode: 'CORPBK01',
    routingNumber: '123456789',
  });

  const [preferences, setPreferences] = useState({
    reportingCurrency: 'USD',
    timezone: '(GMT-08:00) Pacific Time',
    riskAssessment: true,
    automatedReporting: true,
    complianceAlerts: true,
    auditLogging: true,
  });

  const [security, setSecurity] = useState({
    mfa: true,
    ipWhitelisting: true,
    currentPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Layout title="Corporate Settings">
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              <button
                className={`pb-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('profile')}
              >
                Corporate Profile
              </button>
              <button
                className={`pb-4 ${activeTab === 'preferences' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('preferences')}
              >
                System Preferences
              </button>
              <button
                className={`pb-4 ${activeTab === 'security' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('security')}
              >
                Security & Compliance
              </button>
            </nav>
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Division Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Code</label>
                  <input
                    type="text"
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Address</label>
                  <input
                    type="text"
                    name="corporateAddress"
                    value={formData.corporateAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Address</label>
                  <input
                    type="text"
                    name="branchAddress"
                    value={formData.branchAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT Code</label>
                  <input
                    type="text"
                    name="swiftCode"
                    value={formData.swiftCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-16 py-2 bg-[#1814F3] text-white rounded-lg hover:bg-[#1814F3]/90 text-base"
                >
                  Update Profile
                </button>
              </div>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Currency</label>
                    <select
                      value={preferences.reportingCurrency}
                      onChange={(e) => setPreferences(prev => ({ ...prev, reportingCurrency: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="(GMT-08:00) Pacific Time">Pacific Time (PT)</option>
                      <option value="(GMT-05:00) Eastern Time">Eastern Time (ET)</option>
                      <option value="(GMT+00:00) UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">System Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={preferences.riskAssessment}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, riskAssessment: checked }))
                        }
                        className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Enable Automated Risk Assessment</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={preferences.automatedReporting}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, automatedReporting: checked }))
                        }
                        className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Enable Automated Reporting</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={preferences.complianceAlerts}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, complianceAlerts: checked }))
                        }
                        className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Enable Compliance Alerts</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={preferences.auditLogging}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, auditLogging: checked }))
                        }
                        className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Enable Audit Logging</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-16 py-2 bg-[#1814F3] text-white rounded-lg hover:bg-[#1814F3]/90 text-base"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Security Controls</h3>
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={security.mfa}
                      onCheckedChange={(checked) => 
                        setSecurity(prev => ({ ...prev, mfa: checked }))
                      }
                      className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Require Multi-Factor Authentication for all users</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={security.ipWhitelisting}
                      onCheckedChange={(checked) => 
                        setSecurity(prev => ({ ...prev, ipWhitelisting: checked }))
                      }
                      className="bg-gray-200 data-[state=checked]:bg-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Enable IP Whitelisting</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Admin Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={security.newPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-16 py-2 bg-[#1814F3] text-white rounded-lg hover:bg-[#1814F3]/90 text-base"
                >
                  Update Security Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings; 