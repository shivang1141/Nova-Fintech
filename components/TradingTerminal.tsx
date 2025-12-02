import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Activity, Layers, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

// Mock data generation for sparklines
const generateSparkData = (points: number) => {
  let val = 50;
  return Array.from({ length: points }, (_, i) => {
    val += (Math.random() - 0.5) * 5;
    return { i, val };
  });
};

const PAIRS = [
  { pair: 'BTC/USD', price: '45,231.50', change: '+2.4%', high: true },
  { pair: 'ETH/USD', price: '2,891.12', change: '+1.8%', high: true },
  { pair: 'SOL/USD', price: '142.30', change: '-0.5%', high: false },
  { pair: 'AVAX/USD', price: '34.20', change: '+5.2%', high: true },
];

const ORDER_BOOK = Array.from({ length: 14 }).map((_, i) => ({
  price: (45230 + (i * 5) + Math.random() * 2).toFixed(2),
  size: (Math.random() * 2).toFixed(4),
  total: (Math.random() * 5).toFixed(4),
  type: i < 7 ? 'ask' : 'bid'
}));

const TradingTerminal: React.FC = () => {
  // Simulating live price updates
  const [currentPrice, setCurrentPrice] = useState(45231.50);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(p => p + (Math.random() - 0.5) * 10);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-end justify-between">
           <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                 Pro <span className="text-accent-cyan">Terminal</span>
              </h2>
              <p className="text-slate-400 max-w-xl">
                 Direct market access with institutional-grade latency. 
                 Customizable workspaces, depth charts, and algorithmic order types.
              </p>
           </div>
           <button className="hidden md:flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
              <Activity className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-bold text-white">Launch Demo</span>
           </button>
        </div>

        {/* Terminal Window */}
        <div className="w-full bg-[#050b14]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px] md:h-[600px]">
           
           {/* Sidebar: Market Pairs */}
           <div className="w-full md:w-64 border-r border-white/5 flex flex-col bg-[#050b14]/50">
              <div className="p-4 border-b border-white/5">
                 <input type="text" placeholder="Search Markets" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan" />
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                 {PAIRS.map((p, i) => (
                    <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-slate-200 group-hover:text-white">{p.pair}</span>
                          <span className={`text-xs font-mono ${p.high ? 'text-green-400' : 'text-red-400'}`}>{p.change}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">{p.price}</span>
                          <div className="w-16 h-8 opacity-50">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={generateSparkData(10)}>
                                   <Area type="monotone" dataKey="val" stroke={p.high ? '#4ade80' : '#f87171'} fill="transparent" strokeWidth={2} />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Main: Chart */}
           <div className="flex-1 flex flex-col border-r border-white/5 min-h-[300px]">
              {/* Toolbar */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 space-x-4">
                 <span className="font-bold text-white">BTC/USD</span>
                 <span className={`text-lg font-mono font-bold ${currentPrice > 45231 ? 'text-green-400' : 'text-red-400'}`}>
                    {currentPrice.toFixed(2)}
                 </span>
                 <div className="h-4 w-[1px] bg-white/10"></div>
                 <div className="flex space-x-2 text-xs text-slate-400">
                    <span className="hover:text-white cursor-pointer">15m</span>
                    <span className="text-white font-bold cursor-pointer">1H</span>
                    <span className="hover:text-white cursor-pointer">4H</span>
                    <span className="hover:text-white cursor-pointer">1D</span>
                 </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 bg-[#020617]/50 relative p-4">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateSparkData(50)}>
                       <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <YAxis domain={['auto', 'auto']} hide />
                       <Area 
                          type="monotone" 
                          dataKey="val" 
                          stroke="#06b6d4" 
                          strokeWidth={2} 
                          fill="url(#chartGradient)" 
                          isAnimationActive={false}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
                 
                 {/* Floating Trade Bubble Simulation */}
                 <div className="absolute top-1/3 left-1/2 flex items-center space-x-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="px-2 py-1 bg-white/10 backdrop-blur rounded text-xs text-white border border-white/10">
                       Executing...
                    </div>
                 </div>
              </div>
              
              {/* Order Controls */}
              <div className="h-16 border-t border-white/5 flex items-center px-6 justify-between bg-slate-900/50">
                 <div className="flex space-x-4">
                    <button className="px-6 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded hover:bg-green-500/30 font-bold text-sm">BUY</button>
                    <button className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 font-bold text-sm">SELL</button>
                 </div>
                 <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Layers className="w-4 h-4" />
                    <span>Open Orders: 0</span>
                 </div>
              </div>
           </div>

           {/* Right: Order Book */}
           <div className="w-full md:w-64 flex flex-col bg-[#050b14]/50 text-xs font-mono">
              <div className="p-3 border-b border-white/5 text-slate-400 flex justify-between">
                 <span>Price (USD)</span>
                 <span>Amount</span>
              </div>
              <div className="flex-1 overflow-hidden relative">
                 <div className="space-y-1 p-2">
                    {/* Asks */}
                    {ORDER_BOOK.filter(o => o.type === 'ask').reverse().map((o, i) => (
                       <div key={`ask-${i}`} className="flex justify-between items-center relative group">
                          <div className="absolute inset-0 bg-red-500/10 w-[40%] right-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-red-400 relative z-10">{o.price}</span>
                          <span className="text-slate-300 relative z-10">{o.size}</span>
                       </div>
                    ))}
                    
                    {/* Spread */}
                    <div className="py-2 flex items-center justify-center border-y border-white/5 my-2">
                       <span className="text-lg font-bold text-white">{currentPrice.toFixed(2)}</span>
                       <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                    </div>

                    {/* Bids */}
                    {ORDER_BOOK.filter(o => o.type === 'bid').map((o, i) => (
                       <div key={`bid-${i}`} className="flex justify-between items-center relative group">
                           <div className="absolute inset-0 bg-green-500/10 w-[60%] right-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-green-400 relative z-10">{o.price}</span>
                          <span className="text-slate-300 relative z-10">{o.size}</span>
                       </div>
                    ))}
                 </div>
              </div>
              
              {/* Recent Trades Stream */}
              <div className="h-32 border-t border-white/5 p-2 bg-slate-900/50">
                 <p className="text-slate-500 mb-2 flex items-center"><Clock className="w-3 h-3 mr-1" /> Recent Trades</p>
                 <div className="space-y-1">
                    {[1,2,3].map((_, i) => (
                       <div key={i} className="flex justify-between text-slate-400 animate-pulse">
                          <span>{new Date().toLocaleTimeString()}</span>
                          <span className={i % 2 === 0 ? 'text-green-400' : 'text-red-400'}>{i % 2 === 0 ? 'Buy' : 'Sell'}</span>
                          <span>{(Math.random()).toFixed(4)}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default TradingTerminal;