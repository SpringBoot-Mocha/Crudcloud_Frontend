import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui';
import LoginForm from '../../components/auth/LoginForm/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50 px-4 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/80 to-brand-50/80" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-r from-brand-100/40 to-brand-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-slate-100/40 to-brand-100/40 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="w-full bg-white border border-slate-200/60 shadow-2xl shadow-slate-200/50">
            {/* Header */}
            <div className="mb-8">
              {/* Brand and Navigation */}
              <div className="flex items-center justify-between mb-8">
                <motion.button
                  onClick={() => navigate('/')}
                  className="group text-slate-700 hover:text-slate-900 transition-all duration-300 text-sm font-medium px-4 py-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-slate-300/80 hover:bg-slate-50 flex items-center gap-3 shadow-sm hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <svg
                      className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                  </motion.div>
                  <span className="transition-all duration-300 group-hover:font-semibold">
                    Inicio
                  </span>
                </motion.button>
                <Link to="/" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-brand-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CC</span>
                  </div>
                  <span className="text-slate-900 font-semibold text-lg group-hover:text-brand-600 transition-colors">
                    CrudCloud
                  </span>
                </Link>
              </div>

              {/* Main Title */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-3">
                  Iniciar Sesión
                </h1>
              </div>
            </div>

            {/* Login Form */}
            <LoginForm onSuccess={handleLoginSuccess} />

            {/* Footer */}
            <div className="mt-8 text-center pt-6 border-t border-slate-200/60">
              <p className="text-slate-600 text-sm">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/register"
                  className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                >
                  Crear cuenta
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Subtle floating elements */}
        <motion.div
          className="absolute -top-2 -left-2 w-4 h-4 bg-brand-500/20 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-2 -right-2 w-3 h-3 bg-slate-500/20 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
