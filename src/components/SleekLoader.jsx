import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SleekLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100 over 800ms
    const startTime = Date.now();
    const duration = 750; // fast & snappy

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          onComplete();
        }, 150); // slight buffer for satisfying 100% completion
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 w-full h-full bg-[#030303] z-[9999] flex flex-col justify-center items-center p-6 select-none"
    >
      {/* Glowing Tech Grid Background (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative flex flex-col items-center max-w-xs w-full">
        {/* Animated Geometric Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Pulsing glow ring */}
          <div className="absolute w-20 h-20 bg-indigo-500/15 rounded-full filter blur-xl animate-pulse" />
          
          <svg className="w-16 h-16 text-indigo-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal Outer Frame */}
            <motion.polygon
              points="50,10 90,30 90,70 50,90 10,70 10,30"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
            <motion.polygon
              points="50,10 90,30 90,70 50,90 10,70 10,30"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="300"
              initial={{ strokeDashoffset: 300 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Cybernetic Inner Monogram (Double slash + caret) */}
            <motion.path
              d="M38,40 L45,60 M52,40 L59,60"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
            <motion.path
              d="M30,55 L50,35 L70,55"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Text Details */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-[10px] font-mono tracking-[0.25em] text-white uppercase"
          >
            AYUSH K. RAJ
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-[8px] font-mono tracking-widest text-slate-500 uppercase mt-1"
          >
            PORTFOLIO V4.0 // INITIALIZING
          </motion.div>
        </div>

        {/* Modern Sleek Progress Bar Container */}
        <div className="w-full relative flex flex-col items-center">
          {/* Progress Percentage Counter */}
          <span className="text-[10px] font-mono text-indigo-400 mb-2 tabular-nums">
            {String(progress).padStart(3, '0')}%
          </span>
          
          {/* Bar track */}
          <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
            {/* Glow backing */}
            <motion.div
              style={{ width: `${progress}%` }}
              className="absolute h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
