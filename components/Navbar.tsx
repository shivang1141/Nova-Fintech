import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS: NavItem[] = [
  { label: 'Platform', href: '#features' },
  { label: 'Markets', href: '#chart' },
  { label: 'Intelligence', href: '#ai' },
  { label: 'Company', href: '#footer' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'glass-panel border-white/5 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple group-hover:animate-pulse-slow"></div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            NOVA
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="group relative px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all overflow-hidden">
            <span className="relative z-10 text-sm font-medium flex items-center">
              Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-b border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top-4 fade-in">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-slate-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
           <button className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;