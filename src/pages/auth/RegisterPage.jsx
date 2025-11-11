import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    // Redirigir al login después del registro
    navigate('/login', { state: { message: 'Cuenta creada exitosamente. Por favor inicia sesión.' } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CrudCloud</h1>
          <p className="text-gray-600">Crea tu cuenta</p>
        </div>

        <RegisterForm onSuccess={handleRegisterSuccess} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
