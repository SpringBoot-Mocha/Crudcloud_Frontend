/**
 * Hook para optimización de performance y UX
 * Implementa lazy loading, debouncing, y optimizaciones de rendimiento
 */

import { useCallback, useRef, useEffect } from 'react';

export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export const useThrottle = (callback, delay) => {
  const lastCallRef = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
};

export const useLazyLoad = (ref, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};

export const useOptimizedAnimation = (dependencies = []) => {
  return useCallback((node) => {
    if (node) {
      // Forzar hardware acceleration
      node.style.transform = 'translateZ(0)';
    }
  }, dependencies);
};

export const useScrollPerformance = () => {
  const tickingRef = useRef(false);

  const onScroll = useCallback((callback) => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        callback();
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  return onScroll;
};