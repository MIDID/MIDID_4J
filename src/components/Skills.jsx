import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

const Skills = ({ onSkillClick }) => {
  const skills = {
    "PROGRAMMING": {
      items: ["Python", "Java", "SQL", "OOP Design", "Data Structures", "Debugging & Profiling"],
      details: "Core development expertise focusing on scalable logic, algorithmic efficiency, and robust object-oriented software architecture."
    },
    "AI & MACHINE LEARNING": {
      items: ["NLP (SpaCy, TF-IDF)", "Scikit-learn", "Generative AI", "RAG Systems", "Prompt Engineering", "Vector Embeddings"],
      details: "Exploring intelligence systems, from traditional NLP parsing pipelines to modern retrieval-augmented generation and vector embeddings."
    },
    "FRAMEWORKS & APIS": {
      items: ["Flask (REST API Dev)", "Java Vert.x", "API Integration", "Postman", "Microservices"],
      details: "Building the connective API infrastructure of modern applications through high-performance REST endpoints and async service integrations."
    },
    "DATABASES": {
      items: ["MongoDB", "SQL", "Redis Caching", "Schema Optimization"],
      details: "Managing high-throughput data persistence with optimized NoSQL document schemas and relational database structures."
    }
  };

  const certifications = [
    { title: "Oracle Gen AI Professional", sub: "OCI GENERATIVE AI", org: "Oracle Cloud Infrastructure", badge: "border-pink-500/30 text-pink-400 bg-pink-500/10" },
    { title: "Oracle AI Vector Search", sub: "VECTOR EMBEDDINGS", org: "Oracle Certified Professional", badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
    { title: "Oracle Cloud AI Foundations", sub: "AI CORE CONCEPTS", org: "Oracle Cloud", badge: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
    { title: "AWS Cloud Development", sub: "CLOUD COMPUTING", org: "AWS Academy Graduate", badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
    { title: "UiPath Agentic Automation", sub: "PROMPT ENGINEERING", org: "UiPath Academy", badge: "border-amber-500/30 text-amber-400 bg-amber-500/10" }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="skills" className="section-container relative border-t border-white/10 bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <motion.div {...fadeUp} className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-cyan-400 rounded-full"></span>
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">03 // SKILL MATRIX</span>
        </div>
        <h2 className="font-syne text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          Architectural <span className="gradient-text-aurora">Skill Matrix</span>
        </h2>
      </motion.div>
      
      {/* Interactive Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {Object.entries(skills).map(([category, data], i) => (
          <motion.div 
            key={category} 
            {...fadeUp}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSkillClick({ category, ...data })}
            className="aurora-glass-card rounded-3xl p-8 flex flex-col justify-between group cursor-pointer min-h-[280px] relative overflow-hidden border border-white/10 hover:border-cyan-500/40"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 block">MATRIX_LAYER_0{i+1}</span>
              <h3 className="font-syne text-xl font-extrabold text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-cyan-400 transition-colors">
                {category}
              </h3>
            </div>

            <div className="relative z-10 flex flex-wrap gap-1.5 mb-6">
              {data.items.slice(0, 4).map((item) => (
                <span key={item} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/10">
                  {item}
                </span>
              ))}
              {data.items.length > 4 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  +{data.items.length - 4} more
                </span>
              )}
            </div>
            
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-center gap-2 text-xs font-space font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                Initialize Layer <ChevronRight size={14} />
              </div>
              <Sparkles size={14} className="text-slate-500 group-hover:text-pink-400 transition-colors" />
            </div>

            {/* Background Watermark Index */}
            <div className="absolute -bottom-6 -right-4 font-syne text-9xl font-black text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-colors italic pointer-events-none">
              0{i+1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verified Credentials Section */}
      <div id="credentials" className="pt-16 border-t border-white/10">
        <motion.div {...fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">VERIFIED CREDENTIALS</span>
          </div>
          <h3 className="font-syne text-3xl font-extrabold text-white">Certified Industry Competencies</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={idx} 
              {...fadeUp}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="aurora-glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[210px] group hover:border-cyan-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cert.badge}`}>
                  <Award size={18} />
                </div>
                <span className="text-[9px] font-mono text-slate-500">VERIFIED</span>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase mb-1 block">{cert.sub}</span>
                <h4 className="font-syne text-sm font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors mb-2">
                  {cert.title}
                </h4>
                <p className="text-xs font-space text-slate-400">{cert.org}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
