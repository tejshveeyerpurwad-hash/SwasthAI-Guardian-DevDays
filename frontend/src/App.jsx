import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Assistant from './pages/Assistant';
import Women from './pages/Women';
import Pregnancy from './pages/Pregnancy';
import Emergency from './pages/Emergency';
import Asha from './pages/Asha';
import Ngo from './pages/Ngo';
import Analytics from './pages/Analytics';
import Showcase from './pages/Showcase';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="pt-20 max-w-7xl mx-auto px-4 pb-12">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/showcase" element={<Showcase />} />

            {/* Protected Routes - Villager & General Users */}
            <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
            <Route path="/women" element={<ProtectedRoute><Women /></ProtectedRoute>} />
            <Route path="/pregnancy" element={<ProtectedRoute><Pregnancy /></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />

            {/* Role-Specific Protected Routes */}
            <Route path="/asha" element={<ProtectedRoute allowedRoles={['asha', 'admin']}><Asha /></ProtectedRoute>} />
            <Route path="/ngo" element={<ProtectedRoute allowedRoles={['ngo', 'admin']}><Ngo /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute allowedRoles={['admin', 'district_admin']}><Analytics /></ProtectedRoute>} />
            
            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
