import { useEffect, useState, useCallback, useRef } from 'react';

interface UseScrollDepthOptions {
  threshold?: number;
  delayMs?: number;
  enabled?: boolean;
  triggerOnce?: boolean;
}

export const useScrollDepth = (options: UseScrollDepthOptions = {}) => {
  const {
    threshold = 50,
    delayMs = 300,
    enabled = true,
    triggerOnce = true
  } = options;

  const [hasReachedDepth, setHasReachedDepth] = useState(false);
  const hasTriggeredRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateScrollPercentage = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const scrollableHeight = documentHeight - windowHeight;

    if (scrollableHeight <= 0) return 0;

    return (scrollTop / scrollableHeight) * 100;
  }, []);

  const handleScroll = useCallback(() => {
    if (!enabled || (triggerOnce && hasTriggeredRef.current)) return;

    const scrollPercentage = calculateScrollPercentage();

    if (scrollPercentage >= threshold) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setHasReachedDepth(true);
        if (triggerOnce) {
          hasTriggeredRef.current = true;
        }
      }, delayMs);
    }
  }, [enabled, threshold, delayMs, triggerOnce, calculateScrollPercentage]);

  const reset = useCallback(() => {
    setHasReachedDepth(false);
    hasTriggeredRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, handleScroll]);

  return { hasReachedDepth, reset, scrollPercentage: calculateScrollPercentage() };
};
