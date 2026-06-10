import React from 'react';
import { motion } from 'framer-motion';

export default function HeroForeground() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  const textRevealVariants = {
    hidden: { y: "100%", rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-screen px-6 py-20 md:px-12 lg:px-20 z-10 pointer-events-none">
      
      {/* Premium Minimalist Sticky/Absolute Top Navigation */}
      <header className="absolute top-0 left-0 right-0 px-6 py-6 md:px-12 lg:px-20 flex justify-between items-center w-full pointer-events-auto z-50 bg-gradient-to-b from-[#030303]/60 to-transparent backdrop-blur-[2px]">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-xs uppercase font-mono tracking-[0.25em] font-bold text-white">
            AYUSH K. RAJ
          </span>
        </motion.div>
        
        {/* Navigation Menu */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-6 md:gap-10 text-[10px] font-mono tracking-widest text-slate-400 uppercase"
        >
          <a href="#selected-work" className="hover:text-white transition-colors duration-300">
            Work
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-300">
            About &amp; Skills
          </a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">
            Contact
          </a>
        </motion.nav>
      </header>

      {/* Main Massive Kinetic Typography & Description */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start my-auto w-full select-none pt-16"
      >
        <div className="overflow-hidden mb-1">
          <motion.h1 
            variants={textRevealVariants}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold uppercase leading-[0.82] tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#c7d2fe]"
          >
            AYUSH
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.h1 
            variants={textRevealVariants}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold italic uppercase leading-[0.82] tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#10b981] pr-4 sm:pr-6 md:pr-8 lg:pr-12 filter drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          >
            K. RAJ
          </motion.h1>
        </div>

        {/* Cinematic Description */}
        <div className="overflow-hidden max-w-xl md:max-w-2xl mt-2">
          <motion.p 
            variants={fadeUpVariants}
            className="text-sm md:text-base font-light text-slate-400 leading-relaxed pointer-events-auto"
          >
            Hey! I'm <strong className="text-white font-medium">Ayush K. Raj</strong> — a Machine Learning Engineer &amp; Full Stack Architect based in India. I specialize in training intelligent models and crafting high-fidelity interactive web systems that bridge raw code into practical decisions.
          </motion.p>
        </div>

        {/* Premium Luxury Statistics Grid */}
        <motion.div 
          variants={fadeUpVariants}
          className="grid grid-cols-3 gap-3 md:gap-6 mt-12 w-full max-w-lg pointer-events-auto"
        >
          <div className="flex flex-col p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.02] hover:border-indigo-500/20 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">20+</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1 block">Trainees Guided</span>
          </div>
          <div className="flex flex-col p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.02] hover:border-indigo-500/20 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">85%</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1 block">Model Accuracy</span>
          </div>
          <div className="flex flex-col p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.02] hover:border-indigo-500/20 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">25%</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1 block">Bug Reductions</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll HUD Indicator */}
      <div className="flex justify-between items-end w-full pt-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[9px] uppercase tracking-[0.2em] font-mono text-slate-500"
        >
          [ scroll down to explore projects ]
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/10 rounded-full flex justify-center items-start p-1 pointer-events-auto cursor-pointer hover:border-indigo-500/40 hover:shadow-[0_0_10px_rgba(99,102,241,0.1)] transition-colors"
          onClick={() => {
            document.getElementById('selected-work').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-1 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
