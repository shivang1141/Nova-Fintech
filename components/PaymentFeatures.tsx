import React from 'react';
import { Wifi, Aperture } from 'lucide-react';

const PaymentFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Card Visual Side */}
          <div className="order-2 lg:order-1 relative h-[500px] flex items-center justify-center perspective-1000 group">
             {/* The Card */}
             <div className="relative w-[380px] h-[240px] rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-white/20 shadow-2xl transform transition-all duration-700 ease-out group-hover:rotate-y-12 group-hover:scale-105 overflow-hidden">
                
                {/* Holographic Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10"></div>
                
                <div className="relative z-30 p-8 flex flex-col justify-between h-full">
                   <div className="flex justify-between items-start">
                      <Wifi className="text-white/50 rotate-90" />
                      <span className="text-xl font-display font-bold text-white tracking-widest">NOVA</span>
                   </div>
                   
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-md opacity-80"></div>
                      <Aperture className="text-white/80 w-8 h-8" />
                   </div>
                   
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="text-xs text-slate-400 font-mono">CARD HOLDER</p>
                         <p className="text-sm text-white font-mono tracking-wider">ALEXANDER HUNT</p>
                      </div>
                      <p className="text-lg text-white font-mono tracking-widest">•••• 4291</p>
                   </div>
                </div>
             </div>

             {/* Background Decoration */}
             <div className="absolute -z-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-accent-cyan/20 transition-colors"></div>
          </div>

          {/* Text Content Side */}
          <div className="order-1 lg:order-2 space-y-8">
             <div className="inline-block px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold tracking-wider mb-4">
                NOVA BLACK
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Spend like <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">an Institution.</span>
             </h2>
             <p className="text-lg text-slate-400 leading-relaxed">
                The Nova Black metal card isn't just a payment method; it's a statement. 
                Zero FX fees, 2% cashback in crypto, and airport lounge access worldwide.
             </p>

             <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="border-l border-white/10 pl-6">
                   <p className="text-3xl font-bold text-white mb-1">0%</p>
                   <p className="text-sm text-slate-500">FX Fees Globally</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                   <p className="text-3xl font-bold text-white mb-1">$5M</p>
                   <p className="text-sm text-slate-500">Transaction Limit</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PaymentFeatures;