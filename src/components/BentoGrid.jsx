import React from 'react';
import { motion } from 'framer-motion';
import MLSandbox from './MLSandbox';
import MarioGame from './MarioGame';
import { Award, Briefcase, Code, Database, User, Gamepad2, Sparkles } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const skills = {
  languages: ["Python", "JavaScript", "SQL", "Java", "C++", "Dart"],
  aiMl: ["Scikit-learn", "TensorFlow", "NLP", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  fullStack: ["React.js", "Node.js", "Express.js", "Flutter", "REST APIs", "Firebase", "HTML5/CSS3"]
};

const certs = [
  { icon: "🤖", title: "ChatGPT: Leveraging AI in Digital Marketing", issuer: "Digital Marketing Program" },
  { icon: "🤝", title: "Effective Collaboration & Teamwork", issuer: "Professional Track" },
  { icon: "💻", title: "Introduction to Software Engineering", issuer: "Professional Certification" },
  { icon: "🐍", title: "Introduction to Programming Using Python", issuer: "Programming Institute" },
  { icon: "⚙️", title: "ECU Tuning & Remapping Level 1", issuer: "Automotive Engineering" }
];

export default function BentoGrid() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 lg:px-20 bg-transparent">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-400 tracking-[0.2em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#10b981] animate-pulse" />
            // SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase font-display text-white mt-2">
            ABOUT &amp; SKILLS
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider md:text-right">
          BENTO GRID // MODULES.05
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: BIO / VISION */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between border-white/5"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// PROFILE INDEX</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-4 leading-snug">
              BRIDGING INTELLIGENT DATA &amp; USER EXPERIENCE
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              With a background in computer science engineering, I specialize in the intersection of data pipelines and visual interfaces. I build robust models that process metrics, and wrap them in elegant, interactive web shells that feel responsive and high-fidelity.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              My hands-on experience as a mentor and developer intern has taught me to design clean API systems, reduce execution anomalies, and translate complex algorithms into visual dashboards.
            </p>
          </div>
          <div className="border-t border-white/5 pt-6 mt-8 flex flex-wrap gap-4 text-[9px] text-indigo-400 font-mono font-bold">
            <span>LOC: KOCHI // INDIA</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">STATUS: OPEN FOR NEW OPPORTUNITIES</span>
          </div>
        </motion.div>

        {/* CARD 2: SKILLS REGISTRY */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-8 border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// SKILLS REGISTRY</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[9px] text-slate-500 uppercase block mb-2 font-bold tracking-wider">// Programming Languages</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.languages.map(t => (
                    <span key={t} className="px-2.5 py-1 border border-white/5 rounded-lg bg-white/[0.01] text-xs text-slate-300 hover:border-indigo-500/20 hover:text-white transition-all">{t}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-[9px] text-slate-500 uppercase block mb-2 font-bold tracking-wider">// AI, ML &amp; Data Science</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.aiMl.map(t => (
                    <span key={t} className="px-2.5 py-1 border border-purple-500/10 rounded-lg bg-white/[0.01] text-xs text-slate-300 hover:border-purple-500/20 hover:text-white transition-all">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] text-slate-500 uppercase block mb-2 font-bold tracking-wider">// Full Stack Toolkit</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.fullStack.map(t => (
                    <span key={t} className="px-2.5 py-1 border border-emerald-500/10 rounded-lg bg-white/[0.01] text-xs text-slate-300 hover:border-emerald-500/20 hover:text-white transition-all">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: ML SANDBOX RUNTIME */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// MODEL_SANDBOX.EXE (INTERACTIVE TRAINING RUNTIME)</span>
          </div>
          <MLSandbox />
        </motion.div>

        {/* CARD 5: TIMELINE EXPERIENCE */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 h-[440px] flex flex-col overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// EXPERIENCE TIMELINE</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scroll-smooth pointer-events-auto">
            <div className="relative border-l border-white/5 ml-2.5 pl-6 py-2 flex flex-col gap-8">
              
              {/* Timeline Node 1 */}
              <div className="relative">
                {/* Node dot */}
                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                <span className="text-[9px] font-mono text-indigo-400 font-bold block mb-1">MAY 2026 — PRESENT</span>
                <h4 className="text-base font-bold text-white font-display">DATA SYSTEM ENGINEER</h4>
                <span className="text-[10px] text-slate-500 block mt-0.5 mb-3">Lifed Health · Kochi, Kerala, India (On-site)</span>
                <ul className="text-xs text-slate-400 font-light list-none flex flex-col gap-2">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-indigo-400">Spearheading data architecture designs, orchestrating system schemas and workflows.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-indigo-400">Formulating program creations to parse health tech pipelines and database metrics.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-indigo-400">Designing highly responsive backend modules and REST integration endpoints.</li>
                </ul>
              </div>

              {/* Timeline Node 2 */}
              <div className="relative">
                {/* Node dot */}
                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                <span className="text-[9px] font-mono text-purple-400 font-bold block mb-1">OCT 2025 — JAN 2026</span>
                <h4 className="text-base font-bold text-white font-display">DATA SCIENTIST TRAINER</h4>
                <span className="text-[10px] text-slate-500 block mt-0.5 mb-3">Zoople Technologies · Kochi, India</span>
                <ul className="text-xs text-slate-400 font-light list-none flex flex-col gap-2">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-400">Designed and delivered training tracks in Data Science and ML pipelines.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-400">Instructed core blocks covering exploratory data, feature tuning, and metrics.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-400">Mentored 20+ trainees through supervised classification &amp; regression algorithms.</li>
                </ul>
              </div>

              {/* Timeline Node 3 */}
              <div className="relative">
                {/* Node dot */}
                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-slate-700" />
                <span className="text-[9px] font-mono text-slate-500 font-bold block mb-1">AUG 2025 — JAN 2026</span>
                <h4 className="text-base font-bold text-white font-display">FULL STACK DEVELOPER INTERN</h4>
                <span className="text-[10px] text-slate-500 block mt-0.5 mb-3">Zoople Technologies · Kochi, India</span>
                <ul className="text-xs text-slate-400 font-light list-none flex flex-col gap-2">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-slate-600">Developed web architectures using React.js and Node/Express servers.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-slate-600">Built custom REST APIs to handle query transactions and state streams.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-slate-600">Resolved production errors, boosting system runtime stability by 25%.</li>
                </ul>
              </div>

            </div>
          </div>
        </motion.div>

        {/* CARD 6: CERTIFICATIONS */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-4 glass-panel rounded-2xl p-8 border-white/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// CREDENTIAL REGISTER</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pointer-events-auto">
            {certs.map((cert, index) => (
              <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-between text-center gap-3 hover:border-indigo-500/20 hover:bg-white/[0.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.05)] transition-all duration-300">
                <div className="text-2xl">{cert.icon}</div>
                <div>
                  <h4 className="text-[10px] font-bold text-white leading-tight font-display mb-1">{cert.title}</h4>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono font-bold mt-1.5">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CARD 7: MARIO RUNNER ARCADE */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-4 glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 border-white/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Gamepad2 className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">// SYSTEM_ARCADE.EXE (CLASSIC RUNNER)</span>
          </div>
          <div className="w-full relative overflow-hidden rounded-xl border border-white/5 shadow-inner" style={{ height: '420px' }}>
            <MarioGame />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
