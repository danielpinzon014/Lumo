import React, { useState } from 'react';
import { X, Send, AlertTriangle } from 'lucide-react';

type SendEmailModalProps = {
  emailData: {
    name: string;
    subject: string;
    snippet: string;
  };
  onClose: () => void;
};

export function SendEmailModal({ emailData, onClose }: SendEmailModalProps) {
  const [activeTab, setActiveTab] = useState<'test' | 'campaign'>('test');
  const [testEmail, setTestEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('');

  const handleSend = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSend = () => {
    // Handle the email sending logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {showConfirmation ? (
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Confirm Send</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to send this email? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Confirm Send
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Send Email</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveTab('test')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'test'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Test Email
                </button>
                <button
                  onClick={() => setActiveTab('campaign')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'campaign'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Campaign
                </button>
              </div>

              {activeTab === 'test' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700">
                      Test Email Address
                    </label>
                    <input
                      type="email"
                      id="testEmail"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                      Select Audience
                    </label>
                    <select
                      id="audience"
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Choose an audience</option>
                      <option value="campaign1">Summer Sale Campaign</option>
                      <option value="campaign2">New Product Launch</option>
                      <option value="campaign3">Newsletter Subscribers</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handleSend}
                  disabled={
                    (activeTab === 'test' && !testEmail) ||
                    (activeTab === 'campaign' && !selectedAudience)
                  }
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {activeTab === 'test' ? 'Send Test' : 'Send to Campaign'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}