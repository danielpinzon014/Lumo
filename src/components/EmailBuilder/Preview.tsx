import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Plus, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Trash2 
} from 'lucide-react';
import type { Block } from './index';

interface PreviewProps {
  blocks: Block[];
  selectedDevice: 'desktop' | 'mobile' | 'tablet';
  onDeviceChange: (device: 'desktop' | 'mobile' | 'tablet') => void;
  onBlockSelect: (block: Block | null) => void;
  onBlockUpdate: (blockId: string, styles: any) => void;
  onContentUpdate: (blockId: string, content: any) => void;
}

export function Preview({
  blocks,
  selectedDevice,
  onDeviceChange,
  onBlockSelect,
  onBlockUpdate,
  onContentUpdate,
}: PreviewProps) {
  const [showContentSelector, setShowContentSelector] = useState<string | null>(null);
  const { setNodeRef } = useDroppable({
    id: 'preview-area',
  });

  const deviceStyles = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  };

  const contentBlocks = [
    { id: 'heading', label: 'Heading', icon: 'H' },
    { id: 'text', label: 'Text', icon: '≡' },
    { id: 'button', label: 'Button', icon: '⬒' },
    { id: 'image', label: 'Image', icon: '🖼' },
    { id: 'divider', label: 'Divider', icon: '—' },
    { id: 'spacer', label: 'Spacer', icon: '□' },
    { id: 'columns', label: 'Columns', icon: '▣' },
  ];

  const addContentToContainer = (containerId: string, blockType: string) => {
    const newBlock: Block = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      content: getDefaultContent(blockType),
      styles: getDefaultStyles(blockType),
    };

    const container = blocks.find(b => b.id === containerId);
    if (container) {
      const children = container.content.children || [];
      onContentUpdate(containerId, {
        ...container.content,
        children: [...children, newBlock]
      });
    }
    setShowContentSelector(null);
  };

  const removeBlock = (containerId: string, blockId: string) => {
    const container = blocks.find(b => b.id === containerId);
    if (container && container.content.children) {
      onContentUpdate(containerId, {
        ...container.content,
        children: container.content.children.filter((child: Block) => child.id !== blockId)
      });
    }
  };

  const moveBlock = (containerId: string, blockId: string, direction: 'up' | 'down') => {
    const container = blocks.find(b => b.id === containerId);
    if (container && container.content.children) {
      const children = [...container.content.children];
      const index = children.findIndex((child: Block) => child.id === blockId);
      if (direction === 'up' && index > 0) {
        [children[index - 1], children[index]] = [children[index], children[index - 1]];
      } else if (direction === 'down' && index < children.length - 1) {
        [children[index], children[index + 1]] = [children[index + 1], children[index]];
      }
      onContentUpdate(containerId, {
        ...container.content,
        children
      });
    }
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'container':
        return { children: [] };
      case 'heading':
        return { text: 'Enter heading', level: 'h1' };
      case 'text':
        return { text: 'Enter your text here' };
      case 'image':
        return { src: '', alt: '' };
      case 'button':
        return { 
          text: 'Click me',
          url: '#',
          width: 'auto',
          size: 'md',
          style: 'rounded'
        };
      case 'divider':
        return { height: 1 };
      case 'columns':
        return { 
          columns: 2,
          columnSizes: [1, 1],
          gap: 16,
          alignment: 'top',
          children: []
        };
      default:
        return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    const baseStyles = {
      padding: '1rem',
      margin: '0',
      color: '#000000',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
    };

    switch (type) {
      case 'container':
        return {
          padding: '20px',
          margin: '0',
          borderWidth: '0',
          borderStyle: 'solid',
          borderColor: '#000000',
          borderRadius: '0',
          backgroundColor: '#ffffff',
        };
      case 'heading':
        return {
          ...baseStyles,
          fontSize: '24px',
          fontWeight: 'bold',
        };
      case 'text':
        return baseStyles;
      case 'button':
        return {
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#4F46E5',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          textAlign: 'center',
          cursor: 'pointer',
        };
      case 'divider':
        return {
          borderTop: '1px solid #E5E7EB',
          margin: '1rem 0',
        };
      case 'columns':
        return {
          display: 'flex',
          gap: '16px',
          alignItems: 'top',
          backgroundColor: 'transparent',
          padding: '0',
        };
      default:
        return baseStyles;
    }
  };

  const renderBlock = (block: Block, containerId?: string) => {
    const blockProps = {
      className: 'relative p-4 border border-gray-200 rounded mb-4 hover:border-blue-500 cursor-pointer group',
      onClick: () => onBlockSelect(block),
      style: block.styles,
    };

    const BlockControls = ({ blockId }: { blockId: string }) => (
      <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1">
        {containerId && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(containerId, blockId, 'up');
              }}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(containerId, blockId, 'down');
              }}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeBlock(containerId, blockId);
              }}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    );

    switch (block.type) {
      case 'container':
        return (
          <div {...blockProps} style={{ ...block.styles, minHeight: '100px' }}>
            <BlockControls blockId={block.id} />
            {block.content.children && block.content.children.length > 0 ? (
              <>
                {block.content.children.map((childBlock: Block) => (
                  <div key={childBlock.id}>
                    {renderBlock(childBlock, block.id)}
                  </div>
                ))}
                <button
                  className="w-full mt-4 p-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowContentSelector(block.id);
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Content Block
                </button>
              </>
            ) : (
              <div 
                className="flex flex-col items-center justify-center h-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContentSelector(block.id);
                }}
              >
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Add content</span>
              </div>
            )}
            {showContentSelector === block.id && (
              <div className="absolute left-0 right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Content</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContentSelector(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {contentBlocks.map((contentBlock) => (
                    <button
                      key={contentBlock.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        addContentToContainer(block.id, contentBlock.id);
                      }}
                      className="flex flex-col items-center p-2 rounded hover:bg-gray-50"
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mb-1">
                        {contentBlock.icon}
                      </span>
                      <span className="text-xs">{contentBlock.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'heading':
        const HeadingTag = block.content.level || 'h1';
        return (
          <div {...blockProps}>
            <BlockControls blockId={block.id} />
            <HeadingTag
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentUpdate(block.id, { ...block.content, text: e.currentTarget.textContent })}
              style={block.styles}
            >
              {block.content.text}
            </HeadingTag>
          </div>
        );
      case 'text':
        return (
          <div {...blockProps}>
            <BlockControls blockId={block.id} />
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentUpdate(block.id, { ...block.content, text: e.currentTarget.textContent })}
              style={block.styles}
            >
              {block.content.text}
            </div>
          </div>
        );
      case 'button':
        return (
          <div {...blockProps}>
            <BlockControls blockId={block.id} />
            <div className={`text-center ${block.content.width === 'full' ? 'w-full' : 'inline-block'}`}>
              <a
                href={block.content.url}
                style={block.styles}
                className={`
                  ${block.content.width === 'full' ? 'w-full' : 'inline-block'}
                  ${block.content.style === 'pill' ? 'rounded-full' : 
                    block.content.style === 'rounded' ? 'rounded-md' : ''}
                `}
              >
                {block.content.text}
              </a>
            </div>
          </div>
        );
      case 'divider':
        return (
          <div {...blockProps}>
            <BlockControls blockId={block.id} />
            <hr style={block.styles} />
          </div>
        );
      case 'columns':
        return (
          <div {...blockProps}>
            <BlockControls blockId={block.id} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${block.content.columns}, 1fr)`,
                gap: `${block.content.gap}px`,
                alignItems: block.content.alignment,
              }}
            >
              {Array.from({ length: block.content.columns }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    flex: block.content.columnSizes[index],
                  }}
                  className="border border-dashed border-gray-300 p-4 rounded"
                >
                  Column {index + 1}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => onDeviceChange('desktop')}
          className={`p-2 rounded ${
            selectedDevice === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeviceChange('tablet')}
          className={`p-2 rounded ${
            selectedDevice === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
        >
          <Tablet className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeviceChange('mobile')}
          className={`p-2 rounded ${
            selectedDevice === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
        >
          <Smartphone className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 ${
          deviceStyles[selectedDevice]
        }`}
        onClick={() => setShowContentSelector(null)}
      >
        {blocks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Drag and drop elements here to build your email
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block) => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}