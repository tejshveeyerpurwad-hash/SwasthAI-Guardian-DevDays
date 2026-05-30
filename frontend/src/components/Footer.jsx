import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">SwasthAI Guardian</h3>
          <p className="text-sm leading-relaxed">
            AI‑powered rural health intelligence platform. Empowering villages, women, and healthcare workers with real‑time insights and emergency response.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
            <li><Link to="/assistant" className="hover:text-primary-400 transition-colors">Assistant</Link></li>
            <li><Link to="/women" className="hover:text-primary-400 transition-colors">Women Health</Link></li>
            <li><Link to="/emergency" className="hover:text-primary-400 transition-colors">Emergency SOS</Link></li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs">
        © {new Date().getFullYear()} SwasthAI Guardian. All rights reserved.
      </div>
    </footer>
  );
}
