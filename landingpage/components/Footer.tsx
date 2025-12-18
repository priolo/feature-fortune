
import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex space-x-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-puce-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-puce-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-puce-green transition-colors">Documentation</a>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:border-puce-pink transition-colors">
              <Github size={20} className="text-gray-400" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:border-puce-green transition-colors">
              <Twitter size={20} className="text-gray-400" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:text-white transition-colors">
              <Mail size={20} className="text-gray-400" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-900 text-gray-600 text-xs">
          <p>{new Date().getFullYear()} PUCE. Built with love for the Open Source Community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
