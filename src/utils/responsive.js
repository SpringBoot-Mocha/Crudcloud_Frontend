/**
 * Responsive Design Utilities
 * Apple-style responsive utilities for premium mobile experience
 */

import { useState, useEffect } from 'react';

// Breakpoints following Apple design principles
export const breakpoints = {
  xs: 0,      // Extra small: Mobile portrait
  sm: 480,    // Small: Mobile landscape
  md: 768,    // Medium: Tablet
  lg: 1024,   // Large: Desktop
  xl: 1280,   // Extra large: Large desktop
  '2xl': 1536 // 2X large: Extra large desktop
};

// Hook to get current breakpoint
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= breakpoints['2xl']) setBreakpoint('2xl');
      else if (width >= breakpoints.xl) setBreakpoint('xl');
      else if (width >= breakpoints.lg) setBreakpoint('lg');
      else if (width >= breakpoints.md) setBreakpoint('md');
      else if (width >= breakpoints.sm) setBreakpoint('sm');
      else setBreakpoint('xs');
    };

    // Initial call
    handleResize();

    // Debounced resize listener
    const debouncedResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return breakpoint;
};

// Hook to check if current viewport matches a breakpoint
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = () => setMatches(media.matches);

    // Initial check
    updateMatches();

    // Add listener
    media.addEventListener('change', updateMatches);

    return () => media.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
};

// Common media queries for Apple-style design
export const mediaQueries = {
  // Device types
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',

  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',

  // Feature detection
  touch: '(hover: none) and (pointer: coarse)',
  hover: '(hover: hover) and (pointer: fine)',

  // Performance considerations
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
  darkMode: '(prefers-color-scheme: dark)'
};

// Responsive spacing system
export const responsiveSpacing = {
  // Apple-style spacing scale
  xs: {
    mobile: '0.5rem',
    tablet: '0.75rem',
    desktop: '1rem'
  },
  sm: {
    mobile: '1rem',
    tablet: '1.25rem',
    desktop: '1.5rem'
  },
  md: {
    mobile: '1.5rem',
    tablet: '2rem',
    desktop: '2.5rem'
  },
  lg: {
    mobile: '2rem',
    tablet: '3rem',
    desktop: '4rem'
  },
  xl: {
    mobile: '3rem',
    tablet: '4rem',
    desktop: '6rem'
  }
};

// Responsive typography system
export const responsiveTypography = {
  h1: {
    mobile: '2.5rem',
    tablet: '3rem',
    desktop: '4rem'
  },
  h2: {
    mobile: '2rem',
    tablet: '2.5rem',
    desktop: '3rem'
  },
  h3: {
    mobile: '1.75rem',
    tablet: '2rem',
    desktop: '2.25rem'
  },
  body: {
    mobile: '1rem',
    tablet: '1.125rem',
    desktop: '1.25rem'
  },
  small: {
    mobile: '0.875rem',
    tablet: '0.9375rem',
    desktop: '1rem'
  }
};

// Utility function to get responsive value
export const getResponsiveValue = (values, breakpoint) => {
  if (typeof values === 'object') {
    return values[breakpoint] || values.desktop || values.mobile;
  }
  return values;
};

// Touch optimization utilities
export const touchOptimization = {
  // Minimum touch target size (Apple guidelines: 44px)
  minTouchSize: '44px',

  // Touch-friendly spacing
  touchSpacing: {
    horizontal: '16px',
    vertical: '12px'
  },

  // Touch feedback styles
  touchFeedback: {
    active: 'scale(0.98)',
    transition: 'transform 0.1s ease-out'
  }
};

// Performance optimization for mobile
export const mobilePerformance = {
  // Reduce animations on mobile
  reducedAnimations: {
    mobile: 'none',
    tablet: 'subtle',
    desktop: 'full'
  },

  // Optimize images for mobile
  imageOptimization: {
    mobile: {
      quality: 75,
      format: 'webp',
      maxWidth: 768
    },
    tablet: {
      quality: 80,
      format: 'webp',
      maxWidth: 1024
    },
    desktop: {
      quality: 90,
      format: 'webp',
      maxWidth: 1920
    }
  },

  // Lazy loading thresholds
  lazyLoadThreshold: {
    mobile: '200px',
    tablet: '300px',
    desktop: '500px'
  }
};

// Accessibility utilities for responsive design
export const responsiveAccessibility = {
  // Minimum font sizes
  minFontSize: {
    mobile: '16px', // Prevent zoom on iOS
    tablet: '14px',
    desktop: '12px'
  },

  // Line heights for readability
  lineHeight: {
    mobile: '1.6',
    tablet: '1.5',
    desktop: '1.4'
  },

  // Contrast ratios
  contrast: {
    normal: '4.5:1',
    large: '3:1'
  }
};

// Grid system for responsive layouts
export const responsiveGrid = {
  // Apple-style grid columns
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12
  },

  // Gutters
  gutter: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px'
  },

  // Max container widths
  container: {
    mobile: '100%',
    tablet: '720px',
    desktop: '1200px',
    wide: '1400px'
  }
};

// Helper function for responsive CSS classes
export const responsiveClass = (baseClass, breakpointVariants) => {
  const classes = [baseClass];

  Object.entries(breakpointVariants).forEach(([breakpoint, variant]) => {
    if (variant) {
      classes.push(`${baseClass}-${breakpoint}-${variant}`);
    }
  });

  return classes.join(' ');
};

// Debounce utility (reused from performance.js)
const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

export default {
  breakpoints,
  useBreakpoint,
  useMediaQuery,
  mediaQueries,
  responsiveSpacing,
  responsiveTypography,
  getResponsiveValue,
  touchOptimization,
  mobilePerformance,
  responsiveAccessibility,
  responsiveGrid,
  responsiveClass
};