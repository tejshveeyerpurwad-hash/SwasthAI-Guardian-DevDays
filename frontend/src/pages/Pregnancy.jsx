import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Activity, User, Calendar, Thermometer, Droplets, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function Pregnancy() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    trimester: '1',
    dueDate: '',
    systolic_bp: '120',
    diastolic_bp: '80',
    bs: '5.0',
    body_temp: '98',
    heart_rate: '75'
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: formData.name,
        age: Number(formData.age),
        trimester: Number(formData.trimester),
        dueDate: formData.dueDate,
        vitals: {
          systolic_bp: Number(formData.systolic_bp),
          diastolic_bp: Number(formData.diastolic_bp),
          bs: Number(formData.bs),
          body_temp: Number(formData.body_temp),
          heart_rate: Number(formData.heart_rate)
        }
      };

      let responseRisk = '';

      if (token) {
        // Real API Call if authenticated
        const res = await axios.post('/api/ngo/maternal', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        responseRisk = res.data.riskLevel;
      } else {
        // Realistic Mock if not authenticated (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simple logic for mock risk
        if (payload.vitals.systolic_bp > 140 || payload.vitals.diastolic_bp > 90) {
          responseRisk = 'High Risk';
        } else if (payload.vitals.systolic_bp > 130 || payload.vitals.bs > 7.0 || payload.age > 35) {
          responseRisk = 'Mid Risk';
        } else {
          responseRisk = 'Low Risk';
        }
      }

      setResult({ riskLevel: responseRisk });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze risk. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-2xl mb-4">
          <HeartPulse className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pregnancy Risk Predictor</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter maternal patient details and vitals below. Our AI engine will analyze the data to predict potential complications like pre-eclampsia or gestational diabetes.
        </p>
      </motion.div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* Patient Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-500" /> Patient Demographics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-gray-50 focus:bg-white" placeholder="e.g. Meena Devi" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input required type="number" name="age" min="10" max="60" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-gray-50 focus:bg-white" placeholder="e.g. 26" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trimester</label>
                <select required name="trimester" value={formData.trimester} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-gray-50 focus:bg-white">
                  <option value="1">1st Trimester (Week 1-12)</option>
                  <option value="2">2nd Trimester (Week 13-26)</option>
                  <option value="3">3rd Trimester (Week 27-40)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Due Date</label>
                <div className="relative">
                  <input required type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Vitals Section */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" /> Current Vitals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* BP */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <label className="block text-sm font-bold text-blue-800 mb-3 flex items-center"><Activity className="w-4 h-4 mr-1" /> Blood Pressure</label>
                <div className="flex items-center space-x-2">
                  <input required type="number" name="systolic_bp" value={formData.systolic_bp} onChange={handleChange} className="w-1/2 px-3 py-2 rounded-lg border border-blue-200 text-center font-bold" placeholder="Sys" />
                  <span className="text-blue-400 font-bold">/</span>
                  <input required type="number" name="diastolic_bp" value={formData.diastolic_bp} onChange={handleChange} className="w-1/2 px-3 py-2 rounded-lg border border-blue-200 text-center font-bold" placeholder="Dia" />
                </div>
                <p className="text-xs text-blue-600 mt-2 text-center">mmHg</p>
              </div>

              {/* Blood Sugar */}
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <label className="block text-sm font-bold text-indigo-800 mb-3 flex items-center"><Droplets className="w-4 h-4 mr-1" /> Blood Sugar</label>
                <input required type="number" step="0.1" name="bs" value={formData.bs} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-indigo-200 text-center font-bold" />
                <p className="text-xs text-indigo-600 mt-2 text-center">mmol/L</p>
              </div>

              {/* Heart Rate */}
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <label className="block text-sm font-bold text-rose-800 mb-3 flex items-center"><HeartPulse className="w-4 h-4 mr-1" /> Heart Rate</label>
                <input required type="number" name="heart_rate" value={formData.heart_rate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-rose-200 text-center font-bold" />
                <p className="text-xs text-rose-600 mt-2 text-center">bpm</p>
              </div>

              {/* Body Temp */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <label className="block text-sm font-bold text-orange-800 mb-3 flex items-center"><Thermometer className="w-4 h-4 mr-1" /> Body Temp</label>
                <input required type="number" step="0.1" name="body_temp" value={formData.body_temp} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-orange-200 text-center font-bold" />
                <p className="text-xs text-orange-600 mt-2 text-center">°F</p>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl text-lg font-bold text-white shadow-xl transition-all flex items-center justify-center ${loading ? 'bg-primary-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-[1.01] hover:shadow-2xl'}`}
          >
            {loading ? <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Analyzing Risk Profile...</> : 'Analyze Maternal Risk'}
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4 text-center font-semibold">{error}</p>}
        </form>

        {/* Results Area */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t border-gray-100 p-8 ${result.riskLevel === 'High Risk' ? 'bg-red-50' : result.riskLevel === 'Mid Risk' ? 'bg-orange-50' : 'bg-emerald-50'}`}
            >
              <div className="flex flex-col items-center text-center">
                {result.riskLevel === 'High Risk' ? (
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                ) : result.riskLevel === 'Mid Risk' ? (
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                )}
                
                <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">AI Assessment Result</h2>
                <h3 className={`text-5xl font-black mb-4 ${result.riskLevel === 'High Risk' ? 'text-red-600' : result.riskLevel === 'Mid Risk' ? 'text-orange-600' : 'text-emerald-600'}`}>
                  {result.riskLevel}
                </h3>
                
                <div className="max-w-xl text-gray-700 bg-white/60 p-6 rounded-2xl shadow-sm border border-black/5">
                  {result.riskLevel === 'High Risk' ? (
                    <p><strong>Warning:</strong> The vitals indicate a high risk of pre-eclampsia or other maternal complications. Immediate consultation with an obstetrician at the nearest district hospital is strongly recommended.</p>
                  ) : result.riskLevel === 'Mid Risk' ? (
                    <p><strong>Caution:</strong> The vitals show slightly elevated parameters. Close monitoring by an ASHA worker is required. Schedule a follow-up check within 48 hours.</p>
                  ) : (
                    <p><strong>Normal:</strong> All vitals are within the healthy range for a {formData.trimester === '1' ? '1st' : formData.trimester === '2' ? '2nd' : '3rd'} trimester pregnancy. Continue with regular prenatal vitamins and scheduled checkups.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
