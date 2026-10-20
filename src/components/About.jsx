import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, BookOpen, GraduationCap, Award, Atom, 
  Sparkles, ExternalLink, ShieldCheck, Cpu, Layers, FileText
} from 'lucide-react';
import CvBookModal from './CvBookModal';

const About = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const researchPillars = [
    {
      icon: <BrainCircuit size={26} />,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      title: "Multi-Agent Systems & ARM",
      subtitle: "AI Agent Lifecycle Management",
      desc: "Developing conceptual frameworks for AI-agent onboarding, capability assessment, task allocation, performance monitoring, and secure retirement."
    },
    {
      icon: <Atom size={26} />,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      title: "Quantum Cryptography & QKD",
      subtitle: "IEEE Xplore Published Research",
      desc: "Co-authored paper on Hybrid MDI-TF-QKD combining measurement-device-independent and twin-field quantum key distribution schemes."
    },
    {
      icon: <GraduationCap size={26} />,
      color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      title: "Academic & Pedagogy",
      subtitle: "Assistant Professor in AI & ML",
      desc: "Teaching undergraduate and postgraduate courses in Python, Artificial Intelligence, Machine Learning, Data Analytics, and Cyber Forensics."
    }
  ];

  return (
    <section id="about" className="section-container relative border-t border-white/10 bg-transparent py-24">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Section Header */}
      <motion.div {...fadeUp} className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-cyan-400 rounded-full"></span>
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">01 // RESEARCH DIRECTORY & SCHOLAR PROFILE</span>
        </div>
        <h2 className="font-syne text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          Pioneering <span className="gradient-text-aurora">AI & Quantum Research</span>
        </h2>
      </motion.div>
      
      <div className="flex flex-col gap-12">
        {/* Main Profile & CV Book Trigger Container */}
        <motion.div {...fadeUp} className="aurora-glass-card rounded-3xl p-8 md:p-14 relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="status-pill border-cyan-500/30 bg-cyan-950/30 text-cyan-300">
                <span className="pulse-dot-cyan"></span>
                <span>ASSISTANT PROFESSOR & AI RESEARCHER</span>
              </span>

              <h3 className="font-syne text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
                Jeswin Jerard <br />
                <span className="gradient-text-cyan font-semibold text-2xl sm:text-3xl">MCA (AI & ML) • B.Sc (Physics)</span>
              </h3>

              <p className="text-slate-300 font-space text-base md:text-lg leading-relaxed font-light">
                Multidisciplinary researcher bridging <span className="text-white font-semibold">Computer Science, Artificial Intelligence</span>, and <span className="text-white font-semibold">Quantum Physics</span>. Currently serving as Assistant Professor in AI & ML at Girideepam Institute of Advanced Learning.
              </p>

              <p className="text-slate-400 font-space text-sm sm:text-base leading-relaxed font-light">
                Research focus encompasses <span className="text-cyan-400 font-medium">AI Agent Lifecycle & Resource Management in Multi-Agent Systems</span>, theoretical quantum key distribution (<span className="text-purple-400 font-medium">Hybrid MDI-TF-QKD published in IEEE Xplore 2026</span>), and trustworthy, resource-aware intelligent models.
              </p>

              {/* Research Publications Snippet Badges */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                      <Award size={14} />
                      <span>IEEE Xplore Publication • 2026</span>
                    </div>
                    <h4 className="font-syne text-sm font-bold text-white">Hybrid MDI-TF-QKD Quantum Key Distribution</h4>
                    <p className="text-xs text-slate-400 mt-1">Theoretical analysis of measurement-device-independent twin-field quantum cryptography.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 whitespace-nowrap">
                    Presented ICEMCSI 2026
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-purple-500/30 hover:border-purple-400 transition-all flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                      <BrainCircuit size={14} />
                      <span>National Student Research Symposium • 2025</span>
                    </div>
                    <h4 className="font-syne text-sm font-bold text-white">AI Resource Management in Multi-Agent Systems (ARM)</h4>
                    <p className="text-xs text-slate-400 mt-1">Framework for AI agent lifecycle, onboarding, task allocation, and retirement.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 whitespace-nowrap">
                    Research Paper
                  </span>
                </div>
              </div>

              {/* Education Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 aurora-glass rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1 text-purple-400">
                    <GraduationCap size={18} />
                    <span className="font-mono text-xs uppercase">MCA (AI & ML) • 2026</span>
                  </div>
                  <h4 className="font-syne text-sm font-bold text-white">Kristu Jayanti University</h4>
                  <p className="font-mono text-xs text-cyan-400 mt-1">CGPA: 8.1 / 10.0</p>
                </div>

                <div className="p-4 aurora-glass rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1 text-cyan-400">
                    <GraduationCap size={18} />
                    <span className="font-mono text-xs uppercase">B.Sc Physics • 2024</span>
                  </div>
                  <h4 className="font-syne text-sm font-bold text-white">St. Thomas College, Palai</h4>
                  <p className="font-mono text-xs text-cyan-400 mt-1">CGPA: 7.99 / 10.0</p>
                </div>
              </div>

            </div>

            {/* Right Picture Box: Personal Research Diary Cover */}
            <div className="lg:col-span-5 relative">
              <div 
                onClick={() => setIsCvModalOpen(true)}
                className="relative rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#111827] via-[#0d1424] to-[#070b14] border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] hover:shadow-[0_0_85px_rgba(6,182,212,0.5)] transition-all duration-500 cursor-pointer group hover:-translate-y-2 overflow-hidden select-none"
              >
                {/* Glowing Aura Backdrop */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/25 blur-[90px] rounded-full group-hover:bg-cyan-500/40 transition-all"></div>
                
                {/* Leather Book Spine Simulation */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-cyan-950 via-slate-800 to-transparent border-r border-white/10 z-20"></div>

                {/* Diary Top Status Badge */}
                <div className="flex items-center justify-between mb-4 pl-3 relative z-20">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <BookOpen size={16} />
                    <span className="font-bold tracking-wider uppercase">PERSONAL RESEARCH DIARY</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
                    4 PAGES • FLIP DIARY 📖
                  </span>
                </div>

                {/* Diary Front Page Document Rendering */}
                <div className="relative bg-[#fdfdfd] rounded-2xl p-5 sm:p-6 text-slate-900 shadow-2xl border border-white/20 transform group-hover:scale-[1.01] transition-transform duration-500 ml-2 overflow-hidden">
                  
                  {/* Bookmark Ribbon */}
                  <div className="absolute top-0 right-6 w-4 h-12 bg-cyan-700 rounded-b shadow-md z-10 pointer-events-none"></div>

                  {/* Corner Paper Curl Effect */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-slate-300 via-slate-200 to-transparent shadow-inner pointer-events-none rounded-tl-md"></div>

                  {/* Header Profile Photo & Title */}
                  <div className="flex items-center gap-3.5 pb-4 mb-3 border-b-2 border-slate-800">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-cyan-800 shadow-md flex-shrink-0 bg-slate-900">
                      <img 
                        src={`${import.meta.env.BASE_URL}assets/profile_final.png`} 
                        alt="Jeswin Jerard" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold tracking-wide text-slate-900 uppercase leading-none">JESWIN JERARD</h4>
                      <p className="font-mono text-[11px] text-cyan-800 font-bold mt-1">Assistant Professor & AI Researcher</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">Kottayam, Kerala • jeswinjerard@gmail.com</p>
                    </div>
                  </div>

                  {/* Diary Preview Snippets */}
                  <div className="space-y-2.5 text-[11px] leading-snug">
                    <div>
                      <p className="font-mono font-bold text-slate-800 uppercase border-b border-slate-300 pb-0.5 mb-1 text-[10px]">
                        Academic Profile & Research
                      </p>
                      <p className="text-slate-700">
                        MCA (AI & ML) & B.Sc (Physics). Assistant Professor at Girideepam Institute. Author of IEEE Xplore QKD research.
                      </p>
                    </div>

                    <div>
                      <p className="font-mono font-bold text-slate-800 uppercase border-b border-slate-300 pb-0.5 mb-1 text-[10px]">
                        Diary Highlights (4 Interactive Pages)
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-medium text-slate-700">
                        <div className="bg-slate-100 p-1 rounded border border-slate-200">Pg 1: Profile & Education</div>
                        <div className="bg-slate-100 p-1 rounded border border-slate-200">Pg 2: IEEE Papers & QKD</div>
                        <div className="bg-slate-100 p-1 rounded border border-slate-200">Pg 3: Teaching & Internships</div>
                        <div className="bg-slate-100 p-1 rounded border border-slate-200">Pg 4: Projects & Credentials</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Banner Overlay */}
                  <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-cyan-900 group-hover:text-cyan-950">
                    <span className="flex items-center gap-1.5 text-slate-700 group-hover:text-cyan-900">
                      <Sparkles size={14} className="text-amber-500 animate-spin" />
                      Personal Research Diary
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-700 text-white font-bold group-hover:bg-cyan-800 transition-colors shadow-md flex items-center gap-1">
                      OPEN DIARY (4 PGS) →
                    </span>
                  </div>

                </div>

                {/* Bottom Helper Indicator */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pl-2">
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} className="text-cyan-400" />
                    <span>Jeswin_Jerard_Diary.pdf</span>
                  </span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1 text-[11px]">
                    Compact Diary Flip 📖
                  </span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* 3 Research Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {researchPillars.map((pillar, i) => (
            <motion.div 
              key={i}
              {...fadeUp} 
              transition={{ delay: 0.2 + (i * 0.1) }} 
              className="aurora-glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-cyan-500/40"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${pillar.color} shadow-lg transition-transform group-hover:scale-110`}>
                  {pillar.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">{pillar.subtitle}</span>
                  <h3 className="font-syne text-xl font-bold uppercase text-white my-2 tracking-tight">{pillar.title}</h3>
                  <p className="text-slate-400 font-space text-sm leading-relaxed font-light">{pillar.desc}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>RESEARCH_PILLAR_0{i+1}</span>
                <span>ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CV Book Modal */}
      <CvBookModal 
        isOpen={isCvModalOpen} 
        onClose={() => setIsCvModalOpen(false)} 
      />
    </section>
  );
};

export default About;
