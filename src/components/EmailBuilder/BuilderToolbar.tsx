import React from 'react';
import { Type, Image, Square, Columns, Video, Heading } from 'lucide-react';

const tools = [
  { id: 'container', icon: Square, label: 'Container' },
  { id: 'heading', icon: Heading, label: 'Heading' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'image', icon: Image, label: 'Image' },
  { id: 'columns', icon: Columns, label: 'Columns' },
  { id: 'video', icon: Video, label: 'Video' },
];

export function BuilderToolbar() {
  return (
    <div className="w-64 border-r border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            draggable
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-move"
          >
            <tool.icon size={20} />
            <span>{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}