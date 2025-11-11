import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInstances } from '../../services/instanceService';
import '../../styles/Instances.css';

const InstanceList = () => {
  const navigate = useNavigate();
  
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInstances();
  }, []);

  useEffect(() => {
    filterInstances();
  }, [searchTerm, statusFilter, instances]);

  const loadInstances = async () => {
    try {
      setLoading(true);
      const result = await getUserInstances();
      
      if (result.success) {
        setInstances(result.data);
        setFilteredInstances(result.data);
      } else {
        setError(result.message || 'Error al cargar las instancias');
      }
    } catch (err) {
      setError('Error al cargar las instancias');
    } finally {
      setLoading(false);
    }
  };

  const filterInstances = () => {
    let filtered = [...instances];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(instance =>
        instance.instanceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instance.engineName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(instance => instance.status === statusFilter);
    }

    setFilteredInstances(filtered);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'RUNNING': return 'status-running';
      case 'STOPPED': return 'status-stopped';
      case 'PENDING': return 'status-pending';
      case 'ERROR': return 'status-error';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'RUNNING': return '🟢';
      case 'STOPPED': return '🔴';
      case 'PENDING': return '🟡';
      case 'ERROR': return '❌';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="instances-container">
        <div className="loading">Cargando instancias...</div>
      </div>
    );
  }

  return (
    <div className="instances-container">
      <div className="instances-header">
        <div>
          <h1>Mis Instancias</h1>
          <p>Administra todas tus bases de datos</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/catalog')}
        >
          ➕ Nueva Instancia
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Filtros y búsqueda */}
      <div className="instances-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre o motor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="status-filters">
          <button
            className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            Todas ({instances.length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'RUNNING' ? 'active' : ''}`}
            onClick={() => setStatusFilter('RUNNING')}
          >
            🟢 Activas ({instances.filter(i => i.status === 'RUNNING').length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'STOPPED' ? 'active' : ''}`}
            onClick={() => setStatusFilter('STOPPED')}
          >
            🔴 Detenidas ({instances.filter(i => i.status === 'STOPPED').length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setStatusFilter('PENDING')}
          >
            🟡 Pendientes ({instances.filter(i => i.status === 'PENDING').length})
          </button>
        </div>
      </div>

      {/* Lista de instancias */}
      {filteredInstances.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No se encontraron instancias</h3>
          <p>
            {searchTerm || statusFilter !== 'ALL' 
              ? 'Intenta cambiar los filtros de búsqueda'
              : 'Crea tu primera instancia para comenzar'
            }
          </p>
          {!searchTerm && statusFilter === 'ALL' && (
            <button 
              className="btn-primary"
              onClick={() => navigate('/catalog')}
            >
              Crear Instancia
            </button>
          )}
        </div>
      ) : (
        <div className="instances-table">
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Nombre</th>
                <th>Motor</th>
                <th>Host</th>
                <th>Puerto</th>
                <th>Creada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstances.map(instance => (
                <tr key={instance.id}>
                  <td>
                    <span className={`status-badge ${getStatusColor(instance.status)}`}>
                      {getStatusIcon(instance.status)} {instance.status}
                    </span>
                  </td>
                  <td>
                    <strong>{instance.instanceName}</strong>
                  </td>
                  <td>{instance.engineName}</td>
                  <td>
                    <code>{instance.host}</code>
                  </td>
                  <td>
                    <code>{instance.port}</code>
                  </td>
                  <td>{new Date(instance.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-table"
                      onClick={() => navigate(`/instances/${instance.id}`)}
                    >
                      Ver Detalles →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstanceList;
