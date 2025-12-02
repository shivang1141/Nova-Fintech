import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden selection:bg-accent-cyan selection:text-slate-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
         <div className="absolute inset-0 grid-bg opacity-30"></div>
         {/* Animated Orbs */}
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] animate-float opacity-50"></div>
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] animate-float-delayed opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <div className="opacity-0 animate-fade-in-up flex items-center justify-center">
          <div className="group cursor-pointer inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300 tracking-wide">NOVA 3.0 is live</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9] opacity-0 animate-fade-in-up animate-delay-100">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Wealth,</span>
          <span className="block text-gradient-accent pb-4">Reimagined.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
          The award-winning financial operating system designed for the next generation of investors. 
          AI-driven insights, zero-latency execution, and pure aesthetic bliss.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto opacity-0 animate-fade-in-up animate-delay-300">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Open Account
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center group">
            <span className="mr-2">View Showreel</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
               <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};

export default Hero;