import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type { EmailBlock } from './index';

type EmailPreviewProps = {
  blocks: EmailBlock[];
  selectedDevice: 'desktop' | 'mobile' | 'tablet';
  onDeviceChange: (device: 'desktop' | 'mobile' | 'tablet') => void;
};

export function EmailPreview({ blocks, selectedDevice, onDeviceChange }: EmailPreviewProps) {
  const { setNodeRef } = useDroppable({
    id: 'preview-area',
  });

  const deviceStyles = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Preview</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onDeviceChange('desktop')}
              className={`p-2 rounded-md ${
                selectedDevice === 'desktop'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Monitor className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              className={`p-2 rounded-md ${
                selectedDevice === 'tablet'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Tablet className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              className={`p-2 rounded-md ${
                selectedDevice === 'mobile'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Smartphone className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={setNodeRef}
          className={`mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg min-h-[600px] transition-all ${
            deviceStyles[selectedDevice]
          }`}
        >
          {blocks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Drag and drop elements here to build your email</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {blocks.map((block) => (
                <div key={block.id} className="p-4 border border-gray-200 rounded">
                  {/* Render different block types */}
                  {block.type === 'text' && <p>{block.content.text}</p>}
                  {block.type === 'heading' && <h2>{block.content.text}</h2>}
                  {block.type === 'image' && (
                    <img src={block.content.src} alt={block.content.alt} />
                  )}
                  {/* Add more block type renderers */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}