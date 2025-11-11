import React from 'react';
import {
  Database,
  Play,
  Pause,
  Trash2,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const user = {
    name: 'Juan Dev',
    plan: 'Standard',
    email: 'juan@example.com'
  };

  const instances = [
    {
      id: 1,
      name: 'Production MySQL',
      engine: 'MySQL',
      status: 'RUNNING',
      host: 'mysql-prod.crudcloud.io',
      createdAt: '2024-01-15',
      connections: 12
    },
    {
      id: 2,
      name: 'Analytics PostgreSQL',
      engine: 'PostgreSQL',
      status: 'RUNNING',
      host: 'pg-analytics.crudcloud.io',
      createdAt: '2024-02-03',
      connections: 5
    },
    {
      id: 3,
      name: 'Cache Redis',
      engine: 'Redis',
      status: 'RUNNING',
      host: 'redis-cache.crudcloud.io',
      createdAt: '2024-02-10',
      connections: 3
    },
    {
      id: 4,
      name: 'Development MongoDB',
      engine: 'MongoDB',
      status: 'SUSPENDED',
      host: 'mongo-dev.crudcloud.io',
      createdAt: '2024-01-20',
      connections: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-700';
      case 'SUSPENDED':
        return 'bg-yellow-100 text-yellow-700';
      case 'CREATING':
        return 'bg-blue-100 text-blue-700';
      case 'DELETED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RUNNING':
        return <CheckCircle size={16} />;
      case 'SUSPENDED':
        return <Pause size={16} />;
      case 'CREATING':
        return <Clock size={16} />;
      case 'DELETED':
        return <AlertCircle size={16} />;
      default:
        return <Database size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">¡Bienvenido, {user.name}!</h2>
            <p className="text-violet-200 mb-4">
              Gestiona tus instancias de bases de datos en la nube de manera segura y eficiente
            </p>
            <div className="flex gap-4">
              <div>
                <p className="text-sm text-violet-300">Plan Actual</p>
                <p className="text-2xl font-bold">{user.plan}</p>
              </div>
              <div>
                <p className="text-sm text-violet-300">Instancias Activas</p>
                <p className="text-2xl font-bold">3 de 5</p>
              </div>
            </div>
          </div>
          <div className="text-violet-300">
            <TrendingUp size={48} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Instancias Activas</p>
              <p className="text-4xl font-bold text-slate-900">3</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Ejecutándose correctamente</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Suspendidas</p>
              <p className="text-4xl font-bold text-slate-900">1</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Pause size={24} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">En pausa</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Almacenamiento</p>
              <p className="text-4xl font-bold text-slate-900">2.4 GB</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">De 10 GB disponibles</p>
        </div>
      </div>

      {/* Instances List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Instancias Activas</h3>
            <p className="text-sm text-gray-600 mt-1">Resumen de todas tus bases de datos</p>
          </div>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition flex items-center gap-2">
            <Plus size={18} />
            Nueva Instancia
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">NOMBRE</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">MOTOR</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">HOST</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ESTADO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">CONEXIONES</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance) => (
                <tr key={instance.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                        <Database size={20} className="text-violet-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{instance.name}</p>
                        <p className="text-xs text-gray-500">{instance.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{instance.engine}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-mono">{instance.host}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(instance.status)}`}>
                      {getStatusIcon(instance.status)}
                      {instance.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{instance.connections}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {instance.status === 'RUNNING' ? (
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition" title="Suspender">
                          <Pause size={16} className="text-gray-600" />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition" title="Reanudar">
                          <Play size={16} className="text-gray-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-red-50 rounded-lg transition" title="Eliminar">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
