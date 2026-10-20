import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, Cpu } from 'lucide-react';

const Hero = () => {
  // Generate 8x10 Grid (80 Pixel Tiles) for Pixel Dissolve Transition
  const gridRows = 8;
  const gridCols = 10;
  const totalTiles = gridRows * gridCols;

  // Stagger delays for pixel dissolve transition
  const getTileDelay = (index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    // Radial distance from center for circular pixel dissolve effect
    const distFromCenter = Math.sqrt(Math.pow(row - gridRows/2, 2) + Math.pow(col - gridCols/2, 2));
    return (distFromCenter * 35).toFixed(0);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent flex flex-col justify-between"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/6 w-[450px] h-[450px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-rose-500/15 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col justify-between flex-grow">
        
        {/* Main Hero Split Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-6 flex-grow">
          
          {/* Left Column: Typography & CTAs */}
          <div className="w-full lg:w-7/12 text-left space-y-8 z-20">
            {/* Status Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="status-pill shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="pulse-dot-green"></span>
                <span className="text-slate-200">AI Researcher & Assistant Professor // Accepting Research Collaborations</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white">
                Pioneering <br />
                <span className="gradient-text-aurora">AI & Quantum Systems</span>
              </h1>
            </motion.div>

            {/* Subtitle Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-300 font-space text-base md:text-xl max-w-2xl leading-relaxed font-light"
            >
              Assistant Professor in AI & ML and Researcher in <span className="text-white font-bold gradient-text-aurora">Quantum Cryptography & Multi-Agent Systems</span>. Co-authored IEEE Xplore published QKD research and pioneering AI agent lifecycle management frameworks.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              <a href="#about" className="btn-aurora-primary group">
                <span>Explore Research</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="btn-aurora-glass group">
                <span>Contact Us</span>
                <Mail size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Pixel Grid Dissolve Transition Photo Reveal */}
          <div className="w-full lg:w-5/12 relative flex justify-center lg:justify-end items-end h-[480px] lg:h-[580px] mt-8 lg:mt-0">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md h-full rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.18)] bg-[#040817] group cursor-pointer"
            >
              {/* Layer 1: Revealed Portrait Photo (Behind Pixel Matrix Cover) */}
              <div className="absolute inset-0 z-10 flex justify-center items-end bg-gradient-to-b from-[#081229] to-[#030712]">
                {/* Glowing Aura Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-cyan-500/40 blur-[60px]"></div>

                <img 
                  src="/assets/profile_final.png" 
                  alt="Jeswin Jerard — AI Architect Profile" 
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(6,182,212,0.35)] group-hover:scale-105 transition-transform duration-700"
                />

                {/* Bottom Fade Mask */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"></div>
              </div>

              {/* Layer 2: Pixel Grid Transition Cover (Dissolves into Pixel Blocks on Hover) */}
              <div className="absolute inset-0 z-20 grid grid-cols-10 grid-rows-8 w-full h-full pointer-events-none">
                {Array.from({ length: totalTiles }).map((_, idx) => (
                  <div 
                    key={idx}
                    className="relative overflow-hidden transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-0 group-hover:rotate-12"
                    style={{
                      transitionDelay: `${getTileDelay(idx)}ms`,
                      backgroundColor: '#070d1e'
                    }}
                  >
                    <img 
                      src="/assets/quantum_core_3d.jpg" 
                      alt=""
                      className="absolute max-w-none w-[448px] h-[580px] object-cover pointer-events-none"
                      style={{
                        left: `-${(idx % gridCols) * 100}%`,
                        top: `-${Math.floor(idx / gridCols) * 100}%`
                      }}
                    />
                    <div className="absolute inset-0 border-[0.5px] border-cyan-500/10 group-hover:border-transparent transition-colors"></div>
                  </div>
                ))}
              </div>

              {/* Holographic Border Overlay */}
              <div className="absolute inset-0 z-30 border border-cyan-500/30 rounded-3xl pointer-events-none group-hover:border-cyan-400/60 transition-colors"></div>
            </motion.div>
          </div>

        </div>

        {/* Image 3 Inspired Creative Lab Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-6xl mx-auto aurora-glass-card rounded-3xl p-6 md:p-10 text-left relative overflow-hidden my-12 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)]"
        >
          {/* Inner Header Pill Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-3 font-mono text-xs text-slate-400 tracking-wider uppercase">LAB_ENVIRONMENT // ACTIVE</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-full text-xs font-mono">
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40">About</span>
              <span className="px-4 py-1.5 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer">Experiments</span>
              <span className="px-4 py-1.5 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer">Concepts</span>
              <span className="px-4 py-1.5 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer">Community</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
                A Creative Lab For <br />
                <span className="gradient-text-cyan">AI Experiments</span>
              </h2>
              <p className="text-slate-300 font-space text-base md:text-lg leading-relaxed font-light">
                Exploring how artificial intelligence, neural systems design & human creativity come together to solve complex real-world challenges.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#projects" className="btn-aurora-glass !py-3 !px-6 !text-xs border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <span>Explore the Lab</span>
                  <Sparkles size={16} className="text-cyan-400" />
                </a>
              </div>
            </div>

            {/* 3D Quantum Core Processor Visual */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                <img 
                  src="/assets/quantum_core_3d.jpg" 
                  alt="3D Quantum AI Core Processor" 
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu size={20} className="text-cyan-400" />
                    <div>
                      <p className="text-xs font-mono font-bold text-white">Quantum AI Core v2.4</p>
                      <p className="text-[10px] font-mono text-cyan-400/80">Entanglement Status: 99.8%</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Stats Bar inside Lab Card */}
          <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10">
            <div>
              <p className="font-syne text-2xl md:text-4xl font-extrabold text-cyan-400">23+</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">AI Concepts</p>
            </div>
            <div>
              <p className="font-syne text-2xl md:text-4xl font-extrabold text-purple-400">9</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">Prototypes</p>
            </div>
            <div>
              <p className="font-syne text-2xl md:text-4xl font-extrabold text-pink-400">4</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">Evolving Visions</p>
            </div>
          </div>
        </motion.div>

        {/* Global Key Metrics Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-white/10 mb-12"
        >
          <div className="text-center">
            <p className="font-syne text-4xl md:text-5xl font-black gradient-text-magenta">15+</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">AI & NLP Models</p>
          </div>
          <div className="text-center">
            <p className="font-syne text-4xl md:text-5xl font-black gradient-text-cyan">100%</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">REST API Coverage</p>
          </div>
          <div className="text-center">
            <p className="font-syne text-4xl md:text-5xl font-black gradient-text-emerald">3+</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">Enterprise Systems</p>
          </div>
          <div className="text-center">
            <p className="font-syne text-4xl md:text-5xl font-black gradient-text-purple">5+</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">Certifications</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">SCROLL TO EXPLORE</span>
          <span className="text-xs">↓</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
