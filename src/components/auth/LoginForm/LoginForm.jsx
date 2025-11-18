import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Input } from '../../ui';
import { useAuth } from '../../../hooks/useAuth';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23litKJNd1UT1tH8ks';
const REDIRECT_URI = `${import.meta.env.VITE_APP_URL || 'http://localhost:3000'}/auth/github/callback`;

const LoginForm = ({ onSuccess = null }) => {
  const { login, loginWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (formValues) => {
    try {
      const result = await login(formValues.email, formValues.password);
      
      if (result?.success) {
        if (onSuccess) onSuccess();
      } else {
        const errorMessage = result?.error || 'Error en el inicio de sesión';
        setError('submit', { type: 'manual', message: errorMessage });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error en el inicio de sesión';
      setError('submit', { type: 'manual', message: errorMessage });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('🔐 Google login iniciado');
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

  const handleGitHubLogin = () => {
    console.log('🚀 Iniciando login con GitHub');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read:user user:email`;
    
    console.log('📍 GitHub Auth URL:', githubAuthUrl);
    console.log('📍 Redirect URI:', REDIRECT_URI);
    
    // Redirigir directamente (no popup)
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

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dark-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-dark-500 font-medium">O continúa con</span>
        </div>
      </motion.div>

      {/* Google Login Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center"
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="outline"
          size="large"
          width="100%"
          text="continue_with"
          shape="rectangular"
        />
      </motion.div>

      {/* GitHub Login Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-[#24292e] text-white rounded-lg font-semibold hover:bg-[#1b1f23] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#24292e]/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continuar con GitHub
        </button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
