import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../ui';
import { Check, X } from 'lucide-react';

const PlanSelectionModal = ({
  isOpen,
  onClose,
  onSelectPlan,
  plans = [],
  isLoading = false,
  currentPlanId = null,
}) => {
  const [selectedPlanId, setSelectedPlanId] = React.useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedPlanId) {
      onSelectPlan(selectedPlanId);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto z-50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 px-6 md:px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Selecciona un Plan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Elige el plan adecuado para crear más instancias
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-6 md:p-8">
          {plans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No hay planes disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlanId === plan.id
                      ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-200/50'
                      : 'border-slate-200/50 bg-white/60 hover:border-slate-300 hover:bg-white/80'
                  }`}
                >
                  {/* Selection Indicator */}
                  {selectedPlanId === plan.id && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-teal-100 w-fit">
                      <Check size={14} className="text-teal-600" />
                      <span className="text-xs font-medium text-teal-600">Seleccionado</span>
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {currentPlanId === plan.id && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-100 w-fit">
                      <Check size={14} className="text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-600">Plan Actual</span>
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        ${plan.price_per_month || plan.price}
                      </span>
                      <span className="text-sm text-slate-500">/mes</span>
                    </div>
                    {(plan.price_per_month === 0 || plan.price === 0) && (
                      <p className="text-xs text-emerald-600 font-medium mt-1">
                        Siempre gratis
                      </p>
                    )}
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-900">
                        {plan.max_instances} {plan.max_instances === 1 ? 'instancia' : 'instancias'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-slate-700">
                        {plan.max_storage_gb} GB almacenamiento
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-slate-700">
                        Soporte {(plan.price_per_month || plan.price) === 0 ? 'por email' : 'prioritario'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200/50 px-6 md:px-8 py-6 flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!selectedPlanId || isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Continuar con este plan'}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default PlanSelectionModal;
