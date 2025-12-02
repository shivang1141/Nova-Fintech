import React from 'react';
import { Terminal, Copy, ExternalLink, Code2 } from 'lucide-react';

const DeveloperApi: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0F19] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold mb-6">
             <Code2 className="w-4 h-4" />
             <span>DEVELOPER FIRST</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Build on </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-pink-500">Solid Ground.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Our REST API and SDKs enable you to embed financial services into your product in minutes. 
            Robust, documented, and sandboxed.
          </p>
        </div>

        {/* IDE Window */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0F1420]">
           
           {/* Left: Code Editor */}
           <div className="p-0 flex flex-col min-h-[400px] border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Tabs */}
              <div className="flex items-center bg-[#0B0F19] border-b border-white/5">
                 <div className="px-4 py-3 text-xs font-mono text-white border-t-2 border-accent-purple bg-[#0F1420]">create_payment.js</div>
                 <div className="px-4 py-3 text-xs font-mono text-slate-500 hover:bg-white/5 cursor-pointer">config.json</div>
              </div>
              
              {/* Code */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div className="text-slate-400">
                    <span className="text-purple-400">const</span> nova <span className="text-purple-400">=</span> <span className="text-yellow-300">require</span>(<span className="text-green-400">'nova-sdk'</span>);<br /><br />
                    
                    <span className="text-slate-500">// Initialize instant transfer</span><br />
                    <span className="text-purple-400">const</span> payment <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> nova.transfers.<span className="text-blue-400">create</span>({'{'}<br />
                    &nbsp;&nbsp;amount: <span className="text-orange-400">500000</span>,<br />
                    &nbsp;&nbsp;currency: <span className="text-green-400">'USD'</span>,<br />
                    &nbsp;&nbsp;destination: <span className="text-green-400">'acct_24bf9...'</span>,<br />
                    &nbsp;&nbsp;settlement: <span className="text-green-400">'instant'</span><br />
                    {'}'});<br /><br />
                    
                    console.<span className="text-blue-400">log</span>(payment.status);
                 </div>
                 <div className="mt-4 animate-pulse inline-block w-2 h-4 bg-accent-purple"></div>
              </div>
           </div>

           {/* Right: Response / Terminal */}
           <div className="bg-[#05080F] flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0F19]">
                 <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-mono text-slate-400">Webhook Listener</span>
                 </div>
                 <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-green-500 font-bold">LIVE</span>
                 </div>
              </div>

              <div className="p-6 font-mono text-xs space-y-4">
                 <div className="flex space-x-2">
                    <span className="text-slate-500">14:02:41</span>
                    <span className="text-green-400">POST /v1/webhooks/transfers</span>
                    <span className="text-white px-1.5 rounded bg-green-500/20">200 OK</span>
                 </div>
                 <div className="pl-20 text-slate-300 border-l border-white/10 ml-2.5">
                    {'{'}<br />
                    &nbsp;&nbsp;"id": "tr_92837492",<br />
                    &nbsp;&nbsp;"status": "completed",<br />
                    &nbsp;&nbsp;"settled_at": "2024-03-15T14:02:41Z",<br />
                    &nbsp;&nbsp;"fee": 0.00<br />
                    {'}'}
                 </div>

                 <div className="flex space-x-2 opacity-50">
                    <span className="text-slate-500">14:02:38</span>
                    <span className="text-blue-400">GET /v1/accounts/acct_24bf9</span>
                    <span className="text-white px-1.5 rounded bg-green-500/20">200 OK</span>
                 </div>
              </div>

              <div className="mt-auto p-6 border-t border-white/5">
                 <button className="flex items-center space-x-2 text-sm font-bold text-white hover:text-accent-purple transition-colors">
                    <span>Read Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default DeveloperApi;