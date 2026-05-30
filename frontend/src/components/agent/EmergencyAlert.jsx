import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, HeartPulse } from 'lucide-react';

export default function EmergencyAlert({ 
  isOpen, 
  onClose, 
  language = 'hi', 
  detectedSymptoms = [] 
}) {
  if (!isOpen) return null;

  const content = {
    en: {
      title: "MEDICAL EMERGENCY DETECTED",
      subtitle: "Critical symptoms identified. Immediate action required.",
      instructionsTitle: "WHAT TO DO NOW:",
      instructions: [
        "Do not move the patient unnecessarily.",
        "Keep the patient calm and comfortable.",
        "Ensure they have clear breathing space."
      ],
      callText: "CALL 108 IMMEDIATELY",
      subCallText: "Toll-Free Government Ambulance",
      ashaText: "We have automatically alerted your local ASHA worker and nearest PHC.",
      dismiss: "I Understand"
    },
    hi: {
      title: "गंभीर आपातकाल (EMERGENCY)",
      subtitle: "खतरनाक लक्षण पाए गए हैं। तुरंत कार्रवाई करें।",
      instructionsTitle: "अभी क्या करें:",
      instructions: [
        "मरीज को बेवजह न हिलाएं।",
        "मरीज को शांत और आरामदायक रखें।",
        "सुनिश्चित करें कि उन्हें सांस लेने के लिए खुली हवा मिले।"
      ],
      callText: "अभी 108 पर कॉल करें",
      subCallText: "मुफ्त सरकारी एम्बुलेंस सेवा",
      ashaText: "हमने आपकी स्थानीय ASHA कार्यकर्ता और नजदीकी PHC को अलर्ट कर दिया है।",
      dismiss: "मुझे समझ आ गया"
    }
  };

  const text = content[language] || content.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Header Header */}
        <div className="bg-red-600 p-6 flex flex-col items-center justify-center text-center border-b-4 border-red-700">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner mb-4 animate-pulse">
            <HeartPulse className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            {text.title}
          </h2>
          <p className="text-red-100 font-medium">
            {text.subtitle}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          
          {/* Detected Symptoms (if passed) */}
          {detectedSymptoms.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-800 uppercase tracking-wide mb-1">
                  Detected Condition
                </p>
                <p className="text-red-900 font-medium">
                  {detectedSymptoms.join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{text.instructionsTitle}</h3>
            <ul className="space-y-3">
              {text.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 font-medium leading-tight">{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Action Button */}
          <a 
            href="tel:108"
            className="group relative flex flex-col items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 px-6 shadow-lg hover:shadow-xl transition-all active:scale-95 border-b-4 border-red-800 hover:border-red-900"
          >
            <div className="flex items-center gap-3 mb-1">
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span className="text-2xl font-black tracking-wide">{text.callText}</span>
            </div>
            <span className="text-red-100 text-sm font-medium">{text.subCallText}</span>
            
            {/* Ping effect */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          </a>

          {/* ASHA Info */}
          <div className="flex items-center gap-3 justify-center text-center bg-gray-50 p-3 rounded-lg border border-gray-100">
            <ShieldAlert className="text-teal-600 w-5 h-5 shrink-0" />
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              {text.ashaText}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm font-semibold underline underline-offset-2 transition-colors"
          >
            {text.dismiss}
          </button>
        </div>

      </div>
    </div>
  );
}
