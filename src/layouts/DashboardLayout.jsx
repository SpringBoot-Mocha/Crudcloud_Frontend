import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, LogOut, Settings, LayoutDashboard, Database, CreditCard, User, ChevronDown } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const userMenuRef = React.useRef(null);

  // Cerrar menú al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/instances', label: 'Instancias', icon: Database },
    { path: '/plans', label: 'Planes', icon: CreditCard },
    { path: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-50 transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-slate-200/50 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-slate-100/50 flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-3 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100 w-full' : 'opacity-0 w-0 overflow-hidden'
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">CrudCloud</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200"
            title={isSidebarOpen ? 'Contraer' : 'Expandir'}
          >
            {isSidebarOpen ? (
              <ChevronDown size={18} className="rotate-90" />
            ) : (
              <ChevronDown size={18} className="-rotate-90" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-teal-50 text-teal-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-6 border-t border-slate-100/50">
          <div
            className={`text-center text-xs text-slate-500 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 text-[10px]'
            }`}
          >
            <p>Plan Free</p>
            <p className="mt-1 text-slate-400">3 de 10 instancias</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-visible">
        {/* Header - Premium Minimal */}
        <header className="bg-white border-b border-slate-200/50 backdrop-blur-sm relative z-50">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
                title={isMobileSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Page Title */}
              <div className="hidden md:block">
                <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
                <p className="text-xs text-slate-500 mt-0.5">Gestiona tus recursos</p>
              </div>
            </div>

            {/* Right Side - User Menu */}
            <div className="flex items-center gap-4">
              {/* User Info & Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200 group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.name || user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-slate-200/50 shadow-lg z-[9999] overflow-hidden animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-slate-100/50 bg-slate-50/50">
                      <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                      <p className="text-xs text-slate-500 mt-1">Cuenta activa</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors duration-150"
                      >
                        <User size={16} />
                        <span className="text-sm font-medium">Mi Perfil</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors duration-150"
                      >
                        <Settings size={16} />
                        <span className="text-sm font-medium">Configuración</span>
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="px-4 py-2 border-t border-slate-100/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isMobileSidebarOpen && (
            <div className="md:hidden border-t border-slate-100/50 bg-slate-50/50 animate-slide-up">
              <nav className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        active
                          ? 'bg-teal-50 text-teal-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 transition-colors duration-300">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* El cierre al hacer click afuera se maneja con useEffect + ref */}
    </div>
  );
};

export default DashboardLayout;
