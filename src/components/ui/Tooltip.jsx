import React, { useState } from 'react';

/**
 * Premium Tooltip Component
 *
 * Features:
 * - Multiple positions (top, bottom, left, right)
 * - Smooth animations
 * - Accessible with ARIA
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-dark-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-dark-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-dark-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-dark-900',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && content && (
        <div
          role="tooltip"
          className={`
            absolute z-50
            px-3 py-2
            bg-dark-900 text-white
            text-sm font-medium
            rounded-lg
            shadow-lg
            whitespace-nowrap
            animate-fade-in
            ${positions[position]}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
        >
          {content}

          {/* Arrow */}
          <div
            className={`
              absolute
              w-0 h-0
              border-4 border-transparent
              ${arrows[position]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
