import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GitHubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGitHub } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          console.error('🚫 GitHub OAuth error:', error, errorDescription);
          const errorMsg = errorDescription || error || 'GitHub authorization failed';
          navigate(`/register?error=${encodeURIComponent(errorMsg)}`);
          return;
        }

        if (!code) {
          console.error('❌ No authorization code received from GitHub');
          navigate('/register?error=no_code');
          return;
        }

        console.log('🔐 GitHub callback received with code');

        // The code will be exchanged for a token by the backend
        // We pass the code (not a token) to loginWithGitHub
        const result = await loginWithGitHub(code);

        if (result?.success) {
          console.log('✅ GitHub authentication successful');
          navigate('/dashboard');
        } else {
          console.error('GitHub authentication failed:', result?.error);
          navigate(`/register?error=${encodeURIComponent(result?.error || 'Authentication failed')}`);
        }
      } catch (error) {
        console.error('❌ Error in GitHub callback:', error);
        const errorMsg = error.response?.data?.message || error.message || 'Authentication error';
        navigate(`/register?error=${encodeURIComponent(errorMsg)}`);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithGitHub]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-slate-600 text-center">
          Autenticando con GitHub...
        </p>
      </div>
    </div>
  );
};

export default GitHubCallbackPage;
