import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizeHtml';

describe('sanitizeHtml', () => {
  describe('default mode', () => {
    it('allows safe HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      expect(sanitizeHtml(html)).toBe('<p>Hello <strong>World</strong></p>');
    });

    it('removes script tags', () => {
      const html = '<p>Safe</p><script>alert("XSS")</script>';
      expect(sanitizeHtml(html)).toBe('<p>Safe</p>');
    });

    it('removes onclick attributes', () => {
      const html = '<p onclick="alert(\'XSS\')">Click me</p>';
      expect(sanitizeHtml(html)).toBe('<p>Click me</p>');
    });

    it('allows safe links', () => {
      const html = '<a href="https://example.com">Link</a>';
      expect(sanitizeHtml(html)).toContain('href="https://example.com"');
    });

    it('allows images with src and alt', () => {
      const html = '<img src="image.jpg" alt="Test">';
      const result = sanitizeHtml(html);
      expect(result).toContain('src="image.jpg"');
      expect(result).toContain('alt="Test"');
    });

    it('removes javascript: protocol', () => {
      const html = '<a href="javascript:alert(\'XSS\')">Click</a>';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('javascript:');
    });

    it('handles empty string', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('handles plain text', () => {
      expect(sanitizeHtml('Just plain text')).toBe('Just plain text');
    });
  });

  describe('strict mode', () => {
    it('only allows basic formatting', () => {
      const html = '<p>Text <strong>bold</strong> <em>italic</em></p>';
      expect(sanitizeHtml(html, 'strict')).toContain('<strong>bold</strong>');
      expect(sanitizeHtml(html, 'strict')).toContain('<em>italic</em>');
    });

    it('removes links in strict mode', () => {
      const html = '<p>Text with <a href="#">link</a></p>';
      const result = sanitizeHtml(html, 'strict');
      expect(result).not.toContain('<a');
      expect(result).toContain('link');
    });

    it('removes images in strict mode', () => {
      const html = '<p>Text</p><img src="test.jpg">';
      const result = sanitizeHtml(html, 'strict');
      expect(result).not.toContain('<img');
    });
  });

  describe('custom config', () => {
    it('accepts custom DOMPurify config', () => {
      const html = '<p>Text <strong>bold</strong></p>';
      const customConfig = {
        ALLOWED_TAGS: ['p'],
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true
      };
      const result = sanitizeHtml(html, customConfig);
      expect(result).toContain('<p>');
      expect(result).not.toContain('<strong>');
    });

    it('strips all tags with empty ALLOWED_TAGS', () => {
      const html = '<div><span>Nested</span> content</div>';
      const result = sanitizeHtml(html, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
      expect(result).toBe('Nested content');
    });

    it('handles custom tag removal', () => {
      const html = '<div class="test"><h1>Title</h1><p>Paragraph</p></div>';
      const result = sanitizeHtml(html, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
      expect(result).toContain('Title');
      expect(result).toContain('Paragraph');
    });
  });

  describe('security', () => {
    it('prevents XSS via img onerror', () => {
      const html = '<img src="x" onerror="alert(\'XSS\')">';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('onerror');
    });

    it('prevents XSS via svg', () => {
      const html = '<svg onload="alert(\'XSS\')"></svg>';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('onload');
    });

    it('prevents data URI XSS', () => {
      const html = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('data:text/html');
    });
  });
});
