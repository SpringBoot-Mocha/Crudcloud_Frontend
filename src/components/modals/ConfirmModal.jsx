import React from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../ui';

/**
 * ConfirmModal - A reusable confirmation modal component
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Called when modal is closed
 * @param {function} onConfirm - Called when user confirms action
 * @param {string} title - Modal title
 * @param {string} message - Modal message/description
 * @param {string} confirmText - Confirm button text (default: "Confirmar")
 * @param {string} cancelText - Cancel button text (default: "Cancelar")
 * @param {string} variant - Variant type: 'danger', 'warning', 'success' (default: 'warning')
 * @param {boolean} isLoading - Loading state for confirm button
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-50',
      confirmButtonVariant: 'danger',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-50',
      confirmButtonVariant: 'primary',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBgColor: 'bg-emerald-50',
      confirmButtonVariant: 'success',
    },
  };

  const config = variantConfig[variant] || variantConfig.warning;
  const IconComponent = config.icon;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm border border-slate-200/50 animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-4 flex-1">
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${config.iconBgColor}`}>
              <IconComponent size={24} className={config.iconColor} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={config.confirmButtonVariant}
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
