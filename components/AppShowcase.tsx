import React from 'react';
import { TrendingUp, Wallet, Bell, Activity, ArrowUpRight } from 'lucide-react';

const AppShowcase: React.FC = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
       {/* Background Beams */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-purple/5 rounded-full blur-[100px]"></div>
       </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Your Entire Net Worth. <br />
            <span className="text-gradient-accent">Pocket Sized.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
             Monitor stocks, crypto, and real-world assets in one unified dashboard. 
             Experience the first financial app that feels as fast as thought.
          </p>
          
          <div className="space-y-4">
             {[
                { title: 'Real-time Sync', desc: 'Updates across all devices instantly.' },
                { title: 'AI Predictions', desc: 'Proprietary algorithms forecast movement.' },
                { title: 'Biometric Lock', desc: 'FaceID and fingerprint secured.' }
             ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-accent-cyan" />
                   </div>
                   <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex-1 relative flex justify-center perspective-1000">
           <div className="relative w-[300px] md:w-[350px] h-[700px] bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out z-10">
              
              {/* Phone Notch/Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-950 z-20 flex justify-center">
                 <div className="w-32 h-6 bg-slate-900 rounded-b-xl"></div>
              </div>

              {/* Screen Content */}
              <div className="h-full w-full bg-slate-900 flex flex-col text-white pt-10 px-6 relative">
                 {/* App Header */}
                 <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-2">
                       <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                       <span className="font-medium text-sm">Hello, Alex</span>
                    </div>
                    <Bell className="w-5 h-5 text-slate-400" />
                 </div>

                 {/* Balance Card */}
                 <div className="bg-gradient-to-br from-accent-purple to-indigo-600 rounded-2xl p-6 mb-6 shadow-lg shadow-purple-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-purple-100 text-xs font-medium mb-1">Total Balance</p>
                    <h3 className="text-3xl font-bold mb-4">$124,592.00</h3>
                    <div className="flex items-center space-x-2 bg-white/20 self-start px-2 py-1 rounded-lg backdrop-blur-md w-fit">
                       <TrendingUp className="w-3 h-3 text-white" />
                       <span className="text-xs font-bold">+12.4%</span>
                    </div>
                 </div>

                 {/* Quick Actions */}
                 <div className="flex justify-between mb-8">
                    {['Send', 'Receive', 'Swap', 'More'].map((action, i) => (
                       <div key={i} className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                             <ArrowUpRight className="w-5 h-5 text-accent-cyan" />
                          </div>
                          <span className="text-xs text-slate-400">{action}</span>
                       </div>
                    ))}
                 </div>

                 {/* Assets List */}
                 <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="font-bold">Assets</h4>
                       <span className="text-xs text-accent-purple">View All</span>
                    </div>
                    
                    <div className="space-y-4">
                       {[
                          { name: 'Bitcoin', ticker: 'BTC', price: '$45,230', change: '+2.4%', color: 'bg-orange-500' },
                          { name: 'Ethereum', ticker: 'ETH', price: '$2,890', change: '+1.8%', color: 'bg-purple-500' },
                          { name: 'Solana', ticker: 'SOL', price: '$140', change: '-0.5%', color: 'bg-teal-500' },
                          { name: 'Cardano', ticker: 'ADA', price: '$0.55', change: '+5.2%', color: 'bg-blue-500' },
                       ].map((asset, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                             <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full ${asset.color} bg-opacity-20 flex items-center justify-center`}>
                                   <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                                </div>
                                <div>
                                   <p className="font-bold text-sm">{asset.name}</p>
                                   <p className="text-xs text-slate-500">{asset.ticker}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="font-bold text-sm">{asset.price}</p>
                                <p className={`text-xs ${asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{asset.change}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 {/* Bottom Nav Mock */}
                 <div className="absolute bottom-4 left-6 right-6 h-14 bg-slate-800/80 backdrop-blur-md rounded-2xl flex justify-around items-center px-4">
                    <div className="w-8 h-1 bg-white rounded-full opacity-50 absolute bottom-2 left-1/2 -translate-x-1/2"></div>
                    <Wallet className="w-5 h-5 text-white" />
                    <Activity className="w-5 h-5 text-slate-500" />
                    <Bell className="w-5 h-5 text-slate-500" />
                 </div>

              </div>
           </div>
           
           {/* Phone Shadow */}
           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/50 blur-xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;