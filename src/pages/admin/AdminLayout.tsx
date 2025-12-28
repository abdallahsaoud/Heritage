import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f4f0]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-black text-white">
        <div className="p-6">
          <h1 className="text-2xl font-serif text-white">Heritage Admin</h1>
          <p className="text-sm text-gray-400 mt-1">{admin?.email}</p>
        </div>

        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="block px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            📊 Tableau de bord
          </Link>
          <Link
            to="/admin/robes"
            className="block px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            👗 Gestion des robes
          </Link>
          <Link
            to="/admin/rendez-vous"
            className="block px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            📅 Rendez-vous
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-6 py-3 hover:bg-gray-800 transition-colors mt-6"
          >
            🚪 Déconnexion
          </button>
        </nav>

        <div className="absolute bottom-6 left-6">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Voir le site
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

