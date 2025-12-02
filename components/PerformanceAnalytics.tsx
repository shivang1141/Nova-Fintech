import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Info, Activity, ArrowDownRight } from 'lucide-react';

type Timeframe = '1M' | '3M' | '6M' | 'YTD' | '1Y' | 'ALL';

// Hook for counting up numbers
const useCountUp = (end: number, duration: number = 2000, decimals: number = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      setCount(end * ease(percentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count.toFixed(decimals);
};

const PerformanceAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');

  // Mock Data Generators for different timeframes
  const getData = (tf: Timeframe) => {
    const points = tf === '1M' ? 30 : tf === '1Y' ? 12 : 20;
    const data = [];
    let portfolioVal = 100;
    let benchmarkVal = 100;

    for (let i = 0; i <= points; i++) {
      // Random walk simulation
      portfolioVal *= (1 + (Math.random() * 0.08 - 0.03)); 
      benchmarkVal *= (1 + (Math.random() * 0.04 - 0.015)); // Benchmark is less volatile

      data.push({
        name: i.toString(),
        Portfolio: parseFloat(portfolioVal.toFixed(2)),
        Benchmark: parseFloat(benchmarkVal.toFixed(2)),
      });
    }
    return data;
  };

  const data = getData(timeframe);
  
  // Static targets for animation
  const targets = {
    totalReturn: timeframe === '1M' ? 4.2 : timeframe === '1Y' ? 28.5 : 12.4,
    alpha: 3.42,
    beta: 1.15,
    sharpe: 2.1,
    drawdown: -8.4
  };

  // Animated values
  const alphaDisplay = useCountUp(targets.alpha);
  const betaDisplay = useCountUp(targets.beta);
  const sharpeDisplay = useCountUp(targets.sharpe);
  const drawdownDisplay = useCountUp(Math.abs(targets.drawdown)); // Animate absolute value
  const totalReturnDisplay = useCountUp(targets.totalReturn, 1500, 1);

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-fade-in-up">
          <div>
            <div className="flex items-center space-x-2 text-accent-cyan mb-4">
               <Activity className="w-6 h-6" />
               <span className="font-bold tracking-widest text-sm uppercase">Quant Analytics</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
               Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Attribution.</span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-xl">
               Deep-dive into your risk-adjusted returns. Compare your strategy against global benchmarks.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            {(['1M', '3M', '6M', 'YTD', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* Chart Section */}
           <div className="lg:col-span-3 glass-card-strong rounded-3xl p-1 border border-white/10 relative overflow-hidden h-[500px] animate-fade-in-up animate-delay-100">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              <div className="bg-slate-900/50 w-full h-full rounded-[20px] p-6">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Return ({timeframe})</p>
                       <div className="flex items-baseline space-x-3">
                          <h3 className="text-3xl font-mono font-bold text-white">+{totalReturnDisplay}%</h3>
                          <span className="text-xs text-slate-500 font-mono">vs Benchmark</span>
                       </div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-accent-cyan"></div>
                          <span className="text-xs font-bold text-white">Nova Portfolio</span>
                       </div>
                       <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                          <span className="text-xs font-bold text-slate-400">S&P 500</span>
                       </div>
                    </div>
                 </div>

                 <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                       <XAxis dataKey="name" hide />
                       <YAxis 
                          domain={['auto', 'auto']} 
                          tickFormatter={(val) => `${val}%`}
                          stroke="#475569"
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                       />
                       <Tooltip 
                          contentStyle={{ 
                             backgroundColor: '#0f172a', 
                             border: '1px solid rgba(255,255,255,0.1)',
                             borderRadius: '12px',
                             boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' 
                          }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="Portfolio" 
                          stroke="#22d3ee" 
                          strokeWidth={3} 
                          fill="url(#colorPortfolio)" 
                          animationDuration={2000}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="Benchmark" 
                          stroke="#64748b" 
                          strokeWidth={2} 
                          strokeDasharray="5 5"
                          fill="transparent" 
                          animationDuration={2000}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="space-y-4">
              
              {/* Alpha */}
              <div className="group bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-colors relative overflow-hidden animate-fade-in-up animate-delay-200">
                 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-4 h-4 text-slate-500" />
                 </div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Alpha</p>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-green-400">+{alphaDisplay}</span>
                    <TrendingUp className="w-6 h-6 text-green-500/50 mb-1 group-hover:scale-110 transition-transform" />
                 </div>
                 <p className="text-xs text-slate-600 mt-2">Excess return vs Benchmark</p>
              </div>

              {/* Beta */}
              <div className="group bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-colors relative overflow-hidden animate-fade-in-up animate-delay-300">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Beta</p>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-white">{betaDisplay}</span>
                    <Activity className="w-6 h-6 text-purple-500/50 mb-1 group-hover:scale-110 transition-transform" />
                 </div>
                 <p className="text-xs text-slate-600 mt-2">
                    {targets.beta > 1 ? 'Higher volatility than market' : 'Lower volatility than market'}
                 </p>
              </div>

              {/* Sharpe Ratio */}
              <div className="group bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-colors relative overflow-hidden animate-fade-in-up animate-delay-400">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Sharpe Ratio</p>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-accent-cyan">{sharpeDisplay}</span>
                    <div className="h-2 w-12 bg-slate-700 rounded-full overflow-hidden mb-2">
                       <div className="h-full bg-accent-cyan w-[80%] animate-pulse"></div>
                    </div>
                 </div>
                 <p className="text-xs text-slate-600 mt-2">Excellent risk-adjusted return</p>
              </div>

              {/* Max Drawdown */}
              <div className="group bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors relative overflow-hidden animate-fade-in-up animate-delay-500">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Max Drawdown</p>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-red-400">-{drawdownDisplay}%</span>
                    <ArrowDownRight className="w-6 h-6 text-red-500/50 mb-1 group-hover:scale-110 transition-transform" />
                 </div>
                 <p className="text-xs text-slate-600 mt-2">Peak to trough decline</p>
              </div>

           </div>

        </div>
      </div>
    </section>
  );
};

export default PerformanceAnalytics;