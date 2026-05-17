import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { Users, Rocket, Monitor, CheckCircle2, Terminal, Radio, Cpu, User, Play, Volume2, Bot } from 'lucide-react';

export function ProductionSlide({ onNext }: SlideProps) {
  const [trainingLog, setTrainingLog] = useState<{ statement: string; tag: string; verified: boolean }[]>([]);
  const [newStatement, setNewStatement] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showWorksheet, setShowWorksheet] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 0.7; // Robotic tone
      window.speechSynthesis.speak(utterance);
    }
  };

  const addTrainingEntry = () => {
    if (!newStatement || !newTag) return;
    const entry = { statement: newStatement, tag: newTag, verified: false };
    setTrainingLog([...trainingLog, entry]);
    setNewStatement('');
    setNewTag('');
  };

  const verifyEntry = (idx: number) => {
    const newLog = [...trainingLog];
    newLog[idx].verified = true;
    setTrainingLog(newLog);
    speak(`${newLog[idx].statement} ${newLog[idx].tag}. Logic confirmed. Memory updated.`);
  };

  const steps = [
    {
      title: "BRAINSTORM",
      desc: "Each student chooses 1 school job or action Buddie should know.",
      icon: <Users size={24} />,
      color: "brand-primary"
    },
    {
      title: "CRAFT TAG",
      desc: "Write your training question. 'You can cook, can't you?'",
      icon: <Cpu size={24} />,
      color: "brand-secondary"
    },
    {
      title: "TRAIN BUDDIE",
      desc: "Ask Buddie aloud. If the logic matches, we sync the data!",
      icon: <Rocket size={24} />,
      color: "brand-accent"
    }
  ];

  return (
    <div className="h-full flex flex-col p-8 max-w-7xl mx-auto bg-discord-dark overflow-y-auto custom-scrollbar">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-pink/10 text-neon-pink shadow-[0_0_15px_rgba(255,77,148,0.1)]">
                <Rocket className="animate-pulse" size={24} />
             </div>
             <span className="text-neon-pink text-[10px] font-black uppercase tracking-[0.3em]">Phase: Robot_Training_Mission</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tight italic text-white uppercase">
            SYNC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple neon-glow-pink">BUDDIE'S MEMORY</span>
          </h2>
        </div>
        
        <div className="bg-discord-panel px-8 py-4 rounded-[2rem] border border-white/5 shadow-2xl flex items-center gap-5 backdrop-blur-md">
           <button 
             onClick={() => setShowWorksheet(!showWorksheet)}
             className={`p-2 rounded-xl transition-all ${showWorksheet ? 'bg-neon-pink text-discord-dark shadow-lg shadow-neon-pink/30' : 'bg-white/5 text-slate-400 hover:text-white'}`}
             title="Toggle Student Worksheet Mode"
           >
             <Monitor size={24} />
           </button>
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-discord-dark bg-white/10 flex items-center justify-center">
                  <User size={16} className="text-slate-400" />
                </div>
              ))}
           </div>
           <p className="text-slate-400 text-xs font-medium italic">
             "Lead Scientists: <span className="text-white font-bold">Training Active</span>. <br />
             Verify your logic units below!"
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8 items-stretch">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card px-6 py-4 group bg-white/5 border-white/5 flex items-center"
          >
             <div className="flex items-center gap-4 w-full">
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-discord-dark ${
                  step.color === 'brand-primary' ? 'bg-neon-cyan' : 
                  step.color === 'brand-secondary' ? 'bg-neon-purple' : 
                  'bg-neon-pink'
                }`}>
                  <span className="scale-75">{step.icon}</span>
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-display font-black italic text-white uppercase tracking-wider">{step.title}</h3>
                  <p className="text-slate-500 font-medium italic text-[11px] leading-tight">
                    {step.desc}
                  </p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 flex-1">
        <AnimatePresence mode="wait">
          {showWorksheet ? (
            <motion.div 
              key="worksheet"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="lg:col-span-2 glass-card p-12 bg-white/5 border-2 border-neon-pink/30 relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
              <div className="relative z-10 space-y-12">
                 <div className="text-center space-y-4">
                    <h3 className="text-4xl font-display font-black text-white italic uppercase tracking-[0.2em]">Training Worksheet: Logic Unit 6</h3>
                    <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Student Task: Choose 1 team member to interview.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: "1. TEAM ROLE", frame: "You are [Job], ...", tag: "aren't you?" },
                      { title: "2. MISSION AREA", frame: "You work in [Place], ...", tag: "don't you?" },
                      { title: "3. CORE SKILL", frame: "You can [Action], ...", tag: "can't you?" }
                    ].map((item, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-black/40 border-2 border-white/5 space-y-6">
                        <h4 className="text-neon-pink font-black text-xs tracking-widest uppercase mb-4">{item.title}</h4>
                        <div className="space-y-4 h-[120px] border-b-2 border-dashed border-white/10 flex flex-col justify-end pb-4">
                          <p className="text-2xl font-display font-black text-white/40 italic">{item.frame}</p>
                        </div>
                        <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-[0.3em]">Synapse: {item.tag}</p>
                      </div>
                    ))}
                 </div>

                 <div className="p-8 bg-neon-pink/5 border border-neon-pink/20 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <Bot size={40} className="text-neon-pink" />
                       <div className="space-y-1">
                          <p className="text-white font-black italic uppercase tracking-widest">MISSION BRIEFING:</p>
                          <p className="text-slate-400 text-sm italic italic">Step 1: Write your question. Step 2: Ask Buddie. Step 3: Verify with Teacher.</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowWorksheet(false)}
                      className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all"
                    >
                      Return to Console
                    </button>
                 </div>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="space-y-6 flex flex-col">
                <div className="glass-card p-6 bg-black/40 border-neon-cyan/20 border-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 bg-neon-cyan" />
              <h3 className="text-sm font-display font-black italic text-white uppercase tracking-widest">Training_Frames</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                <p className="text-[9px] font-black text-neon-cyan uppercase mb-1 opacity-60">Status Check</p>
                <p className="font-display font-black text-white italic">"You are [Job], aren't you?"</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                <p className="text-[9px] font-black text-neon-purple uppercase mb-1 opacity-60">Action Check</p>
                <p className="font-display font-black text-white italic">"You work in [Place], don't you?"</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                <p className="text-[9px] font-black text-neon-pink uppercase mb-1 opacity-60">Skill Check</p>
                <p className="font-display font-black text-white italic">"You can [Action], can't you?"</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-discord-panel border-white/5 flex-1 flex flex-col justify-center">
            <h3 className="text-sm font-display font-black italic text-white uppercase tracking-widest mb-4">Input_Terminal</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-black/30 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-neon-cyan transition-all">
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={newStatement}
                    onChange={(e) => setNewStatement(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTrainingEntry()}
                    placeholder="Type student's statement... (e.g. You are a doctor)"
                    className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-white placeholder:text-slate-700"
                  />
                  <div className="w-[1px] h-6 bg-white/10" />
                  <input 
                    type="text" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTrainingEntry()}
                    placeholder="Tag?"
                    className="w-28 bg-transparent border-none outline-none font-mono text-sm text-neon-pink placeholder:text-pink-900/40"
                  />
                </div>
                <button 
                  onClick={addTrainingEntry}
                  className="p-3 bg-neon-cyan text-discord-dark rounded-xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-neon-cyan/20"
                >
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-mono italic px-2">Press ENTER to upload logic stream to memory bank.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-[#2b2d31] border-white/5 border relative overflow-hidden backdrop-blur-sm min-h-[400px] flex flex-col shadow-2xl">
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                   <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan">
                      <Bot size={28} />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#2b2d31]" />
                </div>
                <div>
                   <h4 className="text-sm font-display font-black text-white italic uppercase tracking-widest leading-none">Buddie_Bot</h4>
                   <p className="text-[10px] font-mono text-green-500/80 uppercase tracking-tighter mt-1">Memory_Sync: ACTIVE</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono">
                 <Radio size={14} className="text-neon-pink animate-pulse" />
                 <span className="text-[9px] text-slate-500 uppercase tracking-widest">Logic_Link_Established</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 p-4">
              {trainingLog.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4 text-slate-500 font-mono">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                    <Terminal size={32} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Awaiting_Scientist_Input...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {trainingLog.map((entry, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                       {/* Scientst Message */}
                       <motion.div 
                         initial={{ x: 20, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         className="flex flex-row-reverse gap-4 items-start"
                       >
                          <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center text-neon-cyan border border-neon-cyan/30 shrink-0">
                             <User size={16} />
                          </div>
                          <div className="space-y-1 items-end flex flex-col flex-1">
                             <div className="px-4 py-3 rounded-2xl rounded-tr-none bg-neon-cyan text-discord-dark font-display font-black text-sm italic shadow-lg shadow-neon-cyan/10">
                                "{entry.statement} {entry.tag}"
                             </div>
                             <p className="text-[8px] font-mono text-slate-500 uppercase">Scientist_Node_0{idx + 1}</p>
                          </div>
                       </motion.div>

                       {/* Buddie Reply */}
                       <motion.div 
                         initial={{ x: -20, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ delay: 0.3 }}
                         className="flex gap-4 items-start"
                       >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 shrink-0">
                             <Bot size={16} />
                          </div>
                          <div className="space-y-2 flex-1">
                             <div className={`px-4 py-3 rounded-2xl rounded-tl-none border font-display font-black text-sm italic transition-all ${entry.verified ? 'bg-white/5 border-neon-cyan/30 text-neon-cyan' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                                {entry.verified ? (
                                  <div className="flex flex-col gap-2">
                                     <span>SYNC_SUCCESS: Logic Unit {idx + 1} locked. Memory bank updated for "{entry.statement}" pattern.</span>
                                     <div className="flex items-center gap-3 pt-2 mt-2 border-t border-neon-cyan/10">
                                        <button onClick={() => speak(`${entry.statement} ${entry.tag}`)} className="flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 rounded-full hover:bg-neon-cyan/20 transition-all">
                                           <Volume2 size={12} />
                                           <span className="text-[9px] uppercase tracking-widest">Replay_Audio</span>
                                        </button>
                                     </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-4">
                                     <span>PENDING_VERIFICATION: Review grammar polarity before I sync this data.</span>
                                     <button 
                                       onClick={() => verifyEntry(idx)}
                                       className="w-full py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan rounded-lg text-[10px] uppercase font-black tracking-widest transition-all"
                                     >
                                       Confirm Logic Unit Sync
                                     </button>
                                  </div>
                                )}
                             </div>
                             <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Buddie_OS_v2.0 | Hash: {entry.verified ? 'VERIFIED' : 'PENDING'}</p>
                          </div>
                       </motion.div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )}
    </AnimatePresence>
  </div>
</div>
);
}
