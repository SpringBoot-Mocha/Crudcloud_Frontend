import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getInstanceById,
  suspendInstance,
  resumeInstance,
  deleteInstance,
  rotatePassword
} from '../../services/instanceService';
import '../../styles/InstanceDetail.css';

const InstanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadInstance();
  }, [id]);

  const loadInstance = async () => {
    try {
      setLoading(true);
      const result = await getInstanceById(id);
      
      if (result.success) {
        setInstance(result.data);
      } else {
        setError('Instancia no encontrada');
      }
    } catch (err) {
      setError('Error al cargar la instancia');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async () => {
    setActionLoading('suspend');
    setError('');
    setSuccess('');

    try {
      const result = await suspendInstance(id);
      if (result.success) {
        setSuccess('Instancia suspendida correctamente');
        loadInstance(); // Recargar datos
      } else {
        setError(result.message || 'Error al suspender la instancia');
      }
    } catch (err) {
      setError('Error al suspender la instancia');
    } finally {
      setActionLoading('');
    }
  };

  const handleResume = async () => {
    setActionLoading('resume');
    setError('');
    setSuccess('');

    try {
      const result = await resumeInstance(id);
      if (result.success) {
        setSuccess('Instancia reanudada correctamente');
        loadInstance();
      } else {
        setError(result.message || 'Error al reanudar la instancia');
      }
    } catch (err) {
      setError('Error al reanudar la instancia');
    } finally {
      setActionLoading('');
    }
  };

  const handleDelete = async () => {
    setActionLoading('delete');
    setError('');

    try {
      const result = await deleteInstance(id);
      if (result.success) {
        navigate('/instances', { 
          state: { message: 'Instancia eliminada correctamente' }
        });
      } else {
        setError(result.message || 'Error al eliminar la instancia');
      }
    } catch (err) {
      setError('Error al eliminar la instancia');
    } finally {
      setActionLoading('');
      setShowDeleteConfirm(false);
    }
  };

  const handleRotatePassword = async () => {
    setActionLoading('rotate');
    setError('');
    setSuccess('');

    try {
      const result = await rotatePassword(id);
      if (result.success) {
        setNewPassword(result.data.newPassword);
        setSuccess('Contraseña rotada correctamente. ¡Guárdala ahora!');
        loadInstance();
      } else {
        setError(result.message || 'Error al rotar la contraseña');
      }
    } catch (err) {
      setError('Error al rotar la contraseña');
    } finally {
      setActionLoading('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copiado al portapapeles');
    setTimeout(() => setSuccess(''), 2000);
  };

  if (loading) {
    return (
      <div className="instance-detail-container">
        <div className="loading">Cargando detalles...</div>
      </div>
    );
  }

  if (!instance) {
    return (
      <div className="instance-detail-container">
        <div className="error">Instancia no encontrada</div>
      </div>
    );
  }

  return (
    <div className="instance-detail-container">
      {/* Header */}
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/instances')}>
          ← Volver a Mis Instancias
        </button>
        <div className="header-info">
          <h1>{instance.instanceName}</h1>
          <span className={`status-badge status-${instance.status.toLowerCase()}`}>
            {instance.status}
          </span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Nueva contraseña (si se rotó) */}
      {newPassword && (
        <div className="alert alert-warning">
          <strong>⚠️ Nueva Contraseña (visible solo una vez):</strong>
          <div className="password-display">
            <code>{newPassword}</code>
            <button 
              className="btn-copy"
              onClick={() => copyToClipboard(newPassword)}
            >
              📋 Copiar
            </button>
          </div>
          <small>Guarda esta contraseña en un lugar seguro</small>
        </div>
      )}

      {/* Información de conexión */}
      <div className="detail-card">
        <h2>Información de Conexión</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Motor:</label>
            <span>{instance.engineName}</span>
          </div>
          <div className="info-item">
            <label>Host:</label>
            <div className="copyable">
              <code>{instance.host}</code>
              <button 
                className="btn-icon"
                onClick={() => copyToClipboard(instance.host)}
              >
                📋
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Puerto:</label>
            <div className="copyable">
              <code>{instance.port}</code>
              <button 
                className="btn-icon"
                onClick={() => copyToClipboard(instance.port)}
              >
                📋
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Usuario:</label>
            <div className="copyable">
              <code>{instance.username}</code>
              <button 
                className="btn-icon"
                onClick={() => copyToClipboard(instance.username)}
              >
                📋
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Nombre de BD:</label>
            <div className="copyable">
              <code>{instance.databaseName}</code>
              <button 
                className="btn-icon"
                onClick={() => copyToClipboard(instance.databaseName)}
              >
                📋
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Container ID:</label>
            <code className="small">{instance.containerId}</code>
          </div>
        </div>
      </div>

      {/* String de conexión */}
      <div className="detail-card">
        <h2>String de Conexión</h2>
        <div className="connection-string">
          <code>{instance.connectionString}</code>
          <button 
            className="btn-copy"
            onClick={() => copyToClipboard(instance.connectionString)}
          >
            📋 Copiar
          </button>
        </div>
        <small>Usa este string para conectarte desde tu aplicación</small>
      </div>

      {/* Acciones */}
      <div className="detail-card">
        <h2>Acciones</h2>
        <div className="actions-grid">
          {instance.status === 'RUNNING' && (
            <button
              className="btn-warning"
              onClick={handleSuspend}
              disabled={actionLoading === 'suspend'}
            >
              {actionLoading === 'suspend' ? '⏳ Suspendiendo...' : '⏸️ Suspender'}
            </button>
          )}

          {instance.status === 'STOPPED' && (
            <button
              className="btn-success"
              onClick={handleResume}
              disabled={actionLoading === 'resume'}
            >
              {actionLoading === 'resume' ? '⏳ Reanudando...' : '▶️ Reanudar'}
            </button>
          )}

          <button
            className="btn-info"
            onClick={handleRotatePassword}
            disabled={actionLoading === 'rotate'}
          >
            {actionLoading === 'rotate' ? '⏳ Rotando...' : '🔄 Rotar Contraseña'}
          </button>

          <button
            className="btn-danger"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={actionLoading !== ''}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="detail-card">
        <h2>Información Adicional</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Creada:</label>
            <span>{new Date(instance.createdAt).toLocaleString()}</span>
          </div>
          <div className="info-item">
            <label>Última actualización:</label>
            <span>{new Date(instance.updatedAt).toLocaleString()}</span>
          </div>
          {instance.lastRotatedAt && (
            <div className="info-item">
              <label>Última rotación:</label>
              <span>{new Date(instance.lastRotatedAt).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>
              ¿Estás seguro de que deseas eliminar la instancia <strong>{instance.instanceName}</strong>?
            </p>
            <p className="warning-text">
              Esta acción es irreversible y se perderán todos los datos.
            </p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-danger"
                onClick={handleDelete}
                disabled={actionLoading === 'delete'}
              >
                {actionLoading === 'delete' ? 'Eliminando...' : 'Eliminar Definitivamente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstanceDetail;
