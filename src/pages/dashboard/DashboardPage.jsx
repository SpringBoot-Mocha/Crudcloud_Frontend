import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Button } from '../../components/ui';
import { useInstances } from '../../hooks/useInstances';

const DashboardPage = () => {
  const { instances, loading, fetchInstances } = useInstances();

  useEffect(() => {
    fetchInstances();
  }, []);

  const stats = [
    {
      label: 'Total de Instancias',
      value: instances.length,
      icon: '💾',
      color: 'blue',
    },
    {
      label: 'Instancias Activas',
      value: instances.filter((i) => i.status === 'RUNNING').length,
      icon: '✓',
      color: 'green',
    },
    {
      label: 'Instancias Suspendidas',
      value: instances.filter((i) => i.status === 'SUSPENDED').length,
      icon: '⏸',
      color: 'yellow',
    },
    {
      label: 'Plan Actual',
      value: 'Free',
      icon: '💳',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido a tu Dashboard
          </h1>
          <p className="text-gray-600">
            Aquí puedes gestionar tus instancias de base de datos
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-2 ${colorClasses[stat.color]}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Instances */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Instancias Recientes
            </h2>
            <Link to="/instances">
              <Button variant="secondary">Ver Todas</Button>
            </Link>
          </div>

          {loading ? (
            <Card>Cargando instancias...</Card>
          ) : instances.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  Aún no tienes instancias creadas
                </p>
                <Link to="/instances">
                  <Button variant="primary">Crear Primera Instancia</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {instances.slice(0, 5).map((instance) => (
                <Card key={instance.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {instance.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {instance.engine} - {instance.status}
                      </p>
                    </div>
                    <Link to="/instances">
                      <Button size="sm" variant="secondary">
                        Detalles
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/instances">
              <Button variant="primary" size="lg" className="w-full">
                Crear Instancia
              </Button>
            </Link>
            <Link to="/plans">
              <Button variant="secondary" size="lg" className="w-full">
                Actualizar Plan
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="secondary" size="lg" className="w-full">
                Mi Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
