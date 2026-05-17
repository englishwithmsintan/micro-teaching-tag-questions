import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { Bot, Play, Terminal, Shield, AlertTriangle } from 'lucide-react';

export function ElicitationSlide({ onNext }: SlideProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan">
                <Terminal size={20} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.4em]">Subroutine: Pattern_Detection</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter italic text-white uppercase leading-none">
            LISTENING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">SCAN</span>
          </h2>
        </div>
        
        <div className="bg-discord-panel px-8 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
             <Bot size={32} className="text-neon-cyan" />
          </div>
          <p className="text-slate-400 text-sm font-medium italic leading-tight">
            "Listen to Buddie's <span className="text-white font-bold underline decoration-neon-cyan/30 underline-offset-4">test signal</span>. <br />
            Notice the small bounce at the end!"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 relative z-10">
        <div className="space-y-6">
          <div className="glass-card p-12 h-full flex flex-col justify-center gap-12">
            <div className="relative">
              <motion.div 
                animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="bg-black/40 p-10 rounded-[3rem] border-4 border-white/5 shadow-2xl relative overflow-hidden"
              >
                {/* Sound waves decoration */}
                {isPlaying && (
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 opacity-20 h-16 px-6">
                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [15, 60, 15] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1.5 bg-neon-cyan rounded-t-full"
                      />
                    ))}
                  </div>
                )}
                <p className="text-3xl font-mono text-white text-center relative z-10 font-bold leading-relaxed">
                  {isPlaying ? (
                     <span>
                      "Buddie, you like <br /> school, <span className="text-neon-pink underline decoration-wavy underline-offset-8">don't you?</span>"
                    </span>
                  ) : (
                    <span className="opacity-20 animate-pulse uppercase tracking-[0.2em]">Analyzing_Audio...</span>
                  )}
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                  isPlaying 
                    ? 'bg-neon-pink text-white rotate-90 scale-95 shadow-neon-pink/30' 
                    : 'bg-neon-cyan text-discord-dark hover:scale-110 hover:shadow-neon-cyan/40 shadow-neon-cyan/10'
                }`}
              >
                {isPlaying ? <span className="text-5xl">■</span> : <Play fill="currentColor" size={48} className="ml-2" />}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-10 flex flex-col gap-8 h-full">
             <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <Shield className="text-neon-purple shadow-purple" size={24} />
                <h3 className="font-display font-black text-2xl italic text-white uppercase tracking-tight">Detection_Log</h3>
             </div>
             
             <div className="space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
                   <div className="absolute top-0 left-0 w-2 h-full bg-neon-cyan" />
                   <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3 opacity-50">Observation_01</p>
                   <p className="text-slate-200 font-medium text-xl leading-relaxed italic">
                     When I confirm a Statement is <span className="text-neon-cyan font-black">TRUE</span>...
                   </p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
                   <div className="absolute top-0 left-0 w-2 h-full bg-neon-purple" />
                   <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3 opacity-50">Observation_02</p>
                   <p className="text-slate-200 font-medium text-xl leading-relaxed italic">
                     I stick a <span className="text-neon-purple font-black">Question Tag</span> to the very end of my sentence!
                   </p>
                </div>

                <button 
                  onClick={onNext}
                  className="w-full p-8 rounded-[2.5rem] bg-neon-pink/10 border border-neon-pink/20 shadow-xl relative overflow-hidden group hover:bg-neon-pink/20 transition-all flex items-center justify-between"
                >
                   <div className="absolute top-0 left-0 w-2 h-full bg-neon-pink" />
                   <div className="flex items-center gap-4">
                      <AlertTriangle className="text-neon-pink" size={32} />
                      <div className="text-left">
                        <p className="text-neon-pink text-xs font-black uppercase tracking-widest leading-none mb-1">Status: Glitch_Detected</p>
                        <p className="text-white font-black text-2xl italic uppercase group-hover:neon-glow-pink">Decode Rule</p>
                      </div>
                   </div>
                   <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                   >
                     <Play className="text-neon-pink" size={24} />
                   </motion.div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
