import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-discord-panel border-2 border-neon-cyan/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4 items-center min-w-[200px]"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active_Mission_Clock</span>
              <div className="text-4xl font-mono font-bold text-white tabular-nums drop-shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                {formatTime(time)}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30' 
                    : 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30'
                }`}
              >
                {isActive ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              <button
                onClick={() => { setTime(0); setIsActive(false); }}
                className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShow(!show)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 ${
          show 
            ? 'bg-neon-cyan text-discord-dark shadow-neon-cyan/20' 
            : 'bg-discord-panel border border-white/10 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 shadow-black/40'
        }`}
      >
        <Timer size={28} />
      </button>
    </div>
  );
}
