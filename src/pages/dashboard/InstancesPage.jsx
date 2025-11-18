import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button } from '../../components/ui';
import { PlanSelectionModal, ConfirmModal } from '../../components/modals';
import { InstanceList, CreateInstanceModal } from '../../components/instances';
import { useInstances } from '../../hooks/useInstances';
import { usePlans } from '../../hooks/usePlans';
import { useToast } from '../../hooks/useToast';
import { Plus, Database } from 'lucide-react';

const InstancesPage = () => {
  const { instances, loading, fetchInstances, createInstance, deleteInstance, updateInstanceStatus, rotatePassword, getActiveInstanceCount } = useInstances();
  const { plans, currentSubscription, fetchPlans } = usePlans();
  const { success, error, warning } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSelectingPlan, setIsSelectingPlan] = useState(false);
  
  // Confirm modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    action: null,
    isLoading: false,
    variant: 'warning',
  });

  useEffect(() => {
    fetchInstances();
    fetchPlans();
  }, []);

  const handleNewInstanceClick = () => {
    const activeCount = getActiveInstanceCount();
    
    // If user has 2 or more active instances, show plan selection first
    if (activeCount >= 2) {
      warning('Has alcanzado el límite de tu plan. Selecciona un plan superior para crear más instancias.');
      setIsPlanModalOpen(true);
    } else {
      // Otherwise, show instance creation directly
      setIsModalOpen(true);
    }
  };

  const handleSelectPlan = (planId) => {
    // Plan selected, close plan modal and open instance creation
    setIsPlanModalOpen(false);
    setIsModalOpen(true);
    success('Plan seleccionado. Ahora crea tu instancia.');
    // Note: User can now create instance. In a full implementation,
    // you might want to upgrade subscription here before allowing creation
  };

  const handleCreateInstance = async (formValues) => {
    setIsCreating(true);
    try {
      await createInstance(formValues.engine, formValues.databaseName || null);
      success(`Instancia de ${formValues.engine} creada exitosamente.`);
      setIsModalOpen(false);
    } catch (err) {
      error(`Error al crear instancia: ${err.message}`);
      console.error('Error creating instance:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteInstance = async (id) => {
    const instanceName = instances.find(i => i.id === id)?.name || 'instancia';
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Instancia',
      message: `¿Estás seguro de que quieres eliminar "${instanceName}"? Esta acción no se puede deshacer.`,
      action: async () => {
        try {
          await deleteInstance(id);
          success(`Instancia "${instanceName}" eliminada correctamente.`);
        } catch (err) {
          error(`Error al eliminar: ${err.message}`);
          console.error('Error deleting instance:', err);
          throw err;
        }
      },
      isLoading: false,
      variant: 'danger',
    });
  };

  const handleStatusChange = async (id, status) => {
    const statusLabel = status === 'SUSPENDED' ? 'pausada' : 'reanudada';
    try {
      await updateInstanceStatus(id, status);
      success(`Instancia ${statusLabel} exitosamente.`);
    } catch (err) {
      error(`Error al actualizar estado: ${err.message}`);
      console.error('Error updating status:', err);
    }
  };

  const handleRotatePassword = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Rotar Contraseña',
      message: '¿Quieres rotar la contraseña de esta instancia? Se generará una nueva contraseña automáticamente.',
      action: async () => {
        try {
          await rotatePassword(id);
          success('Contraseña rotada exitosamente.');
        } catch (err) {
          error(`Error al rotar contraseña: ${err.message}`);
          console.error('Error rotating password:', err);
          throw err;
        }
      },
      isLoading: false,
      variant: 'warning',
    });
  };

  const handleConfirmAction = async () => {
    setConfirmModal((prev) => ({ ...prev, isLoading: true }));
    try {
      if (confirmModal.action) {
        await confirmModal.action();
      }
    } finally {
      setConfirmModal((prev) => ({ ...prev, isLoading: false, isOpen: false }));
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
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
            onClick={handleNewInstanceClick}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Nueva Instancia
          </Button>
        </div>

        {/* Stats Bar */}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="px-6 py-4 rounded-lg bg-white border border-slate-200/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Activas</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2">{instances.filter(i => i.status === 'RUNNING').length}</p>
            <p className="text-xs text-slate-400 mt-1">instancias en ejecución</p>
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

        {/* Plan Selection Modal - Shows when trying to create 3rd instance */}
        <PlanSelectionModal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          onSelectPlan={handleSelectPlan}
          plans={plans}
          isLoading={isSelectingPlan}
          currentPlanId={currentSubscription?.plan_id}
        />

        {/* Create Instance Modal */}
        <CreateInstanceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateInstance}
          isLoading={isCreating}
        />

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmAction}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.variant === 'danger' ? 'Eliminar' : 'Confirmar'}
          cancelText="Cancelar"
          variant={confirmModal.variant}
          isLoading={confirmModal.isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default InstancesPage;
