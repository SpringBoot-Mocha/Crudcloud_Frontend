import React from 'react';

/**
 * Premium Card Component
 *
 * Features:
 * - Multiple variants (default, bordered, glass, gradient)
 * - Hover effects with elevation
 * - Interactive states
 * - Gradient border option
 * - Glass morphism effect
 * - Padding variations
 * - Shadow variations
 *
 * @example
 * <Card variant="gradient" hoverable interactive>
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Content</CardBody>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 */
const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hoverable = false,
  interactive = false,
  onClick = null,
  shadow = 'md',
  borderGradient = false,
}) => {

  const baseStyles = `
    card-base
    relative
    overflow-hidden
  `;

  const variants = {
    default: `
      bg-white
      border border-dark-200/50
    `,
    bordered: `
      bg-white
      border-2 border-dark-300
    `,
    elevated: `
      bg-white
      border-0
      shadow-elevation-2
    `,
    glass: `
      glass
      border border-white/20
      shadow-lg
    `,
    gradient: `
      bg-gradient-to-br from-white via-brand-50/30 to-accent-blue-50/30
      border border-brand-200/50
    `,
    dark: `
      bg-gradient-dark
      border border-dark-700
      text-white
    `,
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-elevation-1',
    lg: 'shadow-elevation-2',
    xl: 'shadow-elevation-3',
  };

  const hoverStyles = hoverable ? `
    transition-all duration-300
    hover:shadow-elevation-3
    hover:border-brand-300/50
    hover:-translate-y-1
  ` : '';

  const interactiveStyles = interactive ? `
    cursor-pointer
    active:scale-[0.98]
  ` : '';

  return (
    <div
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${shadows[shadow]}
        ${hoverStyles}
        ${interactiveStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Gradient Border Overlay */}
      {borderGradient && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 via-accent-blue-500 to-accent-cyan-500 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Shimmer Effect on Hover */}
      {hoverable && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * Card Header Component
 */
export const CardHeader = ({
  children,
  className = '',
  divider = false,
  gradient = false,
}) => {
  return (
    <div className={`
      ${divider ? 'pb-4 border-b border-dark-200/50' : 'pb-4'}
      ${gradient ? 'gradient-text' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
export const CardBody = ({
  children,
  className = '',
  padding = true,
}) => {
  return (
    <div className={`
      ${padding ? 'py-4' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
export const CardFooter = ({
  children,
  className = '',
  divider = false,
  align = 'right',
}) => {
  const alignments = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`
      flex items-center gap-3
      ${alignments[align]}
      ${divider ? 'pt-4 border-t border-dark-200/50' : 'pt-4'}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </div>
  );
};

/**
 * Card Title Component
 */
export const CardTitle = ({
  children,
  className = '',
  gradient = false,
  as: Component = 'h3',
}) => {
  return (
    <Component className={`
      text-xl font-bold text-dark-900
      ${gradient ? 'gradient-text' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </Component>
  );
};

/**
 * Card Description Component
 */
export const CardDescription = ({
  children,
  className = '',
}) => {
  return (
    <p className={`
      text-sm text-dark-600 mt-1
      ${className}
    `.trim().replace(/\s+/g, ' ')}>
      {children}
    </p>
  );
};

export default Card;
