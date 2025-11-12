/**
 * Performance Configuration
 * Apple-style performance optimizations for premium user experience
 */

export const performanceConfig = {
  // Animation performance settings
  animations: {
    // Reduce motion for accessibility
    reduceMotion: {
      enabled: true,
      threshold: 0.1 // Reduce animations when FPS drops below 10%
    },

    // GPU acceleration settings
    gpuAcceleration: {
      enabled: true,
      properties: ['transform', 'opacity']
    },

    // Animation frame rate
    frameRate: {
      target: 60,
      fallback: 30
    }
  },

  // Image optimization settings
  images: {
    // Lazy loading
    lazyLoading: {
      enabled: true,
      threshold: '200px',
      rootMargin: '50px'
    },

    // Responsive images
    responsive: {
      enabled: true,
      breakpoints: [320, 640, 768, 1024, 1280, 1536, 1920],
      formats: ['webp', 'avif', 'jpg', 'png']
    },

    // Quality settings
    quality: {
      mobile: 75,
      tablet: 80,
      desktop: 90
    }
  },

  // Network optimization
  network: {
    // Preloading
    preload: {
      critical: true,
      fonts: true,
      aboveFold: true
    },

    // Preconnecting
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],

    // Caching strategies
    caching: {
      static: '1 year',
      dynamic: '1 hour',
      api: '5 minutes'
    }
  },

  // Bundle optimization
  bundle: {
    // Code splitting
    codeSplitting: {
      enabled: true,
      chunks: {
        vendor: ['react', 'react-dom'],
        ui: ['framer-motion', 'lucide-react'],
        utils: ['clsx', 'zod']
      }
    },

    // Tree shaking
    treeShaking: {
      enabled: true,
      sideEffects: false
    },

    // Minification
    minification: {
      enabled: true,
      removeConsole: true,
      removeDebugger: true
    }
  },

  // Memory optimization
  memory: {
    // Garbage collection
    gc: {
      enabled: true,
      threshold: 100 // MB
    },

    // State management
    state: {
      maxSize: 50, // MB
      cleanupInterval: 30000 // 30 seconds
    }
  },

  // Responsive performance
  responsive: {
    // Mobile optimizations
    mobile: {
      reduceAnimations: true,
      lowerImageQuality: true,
      deferNonCritical: true
    },

    // Tablet optimizations
    tablet: {
      reduceAnimations: false,
      mediumImageQuality: true,
      deferNonCritical: false
    },

    // Desktop optimizations
    desktop: {
      fullAnimations: true,
      highImageQuality: true,
      loadEverything: true
    }
  },

  // Monitoring and analytics
  monitoring: {
    // Performance metrics
    metrics: {
      enabled: true,
      sampleRate: 0.1, // 10% of users
      thresholds: {
        lcp: 2500, // 2.5 seconds
        fid: 100,  // 100 milliseconds
        cls: 0.1,  // 0.1 cumulative layout shift
        fps: 45    // 45 frames per second
      }
    },

    // Error tracking
    errors: {
      enabled: true,
      captureUnhandled: true,
      captureRejections: true
    }
  },

  // Accessibility performance
  accessibility: {
    // Focus management
    focus: {
      trapFocus: true,
      restoreFocus: true,
      focusVisible: true
    },

    // Screen reader optimizations
    screenReader: {
      announceChanges: true,
      liveRegions: true,
      ariaLabels: true
    },

    // Keyboard navigation
    keyboard: {
      tabIndex: 0,
      focusOrder: 'logical',
      skipLinks: true
    }
  }
};

// Performance thresholds for different device types
export const performanceThresholds = {
  mobile: {
    fps: 45,
    memory: 50,
    lcp: 3000,
    fid: 150,
    cls: 0.15
  },
  tablet: {
    fps: 50,
    memory: 75,
    lcp: 2500,
    fid: 100,
    cls: 0.1
  },
  desktop: {
    fps: 60,
    memory: 100,
    lcp: 2000,
    fid: 50,
    cls: 0.05
  }
};

// Performance monitoring events
export const performanceEvents = {
  // Core Web Vitals
  LARGEST_CONTENTFUL_PAINT: 'largest-contentful-paint',
  FIRST_INPUT_DELAY: 'first-input-delay',
  CUMULATIVE_LAYOUT_SHIFT: 'layout-shift',

  // Custom performance events
  COMPONENT_LOAD: 'component-load',
  ANIMATION_START: 'animation-start',
  ANIMATION_END: 'animation-end',
  NETWORK_REQUEST: 'network-request',
  MEMORY_USAGE: 'memory-usage'
};

// Performance optimization strategies
export const optimizationStrategies = {
  // Lazy loading strategies
  LAZY_LOAD: {
    IMAGES: 'lazy-load-images',
    COMPONENTS: 'lazy-load-components',
    ROUTES: 'lazy-load-routes'
  },

  // Caching strategies
  CACHE: {
    STATIC: 'cache-static',
    DYNAMIC: 'cache-dynamic',
    API: 'cache-api'
  },

  // Compression strategies
  COMPRESS: {
    BROTLI: 'compress-brotli',
    GZIP: 'compress-gzip',
    IMAGES: 'compress-images'
  },

  // Delivery strategies
  DELIVER: {
    CDN: 'deliver-cdn',
    PREFETCH: 'deliver-prefetch',
    PRELOAD: 'deliver-preload'
  }
};

// Performance monitoring configuration
export const monitoringConfig = {
  // Performance Observer configuration
  observer: {
    entryTypes: [
      'navigation',
      'resource',
      'paint',
      'largest-contentful-paint',
      'layout-shift',
      'first-input'
    ],
    buffered: true
  },

  // Custom metrics
  customMetrics: {
    componentRenderTime: true,
    animationFrameRate: true,
    memoryUsage: true,
    networkLatency: true
  },

  // Reporting configuration
  reporting: {
    endpoint: '/api/performance',
    sampleRate: 0.1,
    batchSize: 10,
    flushInterval: 30000
  }
};

export default {
  performanceConfig,
  performanceThresholds,
  performanceEvents,
  optimizationStrategies,
  monitoringConfig
};