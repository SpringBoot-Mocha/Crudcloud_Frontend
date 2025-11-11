import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CrudCloud</h1>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
