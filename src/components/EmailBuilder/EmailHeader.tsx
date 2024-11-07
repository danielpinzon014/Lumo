import React from 'react';
import { Send } from 'lucide-react';

type EmailHeaderProps = {
  emailData: {
    name: string;
    subject: string;
    snippet: string;
  };
  setEmailData: (data: any) => void;
  onSend: () => void;
};

export function EmailHeader({ emailData, setEmailData, onSend }: EmailHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Email Builder</h1>
          <button
            onClick={onSend}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="emailName" className="block text-sm font-medium text-gray-700">
              Email Name
            </label>
            <input
              type="text"
              id="emailName"
              value={emailData.name}
              onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter email name"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject Line
            </label>
            <input
              type="text"
              id="subject"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter subject line"
            />
          </div>
          <div>
            <label htmlFor="snippet" className="block text-sm font-medium text-gray-700">
              Preview Text
            </label>
            <input
              type="text"
              id="snippet"
              value={emailData.snippet}
              onChange={(e) => setEmailData({ ...emailData, snippet: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter preview text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}