import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../ui';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = ({ onSuccess = null }) => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (formValues) => {
    try {
      await login(formValues.email, formValues.password);
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error en el inicio de sesión';
      setError('submit', { type: 'manual', message: errorMessage });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          error={errors.email?.message}
          placeholder="tu@email.com"
          variant="outlined"
          size="lg"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Input
          label="Contraseña"
          type="password"
          {...register('password', {
            required: 'Contraseña es requerida',
            minLength: {
              value: 6,
              message: 'Contraseña debe tener al menos 6 caracteres'
            }
          })}
          error={errors.password?.message}
          placeholder="••••••••"
          variant="outlined"
          size="lg"
        />
      </motion.div>

      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {errors.submit.message}
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="font-semibold"
        >
          Iniciar Sesión
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
