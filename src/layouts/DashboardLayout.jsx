import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold">CrudCloud</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? '📊 Dashboard' : '📊'}
          </Link>
          <Link
            to="/instances"
            className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? '💾 Instancias' : '💾'}
          </Link>
          <Link
            to="/plans"
            className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? '💳 Planes' : '💳'}
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? '👤 Perfil' : '👤'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
