import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('updates value after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 50 } }
    );

    expect(result.current).toBe('initial');
    rerender({ value: 'updated', delay: 50 });
    expect(result.current).toBe('initial');

    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 200 });
  });

  it('works with different data types', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 50),
      { initialProps: { value: 42 } }
    );

    expect(result.current).toBe(42);
    rerender({ value: 100 });

    await waitFor(() => {
      expect(result.current).toBe(100);
    }, { timeout: 200 });
  });

  it('works with objects', async () => {
    const obj1 = { name: 'first' };
    const obj2 = { name: 'second' };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 50),
      { initialProps: { value: obj1 } }
    );

    expect(result.current).toBe(obj1);
    rerender({ value: obj2 });

    await waitFor(() => {
      expect(result.current).toBe(obj2);
    }, { timeout: 200 });
  });
});
