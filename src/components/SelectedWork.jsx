import React from 'react';
import { Github, ExternalLink, Sparkles } from 'lucide-react';

const projects = [
  {
    num: "01",
    name: "Pixellon Hub",
    status: "ONGOING",
    desc: "A collaborative learning hub promoting technical events, discussions, and open-source contributions. Empowers students and developers to coordinate coding sprints, design challenges, and practical software applications.",
    stack: ["React", "Node", "Express", "REST APIs"],
    link: "https://github.com/ayushraj16",
    isGithub: true,
  },
  {
    num: "02",
    name: "Food Xplorer",
    status: "PRODUCTION",
    desc: "Responsive food discovery application connecting dining enthusiasts to ratings, coordinates, and menus. Implemented client-side routing, Firebase database streams, and REST operations.",
    stack: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    link: "https://foodxplorer.pixellon.in/",
    isGithub: false,
  },
  {
    num: "03",
    name: "Twitter Sentiment Classifier",
    status: "COMPLETE",
    desc: "Natural language pipeline classifying social media data into positive, neutral, and negative. Built using TF-IDF tokenization, yielding 85% accuracy with Bayesian models.",
    stack: ["Python", "NLP", "Scikit-Learn", "Pandas"],
    link: "https://github.com/ayushraj16",
    isGithub: true,
  },
  {
    num: "04",
    name: "Face Rec KNN Engine",
    status: "STABLE",
    desc: "Real-time biometric recognition engine classifying live webcam coordinates using K-Nearest Neighbors. Utilizes OpenCV for matrix extraction and feature matching.",
    stack: ["Python", "OpenCV", "KNN", "NumPy"],
    link: "https://github.com/ayushraj16/Face-recognition-using-KNN",
    isGithub: true,
  },
  {
    num: "05",
    name: "Cassava Leaf Classifier",
    status: "STABLE",
    desc: "Deep convolutional network designed to classify leaf anomalies in cassava crops. Resolves model convergence and classification boundaries using advanced TensorFlow layers.",
    stack: ["Python", "TensorFlow", "CNN", "Computer Vision"],
    link: "https://github.com/ayushraj16/Casava-Disease-Detection",
    isGithub: true,
  },
  {
    num: "06",
    name: "Friday AI Bot",
    status: "STABLE",
    desc: "Voice-responsive conversational chatbot modeled after visual sci-fi HUD arrays. Custom processing mapping speech strings to browser executions and REST responses.",
    stack: ["JavaScript", "Speech API", "NLP", "CSS3"],
    link: "https://github.com/ayushraj16/FrIday-Chatbot",
    isGithub: true,
  },
  {
    num: "07",
    name: "Signature Forgery Detect",
    status: "STABLE",
    desc: "Siamese Neural Network trained on structural signature samples to isolate genuine vs forged outlines. Leverages contrastive loss functions and Gradio dashboard visualization.",
    stack: ["Python", "PyTorch", "Siamese Net", "Gradio"],
    link: "https://github.com/ayushraj16/-Signature-Forgery-Detection-using-Siamese-Network-CEDAR-Dataset-",
    isGithub: true,
  },
  {
    num: "08",
    name: "Snake Game App",
    status: "STABLE",
    desc: "Interactive arcade client rendered within Gradio interfaces. Implemented core loop updates and local state handlers in Python scripts.",
    stack: ["Python", "Gradio", "Game Loop"],
    link: "https://github.com/ayushraj16/SnakeGame---Gradio-Web-App",
    isGithub: true,
  }
];

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="relative bg-transparent py-24 overflow-hidden border-t border-white/[0.02]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Section Header Text */}
      <div className="max-w-7xl mx-auto mb-16 px-6 md:px-12 lg:px-20">
        <span className="text-xs font-mono text-indigo-400 tracking-[0.25em] uppercase flex items-center gap-1.5 justify-start select-none">
          <Sparkles className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
          // FEATURED REGISTRIES
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300 mt-2 select-none">
          SELECTED WORK
        </h2>
      </div>

      {/* Infinite Marquee Loop Slider */}
      <div className="w-full overflow-hidden relative py-4 pointer-events-auto">
        {/* Cinematic gradient shadow overlays for faded edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-36 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-36 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

        {/* Marquee flex track */}
        <div className="project-marquee-track pointer-events-auto">
          {/* Double the projects list to create seamless looping */}
          {[...projects, ...projects].map((project, idx) => (
            <div
              key={`${project.num}-${idx}`}
              className="flex-shrink-0 w-[85vw] sm:w-[450px] h-[340px] glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border-white/5 cursor-pointer pointer-events-auto"
            >
              {/* Floating Big Index Badge */}
              <div className="absolute -top-4 -right-4 w-28 h-28 pointer-events-none select-none opacity-[0.015] group-hover:opacity-[0.035] transition-opacity duration-500">
                <div className="font-display text-8xl font-black text-white text-right">
                  {project.num}
                </div>
              </div>

              {/* Card Top Row */}
              <div className="flex justify-between items-center z-10">
                <span className="font-mono text-xs text-indigo-400/80 tracking-widest font-semibold">
                  PROJECT {project.num}
                </span>
                <span className={`font-mono text-[9px] border px-2.5 py-0.5 rounded-full tracking-widest font-medium ${
                  project.status === 'ONGOING'
                    ? 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                    : project.status === 'PRODUCTION'
                    ? 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5'
                    : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="mt-6 z-10">
                <h3 className="text-xl md:text-2xl font-extrabold font-display text-white mb-2.5 group-hover:text-indigo-300 transition-colors duration-300 tracking-tight">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Stack badges & Button */}
              <div className="mt-auto z-10">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-slate-400 group-hover:border-indigo-500/15 group-hover:text-slate-300 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct Action anchor */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 hover:text-indigo-300 uppercase tracking-widest group-hover:gap-2.5 transition-all duration-300 pointer-events-auto font-bold"
                >
                  {project.isGithub ? (
                    <>
                      <span>REPOSITORY.SH</span>
                      <Github className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>LIVE_DEPLOY.EXE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
