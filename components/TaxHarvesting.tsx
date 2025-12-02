
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, ArrowRight, DollarSign, RefreshCw, Calculator } from 'lucide-react';

const TaxHarvesting: React.FC = () => {
  const [portfolioSize, setPortfolioSize] = useState(50000);
  const [taxRate, setTaxRate] = useState(35);
  const [marketVolatility, setMarketVolatility] = useState(2); // 1 = Low, 2 = Med, 3 = High

  // Calculate Tax Alpha
  // Methodology: Estimated 1.5% - 3% additional yield via harvesting depending on volatility
  const estimatedHarvestYield = 0.018 * marketVolatility; 
  const annualTaxSavings = portfolioSize * estimatedHarvestYield * (taxRate / 100);
  const tenYearAlpha = annualTaxSavings * 10; // Simplified compounding for visual impact

  // Mock data for the chart comparison
  const data = Array.from({ length: 11 }, (_, i) => {
    const year = i;
    const standardReturn = portfolioSize * Math.pow(1.07, year); // 7% base
    const optimizedReturn = portfolioSize * Math.pow(1.07 + (estimatedHarvestYield * (taxRate/100)), year);
    return {
      year: `Year ${year}`,
      Standard: Math.round(standardReturn),
      WithNova: Math.round(optimizedReturn),
      Difference: Math.round(optimizedReturn - standardReturn)
    };
  });

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5 overflow-hidden">
      {/* Background FX */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Interactive Simulator */}
        <div className="space-y-8 relative z-10">
          <div>
             <div className="flex items-center space-x-2 text-green-400 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="font-bold tracking-widest text-sm uppercase">Smart Harvesting</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                Turn volatility into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Tax Deductions.</span>
             </h2>
             <p className="text-slate-400 text-lg">
                Our algorithms automatically sell losing assets to offset capital gains, lowering your tax bill without changing your risk profile.
             </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
             {/* Portfolio Input */}
             <div>
                <div className="flex justify-between mb-2">
                   <label className="text-sm font-bold text-slate-300">Invested Assets</label>
                   <span className="text-sm font-mono text-white">${portfolioSize.toLocaleString()}</span>
                </div>
                <input 
                   type="range" min="10000" max="1000000" step="10000"
                   value={portfolioSize} onChange={(e) => setPortfolioSize(Number(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
             </div>

             {/* Tax Rate Input */}
             <div>
                <div className="flex justify-between mb-2">
                   <label className="text-sm font-bold text-slate-300">Marginal Tax Rate</label>
                   <span className="text-sm font-mono text-white">{taxRate}%</span>
                </div>
                <input 
                   type="range" min="10" max="50" step="1"
                   value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
             </div>

             {/* Volatility Switch */}
             <div>
                <label className="text-sm font-bold text-slate-300 mb-3 block">Market Volatility Environment</label>
                <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5">
                   {['Low', 'Normal', 'High'].map((level, idx) => (
                      <button
                         key={level}
                         onClick={() => setMarketVolatility(idx + 1)}
                         className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            marketVolatility === idx + 1 
                            ? 'bg-green-600 text-white shadow-lg' 
                            : 'text-slate-500 hover:text-white'
                         }`}
                      >
                         {level}
                      </button>
                   ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">Higher volatility = More opportunities to harvest losses.</p>
             </div>
          </div>
        </div>

        {/* Right: The Payoff Visualization */}
        <div className="relative">
           
           {/* Savings Card */}
           <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 border-l-4 border-l-green-500">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Est. Annual Tax Savings</p>
                 <p className="text-3xl font-mono font-bold text-green-400">+${Math.round(annualTaxSavings).toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">10-Year "Tax Alpha"</p>
                 <p className="text-3xl font-mono font-bold text-white">+${Math.round(tenYearAlpha).toLocaleString()}</p>
              </div>
           </div>

           {/* Chart */}
           <div className="glass-card-strong h-[400px] rounded-3xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-white">Projected Growth</h3>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       <span className="text-xs text-white">With Harvesting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                       <span className="text-xs text-slate-400">Standard</span>
                    </div>
                 </div>
              </div>

              <ResponsiveContainer width="100%" height="80%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorHarvest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                       formatter={(val: number) => `$${val.toLocaleString()}`}
                    />
                    <XAxis dataKey="year" hide />
                    <Area 
                       type="monotone" 
                       dataKey="WithNova" 
                       stroke="#22c55e" 
                       strokeWidth={3} 
                       fill="url(#colorHarvest)" 
                    />
                    <Area 
                       type="monotone" 
                       dataKey="Standard" 
                       stroke="#475569" 
                       strokeWidth={2} 
                       fill="transparent" 
                       strokeDasharray="5 5"
                    />
                 </AreaChart>
              </ResponsiveContainer>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 bg-green-500/10 backdrop-blur-md border border-green-500/20 px-4 py-2 rounded-full flex items-center space-x-2 animate-bounce">
                 <RefreshCw className="w-4 h-4 text-green-400" />
                 <span className="text-xs font-bold text-green-400">Reinvesting Savings...</span>
              </div>
           </div>

           {/* Education Note */}
           <div className="mt-4 flex items-start space-x-3 opacity-60">
              <Calculator className="w-5 h-5 text-slate-400 mt-1" />
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                 Projection assumes capital gains occur annually and harvested losses can fully offset them. 
                 Actual results vary based on market conditions.
              </p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default TaxHarvesting;
