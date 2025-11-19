import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import { Card, Button, Badge } from '../../components/ui';

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      currency: 'COP',
      period: '',
      description: 'Perfecto para desarrollo y pruebas',
      features: [
        { text: 'Hasta 2 instancias', included: true },
        { text: '150 MB de almacenamiento total', included: true },
        { text: 'MySQL y PostgreSQL', included: true },
        { text: 'Soporte comunitario', included: true },
        { text: 'Monitoreo avanzado', included: false },
        { text: 'Soporte prioritario', included: false },
      ],
      highlighted: false,
      cta: 'Comenzar',
    },
    {
      name: 'Standard',
      price: 12000,
      currency: 'COP',
      period: '/mes',
      description: 'Ideal para startups y proyectos medianos',
      features: [
        { text: 'Hasta 5 instancias', included: true },
        { text: '750 MB de almacenamiento total', included: true },
        { text: 'MySQL, PostgreSQL, MongoDB', included: true },
        { text: 'Soporte prioritario', included: true },
        { text: 'Integración Mercado Pago', included: true },
        { text: 'Monitoreo básico', included: true },
      ],
      highlighted: true,
      cta: 'Actualizar',
    },
    {
      name: 'Premium',
      price: 39900,
      currency: 'COP',
      period: '/mes',
      description: 'Para aplicaciones empresariales',
      features: [
        { text: 'Hasta 10 instancias', included: true },
        { text: '2,048 MB de almacenamiento total', included: true },
        { text: 'Todos los motores (MySQL, PostgreSQL, MongoDB, Redis)', included: true },
        { text: 'Soporte 24/7', included: true },
        { text: 'Integración Mercado Pago', included: true },
        { text: 'Monitoreo avanzado y escalado automático', included: true },
      ],
      highlighted: false,
      cta: 'Actualizar',
    },
  ];

  return (
    <PublicLayout>
      {/* Header */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Planes Simples y Transparentes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tu necesidad. Sin sorpresas. Sin contratos de larga duración.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col transition-transform ${
                plan.highlighted ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <Badge variant="primary" className="mb-4 w-fit">
                  Más Popular
                </Badge>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </div>
                <p className="text-gray-600">{plan.period}</p>
              </div>

              <Link to="/register" className="mb-8">
                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>

              <div className="space-y-4 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <span
                      className={`text-xl ${
                        feature.included ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span
                      className={feature.included ? 'text-gray-900' : 'text-gray-500'}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Preguntas Frecuentes
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <h4 className="font-bold text-gray-900 mb-2">
              ¿Puedo cambiar de plan en cualquier momento?
            </h4>
            <p className="text-gray-600">
              Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en el próximo ciclo de facturación.
            </p>
          </Card>
          <Card>
            <h4 className="font-bold text-gray-900 mb-2">
              ¿Hay período de prueba gratuita?
            </h4>
            <p className="text-gray-600">
              Sí, el plan Free incluye hasta 2 instancias sin costo. Puedes usarlas todo el tiempo que necesites.
            </p>
          </Card>
          <Card>
            <h4 className="font-bold text-gray-900 mb-2">
              ¿Qué pasa si excedo el límite de instancias?
            </h4>
            <p className="text-gray-600">
              Se te notificará cuando estés cerca del límite. No podrás crear nuevas instancias hasta actualizar tu plan.
            </p>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PricingPage;
