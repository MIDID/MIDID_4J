import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowUpRight, Sparkles, Terminal, Heart } from 'lucide-react';

const Contact = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <footer id="contact" className="section-container relative border-t border-white/10 bg-transparent pt-24 pb-12 overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="aurora-glass-card rounded-3xl p-8 md:p-16 relative overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
          
          <div className="max-w-2xl space-y-6">
            <motion.div {...fadeUp}>
              <div className="status-pill border-cyan-500/30 bg-cyan-950/40 text-cyan-300 mb-6">
                <span className="pulse-dot-green"></span>
                <span>SYSTEM STATUS // AVAILABLE FOR COLLABORATION</span>
              </div>

              <h2 className="font-syne text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                Let's Build the <br />
                <span className="gradient-text-aurora">Next AI Frontier</span>
              </h2>

              <p className="text-slate-300 font-space text-base md:text-lg leading-relaxed font-light mt-4">
                Open to <span className="text-white font-semibold">AI Engineering</span>, <span className="text-white font-semibold">Backend Architecture</span>, and <span className="text-white font-semibold">Research Collaboration</span>. Let's create intelligent systems that transform possibilities into reality.
              </p>
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <motion.a 
              href="mailto:jeswinjerard.work@gmail.com"
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="btn-aurora-primary !py-4 !px-8 justify-between min-w-[280px] shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} />
                <span>Initiate Email</span>
              </span>
              <ArrowUpRight size={18} />
            </motion.a>

            <motion.a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="btn-aurora-glass !py-4 !px-8 justify-between min-w-[280px] border-cyan-500/30 hover:border-cyan-400"
            >
              <span className="flex items-center gap-3">
                <Linkedin size={18} className="text-cyan-400" />
                <span>LinkedIn Network</span>
              </span>
              <ArrowUpRight size={18} />
            </motion.a>
          </div>

        </div>
      </div>

      {/* Footer Copyright & Navigation */}
      <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-400" />
          <span>© 2026 Jeswin Jerard // Aurora AI Systems Architect</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          {["Research", "Systems", "Matrix", "Credentials", "Contact"].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Contact;
