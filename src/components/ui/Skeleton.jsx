import React from 'react';

/**
 * Premium Skeleton Loader Component
 *
 * Features:
 * - Smooth shimmer animation
 * - Multiple variants (text, circle, rectangle)
 * - Customizable dimensions
 *
 * @example
 * <Skeleton variant="text" width="200px" />
 * <Skeleton variant="circle" width="48px" height="48px" />
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  };

  return (
    <div
      className={`
        bg-dark-200
        animate-pulse
        relative
        overflow-hidden
        ${variants[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
};

/**
 * Skeleton Group - For loading multiple elements
 */
export const SkeletonGroup = ({ children, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Skeleton - Predefined card loading state
 */
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-dark-200">
      <div className="flex items-start gap-4">
        <Skeleton variant="circle" width="48px" height="48px" />
        <div className="flex-1 space-y-3">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
          <div className="flex gap-2 mt-3">
            <Skeleton variant="rectangle" width="60px" height="24px" />
            <Skeleton variant="rectangle" width="80px" height="24px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
