
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhySection from './components/WhySection';
import Footer from './components/Footer';
import SequenceSection from './components/SequenceSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-puce-green selection:text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SequenceSection />
        <HowItWorks />
        <WhySection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
