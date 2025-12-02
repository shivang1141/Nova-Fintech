
import React, { useState } from 'react';
import { Trophy, ArrowRight, AlertTriangle, TrendingUp, DollarSign, Brain, RefreshCw, CheckCircle2, XCircle, Flame, ShieldAlert, Briefcase, Gift, ScrollText, HeartPulse, Umbrella, BarChart3, Hourglass } from 'lucide-react';

type GameState = 'intro' | 'playing' | 'feedback' | 'summary';

interface Option {
  id: string;
  label: string;
  impact: number; // Percentage change in portfolio
  risk: number;   // Change in risk score
  feedback: string;
  isOptimal: boolean;
}

interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  options: Option[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "The Inflation Spike",
    description: "Inflation has hit 8%, eroding the purchasing power of your cash. Your savings account only pays 0.5%. What is your move?",
    icon: TrendingUp,
    options: [
      {
        id: 'a',
        label: "Keep it in Cash",
        impact: -7,
        risk: 0,
        feedback: "Safe, but you lost purchasing power. In high inflation, cash loses value daily.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Buy Index Funds",
        impact: 5,
        risk: 10,
        feedback: "Solid choice. Stocks historically outpace inflation over the long term.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Buy High-Risk Crypto",
        impact: -15,
        risk: 50,
        feedback: "Volatile! While it *might* beat inflation, the risk of loss is massive during economic uncertainty.",
        isOptimal: false
      }
    ]
  },
  {
    id: 2,
    title: "The Debt Dilemma",
    description: "You have $5,000 in spare cash. You also have $5,000 in credit card debt at 22% APR. What do you do?",
    icon: AlertTriangle,
    options: [
      {
        id: 'a',
        label: "Invest in Stocks",
        impact: -12,
        risk: 20,
        feedback: "Math error. Markets average 7-10% returns, but your debt costs 22%. You lose the difference.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Pay off the Debt",
        impact: 22,
        risk: -10,
        feedback: "Excellent. Paying off 22% debt is a guaranteed 22% return on your money.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Buy a Luxury Watch",
        impact: -30,
        risk: 0,
        feedback: "Depreciating asset + High Interest Debt = Wealth destruction.",
        isOptimal: false
      }
    ]
  },
  {
    id: 3,
    title: "Market Crash",
    description: "The market just dropped 20% in a week due to global panic. Your portfolio is bleeding red.",
    icon: TrendingUp,
    options: [
      {
        id: 'a',
        label: "Sell Everything",
        impact: -20,
        risk: -50,
        feedback: "You solidified your losses. Panic selling locks in a loss and misses the eventual recovery.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Hold & Do Nothing",
        impact: 10,
        risk: 0,
        feedback: "Good discipline. Markets have historically recovered from every crash.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Buy the Dip",
        impact: 25,
        risk: 15,
        feedback: "Aggressive but smart. Buying quality assets at a discount accelerates recovery.",
        isOptimal: true
      }
    ]
  },
  {
    id: 4,
    title: "Company Match",
    description: "Your employer offers a 401(k) match up to 5% of your salary. You're tight on budget.",
    icon: DollarSign,
    options: [
      {
        id: 'a',
        label: "Skip the Contribution",
        impact: 0,
        risk: 0,
        feedback: "You left free money on the table. That's an instant 100% return missed.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Contribute exactly 5%",
        impact: 100,
        risk: 0,
        feedback: "Perfect. Always take the employer match; it's part of your compensation package.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Contribute 20%",
        impact: 105,
        risk: 10,
        feedback: "Good for the future, but might strain your current tight budget too much.",
        isOptimal: false
      }
    ]
  },
  {
    id: 5,
    title: "The 'Guaranteed' Return",
    description: "An online 'guru' invites you to a project promising 1% daily returns guaranteed. It's trending on social media.",
    icon: ShieldAlert,
    options: [
      {
        id: 'a',
        label: "Go All In",
        impact: -100,
        risk: 100,
        feedback: "It was a Ponzi scheme. 1% daily is mathematically impossible long-term. You lost everything.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Invest a Small Amount",
        impact: -10,
        risk: 50,
        feedback: "You still got scammed. Even 'play money' is better spent on real investments.",
        isOptimal: false
      },
      {
        id: 'c',
        label: "Report & Ignore",
        impact: 0,
        risk: -5,
        feedback: "Smart. If it sounds too good to be true, it is. You preserved your capital.",
        isOptimal: true
      }
    ]
  },
  {
    id: 6,
    title: "The Emergency",
    description: "Your car transmission blew up. Repairs cost $2,000. You have an emergency fund and a credit card.",
    icon: AlertTriangle,
    options: [
      {
        id: 'a',
        label: "Use Emergency Fund",
        impact: -5,
        risk: -10,
        feedback: "Correct. This is exactly what the fund is for. No debt incurred.",
        isOptimal: true
      },
      {
        id: 'b',
        label: "Use Credit Card",
        impact: -15,
        risk: 10,
        feedback: "Bad move. Now you're paying interest on a liability.",
        isOptimal: false
      },
      {
        id: 'c',
        label: "Sell Long-term Stocks",
        impact: -8,
        risk: 5,
        feedback: "Not ideal. You triggered a taxable event and stopped compound interest unnecessarily.",
        isOptimal: false
      }
    ]
  },
  {
    id: 7,
    title: "The Tax Refund",
    description: "You received an unexpected $3,000 tax refund.",
    icon: Gift,
    options: [
      {
        id: 'a',
        label: "Book a Vacation",
        impact: -5,
        risk: 0,
        feedback: "Fun, but financially neutral. You spent the asset instead of growing it.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Invest in Roth IRA",
        impact: 15,
        risk: 0,
        feedback: "Brilliant. Tax-free growth for decades makes this $3,000 worth $30,000 later.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Keep in Checking",
        impact: -2,
        risk: 0,
        feedback: "Inflation will eat this money over time. Put it to work!",
        isOptimal: false
      }
    ]
  },
  {
    id: 8,
    title: "Job Offer",
    description: "You got a new job offer! The salary is 10% higher, but no equity. Your current job has lower pay but great stock options.",
    icon: Briefcase,
    options: [
      {
        id: 'a',
        label: "Take the Cash",
        impact: 10,
        risk: -5,
        feedback: "Safe bet. Cash in hand is guaranteed. Stock options can be worthless.",
        isOptimal: true
      },
      {
        id: 'b',
        label: "Stay for Options",
        impact: 0,
        risk: 25,
        feedback: "High risk. If the company fails, you lost years of higher salary potential.",
        isOptimal: false
      },
      {
        id: 'c',
        label: "Negotiate Offer",
        impact: 15,
        risk: 5,
        feedback: "Pro move. You asked for equity match on the new offer and got it.",
        isOptimal: true
      }
    ]
  },
  {
    id: 9,
    title: "Legacy Planning",
    description: "You've built a net worth of $500k. You want to ensure your family avoids court hassles if you pass away.",
    icon: ScrollText,
    options: [
      {
        id: 'a',
        label: "Draft a Simple Will",
        impact: 0,
        risk: 5,
        feedback: "Better than nothing, but assets often still go through probate court, costing time and 3-7% in fees.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Create a Living Trust",
        impact: -2,
        risk: -10,
        feedback: "Excellent. Assets in a Trust bypass probate entirely, remaining private and instantly accessible to heirs.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Do Nothing",
        impact: 0,
        risk: 20,
        feedback: "Risky. The state will decide how to distribute your assets, and probate costs will eat into the inheritance.",
        isOptimal: false
      }
    ]
  },
  {
    id: 10,
    title: "Protecting Income",
    description: "You work in a high-skill tech job. Statistics show 1 in 4 workers will become disabled before retiring.",
    icon: HeartPulse,
    options: [
      {
        id: 'a',
        label: "Rely on Savings",
        impact: 0,
        risk: 30,
        feedback: "Dangerous. Medical bills plus loss of income can burn through even large savings in months.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Disability Insurance",
        impact: -1,
        risk: -20,
        feedback: "Smart move. Long-term disability insurance protects your greatest asset—your ability to earn an income.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Start GoFundMe",
        impact: 0,
        risk: 50,
        feedback: "That is not a financial plan. Crowdfunding is unreliable.",
        isOptimal: false
      }
    ]
  },
  {
    id: 11,
    title: "Life Insurance",
    description: "You and your partner just bought a home and have a newborn. You need life insurance.",
    icon: Umbrella,
    options: [
      {
        id: 'a',
        label: "Whole Life Policy",
        impact: -10,
        risk: -5,
        feedback: "Expensive. Whole life has high fees and lower returns compared to investing. You overpaid for coverage.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Term Life + Invest",
        impact: -2,
        risk: -5,
        feedback: "The Gold Standard. Buy cheap Term coverage for the years you need it, and invest the savings for higher growth.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "No Insurance",
        impact: 0,
        risk: 100,
        feedback: "Irresponsible. If you pass, your family could lose the house and struggle financially.",
        isOptimal: false
      }
    ]
  },
  {
    id: 12,
    title: "Volatility (Age 25)",
    description: "You are 25 years old. The stock market enters a Bear Market, dropping 25%.",
    icon: BarChart3,
    options: [
      {
        id: 'a',
        label: "Stop Contributing",
        impact: 0,
        risk: 10,
        feedback: "Mistake. You stopped buying shares while they were 'on sale', missing the recovery gains.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Increase Contributions",
        impact: 20,
        risk: 0,
        feedback: "Aggressive and correct. At 25, volatility is your friend. Buying low supercharges long-term returns.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Switch to Cash",
        impact: -10,
        risk: -5,
        feedback: "Timing the market rarely works. You locked in losses and will likely miss the rebound.",
        isOptimal: false
      }
    ]
  },
  {
    id: 13,
    title: "Pre-Retirement Risk",
    description: "You are retiring next year. Markets are at all-time highs, but economists predict a recession.",
    icon: Hourglass,
    options: [
      {
        id: 'a',
        label: "Stay 100% Stocks",
        impact: 5,
        risk: 25,
        feedback: "High risk. If the market crashes year 1 of retirement (Sequence of Returns Risk), your portfolio may never recover.",
        isOptimal: false
      },
      {
        id: 'b',
        label: "Create 'Cash Bucket'",
        impact: 0,
        risk: -20,
        feedback: "Wise. Set aside 2 years of expenses in cash so you don't have to sell stocks during a downturn.",
        isOptimal: true
      },
      {
        id: 'c',
        label: "Move All to Gold",
        impact: -5,
        risk: 15,
        feedback: "Speculative. Gold is volatile and doesn't generate income/dividends needed for retirement.",
        isOptimal: false
      }
    ]
  }
];

const FinancialLearningGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(10000);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ text: string; impact: number; isOptimal: boolean } | null>(null);

  const currentScenario = SCENARIOS[currentScenarioIndex];

  const handleStart = () => {
    setGameState('playing');
    setPortfolioValue(10000);
    setScore(0);
    setStreak(0);
    setCurrentScenarioIndex(0);
  };

  const handleOptionSelect = (option: Option) => {
    // Calculate new values
    const valueChange = portfolioValue * (option.impact / 100);
    const newPortfolioValue = Math.max(0, portfolioValue + valueChange); // Prevent negative balance
    
    setPortfolioValue(newPortfolioValue);
    
    if (option.isOptimal) {
      setScore(s => s + 100 + (streak * 10)); // Bonus for streaks
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setLastFeedback({
      text: option.feedback,
      impact: option.impact,
      isOptimal: option.isOptimal
    });

    setGameState('feedback');
  };

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      setGameState('summary');
    }
  };

  return (
    <section className="py-24 bg-[#020617] relative border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Game Container */}
        <div className="relative glass-panel rounded-3xl border border-white/10 overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
          
          {/* Header Bar */}
          <div className="h-16 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center space-x-2">
               <Brain className="w-5 h-5 text-accent-purple" />
               <span className="font-bold text-white tracking-wider hidden md:block">MARKET MINDSET</span>
            </div>
            {gameState !== 'intro' && (
              <div className="flex items-center space-x-4 md:space-x-6">
                 {/* Streak Indicator */}
                 <div className={`flex items-center space-x-1 ${streak > 1 ? 'animate-pulse' : ''}`}>
                    <Flame className={`w-4 h-4 ${streak > 2 ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`} />
                    <span className={`font-mono font-bold ${streak > 2 ? 'text-orange-500' : 'text-slate-600'}`}>{streak}</span>
                 </div>
                 <div className="h-4 w-[1px] bg-white/10"></div>
                 <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="font-mono text-white text-sm md:text-base">{score} XP</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="font-mono text-green-400 text-sm md:text-base">${Math.round(portfolioValue).toLocaleString()}</span>
                 </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            
            {gameState === 'intro' && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="w-24 h-24 bg-gradient-to-tr from-accent-purple to-accent-cyan rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-display font-bold text-white mb-4">Financial Survival Mode</h3>
                  <p className="text-slate-400 text-lg max-w-lg mx-auto">
                    Start with $10,000. Face 13 real-world financial scenarios ranging from inflation to legacy planning.
                    Can you retire wealthy?
                  </p>
                </div>
                <button 
                  onClick={handleStart}
                  className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Start Simulation
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="w-full max-w-2xl animate-fade-in-up">
                <div className="mb-8">
                   <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold mb-4">
                      <span>SCENARIO {currentScenario.id} / {SCENARIOS.length}</span>
                   </div>
                   <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-slate-800 border border-white/10">
                        <currentScenario.icon className="w-8 h-8 text-accent-cyan" />
                      </div>
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-4">{currentScenario.title}</h3>
                   <p className="text-xl text-slate-300 leading-relaxed">{currentScenario.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {currentScenario.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className="p-6 rounded-2xl bg-slate-800/50 border border-white/10 hover:border-accent-cyan/50 hover:bg-slate-800 transition-all group flex flex-col items-center justify-center min-h-[160px]"
                      >
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-lg font-bold text-white">{option.id.toUpperCase()}</span>
                         </div>
                         <span className="text-white font-medium text-sm">{option.label}</span>
                      </button>
                   ))}
                </div>
              </div>
            )}

            {gameState === 'feedback' && lastFeedback && (
              <div className="w-full max-w-lg animate-scale-in">
                 <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${lastFeedback.isOptimal ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {lastFeedback.isOptimal ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-2">
                    {lastFeedback.isOptimal ? 'Wise Decision!' : 'Risky Move...'}
                 </h3>
                 
                 <div className={`text-3xl font-mono font-bold mb-6 ${lastFeedback.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {lastFeedback.impact > 0 ? '+' : ''}{lastFeedback.impact}% Portfolio Impact
                 </div>

                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
                    <p className="text-slate-300 leading-relaxed">
                       "{lastFeedback.text}"
                    </p>
                 </div>

                 <button 
                  onClick={handleNext}
                  className="flex items-center justify-center space-x-2 w-full py-4 rounded-xl bg-accent-purple hover:bg-accent-purple/90 text-white font-bold transition-colors"
                 >
                    <span>{currentScenarioIndex < SCENARIOS.length - 1 ? 'Next Scenario' : 'See Results'}</span>
                    <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            )}

            {gameState === 'summary' && (
               <div className="text-center space-y-8 animate-fade-in-up">
                  <div>
                     <p className="text-slate-400 uppercase tracking-widest text-sm mb-2">Simulation Complete</p>
                     <h3 className="text-5xl font-display font-bold text-white mb-4">
                        {score >= 1000 ? 'Financial Master' : score >= 600 ? 'Budding Analyst' : 'Risk Taker'}
                     </h3>
                     <div className="flex justify-center items-center space-x-8 text-2xl font-mono">
                        <div className="text-center">
                           <p className="text-xs text-slate-500 mb-1">Final Portfolio</p>
                           <p className={`font-bold ${portfolioValue >= 10000 ? 'text-green-400' : 'text-red-400'}`}>
                              ${Math.round(portfolioValue).toLocaleString()}
                           </p>
                        </div>
                        <div className="text-center">
                           <p className="text-xs text-slate-500 mb-1">Total XP</p>
                           <p className="font-bold text-yellow-500">{score}</p>
                        </div>
                     </div>
                  </div>

                  <p className="text-slate-400 max-w-md mx-auto">
                     {score >= 1000
                        ? "You have a strong grasp of financial principles. You navigated scams, debt, insurance, and volatility perfectly." 
                        : "You took some risks or missed optimal strategies. Review your choices to improve your financial future."}
                  </p>

                  <button 
                     onClick={handleStart}
                     className="inline-flex items-center space-x-2 px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 text-white transition-colors"
                  >
                     <RefreshCw className="w-4 h-4" />
                     <span>Play Again</span>
                  </button>
               </div>
            )}

          </div>

          {/* Progress Bar */}
          {gameState === 'playing' && (
             <div className="h-1 w-full bg-slate-800">
                <div 
                  className="h-full bg-accent-cyan transition-all duration-500"
                  style={{ width: `${((currentScenarioIndex + 1) / SCENARIOS.length) * 100}%` }}
                ></div>
             </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default FinancialLearningGame;
