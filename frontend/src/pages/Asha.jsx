import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, TrendingUp, Bell, CheckCircle2, AlertCircle, ChevronRight, UserPlus, MapPin } from 'lucide-react';

export default function Asha() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/150?img=47" alt="ASHA Worker" className="w-16 h-16 rounded-full border-4 border-primary-100" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Namaste, Sunita Devi</h1>
            <p className="text-gray-500 text-sm flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary-500" /> Block 4, Ramgarh Village</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold text-gray-500">Village Health Score</div>
          <div className="text-3xl font-black text-emerald-600">84/100</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Daily Planner & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Smart Alerts */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl flex items-start shadow-sm">
            <Bell className="w-6 h-6 text-orange-600 mr-3 mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-orange-900">AI Priority Alert</h4>
              <p className="text-orange-800 text-sm mt-1">Meena Devi's expected delivery is in 3 days. Her recent BP was slightly high. Please prioritize a home visit today.</p>
            </div>
          </div>

          {/* Daily Visit Planner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center"><CalendarCheck className="w-5 h-5 mr-2 text-primary-600" /> Today's Intelligent Schedule</h2>
              <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-xs font-bold">4 Visits Pending</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {[
                { name: "Meena Devi", type: "Prenatal Check", time: "09:00 AM", status: "Urgent", risk: "High", completed: false },
                { name: "Rahul Kumar", type: "Vaccination (Polio)", time: "11:30 AM", status: "Routine", risk: "Low", completed: false },
                { name: "Sita Ram", type: "TB Follow-up", time: "02:00 PM", status: "Required", risk: "Medium", completed: false },
                { name: "Priya Sharma", type: "Postpartum Care", time: "04:30 PM", status: "Routine", risk: "Low", completed: false }
              ].map((visit, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <button className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-primary-500 transition">
                      <CheckCircle2 className="w-5 h-5 text-transparent group-hover:text-primary-500" />
                    </button>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{visit.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                        <span className="flex items-center"><CalendarCheck className="w-4 h-4 mr-1" /> {visit.time}</span>
                        <span className="flex items-center text-primary-600"><Users className="w-4 h-4 mr-1" /> {visit.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold mb-2 ${visit.risk === 'High' ? 'bg-red-100 text-red-700' : visit.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                      {visit.risk} Risk
                    </span>
                    <button className="text-gray-400 hover:text-primary-600"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Stats & Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition">
                <UserPlus className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold text-center">Register<br/>Patient</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition">
                <AlertCircle className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold text-center">Log<br/>Outbreak</span>
              </button>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Monthly Impact</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 font-medium">Immunizations Target</span>
                  <span className="font-bold text-gray-800">45/50</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 font-medium">ANC Visits Completed</span>
                  <span className="font-bold text-gray-800">18/20</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
