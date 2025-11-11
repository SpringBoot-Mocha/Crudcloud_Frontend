import React from 'react';
import { Spinner } from '../../ui';
import InstanceCard from '../InstanceCard/InstanceCard';

const InstanceList = ({ instances, loading, onDelete, onStatusChange, onRotatePassword }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!instances || instances.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-2">No hay instancias creadas aún</p>
        <p className="text-sm text-gray-500">
          Crea tu primera instancia para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instances.map((instance) => (
        <InstanceCard
          key={instance.id}
          instance={instance}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onRotatePassword={onRotatePassword}
        />
      ))}
    </div>
  );
};

export default InstanceList;
