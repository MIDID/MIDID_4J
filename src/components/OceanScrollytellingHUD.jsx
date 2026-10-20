import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Anchor, Compass, Waves } from 'lucide-react';

const SECTIONS = [
  { id: 'home', name: 'SURFACE ZONE', depth: '0m', label: 'Epipelagic' },
  { id: 'about', name: 'RESEARCH SHALLOWS', depth: '240m', label: 'Mesopelagic' },
  { id: 'projects', name: 'SYSTEMS TRENCH', depth: '1,450m', label: 'Bathypelagic' },
  { id: 'skills', name: 'ABYSSAL MATRIX', depth: '3,800m', label: 'Abyssopelagic' },
  { id: 'contact', name: 'HADAL FRONTIER', depth: '6,200m', label: 'Hadopelagic' }
];

const OceanScrollytellingHUD = ({ theme = 'dark' }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDepthMeters, setCurrentDepthMeters] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Interpolate depth in meters from 0m to 6,200m
      const depth = Math.floor(progress * 6200);
      setCurrentDepthMeters(depth);

      // Detect active section
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = currentScroll + window.innerHeight * 0.35;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none pointer-events-none">
      <div className="pointer-events-auto bg-[#070e1e]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_35px_rgba(6,182,212,0.18)] flex flex-col gap-4">
        
        {/* HUD Depth Telemetry Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Waves size={13} className="animate-pulse" />
            <span className="font-bold tracking-wider">DEPTH HUD</span>
          </div>
          <span className="text-slate-400">
            {Math.floor(scrollProgress * 100)}%
          </span>
        </div>

        {/* Real-time Dynamic Depth Gauge */}
        <div className="space-y-0.5">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CURRENT DEPTH</p>
          <div className="font-syne text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 tracking-tight">
            -{currentDepthMeters.toLocaleString()} <span className="text-xs font-mono text-cyan-400">M</span>
          </div>
        </div>

        {/* Oceanic Zone Indicators (Scrollytelling Points) */}
        <div className="flex flex-col gap-3 pt-2">
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="group flex items-center justify-between gap-3 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {/* Glowing Node Dot */}
                  <div className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)] scale-125' 
                      : 'bg-white/20 group-hover:bg-cyan-400/60'
                  }`}>
                    {isActive && (
                      <span className="absolute inset-[-3px] rounded-full border border-cyan-400/60 animate-ping" />
                    )}
                  </div>

                  <span className={`text-[11px] font-mono transition-colors ${
                    isActive 
                      ? 'text-cyan-300 font-bold' 
                      : 'text-slate-400 group-hover:text-white'
                  }`}>
                    {sec.name}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-slate-500 group-hover:text-cyan-400">
                  {sec.depth}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vertical Liquid Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
};

export default OceanScrollytellingHUD;
