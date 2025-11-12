import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.form
      onSubmit={handleSubmit}
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
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="tu@email.com"
          variant="outlined"
          size="lg"
          required
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
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          variant="outlined"
          size="lg"
          required
        />
      </motion.div>

      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {errors.submit}
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
