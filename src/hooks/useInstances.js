import { useContext } from 'react';
import { InstanceContext } from '../context/InstanceContext';

export const useInstances = () => {
  const context = useContext(InstanceContext);

  if (!context) {
    throw new Error('useInstances debe ser usado dentro de InstanceProvider');
  }

  return context;
};
