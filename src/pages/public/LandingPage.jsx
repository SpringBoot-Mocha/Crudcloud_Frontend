import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import { Card, Button } from '../../components/ui';

const LandingPage = () => {
  const features = [
    {
      title: 'Múltiples Bases de Datos',
      description: 'Soporta MySQL, PostgreSQL, MongoDB, Redis, SQL Server y Cassandra',
      icon: '💾',
    },
    {
      title: 'Fácil de Usar',
      description: 'Crea instancias en segundos sin configuración compleja',
      icon: '⚡',
    },
    {
      title: 'Escalable',
      description: 'Planes flexibles que crecen con tu negocio',
      icon: '📈',
    },
    {
      title: 'Seguro',
      description: 'Credenciales cifradas y acceso controlado',
      icon: '🔒',
    },
    {
      title: 'Soporte Integrado',
      description: 'Documentación completa y equipo de soporte',
      icon: '🤝',
    },
    {
      title: 'Asequible',
      description: 'Planes económicos con opciones para todos',
      icon: '💰',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bases de Datos en la Nube, Hecho Simple
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Crea y gestiona instancias de bases de datos en segundos. Sin configuración compleja.
          Sin problemas de infraestructura.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Comienza Gratis
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              Ver Planes
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué CrudCloud?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50 rounded-xl">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">1000+</h3>
            <p className="text-gray-600">Usuarios activos</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">50K+</h3>
            <p className="text-gray-600">Instancias creadas</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">99.9%</h3>
            <p className="text-gray-600">Uptime SLA</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          ¿Listo para comenzar?
        </h2>
        <p className="text-gray-600 mb-8">
          Obtén tu primer plan gratis. Sin tarjeta de crédito requerida.
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">
            Crear Cuenta Ahora
          </Button>
        </Link>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
