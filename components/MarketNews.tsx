import React, { useState, useEffect } from 'react';
import { Newspaper, Bot, RefreshCw, ExternalLink, TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';
import { generateFinancialInsight } from '../services/geminiService';

const NEWS_ITEMS = [
  {
    id: 1,
    source: "Bloomberg",
    title: "Fed Signals Rate Cuts Possible in Q3 as Inflation Cools to 2.8%",
    category: "Macro",
    time: "2h ago",
    sentiment: "positive",
    impact: "High"
  },
  {
    id: 2,
    source: "CoinDesk",
    title: "Bitcoin Breaks $70k Resistance on Institutional ETF Inflows",
    category: "Crypto",
    time: "3h ago",
    sentiment: "positive",
    impact: "High"
  },
  {
    id: 3,
    source: "TechCrunch",
    title: "NVIDIA Reveals New 'Blackwell' AI Chip, Promising 30x Performance",
    category: "Tech",
    time: "5h ago",
    sentiment: "positive",
    impact: "Medium"
  },
  {
    id: 4,
    source: "Reuters",
    title: "EU Regulators Open Anti-Trust Probe into Big Tech Cloud Providers",
    category: "Regulation",
    time: "7h ago",
    sentiment: "negative",
    impact: "Medium"
  }
];

const MarketNews: React.FC = () => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const generateBrief = async () => {
    setLoading(true);
    const headlines = NEWS_ITEMS.map(i => i.title).join(". ");
    const prompt = `
      Act as a senior financial analyst. 
      Analyze the following headlines for a user with a portfolio heavy in Tech and Crypto: 
      "${headlines}"
      Provide a concise 2-3 sentence executive summary of the market sentiment and a potential strategic move. 
      Do not use bullet points. Be professional and futuristic.
    `;

    try {
      const result = await generateFinancialInsight(prompt);
      setSummary(result);
    } catch (e) {
      setSummary("Unable to establish uplink with Nova Core. Displaying raw feed only.");
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    generateBrief();
  }, []);

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
             <div className="flex items-center space-x-2 text-accent-cyan mb-4">
                <Newspaper className="w-6 h-6" />
                <span className="font-bold tracking-widest text-sm uppercase">Market Intelligence</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pulse.</span>
             </h2>
             <p className="text-slate-400 text-lg mt-4 max-w-xl">
                Real-time news aggregation processed by Nova AI to filter noise and highlight signal.
             </p>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs text-slate-300 font-mono">LIVE FEED ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: News Feed */}
           <div className="lg:col-span-2 space-y-4">
              {NEWS_ITEMS.map((item) => (
                 <div key={item.id} className="group glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center space-x-3">
                          <span className="text-xs font-bold text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded uppercase tracking-wider">{item.source}</span>
                          <span className="text-xs text-slate-500 flex items-center">
                             {item.time} • <span className="text-slate-400 ml-1">{item.category}</span>
                          </span>
                       </div>
                       <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors cursor-pointer" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">
                       {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                       <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                             {item.sentiment === 'positive' ? <TrendingUp className="w-4 h-4 text-green-400" /> : 
                              item.sentiment === 'negative' ? <TrendingDown className="w-4 h-4 text-red-400" /> : 
                              <Minus className="w-4 h-4 text-slate-400" />}
                             <span className={`text-sm font-medium ${
                                item.sentiment === 'positive' ? 'text-green-400' : 
                                item.sentiment === 'negative' ? 'text-red-400' : 'text-slate-400'
                             }`}>
                                {item.sentiment === 'positive' ? 'Bullish' : item.sentiment === 'negative' ? 'Bearish' : 'Neutral'}
                             </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                             <Zap className={`w-4 h-4 ${item.impact === 'High' ? 'text-yellow-400' : 'text-slate-600'}`} />
                             <span className="text-sm text-slate-400">Impact: <span className="text-white">{item.impact}</span></span>
                          </div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* Right: AI Synthesis */}
           <div className="lg:col-span-1">
              <div className="sticky top-24">
                 <div className="glass-card-strong rounded-3xl p-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/20 to-transparent opacity-50 pointer-events-none"></div>
                    <div className="bg-slate-900/90 rounded-[20px] p-6 relative z-10 h-full min-h-[400px] flex flex-col">
                       
                       <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                             <Bot className="w-5 h-5 text-accent-purple" />
                             <span className="font-bold text-white text-sm">NOVA SYNTHESIS</span>
                          </div>
                          <button 
                             onClick={generateBrief}
                             disabled={loading}
                             className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                          >
                             <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
                          </button>
                       </div>

                       <div className="flex-1">
                          {loading ? (
                             <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                <div className="h-4 bg-white/10 rounded w-full"></div>
                                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                <div className="h-32 bg-accent-purple/5 rounded border border-accent-purple/10 mt-8 flex items-center justify-center">
                                   <span className="text-xs text-accent-purple font-mono animate-pulse">ANALYZING MARKET VECTOR...</span>
                                </div>
                             </div>
                          ) : (
                             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <p className="text-slate-300 leading-relaxed text-sm mb-6">
                                   {summary}
                                </p>
                                
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                   <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Portfolio Implications</p>
                                   <div className="flex flex-wrap gap-2">
                                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Tech: Overweight</span>
                                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded border border-yellow-500/20">Cash: Hold</span>
                                      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">Crypto: Accumulate</span>
                                   </div>
                                </div>
                             </div>
                          )}
                       </div>

                       <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                          <span className="text-[10px] text-slate-600 font-mono">MODEL: GEMINI-2.5-FLASH</span>
                          <span className="text-[10px] text-slate-600 font-mono">UPDATED: {lastUpdated.toLocaleTimeString()}</span>
                       </div>

                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default MarketNews;
