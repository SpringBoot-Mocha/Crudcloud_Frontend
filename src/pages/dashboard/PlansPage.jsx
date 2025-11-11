import React, { useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Spinner } from '../../components/ui';
import PlanCard from '../../components/plans/PlanCard/PlanCard';
import { usePlans } from '../../hooks/usePlans';

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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Planes y Suscripciones
          </h1>
          <p className="text-gray-600 mt-2">
            Elige el plan que mejor se adapte a tu necesidad
          </p>
        </div>

        {/* Current Subscription Info */}
        {currentSubscription && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="font-bold text-gray-900 mb-2">Tu Plan Actual</h2>
            <p className="text-gray-700">
              Estás en el plan <span className="font-bold">{currentSubscription.planName}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Renovación: {new Date(currentSubscription.renewalDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, puedes actualizar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Qué pasa si bajo de plan?
              </h4>
              <p className="text-gray-600 text-sm">
                Si tienes más instancias de las permitidas, deberás eliminar algunas antes de bajar de plan.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Hay facturación automática?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, la suscripción se renueva automáticamente cada mes. Puedes cancelar en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlansPage;
