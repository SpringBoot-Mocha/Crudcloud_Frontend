import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard">
            <span className="brand-icon">☁️</span>
            <span className="brand-name">CrudCloud</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            🏠 Dashboard
          </Link>
          <Link to="/catalog" className={`nav-link ${isActive('/catalog')}`}>
            🗄️ Catálogo
          </Link>
          <Link to="/instances" className={`nav-link ${isActive('/instances')}`}>
            📋 Instancias
          </Link>
          <Link to="/plan" className={`nav-link ${isActive('/plan')}`}>
            📊 Plan
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-name">{user?.name}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Salir
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
