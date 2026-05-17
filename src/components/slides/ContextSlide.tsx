import { motion } from 'motion/react';
import { SlideProps } from '../../types';
import { Cpu, MapPin, Bot } from 'lucide-react';

export function ContextSlide({ onNext }: SlideProps) {
  return (
    <div className="h-full relative overflow-hidden flex items-center justify-center p-8 bg-discord-dark">
      {/* Background Image: School with futuristic overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/korean_school_building_pixar_1778987109121.png" 
          alt="Korean School" 
          className="w-full h-full object-cover blur-md opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-discord-dark via-transparent to-discord-dark" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                <MapPin size={20} />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-sm text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">Location: Indonesia</span>
            </div>
            <h2 className="text-7xl font-display font-black tracking-tighter italic leading-[0.9] text-white">
              SQUAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan uppercase">Integration</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md">
              Buddie has arrived at <span className="text-neon-cyan font-bold italic">your school</span>! He wants to meet you! Help <span className="text-neon-cyan font-bold italic">Ms. Intan</span> teach him how humans work together!
            </p>
          </div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-8 bg-discord-panel/60 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-md relative"
          >
            <div className="absolute -top-4 -left-4 bg-neon-cyan p-3 rounded-2xl text-discord-dark shadow-lg shadow-neon-cyan/20">
              <Cpu size={24} />
            </div>
            <p className="text-lg font-bold text-white leading-relaxed italic">
              "Buddie is here to help all of your school workers. But we must verify his <span className="text-neon-cyan">grammatical_integrity</span> first!"
            </p>
          </motion.div>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Animated rings */}
          <div className="absolute w-[450px] h-[450px] border-2 border-neon-cyan/20 rounded-full animate-spin-slow" />
          <div className="absolute w-[500px] h-[500px] border-2 border-neon-purple/10 rounded-full animate-reverse-spin" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 w-full max-w-[420px]"
          >
            <div className="absolute -inset-6 border-2 border-white/10 rounded-[4rem] -rotate-3" />
            <div className="absolute -inset-6 border-2 border-neon-cyan/20 rounded-[4rem] rotate-3 overflow-hidden">
               <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent" 
               />
            </div>
            
            <div className="relative bg-discord-panel rounded-[3rem] p-3 shadow-2xl overflow-hidden ring-1 ring-white/10">
               <img 
                src="https://media.tenor.com/fI3rdEOGjPwAAAAm/tesla-optimus-3-tesla.webp" 
                alt="Buddie Bot" 
                className="w-full h-auto rounded-[2.5rem] brightness-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 bg-white text-discord-dark px-4 py-2 rounded-xl font-black text-[10px] tracking-widest shadow-xl uppercase">
                Status: Deployment_Ready
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
 }
