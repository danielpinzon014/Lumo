import React, { useState } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { EmailDashboard } from './Dashboard';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { Preview } from './Preview';
import { SendModal } from './SendModal';
import { StyleEditor } from './StyleEditor';
import { CodeView } from './CodeView';
import { Code, Layout } from 'lucide-react';

export type Block = {
  id: string;
  type: string;
  content: Record<string, any>;
  styles: Record<string, any>;
};

export function EmailBuilder() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [activeView, setActiveView] = useState<'visual' | 'code'>('visual');
  const [emailData, setEmailData] = useState({
    name: '',
    subject: '',
    snippet: '',
  });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (showDashboard) {
    return <EmailDashboard onCreateEmail={() => setShowDashboard(false)} />;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'preview-area') {
      const newBlock: Block = {
        id: `${active.id}-${Date.now()}`,
        type: String(active.id),
        content: getDefaultContent(String(active.id)),
        styles: getDefaultStyles(String(active.id)),
      };

      setBlocks((prev) => [...prev, newBlock]);
    }
  };

  const handleBlockUpdate = (blockId: string, styles: any) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, styles: { ...block.styles, ...styles } } : block
      )
    );
  };

  const handleContentUpdate = (blockId: string, content: any) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, content: { ...block.content, ...content } } : block
      )
    );
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
        return { text: 'Click me', url: '#' };
      case 'divider':
        return {};
      case 'columns':
        return { columns: 2, children: [] };
      case 'video':
        return { url: '' };
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
          color: '#000000',
          backgroundColor: 'transparent',
          textAlign: 'left',
          padding: '0',
        };
      case 'text':
        return {
          ...baseStyles,
          color: '#000000',
          backgroundColor: 'transparent',
          textAlign: 'left',
          padding: '0',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        <Header
          emailName={emailData.name}
          subject={emailData.subject}
          previewText={emailData.snippet}
          onEmailNameChange={(value) => setEmailData((prev) => ({ ...prev, name: value }))}
          onSubjectChange={(value) => setEmailData((prev) => ({ ...prev, subject: value }))}
          onPreviewTextChange={(value) => setEmailData((prev) => ({ ...prev, snippet: value }))}
          onSendClick={() => setShowSendModal(true)}
        />

        <div className="border-b border-gray-200 bg-white">
          <div className="flex space-x-4 px-4">
            <button
              onClick={() => setActiveView('visual')}
              className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                activeView === 'visual'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Layout className="w-4 h-4 mr-2" />
              Visual Editor
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                activeView === 'code'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              HTML Code
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {activeView === 'visual' ? (
            <>
              <Toolbar />
              <div className="flex-1 overflow-auto p-6">
                <Preview
                  blocks={blocks}
                  selectedDevice={selectedDevice}
                  onDeviceChange={setSelectedDevice}
                  onBlockSelect={setSelectedBlock}
                  onBlockUpdate={handleBlockUpdate}
                  onContentUpdate={handleContentUpdate}
                />
              </div>
              {selectedBlock && (
                <StyleEditor
                  block={selectedBlock}
                  onUpdate={handleBlockUpdate}
                  onContentUpdate={handleContentUpdate}
                />
              )}
            </>
          ) : (
            <div className="flex-1 overflow-hidden">
              <CodeView blocks={blocks} emailData={emailData} />
            </div>
          )}
        </div>

        {showSendModal && (
          <SendModal
            isOpen={showSendModal}
            onClose={() => setShowSendModal(false)}
            onSend={(data) => {
              console.log('Sending email:', data);
              setShowSendModal(false);
            }}
          />
        )}
      </div>
    </DndContext>
  );
}