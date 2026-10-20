import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, BookOpen, ExternalLink, 
  Download, GraduationCap, Award, Atom, BookMarked, 
  Mail, MapPin, Phone, Linkedin, FileText, CheckCircle2, Sparkles, User
} from 'lucide-react';

const CvBookModal = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1); // Pages 1, 2, 3, 4
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' or 'prev'
  const [isFlipping, setIsFlipping] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentPage, isFlipping]);

  const goToPage = (page) => {
    if (!isFlipping && page !== currentPage) {
      setFlipDirection(page > currentPage ? 'next' : 'prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsFlipping(false);
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentPage < 4 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 350);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 350);
    }
  };

  // Realistic 3D Page Turn Animation Variants with Spine Hinge
  const pageVariants = {
    initial: (dir) => ({
      rotateY: dir === 'next' ? 110 : -110,
      opacity: 0.2,
      scale: 0.93,
      transformOrigin: dir === 'next' ? 'left center' : 'right center',
      filter: 'brightness(0.65)'
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      filter: 'brightness(1)',
      transition: { 
        duration: 0.45, 
        ease: [0.25, 1, 0.5, 1] 
      }
    },
    exit: (dir) => ({
      rotateY: dir === 'next' ? -110 : 110,
      opacity: 0.1,
      scale: 0.93,
      transformOrigin: dir === 'next' ? 'left center' : 'right center',
      filter: 'brightness(0.5)',
      transition: { 
        duration: 0.35, 
        ease: [0.5, 0, 0.75, 0] 
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[99998]"
          />

          {/* Always-Visible Top-Right Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-8 z-[100000] flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs shadow-[0_0_30px_rgba(244,63,94,0.7)] hover:scale-110 transition-all cursor-pointer border border-rose-400/50"
            title="Close Diary (ESC)"
          >
            <X size={18} />
            <span>CLOSE DIARY (ESC)</span>
          </button>

          {/* Modal Container — Compact Personal Diary Size (max-w-2xl) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[99999] w-full max-w-2xl max-h-[94vh] flex flex-col bg-[#0d1322] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_90px_rgba(6,182,212,0.4)] overflow-hidden my-auto"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#080d19]/95 backdrop-blur-md flex-shrink-0 pr-36 sm:pr-48">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-white text-sm tracking-tight flex items-center gap-2">
                    RESEARCH DIARY — JESWIN JERARD
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-normal border border-cyan-500/30 hidden sm:inline-block">
                      4 PAGES
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">Assistant Professor & AI / Quantum Researcher</p>
                </div>
              </div>

              {/* 4 Page Selector Tabs */}
              <div className="flex items-center bg-black/50 border border-white/10 rounded-full p-1 text-xs font-mono">
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-2.5 py-0.5 rounded-full transition-all text-[11px] ${
                      currentPage === page 
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Pg {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Diary Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14] flex flex-col items-center justify-start relative">
              
              {/* Diary Leather Cover Frame with 3D Perspective */}
              <div className="relative w-full max-w-xl my-auto perspective-[1200px]">
                
                {/* Book Shadow & Layered Page Edge Effect */}
                <div className="relative rounded-2xl bg-[#fdfdfd] text-[#1a1e29] font-sans shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_0_8px_#111827,_0_0_0_10px_rgba(6,182,212,0.4)] border border-slate-300 overflow-hidden transform-style-3d min-h-[570px] sm:min-h-[610px] flex flex-col justify-between p-6 sm:p-8">
                  
                  {/* Spine Crease Shadow & Bookmark Ribbon */}
                  <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-30"></div>
                  <div className="absolute top-0 right-8 w-3.5 h-12 bg-cyan-700 rounded-b shadow-md pointer-events-none z-30"></div>

                  {/* 3D Page Turn Animation */}
                  <AnimatePresence mode="wait" custom={flipDirection}>
                    <motion.div
                      key={currentPage}
                      custom={flipDirection}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex-1 flex flex-col justify-between relative z-10"
                    >

                      {/* ============================================================ */}
                      {/* PAGE 1: PROFILE, CONTACT & ACADEMIC EDUCATION */}
                      {/* ============================================================ */}
                      {currentPage === 1 && (
                        <div className="space-y-4">
                          {/* Header Profile Box with Photo Thumbnail */}
                          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-800">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-cyan-800 shadow-md flex-shrink-0 bg-slate-900">
                              <img 
                                src="/assets/profile_final.png" 
                                alt="Jeswin Jerard" 
                                className="w-full h-full object-cover object-top"
                              />
                            </div>

                            <div>
                              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-slate-900 uppercase leading-none">
                                Jeswin Jerard
                              </h1>
                              <p className="text-xs font-mono text-cyan-800 font-bold mt-1">
                                Assistant Professor & AI / Quantum Researcher
                              </p>
                              <p className="text-[11px] text-slate-600 mt-1">
                                Kottayam, Kerala • jeswinjerard@gmail.com • +91 8075475312
                              </p>
                            </div>
                          </div>

                          {/* Profile Overview */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              PERSONAL & RESEARCH PROFILE
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px] text-justify">
                              MCA graduate with a multidisciplinary academic background comprising Computer Science, Artificial Intelligence and Machine Learning, and Physics. Currently serving as an Assistant Professor in AI & ML, with research focus on multi-agent systems lifecycle and quantum cryptography.
                            </p>
                          </div>

                          {/* Education */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              ACADEMIC EDUCATION & DEGREES
                            </h2>
                            <div className="space-y-2.5 text-xs">
                              <div className="bg-cyan-50/60 p-3 rounded border border-cyan-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900 text-sm">Kristu Jayanti University</h3>
                                  <span className="text-[10px] font-mono text-cyan-900 font-bold">July 2026 | Bengaluru</span>
                                </div>
                                <p className="text-slate-700 font-semibold mt-0.5">MCA – ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</p>
                                <p className="text-xs font-bold text-cyan-900 mt-1">CGPA: 8.1 / 10.0</p>
                              </div>

                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900 text-sm">St Thomas College</h3>
                                  <span className="text-[10px] font-mono text-slate-500">May 2024 | Palai, Kerala</span>
                                </div>
                                <p className="text-slate-700 font-semibold mt-0.5">B.Sc. PHYSICS</p>
                                <p className="text-xs font-bold text-cyan-900 mt-1">CGPA: 7.99 / 10.0</p>
                              </div>
                            </div>
                          </div>

                          {/* Academic Areas */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-1.5">
                              ACADEMIC DOMAINS
                            </h2>
                            <p className="text-xs text-slate-700 leading-normal">
                              Artificial Intelligence, Machine Learning & Deep Learning, NLP, Generative AI & RAG, Multi-Agent Systems, Quantum Computing & Quantum Cryptography.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ============================================================ */}
                      {/* PAGE 2: RESEARCH INTERESTS & PUBLICATIONS */}
                      {/* ============================================================ */}
                      {currentPage === 2 && (
                        <div className="space-y-4">
                          <div className="pb-2 mb-3 border-b border-slate-300 flex items-center justify-between">
                            <h2 className="text-lg font-serif font-bold text-slate-900 uppercase">Jeswin Jerard</h2>
                            <span className="text-[10px] font-mono px-2.5 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-600 font-bold">
                              DIARY PAGE 2 OF 4
                            </span>
                          </div>

                          {/* Research Interests */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              RESEARCH INTERESTS
                            </h2>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-700 font-medium">
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Foundations of AI</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Intelligent Multi-Agent Systems</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> AI Agent Lifecycle (ARM)</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Efficient & Resource-Aware AI</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> ML & Natural Language Processing</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Generative AI & RAG</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Trustworthy & Explainable AI</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Quantum Computing & Information</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> Quantum Cryptography</div>
                              <div className="flex items-center gap-1.5"><span className="text-cyan-700 font-bold">•</span> AI for Cybersecurity</div>
                            </div>
                          </div>

                          {/* Research & Publications */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              RESEARCH & PUBLICATIONS
                            </h2>
                            <div className="space-y-3 text-xs">
                              <div className="bg-cyan-50/60 p-3 rounded border border-cyan-200">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-bold text-slate-900 text-xs uppercase">HYBRID MDI-TF-QKD</h3>
                                  <span className="text-[9px] bg-cyan-100 text-cyan-900 px-2 py-0.5 rounded font-mono font-bold">IEEE Xplore | 2026</span>
                                </div>
                                <p className="text-[11px] font-semibold text-slate-800 mt-0.5">
                                  Hybrid Measurement-Device-Independent Twin-Field Quantum Key Distribution
                                </p>
                                <p className="text-[10px] text-slate-500">Presented at ICEMCSI 2026 | 18 June 2026</p>
                                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                                  Co-authored paper analyzing hybrid MDI-TF-QKD combining MDI-QKD and TF-QKD benefits, focusing on scheme theory, security proof, performance, and quantum implementation.
                                </p>
                              </div>

                              <div className="bg-purple-50/60 p-3 rounded border border-purple-200">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-bold text-slate-900 text-xs uppercase">AI RESOURCE MANAGEMENT (ARM)</h3>
                                  <span className="text-[9px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-mono font-bold">Symposium | 2025</span>
                                </div>
                                <p className="text-[11px] font-semibold text-slate-800 mt-0.5">
                                  AI Agent Lifecycle Management for Multi-Agent Systems
                                </p>
                                <p className="text-[10px] text-slate-500">National Student Research Symposium | Presented 26 Sept 2025</p>
                                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                                  Conceptual framework for AI-agent lifecycle management covering onboarding, task allocation, performance monitoring, and secure retirement.
                                </p>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                                <h3 className="font-bold text-slate-900 text-xs uppercase">QUANTUM COMPUTING THEORETICAL REVIEW</h3>
                                <p className="text-[10px] text-slate-500">B.Sc Physics Theoretical Project | St. Thomas College (2024)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ============================================================ */}
                      {/* PAGE 3: ACADEMIC TEACHING ROLE & INDUSTRY INTERNSHIPS */}
                      {/* ============================================================ */}
                      {currentPage === 3 && (
                        <div className="space-y-4">
                          <div className="pb-2 mb-3 border-b border-slate-300 flex items-center justify-between">
                            <h2 className="text-lg font-serif font-bold text-slate-900 uppercase">Jeswin Jerard</h2>
                            <span className="text-[10px] font-mono px-2.5 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-600 font-bold">
                              DIARY PAGE 3 OF 4
                            </span>
                          </div>

                          {/* Teaching Role */}
                          <div className="bg-cyan-50/60 p-3 rounded border border-cyan-200">
                            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-950 uppercase border-b border-cyan-300 pb-1 mb-2">
                              ACADEMIC & TEACHING EXPERIENCE
                            </h2>
                            <div className="flex justify-between items-baseline text-xs">
                              <h3 className="font-bold text-slate-900 text-sm">ASSISTANT PROFESSOR — AI & ML</h3>
                              <span className="text-[10px] text-cyan-900 font-bold">Jul 2026 – Present</span>
                            </div>
                            <p className="text-xs text-slate-700 font-semibold mt-0.5">Girideepam Institute of Advanced Learning, Kottayam</p>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                              Teaching undergraduate and postgraduate courses in Python, Artificial Intelligence, Machine Learning, Data Analytics, and Cyber Forensics.
                            </p>
                          </div>

                          {/* Industry Experience */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              INDUSTRY & INTERNSHIP EXPERIENCE
                            </h2>
                            <div className="space-y-2.5 text-xs">
                              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900">Website Developer Intern</h3>
                                  <span className="text-[10px] text-slate-500">Mar – May 2026</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-700">Beepeaks Private Limited, Bengaluru</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">Developed React 19 web platform with JavaScript & Tailwind CSS.</p>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900">AI-ML Intern</h3>
                                  <span className="text-[10px] text-slate-500">Jun – Jul 2025</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-700">Elevate Labs, Bengaluru</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">Developed NLP applications & Flask REST APIs including TF-IDF resume ranker.</p>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900">Artificial Intelligence Intern</h3>
                                  <span className="text-[10px] text-slate-500">Jun – Jul 2025</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-700">IPSR Solutions Ltd., Kerala</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">Data analysis, Power BI dashboards, and RAG chatbot development.</p>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold text-slate-900">Java Backend Intern</h3>
                                  <span className="text-[10px] text-slate-500">Jun – Jul 2025</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-700">Kristu Jayanti Software Development Center, Bengaluru</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">Java Vert.x REST APIs with MongoDB & Redis in Agile environment.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ============================================================ */}
                      {/* PAGE 4: PROJECTS, SKILLS, CERTIFICATIONS & DIRECTION */}
                      {/* ============================================================ */}
                      {currentPage === 4 && (
                        <div className="space-y-4">
                          <div className="pb-2 mb-3 border-b border-slate-300 flex items-center justify-between">
                            <h2 className="text-lg font-serif font-bold text-slate-900 uppercase">Jeswin Jerard</h2>
                            <span className="text-[10px] font-mono px-2.5 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-600 font-bold">
                              DIARY PAGE 4 OF 4
                            </span>
                          </div>

                          {/* Projects */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              RESEARCH & TECHNICAL PROJECTS
                            </h2>
                            <div className="space-y-2 text-xs">
                              <div>
                                <h3 className="font-bold text-slate-900 text-xs">NLP RESUME RANKER</h3>
                                <p className="text-[10px] font-mono text-cyan-800">Python • SpaCy • TF-IDF • Flask REST API</p>
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 text-xs">KJU PLACEMENTS ERP — LIVE PROJECT</h3>
                                <p className="text-[10px] font-mono text-cyan-800">Java • MongoDB Microservices</p>
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 text-xs">CHATXP — EXPENSE TELEMETRY</h3>
                                <p className="text-[10px] font-mono text-cyan-800">Python • MongoDB Aggregations</p>
                              </div>
                            </div>
                          </div>

                          {/* Technical Skills */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              TECHNICAL SKILLS MATRIX
                            </h2>
                            <div className="space-y-1 text-[11px]">
                              <p><strong className="text-slate-900">Programming:</strong> Python • Java • SQL • OOP • Data Structures</p>
                              <p><strong className="text-slate-900">AI / ML:</strong> SpaCy • TF-IDF • Scikit-learn • Generative AI • RAG</p>
                              <p><strong className="text-slate-900">Dev & Tools:</strong> Flask • Vert.x • MongoDB • Power BI • Git • Linux</p>
                            </div>
                          </div>

                          {/* Certifications */}
                          <div>
                            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase border-b border-slate-400 pb-1 mb-2">
                              CERTIFICATIONS
                            </h2>
                            <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-800 font-medium">
                              <li>• Oracle Cloud Infrastructure Generative AI Professional</li>
                              <li>• Oracle AI Vector Search Certified Professional</li>
                              <li>• Oracle Cloud AI Foundations & AWS Cloud Development</li>
                              <li>• UiPath Agentic Automation & Prompt Engineering</li>
                            </ul>
                          </div>

                          {/* Research Direction */}
                          <div className="bg-purple-50/60 p-2.5 rounded border border-purple-200">
                            <h2 className="text-xs font-mono font-bold tracking-widest text-purple-950 uppercase border-b border-purple-300 pb-1 mb-1">
                              RESEARCH DIRECTION
                            </h2>
                            <p className="text-[11px] text-slate-700 leading-snug">
                              Investigating efficient, reliable, and scalable AI agents with focus on agent lifecycle management, resource allocation, multi-agent coordination, and trustworthy intelligent systems.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Page Footer */}
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>JESWIN JERARD — RESEARCH DIARY</span>
                        <span>PAGE {currentPage} OF 4</span>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Navigation Flip Controls */}
              <div className="flex items-center justify-between w-full max-w-xl mt-4 px-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs transition-all ${
                    currentPage === 1 
                      ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-500 border border-transparent' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span>Prev Page</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-400">
                    Page <strong className="text-cyan-400">{currentPage}</strong> / 4
                  </span>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold transition-all"
                  >
                    <X size={14} />
                    <span>Close</span>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === 4}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs transition-all ${
                    currentPage === 4 
                      ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-500 border border-transparent' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  <span>Next Page</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CvBookModal;
