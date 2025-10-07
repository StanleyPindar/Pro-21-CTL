import { useState } from 'react';
import { Eye, EyeOff, Code, Columns2 as Columns, Type, Bold, Italic, List, Link as LinkIcon, Image, Table, AlertCircle } from 'lucide-react';
import { enhancedMarkdownToHtml } from '../../utils/enhancedMarkdownParser';
import { sanitizeMarkdownHtml } from '../../utils/sanitizeHtml';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type ViewMode = 'edit' | 'preview' | 'split';

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [showToolbar, setShowToolbar] = useState(true);

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholder;
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**', 'bold text') },
    { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*', 'italic text') },
    { icon: Type, label: 'Heading', action: () => insertMarkdown('## ', '', 'Heading') },
    { icon: List, label: 'List', action: () => insertMarkdown('- ', '', 'List item') },
    { icon: LinkIcon, label: 'Link', action: () => insertMarkdown('[', '](https://example.com)', 'link text') },
    { icon: Image, label: 'Image', action: () => insertMarkdown('![', '](https://example.com/image.jpg)', 'alt text') },
    { icon: Table, label: 'Table', action: () => insertMarkdown('| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n', '', '') },
    { icon: Code, label: 'Code Block', action: () => insertMarkdown('```\n', '\n```', 'code here') },
    { icon: AlertCircle, label: 'Callout', action: () => insertMarkdown('> [!NOTE] ', '', 'Your note here') },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="border-b border-slate-200 p-3 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'edit' ? 'bg-green-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Code className="w-4 h-4 inline mr-1" />
            Edit
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'split' ? 'bg-green-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Columns className="w-4 h-4 inline mr-1" />
            Split
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-green-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Preview
          </button>
        </div>
        <button
          onClick={() => setShowToolbar(!showToolbar)}
          className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
          title={showToolbar ? 'Hide toolbar' : 'Show toolbar'}
        >
          {showToolbar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {showToolbar && (
        <div className="border-b border-slate-200 p-2 flex flex-wrap gap-1 bg-slate-50">
          {toolbarButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
              title={btn.label}
            >
              <btn.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      )}

      <div className={`grid ${viewMode === 'split' ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-slate-200`}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="relative">
            <textarea
              id="markdown-textarea"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Write your article content in markdown...'}
              className="w-full h-[600px] p-4 font-mono text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-none"
              spellCheck="true"
            />
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="bg-white overflow-auto h-[600px]">
            <div className="p-6 prose prose-slate max-w-none">
              {value ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeMarkdownHtml(enhancedMarkdownToHtml(value)) }} />
              ) : (
                <p className="text-slate-400 italic">Preview will appear here...</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span>{value.length} characters</span>
          <span>{value.split(/\s+/).filter(w => w).length} words</span>
          <span>{Math.ceil(value.split(/\s+/).filter(w => w).length / 200)} min read</span>
        </div>
        <div className="text-slate-400">
          Supports Markdown, tables, code blocks, callouts & more
        </div>
      </div>
    </div>
  );
}
