import { motion } from 'motion/react';
import { SlideProps } from '../../types';
import { Calendar, Users, BookOpen, Cpu, Info, Terminal } from 'lucide-react';

export function IntroSlide({ onNext }: SlideProps) {
  const backgroundInfo = [
    { label: "Course Name", value: "Micro-Teaching Sekolah Auliya – Intan Fazillah" },
    { label: "Lesson Length", value: "15 Minutes" },
    { label: "Level", value: "Grade 5 (Stage 5)" },
    { label: "Class Date", value: "Monday, 18th May, 2026" },
    { label: "Teacher", value: "Intan Fazillah, S.S." },
    { label: "Description of Students", value: "Grade 5 primary ESL learners." },
    { label: "Number of Students", value: "Simulated class / Interview Panel" },
    { label: "Curriculum Reference", value: "Cambridge Framework / Be Curious 5, Unit 6: Working Together" }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden bg-discord-dark">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-cyan blur-[150px] opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple blur-[150px] opacity-10" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full relative z-10 flex flex-col items-center"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-2">
            <Terminal size={12} />
            <span>Mission_Log_v5.0</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white italic uppercase tracking-tighter leading-none">
            Micro-Teaching
          </h2>
          <h3 className="text-2xl md:text-3xl font-display font-black text-neon-cyan italic uppercase tracking-tighter leading-none mb-4">
            Sekolah Auliya
          </h3>
          <p className="text-lg md:text-xl text-slate-400 font-medium tracking-wide">
            Intan Fazillah, S.S. • Grade 5 (Stage 5)
          </p>
        </motion.div>
        
        <div className="relative mb-16 text-center">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-[8rem] font-display font-black tracking-tighter leading-none italic text-white uppercase"
          >
            TAG <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink neon-glow-cyan">QUESTIONS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 right-0 text-neon-purple font-mono text-sm uppercase tracking-[0.5em] font-black"
          >
            Unit 6: Working Together
          </motion.p>
        </div>

        {/* Refined Information Rows */}
        <div className="w-full max-w-4xl mb-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left border-t border-white/10 pt-10">
           <div className="space-y-6">
              <div className="group">
                 <p className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-50 group-hover:opacity-100 transition-opacity">Chronology</p>
                 <p className="text-white text-xl font-display font-bold uppercase italic">Monday, 18th May, 2026</p>
                 <p className="text-slate-500 font-mono text-xs">Standardized 15 Minute Exposure</p>
              </div>
              <div className="group">
                 <p className="text-neon-purple text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-50 group-hover:opacity-100 transition-opacity">Curriculum_Ref</p>
                 <p className="text-white text-lg font-medium leading-tight">Cambridge Framework • Be Curious 5</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="group">
                 <p className="text-neon-pink text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-50 group-hover:opacity-100 transition-opacity">Subject_Profile</p>
                 <p className="text-white text-xl font-display font-bold uppercase italic">Grade 5 ESL Learners</p>
                 <p className="text-slate-500 font-mono text-xs">Simulated class / Interview Panel</p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                 <div className="px-4 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-[10px] font-black uppercase">
                    Status: Online
                 </div>
                 <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-[10px] font-black uppercase">
                    Logic: Verified
                 </div>
              </div>
           </div>
        </div>
        
        <button
          onClick={onNext}
          className="group relative px-14 py-6 bg-white text-discord-dark rounded-3xl font-black text-2xl tracking-[0.2em] hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.15)] active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 uppercase italic font-display">Initialize Mission</span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity" />
        </button>
      </motion.div>
    </div>
  );
}
