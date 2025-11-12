import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Premium Button Component
 *
 * Features:
 * - Multiple variants with gradients and sophisticated styling
 * - Size variations (xs, sm, md, lg, xl)
 * - Loading states with spinner
 * - Full width option
 * - Icon support
 * - Ripple effect on click
 * - Excellent accessibility
 *
 * @example
 * <Button variant="gradient" size="lg" icon={<Plus />}>
 *   Create Instance
 * </Button>
 */
const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ...props
}, ref) => {

  const baseStyles = `
    btn-base
    rounded-lg
    font-semibold
    select-none
    relative
    overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    // Gradient primary (hero button)
    gradient: `
      bg-gradient-to-r from-brand-600 to-brand-700
      text-white
      shadow-xl shadow-brand-500/25
      hover:shadow-2xl hover:shadow-brand-500/35
      hover:from-brand-700 hover:to-brand-800
      active:scale-95
      focus-visible:ring-brand-500
      transition-all duration-300
    `,

    // Solid primary
    primary: `
      bg-brand-600
      text-white
      shadow-lg shadow-brand-500/20
      hover:bg-brand-700
      hover:shadow-xl hover:shadow-brand-500/30
      active:bg-brand-800
      focus-visible:ring-brand-500
      transition-all duration-300
    `,

    // Secondary with subtle gradient
    secondary: `
      bg-gradient-to-b from-dark-100 to-dark-200
      text-dark-900
      border border-dark-300
      shadow-sm
      hover:from-dark-200 hover:to-dark-300
      hover:shadow-md
      active:from-dark-300 active:to-dark-400
      focus-visible:ring-dark-400
    `,

    // Ghost/Transparent
    ghost: `
      bg-transparent
      text-dark-700
      hover:bg-dark-100
      hover:text-dark-900
      active:bg-dark-200
      focus-visible:ring-dark-400
    `,

    // Outline
    outline: `
      bg-transparent
      text-brand-600
      border-2 border-brand-600
      hover:bg-brand-50
      hover:border-brand-700
      active:bg-brand-100
      focus-visible:ring-brand-500
    `,

    // Danger
    danger: `
      bg-gradient-to-r from-accent-rose-600 to-accent-rose-500
      text-white
      shadow-elevation-1
      hover:from-accent-rose-700 hover:to-accent-rose-600
      hover:shadow-elevation-2
      active:from-accent-rose-800 active:to-accent-rose-700
      focus-visible:ring-accent-rose-500
    `,

    // Success
    success: `
      bg-gradient-to-r from-accent-emerald-600 to-accent-emerald-500
      text-white
      shadow-elevation-1
      hover:from-accent-emerald-700 hover:to-accent-emerald-600
      hover:shadow-elevation-2
      active:from-accent-emerald-800 active:to-accent-emerald-700
      focus-visible:ring-accent-emerald-500
    `,

    // Link style
    link: `
      bg-transparent
      text-brand-600
      underline-offset-4
      hover:underline
      hover:text-brand-700
      focus-visible:ring-brand-500
      shadow-none
    `,
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none" />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'lg' ? 22 : size === 'xl' ? 24 : 18} />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
