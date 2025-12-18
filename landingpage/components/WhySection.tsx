
import React from 'react';
import { Heart, Globe, Beaker, Award, Shield } from 'lucide-react';

const WhySection: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-[#0a0a0a] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              We Built PUCE because <br />
              <span className="text-puce-green">We Love Open Source.</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg">
              <p>
                Open source sustainability is a hard problem. Many developers maintain critical infrastructure for free while companies benefit. 
                <span className="text-white font-semibold"> PUCE is an experiment </span> in direct feature-level funding.
              </p>
              <p>
                We believe that by allowing users to directly fund specific improvements, we create a more responsive and healthy ecosystem for everyone.
              </p>
              <div className="p-6 rounded-2xl bg-puce-green">
                <p className="text-gray-900 font-bold flex items-center gap-2">
                  <Shield size={20} />
                  NO FEES. PERIOD.
                </p>
                <p className="text-sm text-gray-900 mt-2">
                  The platform receives no compensation. Every cent (minus Stripe's transaction fee) goes directly to the developer who solves the task. This is our contribution to the community.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WhyItem 
              icon={<Heart className="text-puce-pink" />}
              title="Love for OSS"
              desc="Open source is the backbone of the web. We want to see it thrive."
            />
            <WhyItem 
              icon={<Beaker className="text-puce-green" />}
              title="Experimental"
              desc="A new way to think about how code gets funded at the feature level."
            />
            <WhyItem 
              icon={<Globe className="text-puce-pink" />}
              title="Global Reach"
              desc="Developers from anywhere can earn for their high-quality contributions."
            />
            <WhyItem 
              icon={<Shield className="text-puce-green" />}
              title="Direct & Fair"
              desc="No complex management fees. Transparent flow from sponsor to dev."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyItem: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-[#1e1b4b]/20 border border-gray-800 hover:border-puce-green/30 transition-colors">
    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-4 border border-gray-800">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default WhySection;
