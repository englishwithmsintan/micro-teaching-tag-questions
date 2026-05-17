import { motion } from 'motion/react';
import { SlideProps } from '../../types';
import { Shield, Zap, Repeat, User, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';

export function PresentationSlide({ onNext }: SlideProps) {
  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto bg-discord-dark">
      <div className="flex items-center gap-6 mb-10 relative z-10">
        <div className="p-4 rounded-2xl bg-neon-cyan shadow-[0_0_20px_rgba(0,242,254,0.3)] text-discord-dark">
           <Shield size={32} />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Core_Logic: Bounce_Back_System</span>
          <h2 className="text-5xl font-display font-black tracking-tighter italic text-white uppercase leading-none">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">BOUNCE</span> RULE
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-6 group hover:border-neon-cyan/40 hover:bg-white/5 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-discord-dark transition-all shadow-sm">
             <Zap size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-xs italic uppercase tracking-widest text-white">Modal Auxiliary</h3>
            <p className="text-slate-400 text-[11px] font-medium italic border-t border-white/5 pt-2">
              "You can cook, <br /> 
              <span className="text-neon-cyan font-bold italic underline">can't you?</span>"
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-6 group hover:border-neon-purple/40 hover:bg-white/5 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all shadow-sm">
             <Repeat size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-xs italic uppercase tracking-widest text-white">Action (Do/Does)</h3>
            <p className="text-slate-400 text-[11px] font-medium italic border-t border-white/5 pt-2">
              "You like art, <br />
              <span className="text-neon-purple font-bold italic underline">don't you?</span>"
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-6 group hover:border-neon-pink/40 hover:bg-white/5 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-neon-pink/10 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all shadow-sm">
             <User size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-xs italic uppercase tracking-widest text-white">Be-Verb Status</h3>
            <p className="text-slate-400 text-[11px] font-medium italic border-t border-white/5 pt-2">
              "She is smart, <br />
              <span className="text-neon-pink font-bold italic underline">isn't she?</span>"
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-6 group hover:border-green-500/40 hover:bg-white/5 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
             <ArrowDown size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-xs italic uppercase tracking-widest text-white">Past Tense (Did)</h3>
            <p className="text-slate-400 text-[11px] font-medium italic border-t border-white/5 pt-2">
              "They invented Kimchi, <br />
              <span className="text-green-400 font-bold italic underline">didn't they?</span>"
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 flex-1">
        <div className="glass-card p-10 bg-discord-panel/40 border-white/5 relative overflow-hidden group flex flex-col justify-center">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.4em]">Case_03: Plural_Be</span>
            <div className="text-4xl font-display font-black text-white tracking-tighter">
              "They <span className="text-neon-cyan italic">are</span> students, <br />
              <span className="text-neon-pink underline decoration-neon-pink/30 italic">aren't they?</span>"
            </div>
            <p className="text-slate-500 text-sm italic">For <span className="text-white font-bold tracking-widest">AUXILIARY VERBS</span>, bounce to <span className="text-white font-bold">OPPOSITE POLARITY</span>!</p>
          </div>
        </div>

        <div className="glass-card p-10 bg-discord-panel/40 border-white/5 relative overflow-hidden group flex flex-col justify-center">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="text-[10px] font-black text-neon-purple uppercase tracking-[0.4em]">Case_04: Finished_Action</span>
            <div className="text-4xl font-display font-black text-white tracking-tighter">
              "You <span className="text-neon-purple italic underline decoration-neon-purple/50">went</span> home, <br />
              <span className="text-neon-pink underline decoration-neon-pink/30 italic">didn't you?</span>"
            </div>
            <p className="text-slate-500 text-sm italic">Past verbs hide <span className="text-white font-bold uppercase tracking-widest">AUXILIARY DID</span>! Unlock it.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-[10px] uppercase tracking-widest text-slate-500 backdrop-blur-md">
         <div className="flex items-center gap-6">
            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div animate={{ x: [-100, 100] }} transition={{ repeat: Infinity, duration: 2 }} className="w-full h-full bg-neon-cyan shadow-[0_0_8px_rgba(0,242,254,0.5)]" />
            </div>
            <span>Intonation: <span className="text-neon-cyan font-black">FALLING (⬇️)</span> for Confirmation</span>
         </div>
      </div>
    </div>
  );
}
