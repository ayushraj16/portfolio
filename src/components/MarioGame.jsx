import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

// Simple Web Audio API retro sound generator
const playSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'jump') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.13);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.36);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } else if (type === 'score') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    // Audio Context is blocked or not supported
  }
};

export default function MarioGame() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('mario_high') || '0', 10);
  });
  const [muted, setMuted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Mario physics coordinates
  const marioY = useRef(0);
  const marioVelocity = useRef(0);
  const isJumping = useRef(false);

  // Obstacles list: { id, x, width, height }
  const obstacles = useRef([]);
  const obstacleId = useRef(0);
  const speed = useRef(5);
  const spawnTimer = useRef(0);

  // Visual render triggers
  const [renderMarioY, setRenderMarioY] = useState(0);
  const [renderObstacles, setRenderObstacles] = useState([]);

  // Gravity constants
  const GRAVITY = 0.55;
  const JUMP_STRENGTH = 10;
  const MARIO_WIDTH = 32;
  const MARIO_HEIGHT = 44;
  const OBSTACLE_WIDTH = 26;
  const OBSTACLE_HEIGHT = 32;

  // Retrieve highscore on mount
  useEffect(() => {
    const saved = localStorage.getItem('mario_high');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Intercept space/up arrow only when focused or playing to avoid scroll locks on other sections
      if ((e.code === 'Space' || e.code === 'ArrowUp') && (isFocused || gameState === 'PLAYING')) {
        e.preventDefault(); // Stop window scrolling
        triggerJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isFocused]);

  const triggerJump = () => {
    if (gameState === 'START') {
      startGame();
    } else if (gameState === 'GAMEOVER') {
      startGame();
    } else if (gameState === 'PLAYING' && !isJumping.current) {
      marioVelocity.current = JUMP_STRENGTH;
      isJumping.current = true;
      playSound('jump', muted);
    }
  };

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    marioY.current = 0;
    marioVelocity.current = 0;
    isJumping.current = false;
    obstacles.current = [];
    obstacleId.current = 0;
    speed.current = 5.2;
    spawnTimer.current = 0;
    setIsFocused(true);

    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    setGameState('GAMEOVER');
    playSound('hit', muted);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);

    setScore(prev => {
      if (prev > highScore) {
        setHighScore(prev);
        localStorage.setItem('mario_high', prev.toString());
      }
      return prev;
    });
  };

  const gameLoop = (timestamp) => {
    // 1. Jump Physics calculation
    if (isJumping.current) {
      marioY.current += marioVelocity.current;
      marioVelocity.current -= GRAVITY;
      if (marioY.current <= 0) {
        marioY.current = 0;
        marioVelocity.current = 0;
        isJumping.current = false;
      }
    }

    // 2. Spawn incoming obstacles
    spawnTimer.current++;
    if (spawnTimer.current > 75 + Math.random() * 50) {
      spawnTimer.current = 0;
      obstacles.current.push({
        id: obstacleId.current++,
        x: 100, // 100% position on container width
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT + (Math.random() > 0.7 ? 8 : 0) // random variance
      });
    }

    // 3. Move obstacles left & filter out-of-bounds
    obstacles.current = obstacles.current
      .map(obs => ({ ...obs, x: obs.x - (speed.current / 4.5) })) // scale factor matching layout percentages
      .filter(obs => obs.x > -10);

    // 4. Score increment & speed scalar
    setScore(prev => {
      const nextScore = prev + 1;
      if (nextScore % 200 === 0) {
        speed.current += 0.45;
        playSound('score', muted);
      }
      return nextScore;
    });

    // 5. Collision Checks
    const marioLeft = 10; // 10% left offset
    const containerWidth = containerRef.current ? containerRef.current.clientWidth : 400;
    const marioPercentWidth = (MARIO_WIDTH / containerWidth) * 100;
    const marioRight = marioLeft + marioPercentWidth;

    for (let i = 0; i < obstacles.current.length; i++) {
      const obs = obstacles.current[i];
      const obsPercentWidth = (obs.width / containerWidth) * 100;
      const obsLeft = obs.x;
      const obsRight = obs.x + obsPercentWidth;

      // Horizontal overlap check
      if (obsLeft < marioRight && obsRight > marioLeft) {
        // Vertical check
        if (marioY.current < obs.height) {
          endGame();
          return; // Stop animation loop immediately
        }
      }
    }

    // 6. Push renders
    setRenderMarioY(marioY.current);
    setRenderObstacles([...obstacles.current]);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  // Handle pointer/tap interactions on the container
  const handleInteraction = (e) => {
    // Detect touch to prevent double click triggers on mobile
    if (e.type === 'touchstart') {
      setIsFocused(true);
      if (gameState === 'PLAYING') {
        triggerJump();
      } else {
        startGame();
      }
      e.preventDefault(); // Stop click emulation
    } else if (e.type === 'click') {
      setIsFocused(true);
      if (gameState === 'PLAYING') {
        triggerJump();
      } else {
        startGame();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className={`relative w-full h-full bg-black/70 border rounded-xl overflow-hidden flex flex-col justify-end font-mono select-none pointer-events-auto transition-all duration-300 ${
        isFocused ? 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'border-white/10'
      }`}
    >
      {/* HUD Info Header */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center text-[10px] text-slate-500 z-20">
        <div className="flex gap-4">
          <span>SCORE: <strong className="text-white">{score}</strong></span>
          <span>HI-SCORE: <strong className="text-indigo-400">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">[ SPACE / CLICK TO JUMP ]</span>
          <span className="inline sm:hidden">[ TAP TO JUMP ]</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMuted(!muted);
            }} 
            onTouchStart={(e) => {
              e.stopPropagation();
              setMuted(!muted);
              e.preventDefault();
            }}
            className="hover:text-indigo-400 p-0.5 pointer-events-auto"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-fuchsia-400" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Playfield Area */}
      <div className="relative flex-1 border-b border-dashed border-indigo-500/20">
        
        {/* Mario sprite (Stylized Neon Indigo SVG Plumber) */}
        <div 
          className="absolute"
          style={{
            left: '10%',
            bottom: `${renderMarioY}px`,
            width: `${MARIO_WIDTH}px`,
            height: `${MARIO_HEIGHT}px`,
            transition: 'bottom 0.016s linear', // smooth physics
          }}
        >
          <svg viewBox="0 0 32 44" className="w-full h-full">
            <path 
              d="M 12,4 L 20,4 L 20,8 L 24,8 L 24,12 L 8,12 L 8,8 L 12,8 Z M 6,12 L 26,12 L 26,16 L 22,16 L 22,24 L 26,24 L 26,32 L 22,32 L 22,40 L 10,40 L 10,32 L 6,32 Z" 
              fill="none" 
              stroke="#6366f1" 
              strokeWidth="1.8"
              className={gameState === 'PLAYING' && renderMarioY === 0 ? 'animate-pulse' : ''}
            />
            {/* Stylized Glowing Eyes */}
            <rect x="14" y="6" width="2" height="2" fill="#10b981" />
            <rect x="18" y="6" width="2" height="2" fill="#10b981" />
          </svg>
        </div>

        {/* Spawning Mushroom Obstacles */}
        {renderObstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute"
            style={{
              left: `${obs.x}%`,
              bottom: '0px',
              width: `${obs.width}px`,
              height: `${obs.height}px`,
            }}
          >
            <svg viewBox="0 0 26 32" className="w-full h-full">
              <path 
                d="M 6,14 C 6,6 20,6 20,14 C 20,20 24,20 24,24 L 2,24 C 2,20 6,20 6,14 Z M 8,24 L 18,24 L 18,30 L 8,30 Z" 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="1.8" 
              />
              <circle cx="10" cy="14" r="1.5" fill="#10b981" />
              <circle cx="16" cy="14" r="1.5" fill="#10b981" />
            </svg>
          </div>
        ))}
      </div>

      {/* Decorative Ground Lines */}
      <div className="h-14 bg-black/40 flex items-center justify-center p-3 relative">
        <div className="absolute inset-x-0 top-1 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        
        {/* START SCREEN PANEL */}
        {gameState === 'START' && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              startGame();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              startGame();
              e.preventDefault();
            }}
            className="flex items-center gap-2 bg-indigo-500 text-white font-bold text-[10px] px-5 py-1.5 rounded-lg uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200 z-30 pointer-events-auto cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>PLAY MARIO RUNNER</span>
          </button>
        )}

        {/* ACTIVE / FOCUS PROMPT */}
        {gameState === 'PLAYING' && !isFocused && (
          <span className="text-[9px] text-fuchsia-400 uppercase tracking-widest animate-pulse">
            [ CLICK GAME CONTAINER TO ENGAGE CONTROLS ]
          </span>
        )}
        {gameState === 'PLAYING' && isFocused && (
          <span className="text-[9px] text-slate-500 uppercase tracking-widest">
            INTERACTION ENGAGED // PRESS SPACE OR TAP TO JUMP
          </span>
        )}

        {/* GAMEOVER PANEL */}
        {gameState === 'GAMEOVER' && (
          <div className="flex items-center gap-4 z-30">
            <span className="text-xs text-fuchsia-400 font-bold uppercase tracking-widest">
              GAME OVER
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                startGame();
                e.preventDefault();
              }}
              className="flex items-center gap-1.5 bg-fuchsia-500 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg uppercase hover:bg-white hover:text-black transition-colors duration-200 pointer-events-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESTART</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
