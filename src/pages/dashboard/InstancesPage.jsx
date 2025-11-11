import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button } from '../../components/ui';
import { InstanceList, CreateInstanceModal } from '../../components/instances';
import { useInstances } from '../../hooks/useInstances';

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
    } catch (error) {
      console.error('Error creating instance:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteInstance = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta instancia?')) {
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Instancias de Base de Datos
            </h1>
            <p className="text-gray-600 mt-2">
              Crea y gestiona tus instancias de bases de datos
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            + Crear Instancia
          </Button>
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
