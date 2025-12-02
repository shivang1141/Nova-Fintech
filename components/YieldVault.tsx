import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Coins, ArrowRight } from 'lucide-react';

const YieldVault: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(5);

  const data = useMemo(() => {
    const result = [];
    const bankRate = 0.005; // 0.5% standard bank APY
    const novaRate = 0.055; // 5.5% Nova APY

    let bankBalance = initialDeposit;
    let novaBalance = initialDeposit;
    let totalContributed = initialDeposit;

    for (let i = 0; i <= years * 12; i++) {
       // Add data point every 6 months to keep chart clean
       if (i % 6 === 0) {
         result.push({
           month: `Year ${Math.floor(i/12)}`,
           bank: Math.round(bankBalance),
           nova: Math.round(novaBalance),
           contributed: totalContributed
         });
       }

       // Monthly calculation
       bankBalance = (bankBalance + monthlyContribution) * (1 + bankRate/12);
       novaBalance = (novaBalance + monthlyContribution) * (1 + novaRate/12);
       totalContributed += monthlyContribution;
    }
    return result;
  }, [initialDeposit, monthlyContribution, years]);

  const finalNovaBalance = data[data.length - 1].nova;
  const finalBankBalance = data[data.length - 1].bank;
  const earnings = finalNovaBalance - data[data.length - 1].contributed;

  return (
    <section className="py-24 bg-transparent relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-lime/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Controls Side */}
          <div className="flex-1 space-y-10 z-10">
            <div>
              <div className="flex items-center space-x-2 text-accent-lime mb-4">
                <Coins className="w-6 h-6" />
                <span className="font-bold tracking-widest text-sm">NOVA YIELD</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                Let your capital <br />
                <span className="text-white">compete.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Earn up to 5.5% APY on idle cash. Interest paid daily. 
                Complete liquidity. No lock-up periods.
              </p>
            </div>

            <div className="space-y-8 glass-panel p-8 rounded-3xl border border-white/5">
              {/* Initial Deposit Slider */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-slate-300">Initial Deposit</label>
                  <span className="text-xl font-bold font-mono">${initialDeposit.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000" 
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Monthly Contribution Slider */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-slate-300">Monthly Top-up</label>
                  <span className="text-xl font-bold font-mono">${monthlyContribution.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100" 
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

               {/* Years Slider */}
               <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-slate-300">Duration (Years)</label>
                  <span className="text-xl font-bold font-mono">{years} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1" 
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <button className="flex items-center space-x-2 text-white font-bold hover:text-accent-lime transition-colors">
               <span>Start Earning</span>
               <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Visualization Side */}
          <div className="flex-1">
             <div className="h-full flex flex-col">
                {/* Big Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Projected Balance</p>
                      <p className="text-3xl font-mono font-bold text-white">${finalNovaBalance.toLocaleString()}</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-accent-lime/10 border border-accent-lime/20">
                      <p className="text-accent-lime text-xs uppercase tracking-wider mb-2">Total Earnings</p>
                      <p className="text-3xl font-mono font-bold text-accent-lime">+${earnings.toLocaleString()}</p>
                   </div>
                </div>

                {/* Chart */}
                <div className="flex-1 min-h-[400px] glass-card-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                   <div className="absolute top-4 left-6 z-10 flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                         <div className="w-3 h-3 rounded-full bg-accent-lime"></div>
                         <span className="text-xs text-white">NOVA (5.5%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                         <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                         <span className="text-xs text-slate-400">Standard Bank (0.5%)</span>
                      </div>
                   </div>

                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
                         <defs>
                            <linearGradient id="colorNova" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                         <XAxis 
                           dataKey="month" 
                           hide={true}
                         />
                         <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#0f172a', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '12px',
                              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' 
                            }}
                            itemStyle={{ fontSize: '12px' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                         />
                         <Area 
                            type="monotone" 
                            dataKey="nova" 
                            stroke="#84cc16" 
                            strokeWidth={3} 
                            fill="url(#colorNova)" 
                         />
                         <Area 
                            type="monotone" 
                            dataKey="bank" 
                            stroke="#64748b" 
                            strokeWidth={2} 
                            fill="transparent" 
                            strokeDasharray="5 5"
                         />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YieldVault;