import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom } from 'lucide-react';

const SuperpositionEffect = ({ isActive, onDeactivate, theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // 'scattering' | 'floating' | 'collapsing' | 'singularity' | 'flash' | 'idle'
  const stateRef = useRef({
    particles: [],
    phase: 'idle',
    target: { x: 0, y: 0 },
    singularityPulse: 0,
    flashRadius: 0,
    startTime: 0,
    collapseStartTime: 0,
  });

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      stateRef.current.phase = 'idle';
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    setPhase('scattering');
    stateRef.current.phase = 'scattering';
    stateRef.current.startTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 1. Procedural Screen Sampling: sample visible elements & background to create 3,500+ dots
    const particles = [];
    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, p, a, button, span, img, .aurora-glass-card, .aurora-glass, nav, .status-pill, .btn-aurora-primary'
    );

    const isLight = theme === 'light';
    const fallbackPalette = isLight
      ? ['#0284c7', '#059669', '#d97706', '#e11d48', '#1e293b', '#475569']
      : ['#f59e0b', '#fbbf24', '#38bdf8', '#a855f7', '#ec4899', '#f8fafc'];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (
        rect.width <= 0 ||
        rect.height <= 0 ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth
      ) {
        return;
      }

      // Check computed color
      const style = window.getComputedStyle(el);
      let color = style.color || fallbackPalette[Math.floor(Math.random() * fallbackPalette.length)];
      if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
        color = fallbackPalette[Math.floor(Math.random() * fallbackPalette.length)];
      }

      // Sample dots across element
      const density = Math.min(rect.width * rect.height, 40000);
      const dotCount = Math.max(4, Math.floor(density / 180));

      for (let i = 0; i < dotCount; i++) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 16 + 4;

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.4 + 1.2,
          color: color,
          alpha: Math.random() * 0.4 + 0.6,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.03 + 0.015,
          floatRadius: Math.random() * 40 + 15,
        });
      }
    });

    // Sample background dots across full screen grid so the whole environment scatters
    const gridCols = Math.floor(window.innerWidth / 36);
    const gridRows = Math.floor(window.innerHeight / 36);
    for (let c = 0; c < gridCols; c++) {
      for (let r = 0; r < gridRows; r++) {
        const x = c * 36 + (Math.random() - 0.5) * 20;
        const y = r * 36 + (Math.random() - 0.5) * 20;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 14 + 3;
        const color = fallbackPalette[Math.floor(Math.random() * fallbackPalette.length)];

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          color: color,
          alpha: Math.random() * 0.35 + 0.35,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.03 + 0.01,
          floatRadius: Math.random() * 50 + 20,
        });
      }
    }

    stateRef.current.particles = particles;

    let animId;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep quantum backdrop
      ctx.fillStyle = isLight ? 'rgba(250, 251, 253, 0.94)' : 'rgba(12, 10, 22, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const curPhase = stateRef.current.phase;
      const target = stateRef.current.target;

      // 1. UPDATE PARTICLES
      let settledCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (curPhase === 'scattering') {
          // Decelerating outward burst
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.92;
          p.vy *= 0.92;

          // Transition to floating after velocity drops
          if (Math.abs(p.vx) < 0.2 && Math.abs(p.vy) < 0.2 && i === 0) {
            stateRef.current.phase = 'floating';
            setPhase('floating');
          }
        } else if (curPhase === 'floating') {
          // Quantum wavefunction drift (oscillating Brownian motion)
          p.wanderAngle += p.wanderSpeed;
          p.x += Math.cos(p.wanderAngle) * 0.75;
          p.y += Math.sin(p.wanderAngle) * 0.75;

          // Boundary bounce
          if (p.x < 10) p.x = canvas.width - 10;
          if (p.x > canvas.width - 10) p.x = 10;
          if (p.y < 10) p.y = canvas.height - 10;
          if (p.y > canvas.height - 10) p.y = 10;
        } else if (curPhase === 'collapsing') {
          // Gravitational pull towards the single click point
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 12) {
            settledCount++;
            p.x = target.x;
            p.y = target.y;
          } else {
            // Speed accelerates as they approach, with a vortex-like curve
            const pullSpeed = Math.min(dist, Math.max(12, dist * 0.14 + 6));
            p.x += (dx / dist) * pullSpeed;
            p.y += (dy / dist) * pullSpeed;

            // Draw subtle convergence quantum streak
            if (i % 6 === 0) {
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = 0.25;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x - (dx / dist) * 12, p.y - (dy / dist) * 12);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        // Draw particle dot
        if (curPhase !== 'singularity' && curPhase !== 'flash') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Check if all dots have collapsed to the single target point
      if (curPhase === 'collapsing') {
        if (settledCount >= particles.length * 0.94 || performance.now() - stateRef.current.collapseStartTime > 1400) {
          stateRef.current.phase = 'singularity';
          stateRef.current.singularityPulse = 0;
          setPhase('singularity');
        }
      }

      // 2. SINGULARITY: The single combined dot pulsating with quantum intensity
      if (curPhase === 'singularity') {
        stateRef.current.singularityPulse += 0.06;
        const pulse = stateRef.current.singularityPulse;
        const radius = Math.sin(pulse * Math.PI) * 10 + 6;

        // Radiant multi-layer quantum glow
        const glowGrad = ctx.createRadialGradient(target.x, target.y, 2, target.x, target.y, radius * 6);
        glowGrad.addColorStop(0, '#ffffff');
        glowGrad.addColorStop(0.25, '#38bdf8');
        glowGrad.addColorStop(0.5, '#fbbf24');
        glowGrad.addColorStop(0.75, '#ec4899');
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(target.x, target.y, radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Intense core dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(target.x, target.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting electron rings
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(target.x, target.y, radius * 3.5, radius * 1.5, pulse * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
        ctx.beginPath();
        ctx.ellipse(target.x, target.y, radius * 3.5, radius * 1.5, -pulse * 2, 0, Math.PI * 2);
        ctx.stroke();

        if (pulse >= 1) {
          stateRef.current.phase = 'flash';
          stateRef.current.flashRadius = 0;
          setPhase('flash');
        }
      }

      // 3. FLASH: Quantum wave expands and restores normal reality
      if (curPhase === 'flash') {
        stateRef.current.flashRadius += 45;
        const r = stateRef.current.flashRadius;
        const maxR = Math.max(canvas.width, canvas.height) * 1.2;
        const alpha = Math.max(0, 1 - r / maxR);

        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(target.x, target.y, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(251, 191, 36, ${alpha * 0.6})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(target.x, target.y, Math.max(0, r - 20), 0, Math.PI * 2);
        ctx.stroke();

        if (r >= maxR) {
          stateRef.current.phase = 'idle';
          setPhase('idle');
          document.body.style.overflow = '';
          onDeactivate();
          return;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isActive, theme, onDeactivate]);

  // Click anywhere to trigger collapse into a single dot
  const handleCanvasClick = (e) => {
    if (stateRef.current.phase === 'scattering' || stateRef.current.phase === 'floating') {
      stateRef.current.target = { x: e.clientX, y: e.clientY };
      stateRef.current.phase = 'collapsing';
      stateRef.current.collapseStartTime = performance.now();
      setPhase('collapsing');
    }
  };

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] cursor-pointer select-none overflow-hidden"
      onClick={handleCanvasClick}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />

      {/* Quantum Superposition Floating Status Pill */}
      <AnimatePresence>
        {(phase === 'scattering' || phase === 'floating') && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none px-6 py-3 rounded-full bg-[#120e24]/90 border border-amber-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.35)] flex items-center gap-3 text-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-500 p-[1px] animate-spin">
              <div className="w-full h-full bg-[#120e24] rounded-full flex items-center justify-center">
                <Atom size={16} className="text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-amber-300 flex items-center gap-1.5 justify-center">
                <span>|ψ⟩ SUPERPOSITION ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-[11px] font-space text-slate-300">
                Click anywhere to collapse all dots into a single dot and restore reality
              </p>
            </div>
          </motion.div>
        )}

        {phase === 'collapsing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none px-5 py-2.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 backdrop-blur-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2"
          >
            <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
              COLLAPSING WAVEFUNCTION TO SINGULARITY...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperpositionEffect;
