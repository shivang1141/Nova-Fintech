import React, { useState, useMemo } from 'react';
import { Gauge, Info, TrendingUp, AlertTriangle, Check } from 'lucide-react';

const CreditScoreSimulator: React.FC = () => {
  // State for inputs
  const [paymentHistory, setPaymentHistory] = useState(98);
  const [utilization, setUtilization] = useState(15);
  const [creditAge, setCreditAge] = useState(4);
  const [totalAccounts, setTotalAccounts] = useState(8);
  const [inquiries, setInquiries] = useState(1);

  // Calculate Score (Simplified Simulation Logic)
  // FICO Range: 300 - 850 (Spread: 550)
  const scoreData = useMemo(() => {
    // 1. Payment History (35% weight) ~ 192.5 pts max
    const scorePayment = (paymentHistory / 100) * 192.5;

    // 2. Utilization (30% weight) ~ 165 pts max (Lower is better)
    // Non-linear penalty for high utilization
    let utilFactor = 1;
    if (utilization > 80) utilFactor = 0.2;
    else if (utilization > 50) utilFactor = 0.5;
    else if (utilization > 30) utilFactor = 0.7;
    else if (utilization > 10) utilFactor = 0.9;
    else utilFactor = 1;
    const scoreUtil = utilFactor * 165;

    // 3. Length of History (15% weight) ~ 82.5 pts max
    // Cap at 15 years for max points
    const scoreAge = Math.min(creditAge / 15, 1) * 82.5;

    // 4. Credit Mix (10% weight) ~ 55 pts max
    // Cap at 15 accounts
    const scoreMix = Math.min(totalAccounts / 15, 1) * 55;

    // 5. New Credit (10% weight) ~ 55 pts max
    // Penalty for inquiries
    const inquiryPenalty = inquiries * 8; 
    const scoreNew = Math.max(0, 55 - inquiryPenalty);

    const calculatedScore = Math.round(300 + scorePayment + scoreUtil + scoreAge + scoreMix + scoreNew);
    
    // Determine Band
    let band = "Poor";
    let color = "#ef4444"; // red-500
    if (calculatedScore >= 580) { band = "Fair"; color = "#eab308"; } // yellow-500
    if (calculatedScore >= 670) { band = "Good"; color = "#22d3ee"; } // cyan-400
    if (calculatedScore >= 740) { band = "Very Good"; color = "#818cf8"; } // indigo-400
    if (calculatedScore >= 800) { band = "Excellent"; color = "#10b981"; } // emerald-500

    return { score: calculatedScore, band, color };
  }, [paymentHistory, utilization, creditAge, totalAccounts, inquiries]);

  // Generate Tips
  const tips = useMemo(() => {
    const t = [];
    if (utilization > 30) t.push({ text: "Lower credit utilization below 30% for a significant score boost.", icon: AlertTriangle, color: "text-yellow-400" });
    if (paymentHistory < 100) t.push({ text: "Missed payments stay on your report for 7 years. Aim for 100%.", icon: AlertTriangle, color: "text-red-400" });
    if (inquiries > 2) t.push({ text: "Avoid opening too many new accounts in a short period.", icon: Info, color: "text-blue-400" });
    if (t.length === 0) t.push({ text: "Your credit profile is optimized! Keep maintaining these habits.", icon: Check, color: "text-green-400" });
    return t;
  }, [utilization, paymentHistory, inquiries]);

  // Gauge Calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((scoreData.score - 300) / 550) * circumference;

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-accent-purple mb-4">
               <Gauge className="w-6 h-6" />
               <span className="font-bold tracking-widest text-sm uppercase">Credit Simulator</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
               Master your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Reputation.</span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-xl">
               See how financial decisions impact your creditworthiness before you make them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Left: Inputs */}
           <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
              
              {/* Payment History */}
              <div>
                 <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-300">Payment History</label>
                    <span className={`text-sm font-mono font-bold ${paymentHistory === 100 ? 'text-green-400' : 'text-yellow-400'}`}>{paymentHistory}%</span>
                 </div>
                 <input 
                    type="range" min="0" max="100" step="1" 
                    value={paymentHistory} onChange={(e) => setPaymentHistory(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                 />
                 <p className="text-xs text-slate-500 mt-2">Percentage of on-time payments (High Impact)</p>
              </div>

              {/* Utilization */}
              <div>
                 <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-300">Credit Utilization</label>
                    <span className={`text-sm font-mono font-bold ${utilization < 30 ? 'text-green-400' : 'text-red-400'}`}>{utilization}%</span>
                 </div>
                 <input 
                    type="range" min="0" max="100" step="1" 
                    value={utilization} onChange={(e) => setUtilization(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                 />
                 <p className="text-xs text-slate-500 mt-2">Ratio of debt to credit limit (High Impact)</p>
              </div>

              {/* Credit Age */}
              <div>
                 <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-300">Credit Age (Years)</label>
                    <span className="text-sm font-mono font-bold text-slate-200">{creditAge} Years</span>
                 </div>
                 <input 
                    type="range" min="0" max="25" step="0.5" 
                    value={creditAge} onChange={(e) => setCreditAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                 />
                 <p className="text-xs text-slate-500 mt-2">Average age of open accounts (Medium Impact)</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {/* Total Accounts */}
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className="text-sm font-bold text-slate-300">Total Accounts</label>
                       <span className="text-sm font-mono font-bold text-slate-200">{totalAccounts}</span>
                    </div>
                    <input 
                       type="range" min="0" max="30" step="1" 
                       value={totalAccounts} onChange={(e) => setTotalAccounts(Number(e.target.value))}
                       className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>

                 {/* Hard Inquiries */}
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className="text-sm font-bold text-slate-300">Hard Inquiries</label>
                       <span className={`text-sm font-mono font-bold ${inquiries === 0 ? 'text-green-400' : 'text-slate-200'}`}>{inquiries}</span>
                    </div>
                    <input 
                       type="range" min="0" max="10" step="1" 
                       value={inquiries} onChange={(e) => setInquiries(Number(e.target.value))}
                       className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>
              </div>
           </div>

           {/* Right: Visualization & Tips */}
           <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Score Gauge Card */}
              <div className="glass-card-strong p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                 
                 {/* SVG Gauge */}
                 <div className="relative w-64 h-64">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                       <circle
                          cx="50%" cy="50%" r={radius}
                          fill="transparent"
                          stroke="#1e293b"
                          strokeWidth="12"
                          strokeLinecap="round"
                       />
                       {/* Progress Circle */}
                       <circle
                          cx="50%" cy="50%" r={radius}
                          fill="transparent"
                          stroke={scoreData.color}
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          className="transition-all duration-1000 ease-out"
                       />
                    </svg>
                    
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-6xl font-display font-bold text-white tracking-tighter animate-in fade-in zoom-in duration-500" key={scoreData.score}>
                          {scoreData.score}
                       </span>
                       <span className="text-lg font-medium" style={{ color: scoreData.color }}>
                          {scoreData.band}
                       </span>
                    </div>
                 </div>

                 <div className="mt-4 flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-300">National Average: 714</span>
                 </div>
              </div>

              {/* Dynamic Tips */}
              <div className="bg-slate-900/50 rounded-3xl p-6 border border-white/5">
                 <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Optimization Tips</h4>
                 <div className="space-y-4">
                    {tips.map((tip, idx) => (
                       <div key={idx} className="flex items-start space-x-3 animate-in slide-in-from-right-4 duration-500">
                          <div className={`mt-0.5 p-1 rounded-full bg-white/5 ${tip.color}`}>
                             <tip.icon className="w-4 h-4" />
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                             {tip.text}
                          </p>
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

export default CreditScoreSimulator;
