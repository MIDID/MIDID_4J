import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Sun, Moon, Atom, GitFork, Waves } from 'lucide-react';

const NavBar = ({ theme = 'dark', onToggleTheme, onToggleSuperposition, onToggleEntanglement }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down -> Hide navbar
        setVisible(false);
      } else {
        // Scrolling up -> Show navbar
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Research', href: '#about' },
    { name: 'Systems', href: '#projects' },
    { name: 'Matrix', href: '#skills' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] px-4 py-4 md:py-6 transition-all duration-500 flex justify-center transform ${
      visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <nav 
        className={`w-full max-w-7xl px-6 py-3.5 rounded-full transition-all duration-500 flex justify-between items-center ${
          scrolled 
            ? 'nav-pill shadow-xl' 
            : 'bg-white/[0.04] backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand Logo (Updated to MIDID) */}
        <a href="#home" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-500 p-[1px] shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#141022] rounded-[11px] flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-400 group-hover:text-pink-400 transition-colors" />
            </div>
          </div>
          <span className="font-syne font-extrabold text-base md:text-lg tracking-tight text-white flex items-center gap-1">
            MI<span className="gradient-text-aurora">DID</span>
          </span>
          <span className="hidden xl:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
            <Waves size={11} className="text-cyan-400 animate-pulse" />
            <span>HYDRO_SYS // ACTIVE</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-space font-medium tracking-wide text-slate-300 hover:text-cyan-400 transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          ))}
        </div>

        {/* Action Buttons (Superposition, Entanglement, Theme Toggle & CTA) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Superposition Button */}
          <button
            onClick={onToggleSuperposition}
            title="Trigger Quantum Superposition State"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/35 hover:border-amber-400 text-amber-300 transition-all hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
          >
            <Atom size={14} className="text-amber-400 animate-spin" />
            <span>Superposition</span>
          </button>

          {/* Entanglement Button */}
          <button
            onClick={onToggleEntanglement}
            title="Trigger Quantum Entanglement Split Screen"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/35 hover:border-cyan-400 text-cyan-300 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            <GitFork size={14} className="text-cyan-400 rotate-90" />
            <span>Entanglement</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-110 shadow-sm"
          >
            {theme === 'dark' ? <Sun size={17} className="text-amber-300" /> : <Moon size={17} className="text-indigo-600" />}
          </button>
          <a 
            href="#contact" 
            className="btn-aurora-primary !py-2.5 !px-5 !text-xs"
          >
            <span>Contact Us</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleEntanglement}
            title="Entanglement"
            className="px-2 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 flex items-center gap-1"
          >
            <GitFork size={12} className="text-cyan-400 rotate-90" />
            <span>Entangle</span>
          </button>
          <button
            onClick={onToggleSuperposition}
            title="Superposition"
            className="px-2 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/15 border border-amber-500/35 text-amber-300 flex items-center gap-1"
          >
            <Atom size={12} className="text-amber-400 animate-spin" />
            <span>|ψ⟩</span>
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300"
          >
            {theme === 'dark' ? <Sun size={14} className="text-amber-300" /> : <Moon size={14} className="text-indigo-600" />}
          </button>
          <button 
            className="p-1.5 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-[#080e24]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl md:hidden z-50"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-space font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleEntanglement();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <GitFork size={16} className="text-cyan-400 rotate-90" />
              <span>⟨Ψ⁺⟩ Entanglement Split Screen</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleSuperposition();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <Atom size={16} className="text-amber-400 animate-spin" />
              <span>|ψ⟩ Superposition Mode</span>
            </button>
            <a 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-aurora-primary w-full justify-center mt-1"
            >
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
