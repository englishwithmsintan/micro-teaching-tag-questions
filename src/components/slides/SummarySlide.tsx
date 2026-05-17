import { motion } from 'motion/react';
import { SlideProps } from '../../types';
import { Trophy, CheckCircle2, Star, Zap, Layout, ArrowRight, UserCheck, Terminal, Cpu } from 'lucide-react';

export function SummarySlide({ onNext }: SlideProps) {
  const achievements = [
    "Mastered Polarity Logic (Positive ➔ Negative)",
    "Applied falling intonation for confirmation ⬇️",
    "Verified Auxiliary Verb patterns (Be/Do/Modal)"
  ];

  return (
    <div className="h-full flex flex-col p-8 max-w-5xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-lg bg-neon-cyan/20 text-neon-cyan shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <Trophy size={28} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.4em]">Subroutine: Lesson_Summary</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter text-white leading-none uppercase italic">
            CHAPTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">COMPLETE</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 flex-1 content-center">
        <div className="space-y-8">
           <div className="glass-card p-12 bg-discord-panel/40 border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
              <div className="space-y-8 relative z-10">
                 <div className="flex items-center gap-6 group/item pt-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neon-cyan shadow-inner group-hover/item:bg-neon-cyan/20 transition-all">
                       <Layout size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 font-mono">Course_ID</p>
                       <p className="text-2xl font-display font-black text-white mt-1 uppercase tracking-tight italic">ESL - Stage 5</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neon-purple shadow-inner group-hover/item:bg-neon-purple/20 transition-all">
                       <Zap size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 font-mono">Curriculum</p>
                       <p className="text-2xl font-display font-black text-white mt-1 uppercase tracking-tight italic">Be Curious - Unit 6</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 group/item pb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neon-pink shadow-inner group-hover/item:bg-neon-pink/20 transition-all">
                       <UserCheck size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 font-mono">Status</p>
                       <p className="text-2xl font-display font-black text-neon-pink mt-1 uppercase tracking-wide neon-glow-pink italic">SUCCESS [VERIFIED]</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass-card p-12 bg-black/40 border-white/5 h-full flex flex-col gap-10 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xs font-black text-neon-cyan uppercase tracking-[0.4em] mb-4 font-mono opacity-60">MASTERED_SKILLS:</h3>
              <div className="space-y-6">
                 {achievements.map((item, idx) => (
                   <motion.div
                     key={idx}
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.5 + (idx * 0.1) }}
                     className="flex items-start gap-5 p-5 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors shadow-lg"
                   >
                     <CheckCircle2 className="text-neon-cyan mt-1 group-hover:neon-glow-cyan" size={24} />
                     <p className="text-slate-200 font-medium italic text-lg leading-tight uppercase tracking-tight">
                       {item}
                     </p>
                   </motion.div>
                 ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                 <div className="flex -space-x-5">
                    {[1,2,3].map(i => (
                      <div key={i} className={`w-12 h-12 rounded-full border-4 border-discord-dark bg-discord-panel flex items-center justify-center text-neon-cyan shadow-xl`}>
                         <Star size={20} fill="currentColor" />
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Rank: PLATINUM</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center relative z-10 pb-8">
        <button
          onClick={() => window.location.reload()}
          className="group relative px-20 py-6 bg-white text-discord-dark rounded-[3rem] font-black text-2xl tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 flex items-center gap-8 overflow-hidden"
        >
           <span className="uppercase italic relative z-10">RESTART_LESSON</span>
           <ArrowRight size={32} className="relative z-10 group-hover:translate-x-3 transition-transform" />
           <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
