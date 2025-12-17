
import React from 'react';
import { Terminal, Shield, Wallet, Search } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="md:w-1/2">
            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Detailed Guide</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-none">
              How it <span className="text-puce-pink">Works</span>
            </h3>
          </div>
          <div className="md:w-1/2 text-gray-400 text-lg">
            Directly bridge the gap between financial support and technical execution. 
            <span className="text-puce-green font-bold"> The platform receives no compensation. </span> 
            All funds flow directly from sponsor to creator.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WorkCard 
            title="Create Features" 
            desc="Link any public GitHub repository and describe the feature you want to see. Add a bounty to attract developers."
            icon={<Terminal className="text-puce-pink" />}
            tag="PROPOSE"
          />
          <WorkCard 
            title="Sponsor Projects" 
            desc="Love a project? Contribute to a feature bounty. Your money is held securely until the work is verified."
            icon={<Wallet className="text-puce-green" />}
            tag="FUND"
          />
          <WorkCard 
            title="Development Cycle" 
            desc="Developers claim tasks. Once assigned, they build and submit their code via PR links directly on PUCE."
            icon={<Search className="text-puce-pink" />}
            tag="DEVELOP"
          />
          <WorkCard 
            title="Zero Fees" 
            desc="We take 0% of the bounty. Stripe processing fees apply, but PUCE receives no compensation for the service."
            icon={<Shield className="text-puce-green" />}
            tag="FREE"
          />
          <WorkCard 
            title="Automatic Payouts" 
            desc="Once the feature is accepted, Stripe handles the direct transfer to the developer's account immediately."
            icon={<CreditCard className="text-puce-pink" />}
            tag="PAY"
          />
          <WorkCard 
            title="Open Oversight" 
            desc="The community monitors progress. All steps are transparent and linked to public GitHub activity."
            icon={<CheckCircle className="text-puce-green" />}
            tag="STATUS"
          />
        </div>
      </div>
    </section>
  );
};

const WorkCard: React.FC<{title: string, desc: string, icon: React.ReactNode, tag: string}> = ({ title, desc, icon, tag }) => (
  <div className="group bg-[#1e1b4b]/40 border border-gray-800 p-8 rounded-3xl hover:border-puce-pink/50 transition-all transform hover:-translate-y-2 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <div className="text-6xl font-black text-white">{tag}</div>
    </div>
    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6 border border-gray-700">
      {icon}
    </div>
    <div className="inline-block px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[10px] font-bold text-gray-500 tracking-widest mb-3 uppercase">
      {tag}
    </div>
    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
    <p className="text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

import { CheckCircle, CreditCard } from 'lucide-react';

export default HowItWorks;
