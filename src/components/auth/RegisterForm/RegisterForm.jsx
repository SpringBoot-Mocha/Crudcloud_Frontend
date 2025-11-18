import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Input } from '../../ui';
import { useAuth } from '../../../hooks/useAuth';
import { Check, X } from 'lucide-react';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23litGnx91sQu0tdPN';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const REDIRECT_URI = `${import.meta.env.VITE_APP_URL || 'http://localhost:3000'}/auth/github/callback`;

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
  const { register: registerUser, loginWithGoogle } = useAuth();
  const googleButtonRef = useRef(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  });

  const handleGoogleButtonClick = () => {
    googleButtonRef.current?.querySelector('button')?.click();
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('🔐 Google login iniciado desde register');
      const result = await loginWithGoogle(credentialResponse.credential);
      console.log('✅ Resultado del login:', result);

      if (result?.success) {
        console.log('🚀 Redirigiendo al dashboard');
        window.location.href = '/dashboard';
      } else {
        throw new Error(result?.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('❌ Error en Google login:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión con Google';
      setError('submit', { type: 'manual', message: errorMessage });
    }
  };

  const handleGoogleError = () => {
    setError('submit', { type: 'manual', message: 'Error al conectar con Google' });
  };

  const onSubmit = async (formValues) => {
    try {
      const result = await registerUser(formValues);
      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        setError('submit', { type: 'manual', message: result.error || 'Error en el registro' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error en el registro';
      setError('submit', { type: 'manual', message: errorMessage });
    }
  };


  const handleGitHubLogin = () => {
    console.log('🚀 Iniciando login con GitHub desde register');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read:user user:email`;

    console.log('📍 GitHub Auth URL:', githubAuthUrl);
    console.log('📍 Redirect URI:', REDIRECT_URI);

    window.location.href = githubAuthUrl;
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium"
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

      {/* Social Login Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative py-2"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/70"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-slate-500 font-medium tracking-wide">O continúa con</span>
        </div>
      </motion.div>

      {/* Hidden GoogleLogin Component */}
      <div ref={googleButtonRef} style={{ display: 'none' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          text="signin"
          theme="outline"
          size="large"
        />
      </div>

      {/* Social Login Buttons Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        {/* Google Login Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="button"
            onClick={handleGoogleButtonClick}
            className="w-full h-10 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-95"
            title="Continuar con Google"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>
        </motion.div>

        {/* GitHub Login Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="button"
            onClick={handleGitHubLogin}
            className="w-full h-10 flex items-center justify-center gap-2 px-4 py-2 bg-[#24292e] text-white rounded-lg font-semibold hover:bg-[#1b1f23] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#24292e]/50 active:scale-95"
            title="Continuar con GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </motion.div>
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
