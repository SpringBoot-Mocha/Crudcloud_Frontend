/**
 * Performance Optimization Utilities
 * Apple-style performance optimizations for premium user experience
 */

// Debounce utility for scroll and resize events
export const debounce = (func, wait, immediate = false) => {
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

// Throttle utility for animation and scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility for images and components
export const lazyLoad = (element, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
  return observer;
};

// Performance monitoring utilities
export const performanceMonitor = {
  startTime: null,

  start() {
    this.startTime = performance.now();
  },

  end(label = 'Operation') {
    if (this.startTime) {
      const duration = performance.now() - this.startTime;
      console.log(`${label} took ${duration.toFixed(2)}ms`);

      // Log to analytics in production
      if (process.env.NODE_ENV === 'production') {
        // Send to analytics service
        this.logToAnalytics(label, duration);
      }
    }
  },

  logToAnalytics(label, duration) {
    // Implementation for analytics service
    console.log(`[Analytics] ${label}: ${duration}ms`);
  }
};

// Memory optimization for large datasets
export const optimizeMemory = {
  // Clear unused references
  clearUnused: () => {
    if (typeof window !== 'undefined' && window.gc) {
      window.gc();
    }
  },

  // Batch updates for large state changes
  batchUpdates: (updates, batchSize = 100) => {
    const batches = [];
    for (let i = 0; i < updates.length; i += batchSize) {
      batches.push(updates.slice(i, i + batchSize));
    }
    return batches;
  }
};

// Animation performance utilities
export const animationPerformance = {
  // Use will-change for elements that will animate
  setWillChange: (element, properties = ['transform', 'opacity']) => {
    element.style.willChange = properties.join(', ');
  },

  // Clear will-change after animation
  clearWillChange: (element) => {
    element.style.willChange = 'auto';
  },

  // Optimize for GPU acceleration
  useGPU: (element) => {
    element.style.transform = 'translateZ(0)';
  }
};

// Responsive image optimization
export const responsiveImages = {
  // Generate srcset for responsive images
  generateSrcSet: (baseUrl, widths = [320, 640, 768, 1024, 1280, 1536]) => {
    return widths.map(width => `${baseUrl}?width=${width} ${width}w`).join(', ');
  },

  // Generate sizes attribute for responsive images
  generateSizes: (breakpoints = {
    default: '100vw',
    '640px': '50vw',
    '1024px': '33vw'
  }) => {
    return Object.entries(breakpoints)
      .map(([query, size]) => query === 'default' ? size : `(min-width: ${query}) ${size}`)
      .join(', ');
  }
};

// Network optimization utilities
export const networkOptimization = {
  // Preload critical resources
  preloadResources: (resources = []) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.as || 'fetch';
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      document.head.appendChild(link);
    });
  },

  // Preconnect to external domains
  preconnect: (domains = []) => {
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
};

// Bundle optimization utilities
export const bundleOptimization = {
  // Dynamic import for code splitting
  dynamicImport: async (componentPath) => {
    try {
      const module = await import(/* webpackChunkName: "[request]" */ componentPath);
      return module.default;
    } catch (error) {
      console.error('Dynamic import failed:', error);
      return null;
    }
  },

  // Lazy load components with React.lazy
  lazyComponent: (importFunction) => {
    return React.lazy(importFunction);
  }
};

export default {
  debounce,
  throttle,
  lazyLoad,
  performanceMonitor,
  optimizeMemory,
  animationPerformance,
  responsiveImages,
  networkOptimization,
  bundleOptimization
};