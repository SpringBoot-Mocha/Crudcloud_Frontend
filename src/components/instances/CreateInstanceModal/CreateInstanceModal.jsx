import React from 'react';
import { Modal, Input, Button } from '../../ui';
import { useForm } from '../../../hooks/useForm';

const ENGINES = ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL Server', 'Cassandra'];

const CreateInstanceModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { engine: 'MySQL', databaseName: '' },
    async (formValues) => {
      await onSubmit(formValues);
      onClose();
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Instancia"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isLoading}>
            Crear Instancia
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motor de Base de Datos
          </label>
          <select
            name="engine"
            value={values.engine}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ENGINES.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Nombre de la Base de Datos (Opcional)"
          type="text"
          name="databaseName"
          value={values.databaseName}
          onChange={handleChange}
          placeholder="my_database"
          error={errors.databaseName}
        />

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          ℹ️ Si no especificas un nombre, se generará automáticamente
        </div>
      </form>
    </Modal>
  );
};

export default CreateInstanceModal;
