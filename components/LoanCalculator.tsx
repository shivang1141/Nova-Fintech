import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(3); // Years

  const calculations = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    
    // Monthly Payment Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - amount;

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    };
  }, [amount, rate, term]);

  const chartData = [
    { name: 'Principal', value: amount },
    { name: 'Total Interest', value: calculations.totalInterest },
  ];

  const COLORS = ['#22d3ee', '#f43f5e']; // Cyan for Principal, Rose for Interest

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-accent-cyan mb-4">
            <Calculator className="w-6 h-6" />
            <span className="font-bold tracking-widest text-sm uppercase">Smart Lending</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Plan your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">leverage.</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl">
            Simulate mortgage, auto, or personal loan scenarios with our real-time amortization engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
            
            {/* Amount Input */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <DollarSign className="w-4 h-4 text-accent-cyan" />
                  <span>Loan Amount</span>
                </label>
                <div className="bg-slate-900 px-3 py-1 rounded-lg border border-white/10 text-white font-mono">
                  ${amount.toLocaleString()}
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>$1K</span>
                <span>$1M</span>
              </div>
            </div>

            {/* Interest Rate Input */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <Percent className="w-4 h-4 text-accent-rose" />
                  <span>Interest Rate (APR)</span>
                </label>
                <div className="bg-slate-900 px-3 py-1 rounded-lg border border-white/10 text-white font-mono">
                  {rate}%
                </div>
              </div>
              <input
                type="range"
                min="0.1"
                max="15"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>0.1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Term Input */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Loan Term</span>
                </label>
                <div className="bg-slate-900 px-3 py-1 rounded-lg border border-white/10 text-white font-mono">
                  {term} Years
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Visualization */}
          <div className="flex flex-col space-y-6">
            
            {/* Results Cards */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-cyan/20 transition-colors"></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Monthly Payment</p>
                  <p className="text-3xl font-mono font-bold text-white group-hover:scale-105 transition-transform origin-left">
                    ${calculations.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
               </div>
               <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-rose/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-rose/20 transition-colors"></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Interest</p>
                  <p className="text-3xl font-mono font-bold text-accent-rose group-hover:scale-105 transition-transform origin-left">
                    ${calculations.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
               </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 glass-card-strong rounded-3xl p-6 border border-white/10 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
               
               <div className="w-full h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                       >
                          {chartData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip 
                          contentStyle={{ 
                             backgroundColor: '#0f172a', 
                             border: '1px solid rgba(255,255,255,0.1)',
                             borderRadius: '12px',
                             color: '#fff'
                          }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                       />
                    </PieChart>
                 </ResponsiveContainer>
               </div>

               {/* Center Text in Donut */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Cost</p>
                  <p className="text-xl font-bold text-white">
                    ${calculations.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
               </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-8">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-accent-cyan"></div>
                  <span className="text-sm text-slate-300">Principal</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-accent-rose"></div>
                  <span className="text-sm text-slate-300">Interest</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;