import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

export default function RiskMeter({ score = 0, size = 120, animate = true }) {
  const [currentScore, setCurrentScore] = useState(0);
  
  // Calculate stroke parameters for the SVG circle
  const strokeWidth = Math.max(8, size * 0.08);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Animate the score on mount or when it changes
  useEffect(() => {
    if (!animate) {
      setCurrentScore(score);
      return;
    }
    
    setCurrentScore(0);
    const duration = 1200; // 1.2s animation
    const steps = 60;
    const increment = score / steps;
    const stepTime = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setCurrentScore(score);
        clearInterval(timer);
      } else {
        setCurrentScore(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score, animate]);

  // Determine configuration based on score
  const getRiskConfig = (val) => {
    if (val >= 76) return { level: 'Critical', color: '#ef4444', twColor: 'text-red-500', bg: 'bg-red-50', icon: <ShieldAlert className="text-red-500 w-5 h-5" /> };
    if (val >= 51) return { level: 'High', color: '#f97316', twColor: 'text-orange-500', bg: 'bg-orange-50', icon: <Activity className="text-orange-500 w-5 h-5" /> };
    if (val >= 26) return { level: 'Medium', color: '#eab308', twColor: 'text-yellow-500', bg: 'bg-yellow-50', icon: <Activity className="text-yellow-500 w-5 h-5" /> };
    return { level: 'Low', color: '#10b981', twColor: 'text-emerald-500', bg: 'bg-emerald-50', icon: <ShieldCheck className="text-emerald-500 w-5 h-5" /> };
  };

  const config = getRiskConfig(currentScore);
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-100 shadow-sm ${config.bg} transition-colors duration-500`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-1.5">
        Health Risk Assessment
      </h3>
      
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background Track Circle */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute -rotate-90 transform"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Animated Value Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={config.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all ease-out"
            style={{ transitionDuration: animate ? '100ms' : '0ms' }}
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-bold tracking-tighter tabular-nums ${config.twColor}`}>
            {currentScore}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
            / 100
          </span>
        </div>
      </div>
      
      {/* Label & Icon */}
      <div className={`mt-4 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-200`}>
        {config.icon}
        <span className={`text-sm font-bold ${config.twColor}`}>
          {config.level} Risk
        </span>
      </div>
    </div>
  );
}
