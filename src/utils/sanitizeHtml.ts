import DOMPurify from 'dompurify';

export interface SanitizeConfig {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  ALLOW_DATA_ATTR?: boolean;
  KEEP_CONTENT?: boolean;
}

const DEFAULT_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'em', 'u', 's', 'del', 'mark', 'b', 'i',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span',
    'sup', 'sub'
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel',
    'src', 'alt', 'title', 'loading',
    'class', 'id',
    'align',
    'colspan', 'rowspan'
  ],
  ALLOW_DATA_ATTR: false,
  KEEP_CONTENT: true,
  RETURN_TRUSTED_TYPE: false,
};

const STRICT_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
};

export function sanitizeHtml(
  dirtyHtml: string,
  config: 'default' | 'strict' | DOMPurify.Config = 'default'
): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') {
    return '';
  }

  let sanitizeConfig: DOMPurify.Config;

  if (config === 'default') {
    sanitizeConfig = DEFAULT_CONFIG;
  } else if (config === 'strict') {
    sanitizeConfig = STRICT_CONFIG;
  } else {
    sanitizeConfig = config;
  }

  try {
    const clean = DOMPurify.sanitize(dirtyHtml, sanitizeConfig);
    return clean;
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return '';
  }
}

export function sanitizeMarkdownHtml(html: string): string {
  return sanitizeHtml(html, {
    ...DEFAULT_CONFIG,
    ADD_TAGS: ['section', 'article', 'aside', 'nav', 'footer', 'header'],
    ADD_ATTR: ['style'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

export function createSafeHtml(html: string, sanitize: boolean = true): { __html: string } {
  if (!sanitize) {
    console.warn('Bypassing HTML sanitization - ensure content is trusted!');
    return { __html: html };
  }

  return { __html: sanitizeHtml(html) };
}

export function sanitizeReviewContent(html: string): string {
  return sanitizeHtml(html, {
    ...DEFAULT_CONFIG,
    ALLOWED_TAGS: [
      ...DEFAULT_CONFIG.ALLOWED_TAGS || [],
      'section', 'article', 'aside', 'header', 'footer'
    ],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  });
}

export default sanitizeHtml;
