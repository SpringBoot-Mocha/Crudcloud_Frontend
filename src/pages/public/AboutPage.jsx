import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { Card } from '../../components/ui';

const AboutPage = () => {
  const team = [
    { name: 'Juan Carlos', role: 'CEO & Fundador', icon: '👨‍💼' },
    { name: 'María López', role: 'CTO', icon: '👩‍💻' },
    { name: 'Pedro González', role: 'DevOps Lead', icon: '👨‍🔧' },
    { name: 'Laura Martínez', role: 'Product Manager', icon: '👩‍📊' },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sobre CrudCloud
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Simplificando la gestión de bases de datos en la nube para empresas de todos los tamaños.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestra Misión
          </h2>
          <p className="text-gray-600 mb-4">
            En CrudCloud, creemos que la tecnología de bases de datos debe ser accesible para todos.
            Nuestro objetivo es eliminar las barreras de entrada para que cualquier persona o empresa
            pueda desplegar y gestionar bases de datos profesionales en cuestión de segundos.
          </p>
          <p className="text-gray-600">
            Nos apasiona la innovación y la excelencia en servicio. Cada día trabajamos para mejorar
            nuestra plataforma y proporcionar el mejor soporte posible a nuestros usuarios.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-bold text-gray-900">Simplicidad</p>
                <p className="text-sm text-gray-600">Tecnología compleja hecha simple</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold text-gray-900">Seguridad</p>
                <p className="text-sm text-gray-600">Tu data es nuestra prioridad</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-bold text-gray-900">Velocidad</p>
                <p className="text-sm text-gray-600">Performance sin compromises</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-bold text-gray-900">Comunidad</p>
                <p className="text-sm text-gray-600">Juntos somos más fuertes</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <h3 className="text-4xl font-bold text-blue-600 mb-2">Desde 2024</h3>
          <p className="text-gray-600">Nacida con la misión de simplificar</p>
        </Card>
        <Card>
          <h3 className="text-4xl font-bold text-blue-600 mb-2">100+</h3>
          <p className="text-gray-600">Usuarios en la comunidad beta</p>
        </Card>
        <Card>
          <h3 className="text-4xl font-bold text-blue-600 mb-2">6</h3>
          <p className="text-gray-600">Motores de base de datos soportados</p>
        </Card>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <div className="text-5xl mb-4 text-center">{member.icon}</div>
              <h3 className="text-lg font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¿Preguntas o Sugerencias?
        </h2>
        <p className="text-gray-600 mb-8">
          Nos encantaría escucharte. Contáctanos en cualquier momento.
        </p>
        <a href="mailto:hola@crudcloud.com" className="text-blue-600 hover:text-blue-700 font-bold">
          hola@crudcloud.com
        </a>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
