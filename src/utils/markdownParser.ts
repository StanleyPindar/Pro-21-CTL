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

function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown;

  html = html.replace(/^### (.*$)/gim, (match, content) => `<h3>${escapeHtml(content)}</h3>`);
  html = html.replace(/^## (.*$)/gim, (match, content) => `<h2>${escapeHtml(content)}</h2>`);
  html = html.replace(/^# (.*$)/gim, (match, content) => `<h1>${escapeHtml(content)}</h1>`);

  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, text, url) => {
    const safeUrl = sanitizeUrl(url);
    if (!safeUrl) return escapeHtml(text);
    return `<a href="${escapeHtml(safeUrl)}">${escapeHtml(text)}</a>`;
  });

  html = html.replace(/\*\*\*(.*?)\*\*\*/g, (match, content) => `<strong><em>${escapeHtml(content)}</em></strong>`);
  html = html.replace(/\*\*(.*?)\*\*/g, (match, content) => `<strong>${escapeHtml(content)}</strong>`);
  html = html.replace(/\*(.*?)\*/g, (match, content) => `<em>${escapeHtml(content)}</em>`);
  html = html.replace(/__(.*?)__/g, (match, content) => `<strong>${escapeHtml(content)}</strong>`);
  html = html.replace(/_(.*?)_/g, (match, content) => `<em>${escapeHtml(content)}</em>`);

  html = html.replace(/`([^`]+)`/g, (match, content) => `<code>${escapeHtml(content)}</code>`);

  html = html.replace(/^> (.*$)/gim, (match, content) => `<blockquote>${escapeHtml(content)}</blockquote>`);

  html = html.replace(/^\* (.*$)/gim, (match, content) => `<li>${escapeHtml(content)}</li>`);
  html = html.replace(/^\- (.*$)/gim, (match, content) => `<li>${escapeHtml(content)}</li>`);
  html = html.replace(/^\+ (.*$)/gim, (match, content) => `<li>${escapeHtml(content)}</li>`);
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  html = html.replace(/^\d+\.\s+(.*$)/gim, (match, content) => `<li>${escapeHtml(content)}</li>`);

  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  if (!html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<ol') && !html.startsWith('<blockquote')) {
    html = '<p>' + html + '</p>';
  }

  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  return html;
}

export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  return simpleMarkdownToHtml(markdown);
};

export const stripMarkdown = (markdown: string, maxLength?: number): string => {
  if (!markdown) return '';

  let text = markdown;
  text = text.replace(/^#{1,6}\s+/gim, '');
  text = text.replace(/\*\*\*?(.*?)\*\*\*?/g, '$1');
  text = text.replace(/___?(.*?)___?/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/^[>\-\*\+]\s+/gim, '');
  text = text.replace(/^\d+\.\s+/gim, '');
  text = text.replace(/\n+/g, ' ');

  if (maxLength && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }

  return text;
};
