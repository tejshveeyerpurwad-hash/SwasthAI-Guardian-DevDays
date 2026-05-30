import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Baby, AlertTriangle, Utensils, Activity, ArrowRight, Heart, FileText, CheckCircle } from 'lucide-react';

const MetricCard = ({ title, value, status, icon: Icon, colorClass }) => (
  <div className={`p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all ${colorClass}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass.replace('border-', 'bg-').replace('200', '100')} text-${colorClass.split('-')[1]}-600`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {status}
      </span>
    </div>
    <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
    <div className="text-3xl font-extrabold text-gray-900">{value}</div>
  </div>
);

export default function Women() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
            <Heart className="w-8 h-8 text-pink-500 mr-3" /> Women Health Intelligence
          </h1>
          <p className="text-gray-600 text-lg">Sakhi Maternal Dashboard & Period Tracker</p>
        </div>
        <button className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-lg flex items-center transition-colors">
          <Baby className="w-5 h-5 mr-2" /> Log Pregnancy Update
        </button>
      </motion.div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <MetricCard title="Pregnancy Week" value="Week 24" status="On Track" icon={Baby} colorClass="border-purple-200" />
        <MetricCard title="Maternal Risk Score" value="Low" status="Safe" icon={Activity} colorClass="border-green-200" />
        <MetricCard title="Next Period In" value="14 Days" status="Normal" icon={Calendar} colorClass="border-pink-200" />
        <MetricCard title="Hemoglobin (Hb)" value="10.5 g/dL" status="Monitor" icon={AlertTriangle} colorClass="border-orange-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Trackers */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pregnancy Timeline */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center"><Activity className="w-6 h-6 mr-2 text-purple-600" /> Pregnancy Journey Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6 relative">
                {[
                  { title: "First Trimester Scan", date: "Oct 12, 2023", completed: true },
                  { title: "Tetanus Toxoid (TT-1) Injection", date: "Nov 05, 2023", completed: true },
                  { title: "Anomaly Scan (TIFFA)", date: "Dec 20, 2023", completed: true },
                  { title: "Glucose Tolerance Test", date: "Feb 15, 2024", completed: false, active: true },
                  { title: "Expected Delivery Date", date: "May 10, 2024", completed: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-start pl-10 relative">
                    <div className={`absolute left-2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white ${item.completed ? 'bg-green-500' : (item.active ? 'bg-purple-500 animate-pulse' : 'bg-gray-300')}`}></div>
                    <div className={`bg-gray-50 p-4 rounded-xl flex-1 border ${item.active ? 'border-purple-200 shadow-sm' : 'border-transparent'}`}>
                      <h4 className={`font-bold ${item.completed ? 'text-gray-700' : 'text-gray-900'}`}>{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Insights & Nutrition */}
        <div className="space-y-8">
          
          {/* High Risk Engine */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> High Risk Detection Engine</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl flex items-start justify-between shadow-sm">
                <div>
                  <h4 className="font-semibold text-gray-800">Pre-eclampsia Risk</h4>
                  <p className="text-xs text-gray-500 mt-1">Based on recent BP reading (135/85)</p>
                </div>
                <span className="text-orange-600 font-bold bg-orange-100 px-2 py-1 rounded text-xs">Elevated</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-start justify-between shadow-sm">
                <div>
                  <h4 className="font-semibold text-gray-800">Anemia Risk</h4>
                  <p className="text-xs text-gray-500 mt-1">Hb 10.5 g/dL (Slightly low)</p>
                </div>
                <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs">High Alert</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg transition text-sm">Consult ASHA Worker Now</button>
          </div>

          {/* Nutrition Intelligence */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center"><Utensils className="w-5 h-5 mr-2 text-green-600" /> Nutrition Plan (Week 24)</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Take Iron & Folic Acid tablet daily after lunch.
              </li>
              <li className="flex items-center text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Include Spinach (Palak) or Jaggery for iron.
              </li>
              <li className="flex items-center text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Consume Calcium (Milk, Paneer) in the morning.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
