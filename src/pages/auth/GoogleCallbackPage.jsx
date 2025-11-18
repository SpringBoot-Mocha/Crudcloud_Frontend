import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() =>
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        console.log('📍 Google Callback - Code:', code);
        console.log('📍 Google Callback - Error:', error);

        if (error) {
          console.error('🚫 Google OAuth error:', error, errorDescription);
          const errorMsg = errorDescription || error || 'Google authorization failed';
          navigate(`/login?error=${encodeURIComponent(errorMsg)}`);
          return;
        }

        if (!code) {
          console.error('❌ No authorization code received from Google');
          navigate('/login?error=no_code');
          return;
        }

        console.log('🔐 Google callback received with code:', code);

        // Send code to backend for exchange
        // The backend will exchange the code for tokens
        const result = await loginWithGoogle(code);

        if (result?.success) {
          console.log('✅ Google authentication successful');
          navigate('/dashboard');
        } else {
          console.error('Google authentication failed:', result?.error);
          navigate(`/login?error=${encodeURIComponent(result?.error || 'Authentication failed')}`);
        }
      } catch (error) {
        console.error('❌ Error in Google callback:', error);
        const errorMsg = error.response?.data?.message || error.message || 'Authentication error';
        navigate(`/login?error=${encodeURIComponent(errorMsg)}`);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithGoogle]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-slate-600 text-center">
          Autenticando con Google...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
