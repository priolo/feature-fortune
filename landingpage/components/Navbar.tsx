
import React from 'react';
import { Github, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1b4b] border border-puce-pink shadow-[0_0_15px_rgba(225,73,252,0.3)]">
              <img 
                src="https://picsum.photos/seed/puce-logo/64/64" 
                alt="PUCE Logo" 
                className="w-8 h-8 rounded-md"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">PUCE</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-puce-green transition-colors font-medium">How it works</a>
            <a href="#why" className="text-gray-300 hover:text-puce-pink transition-colors font-medium">Why PUCE</a>
            <button className="flex items-center space-x-2 bg-puce-pink hover:bg-opacity-80 text-white px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105">
              <LogIn size={18} />
              <span>Login / Register</span>
            </button>
          </div>

          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
