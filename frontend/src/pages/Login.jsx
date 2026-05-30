import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Phone, User, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('villager');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login({ identifier, password, role });
    setLoading(false);
    
    if (res.success) {
      if (res.role === 'admin' || res.role === 'district_admin') navigate('/analytics');
      else if (res.role === 'asha') navigate('/asha');
      else if (res.role === 'ngo') navigate('/ngo');
      else navigate('/assistant');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary-600 to-emerald-500 p-8 text-center text-white">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-2">Welcome Back</h2>
          <p className="text-primary-100">Secure access to SwasthAI Guardian</p>
        </div>
        <form onSubmit={handleLogin} className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-6 text-center">{error}</div>}
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role Select</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none bg-gray-50">
              <option value="villager">Villager (Citizen)</option>
              <option value="asha">ASHA Worker</option>
              <option value="ngo">NGO Officer</option>
              <option value="admin">District Admin</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><User className="w-4 h-4 mr-1"/> Phone or Email</label>
            <input required type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none bg-gray-50" placeholder="Enter phone or email" />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><Lock className="w-4 h-4 mr-1"/> Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none bg-gray-50" placeholder="••••••••" />
          </div>

          <button disabled={loading} type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition flex justify-center items-center">
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : 'Secure Login'}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Register here</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
