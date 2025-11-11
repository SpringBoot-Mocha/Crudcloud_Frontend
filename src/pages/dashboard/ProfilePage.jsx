import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Button } from '../../components/ui';
import ProfileForm from '../../components/profile/ProfileForm/ProfileForm';
import PasswordChange from '../../components/profile/PasswordChange/PasswordChange';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Implementar eliminación de cuenta
      alert('Funcionalidad de eliminación de cuenta próximamente');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Mi Perfil
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu información personal y seguridad
          </p>
        </div>

        {/* Profile Info */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Información de la Cuenta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-bold text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">ID de Usuario</p>
              <p className="font-bold text-gray-900 font-mono text-sm">{user?.id}</p>
            </div>
          </div>
        </Card>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProfileForm />
          <PasswordChange />
        </div>

        {/* Danger Zone */}
        <Card className="border-2 border-red-200 bg-red-50">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Zona de Peligro
          </h2>
          <p className="text-gray-600 mb-6">
            Estas acciones son irreversibles. Úsalas con cuidado.
          </p>
          <div className="space-y-3">
            <Button
              variant="danger"
              size="lg"
              onClick={handleDeleteAccount}
            >
              Eliminar mi Cuenta
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
