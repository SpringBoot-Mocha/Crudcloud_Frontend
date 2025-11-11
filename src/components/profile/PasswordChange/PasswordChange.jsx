import React from 'react';
import { Button, Input, Card } from '../../ui';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import userService from '../../../services/userService';

const PasswordChange = () => {
  const { user } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    async (formValues) => {
      if (formValues.newPassword !== formValues.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      if (!user?.id) throw new Error('User ID not found');
      await userService.changePassword(user.id, formValues.currentPassword, formValues.newPassword);
      alert('Contraseña actualizada exitosamente');
      resetForm();
    }
  );

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Cambiar Contraseña
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Contraseña Actual"
          type="password"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          required
        />
        <Input
          label="Nueva Contraseña"
          type="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />
        <Input
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.submit}
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
        >
          Cambiar Contraseña
        </Button>
      </form>
    </Card>
  );
};

export default PasswordChange;
