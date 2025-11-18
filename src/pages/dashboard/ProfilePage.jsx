import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button } from '../../components/ui';
import ProfileForm from '../../components/profile/ProfileForm/ProfileForm';
import PasswordChange from '../../components/profile/PasswordChange/PasswordChange';
import { useAuth } from '../../hooks/useAuth';
import { User, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      alert('Funcionalidad de eliminación de cuenta próximamente');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50">
              <User size={22} className="text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Perfil</h1>
          </div>
          <p className="text-slate-500 text-base">
            Gestiona tu información personal, contraseña y preferencias
          </p>
        </div>

        {/* Account Info Card */}
        <div className="px-6 py-5 rounded-xl bg-white border border-slate-200/50">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">
            Información de la Cuenta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
              <p className="mt-2 text-base font-medium text-slate-900 break-words">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">ID de Usuario</label>
              <p className="mt-2 text-xs font-mono text-slate-600 break-all bg-slate-50/50 p-3 rounded-lg">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ProfileForm />
          <PasswordChange />
        </div>

        {/* Danger Zone */}
        <div className="px-6 py-5 rounded-xl border-2 border-red-200/50 bg-red-50/30">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={20} className="text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Zona de Peligro</h2>
          </div>
          <p className="text-sm text-red-800 mb-6">
            Estas acciones son irreversibles. Por favor, úsalas con cuidado.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 active:scale-95"
          >
            Eliminar mi Cuenta
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
