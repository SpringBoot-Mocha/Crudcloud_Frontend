import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

/**
 * Premium Alert Component
 *
 * Features:
 * - Multiple variants (info, success, warning, error)
 * - Dismissible option
 * - Icon support
 * - Title and description
 *
 * @example
 * <Alert variant="success" title="Success" dismissible>
 *   Your changes have been saved
 * </Alert>
 */
const Alert = ({
  children,
  title,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  const variants = {
    info: {
      container: 'bg-accent-blue-50 border-accent-blue-200 text-accent-blue-900',
      icon: <Info className="text-accent-blue-600" size={20} />,
      title: 'text-accent-blue-900',
    },
    success: {
      container: 'bg-accent-emerald-50 border-accent-emerald-200 text-accent-emerald-900',
      icon: <CheckCircle2 className="text-accent-emerald-600" size={20} />,
      title: 'text-accent-emerald-900',
    },
    warning: {
      container: 'bg-accent-amber-50 border-accent-amber-200 text-accent-amber-900',
      icon: <AlertTriangle className="text-accent-amber-600" size={20} />,
      title: 'text-accent-amber-900',
    },
    error: {
      container: 'bg-accent-rose-50 border-accent-rose-200 text-accent-rose-900',
      icon: <AlertCircle className="text-accent-rose-600" size={20} />,
      title: 'text-accent-rose-900',
    },
  };

  const config = variants[variant];

  return (
    <div
      role="alert"
      className={`
        relative
        flex gap-3
        p-4 rounded-lg
        border
        ${config.container}
        animate-slide-in
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.title}`}>
            {title}
          </h4>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
