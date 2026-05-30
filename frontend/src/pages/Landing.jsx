import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Shield, Users, HeartPulse, Stethoscope, AlertTriangle, ArrowRight, CheckCircle2, TrendingUp, Smartphone } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, link }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-primary-600" />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <Link to={link} className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-800">
      Explore Module <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const ImpactMetric = ({ number, label }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="text-center p-6"
  >
    <h4 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 mb-2">
      {number}
    </h4>
    <p className="text-gray-300 font-medium tracking-wide uppercase text-sm">{label}</p>
  </motion.div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated floating elements */}
          <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></motion.div>
          <motion.div animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 font-semibold text-sm mb-6 border border-primary-500/30 backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4 mr-2" /> Hackathon Winning Healthcare AI
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              AI Guardian for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Rural Bharat</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Transforming village healthcare with state-of-the-art predictive AI, real-time emergency routing, and empowering ASHA workers globally.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/assistant" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-400 text-white rounded-full font-bold text-lg shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Launch AI Assistant <Activity className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/analytics" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                View Live Command Center
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="bg-slate-900 border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <ImpactMetric number="1.2M+" label="Lives Impacted" />
          <ImpactMetric number="45,000" label="Villages Connected" />
          <ImpactMetric number="24/7" label="AI Monitoring" />
          <ImpactMetric number="< 3 Min" label="Emergency Response" />
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">A Complete Health Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Integrated intelligence connecting patients, health workers, and district hospitals in real-time.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Smartphone}
              title="AI Health Assistant"
              description="Multilingual voice-first symptom checker and medical consultation for villagers in their native language."
              link="/assistant"
            />
            <FeatureCard 
              icon={HeartPulse}
              title="Women's Intelligence"
              description="Pregnancy tracking, high-risk detection, and automated nutrition planning tailored for rural demographics."
              link="/women"
            />
            <FeatureCard 
              icon={AlertTriangle}
              title="Emergency SOS"
              description="One-tap emergency dispatch with real-time ambulance tracking and automated nearest-hospital routing."
              link="/emergency"
            />
            <FeatureCard 
              icon={Users}
              title="ASHA Worker Copilot"
              description="Smart daily planners, follow-up queues, and diagnostic recommendations empowering frontline health workers."
              link="/asha"
            />
            <FeatureCard 
              icon={TrendingUp}
              title="District Analytics"
              description="Command center dashboards tracking outbreak predictions, malnutrition rates, and overall district health."
              link="/analytics"
            />
            <FeatureCard 
              icon={Shield}
              title="Cybersecurity Core"
              description="Enterprise-grade data protection, JWT auth, and encrypted medical records ensuring patient privacy."
              link="/showcase"
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="p-12 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experience the future of rural healthcare.</h2>
              <ul className="space-y-4 mb-8">
                {['Speak in local dialects', 'Instant triage recommendations', 'Offline-first capabilities'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-3" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/assistant" className="inline-block w-max px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-lg transition-colors">
                Start Live Demo
              </Link>
            </div>
            <div className="lg:w-1/2 bg-slate-800 p-8 flex items-center justify-center min-h-[400px] relative">
               {/* Mock UI illustration */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 mix-blend-overlay"></div>
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10">
                 <div className="flex items-center mb-6 border-b pb-4">
                   <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4"><Stethoscope className="text-primary-600" /></div>
                   <div><h4 className="font-bold">SwasthAI Bot</h4><p className="text-xs text-green-500">Online • Hindi</p></div>
                 </div>
                 <div className="space-y-4">
                   <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-sm">मुझे 3 दिन से बुखार है।</div>
                   <div className="bg-primary-50 p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-sm border border-primary-100">क्या आपको खांसी या सिरदर्द भी है? कृपया अपना तापमान बताएं।</div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6 space-x-2">
            <HeartPulse className="text-primary-500" />
            <span className="text-2xl font-bold text-white">SwasthAI Guardian</span>
          </div>
          <p className="mb-6">Built with ❤️ for Global Healthcare Hackathon.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/showcase" className="hover:text-white transition">Architecture</Link>
            <Link to="/analytics" className="hover:text-white transition">Metrics</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub Repo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
