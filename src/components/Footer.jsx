import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Sparkles } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', body: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll depth calculations for typography
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.01em", "0.20em"]);
  const skewX = useTransform(scrollYProgress, [0, 1], [0, -6]);

  // Mouse coordinate tracking for kinetic text distortion
  const mouseX = useMotionValue(0.5); 
  const mouseY = useMotionValue(0.5); 

  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5); 
    mouseY.set(y - 0.5); 
  };

  const handleFormChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', body: '' });
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1500);
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      id="contact"
      className="relative bg-transparent border-t border-white/5 py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background ambient glow behind form */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Kinetic Typography Title */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center select-none mb-16 relative">
        <motion.div
          style={{
            letterSpacing,
            skewX,
            rotateX: useTransform(springY, [-0.5, 0.5], [-20, 20]),
            rotateY: useTransform(springX, [-0.5, 0.5], [20, -20]),
          }}
          className="perspective-[1000px] inline-block cursor-default"
        >
          <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 leading-none tracking-tight">
            LET'S TALK
          </h2>
        </motion.div>
      </div>

      {/* Grid Layout: Contact Info & Form */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start relative z-10">
        
        {/* Left Side: Contact Links */}
        <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
          <span className="text-xs text-indigo-400 tracking-[0.2em] uppercase font-mono font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            // CONNECT INDEX
          </span>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-1">
            Have a project in mind, want to discuss algorithms, or just chat about full-stack engineering? Feel free to drop a line.
          </p>
          <div className="flex flex-col gap-4 mt-2 pointer-events-auto">
            <a
              href="mailto:aayushraj1601@gmail.com"
              className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-mono">aayushraj1601@gmail.com</span>
            </a>
            <a
              href="https://github.com/ayushraj16"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
                <Github className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-mono">github.com/ayushraj16</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ayushraj-datascientist-aiengineer/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-mono">linkedin.com/in/ayushraj</span>
            </a>
          </div>
        </div>

        {/* Right Side: Premium Glass Form */}
        <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 relative backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// TRANSMIT SECURE MESSAGE</span>
            <span className="text-[9px] text-slate-500 font-mono">SECURE HANDSHAKE</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-slate-300 pointer-events-auto">
            {/* Input Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleFormChange(e, 'name')}
                  placeholder="John Doe"
                  className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFormChange(e, 'email')}
                  placeholder="sender@network.com"
                  className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Input Row 2: Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleFormChange(e, 'subject')}
                placeholder="Collaboration Proposal"
                className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300"
              />
            </div>

            {/* Input Row 3: Body */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold">Message Details</label>
              <textarea
                required
                rows={5}
                value={formData.body}
                onChange={(e) => handleFormChange(e, 'body')}
                placeholder="Describe your project requirements or details..."
                className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-indigo-500/20 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'DISPATCHING...' : 'SEND_MESSAGE()'}</span>
              </button>

              {submitSuccess && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-400 text-[10px] uppercase font-bold font-mono tracking-wider"
                >
                  ✓ Message transmitted successfully to Ayush's mail server.
                </motion.span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer copyright section */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-[9px] font-mono text-slate-600">
        <div>© 2026 AYUSH K. RAJ // ALL RIGHTS RESERVED.</div>
        <div className="mt-2 md:mt-0 font-display font-bold uppercase tracking-wider text-white/5"> Developed By Pixellon Inc</div>
      </div>
    </footer>
  );
}
