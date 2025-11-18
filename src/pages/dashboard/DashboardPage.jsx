import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Copy, Play, Pause, MoreVertical, Plus, ArrowUpRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Button } from '../../components/ui';
import { useInstances } from '../../hooks/useInstances';
import { usePlans } from '../../hooks/usePlans';
import { normalizeInstances } from '../../utils/engineMapper';

const DashboardPage = () => {
  const { instances: rawInstances, loading, fetchInstances } = useInstances();
  const { currentSubscription } = usePlans();
  const [copiedHost, setCopiedHost] = useState(null);

  useEffect(() => {
    fetchInstances();
  }, []);

  // Normalize instance data from backend (map containerName to name, databaseEngine ID to engine name)
  const instances = normalizeInstances(rawInstances);

  // Get plan limit
  const getPlanLimit = (planName) => {
    const limits = {
      'Free': 2,
      'Standard': 5,
      'Premium': 10
    };
    return limits[planName] || 2; // default to Free limit
  };

  const planName = currentSubscription?.plan?.name || 'Free';
  const maxInstances = getPlanLimit(planName);

  const runningCount = instances.filter((i) => i.status === 'RUNNING').length;
  const suspendedCount = instances.filter((i) => i.status === 'SUSPENDED').length;
  const totalCount = instances.length;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'RUNNING':
        return 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50/80 text-emerald-600 border border-emerald-200/50 backdrop-blur-sm';
      case 'SUSPENDED':
        return 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50/80 text-amber-600 border border-amber-200/50 backdrop-blur-sm';
      case 'CREATING':
        return 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50/80 text-blue-600 border border-blue-200/50 backdrop-blur-sm';
      default:
        return 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50/80 text-gray-600 border border-gray-200/50 backdrop-blur-sm';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RUNNING':
        return <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>;
      case 'SUSPENDED':
        return <Pause size={14} />;
      case 'CREATING':
        return <Clock size={14} className="animate-spin" />;
      default:
        return <AlertTriangle size={14} />;
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedHost(id);
    setTimeout(() => setCopiedHost(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-8">
        {/* Hero Section - Minimalist */}
        <div className="animate-fade-in">
          <div className="mb-2">
            <p className="text-sm font-medium text-teal-600">Bienvenido de vuelta</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-2 tracking-tight">
            Dashboard
          </h1>
          <p className="text-base text-slate-500">
            Gestiona y controla todas tus instancias de bases de datos desde aquí
          </p>
        </div>

        {/* Stats Grid - Minimal & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Instances */}
          <div className="group">
            <Card className="border border-slate-200/50 hover:border-slate-300/70 hover:shadow-elevation-2 transition-all duration-300 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Activas</p>
                  <p className="text-3xl font-semibold text-slate-900 mt-3">{runningCount}</p>
                  <p className="text-xs text-slate-400 mt-3">de {maxInstances} disponibles</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50/50 flex items-center justify-center group-hover:bg-emerald-100/50 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(runningCount / maxInstances) * 100}%` }}></div>
              </div>
            </Card>
          </div>

          {/* Suspended Instances */}
          <div className="group">
            <Card className="border border-slate-200/50 hover:border-slate-300/70 hover:shadow-elevation-2 transition-all duration-300 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Suspendidas</p>
                  <p className="text-3xl font-semibold text-slate-900 mt-3">{suspendedCount}</p>
                  <p className="text-xs text-slate-400 mt-3">en pausa temporal</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-50/50 flex items-center justify-center group-hover:bg-amber-100/50 transition-colors duration-300">
                  <Pause size={18} className="text-amber-600" />
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${(suspendedCount / maxInstances) * 100}%` }}></div>
              </div>
            </Card>
          </div>

          {/* Total Instances */}
          <div className="group">
            <Card className="border border-slate-200/50 hover:border-slate-300/70 hover:shadow-elevation-2 transition-all duration-300 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
                  <p className="text-3xl font-semibold text-slate-900 mt-3">{totalCount}</p>
                  <p className="text-xs text-slate-400 mt-3">Plan {planName} activo</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-50/50 flex items-center justify-center group-hover:bg-blue-100/50 transition-colors duration-300">
                  <Database size={18} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${(totalCount / maxInstances) * 100}%` }}></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Instances Table - Premium & Minimal */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Instancias</h2>
              <p className="text-sm text-slate-500 mt-1">{totalCount} registros en total</p>
            </div>
            <Link to="/instances">
              <Button variant="primary" className="flex items-center gap-2 text-sm">
                <Plus size={16} />
                Nueva
              </Button>
            </Link>
          </div>

          {loading ? (
            <Card className="text-center py-12 border border-slate-200/50 bg-white/60">
              <p className="text-slate-500 text-sm">Cargando instancias...</p>
            </Card>
          ) : instances.length === 0 ? (
            <Card className="border border-slate-200/50 bg-white/60">
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Database size={24} className="text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium mb-2">No hay instancias todavía</p>
                <p className="text-sm text-slate-500 mb-6">Comienza creando tu primera base de datos</p>
                <Link to="/instances">
                  <Button variant="primary" size="sm">Crear instancia</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100/50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/30">Nombre</th>
                      <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/30">Motor</th>
                      <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/30">Host</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/30">Estado</th>
                      <th className="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/30">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instances.slice(0, 5).map((instance) => (
                      <tr key={instance.id} className="border-b border-slate-100/30 hover:bg-slate-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                              <Database size={16} className="text-slate-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{instance.name}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{instance.engine}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4">
                          <span className="text-xs font-medium text-slate-600 bg-slate-50/50 px-2 py-1 rounded">
                            {instance.engine}
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          <div className="flex items-center gap-2 group">
                            <span className="text-xs text-slate-600 font-mono truncate">{instance.host}</span>
                            <button
                              title={copiedHost === instance.id ? 'Copiado!' : 'Copiar'}
                              onClick={() => copyToClipboard(instance.host, instance.id)}
                              className="p-1 hover:bg-slate-200/50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            >
                              <Copy size={14} className={copiedHost === instance.id ? 'text-emerald-600' : 'text-slate-400'} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={getStatusBadgeColor(instance.status)}>
                            {getStatusIcon(instance.status)}
                            <span className="hidden sm:inline">{instance.status}</span>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-6 py-4">
                          <div className="flex items-center gap-1">
                            {instance.status === 'RUNNING' ? (
                              <button
                                title="Pausar"
                                className="p-1.5 hover:bg-slate-200/50 rounded transition-colors duration-200 text-slate-500 hover:text-slate-700"
                              >
                                <Pause size={16} />
                              </button>
                            ) : (
                              <button
                                title="Reanudar"
                                className="p-1.5 hover:bg-slate-200/50 rounded transition-colors duration-200 text-slate-500 hover:text-slate-700"
                              >
                                <Play size={16} />
                              </button>
                            )}
                            <button
                              title="Más"
                              className="p-1.5 hover:bg-slate-200/50 rounded transition-colors duration-200 text-slate-500 hover:text-slate-700"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Call to Action - Minimal */}
        {instances.length < maxInstances && (
          <div className="border border-slate-200/50 rounded-2xl p-8 bg-white/60 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Expande tu infraestructura</h3>
                <p className="text-sm text-slate-500">Puedes crear hasta {maxInstances - totalCount} instancias más con tu plan actual</p>
              </div>
              <ArrowUpRight size={20} className="text-slate-400" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
