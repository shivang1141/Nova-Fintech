import React, { useState, useEffect } from 'react';
import { Scan, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

const IdentityVerification: React.FC = () => {
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div>
          <div className="flex items-center space-x-2 text-accent-cyan mb-6">
             <Scan className="w-5 h-5" />
             <span className="text-sm font-bold tracking-widest uppercase">Nova Identity™</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Onboarding in <br />
            <span className="text-white">Seconds, Not Days.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Our proprietary AI verification engine handles KYC/AML compliance instantly. 
            Reduce drop-offs by 85% with our frictionless biometric authentication flow.
          </p>
          
          <div className="space-y-4">
            {[
              "Liveness Detection",
              "Global Document Support (190+ Countries)",
              "Sanctions Screening",
              "Fraud Pattern Recognition"
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="relative flex justify-center">
           {/* Glow behind */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-3xl"></div>

           {/* Scanner Frame */}
           <div className="relative w-[320px] h-[480px] rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-2xl">
              
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 flex items-center justify-between px-6 z-20 bg-slate-900/90">
                <span className="text-xs font-mono text-slate-400">ID_VERIFICATION_V2</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Body */}
              <div className="w-full h-full pt-20 pb-8 px-6 flex flex-col items-center justify-center relative">
                 
                 {/* User Avatar Placeholder */}
                 <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-8 relative">
                    <UserCheck className={`w-12 h-12 transition-colors duration-500 ${scanStep >= 2 ? 'text-accent-cyan' : 'text-slate-600'}`} />
                    
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border border-accent-cyan/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-[-10px] border border-accent-purple/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>

                    {/* Scanning Beam */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-cyan shadow-[0_0_15px_rgba(34,211,238,1)] animate-scan-line opacity-80"></div>
                 </div>

                 {/* Status Messages */}
                 <div className="space-y-3 w-full">
                    {[
                      { label: "Scanning Document...", active: scanStep === 0 },
                      { label: "Biometric Analysis...", active: scanStep === 1 },
                      { label: "Checking Databases...", active: scanStep === 2 },
                      { label: "Verified Successfully", active: scanStep === 3, final: true }
                    ].map((step, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${
                           step.active || (step.final && scanStep === 3)
                            ? 'bg-accent-cyan/10 border-accent-cyan/30 scale-105 shadow-lg' 
                            : 'bg-white/5 border-transparent opacity-50'
                        }`}
                      >
                         <span className={`text-xs font-mono ${step.final && step.active ? 'text-accent-cyan font-bold' : 'text-slate-300'}`}>
                           {step.label}
                         </span>
                         {(step.active || (step.final && scanStep === 3)) && (
                           <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
                         )}
                      </div>
                    ))}
                 </div>

                 {/* Success Stamp */}
                 <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500 ${scanStep === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg flex items-center space-x-2">
                       <ShieldCheck className="w-5 h-5" />
                       <span>APPROVED</span>
                    </div>
                 </div>

              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default IdentityVerification;