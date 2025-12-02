import React, { useState } from 'react';
import { Globe, ArrowRightLeft, Send } from 'lucide-react';

const GlobalNetwork: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Transfer Interface */}
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
            <Globe className="w-4 h-4" />
            <span>GLOBAL CLEARING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Move money at the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Speed of Information.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
             Traditional SWIFT transfers take 3-5 days. NOVA clears in seconds using our proprietary liquidity mesh.
          </p>

          <div className="glass-panel p-6 rounded-3xl max-w-md border border-white/10 shadow-2xl relative">
             <div className="space-y-4">
               {/* From */}
               <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div className="flex-1">
                     <label className="text-xs text-slate-500 font-bold block mb-1">YOU SEND</label>
                     <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="bg-transparent text-2xl font-mono font-bold text-white w-full focus:outline-none" 
                     />
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                     <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">🇺🇸</div>
                     <span className="font-bold">USD</span>
                  </div>
               </div>

               {/* Connector */}
               <div className="flex justify-center -my-3 relative z-10">
                  <div className="bg-slate-800 border border-white/10 p-2 rounded-full shadow-lg">
                     <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                  </div>
               </div>

               {/* To */}
               <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div className="flex-1">
                     <label className="text-xs text-slate-500 font-bold block mb-1">THEY GET</label>
                     <div className="text-2xl font-mono font-bold text-green-400">
                        {(amount * 0.92).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                     <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">🇪🇺</div>
                     <span className="font-bold">EUR</span>
                  </div>
               </div>

               {/* Details */}
               <div className="flex justify-between text-xs text-slate-500 px-2">
                  <span>Exchange Rate</span>
                  <span className="text-slate-300">1 USD = 0.92 EUR</span>
               </div>
               <div className="flex justify-between text-xs text-slate-500 px-2">
                  <span>Fee</span>
                  <span className="text-green-400 font-bold">FREE</span>
               </div>

               <button 
                  onClick={handleSend}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
               >
                  {isSending ? (
                     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                     <>
                        <span>Transfer Funds</span>
                        <Send className="w-4 h-4" />
                     </>
                  )}
               </button>
             </div>
          </div>
        </div>

        {/* Right: Map Visualization */}
        <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
           {/* Abstract Map Dots (Simplified Visual) */}
           <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                 {/* Create a grid of dots */}
                 <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="white" />
                 </pattern>
                 {/* Mask for Globe Shape */}
                 <mask id="globe-mask">
                    <circle cx="400" cy="250" r="200" fill="white" />
                 </mask>
                 <rect width="800" height="500" fill="url(#dot-pattern)" mask="url(#globe-mask)" />
                 
                 {/* Arcs */}
                 <g className="opacity-60" fill="none" stroke="url(#gradient-line)" strokeWidth="1.5" strokeLinecap="round">
                    <path className="animate-dash" strokeDasharray="10 10" d="M 250 200 Q 400 50 550 220" />
                    <path className="animate-dash" strokeDasharray="10 10" style={{ animationDelay: '1s' }} d="M 280 280 Q 400 400 520 250" />
                    <path className="animate-dash" strokeDasharray="10 10" style={{ animationDelay: '0.5s' }} d="M 550 220 Q 600 300 450 350" />
                 </g>

                 <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                       <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                       <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                 </defs>
              </svg>
           </div>
           
           {/* Floating Node Markers */}
           <div className="absolute top-1/3 left-1/4 animate-float">
              <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/50 rounded-full text-xs text-blue-300 font-mono shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 NYC • $4.2M
              </div>
           </div>
           <div className="absolute bottom-1/3 right-1/4 animate-float-delayed">
              <div className="px-3 py-1 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/50 rounded-full text-xs text-indigo-300 font-mono shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                 LDN • $8.9M
              </div>
           </div>
           <div className="absolute top-1/2 left-1/2 animate-pulse-slow">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]"></div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalNetwork;