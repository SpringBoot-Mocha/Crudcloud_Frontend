import React, { useState } from 'react';
import {
  Home,
  Database,
  Settings,
  Bell,
  Menu,
  X,
  Cloud,
  ChevronDown
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import DatabaseCatalog from './components/DatabaseCatalog';
import InstanceDetail from './components/InstanceDetail';
import PlanManagement from './components/PlanManagement';
import './styles/global.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'instances', label: 'Instancias', icon: Database },
    { id: 'engines', label: 'Motores', icon: Cloud },
    { id: 'plan', label: 'Plan', icon: ChevronDown },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'instances':
        return <InstanceDetail />;
      case 'engines':
        return <DatabaseCatalog />;
      case 'plan':
        return <PlanManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-screen z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Cloud size={24} />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">CrudCloud</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            {navItems.find(item => item.id === activeTab)?.label}
          </h1>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full"></div>
                <span className="text-sm font-medium text-slate-900">Juan Dev</span>
                <ChevronDown size={16} className="text-slate-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-slate-900">juan@example.com</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 rounded">
                      Perfil
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 rounded">
                      Configuración
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
