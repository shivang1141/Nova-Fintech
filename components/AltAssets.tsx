
import React from 'react';
import { Building2, Palette, Wine, Gem, ArrowUpRight, Users, Clock } from 'lucide-react';

const ASSETS = [
  {
    id: 1,
    category: 'Real Estate',
    name: 'The SoHo Loft Collection',
    location: 'New York, NY',
    apy: '12.4%',
    minInvest: '$50',
    funded: 84,
    imageGradient: 'from-orange-900 to-slate-900',
    icon: Building2
  },
  {
    id: 2,
    category: 'Fine Art',
    name: 'Banksy - "Love is in the Air"',
    location: 'London, UK',
    apy: '18.2%',
    minInvest: '$100',
    funded: 62,
    imageGradient: 'from-purple-900 to-slate-900',
    icon: Palette
  },
  {
    id: 3,
    category: 'Vintage Wine',
    name: 'Romance Conti 1990',
    location: 'Burgundy, FR',
    apy: '15.8%',
    minInvest: '$25',
    funded: 91,
    imageGradient: 'from-red-900 to-slate-900',
    icon: Wine
  },
  {
    id: 4,
    category: 'Luxury Goods',
    name: '1965 Shelby Cobra',
    location: 'Los Angeles, CA',
    apy: '22.1%',
    minInvest: '$500',
    funded: 45,
    imageGradient: 'from-blue-900 to-slate-900',
    icon: Gem
  }
];

const AltAssets: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-6">
                 <Gem className="w-4 h-4" />
                 <span>PRIVATE MARKETS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                 Access the <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Unreachable.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                 Fractional ownership in blue-chip alternative assets. 
                 Diversify beyond stocks with institutional-grade investments previously reserved for the ultra-wealthy.
              </p>
           </div>
           
           <button className="flex items-center space-x-2 text-white font-bold hover:text-purple-400 transition-colors group">
              <span>View All Offerings</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {ASSETS.map((asset) => (
              <div key={asset.id} className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2">
                 
                 {/* Image Area */}
                 <div className={`h-48 bg-gradient-to-br ${asset.imageGradient} relative p-6 flex flex-col justify-between`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                       <div className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                          {asset.category}
                       </div>
                       <asset.icon className="w-5 h-5 text-white/70" />
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{asset.name}</h3>
                    <p className="text-xs text-slate-500 mb-6 flex items-center">
                       <Users className="w-3 h-3 mr-1" /> {asset.location}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-4">
                       <div>
                          <p className="text-slate-500 text-[10px] uppercase font-bold">Target APY</p>
                          <p className="text-green-400 font-mono font-bold">{asset.apy}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-slate-500 text-[10px] uppercase font-bold">Min Invest</p>
                          <p className="text-white font-mono font-bold">{asset.minInvest}</p>
                       </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Funded</span>
                          <span className="text-white font-bold">{asset.funded}%</span>
                       </div>
                       <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                             className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                             style={{ width: `${asset.funded}%` }}
                          ></div>
                       </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 12 days left</span>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default AltAssets;
