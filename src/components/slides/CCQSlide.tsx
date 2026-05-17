import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideProps } from '../../types';
import { CheckCircle2, XCircle, Terminal, AlertTriangle, HelpCircle } from 'lucide-react';

export function CCQSlide({ onNext }: SlideProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = [
    {
      q: "They aren't in Australia, are they?",
      a: ["Yes, they aren't.", "No, they aren't.", "Yes, they are."],
      correct: 1,
      context: "If the sector is negative (aren't), the tag is positive (are)!"
    },
    {
      q: "They invented K-pop music, didn't they?",
      a: ["Yes, they do.", "No, they didn't.", "Yes, they did."],
      correct: 2,
      context: "Past verbs (invented) hide DID!"
    },
    {
      q: "Robots don't always look like people, do they?",
      a: ["Yes, they do.", "No, they don't.", "Yes, they don't."],
      correct: 0,
      context: "Negative statement -> Positive Tag!"
    }
  ];

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setIsCorrect(idx === questions[currentQuestion].correct);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      onNext();
    }
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-5xl mx-auto bg-discord-dark">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                <HelpCircle size={20} />
             </div>
             <span className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.4em]">Subroutine: Logic_Gate</span>
          </div>
          <h2 className="text-5xl font-display font-black tracking-tighter text-white uppercase italic leading-none">
            RAPID <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-glow-cyan">FIRE</span> CHECK
          </h2>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Scanning Sector</p>
              <p className="text-3xl font-display font-black text-white">
                {currentQuestion + 1}<span className="text-white/20">/</span>{questions.length}
              </p>
           </div>
           <div className="w-16 h-16 rounded-2xl border-2 border-white/10 flex items-center justify-center text-neon-cyan font-black shadow-lg bg-discord-panel group transition-all">
             <span className="text-xl italic">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        <div className="glass-card p-12 bg-discord-panel/40 border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_rgba(0,242,254,0.3)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-center space-y-6"
            >
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] opacity-60">System_Query_Input:</p>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight italic">
                "{questions[currentQuestion].q}"
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions[currentQuestion].a.map((ans, idx) => (
            <motion.button
              key={idx}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.05, y: -5 } : {}}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(idx)}
              className={`p-8 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden group shadow-2xl min-h-[160px] flex flex-col justify-center gap-6 ${
                selectedAnswer === idx 
                  ? idx === questions[currentQuestion].correct 
                    ? 'bg-green-500/10 border-green-500 text-green-400' 
                    : 'bg-neon-pink/10 border-neon-pink text-neon-pink'
                  : 'bg-discord-panel/40 border-white/5 hover:border-neon-cyan/30 text-slate-400 hover:text-white'
              } ${selectedAnswer !== null && idx !== questions[currentQuestion].correct && idx !== selectedAnswer ? 'opacity-20' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-xl transition-all ${
                selectedAnswer === idx 
                  ? idx === questions[currentQuestion].correct 
                    ? 'bg-green-500 text-discord-dark shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                    : 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,77,148,0.4)]'
                  : 'bg-white/5 text-slate-500 group-hover:bg-neon-cyan group-hover:text-discord-dark'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="text-xl font-bold tracking-tight italic leading-tight">
                {ans}
              </span>
              
              {selectedAnswer === idx && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-8 right-8"
                >
                  {idx === questions[currentQuestion].correct ? <CheckCircle2 className="text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" size={32} /> : <XCircle className="text-neon-pink shadow-[0_0_10px_rgba(255,77,148,0.5)]" size={32} />}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-32 left-0 right-0 flex justify-center z-50 pointer-events-none"
          >
            <div className={`px-12 py-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center gap-8 border border-white/10 pointer-events-auto backdrop-blur-2xl ${
              isCorrect ? 'bg-green-600/90 text-white' : 'bg-neon-pink/90 text-white'
            }`}>
              <div className="bg-white/20 p-4 rounded-2xl text-white shadow-inner">
                 {isCorrect ? <CheckCircle2 size={40} /> : <AlertTriangle size={40} className="animate-pulse" />}
              </div>
              <div className="text-left">
                <p className="font-black uppercase tracking-[0.4em] text-[10px] opacity-70 mb-2 font-mono">
                  {isCorrect ? 'Polarity_Matched' : 'Polarity_Mismatch'}
                </p>
                <p className="text-2xl font-display font-black leading-none italic uppercase tracking-wider">
                  {isCorrect ? 'Logic Balanced!' : 'Tag Error Detected.'}
                </p>
              </div>
              <button
                onClick={nextQuestion}
                className="ml-8 px-10 py-4 bg-white text-discord-dark rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95"
              >
                {currentQuestion < questions.length - 1 ? 'Forward' : 'End Mission'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
