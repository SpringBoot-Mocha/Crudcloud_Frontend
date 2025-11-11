import React from 'react';
import { Card, Badge, Button } from '../../ui';

const PlanCard = ({ plan, isCurrentPlan, onUpgrade, isLoading }) => {
  return (
    <Card
      className={`flex flex-col transition-transform ${
        isCurrentPlan ? 'ring-2 ring-green-500' : ''
      }`}
    >
      {isCurrentPlan && (
        <Badge variant="success" className="mb-4 w-fit">
          Plan Actual
        </Badge>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {plan.name}
      </h3>

      <div className="mb-6">
        <div className="text-4xl font-bold text-gray-900">
          ${plan.price}
        </div>
        <p className="text-gray-600">/mes</p>
      </div>

      {!isCurrentPlan && (
        <Button
          variant="primary"
          size="lg"
          className="mb-6 w-full"
          onClick={() => onUpgrade(plan.id)}
          isLoading={isLoading}
        >
          Actualizar a {plan.name}
        </Button>
      )}

      <div className="space-y-3 flex-1">
        <p className="font-bold text-gray-900">Características:</p>
        <ul className="space-y-2">
          {plan.features && plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
          {!plan.features && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-gray-700">Hasta {plan.maxInstances} instancias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-gray-700">Soporte técnico</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default PlanCard;
