import React, { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingTiers: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Invest in your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">Financial Future.</span>
           </h2>
           <p className="text-slate-400 text-lg mb-8">
              Choose the plan that fits your wealth velocity. Upgrade or cancel anytime.
           </p>

           {/* Toggle */}
           <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 relative">
              <button 
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                 Monthly
              </button>
              <button 
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${annual ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                 Yearly <span className="text-accent-gold text-[10px] ml-1">-20%</span>
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
           
           {/* Starter */}
           <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col hover:border-white/10 transition-colors">
              <div className="mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 text-slate-300">
                    <Star className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white">Starter</h3>
                 <p className="text-slate-400 text-sm mt-2">Essential tools for new investors.</p>
              </div>
              <div className="mb-8">
                 <span className="text-4xl font-display font-bold text-white">$0</span>
                 <span className="text-slate-500"> / month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                 {['Commission-free trading', 'Basic Market Charts', 'Standard Support', '5% Staking APY'].map((feat, i) => (
                    <li key={i} className="flex items-center space-x-3">
                       <Check className="w-4 h-4 text-slate-500" />
                       <span className="text-slate-300 text-sm">{feat}</span>
                    </li>
                 ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">
                 Get Started
              </button>
           </div>

           {/* Pro (Highlighted) */}
           <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-accent-purple to-accent-cyan rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-card-strong bg-slate-900 p-8 rounded-3xl flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-purple to-accent-cyan px-4 py-1 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
                 </div>
                 <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple to-indigo-600 flex items-center justify-center mb-4 text-white shadow-lg shadow-purple-500/30">
                       <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">NOVA Pro</h3>
                    <p className="text-slate-400 text-sm mt-2">Advanced power for serious traders.</p>
                 </div>
                 <div className="mb-8">
                    <span className="text-4xl font-display font-bold text-white">${annual ? '19' : '24'}</span>
                    <span className="text-slate-500"> / month</span>
                 </div>
                 <ul className="space-y-4 mb-8 flex-1">
                    {['Everything in Starter', 'Real-time L2 Data', 'AI Portfolio Analysis', 'Prioritized Execution', 'Metal Debit Card'].map((feat, i) => (
                       <li key={i} className="flex items-center space-x-3">
                          <Check className="w-4 h-4 text-accent-cyan" />
                          <span className="text-white text-sm font-medium">{feat}</span>
                       </li>
                    ))}
                 </ul>
                 <button className="w-full py-3 rounded-xl bg-white text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                    Upgrade to Pro
                 </button>
              </div>
           </div>

           {/* Elite / Black */}
           <div className="metal-card p-8 rounded-3xl border border-white/10 flex flex-col hover:border-accent-gold/50 transition-colors">
              <div className="mb-6 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center mb-4 text-white">
                    <Crown className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold text-accent-gold">NOVA Black</h3>
                 <p className="text-slate-400 text-sm mt-2">Institutional grade access.</p>
              </div>
              <div className="mb-8 relative z-10">
                 <span className="text-4xl font-display font-bold text-accent-gold">${annual ? '99' : '120'}</span>
                 <span className="text-slate-500"> / month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                 {['Dedicated Account Manager', 'OTC Desk Access', 'Unlimited API Limits', 'Private Equity Deals', 'Concierge Service'].map((feat, i) => (
                    <li key={i} className="flex items-center space-x-3">
                       <Check className="w-4 h-4 text-accent-gold" />
                       <span className="text-slate-200 text-sm">{feat}</span>
                    </li>
                 ))}
              </ul>
              <button className="relative z-10 w-full py-3 rounded-xl border border-accent-gold/30 text-accent-gold font-bold hover:bg-accent-gold/10 transition-colors">
                 Contact Sales
              </button>
           </div>

        </div>
      </div>
    </section>
  );
};

export default PricingTiers;