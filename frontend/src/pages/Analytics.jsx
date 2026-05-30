import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, ShieldAlert, Users, HeartPulse, Stethoscope, AlertTriangle } from 'lucide-react';

const diseaseData = [
  { month: 'Jan', dengue: 400, malaria: 240, typhoid: 240 },
  { month: 'Feb', dengue: 300, malaria: 139, typhoid: 221 },
  { month: 'Mar', dengue: 200, malaria: 980, typhoid: 229 },
  { month: 'Apr', dengue: 278, malaria: 390, typhoid: 200 },
  { month: 'May', dengue: 189, malaria: 480, typhoid: 218 },
  { month: 'Jun', dengue: 239, malaria: 380, typhoid: 250 },
  { month: 'Jul', dengue: 349, malaria: 430, typhoid: 210 },
];

const malnutritionData = [
  { block: 'Block A', SAM: 45, MAM: 120 },
  { block: 'Block B', SAM: 30, MAM: 95 },
  { block: 'Block C', SAM: 65, MAM: 210 },
  { block: 'Block D', SAM: 20, MAM: 70 },
  { block: 'Block E', SAM: 55, MAM: 160 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h4 className="text-3xl font-extrabold text-gray-900">{value}</h4>
      <div className={`mt-2 flex items-center text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↓' : '↑'} {change} from last month
      </div>
    </div>
    <div className={`p-4 rounded-xl ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
      <Icon className="w-8 h-8" />
    </div>
  </div>
);

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-3" /> District Health Command Center
          </h1>
          <p className="text-gray-600">Palghar District Executive Dashboard</p>
        </div>
        <div className="flex space-x-3">
           <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Export Report</button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Refresh Data</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Outbreak Alerts" value="3" change="12%" isPositive={false} icon={AlertTriangle} />
        <StatCard title="High Risk Pregnancies" value="124" change="5%" isPositive={true} icon={HeartPulse} />
        <StatCard title="Severe Malnutrition (SAM)" value="215" change="8%" isPositive={false} icon={Users} />
        <StatCard title="ASHA Worker Coverage" value="94%" change="2%" isPositive={true} icon={Stethoscope} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Outbreak Forecasting Area Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2 text-red-500" /> Vector-Borne Disease Outbreak Forecast
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={diseaseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDengue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMalaria" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="dengue" stroke="#ef4444" fillOpacity={1} fill="url(#colorDengue)" strokeWidth={3} />
                <Area type="monotone" dataKey="malaria" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMalaria)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Malnutrition Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Child Malnutrition by Block (SAM/MAM)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={malnutritionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="block" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Bar dataKey="SAM" name="Severe Acute (SAM)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="MAM" name="Moderate Acute (MAM)" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
