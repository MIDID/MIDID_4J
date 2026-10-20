import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Sparkles, Compass, ShieldAlert, ArrowDown } from 'lucide-react';

const OceanLoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING OCEANIC HYDRODYNAMICS...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4s cinematic load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress < 30) {
        setStatusText('INITIALIZING HYDRODYNAMIC MATRIX...');
      } else if (rawProgress < 65) {
        setStatusText('RENDERING 3D FLUID & QUANTUM CAUSTICS...');
      } else if (rawProgress < 90) {
        setStatusText('SYNCHRONIZING MULTI-AGENT TELEMETRY...');
      } else {
        setStatusText('SUBMERSION READY // ENTERING ARCHITECTURE');
      }

      if (rawProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete && onComplete();
          }, 800);
        }, 300);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-between p-8 select-none overflow-hidden"
        >
          {/* Background Ocean Depth Ambience */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-110 animate-pulse duration-1000"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/ocean_abyss.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050e] via-[#050e24]/70 to-[#02050e]" />

          {/* Sonar Depth Rings (The Ocean Agency signature concentric pulse) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.8, 2.5], 
                  opacity: [0.6, 0.2, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: ring * 0.7,
                  ease: "easeOut" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full border border-cyan-400/30"
              />
            ))}
          </div>

          {/* Top Brand Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between z-10 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <Waves size={16} className="text-cyan-400" />
              </div>
              <span className="font-syne text-xs md:text-sm font-bold tracking-widest text-slate-300 uppercase">
                THE OCEANIC ARCHIVE // JESWIN JERARD
              </span>
            </div>

            <div className="font-mono text-[10px] text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-950/40">
              DEPTH_SYS // 2026.04
            </div>
          </div>

          {/* Centerpiece Hero Preloader */}
          <div className="flex flex-col items-center justify-center text-center z-10 max-w-xl space-y-8 my-auto">
            {/* Spinning Hydrodynamic Compass Emblem */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-t-2 border-r-2 border-transparent border-t-cyan-400 border-r-purple-400"
              />
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                <Sparkles size={20} className="text-white animate-pulse" />
              </div>
            </div>

            {/* Giant Monospace Numeric Percentage */}
            <div className="space-y-2">
              <motion.h1 
                className="font-syne text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-500 tracking-tighter"
              >
                {progress < 10 ? `0${progress}` : progress}
                <span className="text-2xl sm:text-4xl text-cyan-400 font-mono font-light ml-1">%</span>
              </motion.h1>

              <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{statusText}</span>
              </div>
            </div>

            {/* Sleek Liquid Gauge Bar */}
            <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono text-slate-500 z-10 pb-4 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Compass size={13} className="text-cyan-400" />
              <span>COORDINATES // 9.5916° N, 76.5222° E</span>
            </span>

            <span className="text-cyan-400 uppercase tracking-wider hidden sm:inline">
              IMMERSIVE SCROLLYTELLING READY
            </span>

            <button
              onClick={() => {
                setIsDone(true);
                onComplete && onComplete();
              }}
              className="hover:text-white transition-colors text-slate-400 underline cursor-pointer"
            >
              SKIP INTRO →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OceanLoadingScreen;
