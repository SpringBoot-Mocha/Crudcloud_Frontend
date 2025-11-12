/**
 * Performance Monitor Component
 * Apple-style performance monitoring for premium user experience
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = ({ show = false, autoHide = true }) => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    layoutShifts: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  });

  const [isVisible, setIsVisible] = useState(show);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const measureFPS = () => {
      const now = performance.now();
      frameCount.current++;

      if (now >= lastTime.current + 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));

        setMetrics(prev => ({
          ...prev,
          fps: Math.min(fps, 60) // Cap at 60 for smooth animations
        }));

        frameCount.current = 0;
        lastTime.current = now;
      }

      animationFrame.current = requestAnimationFrame(measureFPS);
    };

    // Start FPS measurement
    animationFrame.current = requestAnimationFrame(measureFPS);

    // Measure memory usage (if available)
    if ('memory' in performance) {
      const memoryInterval = setInterval(() => {
        const usedMemory = performance.memory.usedJSHeapSize / (1024 * 1024);
        setMetrics(prev => ({ ...prev, memory: Math.round(usedMemory) }));
      }, 2000);

      return () => {
        clearInterval(memoryInterval);
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
      };
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    // Auto-hide after 5 seconds
    if (autoHide && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide]);

  useEffect(() => {
    // Listen for performance events
    const handlePerformanceEntries = (entries) => {
      entries.forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, largestContentfulPaint: Math.round(entry.startTime) }));
        } else if (entry.entryType === 'layout-shift') {
          setMetrics(prev => ({
            ...prev,
            layoutShifts: prev.layoutShifts + 1,
            cumulativeLayoutShift: prev.cumulativeLayoutShift + entry.value
          }));
        }
      });
    };

    const observer = new PerformanceObserver(handlePerformanceEntries);

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, []);

  const getPerformanceColor = (value, thresholds) => {
    if (value >= thresholds.good) return 'text-green-500';
    if (value >= thresholds.ok) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceIcon = (value, thresholds) => {
    if (value >= thresholds.good) return '🟢';
    if (value >= thresholds.ok) return '🟡';
    return '🔴';
  };

  const performanceThresholds = {
    fps: { good: 55, ok: 45 },
    memory: { good: 50, ok: 100 },
    largestContentfulPaint: { good: 2500, ok: 4000 },
    cumulativeLayoutShift: { good: 0.1, ok: 0.25 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-elevation-3 border border-slate-200/50 p-4 min-w-[280px] space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full animate-pulse" />
                Performance Monitor
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* FPS */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className={getPerformanceColor(metrics.fps, performanceThresholds.fps)}>
                    {getPerformanceIcon(metrics.fps, performanceThresholds.fps)}
                  </span>
                  <span className="text-slate-600 font-medium">FPS</span>
                </div>
                <div className={`font-mono font-bold ${getPerformanceColor(metrics.fps, performanceThresholds.fps)}`}>
                  {metrics.fps}
                </div>
              </div>

              {/* Memory */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className={getPerformanceColor(metrics.memory, performanceThresholds.memory)}>
                    {getPerformanceIcon(metrics.memory, performanceThresholds.memory)}
                  </span>
                  <span className="text-slate-600 font-medium">Memory</span>
                </div>
                <div className={`font-mono font-bold ${getPerformanceColor(metrics.memory, performanceThresholds.memory)}`}>
                  {metrics.memory}MB
                </div>
              </div>

              {/* LCP */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className={getPerformanceColor(metrics.largestContentfulPaint, performanceThresholds.largestContentfulPaint)}>
                    {getPerformanceIcon(metrics.largestContentfulPaint, performanceThresholds.largestContentfulPaint)}
                  </span>
                  <span className="text-slate-600 font-medium">LCP</span>
                </div>
                <div className={`font-mono font-bold ${getPerformanceColor(metrics.largestContentfulPaint, performanceThresholds.largestContentfulPaint)}`}>
                  {metrics.largestContentfulPaint}ms
                </div>
              </div>

              {/* CLS */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className={getPerformanceColor(metrics.cumulativeLayoutShift, performanceThresholds.cumulativeLayoutShift)}>
                    {getPerformanceIcon(metrics.cumulativeLayoutShift, performanceThresholds.cumulativeLayoutShift)}
                  </span>
                  <span className="text-slate-600 font-medium">CLS</span>
                </div>
                <div className={`font-mono font-bold ${getPerformanceColor(metrics.cumulativeLayoutShift, performanceThresholds.cumulativeLayoutShift)}`}>
                  {metrics.cumulativeLayoutShift.toFixed(3)}
                </div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="pt-2">
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${Math.min((metrics.fps / 60) * 100, 100)}%`
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                <div className={`w-2 h-2 rounded-full ${
                  metrics.fps >= 55 ? 'bg-green-500' :
                  metrics.fps >= 45 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs font-medium text-slate-700">
                  {metrics.fps >= 55 ? 'Optimal' :
                   metrics.fps >= 45 ? 'Acceptable' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Global performance monitoring hook
export const usePerformanceMonitor = () => {
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Show monitor on Shift + P
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'P') {
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return {
    PerformanceMonitor: () => <PerformanceMonitor show={showMonitor} />,
    showMonitor,
    setShowMonitor
  };
};

export default PerformanceMonitor;