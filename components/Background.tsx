import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
      {/* Base Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {/* Animated Nebula Blobs */}
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-accent-purple/30 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-accent-cyan/30 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      {/* Stars Grid */}
      <div className="absolute inset-0 opacity-50">
         {/* We can use a pattern or just some random dots for performance. Using a simple repeating gradient pattern here */}
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ddd, rgba(0,0,0,0))', backgroundSize: '200px 200px' }}></div>
      </div>

      {/* Shooting Stars */}
      <div className="shooting-star" style={{ top: '10%', left: '80%', animationDelay: '0s' }}></div>
      <div className="shooting-star" style={{ top: '30%', left: '90%', animationDelay: '5s' }}></div>
      <div className="shooting-star" style={{ top: '60%', left: '95%', animationDelay: '8s' }}></div>
    </div>
  );
};

export default Background;