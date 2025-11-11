import React, { useState } from 'react';
import {
  Check,
  X,
  ArrowRight,
  Star,
  Database,
  HardDrive,
  Users,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';

const PlanManagement = () => {
  const [selectedPlan, setSelectedPlan] = useState('Standard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const currentPlan = {
    name: 'Standard',
    price: '$49',
    period: '/mes',
    startDate: '2024-01-15'
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/mes',
      color: 'from-gray-500 to-gray-600',
      description: 'Para comenzar',
      features: [
        { name: 'Instancias activas', included: true, limit: '1' },
        { name: 'Almacenamiento total', included: true, limit: '5 GB' },
        { name: 'Backups automáticos', included: false },
        { name: 'Soporte por email', included: true },
        { name: 'Monitoreo avanzado', included: false },
        { name: 'Team members', included: false, limit: '-' }
      ],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$49',
      period: '/mes',
      color: 'from-violet-500 to-violet-600',
      description: 'Para pequeños proyectos',
      features: [
        { name: 'Instancias activas', included: true, limit: '5' },
        { name: 'Almacenamiento total', included: true, limit: '100 GB' },
        { name: 'Backups automáticos', included: true },
        { name: 'Soporte por email', included: true },
        { name: 'Monitoreo avanzado', included: true },
        { name: 'Team members', included: true, limit: '3' }
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$199',
      period: '/mes',
      color: 'from-amber-500 to-amber-600',
      description: 'Para empresas',
      features: [
        { name: 'Instancias activas', included: true, limit: 'Ilimitadas' },
        { name: 'Almacenamiento total', included: true, limit: '1 TB' },
        { name: 'Backups automáticos', included: true },
        { name: 'Soporte prioritario 24/7', included: true },
        { name: 'Monitoreo avanzado', included: true },
        { name: 'Team members', included: true, limit: 'Ilimitados' }
      ],
      recommended: false
    }
  ];

  const stats = [
    {
      label: 'Instancias activas',
      value: '3',
      max: '5',
      icon: Database,
      color: 'text-blue-600'
    },
    {
      label: 'Almacenamiento utilizado',
      value: '24.8 GB',
      max: '100 GB',
      icon: HardDrive,
      color: 'text-purple-600'
    },
    {
      label: 'Team members',
      value: '2',
      max: '3',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Backups',
      value: '24',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Current Plan Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-violet-300 text-sm mb-2">Plan Actual</p>
            <h2 className="text-3xl font-bold mb-2">{currentPlan.name}</h2>
            <p className="text-violet-200">
              Activo desde el {new Date(currentPlan.startDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-violet-200 mt-4">
              <span className="text-3xl font-bold">{currentPlan.price}</span>
              <span className="text-violet-300">{currentPlan.period}</span>
            </p>
          </div>
          <Star size={48} className="text-yellow-400" />
        </div>
      </div>

      {/* Usage Stats */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Uso del plan actual</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const percentage = stat.max ? (parseInt(stat.value) / parseInt(stat.max.split(' ')[0])) * 100 : 0;

            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-600">{stat.label}</h4>
                  <Icon size={20} className={stat.color} />
                </div>

                <p className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</p>

                {stat.max && (
                  <>
                    <p className="text-xs text-gray-600 mb-3">de {stat.max}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          percentage > 80
                            ? 'bg-red-500'
                            : percentage > 50
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Plans Comparison */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-6">Selecciona tu plan</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 transition-all overflow-hidden ${
                currentPlan.name === plan.name
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 bg-white hover:border-violet-300'
              }`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${plan.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    {plan.recommended && (
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} className="fill-white" />
                        <span className="text-xs font-semibold">Popular</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white opacity-90 mb-4">{plan.description}</p>
                  <div>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white opacity-90">{plan.period}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="p-6 space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={20} className="text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm ${feature.included ? 'text-slate-900 font-medium' : 'text-gray-500'}`}>
                        {feature.name}
                      </p>
                      {feature.limit && (
                        <p className="text-xs text-gray-600">{feature.limit}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="p-6 border-t border-gray-200">
                {currentPlan.name === plan.name ? (
                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold cursor-default">
                    Plan actual
                  </button>
                ) : plan.id === 'free' ? (
                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
                    Cambiar a {plan.name}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.name);
                      setShowPaymentModal(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg font-semibold hover:from-violet-600 hover:to-violet-700 transition flex items-center justify-center gap-2"
                  >
                    Mejorar a {plan.name}
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Historial de facturación</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">FECHA</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">CONCEPTO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">MONTO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ESTADO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2024-10-28', concept: 'Plan Standard - Octubre', amount: '$49.00', status: 'Pagado' },
                { date: '2024-09-28', concept: 'Plan Standard - Septiembre', amount: '$49.00', status: 'Pagado' },
                { date: '2024-08-28', concept: 'Plan Standard - Agosto', amount: '$49.00', status: 'Pagado' }
              ].map((invoice, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{invoice.concept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">{invoice.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <Check size={14} />
                      {invoice.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-violet-600 hover:text-violet-700 font-semibold">
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Mejora a plan {selectedPlan}
            </h3>
            <p className="text-gray-600 mb-6">
              Se actualizará tu plan inmediatamente. Se te cobrará a partir del próximo ciclo de facturación.
            </p>

            {/* Payment Form */}
            <div className="space-y-6 mb-8 pb-8 border-b border-gray-200">
              {/* Mercado Pago Integration */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Mercado Pago</p>
                    <p className="text-sm text-gray-600">Pago seguro y rápido</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Serás redirigido a Mercado Pago para completar el pago de forma segura.
                </p>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Dev"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      País
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Argentina</option>
                      <option>Chile</option>
                      <option>Colombia</option>
                      <option>México</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan {selectedPlan} (mensual)</span>
                <span className="font-bold text-slate-900">
                  {plans.find(p => p.name === selectedPlan)?.price}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-slate-900 font-semibold hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-violet-700 transition flex items-center justify-center gap-2">
                <Shield size={18} />
                Pagar de forma segura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;
