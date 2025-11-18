import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../../ui';
import { useAuth } from '../../../hooks/useAuth';
import { Check, X } from 'lucide-react';

// Schema de validación con Zod
const passwordSchema = z.string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Necesita una mayúscula (A-Z)')
  .regex(/[a-z]/, 'Necesita una minúscula (a-z)')
  .regex(/[0-9]/, 'Necesita un número (0-9)')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Necesita un símbolo (!@#$%^&*)');

const registerSchema = z.object({
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: passwordSchema
});

const RegisterForm = ({ onSuccess = null }) => {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = async (formValues) => {
    try {
      await registerUser(formValues.email, formValues.password, formValues.firstName, formValues.lastName);
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error en el registro';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            {...register('firstName', { required: 'Nombre es requerido' })}
            error={errors.firstName?.message}
            placeholder="Juan"
            variant="outlined"
            size="lg"
          />
          <Input
            label="Apellido"
            type="text"
            {...register('lastName', { required: 'Apellido es requerido' })}
            error={errors.lastName?.message}
            placeholder="Pérez"
            variant="outlined"
            size="lg"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
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
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <Input
          label="Contraseña"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="••••••••"
          variant="outlined"
          size="lg"
        />

        {/* Indicador de fortaleza */}
        <PasswordRequirements password={watch('password')} />
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
        transition={{ delay: 0.6 }}
      >
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="font-semibold"
        >
          Crear Cuenta
        </Button>
      </motion.div>
    </motion.form>
  );
};

// Componente de requisitos de contraseña
const PasswordRequirements = ({ password = '' }) => {
  const requirements = useMemo(() => ({
    length: {
      met: password.length >= 8,
      label: 'Mínimo 8 caracteres'
    },
    uppercase: {
      met: /[A-Z]/.test(password),
      label: 'Una mayúscula (A-Z)'
    },
    lowercase: {
      met: /[a-z]/.test(password),
      label: 'Una minúscula (a-z)'
    },
    number: {
      met: /[0-9]/.test(password),
      label: 'Un número (0-9)'
    },
    symbol: {
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      label: 'Un símbolo (!@#$%^&*)'
    }
  }), [password]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
    >
      <p className="text-xs font-semibold text-slate-700">Requisitos:</p>

      {Object.entries(requirements).map(([key, req]) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm"
        >
          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
            req.met ? 'bg-green-100' : 'bg-slate-200'
          }`}>
            {req.met ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <X className="w-3 h-3 text-slate-400" />
            )}
          </div>
          <span className={`transition-colors ${
            req.met ? 'text-green-700 font-medium' : 'text-slate-600'
          }`}>
            {req.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RegisterForm;
