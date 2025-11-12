import React, { useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Spinner } from '../../components/ui';
import PlanCard from '../../components/plans/PlanCard/PlanCard';
import { usePlans } from '../../hooks/usePlans';
import { CreditCard, Check } from 'lucide-react';

const PlansPage = () => {
  const { plans, currentSubscription, loading, fetchPlans, fetchCurrentSubscription, upgradePlan } = usePlans();
  const [isUpgrading, setIsUpgrading] = React.useState(false);

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, []);

  const handleUpgradePlan = async (planId) => {
    setIsUpgrading(true);
    try {
      await upgradePlan(planId);
      alert('¡Plan actualizado exitosamente!');
    } catch (error) {
      alert('Error al actualizar el plan: ' + error.message);
    } finally {
      setIsUpgrading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50">
              <CreditCard size={22} className="text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Planes</h1>
          </div>
          <p className="text-slate-500 text-base">
            Elige el plan perfecto para tus necesidades y escala según crezcas
          </p>
        </div>

        {/* Current Subscription Info */}
        {currentSubscription && (
          <div className="px-6 py-5 rounded-xl bg-white border border-slate-200/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Check size={18} className="text-emerald-600" />
              <h2 className="font-semibold text-slate-900">Tu Plan Actual</h2>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-sm">
                Estás en el plan <span className="font-semibold text-slate-900">{currentSubscription.planName}</span>
              </p>
              <p className="text-xs text-slate-500">
                Renovación: {new Date(currentSubscription.renewalDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans && plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={currentSubscription?.planId === plan.id}
              onUpgrade={handleUpgradePlan}
              isLoading={isUpgrading}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-3">
            <details className="group rounded-lg border border-slate-200/50 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-slate-900 hover:bg-slate-50/50 transition-colors duration-200">
                ¿Puedo cambiar de plan en cualquier momento?
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 py-4 border-t border-slate-100/50 bg-slate-50/30 text-sm text-slate-600">
                Sí, puedes actualizar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente en tu cuenta.
              </div>
            </details>

            <details className="group rounded-lg border border-slate-200/50 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-slate-900 hover:bg-slate-50/50 transition-colors duration-200">
                ¿Qué pasa si bajo de plan?
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 py-4 border-t border-slate-100/50 bg-slate-50/30 text-sm text-slate-600">
                Si tienes más instancias de las permitidas, deberás eliminar algunas antes de bajar de plan. Te lo notificaremos antes de cualquier cambio.
              </div>
            </details>

            <details className="group rounded-lg border border-slate-200/50 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-slate-900 hover:bg-slate-50/50 transition-colors duration-200">
                ¿Hay facturación automática?
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 py-4 border-t border-slate-100/50 bg-slate-50/30 text-sm text-slate-600">
                Sí, la suscripción se renueva automáticamente cada mes. Puedes cancelar en cualquier momento sin penalización.
              </div>
            </details>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlansPage;
