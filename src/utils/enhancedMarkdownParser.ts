function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return '';
  }
  return trimmed;
}

function parseTable(lines: string[], startIndex: number): { html: string; endIndex: number } {
  let i = startIndex;
  const tableLines: string[] = [];

  while (i < lines.length && (lines[i].includes('|') || lines[i].trim() === '')) {
    if (lines[i].trim() !== '') {
      tableLines.push(lines[i]);
    }
    i++;
    if (i < lines.length && !lines[i].includes('|')) break;
  }

  if (tableLines.length < 2) {
    return { html: '', endIndex: startIndex };
  }

  const headerCells = tableLines[0].split('|').map(cell => cell.trim()).filter(cell => cell);
  const alignmentRow = tableLines[1];
  const bodyRows = tableLines.slice(2);

  const alignments = alignmentRow.split('|').map(cell => {
    const trimmed = cell.trim();
    if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
    if (trimmed.endsWith(':')) return 'right';
    return 'left';
  }).filter((_, idx) => idx < headerCells.length);

  let html = '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">';
  html += '<thead class="bg-gray-50"><tr>';
  headerCells.forEach((cell, idx) => {
    const align = alignments[idx] || 'left';
    html += `<th class="px-4 py-3 text-${align} text-sm font-semibold text-gray-900 border-b border-gray-300">${escapeHtml(cell)}</th>`;
  });
  html += '</tr></thead><tbody class="divide-y divide-gray-200 bg-white">';

  bodyRows.forEach((row, rowIdx) => {
    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
    html += `<tr class="${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
    cells.forEach((cell, idx) => {
      const align = alignments[idx] || 'left';
      html += `<td class="px-4 py-3 text-${align} text-sm text-gray-700 border-b border-gray-200">${escapeHtml(cell)}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  return { html, endIndex: i };
}

function parseCodeBlock(lines: string[], startIndex: number): { html: string; endIndex: number } {
  let i = startIndex + 1;
  const codeLines: string[] = [];
  const languageMatch = lines[startIndex].match(/^```(\w+)?/);
  const language = languageMatch?.[1] || '';

  while (i < lines.length && !lines[i].startsWith('```')) {
    codeLines.push(lines[i]);
    i++;
  }

  const code = codeLines.join('\n');
  const escapedCode = escapeHtml(code);

  const html = `<div class="my-6 rounded-lg overflow-hidden border border-gray-300">
    <div class="bg-gray-800 px-4 py-2 text-xs text-gray-300 font-mono flex items-center justify-between">
      <span>${language || 'code'}</span>
    </div>
    <pre class="bg-gray-900 text-gray-100 p-4 overflow-x-auto"><code class="language-${language} text-sm">${escapedCode}</code></pre>
  </div>`;

  return { html, endIndex: i + 1 };
}

function parseCallout(line: string): string | null {
  const calloutMatch = line.match(/^>\s*\[!(\w+)\]\s*(.*)$/);
  if (!calloutMatch) return null;

  const [, type, content] = calloutMatch;
  const typeConfig: Record<string, { class: string; icon: string; title: string }> = {
    'NOTE': { class: 'bg-blue-50 border-blue-300 text-blue-900', icon: 'ℹ️', title: 'Note' },
    'TIP': { class: 'bg-green-50 border-green-300 text-green-900', icon: '💡', title: 'Tip' },
    'IMPORTANT': { class: 'bg-yellow-50 border-yellow-300 text-yellow-900', icon: '⚠️', title: 'Important' },
    'WARNING': { class: 'bg-orange-50 border-orange-300 text-orange-900', icon: '⚠️', title: 'Warning' },
    'CAUTION': { class: 'bg-red-50 border-red-300 text-red-900', icon: '🚨', title: 'Caution' },
  };

  const config = typeConfig[type.toUpperCase()] || typeConfig['NOTE'];

  return `<div class="my-6 ${config.class} border-l-4 rounded-r-lg p-4">
    <div class="flex items-start">
      <span class="text-2xl mr-3">${config.icon}</span>
      <div class="flex-1">
        <p class="font-semibold mb-1">${config.title}</p>
        <p>${escapeHtml(content)}</p>
      </div>
    </div>
  </div>`;
}

function parseInlineFormatting(text: string): string {
  let result = text;

  result = result.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, text, url) => {
    const safeUrl = sanitizeUrl(url);
    if (!safeUrl) return escapeHtml(text);
    return `<a href="${escapeHtml(safeUrl)}" class="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors">${escapeHtml(text)}</a>`;
  });

  result = result.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (match, alt, url) => {
    const safeUrl = sanitizeUrl(url);
    if (!safeUrl) return '';
    return `<img src="${escapeHtml(safeUrl)}" alt="${escapeHtml(alt)}" class="rounded-lg my-6 max-w-full h-auto shadow-md" loading="lazy" />`;
  });

  result = result.replace(/\*\*\*(.*?)\*\*\*/g, (match, content) => `<strong class="font-bold"><em class="italic">${escapeHtml(content)}</em></strong>`);
  result = result.replace(/\*\*(.*?)\*\*/g, (match, content) => `<strong class="font-bold">${escapeHtml(content)}</strong>`);
  result = result.replace(/\*(.*?)\*/g, (match, content) => `<em class="italic">${escapeHtml(content)}</em>`);
  result = result.replace(/__(.*?)__/g, (match, content) => `<strong class="font-bold">${escapeHtml(content)}</strong>`);
  result = result.replace(/_(.*?)_/g, (match, content) => `<em class="italic">${escapeHtml(content)}</em>`);

  result = result.replace(/~~(.*?)~~/g, (match, content) => `<del class="line-through text-gray-500">${escapeHtml(content)}</del>`);

  result = result.replace(/`([^`]+)`/g, (match, content) => `<code class="bg-gray-100 text-red-600 px-2 py-0.5 rounded text-sm font-mono">${escapeHtml(content)}</code>`);

  result = result.replace(/==([^=]+)==/g, (match, content) => `<mark class="bg-yellow-200 px-1">${escapeHtml(content)}</mark>`);

  return result;
}

export function enhancedMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      i++;
      continue;
    }

    if (trimmedLine.startsWith('```')) {
      const { html, endIndex } = parseCodeBlock(lines, i);
      htmlParts.push(html);
      i = endIndex;
      continue;
    }

    if (trimmedLine.includes('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const { html, endIndex } = parseTable(lines, i);
      if (html) {
        htmlParts.push(html);
        i = endIndex;
        continue;
      }
    }

    const calloutHtml = parseCallout(trimmedLine);
    if (calloutHtml) {
      htmlParts.push(calloutHtml);
      i++;
      continue;
    }

    if (trimmedLine.startsWith('---') || trimmedLine.startsWith('***') || trimmedLine.startsWith('___')) {
      htmlParts.push('<hr class="my-8 border-t-2 border-gray-300" />');
      i++;
      continue;
    }

    if (trimmedLine.match(/^#{1,6}\s/)) {
      const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const content = parseInlineFormatting(headerMatch[2]);
        const id = headerMatch[2].toLowerCase().replace(/[^\w]+/g, '-');
        const sizeClasses = ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base'];
        const marginClasses = ['mt-12 mb-6', 'mt-10 mb-5', 'mt-8 mb-4', 'mt-6 mb-3', 'mt-4 mb-2', 'mt-3 mb-2'];
        htmlParts.push(`<h${level} id="${id}" class="font-bold text-gray-900 ${sizeClasses[level - 1]} ${marginClasses[level - 1]} scroll-mt-20">${content}</h${level}>`);
      }
      i++;
      continue;
    }

    if (trimmedLine.startsWith('>')) {
      const quoteContent = parseInlineFormatting(trimmedLine.substring(1).trim());
      htmlParts.push(`<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-6 italic text-gray-700 bg-gray-50">${quoteContent}</blockquote>`);
      i++;
      continue;
    }

    if (trimmedLine.match(/^[\*\-\+]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^[\*\-\+]\s/)) {
        const content = parseInlineFormatting(lines[i].trim().substring(2));
        listItems.push(`<li class="mb-2">${content}</li>`);
        i++;
      }
      htmlParts.push(`<ul class="list-disc list-inside space-y-2 my-6 text-gray-700">${listItems.join('')}</ul>`);
      continue;
    }

    if (trimmedLine.match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        const content = parseInlineFormatting(lines[i].trim().replace(/^\d+\.\s/, ''));
        listItems.push(`<li class="mb-2">${content}</li>`);
        i++;
      }
      htmlParts.push(`<ol class="list-decimal list-inside space-y-2 my-6 text-gray-700">${listItems.join('')}</ol>`);
      continue;
    }

    let paragraph = '';
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().match(/^[#>\-\*\+\d]|^```|^\|/)) {
      paragraph += (paragraph ? ' ' : '') + lines[i].trim();
      i++;
    }
    if (paragraph) {
      const content = parseInlineFormatting(paragraph);
      htmlParts.push(`<p class="my-4 text-gray-700 leading-relaxed">${content}</p>`);
    }
  }

  return htmlParts.join('\n');
}

export function extractHeadings(markdown: string): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const lines = markdown.split('\n');

  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').replace(/[*_`~]/g, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }
  });

  return headings;
}

export function estimateReadingTime(markdown: string): number {
  const text = markdown.replace(/[#*_`~\[\]()]/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}
