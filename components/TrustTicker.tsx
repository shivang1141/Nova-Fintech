import React from 'react';
import { Shield, Lock, FileCheck } from 'lucide-react';

const TrustTicker: React.FC = () => {
  const logos = [
    { name: "Stripe", color: "text-slate-500" },
    { name: "Goldman Sachs", color: "text-slate-500" },
    { name: "Plaid", color: "text-slate-500" },
    { name: "Visa", color: "text-slate-500" },
    { name: "AWS", color: "text-slate-500" },
    { name: "Coinbase Inst", color: "text-slate-500" },
  ];

  return (
    <section className="py-10 bg-slate-950 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
         <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">Trusted by industry leaders & Regulated Globally</p>
      </div>

      {/* Scrolling Logos */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex space-x-16 items-center">
          {/* Double the list for infinite scroll */}
          {[...logos, ...logos, ...logos].map((logo, i) => (
             <span key={i} className="text-2xl font-bold text-slate-600 hover:text-white transition-colors cursor-default">
                {logo.name}
             </span>
          ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex space-x-16 items-center">
           {/* Second layer if needed for smoother loop, or CSS handles it. 
               For simplicity using just one marquee div with duplicated content above. 
           */}
        </div>
        
        {/* Fade edges */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
      </div>

      {/* Compliance Badges - Static Centered */}
      <div className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center gap-6">
         <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-bold">SOC2 TYPE II</span>
         </div>
         <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-400">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold">256-BIT ENCRYPTION</span>
         </div>
         <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-400">
            <FileCheck className="w-4 h-4" />
            <span className="text-xs font-bold">ISO 27001</span>
         </div>
         <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-bold">GDPR COMPLIANT</span>
         </div>
      </div>
    </section>
  );
};

export default TrustTicker;