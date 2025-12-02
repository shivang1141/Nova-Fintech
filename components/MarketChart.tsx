import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartTimeframe } from '../types';

const data = [
  { name: '00:00', value: 4000 },
  { name: '04:00', value: 3000 },
  { name: '08:00', value: 5000 },
  { name: '12:00', value: 2780 },
  { name: '16:00', value: 5890 },
  { name: '20:00', value: 6390 },
  { name: '24:00', value: 7490 },
];

const MarketChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChartTimeframe>(ChartTimeframe.WEEK);

  return (
    <section id="chart" className="py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Market <span className="text-accent-cyan">Velocity</span></h2>
             <p className="text-slate-400">Live liquidity flow across the NOVA Network.</p>
          </div>
          
          <div className="flex space-x-1 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md mt-6 md:mt-0">
            {Object.values(ChartTimeframe).map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTab(tf)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tf 
                    ? 'bg-slate-700 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[500px] glass-card-strong rounded-3xl p-1 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
          
          <div className="w-full h-full p-6 bg-slate-900/50 rounded-[20px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  stroke="#475569" 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#020617', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#22d3ee' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22d3ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Floating Stats */}
          <div className="absolute top-10 left-10 z-10">
            <div className="flex items-baseline space-x-2">
               <h3 className="text-4xl font-bold text-white">$45,234.92</h3>
               <span className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-full">+2.4%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-1">BTC / USD</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChart;