import React, { useState, useRef, useEffect } from 'react';

const COMMAND_RESPONSES = {
  help: `Available commands:
- 'about': Developer profile details
- 'experience': Detailed roles and timeline
- 'projects': Full list of developed systems
- 'certs': List of professional certificates
- 'contact': Direct communication links
- 'neofetch': Display system properties
- 'clear': Clear output logs`,
  
  about: `AYUSH K. RAJ - DATA SCIENTIST & FULL STACK DEVELOPER
--------------------------------------------------
Hey! I'm Ayush K. Raj — an ML Engineer & Full Stack Architect based in India.
I love designing intelligent models and shipping scalable applications that connect raw code into practical decisions.
I combine logical data structure principles with visual elegance to build applications that feel premium.`,
  
  experience: `WORK LOGS:
--------------------------------------------------
[1] May 2026 - Present: Lifed Health (Kochi, Kerala, India - On-site)
    Role: Data System Engineer
    - Spearheading data architecture designs, orchestrating system schemas and workflows.
    - Formulating program creations to parse health tech pipelines and database metrics.
    
[2] Oct 2025 - Jan 2026: Zoople Technologies (Kochi, India)
    Role: Data Scientist Trainer
    - Designed and delivered structured training tracks in Data Science and ML pipelines.
    - Mentored 20+ trainees through regression algorithms and optimization bounds.
    
[3] Aug 2025 - Jan 2026: Zoople Technologies (Kochi, India)
    Role: Full Stack Developer Intern
    - Built web architectures with React frontend and Node/Express backend layers.
    - Isolated and resolved production bugs, reducing system errors by 25%.`,
  
  certs: `CERTIFICATIONS & CREDENTIALS:
--------------------------------------------------
- ChatGPT: Leveraging AI in Digital Marketing
- Effective Collaboration & Teamwork
- Introduction to Software Engineering
- Introduction to Programming Using Python
- ECU Tuning & Remapping Level 1`,
  
  projects: `DATABASE PROJECTS:
--------------------------------------------------
[001] Pixellon Hub (React/Node)
[002] Food Xplorer Web (Firebase)
[003] Twitter Sentiment NLP (Scikit-Learn)
[004] Face KNN OpenCV (Python)
[005] Cassava Leaf CNN (TensorFlow)
[006] Friday Voice Bot (Speech API)
[007] Siamese Signature Forgery (PyTorch)
[008] Snake Gradio Client (Python)`,
  
  contact: `COMMUNICATION ENDPOINTS:
--------------------------------------------------
Email:    aayushraj1601@gmail.com
Github:   https://github.com/ayushraj16
LinkedIn: https://www.linkedin.com/in/ayushraj-datascientist-aiengineer/`,
  
  neofetch: `OS: AyushOS v4.1.0 (interactive_shell)
Kernel: SDE-DataScience-AI-Core-1.1
Uptime: 2h 45m
Shell: react-terminal.sh
Display Head: WebGL Canvas DualTorus
Theme: Midnight Aurora & Obsidian Glass
Memory: 4.8GB / 16.0GB (Simulated Allocation)
Processor: Intel Core i7-14800 (Hyper-Engine)`
};

export default function Terminal() {
  const [history, setHistory] = useState([
    "Ayush K. Raj [System Terminal Shell v1.1.0]",
    "Type 'help' to review directory variables."
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalLogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalLogRef.current) {
      terminalLogRef.current.scrollTop = terminalLogRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = inputValue.trim().toLowerCase();
      setInputValue("");

      if (!cmd) return;

      let response = "";
      if (cmd === "clear") {
        setHistory([]);
        return;
      } else if (cmd === "help") {
        response = COMMAND_RESPONSES.help;
      } else if (COMMAND_RESPONSES[cmd]) {
        response = COMMAND_RESPONSES[cmd];
      } else {
        response = `Command not recognized: '${cmd}'. Type 'help' for directory lists.`;
      }

      setHistory(prev => [
        ...prev,
        `guest@ayushraj:~$ ${inputValue}`,
        response
      ]);
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#07080e]/60 text-slate-300 border border-white/5 rounded-2xl p-5 font-mono text-[11px] leading-relaxed cursor-text select-text backdrop-blur-xl shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-2.5 mb-3 shrink-0 select-none">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-[9px] text-slate-500 uppercase tracking-widest ml-2">TERMINAL // AYUSH.SH</span>
      </div>

      <div 
        ref={terminalLogRef} 
        className="flex-1 overflow-y-auto mb-2 whitespace-pre-wrap select-text pr-2 scroll-smooth min-h-0"
      >
        {history.map((line, idx) => (
          <div key={idx} className="mb-2 leading-relaxed">{line}</div>
        ))}
      </div>
      
      <div className="flex items-center gap-1.5 border-t border-white/5 pt-2.5 shrink-0 pointer-events-auto">
        <span className="text-indigo-400 font-bold shrink-0">guest@ayushraj:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] caret-indigo-400"
          autoFocus
        />
      </div>
    </div>
  );
}
