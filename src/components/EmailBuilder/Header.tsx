import React from 'react';
import { Send } from 'lucide-react';

interface HeaderProps {
  emailName: string;
  subject: string;
  previewText: string;
  onEmailNameChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onPreviewTextChange: (value: string) => void;
  onSendClick: () => void;
}

export function Header({
  emailName,
  subject,
  previewText,
  onEmailNameChange,
  onSubjectChange,
  onPreviewTextChange,
  onSendClick,
}: HeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-4">
          <input
            type="text"
            value={emailName}
            onChange={(e) => onEmailNameChange(e.target.value)}
            placeholder="Email Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              placeholder="Subject"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={previewText}
              onChange={(e) => onPreviewTextChange(e.target.value)}
              placeholder="Preview Text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={onSendClick}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
}