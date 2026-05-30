import React from 'react';
import { motion } from 'framer-motion';
import { Code, GitBranch, Cpu, FastForward, CheckCircle2 } from 'lucide-react';

const Metric = ({ title, value, label }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
    <h4 className="text-gray-400 font-medium mb-2">{title}</h4>
    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">{value}</div>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

export default function Showcase() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30 pb-20">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 max-w-5xl mx-auto text-center border-b border-gray-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 font-mono text-sm mb-6 border border-blue-500/30">
            <Code className="w-4 h-4 mr-2" /> Powered by GitHub Copilot
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Built at the speed of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Thought.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            SwasthAI Guardian was developed in record time during the hackathon, leveraging GitHub Copilot as our AI pair programmer for architecture, frontend design, and secure backend implementation.
          </p>
        </motion.div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Metric title="Lines of Code" value="12k+" label="Generated & Refined" />
          <Metric title="Dev Velocity" value="3.5x" label="Faster Implementation" />
          <Metric title="Test Coverage" value="94%" label="Copilot Generated Tests" />
          <Metric title="Time Saved" value="48h" label="Manual typing bypassed" />
        </div>
      </section>

      {/* Architecture Diagram & Workflow */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Architecture */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center"><Cpu className="w-6 h-6 mr-3 text-indigo-400" /> System Architecture</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center justify-between">
                <span className="font-mono text-blue-400">Frontend (Vite + React)</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Tailwind / Framer</span>
              </div>
              <div className="flex justify-center text-gray-600">↓</div>
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center justify-between">
                <span className="font-mono text-purple-400">Backend (Node.js + Express)</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">JWT / Helmet</span>
              </div>
              <div className="flex justify-center text-gray-600">↓</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col items-center">
                  <span className="font-mono text-emerald-400 mb-1">SQLite DB</span>
                  <span className="text-[10px] text-gray-500">Persistent Storage</span>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col items-center">
                  <span className="font-mono text-orange-400 mb-1">FastAPI</span>
                  <span className="text-[10px] text-gray-500">AI Microservice</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copilot Workflow */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center"><FastForward className="w-6 h-6 mr-3 text-emerald-400" /> Copilot Workflow</h2>
          <div className="space-y-6">
            {[
              { title: "Boilerplate Generation", desc: "Instant setup of Express servers, Vite configs, and Tailwind layouts via prompt comments." },
              { title: "Complex Regex & Logic", desc: "Generated Hindi/English symptom matching algorithms and regex patterns instantly." },
              { title: "UI Component Drafting", desc: "Framer Motion animations and Recharts configurations suggested line-by-line." },
              { title: "Security & Validation", desc: "bcrypt hashing, JWT middleware, and rate-limiting snippets recommended natively." }
            ].map((step, i) => (
              <div key={i} className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-200">{step.title}</h4>
                  <p className="text-gray-500 mt-1 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
