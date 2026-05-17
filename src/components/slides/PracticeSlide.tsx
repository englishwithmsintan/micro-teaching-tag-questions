import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { Terminal, CheckCircle2, AlertTriangle, Code, Play, Bot, Cpu, ShieldCheck, Volume2 } from 'lucide-react';

export function PracticeSlide({ onNext }: SlideProps) {
  const [tasks, setTasks] = useState([
    { sentence: "Buddie can help teachers, ", answer: "can't he?" },
    { sentence: "The students are happy, ", answer: "aren't they?" },
    { sentence: "He doesn't like water, ", answer: "does he?" }
  ]);
  const [inputs, setInputs] = useState(['', '', '']);
  const [results, setResults] = useState<boolean[] | null>(null);
  const [isSetupMode, setIsSetupMode] = useState(false);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Small delay to make it feel more "robotic" and intentional
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleCheck = () => {
    const newResults = inputs.map((input, idx) => {
      const studentInput = input.toLowerCase().trim().replace(/[?!]/g, '');
      const correctAnswer = tasks[idx].answer.toLowerCase().trim().replace(/[?!]/g, '');
      return studentInput === correctAnswer;
    });
    setResults(newResults);
    
    // Play success sound/speak first correct one if applicable
    const firstNewCorrect = newResults.findIndex((r, idx) => r && (!results || !results[idx]));
    if (firstNewCorrect !== -1) {
      speak(`${tasks[firstNewCorrect].sentence} ${tasks[firstNewCorrect].answer}`);
    }
  };

  const addTask = () => {
    setTasks([...tasks, { sentence: "New statement, ", answer: "isn't it?" }]);
    setInputs([...inputs, '']);
    setResults(null);
  };

  const updateTask = (idx: number, field: 'sentence' | 'answer', value: string) => {
    const newTasks = [...tasks];
    newTasks[idx] = { ...newTasks[idx], [field]: value };
    setTasks(newTasks);
    setResults(null);
  };

  const removeTask = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    setInputs(inputs.filter((_, i) => i !== idx));
    setResults(null);
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                <Code size={20} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.4em]">Subroutine: Logic_Correction</span>
          </div>
          <h2 className="text-5xl font-display font-black tracking-tighter text-white leading-none uppercase italic">
            REPAIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">SYSTEMS</span>
          </h2>
        </div>
        
        <div className="bg-discord-panel px-8 py-4 rounded-[2rem] border border-white/5 shadow-2xl flex items-center gap-5 backdrop-blur-md">
          <button 
            onClick={() => setIsSetupMode(!isSetupMode)}
            className={`p-2 rounded-xl transition-all ${isSetupMode ? 'bg-neon-cyan text-discord-dark' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            title="Toggle Setup Mode"
          >
            <ShieldCheck size={24} />
          </button>
          <p className="text-slate-400 text-xs font-medium italic leading-tight">
            {isSetupMode ? "Setup Mode Active: Edit your Mission Statements below." : "Mission Mode: Type the correct tags to reboot!"}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
        <div className="glass-card p-12 bg-discord-panel/40 border-white/5 space-y-10 relative overflow-hidden min-h-full">
           <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
           
           <div className="space-y-12 relative z-10">
              {tasks.map((task, idx) => (
                <div key={idx} className="space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] font-black">
                       <span className="text-neon-cyan font-mono tracking-widest">{">>>"} TASK_0{idx + 1}:</span>
                       <span className="text-slate-600 font-mono uppercase tracking-[0.3em]">
                         {isSetupMode ? 'CONFIGURING_SYSTEM...' : 'Analysis_Pending_...'}
                       </span>
                    </div>
                    {isSetupMode && tasks.length > 1 && (
                      <button 
                        onClick={() => removeTask(idx)}
                        className="text-neon-pink hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-2xl text-white flex-wrap leading-relaxed font-display font-black tracking-tight italic">
                    {isSetupMode ? (
                      <input
                        type="text"
                        value={task.sentence}
                        onChange={(e) => updateTask(idx, 'sentence', e.target.value)}
                        className="bg-transparent border-b border-neon-cyan/30 focus:border-neon-cyan outline-none text-white italic min-w-[300px]"
                        placeholder="Enter statement..."
                      />
                    ) : (
                      <span className="tracking-tight">{task.sentence}</span>
                    )}
                    
                    <div className="relative flex items-center gap-4">
                      <input
                        type="text"
                        value={inputs[idx]}
                        onChange={(e) => {
                          const newInputs = [...inputs];
                          newInputs[idx] = e.target.value;
                          setInputs(newInputs);
                          setResults(null);
                        }}
                        placeholder="TAG_INPUT"
                        className={`bg-black/30 border-2 rounded-[1.5rem] px-6 py-3 text-xl font-mono focus:outline-none transition-all placeholder:text-slate-700 w-[240px] shadow-inner ${
                          results ? (results[idx] ? 'border-green-500 text-green-400 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-neon-pink text-neon-pink bg-neon-pink/5 animate-shake shadow-[0_0_15px_rgba(255,77,148,0.2)]') : 'border-white/10 focus:border-neon-cyan text-neon-cyan'
                        }`}
                      />
                      
                      {results?.[idx] && (
                        <button
                          onClick={() => speak(`${task.sentence} ${task.answer}`)}
                          className="p-2 rounded-full bg-white/5 border border-white/10 text-neon-cyan hover:bg-neon-cyan hover:text-discord-dark transition-all"
                          title="Play Audio"
                        >
                          <Volume2 size={20} />
                        </button>
                      )}
                      
                      {isSetupMode && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neon-purple uppercase">Key:</span>
                          <input
                            type="text"
                            value={task.answer}
                            onChange={(e) => updateTask(idx, 'answer', e.target.value)}
                            className="bg-black/20 border border-neon-purple/30 rounded-lg px-3 py-1 text-sm font-mono text-neon-purple outline-none w-32"
                            placeholder="Correct tag?"
                          />
                        </div>
                      )}

                      {results && (
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                          {results[idx] ? (
                            <CheckCircle2 className="text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" size={32} />
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="text-neon-pink shadow-[0_0_10px_rgba(255,77,148,0.5)] hvr-buzz" size={32} />
                              {isSetupMode && <span className="text-[8px] text-neon-pink uppercase font-mono">Mismatch</span>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isSetupMode && (
                <button 
                  onClick={addTask}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-[1.5rem] text-slate-500 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all flex items-center justify-center gap-3 font-mono uppercase text-xs tracking-widest"
                >
                  <Code size={16} />
                  Add New Logic Gate
                </button>
              )}
           </div>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <button
            onClick={handleCheck}
            className="group relative px-14 py-5 bg-white text-discord-dark rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center gap-4 overflow-hidden"
          >
             <Terminal size={20} className="relative z-10" />
             <span className="uppercase italic relative z-10">Verify_Grammar</span>
             <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          
          <AnimatePresence>
            {results?.every(r => r) && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                onClick={onNext}
                className="px-14 py-5 bg-neon-cyan text-discord-dark rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,242,254,0.3)] active:scale-95 flex items-center gap-4"
              >
                 <Play size={20} fill="currentColor" />
                 <span className="uppercase italic">Logic_Restored</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
