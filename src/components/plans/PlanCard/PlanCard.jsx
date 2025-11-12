import React from 'react';
import { Button } from '../../ui';
import { Check } from 'lucide-react';

const PlanCard = ({ plan, isCurrentPlan, onUpgrade, isLoading }) => {
  return (
    <div className={`flex flex-col rounded-xl border transition-all duration-300 p-6 h-full ${
      isCurrentPlan
        ? 'border-teal-300/50 bg-white/80 ring-2 ring-teal-100/50 shadow-lg'
        : 'border-slate-200/50 bg-white/60 hover:border-slate-300/70 hover:shadow-lg'
    }`}>
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-50/50 border border-emerald-200/50 w-fit">
          <Check size={14} className="text-emerald-600" />
          <span className="text-xs font-medium text-emerald-600">Plan Actual</span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">${plan.price_per_month || plan.price}</span>
          <span className="text-sm text-slate-500">/mes</span>
        </div>
        {plan.price_per_month === 0 && (
          <p className="text-xs text-emerald-600 font-medium mt-1">Siempre gratis</p>
        )}
      </div>

      {/* Upgrade Button */}
      {!isCurrentPlan && (
        <button
          onClick={() => onUpgrade(plan.id)}
          disabled={isLoading}
          className="w-full mb-6 px-4 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Procesando...' : `Actualizar a ${plan.name}`}
        </button>
      )}

      {/* Features List */}
      <div className="space-y-3 flex-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Incluido:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              Hasta <span className="font-semibold">{plan.max_instances}</span> {plan.max_instances === 1 ? 'instancia' : 'instancias'}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold">{plan.max_storage_gb}</span> GB de almacenamiento
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              Soporte técnico {plan.price_per_month === 0 ? 'por email' : 'prioritario'}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">
              Backups {plan.price_per_month === 0 ? 'semanales' : 'diarios'}
            </span>
          </li>
          {plan.price_per_month > 0 && (
            <li className="flex items-start gap-3">
              <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700">
                Monitoreo 24/7 en tiempo real
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Current Plan Info */}
      {isCurrentPlan && (
        <div className="mt-6 pt-6 border-t border-slate-100/50">
          <p className="text-xs text-slate-500 text-center">
            Tus instancias activas están protegidas por este plan
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
