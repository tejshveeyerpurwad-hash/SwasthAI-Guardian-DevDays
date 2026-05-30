import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HealthAgent() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('hi');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial greeting
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: language === 'hi' 
        ? "नमस्ते! मैं आपकी AI सखी हूँ। आप मुझे अपनी परेशानी या लक्षण (symptoms) बता सकते हैं।" 
        : "Hello! I am your AI Sakhi. Please tell me your symptoms or health concerns.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskLevel: null
    }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // TODO: Connect this to the actual backend POST /ai/health-agent
    // For now, simulate a network delay and a mock response
    setTimeout(() => {
      setIsTyping(false);
      
      const newBotMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: language === 'hi'
          ? "मुझे समझ आ गया। कृपया मुझे बताएं कि क्या आपको बुखार के साथ बदन दर्द भी है? यह डेंगू या वायरल हो सकता है। कृपया पास के PHC में जांच कराएं।"
          : "I understand. Please tell me if you have body ache along with the fever? This could be Dengue or a viral infection. Please visit the nearest PHC for a checkup.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: 'Medium' // Example risk level from backend
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1500);
  };

  // Helper to render risk badge
  const renderRiskBadge = (risk) => {
    if (!risk) return null;
    
    const riskConfig = {
      Critical: { color: 'bg-red-100 text-red-800 border-red-200', icon: <AlertTriangle size={14} /> },
      High: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <AlertTriangle size={14} /> },
      Medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <ShieldAlert size={14} /> },
      Low: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: <ShieldAlert size={14} /> }
    };
    
    const config = riskConfig[risk] || riskConfig.Low;
    
    return (
      <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        {config.icon}
        {risk} Risk
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-inter">
      
      {/* Header */}
      <header className="flex-none bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full border border-white/30">
                <Bot size={20} className="text-emerald-50" />
              </div>
              <div>
                <h1 className="font-semibold text-base leading-tight">SwasthAI Sakhi</h1>
                <p className="text-emerald-100 text-xs font-medium">AI Health Assistant</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <Globe size={16} />
            {language === 'hi' ? 'हिंदी' : 'EN'}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col">
          
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center mx-auto max-w-sm mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-3">
              <ShieldAlert size={24} />
            </div>
            <h2 className="text-gray-800 font-semibold text-sm mb-1">
              {language === 'hi' ? 'सुरक्षित और निजी' : 'Secure & Private'}
            </h2>
            <p className="text-gray-500 text-xs">
              {language === 'hi' 
                ? 'यह एक AI है। किसी भी आपात स्थिति में तुरंत 108 पर कॉल करें।' 
                : 'This is an AI. In any emergency, call 108 immediately.'}
            </p>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.sender === 'bot' ? (
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                      <Bot size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
                      <User size={16} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col">
                  <div 
                    className={`px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Risk Badge (Bot only) */}
                  {msg.sender === 'bot' && renderRiskBadge(msg.riskLevel)}
                  
                  {/* Timestamp */}
                  <span className={`text-[10px] text-gray-400 mt-1.5 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] gap-2.5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <Bot size={16} className="text-white" />
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center h-[46px]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none bg-white border-t border-gray-200 p-3 pb-safe z-10">
        <div className="max-w-4xl mx-auto w-full">
          <form 
            onSubmit={handleSend} 
            className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 p-1.5 pr-2 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all shadow-sm"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={language === 'hi' ? 'अपनी समस्या यहाँ लिखें...' : 'Type your symptoms here...'}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm md:text-base outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white rounded-full h-10 w-10 transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
          
          <div className="mt-2 text-center">
            <p className="text-[10px] text-gray-400">
              {language === 'hi' 
                ? 'यह AI डॉक्टर की जगह नहीं ले सकता। गंभीर लक्षणों के लिए तुरंत डॉक्टर से मिलें।' 
                : 'This AI cannot replace a doctor. Visit a clinic immediately for severe symptoms.'}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
