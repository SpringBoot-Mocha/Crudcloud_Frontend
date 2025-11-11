import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">CrudCloud</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Inicio
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Precios
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sobre Nosotros
              </Link>
              <div className="border-l pl-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium mr-3">
                      Inicia Sesión
                    </Link>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Regístrate
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">CrudCloud</h3>
              <p className="text-gray-400">
                Plataforma para crear y gestionar bases de datos en la nube.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Inicio</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Precios</Link></li>
                <li><Link to="/about" className="hover:text-white">Sobre Nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              © 2024 CrudCloud. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
