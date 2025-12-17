
import React from 'react';
import { Github, ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-puce-pink rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-puce-green rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-puce-green animate-pulse"></span>
          <span className="text-gray-400">100% direct developer funding</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8">
          Fund the next <br />
          <span className="text-puce-pink">Big Feature</span> on <span className="text-puce-green">GitHub</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          The direct connection between users who want features and developers who build them. 
          No middleman, no fees, just pure open source collaboration.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="w-full sm:w-auto px-8 py-4 bg-puce-green text-black font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(145,255,0,0.4)] hover:shadow-[0_0_30px_rgba(145,255,0,0.6)] transition-all transform hover:-translate-y-1">
            Get Started Now
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl border border-gray-700 hover:bg-gray-800 transition-all">
            <Github size={22} />
            <span>Connect GitHub</span>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Platform Fee', value: '0%', color: 'puce-green' },
            { label: 'Bounties Paid', value: '€2.4k', color: 'puce-pink' },
            { label: 'Active Repos', value: '142+', color: 'puce-green' },
            { label: 'Developers', value: '312', color: 'puce-pink' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#1e1b4b]/40 border border-gray-800">
              <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
