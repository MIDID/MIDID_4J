import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Database, Layers, ExternalLink, Github, ChevronRight, X, Cpu, Sparkles } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: "nlp-ranker",
      title: "NLP Resume Ranker",
      category: "AI & Natural Language Processing",
      tech: ["Python", "SpaCy", "Flask", "TF-IDF", "Vector Similarity"],
      desc: "An intelligent candidate ranking system utilizing SpaCy and TF-IDF vector similarity metrics for automated HR candidate filtering.",
      fullDesc: "Developed an enterprise NLP-based candidate filtering engine. Uses SpaCy natural language tokenization and TF-IDF matrix scoring to rank resumes against detailed job specifications in real-time via high-speed Flask REST endpoints.",
      icon: <BrainCircuit size={28} className="text-pink-400" />,
      image: "/assets/nlp_project.png",
      glowColor: "border-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      gradient: "from-pink-500/20 to-purple-500/10",
      metrics: "94.8% Matching Precision // <120ms Latency"
    },
    {
      id: "kju-erp",
      title: "KJU Placements ERP",
      category: "Backend Systems Architecture",
      tech: ["Java", "Vert.x", "MongoDB", "RESTful APIs", "Role Access"],
      desc: "Automated placement workflows with high-performance event-driven Java Vert.x microservices and optimized MongoDB document stores.",
      fullDesc: "Engineered robust backend microservices to digitize college placement operations. Utilized reactive Java Vert.x framework and optimized MongoDB schemas to handle thousands of concurrent applicant tracking and interview schedules seamlessly.",
      icon: <Layers size={28} className="text-cyan-400" />,
      image: "/assets/kju_project.png",
      glowColor: "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      gradient: "from-cyan-500/20 to-blue-500/10",
      metrics: "5,000+ Concurrent Requests // zero-downtime"
    },
    {
      id: "chatxp",
      title: "ChatXP Telemetry",
      category: "Data Engineering & Analytics",
      tech: ["Python", "MongoDB", "Data Analytics", "Flask API", "Visualization"],
      desc: "Personal financial telemetry system with intelligent MongoDB aggregation pipelines and real-time expense pattern analysis.",
      fullDesc: "Created an intelligent expense tracker and financial analytics engine. Integrates dynamic MongoDB query pipelines to extract spending trends, categorize transactions automatically, and surface predictive financial insights.",
      icon: <Database size={28} className="text-purple-400" />,
      image: "/assets/chatxp_project.png",
      glowColor: "border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      gradient: "from-purple-500/20 to-indigo-500/10",
      metrics: "100% Real-time Aggregation // Automated Categorization"
    }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="projects" className="section-container relative border-t border-white/10 bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <motion.div {...fadeUp} className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-purple-400 rounded-full"></span>
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">02 // SYSTEMS LOG</span>
        </div>
        <h2 className="font-syne text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          Deployed <span className="gradient-text-cyan">AI & Backend Systems</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            {...fadeUp}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            onClick={() => setSelectedProject(project)}
            className={`aurora-glass-card rounded-3xl overflow-hidden flex flex-col group cursor-pointer relative h-full transition-all duration-500 hover:-translate-y-2 ${project.glowColor}`}
          >
            {/* Image Preview Window */}
            <div className="relative h-52 overflow-hidden border-b border-white/10">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-[#060b1b]/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md ${project.badgeColor}`}>
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center">
                  {project.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                  SYS_0{idx + 1}
                </span>
              </div>
            </div>
            
            {/* Content Details */}
            <div className="p-8 flex flex-col flex-grow relative z-10">
              <h3 className="font-syne text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 font-space text-sm leading-relaxed font-light mb-6 flex-grow">
                {project.desc}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-space font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  System Blueprint <ChevronRight size={16} />
                </span>
                <Sparkles size={14} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl aurora-glass-card rounded-3xl p-6 md:p-10 border border-cyan-500/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${selectedProject.badgeColor}`}>
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{selectedProject.metrics}</span>
                </div>

                <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white">
                  {selectedProject.title}
                </h2>

                <div className="rounded-2xl overflow-hidden border border-white/10 h-64">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>

                <p className="text-slate-300 font-space text-base leading-relaxed">
                  {selectedProject.fullDesc}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Technologies Employed</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button onClick={() => setSelectedProject(null)} className="btn-aurora-primary w-full justify-center !py-3">
                    Close Blueprint View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
