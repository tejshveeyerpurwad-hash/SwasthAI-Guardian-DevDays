import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, PieChart, TrendingUp, Users, Download, Activity, HeartPulse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const fundingData = [
  { month: 'Jan', allocated: 4000, utilized: 2400 },
  { month: 'Feb', allocated: 3000, utilized: 1398 },
  { month: 'Mar', allocated: 2000, utilized: 9800 },
  { month: 'Apr', allocated: 2780, utilized: 3908 },
  { month: 'May', allocated: 1890, utilized: 4800 },
  { month: 'Jun', allocated: 2390, utilized: 3800 }
];

export default function Ngo() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center mb-2">
            <Building2 className="w-8 h-8 mr-3 text-indigo-600" /> NGO Impact Dashboard
          </h1>
          <p className="text-gray-500">Resource Allocation & Village Health Reporting</p>
        </motion.div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition">
          <Download className="w-4 h-4 mr-2" /> Export PDF Report
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Villages Adopted", value: "24", icon: Users, color: "indigo" },
          { title: "Active ASHA Workers", value: "112", icon: Activity, color: "emerald" },
          { title: "Sanitary Pads Dist.", value: "45.2K", icon: HeartPulse, color: "pink" },
          { title: "Funds Utilized", value: "₹12.4M", icon: TrendingUp, color: "blue" }
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 border-${stat.color}-500 border-y border-r border-gray-100`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 bg-${stat.color}-50 rounded-lg text-${stat.color}-600`}><stat.icon className="w-6 h-6" /></div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Resource Analytics */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center text-gray-900"><PieChart className="w-5 h-5 mr-2 text-indigo-500" /> Funding vs Utilization (YTD)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="allocated" name="Allocated (₹)" fill="#e0e7ff" radius={[4,4,0,0]} />
                  <Bar dataKey="utilized" name="Utilized (₹)" fill="#4f46e5" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Village Reports Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Village Health Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <th className="p-4 font-semibold">Village Name</th>
                    <th className="p-4 font-semibold">Health Score</th>
                    <th className="p-4 font-semibold">Critical Issues</th>
                    <th className="p-4 font-semibold">ASHA Worker</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Palghar-1', score: 85, issues: 'Anemia Spike', asha: 'Sunita Devi', status: 'Attention' },
                    { name: 'Wada-North', score: 92, issues: 'None', asha: 'Kamala Rao', status: 'Stable' },
                    { name: 'Dahanu-East', score: 64, issues: 'Malnutrition (SAM)', asha: 'Priya M.', status: 'Critical' },
                    { name: 'Jawhar-Central', score: 78, issues: 'Dengue Cluster', asha: 'Meena K.', status: 'Attention' }
                  ].map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-bold text-gray-900">{v.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${v.score >= 90 ? 'bg-green-100 text-green-700' : v.score >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {v.score}/100
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{v.issues}</td>
                      <td className="p-4 text-sm text-gray-600">{v.asha}</td>
                      <td className="p-4">
                        <button className="text-indigo-600 font-semibold text-sm hover:underline">View Report</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Col: Resource Allocation */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
             <h3 className="text-lg font-bold mb-4 relative z-10">Resource Requests</h3>
             <div className="space-y-4 relative z-10">
               <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                 <div className="flex justify-between items-center mb-2">
                   <h4 className="font-bold text-indigo-100">Sanitary Pads Delivery</h4>
                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">Urgent</span>
                 </div>
                 <p className="text-sm text-indigo-200">Village: Dahanu-East (Req by Priya M.)</p>
                 <button className="mt-3 w-full bg-white text-indigo-900 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50 transition">Approve & Dispatch</button>
               </div>
               <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                 <div className="flex justify-between items-center mb-2">
                   <h4 className="font-bold text-indigo-100">Iron Supplements</h4>
                   <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">Routine</span>
                 </div>
                 <p className="text-sm text-indigo-200">Village: Palghar-1 (Req by Sunita D.)</p>
                 <button className="mt-3 w-full bg-white text-indigo-900 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50 transition">Approve & Dispatch</button>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
