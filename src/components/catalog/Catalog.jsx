import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableEngines, createInstance } from '../../services/instanceService';
import { getUserPlan } from '../../services/planService';
import '../../styles/Catalog.css';

const Catalog = () => {
  const navigate = useNavigate();
  
  const [engines, setEngines] = useState([]);
  const [plan, setPlan] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [instanceName, setInstanceName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar motores disponibles
      const enginesResult = await getAvailableEngines();
      if (enginesResult.success) {
        setEngines(enginesResult.data);
      }

      // Cargar plan del usuario
      const planResult = await getUserPlan();
      if (planResult.success) {
        setPlan(planResult.data);
      }
    } catch (err) {
      setError('Error al cargar el catálogo');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEngine = (engine) => {
    setSelectedEngine(engine);
    setError('');
  };

  const handleCreateInstance = async (e) => {
    e.preventDefault();
    
    if (!instanceName || !selectedEngine) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (plan && plan.currentInstances >= plan.maxInstances) {
      setError(`Has alcanzado el límite de ${plan.maxInstances} instancias de tu plan ${plan.name}`);
      return;
    }

    setCreating(true);
    setError('');

    try {
      const result = await createInstance({
        instanceName,
        engineId: selectedEngine.id
      });

      if (result.success) {
        // Redirigir a la página de detalles de la instancia
        navigate(`/instances/${result.data.id}`);
      } else {
        setError(result.message || 'Error al crear la instancia');
      }
    } catch (err) {
      setError('Error al crear la instancia');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="catalog-container">
        <div className="loading">Cargando catálogo...</div>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Catálogo de Motores de Bases de Datos</h1>
        <p>Selecciona el motor de base de datos que necesitas</p>
      </div>

      {/* Información del plan */}
      {plan && (
        <div className="plan-info">
          <p>
            Plan: <strong>{plan.name}</strong> - 
            Instancias: <strong>{plan.currentInstances} / {plan.maxInstances}</strong>
          </p>
          {plan.currentInstances >= plan.maxInstances && (
            <p className="limit-warning">
              ⚠️ Has alcanzado el límite de instancias. 
              <button onClick={() => navigate('/plan')} className="btn-link">
                Mejora tu plan
              </button>
            </p>
          )}
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {/* Grid de motores */}
      <div className="engines-grid">
        {engines.map(engine => (
          <div 
            key={engine.id}
            className={`engine-card ${selectedEngine?.id === engine.id ? 'selected' : ''}`}
            onClick={() => handleSelectEngine(engine)}
          >
            <div className="engine-icon">{engine.icon || '🗄️'}</div>
            <h3>{engine.name}</h3>
            <p className="engine-version">Versión {engine.version}</p>
            <p className="engine-description">{engine.description}</p>
            <div className="engine-specs">
              <span>📦 Puerto: {engine.defaultPort}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de creación */}
      {selectedEngine && (
        <div className="creation-form">
          <h2>Crear instancia de {selectedEngine.name}</h2>
          
          <form onSubmit={handleCreateInstance}>
            <div className="form-group">
              <label htmlFor="instanceName">Nombre de la instancia</label>
              <input
                type="text"
                id="instanceName"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                placeholder="mi-base-datos"
                className="form-input"
                disabled={creating}
              />
              <small>El nombre debe ser único y descriptivo</small>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setSelectedEngine(null)}
                disabled={creating}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={creating || (plan && plan.currentInstances >= plan.maxInstances)}
              >
                {creating ? 'Creando...' : 'Crear Instancia'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Catalog;
