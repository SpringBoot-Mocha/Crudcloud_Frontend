import { useContext } from 'react';
import { PlanContext } from '../context/PlanContext';

export const usePlans = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error('usePlans debe ser usado dentro de PlanProvider');
  }

  return context;
};
