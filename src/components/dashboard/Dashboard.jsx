import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserInstances } from '../../services/instanceService';
import { getUserPlan } from '../../services/planService';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [instances, setInstances] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar instancias del usuario
      const instancesResult = await getUserInstances();
      if (instancesResult.success) {
        setInstances(instancesResult.data);
      }

      // Cargar plan del usuario
      const planResult = await getUserPlan();
      if (planResult.success) {
        setPlan(planResult.data);
      }
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'RUNNING': return 'status-running';
      case 'STOPPED': return 'status-stopped';
      case 'PENDING': return 'status-pending';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div>
          <h1>¡Bienvenido, {user?.name}!</h1>
          <p className="dashboard-subtitle">Panel de control de CrudCloud</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Tarjetas de Resumen */}
      <div className="dashboard-stats">
        {/* Tarjeta de Plan */}
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Plan Actual</h3>
            <p className="stat-value">{plan?.name || 'FREE'}</p>
            <p className="stat-label">
              {instances.length} / {plan?.maxInstances || 2} instancias
            </p>
          </div>
        </div>

        {/* Tarjeta de Instancias Activas */}
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>Instancias Activas</h3>
            <p className="stat-value">
              {instances.filter(i => i.status === 'RUNNING').length}
            </p>
            <p className="stat-label">en ejecución</p>
          </div>
        </div>

        {/* Tarjeta de Instancias Detenidas */}
        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <div className="stat-content">
            <h3>Instancias Detenidas</h3>
            <p className="stat-value">
              {instances.filter(i => i.status === 'STOPPED').length}
            </p>
            <p className="stat-label">suspendidas</p>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div className="actions-grid">
          <button 
            className="action-btn"
            onClick={() => navigate('/catalog')}
            disabled={instances.length >= (plan?.maxInstances || 2)}
          >
            <span className="action-icon">➕</span>
            <span>Nueva Instancia</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => navigate('/instances')}
          >
            <span className="action-icon">📋</span>
            <span>Ver Mis Instancias</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => navigate('/catalog')}
          >
            <span className="action-icon">🗄️</span>
            <span>Catálogo de Motores</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => navigate('/plan')}
          >
            <span className="action-icon">⬆️</span>
            <span>Mejorar Plan</span>
          </button>
        </div>
      </div>

      {/* Instancias Recientes */}
      <div className="recent-instances">
        <div className="section-header">
          <h2>Instancias Recientes</h2>
          <button 
            className="btn-link"
            onClick={() => navigate('/instances')}
          >
            Ver todas →
          </button>
        </div>

        {instances.length === 0 ? (
          <div className="empty-state">
            <p>No tienes instancias aún</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/catalog')}
            >
              Crear tu primera instancia
            </button>
          </div>
        ) : (
          <div className="instances-grid">
            {instances.slice(0, 4).map(instance => (
              <div 
                key={instance.id} 
                className="instance-card"
                onClick={() => navigate(`/instances/${instance.id}`)}
              >
                <div className="instance-header">
                  <h3>{instance.instanceName}</h3>
                  <span className={`status-badge ${getStatusColor(instance.status)}`}>
                    {instance.status}
                  </span>
                </div>
                <p className="instance-engine">{instance.engineName}</p>
                <p className="instance-date">
                  Creada: {new Date(instance.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
