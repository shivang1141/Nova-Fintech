
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon, Shield, TrendingUp, Zap, Target } from 'lucide-react';

type RiskProfile = 'Conservative' | 'Balanced' | 'Growth' | 'Aggressive';

const AssetAllocation: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState<number>(2); // 0 to 3

  const profiles: { [key: number]: RiskProfile } = {
    0: 'Conservative',
    1: 'Balanced',
    2: 'Growth',
    3: 'Aggressive'
  };

  const currentProfile = profiles[riskLevel];

  const allocationData = useMemo(() => {
    switch (riskLevel) {
      case 0: // Conservative
        return [
          { name: 'Bonds', value: 50, color: '#3b82f6' }, // Blue
          { name: 'Large Cap Stocks', value: 30, color: '#22d3ee' }, // Cyan
          { name: 'Cash', value: 15, color: '#94a3b8' }, // Slate
          { name: 'Gold', value: 5, color: '#eab308' }, // Yellow
        ];
      case 1: // Balanced
        return [
          { name: 'Stocks', value: 50, color: '#22d3ee' },
          { name: 'Bonds', value: 30, color: '#3b82f6' },
          { name: 'Real Estate', value: 10, color: '#8b5cf6' }, // Purple
          { name: 'Crypto', value: 5, color: '#f43f5e' }, // Rose
          { name: 'Cash', value: 5, color: '#94a3b8' },
        ];
      case 2: // Growth
        return [
          { name: 'Tech Stocks', value: 45, color: '#22d3ee' },
          { name: 'Global Stocks', value: 25, color: '#3b82f6' },
          { name: 'Crypto', value: 15, color: '#f43f5e' },
          { name: 'Real Estate', value: 10, color: '#8b5cf6' },
          { name: 'Cash', value: 5, color: '#94a3b8' },
        ];
      case 3: // Aggressive
        return [
          { name: 'Crypto', value: 40, color: '#f43f5e' },
          { name: 'Growth Stocks', value: 35, color: '#22d3ee' },
          { name: 'Venture / Alts', value: 20, color: '#a855f7' },
          { name: 'Cash', value: 5, color: '#94a3b8' },
        ];
      default:
        return [];
    }
  }, [riskLevel]);

  const profileInfo = useMemo(() => {
    switch (riskLevel) {
      case 0:
        return {
          desc: "Preservation of capital is the primary goal. Volatility is minimized.",
          icon: Shield,
          color: "text-blue-400"
        };
      case 1:
        return {
          desc: "A middle-ground approach seeking steady appreciation with moderate risk.",
          icon: Target,
          color: "text-green-400"
        };
      case 2:
        return {
          desc: "Focused on long-term capital appreciation. Higher volatility tolerance.",
          icon: TrendingUp,
          color: "text-accent-cyan"
        };
      case 3:
        return {
          desc: "Maximum growth potential through high-risk, high-reward assets.",
          icon: Zap,
          color: "text-accent-rose"
        };
      default:
        return { desc: "", icon: Target, color: "" };
    }
  }, [riskLevel]);

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Controls Side */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex items-center space-x-2 text-accent-cyan mb-4">
                 <PieIcon className="w-6 h-6" />
                 <span className="font-bold tracking-widest text-sm uppercase">Smart Allocation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                 Optimize your <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Exposure.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                 Our AI suggests the optimal asset mix based on your risk tolerance and financial horizon.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Risk Profile</span>
                  <div className={`px-4 py-1 rounded-full bg-white/5 border border-white/10 ${profileInfo.color} font-bold`}>
                     {currentProfile}
                  </div>
               </div>

               {/* Custom Range Slider */}
               <div className="relative h-12 flex items-center mb-8">
                  <div className="absolute w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-rose-500 transition-all duration-300"
                        style={{ width: `${(riskLevel / 3) * 100}%` }}
                     ></div>
                  </div>
                  <input 
                     type="range" 
                     min="0" 
                     max="3" 
                     step="1" 
                     value={riskLevel}
                     onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                     className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {/* Thumb Visual */}
                  <div 
                     className="absolute h-6 w-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-slate-900 transition-all duration-300 pointer-events-none"
                     style={{ left: `calc(${(riskLevel / 3) * 100}% - 12px)` }}
                  ></div>
               </div>

               <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${profileInfo.color}`}>
                     <profileInfo.icon className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-white font-bold text-sm mb-1">{currentProfile} Strategy</p>
                     <p className="text-slate-400 text-xs leading-relaxed">{profileInfo.desc}</p>
                  </div>
               </div>
            </div>
            
            <button className="w-full py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               Rebalance Portfolio
            </button>
          </div>

          {/* Chart Side */}
          <div className="flex-1 w-full flex flex-col items-center">
             <div className="relative w-full max-w-md aspect-square">
                {/* Chart Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-accent-purple/10 rounded-full blur-3xl scale-90"></div>
                
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                         data={allocationData}
                         cx="50%"
                         cy="50%"
                         innerRadius={80}
                         outerRadius={140}
                         paddingAngle={4}
                         dataKey="value"
                         stroke="none"
                         animationDuration={1000}
                      >
                         {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ 
                            backgroundColor: '#0f172a', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                         }}
                         itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                         formatter={(value: number) => [`${value}%`, '']}
                      />
                   </PieChart>
                </ResponsiveContainer>

                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Target</p>
                   <p className="text-3xl font-display font-bold text-white">100%</p>
                </div>
             </div>

             {/* Legend */}
             <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
                {allocationData.map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                         <div className="w-3 h-3 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                         <span className="text-sm font-medium text-slate-200">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold font-mono text-white">{item.value}%</span>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AssetAllocation;
