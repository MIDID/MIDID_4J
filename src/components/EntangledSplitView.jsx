import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, X, ArrowDownUp, RefreshCw, Sun, Moon } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import SkillModal from './SkillModal';

const EntangledSplitView = ({ 
  isActive, 
  onClose, 
  baseTheme = 'dark',
  onSkillClick 
}) => {
  const [themeA, setThemeA] = useState(baseTheme);
  // Theme B is always the quantum opposite of Theme A
  const themeB = themeA === 'dark' ? 'light' : 'dark';

  const [activeSkillA, setActiveSkillA] = useState(null);
  const [activeSkillB, setActiveSkillB] = useState(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isSyncingRef = useRef(false);

  // Mouse anti-correlation tracking
  const [mouseA, setMouseA] = useState({ x: 0, y: 0, active: false });
  const [mouseB, setMouseB] = useState({ x: 0, y: 0, active: false });

  // Sync scroll in opposite direction
  const handleLeftScroll = () => {
    if (isSyncingRef.current || !leftRef.current || !rightRef.current) return;
    isSyncingRef.current = true;
    const maxLeft = leftRef.current.scrollHeight - leftRef.current.clientHeight;
    const maxRight = rightRef.current.scrollHeight - rightRef.current.clientHeight;
    if (maxLeft > 0 && maxRight > 0) {
      const ratio = leftRef.current.scrollTop / maxLeft;
      // Opposite scroll: ratio on left translates to (1 - ratio) on right
      rightRef.current.scrollTop = (1 - ratio) * maxRight;
    }
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  };

  const handleRightScroll = () => {
    if (isSyncingRef.current || !leftRef.current || !rightRef.current) return;
    isSyncingRef.current = true;
    const maxLeft = leftRef.current.scrollHeight - leftRef.current.clientHeight;
    const maxRight = rightRef.current.scrollHeight - rightRef.current.clientHeight;
    if (maxLeft > 0 && maxRight > 0) {
      const ratio = rightRef.current.scrollTop / maxRight;
      leftRef.current.scrollTop = (1 - ratio) * maxLeft;
    }
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  };

  // Mouse moves on Left -> create opposite ghost cursor on Right
  const handleLeftMouseMove = (e) => {
    const rect = leftRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseA({ x, y, active: true });
    // Invert position for Bob (opposite x and opposite y)
    setMouseB({ 
      x: rect.width - x, 
      y: rect.height - y, 
      active: true 
    });
  };

  // Mouse moves on Right -> create opposite ghost cursor on Left
  const handleRightMouseMove = (e) => {
    const rect = rightRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseB({ x, y, active: true });
    setMouseA({ 
      x: rect.width - x, 
      y: rect.height - y, 
      active: true 
    });
  };

  const handleMouseLeave = () => {
    setMouseA(prev => ({ ...prev, active: false }));
    setMouseB(prev => ({ ...prev, active: false }));
  };

  // Toggle theme flips both opposite sides
  const toggleTheme = () => {
    setThemeA(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      // Initialize right screen scrolled to bottom while left is at top
      setTimeout(() => {
        if (rightRef.current) {
          rightRef.current.scrollTop = rightRef.current.scrollHeight;
        }
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[99999] flex flex-col bg-[#0a0814] select-none font-space"
    >
      {/* Top Quantum Entanglement Command Bar */}
      <header className="h-14 bg-[#100d20]/95 border-b border-amber-500/30 backdrop-blur-xl flex items-center justify-between px-4 z-50 shrink-0 shadow-lg">
        {/* Subsystem A Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300">
            CHANNEL A: |↑⟩ SPIN-UP (ALICE)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 uppercase">
            Theme: {themeA}
          </span>
        </div>

        {/* Center Quantum Status & Disentangle CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono">
            <ArrowDownUp size={14} className="text-amber-400 animate-bounce" />
            <span>OPPOSITE SCROLL & SPIN SYNCHRONIZED</span>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 transition-colors"
            title="Invert Quantum Spin (Flips both themes oppositely)"
          >
            <RefreshCw size={12} className="text-amber-400" />
            <span>Invert Spin</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-600/90 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all hover:scale-105 cursor-pointer"
          >
            <X size={14} />
            <span>DISENTANGLE</span>
          </button>
        </div>

        {/* Subsystem B Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-200 uppercase">
            Theme: {themeB}
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-pink-400">
            CHANNEL B: |↓⟩ SPIN-DOWN (BOB)
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
        </div>
      </header>

      {/* Main 2-Screen Split View */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        
        {/* ================= LEFT SCREEN (CHANNEL A) ================= */}
        <div 
          ref={leftRef}
          onScroll={handleLeftScroll}
          onMouseMove={handleLeftMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex-1 h-full overflow-y-auto relative transition-colors duration-300 ${
            themeA === 'light' ? 'bg-[#fafbfd] text-[#1e293b]' : 'bg-[#0f0e17] text-[#f5f3f8]'
          }`}
        >
          {/* Subsystem A Corner Badge */}
          <div className="sticky top-3 left-4 z-40 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-md ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Screen 1: Scroll down to push Screen 2 up</span>
          </div>

          {/* Ghost Inverted Anti-Particle Cursor from Screen B */}
          {mouseA.active && (
            <div 
              className="pointer-events-none fixed w-5 h-5 rounded-full border-2 border-pink-400 bg-pink-500/30 shadow-[0_0_15px_#f43f5e] z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
              style={{ left: mouseA.x, top: mouseA.y + 56 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          )}

          <div className="px-2 md:px-6">
            <Hero theme={themeA} />
            <About theme={themeA} />
            <Projects theme={themeA} />
            <Skills theme={themeA} onSkillClick={setActiveSkillA} />
            <Contact theme={themeA} />
          </div>

          <SkillModal skill={activeSkillA} onClose={() => setActiveSkillA(null)} />
        </div>

        {/* ================= QUANTUM ENTANGLEMENT DIVIDER ================= */}
        <div className="w-2.5 bg-gradient-to-b from-cyan-400 via-amber-400 to-pink-500 relative flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(245,158,11,0.6)] z-40">
          {/* Pulsing Quantum Bead */}
          <div className="w-7 h-7 rounded-full bg-[#120e24] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_#f59e0b] animate-pulse">
            <GitFork size={14} className="text-amber-300 rotate-90" />
          </div>
          <div className="absolute top-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400/40 blur-xs"></div>
          <div className="absolute bottom-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-400/40 blur-xs"></div>
        </div>

        {/* ================= RIGHT SCREEN (CHANNEL B - ENTANGLED OPPOSITE) ================= */}
        <div 
          ref={rightRef}
          onScroll={handleRightScroll}
          onMouseMove={handleRightMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex-1 h-full overflow-y-auto relative transition-colors duration-300 ${
            themeB === 'light' ? 'bg-[#fafbfd] text-[#1e293b]' : 'bg-[#0f0e17] text-[#f5f3f8]'
          }`}
        >
          {/* Subsystem B Corner Badge */}
          <div className="sticky top-3 right-4 z-40 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-[11px] font-mono text-pink-300 backdrop-blur-md shadow-md ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
            <span>Screen 2: Opposite Parity & Inverted Action</span>
          </div>

          {/* Ghost Inverted Anti-Particle Cursor from Screen A */}
          {mouseB.active && (
            <div 
              className="pointer-events-none fixed w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-500/30 shadow-[0_0_15px_#06b6d4] z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
              style={{ left: mouseB.x + (leftRef.current?.clientWidth || 0) + 10, top: mouseB.y + 56 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          )}

          <div className="px-2 md:px-6">
            <Hero theme={themeB} />
            <About theme={themeB} />
            <Projects theme={themeB} />
            <Skills theme={themeB} onSkillClick={setActiveSkillB} />
            <Contact theme={themeB} />
          </div>

          <SkillModal skill={activeSkillB} onClose={() => setActiveSkillB(null)} />
        </div>

      </div>
    </motion.div>
  );
};

export default EntangledSplitView;
