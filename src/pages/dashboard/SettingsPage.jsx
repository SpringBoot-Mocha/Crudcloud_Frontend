import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Settings, Shield, Bell, Zap } from 'lucide-react';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-3xl">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50">
              <Settings size={22} className="text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Configuración</h1>
          </div>
          <p className="text-slate-500 text-base">
            Personaliza tu experiencia y gestiona la seguridad de tu cuenta
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-teal-600" />
                <h2 className="text-lg font-semibold text-slate-900">Seguridad de Cuenta</h2>
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Two-Factor Authentication */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-100/50">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    Autenticación de Dos Factores
                  </h3>
                  <p className="text-sm text-slate-500">
                    Añade una capa extra de seguridad a tu cuenta
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200 font-medium text-sm whitespace-nowrap ml-4">
                  Configurar
                </button>
              </div>

              {/* Recovery Codes */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    Códigos de Recuperación
                  </h3>
                  <p className="text-sm text-slate-500">
                    Descarga códigos para acceder si pierdes acceso a tu dispositivo
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200 font-medium text-sm whitespace-nowrap ml-4">
                  Descargar
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-teal-600" />
                <h2 className="text-lg font-semibold text-slate-900">Notificaciones</h2>
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-6 space-y-5">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">Notificaciones por Email</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Recibe alertas sobre tu cuenta y tus instancias
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              {/* Instance Alerts */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100/50">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">Alertas de Instancias</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sé notificado cuando una instancia cambie de estado
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              {/* Billing Notifications */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100/50">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">Alertas de Facturación</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Recibe recordatorios sobre pagos pendientes y renovaciones
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* API & Integrations */}
          <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-teal-600" />
                <h2 className="text-lg font-semibold text-slate-900">API & Integraciones</h2>
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-6 space-y-4">
              <p className="text-sm text-slate-600 mb-4">
                Gestiona tus claves API y conecta CrudCloud con otras herramientas
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 font-medium text-sm">
                <span>Generar Nueva Clave API</span>
              </button>

              {/* API Keys List */}
              <div className="mt-6 space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Claves activas</p>
                <div className="p-3 rounded-lg bg-slate-50/50 border border-slate-100/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Clave de producción</p>
                      <p className="text-xs text-slate-500 mt-1">ck_prod_abc123...xyz</p>
                    </div>
                    <button className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      Revocar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
              <h2 className="text-lg font-semibold text-slate-900">Preferencias</h2>
            </div>

            {/* Section Content */}
            <div className="px-6 py-6 space-y-5">
              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">Idioma</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Elige el idioma de tu interfaz
                  </p>
                </div>
                <select className="ml-4 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 hover:border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
                  <option>Español</option>
                  <option>English</option>
                  <option>Português</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100/50">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">Zona Horaria</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configura tu zona horaria para registros y alertas
                  </p>
                </div>
                <select className="ml-4 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 hover:border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
                  <option>America/Bogota (UTC-5)</option>
                  <option>America/New_York (UTC-5)</option>
                  <option>Europe/Madrid (UTC+1)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
