import React from 'react';
import { Spinner } from '../../ui';
import InstanceCard from '../InstanceCard/InstanceCard';
import { Database } from 'lucide-react';

const InstanceList = ({ instances, loading, onDelete, onStatusChange, onRotatePassword }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!instances || instances.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm px-8 py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-slate-100">
            <Database size={28} className="text-slate-400" />
          </div>
        </div>
        <p className="text-slate-900 font-medium mb-2">No hay instancias todavía</p>
        <p className="text-sm text-slate-500">
          Crea tu primera instancia de base de datos para comenzar
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
