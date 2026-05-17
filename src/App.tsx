/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Hash, 
  MessageSquare, 
  Settings, 
  Volume2, 
  HelpCircle,
  Shield,
  Circle,
  Trophy,
} from 'lucide-react';
import { IntroSlide } from './components/slides/IntroSlide';
import { WarmupSlide } from './components/slides/WarmupSlide';
import { ContextSlide } from './components/slides/ContextSlide';
import { ElicitationSlide } from './components/slides/ElicitationSlide';
import { PresentationSlide } from './components/slides/PresentationSlide';
import { PracticeSlide } from './components/slides/PracticeSlide';
import { ScrambledSlide } from './components/slides/ScrambledSlide';
import { ProductionSlide } from './components/slides/ProductionSlide';
import { SummarySlide } from './components/slides/SummarySlide';
import { Stopwatch } from './components/Stopwatch';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 'intro', label: 'Orientation', icon: MessageSquare, component: IntroSlide },
    { id: 'warmup', label: 'Role Analysis', icon: Play, component: WarmupSlide },
    { id: 'context', label: 'Grammar Context', icon: Hash, component: ContextSlide },
    { id: 'elicitation', label: 'Pattern Discovery', icon: MessageSquare, component: ElicitationSlide },
    { id: 'presentation', label: 'Logic Briefing', icon: Shield, component: PresentationSlide },
    { id: 'practice', label: 'Syntax Repair', icon: Settings, component: PracticeSlide },
    { id: 'scrambled', label: 'Scrambled Circuit', icon: Shield, component: ScrambledSlide },
    { id: 'production', label: 'Oral Production', icon: Volume2, component: ProductionSlide },
    { id: 'summary', label: 'Summary Report', icon: Trophy, component: SummarySlide },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="flex h-screen bg-discord-dark font-sans overflow-hidden text-[#dbdee1]">
      {/* Sidebar Navigation */}
      <nav className="w-24 bg-discord-panel border-r border-white/5 flex flex-col items-center py-8 gap-6 z-30">
        <div className="w-14 h-14 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-2xl flex items-center justify-center text-[#0f172a] shadow-lg shadow-neon-cyan/20 mb-10 group active:scale-95 transition-all cursor-pointer">
          <Circle className="w-8 h-8 fill-black/20" />
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(i)}
              className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                currentSlide === i 
                  ? 'bg-neon-cyan text-[#0f172a] shadow-lg shadow-neon-cyan/30' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-neon-cyan'
              }`}
            >
              <slide.icon size={22} />
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/80 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-2xl backdrop-blur-md border border-white/10">
                {slide.label}
              </div>
              {currentSlide === i && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute -left-3 w-1 h-8 bg-neon-cyan rounded-r-full shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 items-center">
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-neon-cyan shadow-sm border border-white/5 hover:rotate-90 transition-all">
             <Settings size={20} />
           </button>
           <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden shadow-md ring-2 ring-neon-cyan/20">
             <img src="https://api.dicebear.com/7.x/bottts/svg?seed=BuddyFriendly" alt="Avatar" />
           </div>
        </div>
      </nav>

      {/* Main Content Stage */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-20 px-10 flex items-center justify-between z-20 border-b border-white/5 bg-discord-panel/40 backdrop-blur-md">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                {currentSlide !== 0 && <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-1">Lesson Chapter</span>}
                <h2 className="font-display font-black text-xl text-white uppercase leading-none tracking-tight">
                  {currentSlide === 0 ? "" : <>{slides[currentSlide].label} <span className="text-neon-cyan neon-glow-cyan">Mode</span></>}
                </h2>
              </div>
           </div>
           
           <div className="flex items-center gap-6 font-mono">
              <div className="flex items-center gap-3 px-4 py-2 bg-black/20 rounded-full border border-white/5 shadow-inner">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buddie: ONLINE</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-500 uppercase font-black">Progress</span>
                <span className="text-xs text-neon-cyan font-bold">{currentSlide + 1} / {slides.length}</span>
              </div>
           </div>
        </header>

        {/* Slide Stage */}
        <div className="flex-1 relative p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20, rotateY: 5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, rotateY: -5 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="h-full w-full"
            >
              <div className="w-full h-full glass-card overflow-hidden relative shadow-2xl shadow-neon-cyan/5 border-white/10">
                <CurrentSlideComponent onNext={nextSlide} onBack={prevSlide} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <footer className="h-24 px-12 flex items-center justify-between z-20 border-t border-white/5 bg-discord-panel/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
             {slides.map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentSlide === i ? 'w-12 bg-neon-cyan shadow-[0_0_10px_rgba(0,242,254,0.5)]' : 'w-4 bg-white/5'
                  }`}
                />
             ))}
          </div>

          <div className="flex items-center gap-6">
             <button
               onClick={prevSlide}
               disabled={currentSlide === 0}
               className="flex items-center gap-2 group px-8 py-3 bg-white/5 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:text-neon-cyan transition-all disabled:opacity-30 border border-white/5"
             >
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
               BACK
             </button>
             <button
               onClick={nextSlide}
               disabled={currentSlide === slides.length - 1}
               className="group relative px-12 py-4 bg-neon-cyan text-[#0f172a] rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-neon-cyan/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 flex items-center gap-3 overflow-hidden"
             >
               <span className="relative z-10">CONTINUE</span>
               <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
          </div>
        </footer>
        <Stopwatch />
      </main>
    </div>
  );
}
