import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Info } from 'lucide-react';

/**
 * Premium Input Component
 *
 * Features:
 * - Multiple variants (default, filled, outlined)
 * - Size variations (sm, md, lg)
 * - Validation states (error, success, warning)
 * - Password toggle visibility
 * - Icon support (prefix and suffix)
 * - Helper text and error messages
 * - Floating label option
 * - Character counter
 * - Sophisticated focus states with animations
 *
 * @example
 * <Input
 *   label="Email Address"
 *   type="email"
 *   error="Invalid email format"
 *   prefixIcon={<Mail />}
 * />
 */
const Input = React.forwardRef(({
  label,
  error,
  success,
  warning,
  helperText,
  type = 'text',
  variant = 'default',
  size = 'md',
  className = '',
  prefixIcon = null,
  suffixIcon = null,
  showCharacterCount = false,
  maxLength,
  disabled = false,
  floatingLabel = false,
  value,
  onChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const currentValue = value !== undefined ? value : internalValue;
  const hasValue = currentValue && currentValue.length > 0;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseInputStyles = `
    w-full
    transition-all duration-200
    font-medium
    text-dark-900
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-dark-400 placeholder:font-normal
  `;

  const variants = {
    default: `
      input-base
      ${error ? 'border-accent-rose-500 focus:ring-accent-rose-500/50 focus:border-accent-rose-500' : ''}
      ${success ? 'border-accent-emerald-500 focus:ring-accent-emerald-500/50 focus:border-accent-emerald-500' : ''}
      ${warning ? 'border-accent-amber-500 focus:ring-accent-amber-500/50 focus:border-accent-amber-500' : ''}
    `,
    filled: `
      bg-dark-100
      border-2 border-transparent
      rounded-lg
      transition-all duration-200
      focus:bg-white
      focus:border-brand-500
      focus:ring-2 focus:ring-brand-500/20
      ${error ? 'border-accent-rose-500 focus:border-accent-rose-500' : ''}
    `,
    outlined: `
      bg-white
      border-2 border-dark-300
      rounded-lg
      transition-all duration-200
      focus:border-brand-500
      focus:ring-2 focus:ring-brand-500/20
      focus:bg-white
      ${error ? 'border-accent-rose-500 focus:border-accent-rose-500' : ''}
    `,
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && !floatingLabel && (
        <label className="block text-sm font-semibold text-dark-700 mb-2">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className={`relative ${floatingLabel ? 'pt-2' : ''}`}>
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none z-10 ${floatingLabel ? 'top-1/2 mt-1' : ''}`}>
            {React.cloneElement(prefixIcon, { size: iconSizes[size] })}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          className={`
            ${baseInputStyles}
            ${variants[variant]}
            ${sizes[size]}
            ${prefixIcon ? 'pl-10' : ''}
            ${suffixIcon || type === 'password' || showCharacterCount ? 'pr-10' : ''}
            ${error ? 'border-accent-rose-500' : ''}
            ${success ? 'border-accent-emerald-500' : ''}
            ${warning ? 'border-accent-amber-500' : ''}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />

        {/* Floating Label */}
        {floatingLabel && label && (
          <label
            className={`
              absolute left-3 transition-all duration-200 pointer-events-none
              ${prefixIcon ? 'left-10' : 'left-3'}
              ${isFocused || hasValue
                ? 'top-0 text-xs text-brand-600 font-semibold'
                : 'top-1/2 -translate-y-1/2 text-base text-dark-400 font-normal'
              }
            `}
          >
            {label}
          </label>
        )}

        {/* Suffix Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Password Toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-dark-400 hover:text-dark-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={iconSizes[size]} />
              ) : (
                <Eye size={iconSizes[size]} />
              )}
            </button>
          )}

          {/* Validation Icons */}
          {error && (
            <AlertCircle size={iconSizes[size]} className="text-accent-rose-500" />
          )}
          {success && (
            <CheckCircle2 size={iconSizes[size]} className="text-accent-emerald-500" />
          )}
          {warning && (
            <Info size={iconSizes[size]} className="text-accent-amber-500" />
          )}

          {/* Suffix Icon */}
          {suffixIcon && !error && !success && !warning && type !== 'password' && (
            <span className="text-dark-400">
              {React.cloneElement(suffixIcon, { size: iconSizes[size] })}
            </span>
          )}
        </div>

        {/* Focus Ring Effect */}
        {isFocused && !error && !disabled && (
          <div className="absolute inset-0 rounded-lg ring-2 ring-brand-500/20 pointer-events-none animate-pulse-subtle" />
        )}
      </div>

      {/* Helper/Error Text and Character Count */}
      <div className="flex items-center justify-between mt-1.5 min-h-[20px]">
        {/* Helper/Error Text */}
        <div className="flex-1">
          {error && (
            <p className="text-sm text-accent-rose-600 font-medium flex items-center gap-1.5 animate-slide-in">
              <AlertCircle size={14} />
              {error}
            </p>
          )}
          {success && !error && (
            <p className="text-sm text-accent-emerald-600 font-medium flex items-center gap-1.5 animate-slide-in">
              <CheckCircle2 size={14} />
              {success}
            </p>
          )}
          {warning && !error && !success && (
            <p className="text-sm text-accent-amber-600 font-medium flex items-center gap-1.5 animate-slide-in">
              <Info size={14} />
              {warning}
            </p>
          )}
          {helperText && !error && !success && !warning && (
            <p className="text-sm text-dark-500">
              {helperText}
            </p>
          )}
        </div>

        {/* Character Count */}
        {showCharacterCount && maxLength && (
          <p className={`text-xs font-medium ml-2 ${
            currentValue.length > maxLength * 0.9
              ? 'text-accent-rose-600'
              : 'text-dark-400'
          }`}>
            {currentValue.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
