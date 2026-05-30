import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Navigation, AlertOctagon, Activity, MapPin, Truck, Clock, ShieldAlert } from 'lucide-react';

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <AlertOctagon className="w-8 h-8 text-red-600 mr-3" /> Emergency Intelligence
        </h1>
        <p className="text-gray-600 text-lg mt-2">Real-time SOS Dispatch & Ambulance Tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: SOS & Status */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Big SOS Button */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSosActive(!sosActive)}
              className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-black text-3xl shadow-2xl transition-colors ${sosActive ? 'bg-red-700 animate-pulse' : 'bg-red-600'}`}
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
              <Phone className="w-12 h-12 mb-2 opacity-80" />
              {sosActive ? 'DISPATCHED' : 'SOS'}
            </motion.button>
            <p className="text-gray-500 text-sm mt-6 font-medium">Hold for 3 seconds to dispatch immediate medical assistance.</p>
          </div>

          {/* Emergency Risk Engine */}
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold flex items-center mb-4"><ShieldAlert className="w-5 h-5 mr-2 text-yellow-400" /> Auto-Triage Engine</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm">Predicted Condition</span>
                <span className="font-bold text-red-400">Cardiac Arrest</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm">Patient Vitals</span>
                <span className="font-bold">Heart Rate: 120bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Recommended Action</span>
                <span className="font-bold text-yellow-400">Defibrillator Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Map & Tracking */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Map Placeholder (Glassmorphism Map UI) */}
          <div className="bg-gray-100 h-96 rounded-3xl relative overflow-hidden shadow-inner border border-gray-200">
            {/* Fake Map Grid */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
            
            {/* Live Routing Line */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100 300 Q 200 150 400 100 T 700 200" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray="10, 10" className="animate-[dash_1s_linear_infinite]" />
            </svg>

            {/* Hospital Marker */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[80px] right-[100px] flex flex-col items-center">
              <div className="bg-white text-red-600 p-2 rounded-full shadow-lg border border-red-100 z-10"><Activity className="w-6 h-6" /></div>
              <div className="bg-white/90 backdrop-blur px-3 py-1 rounded shadow text-xs font-bold mt-2">District Hospital (2.4 km)</div>
            </motion.div>

            {/* Ambulance Marker */}
            {sosActive && (
              <motion.div initial={{ left: '100px', top: '280px' }} animate={{ left: '400px', top: '100px' }} transition={{ duration: 10, ease: "linear" }} className="absolute flex flex-col items-center">
                <div className="bg-red-600 text-white p-2 rounded-full shadow-lg z-10 animate-pulse"><Truck className="w-6 h-6" /></div>
                <div className="bg-gray-900/90 text-white px-3 py-1 rounded shadow text-xs font-bold mt-2">Ambulance MH-12-34 (ETA: 4 mins)</div>
              </motion.div>
            )}

            {/* Patient Marker */}
            <div className="absolute left-[100px] top-[300px] flex flex-col items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg border-4 border-blue-200 z-10"><MapPin className="w-5 h-5" /></div>
              <div className="bg-white/90 backdrop-blur px-3 py-1 rounded shadow text-xs font-bold mt-2">Your Location</div>
            </div>
          </div>

          {/* Active Incidents Feed */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center"><Navigation className="w-5 h-5 mr-2 text-blue-600" /> Active Dispatches in Region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-100 p-4 rounded-xl flex items-start space-x-4 bg-red-50">
                <div className="bg-red-100 p-2 rounded-lg text-red-600"><Truck className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Maternal Emergency</h4>
                  <p className="text-sm text-gray-600">Village Palghar • ETA: 12 mins</p>
                </div>
              </div>
              <div className="border border-gray-100 p-4 rounded-xl flex items-start space-x-4 bg-orange-50">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><AlertOctagon className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Snake Bite</h4>
                  <p className="text-sm text-gray-600">Sector 4 • ETA: 5 mins</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}} />
    </div>
  );
}
