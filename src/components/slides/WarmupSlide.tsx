import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Camera, Flame, Music, Target, Bot, Shuffle, Eye, EyeOff } from 'lucide-react';
import { SlideProps } from '../../types';

const INITIAL_JOBS = [
  { title: 'Pilot', icon: Plane, action: 'I fly airplanes and travel on long journeys!', color: 'text-brand-primary', bg: 'bg-brand-primary/20' },
  { title: 'Photographer', icon: Camera, action: 'I take photos for magazines and school books!', color: 'text-brand-accent', bg: 'bg-brand-accent/20' },
  { title: 'Firefighter', icon: Flame, action: 'I am brave and I rescue people in danger!', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { title: 'Singer', icon: Music, action: 'I sing songs on stage and have many fans!', color: 'text-neon-pink', bg: 'bg-neon-pink/20' },
];

export function WarmupSlide({ onNext }: SlideProps) {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [isCharadeMode, setIsCharadeMode] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const shuffleJobs = () => {
    const shuffled = [...jobs].sort(() => Math.random() - 0.5);
    setJobs(shuffled);
    setActiveJob(null);
    setRevealed(false);
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto items-center bg-discord-dark">
      <div className="space-y-10 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                <Target className="animate-spin-slow" size={20} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em]">Be Curious • Level 5 • Unit 6</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tight italic text-white uppercase">
            WORLD OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">WORKING TOGETHER</span>
          </h2>
        </div>

        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
          <span className="text-white font-bold italic">Let's act out these jobs!</span>
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={shuffleJobs}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-neon-cyan hover:bg-white/10 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-xl"
          >
            <Shuffle size={16} />
            Shuffle_Order
          </button>
          <button 
            onClick={() => { setIsCharadeMode(!isCharadeMode); setRevealed(false); }}
            className={`px-6 py-3 border rounded-2xl transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-xl ${
              isCharadeMode 
                ? 'bg-neon-purple/20 border-neon-purple text-neon-purple' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {isCharadeMode ? <EyeOff size={16} /> : <Eye size={16} />}
            {isCharadeMode ? 'Exit_Charades' : 'Charade_Mode'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {jobs.map((job, idx) => (
            <motion.button
              key={`${job.title}-${idx}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveJob(idx); setRevealed(false); }}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 relative overflow-hidden group ${
                activeJob === idx 
                  ? 'bg-discord-panel border-neon-cyan shadow-2xl shadow-neon-cyan/20' 
                  : 'bg-discord-panel/40 border-white/5 hover:border-neon-cyan/30 text-slate-500 hover:text-white'
              }`}
            >
              <div className={`p-4 rounded-2xl transition-all duration-500 ${
                activeJob === idx 
                  ? 'bg-neon-cyan text-discord-dark shadow-[0_0_20px_rgba(0,242,254,0.4)]' 
                  : 'bg-white/5 text-slate-400 group-hover:bg-neon-cyan/20 group-hover:text-neon-cyan'
              }`}>
                <job.icon size={32} />
              </div>
              <span className={`font-black uppercase tracking-widest text-[10px] transition-colors ${
                activeJob === idx ? 'text-neon-cyan' : 'text-slate-500'
              }`}>
                {job.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative group p-4 z-10">
        <div className="h-[520px] bg-discord-panel rounded-[3rem] border border-white/5 flex flex-col items-center justify-center p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {activeJob !== null ? (
              <motion.div
                key={activeJob}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                className="text-center relative z-10"
              >
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white mx-auto mb-10 shadow-2xl`}
                >
                  {(() => {
                    const Icon = jobs[activeJob].icon;
                    return <Icon size={80} />;
                  })()}
                </motion.div>
                <h3 className="text-5xl font-display font-black mb-4 uppercase italic text-white tracking-widest">
                   {isCharadeMode && !revealed ? '???' : jobs[activeJob].title}!
                </h3>
                <div className="space-y-6">
                  <div className="inline-block px-6 py-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                     <p className="text-neon-cyan text-lg font-bold italic leading-tight">"{jobs[activeJob].action}"</p>
                  </div>
                  
                  {isCharadeMode && !revealed && (
                    <button 
                      onClick={() => setRevealed(true)}
                      className="w-full py-4 bg-neon-cyan text-discord-dark rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-neon-cyan/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Eye size={18} />
                      Reveal_Identity
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="text-center space-y-8 relative z-10">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-24 h-24 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center mx-auto"
                >
                  <Bot size={40} className="text-white/20" />
                </motion.div>
                <div className="space-y-3">
                  <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Scanning Sector_01...</p>
                  <div className="flex justify-center gap-1.5">
                    {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
