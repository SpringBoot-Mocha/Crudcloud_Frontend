import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button } from '../../components/ui';
import { InstanceList, CreateInstanceModal } from '../../components/instances';
import { useInstances } from '../../hooks/useInstances';
import { Plus, Database } from 'lucide-react';

const InstancesPage = () => {
  const { instances, loading, fetchInstances, createInstance, deleteInstance, updateInstanceStatus, rotatePassword } = useInstances();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchInstances();
  }, []);

  const handleCreateInstance = async (formValues) => {
    setIsCreating(true);
    try {
      await createInstance(formValues.engine, formValues.databaseName || null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating instance:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteInstance = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta instancia? Esta acción no se puede deshacer.')) {
      try {
        await deleteInstance(id);
      } catch (error) {
        console.error('Error deleting instance:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInstanceStatus(id, status);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRotatePassword = async (id) => {
    if (window.confirm('¿Quieres rotar la contraseña de esta instancia?')) {
      try {
        await rotatePassword(id);
      } catch (error) {
        console.error('Error rotating password:', error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50">
                <Database size={22} className="text-teal-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Instancias</h1>
            </div>
            <p className="text-slate-500 text-base">
              Crea y gestiona todas tus instancias de bases de datos en un solo lugar
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Nueva Instancia
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="px-6 py-4 rounded-lg bg-white border border-slate-200/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2">{instances.length}</p>
            <p className="text-xs text-slate-400 mt-1">instancias activas</p>
          </div>
          <div className="px-6 py-4 rounded-lg bg-white border border-slate-200/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">En Ejecución</p>
            <p className="text-2xl font-semibold text-emerald-600 mt-2">
              {instances.filter(i => i.status === 'RUNNING').length}
            </p>
            <p className="text-xs text-slate-400 mt-1">funcionando correctamente</p>
          </div>
          <div className="px-6 py-4 rounded-lg bg-white border border-slate-200/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pausadas</p>
            <p className="text-2xl font-semibold text-amber-600 mt-2">
              {instances.filter(i => i.status === 'SUSPENDED').length}
            </p>
            <p className="text-xs text-slate-400 mt-1">en pausa temporal</p>
          </div>
        </div>

        {/* Instances List */}
        <InstanceList
          instances={instances}
          loading={loading}
          onDelete={handleDeleteInstance}
          onStatusChange={handleStatusChange}
          onRotatePassword={handleRotatePassword}
        />

        {/* Create Modal */}
        <CreateInstanceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateInstance}
          isLoading={isCreating}
        />
      </div>
    </DashboardLayout>
  );
};

export default InstancesPage;
