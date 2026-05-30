import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Paperclip, Activity, FileText, Globe, AlertCircle, Check, Loader2 } from 'lucide-react';

export default function Assistant() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am Sakhi, your AI Health Assistant. I can help check symptoms, answer medical queries, and connect you to emergency services. How are you feeling today?", sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('EN');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock API response logic based on keywords
    setTimeout(() => {
      let botResponse = "I understand. Please consult a doctor for a professional diagnosis.";
      const lowerInput = userMessage.text.toLowerCase();
      
      if (lowerInput.includes('fever') || lowerInput.includes('headache')) {
        botResponse = "It sounds like you might have a viral infection. Are you also experiencing a cough or body ache? Drink plenty of fluids. Based on your symptoms, your risk level is LOW.";
      } else if (lowerInput.includes('emergency') || lowerInput.includes('chest pain')) {
        botResponse = "🚨 CRITICAL RISK DETECTED: Chest pain can be serious. Please seek immediate medical attention or press the SOS button to dispatch an ambulance.";
      } else if (lowerInput.includes('pregnant') || lowerInput.includes('pregnancy')) {
        botResponse = "Congratulations! It is vital to take iron and folic acid supplements. Shall I add this to your maternal health tracker?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-white rounded-3xl shadow-2xl flex-1 flex flex-col overflow-hidden border border-gray-100">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary-600 to-emerald-500 p-6 flex justify-between items-center text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sakhi AI Assistant</h2>
              <p className="text-primary-100 text-sm flex items-center"><Check className="w-4 h-4 mr-1" /> Online & Secure</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Globe className="w-5 h-5" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white font-medium outline-none cursor-pointer"
            >
              <option value="EN" className="text-black">English</option>
              <option value="HI" className="text-black">हिंदी (Hindi)</option>
              <option value="MR" className="text-black">मराठी (Marathi)</option>
            </select>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className={`text-[11px] mt-2 text-right ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                <span className="text-sm text-gray-500">Sakhi is analyzing symptoms...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 py-3 bg-white border-t border-gray-50 flex space-x-2 overflow-x-auto hide-scrollbar">
           {['I have a fever', 'Pregnancy diet advice', 'Generate medical report', 'Am I at risk?'].map((s, i) => (
             <button key={i} onClick={() => setInput(s)} className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 rounded-full text-sm font-medium text-gray-600 transition-colors">
               {s}
             </button>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your symptoms or ask a medical question..."
              className="flex-1 bg-transparent outline-none text-gray-800"
            />
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Voice Input">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              className={`p-3 rounded-full flex items-center justify-center transition-colors ${input.trim() ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md' : 'bg-gray-200 text-gray-400'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
