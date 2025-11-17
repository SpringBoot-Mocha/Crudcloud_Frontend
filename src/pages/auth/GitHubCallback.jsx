import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const GitHubCallback = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔍 GitHubCallback iniciado');
        
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        console.log('📝 Parámetros URL:', { code, errorParam });

        if (errorParam) {
          console.error('❌ Error en parámetros:', errorParam);
          setError('Autenticación cancelada o fallida');
          setStatus('error');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        if (!code) {
          console.error('❌ No hay código de autorización');
          setError('No se recibió código de autorización');
          setStatus('error');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        console.log('🔄 Enviando código al backend...');
        
        const response = await fetch('http://localhost:8080/api/v1/auth/github/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        console.log('📡 Respuesta del backend:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ Error del backend:', errorData);
          throw new Error(errorData.message || 'Error al procesar la autenticación');
        }

        const data = await response.json();
        console.log('✅ Autenticación exitosa:', data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setStatus('success');

        setTimeout(() => {
          console.log('🚀 Redirigiendo al dashboard');
          window.location.href = '/dashboard';
        }, 1000);
      } catch (err) {
        console.error('❌ Error en callback de GitHub:', err);
        setError(err.message || 'Error al procesar la autenticación');
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md"
      >
        {status === 'processing' && (
          <>
            <div className="w-16 h-16 border-4 border-gray-300 border-t-[#24292e] rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Procesando autenticación...
            </h2>
            <p className="text-gray-600">
              Por favor espera mientras verificamos tu cuenta de GitHub
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              ¡Autenticación exitosa!
            </h2>
            <p className="text-gray-600">
              Redirigiendo al dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Error de autenticación
            </h2>
            <p className="text-gray-600">{error}</p>
            <p className="text-gray-500 text-sm mt-2">Redirigiendo al login...</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GitHubCallback;