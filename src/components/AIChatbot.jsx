import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, AlertCircle } from 'lucide-react';

const CHAT_KNOWLEDGE_BASE = {
  ml: `Ayush K. Raj is an ML Engineer & Data Scientist. Here are some of his key machine learning highlights:
• Data Scientist Trainer at Zoople Technologies, where he mentored 20+ trainees in regression, SVMs, and optimization algorithms.
• Signature Forgery Detection: A PyTorch Siamese Neural Network architecture designed to detect forged signatures using CEDAR datasets.
• Crop Disease Detection: A Convolutional Neural Network (CNN) built in TensorFlow to identify leaf anomalies in cassava crops.
• Biometric Recognitions: Real-time face recognition camera systems using K-Nearest Neighbors (KNN) and OpenCV.`,
  
  skills: `Ayush's programming language and engineering toolkit includes:
• Languages: Python (Expert), JavaScript (Node/React), SQL, Java, C++, and Dart.
• Data Science & AI: Scikit-learn, TensorFlow, PyTorch, Natural Language Processing (NLP), Pandas, NumPy, OpenCV, and Gradio.
• Full Stack: React.js, Node.js, Express.js, Flutter, REST APIs, and Firebase.`,
  
  projects: `Some of Ayush's select project registries:
• Pixellon Hub: Collaborative hub for developer event tracks and open-source packages.
• Food Xplorer: A production-ready food discovery dashboard styled using React/Firebase.
• Twitter Sentiment NLP: Custom natural language pipeline classifying tweets using Scikit-Learn.
• Siamese Signature WebApp: Forgery checker with PyTorch and a clean Gradio visual interface.`,
  
  contact: `You can reach out to Ayush via the following endpoints:
• Email: aayushraj1601@gmail.com
• GitHub: github.com/ayushraj16
• LinkedIn: linkedin.com/in/ayushraj-datascientist-aiengineer/

Feel free to scroll to the bottom contact form to send a message directly!`,

  about: `Ayush is a Data System Engineer currently based in India. He specializes in the intersection of data pipelines and visual interfaces. He builds models that process metrics, and wraps them in elegant, interactive web shells that feel responsive and high-fidelity.`
};

const CHIPS = [
  { label: "🤖 Tell me about his ML work", value: "ml" },
  { label: "⚡ What are his tech skills?", value: "skills" },
  { label: "📁 Showcase his projects", value: "projects" },
  { label: "📞 Get contact details", value: "contact" }
];

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am Ayush's Virtual AI Assistant. Ask me anything about his professional experience, key skills, or portfolio projects!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerAIResponse = (queryValue) => {
    setIsTyping(true);
    
    // Simulate streaming network response delay
    setTimeout(() => {
      let reply = "";
      const val = queryValue.toLowerCase();

      if (val.includes('ml') || val.includes('machine learning') || val.includes('ai') || val.includes('data science') || val === 'ml') {
        reply = CHAT_KNOWLEDGE_BASE.ml;
      } else if (val.includes('skill') || val.includes('tech') || val.includes('language') || val.includes('framework') || val === 'skills') {
        reply = CHAT_KNOWLEDGE_BASE.skills;
      } else if (val.includes('project') || val.includes('code') || val.includes('work') || val === 'projects') {
        reply = CHAT_KNOWLEDGE_BASE.projects;
      } else if (val.includes('contact') || val.includes('email') || val.includes('hire') || val.includes('link') || val === 'contact') {
        reply = CHAT_KNOWLEDGE_BASE.contact;
      } else if (val.includes('about') || val.includes('who is') || val.includes('profile') || val === 'about') {
        reply = CHAT_KNOWLEDGE_BASE.about;
      } else {
        reply = `I'm not fully configured to parse "${queryValue}" yet! You can try clicking one of the quick options or ask about his: 'ML work', 'skills', 'projects', or 'contact'.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputValue('');
    triggerAIResponse(text);
  };

  const handleChipClick = (value, label) => {
    if (isTyping) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: label.replace(/^[^\s]+\s/, ''), // Remove emoji
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    triggerAIResponse(value);
  };

  return (
    <div className="flex flex-col h-full bg-[#07080e]/60 text-slate-200 border border-white/5 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-white/[0.02] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-[#07080e] rounded-full" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white tracking-wide font-display">AYUSH AI CO-PILOT</h4>
            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block mt-0.5">AGENT // ACTIVE</span>
          </div>
        </div>
        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider hidden sm:block">
          MODELS.3.5_ENGINE
        </div>
      </div>

      {/* Chat Messages Body */}
      <div 
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 scroll-smooth min-h-0"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[9px] text-slate-500 font-mono">
                {msg.sender === 'user' ? (
                  <>
                    <span>{msg.time}</span>
                    <User className="w-2.5 h-2.5 text-indigo-400" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                    <span>AI Assistant · {msg.time}</span>
                  </>
                )}
              </div>
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[11px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-indigo-500/80 to-purple-600/80 text-white rounded-tr-none'
                    : 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[9px] text-slate-500 font-mono">
                <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                <span>AI is formulating...</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Chips */}
      <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none pointer-events-auto">
        {CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip.value, chip.label)}
            disabled={isTyping}
            className="flex-shrink-0 px-2.5 py-1 text-[10px] bg-white/[0.02] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 rounded-full text-slate-400 hover:text-indigo-300 transition-all duration-300 pointer-events-auto"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Input form */}
      <form 
        onSubmit={handleSend}
        className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center gap-2 shrink-0 pointer-events-auto"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a custom question..."
          disabled={isTyping}
          className="flex-1 bg-white/[0.03] border border-white/5 focus:border-indigo-500/35 rounded-lg px-3 py-2 text-[11px] text-white outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 font-sans"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="w-8 h-8 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white flex items-center justify-center transition-all duration-300 cursor-pointer pointer-events-auto shadow-md hover:shadow-indigo-500/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
