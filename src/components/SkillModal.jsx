import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Cpu } from 'lucide-react';

const SkillModal = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl aurora-glass-card rounded-3xl p-8 md:p-12 overflow-hidden border border-cyan-500/40 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/15 rounded-full blur-[80px]"></div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/15 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Cpu size={16} />
              <span>SKILL MATRIX INITIALIZED</span>
            </div>

            <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              {skill.category}
            </h2>
            
            <div className="w-16 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {skill.items.map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] group-hover:scale-125 transition-transform"></div>
                  <span className="text-xs font-space font-medium text-slate-200 uppercase tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20">
              <p className="text-slate-300 font-space text-sm leading-relaxed font-light italic">
                "{skill.details}"
              </p>
            </div>

            <button 
              onClick={onClose}
              className="btn-aurora-primary w-full justify-center !py-3 mt-4"
            >
              <span>Close Matrix View</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillModal;
