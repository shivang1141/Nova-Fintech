import React from 'react';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="text-gradient">Architected for Speed.</span><br />
                <span className="text-slate-500">Built for Security.</span>
             </h2>
             <p className="text-slate-400 text-lg">
                Our infrastructure combines high-frequency trading engines with cold-storage security protocols.
             </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[600px]">
           
           {/* Item 1: Large Box */}
           <div className="col-span-1 md:col-span-2 row-span-2">
             <ScrollReveal className="h-full" delay="100ms">
                <div className="h-full glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-accent-purple/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-purple/20 transition-colors duration-500"></div>
                   <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                         <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Globe className="text-white w-6 h-6" />
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-2">Global Liquidity Network</h3>
                         <p className="text-slate-400 max-w-sm">
                            Access 140+ markets instantly. Our routing engine finds the best price execution across 50+ exchanges in milliseconds.
                         </p>
                      </div>
                      <div className="w-full h-32 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 rounded-xl mt-6 border border-white/5 group-hover:border-white/10 transition-colors"></div>
                   </div>
                </div>
             </ScrollReveal>
           </div>

           {/* Item 2: Medium Box */}
           <div className="col-span-1 md:col-span-1 row-span-1">
             <ScrollReveal className="h-full" delay="200ms">
                <div className="h-full glass-panel rounded-3xl p-6 flex flex-col justify-between group hover:border-accent-cyan/30 transition-all duration-500 hover:-translate-y-1">
                   <Shield className="w-8 h-8 text-accent-cyan mb-4 group-hover:rotate-12 transition-transform duration-300" />
                   <div>
                      <h3 className="text-lg font-bold text-white">Military Grade</h3>
                      <p className="text-xs text-slate-400 mt-2">AES-256 encryption & biometric keys.</p>
                   </div>
                </div>
             </ScrollReveal>
           </div>

           {/* Item 3: Medium Box */}
           <div className="col-span-1 md:col-span-1 row-span-1">
             <ScrollReveal className="h-full" delay="300ms">
                <div className="h-full glass-panel rounded-3xl p-6 flex flex-col justify-between group hover:border-green-400/30 transition-all duration-500 hover:-translate-y-1">
                   <Zap className="w-8 h-8 text-green-400 mb-4 group-hover:scale-125 transition-transform duration-300" />
                   <div>
                      <h3 className="text-lg font-bold text-white">Instant Settlement</h3>
                      <p className="text-xs text-slate-400 mt-2">T+0 settlement on all crypto assets.</p>
                   </div>
                </div>
             </ScrollReveal>
           </div>

           {/* Item 4: Wide Box Bottom */}
           <div className="col-span-1 md:col-span-2 row-span-1">
             <ScrollReveal className="h-full" delay="400ms">
                <div className="h-full glass-panel rounded-3xl p-8 flex items-center justify-between group overflow-hidden relative hover:border-white/20 transition-all duration-500">
                   <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-0"></div>
                   <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">AI Advisory</h3>
                      <p className="text-slate-400 text-sm max-w-xs">
                         Real-time portfolio rebalancing powered by Gemini 2.5 Flash.
                      </p>
                   </div>
                   <Cpu className="w-24 h-24 text-slate-800 group-hover:text-accent-purple/20 transition-colors duration-500 group-hover:rotate-45 transform" />
                </div>
             </ScrollReveal>
           </div>

        </div>
      </div>
    </section>
  );
};

export default Features;