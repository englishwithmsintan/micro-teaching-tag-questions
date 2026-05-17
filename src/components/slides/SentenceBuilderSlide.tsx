import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { Puzzle, Box, RotateCcw, CheckCircle2, AlertTriangle, Zap, Volume2 } from 'lucide-react';

interface Fragment {
  id: string;
  text: string;
  type: 'statement' | 'auxiliary' | 'not' | 'pronoun';
}

export function SentenceBuilderSlide({ onNext }: SlideProps) {
  const [fragments] = useState<Fragment[]>([
    { id: '1', text: "She's a journalist,", type: 'statement' },
    { id: '2', text: "isn't", type: 'auxiliary' },
    { id: '3', text: "she?", type: 'pronoun' },
    { id: '4', text: "is", type: 'auxiliary' },
    { id: '5', text: "he?", type: 'pronoun' },
    { id: '6', text: "They can cook,", type: 'statement' },
    { id: '7', text: "can't", type: 'auxiliary' },
    { id: '8', text: "they?", type: 'pronoun' },
  ]);

  const [activeItems, setActiveItems] = useState<Fragment[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null);

  const checkSentence = () => {
    if (activeItems.length < 3) return;
    
    const combined = activeItems.map(i => i.text).join(' ');
    const correctSentences = [
      "She's a journalist, isn't she?",
      "They can cook, can't they?"
    ];

    if (correctSentences.includes(combined)) {
      setFeedback('correct');
      speak(combined);
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

  const addItem = (item: Fragment) => {
    if (activeItems.find(i => i.id === item.id)) return;
    setActiveItems([...activeItems, item]);
    setFeedback(null);
  };

  const removeItem = (id: string) => {
    setActiveItems(activeItems.filter(i => i.id !== id));
    setFeedback(null);
  };

  const reset = () => {
    setActiveItems([]);
    setFeedback(null);
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-6xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                <Puzzle size={24} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.4em]">Protocol: Logic_Assembly</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter text-white uppercase italic leading-none">
            DRAG <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">& SYNC</span>
          </h2>
        </div>
        
        <div className="bg-discord-panel px-6 py-3 rounded-2xl border border-white/5 shadow-2xl flex items-center gap-4">
          <Zap className="text-neon-cyan animate-pulse" size={20} />
          <p className="text-slate-400 text-[11px] font-medium italic">
            "Reconstruct the logic strings to <br /> 
            <span className="text-white font-bold uppercase tracking-widest">Authorize</span> access!"
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        {/* Assembly Zone */}
        <div className="glass-card flex-1 bg-black/40 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden p-8">
           <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
           
           <div className="w-full max-w-2xl mb-8">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Assembly_Line</span>
                 <button onClick={reset} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                   <RotateCcw size={12} /> Reset
                 </button>
              </div>
              <div className={`min-h-[120px] w-full rounded-2xl border-2 transition-all p-4 flex flex-wrap items-center justify-center gap-4 ${
                feedback === 'correct' ? 'border-green-500 bg-green-500/5' : 
                feedback === 'error' ? 'border-neon-pink bg-neon-pink/5 animate-shake' : 
                'border-white/10 bg-white/5'
              }`}>
                {activeItems.length === 0 ? (
                  <p className="text-slate-600 font-mono text-xs uppercase tracking-widest italic animate-pulse">Drag fragments here...</p>
                ) : (
                  <AnimatePresence>
                    {activeItems.map((item) => (
                      <motion.button
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => removeItem(item.id)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={`px-6 py-3 rounded-xl font-display font-black text-lg italic tracking-tight shadow-lg transition-all hover:scale-105 active:scale-95 ${
                          item.type === 'statement' ? 'bg-neon-cyan text-discord-dark shadow-neon-cyan/20' :
                          item.type === 'auxiliary' ? 'bg-neon-purple text-white shadow-neon-purple/20' :
                          'bg-neon-pink text-white shadow-neon-pink/20'
                        }`}
                      >
                        {item.text}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                )}
              </div>
           </div>

           {activeItems.length >= 3 && feedback !== 'correct' && (
             <motion.button
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               onClick={checkSentence}
               className="px-12 py-4 bg-white text-discord-dark rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
             >
               <CheckCircle2 size={18} />
               Verify String
             </motion.button>
           )}

           {feedback === 'correct' && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4 text-green-400"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={40} className="drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-2xl font-display font-black italic uppercase tracking-widest text-white">Logic Synced!</span>
                </div>
                <button onClick={() => speak(activeItems.map(i => i.text).join(' '))} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                   <Volume2 size={24} />
                </button>
              </motion.div>
           )}
        </div>

        {/* Fragment Bank */}
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Box className="text-slate-500" size={16} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Fragment_Bank</span>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {fragments.map((item) => {
                const isActive = activeItems.find(i => i.id === item.id);
                return (
                  <motion.button
                    key={item.id}
                    layoutId={item.id}
                    disabled={isActive}
                    onClick={() => addItem(item)}
                    whileHover={!isActive ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isActive ? { scale: 0.95 } : {}}
                    className={`px-4 py-3 rounded-lg border text-sm font-bold transition-all text-center ${
                      isActive 
                        ? 'opacity-20 grayscale scale-95 border-white/5 bg-white/5' 
                        : item.type === 'statement' ? 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10' :
                          item.type === 'auxiliary' ? 'border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10' :
                          'border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10'
                    }`}
                  >
                    {item.text}
                  </motion.button>
                );
              })}
           </div>
        </div>
      </div>
    </div>
  );
}
