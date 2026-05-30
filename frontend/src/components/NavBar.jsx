import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-50 border-b border-gray-100"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-2xl font-bold text-primary-600">
            <Link to="/">SwasthAI Guardian</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition">Home</Link>
            
            {user && (
              <>
                <Link to="/assistant" className="text-gray-600 hover:text-primary-600 font-medium transition">Sakhi AI</Link>
                <Link to="/emergency" className="text-gray-600 hover:text-red-600 font-medium transition">Emergency</Link>
              </>
            )}

            {user?.role === 'asha' && (
              <Link to="/asha" className="text-gray-600 hover:text-primary-600 font-medium transition">ASHA Portal</Link>
            )}

            {user?.role === 'ngo' && (
              <Link to="/ngo" className="text-gray-600 hover:text-primary-600 font-medium transition">NGO Dashboard</Link>
            )}

            {(user?.role === 'admin' || user?.role === 'district_admin') && (
              <Link to="/analytics" className="text-gray-600 hover:text-primary-600 font-medium transition">Command Center</Link>
            )}

            <Link to="/showcase" className="text-gray-600 hover:text-primary-600 font-medium transition">Showcase</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <UserIcon className="w-4 h-4 mr-1" /> {user.name || user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 font-semibold hover:text-primary-600 transition">Log in</Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-primary-700 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
