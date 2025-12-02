
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import MarketChart from './components/MarketChart';
import AiAssistant from './components/AiAssistant';
import Footer from './components/Footer';
import AppShowcase from './components/AppShowcase';
import PaymentFeatures from './components/PaymentFeatures';
import YieldVault from './components/YieldVault';
import TradingTerminal from './components/TradingTerminal';
import IdentityVerification from './components/IdentityVerification';
import DeveloperApi from './components/DeveloperApi';
import TrustTicker from './components/TrustTicker';
import GlobalNetwork from './components/GlobalNetwork';
import PricingTiers from './components/PricingTiers';
import LoanCalculator from './components/LoanCalculator';
import CreditScoreSimulator from './components/CreditScoreSimulator';
import MarketNews from './components/MarketNews';
import AssetAllocation from './components/AssetAllocation';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import RetirementPlanner from './components/RetirementPlanner';
import Background from './components/Background';
import ScrollReveal from './components/ScrollReveal';
import FinancialLearningGame from './components/FinancialLearningGame';
import TaxHarvesting from './components/TaxHarvesting';
import AltAssets from './components/AltAssets';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-accent-purple selection:text-white overflow-hidden relative">
      <Background />
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          
          <ScrollReveal>
            <TrustTicker />
          </ScrollReveal>
          
          {/* Soft Separator */}
          <div className="w-full h-24 bg-gradient-to-b from-transparent to-transparent"></div>
          
          <ScrollReveal>
            <AppShowcase />
          </ScrollReveal>
          
          <Features />

          <ScrollReveal>
            <GlobalNetwork />
          </ScrollReveal>
          
          <ScrollReveal>
            <IdentityVerification />
          </ScrollReveal>
          
          <ScrollReveal>
            <TradingTerminal />
          </ScrollReveal>

          <ScrollReveal>
            <MarketNews />
          </ScrollReveal>

          <ScrollReveal>
            <AssetAllocation />
          </ScrollReveal>
          
          <ScrollReveal>
            <AltAssets />
          </ScrollReveal>

          <ScrollReveal>
            <PerformanceAnalytics />
          </ScrollReveal>
          
          <ScrollReveal>
            <TaxHarvesting />
          </ScrollReveal>

          <ScrollReveal>
            <RetirementPlanner />
          </ScrollReveal>
          
          <ScrollReveal>
            <YieldVault />
          </ScrollReveal>

          <ScrollReveal>
            <LoanCalculator />
          </ScrollReveal>

          <ScrollReveal>
            <CreditScoreSimulator />
          </ScrollReveal>

          <ScrollReveal>
            <FinancialLearningGame />
          </ScrollReveal>
          
          <ScrollReveal>
            <DeveloperApi />
          </ScrollReveal>
          
          <ScrollReveal>
            <PaymentFeatures />
          </ScrollReveal>
          
          <ScrollReveal>
            <MarketChart />
          </ScrollReveal>

          <ScrollReveal>
            <PricingTiers />
          </ScrollReveal>
        </main>

        <AiAssistant />
        <Footer />
      </div>
    </div>
  );
};

export default App;
