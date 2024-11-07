import React from 'react';
import { Copy } from 'lucide-react';
import type { Block } from './index';

interface CodeViewProps {
  blocks: Block[];
  emailData: {
    name: string;
    subject: string;
    snippet: string;
  };
}

export function CodeView({ blocks, emailData }: CodeViewProps) {
  const generateEmailHTML = () => {
    const blockToHTML = (block: Block): string => {
      switch (block.type) {
        case 'container':
          return `
            <table width="650" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; max-width: 650px; box-sizing: content-box; table-layout: fixed;">
              <tbody>
                <tr>
                  <td style="${Object.entries(block.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">
                    ${block.content.children?.map((child: Block) => blockToHTML(child)).join('\n') || ''}
                  </td>
                </tr>
              </tbody>
            </table>`;
        case 'heading':
          return `
            <tr>
              <td>
                <table width="650" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; max-width: 650px; box-sizing: content-box; table-layout: fixed;">
                  <tbody>
                    <tr valign="top">
                      <td style="${Object.entries(block.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">
                        <${block.content.level || 'h1'} style="margin: 0; ${Object.entries(block.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">
                          ${block.content.text}
                        </${block.content.level || 'h1'}>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>`;
        case 'text':
          return `
            <tr>
              <td>
                <table width="650" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; max-width: 650px; box-sizing: content-box; table-layout: fixed;">
                  <tbody>
                    <tr valign="top">
                      <td style="${Object.entries(block.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">
                        <p style="margin: 0; ${Object.entries(block.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">
                          ${block.content.text}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>`;
        case 'image':
          return `
            <tr>
              <td>
                <table width="650" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; max-width: 650px; box-sizing: content-box; table-layout: fixed;">
                  <tbody>
                    <tr valign="top">
                      <td style="text-align: center; padding: 10px 0;">
                        <img src="${block.content.src}" alt="${block.content.alt}" style="max-width: 100%; height: auto;" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>`;
        default:
          return '';
      }
    };

    const template = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${emailData.subject}</title>
    <style type="text/css">
        html, body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }
        table, td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        a {
            text-decoration: none;
        }
        *[x-apple-data-detectors], .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        @media only screen and (max-width: 480px) {
            .responsiveTable {
                width: 100% !important;
            }
            .responsive-image {
                height: auto !important;
                max-width: 100% !important;
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
    <!-- Preview Text -->
    <div style="display: none; max-height: 0; overflow: hidden;">
        ${emailData.snippet}
    </div>
    <!-- Email Content -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center" style="padding: 10px 0;">
                <table width="650" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; max-width: 650px;">
                    <tbody>
                        ${blocks.map(block => blockToHTML(block)).join('\n')}
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    return template;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmailHTML());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">HTML Code</h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        <pre className="text-sm">
          <code className="language-html">{generateEmailHTML()}</code>
        </pre>
      </div>
    </div>
  );
}