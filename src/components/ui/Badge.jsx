import React from 'react';
import { X } from 'lucide-react';

/**
 * Premium Badge Component
 *
 * Features:
 * - Multiple variants with gradients
 * - Size variations (sm, md, lg)
 * - Removable/dismissible option
 * - Icon support
 * - Dot indicator option
 * - Pulse animation for status
 * - Sophisticated styling with shadows
 *
 * @example
 * <Badge variant="success" size="md" dot pulse>
 *   Active
 * </Badge>
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon = null,
  dot = false,
  pulse = false,
  removable = false,
  onRemove = null,
  gradient = false,
}) => {

  const baseStyles = `
    badge-base
    select-none
  `;

  const variants = {
    default: `
      bg-dark-100
      text-dark-700
      border border-dark-200
    `,
    primary: gradient ? `
      bg-gradient-to-r from-brand-600 to-brand-500
      text-white
      shadow-brand
    ` : `
      bg-brand-100
      text-brand-700
      border border-brand-200
    `,
    success: gradient ? `
      bg-gradient-to-r from-accent-emerald-600 to-accent-emerald-500
      text-white
      shadow-sm
    ` : `
      bg-accent-emerald-100
      text-accent-emerald-700
      border border-accent-emerald-200
    `,
    warning: gradient ? `
      bg-gradient-to-r from-accent-amber-600 to-accent-amber-500
      text-white
      shadow-sm
    ` : `
      bg-accent-amber-100
      text-accent-amber-700
      border border-accent-amber-200
    `,
    danger: gradient ? `
      bg-gradient-to-r from-accent-rose-600 to-accent-rose-500
      text-white
      shadow-sm
    ` : `
      bg-accent-rose-100
      text-accent-rose-700
      border border-accent-rose-200
    `,
    info: gradient ? `
      bg-gradient-to-r from-accent-blue-600 to-accent-cyan-500
      text-white
      shadow-sm
    ` : `
      bg-accent-blue-100
      text-accent-blue-700
      border border-accent-blue-200
    `,
    purple: gradient ? `
      bg-gradient-to-r from-brand-600 to-brand-500
      text-white
      shadow-brand
    ` : `
      bg-brand-100
      text-brand-700
      border border-brand-200
    `,
    dark: `
      bg-dark-800
      text-white
      border border-dark-700
    `,
    light: `
      bg-white
      text-dark-700
      border border-dark-200
      shadow-sm
    `,
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-2xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <span className="flex items-center gap-1.5">
        {/* Dot Indicator */}
        {dot && (
          <span className="relative flex items-center justify-center">
            <span className={`
              ${dotSizes[size]}
              rounded-full
              ${gradient ? 'bg-white' : 'bg-current'}
              ${pulse ? 'animate-pulse' : ''}
            `} />
            {pulse && (
              <span className={`
                absolute
                ${dotSizes[size]}
                rounded-full
                ${gradient ? 'bg-white' : 'bg-current'}
                opacity-75
                animate-ping
              `} />
            )}
          </span>
        )}

        {/* Icon */}
        {icon && !dot && (
          <span className="flex-shrink-0">
            {React.cloneElement(icon, { size: iconSizes[size] })}
          </span>
        )}

        {/* Content */}
        <span className="font-semibold">
          {children}
        </span>

        {/* Remove Button */}
        {removable && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={`
              flex-shrink-0
              ml-1
              -mr-1
              hover:opacity-70
              transition-opacity
              focus:outline-none
            `}
            aria-label="Remove badge"
          >
            <X size={iconSizes[size]} />
          </button>
        )}
      </span>
    </span>
  );
};

/**
 * Badge Group Component - For displaying multiple badges
 */
export const BadgeGroup = ({
  children,
  className = '',
  spacing = 'md',
}) => {
  const spacings = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <div className={`
      flex flex-wrap items-center
      ${spacings[spacing]}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  );
};

/**
 * Status Badge Component - Predefined for common statuses
 */
export const StatusBadge = ({ status, ...props }) => {
  const statusConfig = {
    online: {
      variant: 'success',
      children: 'Online',
      dot: true,
      pulse: true,
    },
    offline: {
      variant: 'default',
      children: 'Offline',
      dot: true,
    },
    running: {
      variant: 'success',
      children: 'Running',
      dot: true,
      pulse: true,
    },
    stopped: {
      variant: 'danger',
      children: 'Stopped',
      dot: true,
    },
    suspended: {
      variant: 'warning',
      children: 'Suspended',
      dot: true,
    },
    pending: {
      variant: 'info',
      children: 'Pending',
      dot: true,
      pulse: true,
    },
    active: {
      variant: 'success',
      children: 'Active',
      dot: true,
    },
    inactive: {
      variant: 'default',
      children: 'Inactive',
      dot: true,
    },
    error: {
      variant: 'danger',
      children: 'Error',
      dot: true,
    },
    warning: {
      variant: 'warning',
      children: 'Warning',
      dot: true,
    },
  };

  const config = statusConfig[status.toLowerCase()] || {
    variant: 'default',
    children: status,
  };

  return <Badge {...config} {...props} />;
};

export default Badge;
