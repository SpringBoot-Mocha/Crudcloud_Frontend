import React from 'react';
import { Button, Input } from '../../ui';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from '../../../hooks/useForm';

const LoginForm = ({ onSuccess = null }) => {
  const { login } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      await login(formValues.email, formValues.password);
      if (onSuccess) onSuccess();
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="tu@email.com"
        required
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
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
        fullWidth
        isLoading={isSubmitting}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default LoginForm;
