import React, { useState } from 'react';
import {
  Database,
  Copy,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCw,
  Trash2,
  Calendar,
  Server,
  Lock,
  Network,
  HardDrive,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const InstanceDetail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const instance = {
    id: 'mysql-prod-001',
    name: 'Production MySQL',
    engine: 'MySQL',
    version: '8.0.32',
    status: 'RUNNING',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-10-28T14:22:00Z',
    host: 'mysql-prod.crudcloud.io',
    port: 3306,
    username: 'admin_user',
    password: 'Xy9$kL@2mN&vP#qR',
    database: 'production_db',
    storageUsed: '4.2 GB',
    storageMax: '10 GB',
    connections: 12,
    maxConnections: 100,
    cpuUsage: 35,
    memoryUsage: 52,
    backups: 24,
    region: 'us-east-1',
    availability: '99.9%'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = [
    {
      label: 'Conexiones activas',
      value: instance.connections,
      max: instance.maxConnections,
      icon: Network,
      color: 'text-blue-600'
    },
    {
      label: 'CPU',
      value: instance.cpuUsage,
      max: 100,
      icon: Server,
      color: 'text-orange-600',
      unit: '%'
    },
    {
      label: 'Memoria',
      value: instance.memoryUsage,
      max: 100,
      icon: HardDrive,
      color: 'text-purple-600',
      unit: '%'
    },
    {
      label: 'Backups',
      value: instance.backups,
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Instance Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Database size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{instance.name}</h1>
              <p className="text-gray-600 mt-1">ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{instance.id}</code></p>
            </div>
          </div>

          {instance.status === 'RUNNING' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
              <CheckCircle size={16} />
              <span className="font-semibold">Ejecutándose</span>
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Motor</p>
            <p className="font-semibold text-slate-900">{instance.engine} {instance.version}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Región</p>
            <p className="font-semibold text-slate-900">{instance.region}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Disponibilidad</p>
            <p className="font-semibold text-slate-900">{instance.availability}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Creada</p>
            <p className="font-semibold text-slate-900">15 de Ene, 2024</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const percentage = metric.max ? (metric.value / metric.max) * 100 : 0;

          return (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600">{metric.label}</h3>
                <Icon size={20} className={metric.color} />
              </div>

              <div className="mb-3">
                <p className="text-2xl font-bold text-slate-900">
                  {metric.value}{metric.unit}
                </p>
                {metric.max && (
                  <p className="text-xs text-gray-600 mt-1">
                    de {metric.max}{metric.unit}
                  </p>
                )}
              </div>

              {metric.max && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      percentage > 80
                        ? 'bg-red-500'
                        : percentage > 50
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Información de conexión</h2>

            <div className="space-y-6">
              {/* Host */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Host
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instance.host}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-slate-900 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(instance.host)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Copy size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Port */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Puerto
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instance.port}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-slate-900 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(instance.port.toString())}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Copy size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Usuario
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instance.username}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-slate-900 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(instance.username)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Copy size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-semibold"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={instance.password}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-slate-900 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(instance.password)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Copy size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Database */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Base de datos
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instance.database}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-slate-900 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(instance.database)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Copy size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {copied && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle size={16} />
                  ¡Copiado al portapapeles!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Acciones</h3>

            <div className="space-y-3">
              {instance.status === 'RUNNING' && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition font-semibold">
                  <Pause size={18} />
                  Suspender
                </button>
              )}

              {instance.status !== 'RUNNING' && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold">
                  <Play size={18} />
                  Reanudar
                </button>
              )}

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold">
                <RotateCw size={18} />
                Rotar contraseña
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Almacenamiento</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Usando <span className="font-bold">{instance.storageUsed}</span> de <span className="font-bold">{instance.storageMax}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-500"
                  style={{ width: '42%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">42% utilizado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-8 shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-600" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
              ¿Eliminar instancia?
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Esta acción no se puede deshacer. Se eliminarán todos los datos asociados a <strong>{instance.name}</strong>.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-slate-900 font-semibold hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button className="w-full px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                Sí, eliminar instancia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstanceDetail;
