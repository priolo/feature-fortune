
import React from 'react';
import { Rocket, Award, Code, Globe, Shield } from 'lucide-react';

const WhySection: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-[#0a0a0a] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row gap-8 items-center">

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
              <div className="p-6 rounded bg-puce-green">
                <p className="text-gray-900 font-bold flex items-center gap-2">
                  <Shield size={20} />
                  NO FEES. PERIOD.
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  The platform receives no compensation. Every cent (minus Stripe's transaction fee) goes directly to the developer who solves the task. This is our contribution to the community.
                </p>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <WhyItem
              icon={<Rocket className="text-puce-pink" />}
              title="We’re just getting started"
              desc="The platform is brand new and the community is still small. Join us early and help us grow a project with big ambitions."
              color="pink"
            />
            <WhyItem2
              icon={<Award className="text-puce-green" />}
              title="Supporting open source creators"
              desc="Our goal is to help open source project owners earn something while having fun improving the projects they love."
              color="green"
            />
            <WhyItem
              icon={<Code className="text-puce-pink" />}
              title="Developers come first"
              desc="There are already established donation platforms, but we focus on the developers who own and maintain the repositories."
              color="pink"
            />
            <WhyItem
              icon={<Globe className="text-puce-green" />}
              title="Free and open for everyone"
              desc="The service is completely free. Sign up, create your profile, and help us build a better community."
              color="green"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

const WhyItem: React.FC<{ icon: React.ReactNode, title: string, desc: string, color:string }> = ({ title, desc }) => (
  <div className="p-6 flex flex-col rounded-2xl bg-[#1e1b4b]/40">
    <h4 className="flex-1 text-lg font-bold text-gray-100 mb-2">
      {title}
    </h4>
    <p className="text-sm text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

const WhyItem2: React.FC<{ icon: React.ReactNode, title: string, desc: string, color:string }> = ({ title, desc }) => (
  <div className="p-6 flex flex-col rounded-2xl bg-[#1e1b4b]/40">
    <h4 className="flex-1 text-lg font-bold text-puce-green mb-2">
      {title}
    </h4>
    <p className="text-sm text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default WhySection;
