import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image, Square, Heading, Minus, Columns, Link, Play, Box } from 'lucide-react';

const blocks = [
  { id: 'container', icon: Box, label: 'Container' },
  { id: 'heading', icon: Heading, label: 'Heading' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'image', icon: Image, label: 'Image' },
  { id: 'button', icon: Square, label: 'Button' },
  { id: 'divider', icon: Minus, label: 'Divider' },
  { id: 'columns', icon: Columns, label: 'Columns' },
  { id: 'link', icon: Link, label: 'Link' },
  { id: 'video', icon: Play, label: 'Video' },
];

function DraggableBlock({ id, icon: Icon, label }: { id: string; icon: any; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-move"
    >
      <Icon className="w-5 h-5 mr-3 text-gray-600" />
      <span>{label}</span>
    </div>
  );
}

export function Toolbar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Content Blocks</h2>
      <div className="space-y-2">
        {blocks.map(({ id, icon, label }) => (
          <DraggableBlock key={id} id={id} icon={icon} label={label} />
        ))}
      </div>
    </div>
  );
}