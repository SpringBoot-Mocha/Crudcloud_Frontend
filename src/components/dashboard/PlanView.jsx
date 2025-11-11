import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPlan, getAllPlans, upgradePlan } from '../../services/planService';
import '../../styles/Plan.css';

const PlanView = () => {
  const navigate = useNavigate();
  
  const [currentPlan, setCurrentPlan] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      
      // Cargar plan actual
      const currentResult = await getUserPlan();
      if (currentResult.success) {
        setCurrentPlan(currentResult.data);
      }

      // Cargar todos los planes disponibles
      const plansResult = await getAllPlans();
      if (plansResult.success) {
        setAvailablePlans(plansResult.data);
      }
    } catch (err) {
      setError('Error al cargar los planes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    setUpgrading(true);
    setError('');
    setSuccess('');

    try {
      const result = await upgradePlan(planId);
      
      if (result.success) {
        setSuccess('Plan actualizado correctamente');
        loadPlans(); // Recargar planes
      } else {
        setError(result.message || 'Error al actualizar el plan');
      }
    } catch (err) {
      setError('Error al procesar el upgrade');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="plan-container">
        <div className="loading">Cargando planes...</div>
      </div>
    );
  }

  return (
    <div className="plan-container">
      <div className="plan-header">
        <h1>Tu Plan de Suscripción</h1>
        <p>Elige el plan que mejor se adapte a tus necesidades</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Plan Actual */}
      {currentPlan && (
        <div className="current-plan-card">
          <div className="current-plan-header">
            <h2>Tu Plan Actual</h2>
            <span className="current-badge">Activo</span>
          </div>
          <div className="current-plan-content">
            <h3>{currentPlan.name}</h3>
            <p className="plan-price">
              {currentPlan.price === 0 ? 'Gratis' : `$${currentPlan.price}/mes`}
            </p>
            <div className="plan-usage">
              <div className="usage-bar">
                <div 
                  className="usage-fill"
                  style={{ 
                    width: `${(currentPlan.currentInstances / currentPlan.maxInstances) * 100}%` 
                  }}
                />
              </div>
              <p>
                {currentPlan.currentInstances} / {currentPlan.maxInstances} instancias usadas
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Planes Disponibles */}
      <div className="plans-grid">
        {availablePlans.map(plan => (
          <div 
            key={plan.id}
            className={`plan-card ${currentPlan?.id === plan.id ? 'current' : ''}`}
          >
            {plan.name === 'PRO' && (
              <div className="plan-badge">Más Popular</div>
            )}
            
            <div className="plan-header-content">
              <h3>{plan.name}</h3>
              <div className="plan-price">
                {plan.price === 0 ? (
                  <>
                    <span className="price-amount">Gratis</span>
                    <span className="price-period">para siempre</span>
                  </>
                ) : (
                  <>
                    <span className="price-currency">$</span>
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">/mes</span>
                  </>
                )}
              </div>
            </div>

            <div className="plan-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Hasta {plan.maxInstances} instancias</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Todos los motores de BD</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Backup automático</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Soporte 24/7</span>
              </div>
              {plan.name !== 'FREE' && (
                <>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Sin límite de transferencia</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Métricas avanzadas</span>
                  </div>
                </>
              )}
              {plan.name === 'PRO' && (
                <>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Alta disponibilidad</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Soporte prioritario</span>
                  </div>
                </>
              )}
            </div>

            <div className="plan-action">
              {currentPlan?.id === plan.id ? (
                <button className="btn-current" disabled>
                  Plan Actual
                </button>
              ) : currentPlan && plan.price <= currentPlan.price ? (
                <button className="btn-downgrade" disabled>
                  Downgrade no disponible
                </button>
              ) : (
                <button
                  className="btn-upgrade"
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={upgrading}
                >
                  {upgrading ? 'Procesando...' : 
                   plan.price === 0 ? 'Seleccionar' : 'Mejorar Plan'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="plan-info-section">
        <h2>¿Por qué mejorar tu plan?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h4>Más Instancias</h4>
            <p>Crea más bases de datos según tus necesidades</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💾</div>
            <h4>Backups Automáticos</h4>
            <p>Respaldos diarios de todas tus bases de datos</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h4>Métricas Avanzadas</h4>
            <p>Monitorea el rendimiento en tiempo real</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h4>Mayor Seguridad</h4>
            <p>Cifrado avanzado y alta disponibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanView;
