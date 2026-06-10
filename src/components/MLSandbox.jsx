import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function MLSandbox() {
  const [dataset, setDataset] = useState('nlp');
  const [lr, setLr] = useState(0.01);
  const [epochs, setEpochs] = useState(40);
  const [split, setSplit] = useState(80);
  const [isTraining, setIsTraining] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState(['> System ready. Awaiting training initialization...']);
  
  // Matrix and Metrics State
  const [metrics, setMetrics] = useState({
    tp: 0, fp: 0, fn: 0, tn: 0,
    accuracy: '0.0%', precision: '0.0%', f1: '0.0%'
  });

  const canvasRef = useRef(null);
  const consoleRef = useRef(null);
  const trainingInterval = useRef(null);

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Clean interval on unmount
  useEffect(() => {
    return () => {
      if (trainingInterval.current) clearInterval(trainingInterval.current);
    };
  }, []);

  const drawCurves = (trainAccs, valAccs, losses, totalEpochs) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.getBoundingClientRect().width;
    const h = canvas.height = canvas.getBoundingClientRect().height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Draw horizontal grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      let y = (h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const step = w / (totalEpochs - 1 || 1);

    // Draw Loss curve (Violet)
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < losses.length; i++) {
      let x = i * step;
      let y = h - (losses[i] * (h * 0.82)); // Scale loss representation
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Validation Accuracy curve (Emerald)
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < valAccs.length; i++) {
      let x = i * step;
      let y = h - (valAccs[i] * (h * 0.82)); // Scale accuracy representation
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  const startTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    
    // Reset states
    const initialLog = [
      `> Initializing compiler pipeline...`,
      `> Pipeline: DATASET=${dataset.toUpperCase()} | LR=${lr.toFixed(3)} | EPOCHS=${epochs} | SPLIT=${split}/${100-split}`
    ];
    setConsoleLogs(initialLog);
    setMetrics({
      tp: 0, fp: 0, fn: 0, tn: 0,
      accuracy: '0.0%', precision: '0.0%', f1: '0.0%'
    });

    // Clear previous canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    let currentEpoch = 1;
    const trainAccs = [];
    const valAccs = [];
    const losses = [];

    trainingInterval.current = setInterval(() => {
      if (currentEpoch <= epochs) {
        const baseAcc = dataset === 'cnn' ? 0.72 : dataset === 'knn' ? 0.81 : 0.79;
        const lrFactor = Math.abs(lr - 0.01) * 3.8;
        const noise = (Math.random() - 0.5) * 0.035;
        
        let acc = baseAcc + (1 - Math.exp(-currentEpoch / 22)) * 0.16 - lrFactor + noise;
        let valAcc = acc - 0.025 - (split < 70 ? 0.05 : 0) + (Math.random() * 0.02);
        let loss = Math.exp(-currentEpoch / 12) * 0.78 + 0.11 + lrFactor + (Math.random() * 0.03);

        acc = Math.min(Math.max(acc, 0.1), 0.99);
        valAcc = Math.min(Math.max(valAcc, 0.1), 0.985);
        loss = Math.max(loss, 0.04);

        trainAccs.push(acc);
        valAccs.push(valAcc);
        losses.push(loss);

        setConsoleLogs(prev => [
          ...prev,
          `Epoch ${currentEpoch}/${epochs} - loss: ${loss.toFixed(4)} - acc: ${acc.toFixed(4)} - val_acc: ${valAcc.toFixed(4)}`
        ]);

        drawCurves(trainAccs, valAccs, losses, epochs);
        
        currentEpoch++;
      } else {
        clearInterval(trainingInterval.current);
        setIsTraining(false);

        const finalValAcc = valAccs[valAccs.length - 1];
        const tp = Math.round(finalValAcc * 145 + (Math.random() * 4));
        const tn = Math.round(finalValAcc * 135 + (Math.random() * 4));
        const fp = Math.round((1 - finalValAcc) * 55);
        const fn = Math.round((1 - finalValAcc) * 45);

        const accuracy = (finalValAcc * 100).toFixed(1) + "%";
        const precision = ((tp / (tp + fp)) * 100).toFixed(1) + "%";
        const f1 = ((2 * tp / (2 * tp + fp + fn)) * 100).toFixed(1) + "%";

        setMetrics({ tp, tn, fp, fn, accuracy, precision, f1 });
        setConsoleLogs(prev => [
          ...prev,
          `> Training routine completed successfully.`,
          `> Model weights saved. Validation Accuracy: ${accuracy}`
        ]);
      }
    }, 80);
  };

  return (
    <div className="flex flex-col h-full text-slate-300 font-mono text-xs gap-4 pointer-events-auto">
      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
        {/* Dataset Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">// Dataset Pipeline</label>
          <select 
            value={dataset} 
            onChange={(e) => setDataset(e.target.value)}
            disabled={isTraining}
            className="bg-[#030303] border border-white/10 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500/50 text-xs text-white"
          >
            <option value="nlp">Twitter Sentiment (NLP LogReg)</option>
            <option value="knn">Biometric Face (OpenCV KNN)</option>
            <option value="cnn">Cassava Crop (CNN ResNet)</option>
          </select>
        </div>

        {/* Learning Rate Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            <span>// Learning Rate</span>
            <span className="text-indigo-400 font-mono">{lr.toFixed(3)}</span>
          </div>
          <input 
            type="range" 
            min="0.001" 
            max="0.100" 
            step="0.001" 
            value={lr} 
            onChange={(e) => setLr(parseFloat(e.target.value))}
            disabled={isTraining}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Epochs Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            <span>// Epochs</span>
            <span className="text-indigo-400 font-mono">{epochs}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            step="5" 
            value={epochs} 
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            disabled={isTraining}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Train/Test Split Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            <span>// Split Ratio</span>
            <span className="text-indigo-400 font-mono">{split}/{100-split}</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="90" 
            step="5" 
            value={split} 
            onChange={(e) => setSplit(parseInt(e.target.value))}
            disabled={isTraining}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* Output Console Logger */}
      <div 
        ref={consoleRef} 
        className="h-28 bg-[#020306]/75 border border-white/5 rounded-lg p-3 overflow-y-auto font-mono text-[10px] text-indigo-300 leading-relaxed select-text"
      >
        {consoleLogs.map((log, index) => (
          <div key={index} className="whitespace-pre-wrap">{log}</div>
        ))}
      </div>

      {/* Charts & Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Graph Canvas */}
        <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between h-[220px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              // Train Loss (Violet) vs Val Acc (Emerald)
            </span>
            <button 
              onClick={startTraining}
              disabled={isTraining}
              className="flex items-center gap-1.5 bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-indigo-600 transition-colors duration-200 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>RUN_TRAINING</span>
            </button>
          </div>
          <div className="flex-1 w-full bg-black/20 rounded-lg relative overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>

        {/* Confusion Matrix and Metrics */}
        <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-2 block">
            // Evaluation Matrix
          </span>
          <div className="grid grid-cols-2 gap-1.5 bg-white/[0.02] p-1.5 rounded-lg">
            <div className="bg-[#030303]/85 p-2 flex flex-col items-center justify-center rounded-lg border border-white/5">
              <span className="text-sm font-bold text-emerald-400">{metrics.tp}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">True Pos</span>
            </div>
            <div className="bg-[#030303]/85 p-2 flex flex-col items-center justify-center rounded-lg border border-white/5">
              <span className="text-sm font-bold text-fuchsia-400">{metrics.fp}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">False Pos</span>
            </div>
            <div className="bg-[#030303]/85 p-2 flex flex-col items-center justify-center rounded-lg border border-white/5">
              <span className="text-sm font-bold text-fuchsia-400">{metrics.fn}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">False Neg</span>
            </div>
            <div className="bg-[#030303]/85 p-2 flex flex-col items-center justify-center rounded-lg border border-white/5">
              <span className="text-sm font-bold text-emerald-400">{metrics.tn}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">True Neg</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-[#030303]/65 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] font-bold text-white font-mono">{metrics.accuracy}</div>
              <div className="text-[7px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Accuracy</div>
            </div>
            <div className="bg-[#030303]/65 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] font-bold text-white font-mono">{metrics.precision}</div>
              <div className="text-[7px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Precision</div>
            </div>
            <div className="bg-[#030303]/65 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] font-bold text-white font-mono">{metrics.f1}</div>
              <div className="text-[7px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">F1-Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
