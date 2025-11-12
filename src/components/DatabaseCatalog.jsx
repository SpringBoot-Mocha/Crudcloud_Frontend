import React from 'react';
import {
  Plus,
  Star,
  Users,
  Zap,
  Lock,
  RefreshCw
} from 'lucide-react';

const DatabaseCatalog = () => {
  const databases = [
    {
      id: 1,
      name: 'MySQL',
      icon: '🐬',
      description: 'Base de datos relacional de código abierto',
      features: ['ACID', 'Indexación', 'Replicación'],
      popularity: 'Muy popular',
      color: 'from-blue-500 to-blue-600',
      recommended: true
    },
    {
      id: 2,
      name: 'PostgreSQL',
      icon: '🐘',
      description: 'Base de datos relacional avanzada',
      features: ['JSONB', 'Full-text search', 'Extensiones'],
      popularity: 'Muy popular',
      color: 'from-cyan-500 to-cyan-600',
      recommended: true
    },
    {
      id: 3,
      name: 'MongoDB',
      icon: '🍃',
      description: 'Base de datos NoSQL orientada a documentos',
      features: ['Documentos JSON', 'Escalabilidad', 'Flexibilidad'],
      popularity: 'Popular',
      color: 'from-green-500 to-green-600',
      recommended: false
    },
    {
      id: 4,
      name: 'Redis',
      icon: '⚡',
      description: 'Almacén de datos en memoria de alto rendimiento',
      features: ['In-memory', 'Pub/Sub', 'Cache'],
      popularity: 'Popular',
      color: 'from-red-500 to-red-600',
      recommended: false
    },
    {
      id: 5,
      name: 'Cassandra',
      icon: '💎',
      description: 'Base de datos distribuida de alta disponibilidad',
      features: ['Distribuida', 'Tolerancia fallos', 'Escalable'],
      popularity: 'Especializada',
      color: 'from-purple-500 to-purple-600',
      recommended: false
    },
    {
      id: 6,
      name: 'SQL Server',
      icon: '🔷',
      description: 'Base de datos relacional empresarial de Microsoft',
      features: ['Reporting', 'Analysis', 'Seguridad'],
      popularity: 'Empresarial',
      color: 'from-amber-500 to-amber-600',
      recommended: false
    }
  ];

  const [selectedDb, setSelectedDb] = React.useState(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Catálogo de Motores</h2>
        <p className="text-gray-600">Selecciona un motor de base de datos para crear una nueva instancia</p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition">
          Todos
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
          Relacionales
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
          NoSQL
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
          In-Memory
        </button>
      </div>

      {/* Database Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {databases.map((db) => (
          <div
            key={db.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedDb(db.id)}
          >
            {/* Header with color gradient */}
            <div className={`bg-gradient-to-br ${db.color} p-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-5xl">{db.icon}</span>
                {db.recommended && (
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-white fill-white" />
                    <span className="text-xs text-white font-semibold">Recomendado</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{db.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{db.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Características</p>
                <div className="flex flex-wrap gap-2">
                  {db.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      <Zap size={12} />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popularity Badge */}
              <div className="flex items-center gap-2 pb-6 border-b border-gray-200 mb-6">
                <Users size={14} className="text-gray-400" />
                <span className="text-xs text-gray-600">{db.popularity}</span>
              </div>

              {/* Create Button */}
              <button className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white py-3 rounded-lg font-semibold hover:from-brand-700 hover:to-brand-800 transition flex items-center justify-center gap-2 group">
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                Crear Instancia
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear instancia */}
      {selectedDb && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Crear nueva instancia: {databases.find(d => d.id === selectedDb)?.name}
            </h3>

            <div className="space-y-6">
              {/* Nombre de instancia */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Nombre de la instancia</label>
                <input
                  type="text"
                  placeholder="ej: prod-mysql-001"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Selecciona un plan</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Small', 'Medium', 'Large'].map((plan) => (
                    <div
                      key={plan}
                      className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition"
                    >
                      <p className="font-semibold text-slate-900">{plan}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {plan === 'Small' && '1 vCPU, 2GB RAM'}
                        {plan === 'Medium' && '2 vCPU, 4GB RAM'}
                        {plan === 'Large' && '4 vCPU, 8GB RAM'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Región */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Región</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>us-east-1 (Virginia)</option>
                  <option>eu-west-1 (Irlanda)</option>
                  <option>ap-southeast-1 (Singapur)</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedDb(null)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-slate-900 font-semibold hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold hover:from-brand-700 hover:to-brand-800 transition">
                  Crear Instancia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseCatalog;
