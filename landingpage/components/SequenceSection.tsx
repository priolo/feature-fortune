
import React from 'react';
import { ArrowRight, Lightbulb, UserPlus, FileCode, CheckCircle, CreditCard, ArrowRightToLine } from 'lucide-react';

const SequenceSection: React.FC = () => {
  const steps = [
    { name: 'PROPOSE', icon: Lightbulb, color: 'puce-pink', desc: 'Define a feature for any GitHub repository.' },
    { name: 'ASSIGN', icon: UserPlus, color: 'puce-green', desc: 'Assign it to yourself or another developer.' },
    { name: 'RELEASE', icon: FileCode, color: 'puce-pink', desc: 'Declare the improvements implemented.' },
    { name: 'ACCEPT', icon: CheckCircle, color: 'puce-green', desc: 'Review the work and accept the release.' },
    { name: 'PAY', icon: CreditCard, color: 'puce-pink', desc: 'Direct Stripe payout to the developer.' },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">The Workflow</h2>
          <div className="h-1 w-20 bg-puce-green mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0 lg:space-x-4">

          {steps.map((step, idx) => (
            <React.Fragment key={step.name}>

              <div className="flex flex-col items-center group w-full lg:w-48 text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 bg-gray-900 border-2 border-${step.color}`}>
                  <step.icon size={32} className={`text-${step.color}`} />
                </div>
                <h3 className={`text-lg font-black text-white mb-2 tracking-tighter`}>{step.name}</h3>
                <p className="text-sm text-gray-500 leading-tight px-2">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block">
                  <ArrowRight className="text-gray-400 mt-6" size={40} />
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SequenceSection;
