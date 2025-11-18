import React, { useState } from 'react';
import { Spinner } from '../../ui';
import InstanceCard from '../InstanceCard/InstanceCard';
import { Database, ChevronDown } from 'lucide-react';

const InstanceList = ({ instances, loading, onDelete, onStatusChange, onRotatePassword }) => {
  const [showHistory, setShowHistory] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  // Separate active/suspended from deleted instances
  const activeInstances = instances.filter(i => i.status !== 'DELETED');
  const deletedInstances = instances.filter(i => i.status === 'DELETED');

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
    <div className="space-y-8">
      {/* Active Instances Section */}
      {activeInstances.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Instancias Activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeInstances.map((instance) => (
              <InstanceCard
                key={instance.id}
                instance={instance}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                onRotatePassword={onRotatePassword}
              />
            ))}
          </div>
        </div>
      )}

      {/* History Section - Collapsible */}
      {deletedInstances.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-200/50 hover:bg-slate-50/50 transition-colors duration-200 w-full text-left"
          >
            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform duration-300 ${
                showHistory ? 'rotate-180' : ''
              }`}
            />
            <span className="font-medium text-slate-700">
              Historial ({deletedInstances.length})
            </span>
            <span className="text-xs text-slate-500 ml-auto">Instancias eliminadas</span>
          </button>

          {/* Collapsible Content */}
          {showHistory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 animate-in fade-in duration-300">
              {deletedInstances.map((instance) => (
                <InstanceCard
                  key={instance.id}
                  instance={instance}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onRotatePassword={onRotatePassword}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstanceList;
