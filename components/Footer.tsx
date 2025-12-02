import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple"></div>
             <span className="text-xl font-display font-bold text-white">NOVA</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 NOVA Financial Technologies.<br/>All rights reserved.
          </p>
        </div>

        <div className="flex space-x-8">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;