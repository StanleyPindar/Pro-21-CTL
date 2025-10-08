import { useEffect, useState, useCallback, useRef } from 'react';

interface UseExitIntentOptions {
  threshold?: number;
  delayMs?: number;
  enabled?: boolean;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const {
    threshold = 10,
    delayMs = 100,
    enabled = true
  } = options;

  const [showExitIntent, setShowExitIntent] = useState(false);
  const hasTriggeredRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (!enabled || hasTriggeredRef.current) return;

    if (e.clientY <= threshold && e.movementY < 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowExitIntent(true);
        hasTriggeredRef.current = true;
      }, delayMs);
    }
  }, [enabled, threshold, delayMs]);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetIntent = useCallback(() => {
    setShowExitIntent(false);
    hasTriggeredRef.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    } else {
      let lastScrollY = window.scrollY;
      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        if (hasTriggeredRef.current) return;

        const currentScrollY = window.scrollY;
        const scrollDelta = lastScrollY - currentScrollY;

        if (scrollDelta > 50 && currentScrollY < 100) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setShowExitIntent(true);
            hasTriggeredRef.current = true;
          }, delayMs);
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, handleMouseLeave, handleMouseEnter, delayMs]);

  return { showExitIntent, resetIntent };
};
