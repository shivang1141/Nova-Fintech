import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Sunset, DollarSign, TrendingUp, CalendarClock } from 'lucide-react';

const RetirementPlanner: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(7); // %

  const data = useMemo(() => {
    const result = [];
    let balance = currentSavings;
    const monthlyRate = expectedReturn / 100 / 12;
    
    // Project until age 90
    const endAge = 90;

    for (let age = currentAge; age <= endAge; age++) {
      result.push({
        age,
        balance: Math.round(balance),
        contributions: Math.round(currentSavings + (age - currentAge) * 12 * monthlyContribution),
        isRetirement: age === retirementAge
      });

      // Annual calculation loop
      for (let m = 0; m < 12; m++) {
        if (age < retirementAge) {
          // Accumulation Phase
          balance = (balance + monthlyContribution) * (1 + monthlyRate);
        } else {
          // Decumulation Phase (Drawdown 4% rule approximation or simple continued growth minus expenses - keeping it simple: just growth for visualization of "Potential Wealth")
          // Let's assume they stop contributing but it keeps growing
          balance = balance * (1 + monthlyRate); 
        }
      }
    }
    return result;
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn]);

  const balanceAtRetirement = data.find(d => d.age === retirementAge)?.balance || 0;

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Controls */}
          <div className="w-full md:w-1/3 space-y-8 animate-fade-in-up">
            <div>
              <div className="flex items-center space-x-2 text-accent-gold mb-4">
                <Sunset className="w-6 h-6" />
                <span className="font-bold tracking-widest text-sm uppercase">Future Projection</span>
              </div>
              <h2 className="text-4xl font-display font-bold leading-tight mb-4">
                 Retirement <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Vision.</span>
              </h2>
              <p className="text-slate-400">
                 Visualize the power of compounding. See when you can achieve financial independence.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
               
               {/* Current Age & Retirement Age */}
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="text-xs font-bold text-slate-400 mb-2 block">Current Age: {currentAge}</label>
                     <input type="range" min="18" max="70" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-400 mb-2 block">Retire Age: {retirementAge}</label>
                     <input type="range" min="40" max="80" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
               </div>

               {/* Savings */}
               <div>
                  <div className="flex justify-between mb-2">
                     <label className="text-sm font-bold text-white flex items-center"><DollarSign className="w-3 h-3 mr-1 text-green-400"/> Current Savings</label>
                     <span className="text-sm font-mono text-slate-300">${currentSavings.toLocaleString()}</span>
                  </div>
                  <input type="range" min="0" max="500000" step="5000" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
               </div>

               {/* Monthly Contribution */}
               <div>
                  <div className="flex justify-between mb-2">
                     <label className="text-sm font-bold text-white flex items-center"><CalendarClock className="w-3 h-3 mr-1 text-blue-400"/> Monthly Add</label>
                     <span className="text-sm font-mono text-slate-300">${monthlyContribution.toLocaleString()}</span>
                  </div>
                  <input type="range" min="0" max="10000" step="100" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
               </div>

               {/* Returns */}
               <div>
                  <div className="flex justify-between mb-2">
                     <label className="text-sm font-bold text-white flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-purple-400"/> Expected Return</label>
                     <span className="text-sm font-mono text-slate-300">{expectedReturn}%</span>
                  </div>
                  <input type="range" min="1" max="15" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
               </div>

            </div>
          </div>

          {/* Chart Visualization */}
          <div className="w-full md:w-2/3 flex flex-col animate-fade-in-up animate-delay-200">
             
             {/* Big Number Card */}
             <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 flex items-center justify-between">
                <div>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Projected Wealth at Age {retirementAge}</p>
                   <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                      ${balanceAtRetirement.toLocaleString()}
                   </p>
                </div>
                <div className="hidden md:flex h-12 w-12 rounded-full bg-accent-gold/20 items-center justify-center">
                   <Sunset className="w-6 h-6 text-accent-gold" />
                </div>
             </div>

             {/* Chart */}
             <div className="flex-1 glass-card-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden min-h-[400px]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data} margin={{ top: 20, right: 0, left: 30, bottom: 0 }}>
                      <defs>
                         <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                         dataKey="age" 
                         stroke="#475569" 
                         tickLine={false} 
                         axisLine={false} 
                         type="number"
                         domain={[currentAge, 90]}
                         tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <YAxis 
                         stroke="#475569" 
                         tickLine={false} 
                         axisLine={false}
                         tickFormatter={(val) => `$${val/1000}k`}
                         tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                         formatter={(val: number) => `$${val.toLocaleString()}`}
                         labelFormatter={(label) => `Age ${label}`}
                      />
                      <ReferenceLine x={retirementAge} stroke="#fbbf24" strokeDasharray="3 3" label={{ position: 'top', value: 'Retirement', fill: '#fbbf24', fontSize: 10 }} />
                      <Area 
                         type="monotone" 
                         dataKey="balance" 
                         stroke="#fbbf24" 
                         fill="url(#colorWealth)" 
                         strokeWidth={3} 
                         animationDuration={1500}
                      />
                      <Area 
                         type="monotone" 
                         dataKey="contributions" 
                         stroke="#475569" 
                         fill="transparent" 
                         strokeDasharray="5 5" 
                         strokeWidth={2}
                      />
                   </AreaChart>
                </ResponsiveContainer>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RetirementPlanner;