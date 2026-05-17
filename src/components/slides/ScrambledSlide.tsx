import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { Cpu, Terminal, Users, CheckCircle2, AlertTriangle, Zap, RotateCcw, Play } from 'lucide-react';

interface TeamData {
  name: string;
  color: string;
  glow: string;
  scrambled: string[];
  correct: string;
  completed: boolean;
}

export function ScrambledSlide({ onNext }: SlideProps) {
  const [selectedTeam, setSelectedTeam] = useState<number>(0);
  const [inputTask, setInputTask] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null);
  
  const [teams, setTeams] = useState<TeamData[]>([
    {
      name: "ALPHA_SECTOR",
      color: "text-neon-cyan",
      glow: "shadow-neon-cyan/20",
      scrambled: ["can", "sports,", "teach", "Buddy", "can't", "he?"],
      correct: "Buddy can teach sports, can't he?",
      completed: false
    },
    {
      name: "BETA_SECTOR",
      color: "text-neon-purple",
      glow: "shadow-neon-purple/20",
      scrambled: ["is", "at", "cooking,", "good", "isn't", "he?", "Buddie"],
      correct: "Buddie is good at cooking, isn't he?",
      completed: false
    },
    {
      name: "GAMMA_SECTOR",
      color: "text-neon-pink",
      glow: "shadow-neon-pink/20",
      scrambled: ["you", "are", "also", "Indonesian,", "aren't", "you?", "Buddie,"],
      correct: "Buddie, you are also Indonesian, aren't you?",
      completed: false
    },
    {
      name: "DELTA_SECTOR",
      color: "text-yellow-400",
      glow: "shadow-yellow-400/20",
      scrambled: ["doesn't", "sleep,", "Buddie", "he?", "does"],
      correct: "Buddie doesn't sleep, does he?",
      completed: false
    }
  ]);

  const checkLogic = () => {
    const currentTeam = teams[selectedTeam];
    const normalizedInput = inputTask.toLowerCase().trim().replace(/[?!.,]/g, '');
    const normalizedCorrect = currentTeam.correct.toLowerCase().trim().replace(/[?!.,]/g, '');

    if (normalizedInput === normalizedCorrect) {
      setFeedback('correct');
      const newTeams = [...teams];
      newTeams[selectedTeam].completed = true;
      setTeams(newTeams);
      speak(currentTeam.correct);
    } else {
      setFeedback('error');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const allCompleted = teams.every(t => t.completed);

  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 relative z-10">
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <div className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple shadow-[0_0_15px_rgba(183,0,255,0.1)]">
                <Users size={24} />
             </div>
             <span className="text-neon-purple text-[10px] font-black uppercase tracking-[0.4em]">Multiplayer_Mission: Scrambled_Circuit</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white uppercase italic leading-none">
            TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink neon-glow-purple">DEFRAGMENT</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
           {teams.map((team, idx) => (
             <button
               key={idx}
               onClick={() => { setSelectedTeam(idx); setFeedback(null); setInputTask(''); }}
               className={`px-4 py-2 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all border-2 flex items-center gap-2 ${
                 selectedTeam === idx 
                   ? `bg-white/10 ${team.color.replace('text', 'border')} ${team.color} ${team.glow}` 
                   : 'border-white/5 text-slate-500 hover:text-slate-300'
               }`}
             >
               {team.completed ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-2 h-2 rounded-full bg-slate-700" />}
               {team.name}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Scrambled Fragments Display */}
        <div className="glass-card bg-black/40 border-white/5 p-8 flex flex-col justify-center relative overflow-hidden backdrop-blur-xl">
           <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
           <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Sector_Status: {teams[selectedTeam].completed ? 'SYNCED' : 'SCRAMBLED_DATA'}</p>
                 <h3 className={`text-2xl font-display font-black italic uppercase tracking-widest ${teams[selectedTeam].color}`}>
                    {teams[selectedTeam].name} Fragments
                 </h3>
              </div>

              <div className="flex flex-wrap gap-4">
                 {teams[selectedTeam].scrambled.map((word, i) => (
                   <motion.div
                     key={`${selectedTeam}-${i}`}
                     initial={{ scale: 0, rotate: -10 }}
                     animate={{ scale: 1, rotate: Math.sin(i) * 5 }}
                     className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-2xl font-display font-black text-white italic shadow-lg"
                   >
                     {word}
                   </motion.div>
                 ))}
              </div>
              
              <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-3xl">
                 <p className="text-slate-400 text-xs italic">
                    "Scientists! Use your physical cutouts to arrange these inquiries for Buddie. Once you solved the tag, upload the logic below."
                 </p>
              </div>
           </div>
        </div>

        {/* Input & Verification */}
        <div className="glass-card bg-[#2b2d31] border-white/5 p-8 flex flex-col relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
           <div className="relative z-10 h-full flex flex-col gap-8">
              <div className="flex items-center gap-4">
                 <Terminal className="text-neon-purple" size={20} />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Logic_Upload_Terminal</span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-6">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-neon-purple uppercase tracking-widest ml-4">Terminal_Input_Buffer</label>
                    <textarea
                      value={inputTask}
                      onChange={(e) => setInputTask(e.target.value)}
                      placeholder="Type the finalized sentence here..."
                      className={`w-full bg-black/40 border-2 rounded-3xl p-8 font-display font-black text-3xl italic text-white placeholder:text-white/5 focus:outline-none transition-all resize-none h-[200px] ${
                        feedback === 'correct' ? 'border-green-500 text-green-400 shadow-lg shadow-green-500/20' :
                        feedback === 'error' ? 'border-neon-pink text-neon-pink animate-shake' :
                        'border-white/10 focus:border-neon-purple shadow-inner'
                      }`}
                    />
                 </div>

                 {feedback === 'correct' ? (
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }} 
                     animate={{ y: 0, opacity: 1 }}
                     className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl flex items-center justify-between"
                   >
                      <div className="flex items-center gap-4">
                         <CheckCircle2 className="text-green-500" size={32} />
                         <div>
                            <p className="text-white font-black italic uppercase tracking-widest">SYNC_COMPLETE</p>
                            <p className="text-green-500/60 text-[10px] font-mono">Memory node {selectedTeam + 1} finalized.</p>
                         </div>
                      </div>
                      <button onClick={() => speak(teams[selectedTeam].correct)} className="p-4 bg-green-500/20 rounded-full hover:bg-green-500/30 transition-all text-green-500">
                         <Zap size={24} fill="currentColor" />
                      </button>
                   </motion.div>
                 ) : (
                   <button
                     onClick={checkLogic}
                     className="w-full py-6 bg-neon-purple text-white rounded-3xl font-black text-lg uppercase tracking-[0.2em] italic shadow-lg shadow-neon-purple/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                   >
                     <Cpu size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                     Initialize Reboot
                   </button>
                 )}
              </div>

              {allCompleted && (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={onNext}
                  className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-3xl font-black text-lg uppercase tracking-[0.2em] italic shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  <Play size={24} fill="currentColor" />
                  Proceed to Final Mission
                </motion.button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
