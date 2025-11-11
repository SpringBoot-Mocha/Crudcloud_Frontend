import React, { useEffect } from 'react';
import { Button, Input, Card } from '../../ui';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import userService from '../../../services/userService';

const ProfileForm = () => {
  const { user } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit, setValues } = useForm(
    { firstName: '', lastName: '', email: '' },
    async (formValues) => {
      if (!user?.id) throw new Error('User ID not found');
      await userService.updateUser(user.id, formValues);
      alert('Perfil actualizado exitosamente');
    }
  );

  useEffect(() => {
    if (user) {
      setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Información del Perfil
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <Input
            label="Apellido"
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          disabled
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
          Guardar Cambios
        </Button>
      </form>
    </Card>
  );
};

export default ProfileForm;
