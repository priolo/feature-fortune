
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

      <div className="flex flex-col item-center gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
          Find funding for <br />
          <span className="text-puce-pink">your project</span> on <span className="text-puce-green">GitHub</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="w-full sm:w-auto px-8 py-4 bg-puce-pink text-black font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(225,73,252,.5)] hover:shadow-[0_0_30px_rgba(225,73,252,0.6)] transition-all"
            onClick={() => window.location.href = '/app/'}
          >
            Get Started Now
          </button>
        </div>

        <div className="text-gray-400 text-lg">
          We're just getting started. But we want to grow!<br />
          <span className="text-puce-green font-bold">We don't charge any fees and use Stripe: you can trust us.</span><br />
          Our goal is to create a great place to get your project funded.
        </div>
        
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
        </div> */}

      </div>
    </section>
  );
};

export default Hero;
