import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Activity, Phone, User, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'villager',
    villageId: 'Palghar-1'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const regRes = await register({ 
      ...formData, 
      username: formData.phone // Use phone as username for simplicity in rural context
    });
    
    if (regRes.success) {
      // Auto login after register
      const loginRes = await login({ identifier: formData.phone, password: formData.password, role: formData.role });
      if (loginRes.success) {
        navigate(formData.role === 'asha' ? '/asha' : '/assistant');
      } else {
        navigate('/login');
      }
    } else {
      setError(regRes.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-8 text-center text-white">
          <UserPlus className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-2">Join SwasthAI</h2>
          <p className="text-blue-100">Create your health account today</p>
        </div>
        <form onSubmit={handleRegister} className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-6 text-center">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50" placeholder="e.g. Ramesh" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center"><Phone className="w-3 h-3 mr-1"/> Phone</label>
              <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50" placeholder="Mobile Number" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50" placeholder="Create a secure password" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50">
                <option value="villager">Villager</option>
                <option value="asha">ASHA Worker</option>
                <option value="ngo">NGO Officer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Village ID</label>
              <input required type="text" name="villageId" value={formData.villageId} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50" placeholder="e.g. V-101" />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition flex justify-center items-center">
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
