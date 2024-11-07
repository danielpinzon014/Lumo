import React from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Type as FontIcon, Palette, Box
} from 'lucide-react';

interface StyleEditorProps {
  block: {
    id: string;
    type: string;
    content: any;
    styles: any;
  };
  onUpdate: (id: string, styles: any) => void;
  onContentUpdate: (id: string, content: any) => void;
}

const fontFamilies = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Times New Roman, serif',
  'Georgia, serif',
  'Verdana, sans-serif',
  'Roboto, sans-serif',
];

const fontSizes = [
  '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'
];

const fontWeights = [
  '300', '400', '500', '600', '700', '800'
];

export function StyleEditor({ block, onUpdate, onContentUpdate }: StyleEditorProps) {
  const updateStyle = (property: string, value: string) => {
    const newStyles = {
      ...block.styles,
      [property]: value,
    };
    onUpdate(block.id, newStyles);
  };

  const updateContent = (property: string, value: any) => {
    const newContent = {
      ...block.content,
      [property]: value,
    };
    onContentUpdate(block.id, newContent);
  };

  const renderSliderWithValue = (
    label: string,
    value: number,
    onChange: (value: number) => void,
    min = 0,
    max = 100,
    step = 1,
    unit = 'px'
  ) => (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-500">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <div className="w-16 flex items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-12 px-1 py-0.5 border rounded text-sm"
          />
          <span className="ml-1 text-xs text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );

  const renderButtonGroup = (
    label: string,
    options: { value: string; label: string }[],
    value: string,
    onChange: (value: string) => void
  ) => (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-500">{label}</label>
      <div className="flex rounded-md shadow-sm">
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 text-sm font-medium
              ${index === 0 ? 'rounded-l-md' : ''}
              ${index === options.length - 1 ? 'rounded-r-md' : ''}
              ${value === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }
              border border-gray-300
              focus:outline-none focus:ring-1 focus:ring-indigo-500
              -ml-px first:ml-0
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Style Properties</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Container-specific controls */}
        {block.type === 'container' && (
          <>
            {renderSliderWithValue(
              'Border Radius',
              parseInt(block.styles.borderRadius || '0'),
              (value) => updateStyle('borderRadius', `${value}px`)
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Background Color</label>
                <input
                  type="color"
                  value={block.styles.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-full h-8 rounded border-gray-300"
                />
              </div>
              {renderSliderWithValue(
                'Padding',
                parseInt(block.styles.padding || '0'),
                (value) => updateStyle('padding', `${value}px`)
              )}
            </div>
          </>
        )}

        {/* Heading-specific controls */}
        {block.type === 'heading' && (
          <>
            {renderButtonGroup(
              'Heading Level',
              [
                { value: 'h1', label: 'H1' },
                { value: 'h2', label: 'H2' },
                { value: 'h3', label: 'H3' },
              ],
              block.content.level,
              (value) => {
                updateContent('level', value);
                updateStyle('fontSize', value === 'h1' ? '32px' : value === 'h2' ? '24px' : '20px');
                updateStyle('fontWeight', value === 'h1' ? '700' : value === 'h2' ? '600' : '500');
              }
            )}
          </>
        )}

        {/* Button-specific controls */}
        {block.type === 'button' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Button Text</label>
              <input
                type="text"
                value={block.content.text}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">URL</label>
              <input
                type="text"
                value={block.content.url}
                onChange={(e) => updateContent('url', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {renderButtonGroup(
              'Width',
              [
                { value: 'auto', label: 'Auto' },
                { value: 'full', label: 'Full' },
              ],
              block.content.width,
              (value) => updateContent('width', value)
            )}
            {renderButtonGroup(
              'Size',
              [
                { value: 'xs', label: 'XS' },
                { value: 'sm', label: 'SM' },
                { value: 'md', label: 'MD' },
                { value: 'lg', label: 'LG' },
              ],
              block.content.size,
              (value) => {
                updateContent('size', value);
                const sizes = { xs: '12px', sm: '14px', md: '16px', lg: '18px' };
                updateStyle('fontSize', sizes[value as keyof typeof sizes]);
                const padding = { xs: '6px 12px', sm: '8px 16px', md: '10px 20px', lg: '12px 24px' };
                updateStyle('padding', padding[value as keyof typeof padding]);
              }
            )}
            {renderButtonGroup(
              'Style',
              [
                { value: 'rectangle', label: 'Rectangle' },
                { value: 'rounded', label: 'Rounded' },
                { value: 'pill', label: 'Pill' },
              ],
              block.content.style,
              (value) => {
                updateContent('style', value);
                updateStyle('borderRadius', value === 'pill' ? '9999px' : value === 'rounded' ? '6px' : '0');
              }
            )}
          </>
        )}

        {/* Divider-specific controls */}
        {block.type === 'divider' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Color</label>
              <input
                type="color"
                value={block.styles.borderTopColor || '#000000'}
                onChange={(e) => updateStyle('borderTopColor', e.target.value)}
                className="w-full h-8 rounded border-gray-300"
              />
            </div>
            {renderSliderWithValue(
              'Height',
              parseInt(block.styles.borderTopWidth || '1'),
              (value) => updateStyle('borderTopWidth', `${value}px`),
              1,
              20
            )}
            {renderSliderWithValue(
              'Padding',
              parseInt(block.styles.padding || '0'),
              (value) => updateStyle('padding', `${value}px`)
            )}
          </>
        )}

        {/* Columns-specific controls */}
        {block.type === 'columns' && (
          <>
            {renderButtonGroup(
              'Number of Columns',
              [
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
              ],
              String(block.content.columns),
              (value) => {
                const columns = parseInt(value);
                updateContent('columns', columns);
                updateContent('columnSizes', Array(columns).fill(1));
              }
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Column Sizes</label>
              <div className="space-y-2">
                {block.content.columnSizes.map((size: number, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Column {index + 1}</span>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={size}
                      onChange={(e) => {
                        const newSizes = [...block.content.columnSizes];
                        newSizes[index] = parseInt(e.target.value);
                        updateContent('columnSizes', newSizes);
                      }}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500">{size}</span>
                  </div>
                ))}
              </div>
            </div>
            {renderSliderWithValue(
              'Column Gap',
              block.content.gap,
              (value) => updateContent('gap', value),
              0,
              100
            )}
            {renderButtonGroup(
              'Alignment',
              [
                { value: 'top', label: 'Top' },
                { value: 'center', label: 'Center' },
                { value: 'bottom', label: 'Bottom' },
              ],
              block.content.alignment,
              (value) => {
                updateContent('alignment', value);
                updateStyle('alignItems', value);
              }
            )}
          </>
        )}

        {/* Common controls for text-based blocks */}
        {['heading', 'text', 'button'].includes(block.type) && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Text Color</label>
              <input
                type="color"
                value={block.styles.color}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full h-8 rounded border-gray-300"
              />
            </div>
            {block.type === 'button' && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Button Color</label>
                <input
                  type="color"
                  value={block.styles.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-full h-8 rounded border-gray-300"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Font Family</label>
              <select
                value={block.styles.fontFamily}
                onChange={(e) => updateStyle('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font.split(',')[0]}
                  </option>
                ))}
              </select>
            </div>
            {renderSliderWithValue(
              'Font Size',
              parseInt(block.styles.fontSize),
              (value) => updateStyle('fontSize', `${value}px`),
              12,
              72
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Font Weight</label>
              <select
                value={block.styles.fontWeight}
                onChange={(e) => updateStyle('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {fontWeights.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Alignment</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateStyle('textAlign', 'left')}
                  className={`p-2 rounded ${
                    block.styles.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateStyle('textAlign', 'center')}
                  className={`p-2 rounded ${
                    block.styles.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateStyle('textAlign', 'right')}
                  className={`p-2 rounded ${
                    block.styles.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {renderSliderWithValue(
              'Padding',
              parseInt(block.styles.padding || '0'),
              (value) => updateStyle('padding', `${value}px`)
            )}
          </>
        )}
      </div>
    </div>
  );
}