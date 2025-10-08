import { useState, useCallback, useEffect } from 'react';
import { useExitIntent } from './useExitIntent';
import { useScrollDepth } from './useScrollDepth';

interface UsePopupTriggerOptions {
  enableExitIntent?: boolean;
  enableScrollDepth?: boolean;
  scrollThreshold?: number;
  scrollDelayMs?: number;
  exitThreshold?: number;
  exitDelayMs?: number;
  enabled?: boolean;
}

export const usePopupTrigger = (options: UsePopupTriggerOptions = {}) => {
  const {
    enableExitIntent = false,
    enableScrollDepth = true,
    scrollThreshold = 50,
    scrollDelayMs = 300,
    exitThreshold = 10,
    exitDelayMs = 100,
    enabled = true
  } = options;

  const [showPopup, setShowPopup] = useState(false);

  const { showExitIntent, resetIntent } = useExitIntent({
    threshold: exitThreshold,
    delayMs: exitDelayMs,
    enabled: enabled && enableExitIntent
  });

  const { hasReachedDepth, reset: resetScrollDepth } = useScrollDepth({
    threshold: scrollThreshold,
    delayMs: scrollDelayMs,
    enabled: enabled && enableScrollDepth,
    triggerOnce: true
  });

  useEffect(() => {
    if (enableExitIntent && showExitIntent) {
      setShowPopup(true);
    }
  }, [enableExitIntent, showExitIntent]);

  useEffect(() => {
    if (enableScrollDepth && hasReachedDepth) {
      setShowPopup(true);
    }
  }, [enableScrollDepth, hasReachedDepth]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    if (enableExitIntent) {
      resetIntent();
    }
    if (enableScrollDepth) {
      resetScrollDepth();
    }
  }, [enableExitIntent, enableScrollDepth, resetIntent, resetScrollDepth]);

  const resetPopup = useCallback(() => {
    setShowPopup(false);
    if (enableExitIntent) {
      resetIntent();
    }
    if (enableScrollDepth) {
      resetScrollDepth();
    }
  }, [enableExitIntent, enableScrollDepth, resetIntent, resetScrollDepth]);

  return { showPopup, closePopup, resetPopup };
};
