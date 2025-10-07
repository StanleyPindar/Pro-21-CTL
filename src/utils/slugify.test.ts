import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify', () => {
  it('converts string to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('Multiple   Spaces   Here')).toBe('multiple-spaces-here');
  });

  it('trims whitespace from start and end', () => {
    expect(slugify('  trimmed  ')).toBe('trimmed');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles undefined', () => {
    expect(slugify(undefined)).toBe('');
  });

  it('handles clinic names', () => {
    expect(slugify('Sapphire Medical Clinics')).toBe('sapphire-medical-clinics');
    expect(slugify('The Medical Cannabis Clinic')).toBe('the-medical-cannabis-clinic');
  });

  it('preserves hyphens that are not spaces', () => {
    expect(slugify('already-slugified')).toBe('already-slugified');
  });

  it('handles special characters', () => {
    expect(slugify('Test & Test')).toBe('test-&-test');
  });
});
