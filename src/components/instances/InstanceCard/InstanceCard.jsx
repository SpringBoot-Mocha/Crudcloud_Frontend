import React from 'react';
import { Pause, Play, RefreshCw, Trash2, Copy, CheckCircle, Clock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { normalizeInstance } from '../../../utils/engineMapper';

const InstanceCard = ({ instance: rawInstance, onDelete, onStatusChange, onRotatePassword }) => {
  // Normalize instance data from backend
  const instance = normalizeInstance(rawInstance);
  const [copiedType, setCopiedType] = React.useState(null);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      RUNNING: {
        color: 'bg-emerald-50/50 border-emerald-200/50',
        textColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        icon: <CheckCircle size={16} className="text-emerald-600" />,
        label: 'En Ejecución',
      },
      SUSPENDED: {
        color: 'bg-amber-50/50 border-amber-200/50',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        icon: <Pause size={16} className="text-amber-600" />,
        label: 'Pausada',
      },
      CREATING: {
        color: 'bg-blue-50/50 border-blue-200/50',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: <Clock size={16} className="text-blue-600 animate-spin" />,
        label: 'Creando',
      },
      DELETED: {
        color: 'bg-red-50/50 border-red-200/50',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <AlertTriangle size={16} className="text-red-600" />,
        label: 'Eliminada',
      },
    };
    return configs[status] || configs.DELETED;
  };

  const statusConfig = getStatusConfig(instance.status);

  const copyToClipboard = (text, type = 'general') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm hover:border-slate-300/70 hover:shadow-lg transition-all duration-300 p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 group/copy mb-1">
            <h3 className="text-lg font-semibold text-slate-900 truncate">{instance.name}</h3>
            <button
              onClick={() => copyToClipboard(instance.name, 'name')}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100 flex-shrink-0"
              title={copiedType === 'name' ? '¡Copiado!' : 'Copiar'}
            >
              <Copy size={14} />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">ID: {instance.id}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.color} border ${statusConfig.textColor}`}>
          {statusConfig.icon}
          <span className="hidden sm:inline">{statusConfig.label}</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-3 mb-6 pb-6 border-b border-slate-100/50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Motor</p>
            <p className="text-sm font-medium text-slate-900">{instance.engine}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Puerto</p>
            <div className="flex items-center gap-2 group/copy">
              <p className="text-xs font-mono text-slate-600 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 truncate">
                {instance.port}
              </p>
              <button
                onClick={() => copyToClipboard(instance.port, 'port')}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100"
                title={copiedType === 'port' ? '¡Copiado!' : 'Copiar'}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Host</p>
            <div className="flex items-center gap-2 group/copy">
              <p className="text-xs font-mono text-slate-600 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 truncate">
                {instance.host}
              </p>
              <button
                onClick={() => copyToClipboard(instance.host, 'host')}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100"
                title={copiedType === 'host' ? '¡Copiado!' : 'Copiar'}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Usuario</p>
            <div className="flex items-center gap-2 group/copy">
              <p className="text-xs font-mono text-slate-600 bg-slate-50/50 px-3 py-2 rounded-lg flex-1 truncate">
                {instance.username}
              </p>
              <button
                onClick={() => copyToClipboard(instance.username, 'username')}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100"
                title={copiedType === 'username' ? '¡Copiado!' : 'Copiar'}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Contraseña</p>
            <div className="flex items-center gap-2 group/copy">
              <p className="text-xs font-mono text-slate-600 bg-slate-50/50 px-3 py-2 rounded-lg flex-1">
                {passwordVisible ? instance.password : '•'.repeat(instance.password?.length || 12)}
              </p>
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100"
                title={passwordVisible ? 'Ocultar' : 'Mostrar'}
              >
                {passwordVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={() => copyToClipboard(instance.password, 'password')}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200 opacity-0 group-hover/copy:opacity-100"
                title={copiedType === 'password' ? '¡Copiado!' : 'Copiar'}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {instance.status === 'RUNNING' && (
          <button
            onClick={() => onStatusChange(instance.id, 'SUSPENDED')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
            title="Pausar esta instancia"
          >
            <Pause size={14} />
            <span>Pausar</span>
          </button>
        )}
        {instance.status === 'SUSPENDED' && (
          <button
            onClick={() => onStatusChange(instance.id, 'RUNNING')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
            title="Reanudar esta instancia"
          >
            <Play size={14} />
            <span>Reanudar</span>
          </button>
        )}
        <button
          onClick={() => onRotatePassword(instance.id)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
          title="Rotar contraseña"
        >
          <RefreshCw size={14} />
          <span>Rotar</span>
        </button>
        <button
          onClick={() => onDelete(instance.id)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
          title="Eliminar instancia"
        >
          <Trash2 size={14} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default InstanceCard;
