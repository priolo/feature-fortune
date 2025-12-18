
import React from 'react';
import { Terminal, Shield, Wallet, Search, Gift, Wrench, Eye, Banknote, Handshake } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">

          <div className="md:w-1/2">
            <h3 className="text-4xl md:text-5xl font-black text-white leading-none">
              How it <span className="text-puce-pink">Works</span>
            </h3>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WorkCard
            title="Create Features"
            desc="An author links to a public GitHub repository and describes the functionality he or she wants implemented."
            icon={<Terminal className="text-puce-pink" />}
            tag="CREATE"
          />
          <WorkCard
            title="Developer Accepts"
            desc="The implementation will be accepted by a developer, preferably the repository owner."
            icon={<Handshake className="text-puce-green" />}
            tag="ACCEPT"
          />
          <WorkCard
            title="Sponsor Projects"
            desc="Like a project? Contribute a feature reward. Payment will only be made after the feature has been declared complete."
            icon={<Gift className="text-puce-pink" />}
            tag="FUND"
          />
          <WorkCard
            title="Implementation of improvements"
            desc="The developer will gladly dedicate his time to improving his repo if he receives money."
            icon={<Wrench className="text-puce-green" />}
            tag="DEV"
          />
          <WorkCard
            title="Check and accept"
            desc="When the developer releases the feature, the author checks it and, if necessary, declares it completed."
            icon={<Eye className="text-puce-pink" />}
            tag="CHECK"
          />
          {/* <WorkCard
            title="Payment"
            desc="After a few hours the developer receives all the accumulated donations"
            icon={<Banknote className="text-puce-green" />}
            tag="PAY"
          /> */}

          <div className="flex flex-col gap-6 p-8 bg-black rounded-3xl">

            <div className="">
              <div className="text-6xl font-black text-puce-green">
                PAY
              </div>
            </div>

            {/* <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-5">
      {icon}
    </div> */}

            {/* <h4 className="text-xl font-bold text-white mb-3 mt-14">
      {title}
    </h4> */}

            <p className="text-gray-400 leading-relaxed text-sm">
              After a few hours the developer receives all the accumulated donations
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

const WorkCard: React.FC<{ title: string, desc: string, icon: React.ReactNode, tag: string }> = ({ title, desc, icon, tag }) => (
  <div className="flex flex-col gap-6 p-8 bg-black rounded-3xl">

    <div className="">
      <div className="text-6xl font-black text-white">
        {tag}
      </div>
    </div>

    {/* <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-5">
      {icon}
    </div> */}

    {/* <h4 className="text-xl font-bold text-white mb-3 mt-14">
      {title}
    </h4> */}

    <p className="text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>

  </div>
);

import { CheckCircle, CreditCard } from 'lucide-react';

export default HowItWorks;
