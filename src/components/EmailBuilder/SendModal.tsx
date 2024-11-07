import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: { type: 'test' | 'campaign'; email?: string }) => void;
}

export function SendModal({ isOpen, onClose, onSend }: SendModalProps) {
  const [activeTab, setActiveTab] = useState<'test' | 'campaign'>('test');
  const [testEmail, setTestEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Send Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex mb-4 border-b">
            <button
              className={`px-4 py-2 ${
                activeTab === 'test'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('test')}
            >
              Send Test
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'campaign'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('campaign')}
            >
              Send to Campaign
            </button>
          </div>

          {activeTab === 'test' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Email Address
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter email address"
              />
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                This will send the email to all contacts in the selected campaign audience.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSend({
                type: activeTab,
                ...(activeTab === 'test' && { email: testEmail }),
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}