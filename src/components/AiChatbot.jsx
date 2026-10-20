import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, MessageSquare, Send, X, Settings, 
  Trash2, Key, Zap, Check, AlertCircle, ArrowUpRight,
  ExternalLink, CornerDownLeft, RefreshCw
} from 'lucide-react';

const JESWIN_HUMAN_SYSTEM_PROMPT = `You are "Jeswin AI", the personal conversational companion on Jeswin Jerard's portfolio website.

Your Tone & Persona:
- You speak naturally, warmly, and with genuine intellectual enthusiasm—just like ChatGPT or Google Gemini in conversation mode.
- Avoid robotic bullet lists or dry database outputs. Instead, talk in articulate, flowing, conversational paragraphs.
- Blend professional authority (Jeswin is an Assistant Professor and IEEE published researcher) with an inviting, friendly demeanor.
- Speak in the third person about Jeswin ("Jeswin loves tackling...", "His background is pretty unique because...") or collaboratively as his AI assistant ("I'd be happy to tell you about his work!").
- When appropriate, conclude with a natural, conversational follow-up question (e.g., "Are you looking into his research for a potential collaboration, or curious about his engineering projects?").

Deep Context on Jeswin Jerard:
1. Who He Is:
   - Assistant Professor in AI & ML at Girideepam Institute of Advanced Learning in Kottayam, Kerala.
   - Researcher at the intersection of Quantum Cryptography and Multi-Agent AI Systems.
   - He bridges rigorous theoretical physics with practical enterprise software engineering.

2. Academic Journey:
   - Completed his Master of Computer Applications (MCA) in AI & ML at Kristu Jayanti University, Bengaluru (2026) with an 8.1 / 10.0 CGPA.
   - Earned his Bachelor of Science (B.Sc) in Physics at St. Thomas College, Palai (2024) with a 7.99 / 10.0 CGPA.
   - Starting with Physics gave him a deep appreciation for mathematical fundamentals, which led directly to his research in Quantum Key Distribution.

3. Published Research:
   - "Hybrid MDI-TF-QKD Quantum Key Distribution" (Presented at ICEMCSI 2026, published in IEEE Xplore): Solves detector side-channel vulnerabilities while dramatically boosting key generation rates over long optical fiber distances by merging Measurement-Device-Independent and Twin-Field architectures.
   - "AI Resource Management in Multi-Agent Systems (ARM)" (National Student Research Symposium 2025): A complete lifecycle architecture for autonomous agents—covering capability profiling, real-time workload orchestration, telemetry monitoring, and secure decommissioning.

4. Real-World Engineering Projects:
   - NLP Resume Ranker: An intelligent HR filtering pipeline built with Python, SpaCy tokenization, TF-IDF vector similarity matrices, and Flask REST endpoints. It achieved a 94.8% precision score with sub-120ms latency.
   - KJU Placements ERP: High-throughput reactive backend built with Java Vert.x and MongoDB to orchestrate college placement recruitment drives, supporting 5,000+ concurrent requests with zero downtime.
   - ChatXP Telemetry: Dynamic personal finance and expense pattern analysis tool utilizing MongoDB aggregation pipelines and real-time visualization.

5. Technical Arsenal:
   - Languages: Python, Java, SQL.
   - AI & Data: SpaCy NLP, Scikit-learn, Generative AI, RAG architectures, Prompt Engineering, Vector Search.
   - Backend & Data: Flask, Java Vert.x, REST APIs, Microservices, MongoDB, Redis caching.
   - Certifications: Oracle Gen AI Professional, Oracle AI Vector Search, Oracle Cloud AI Foundations, AWS Cloud Development, UiPath Agentic Automation.

6. Collaboration & Contact:
   - Email: jeswinjerard.work@gmail.com
   - Open to AI Engineering positions, backend architecture, and academic/industry research partnerships.

Conversational Rules:
- Answer casual questions, greetings, and humor with warmth and wit.
- If asked a broad question ("tell me about him"), give a captivating 2-3 paragraph overview highlighting the physics-to-AI pivot and his dual focus on quantum security and real-world backends.
- Keep responses concise enough for comfortable chat reading (typically 2-4 conversational paragraphs).`;

// Rich human-like conversational fallback engine (sounds like Gemini/ChatGPT chatting, not a database list)
const getHumanLikeResponse = (query) => {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase().replace(/[?!.,]/g, '').trim();

  // Casual greetings (including 'hai', 'haai', 'heyy', 'hii', 'namaste', etc.)
  const greetingPattern = /^(hi|hai|haai|hii+|heyy+|hey|hello|hola|yo|sup|namaste|vanakkam|gm|ge|howdy)(\s.*)?$/i;
  if (greetingPattern.test(q) || ['good morning', 'good evening', 'good afternoon', 'whats up', "what's up"].includes(q)) {
    return `Hey there! Great to connect with you. 😊 I'm Jeswin's AI portfolio companion.\n\nWhether you're curious about his **IEEE-published Quantum Cryptography research**, his **Multi-Agent AI systems**, his **engineering projects**, or want to reach out to collaborate—I'm here to chat! What's on your mind today?`;
  }

  // Casual acknowledgments & positive remarks
  if (/^(ok|okke|okay|cool|nice|awesome|great|super|got it|sounds good|alright|fine|perfect|yep|yeah)$/i.test(q)) {
    return `Awesome! Let me know if there's anything specific you'd like to look into—like how his **NLP Resume Ranker** achieved 94.8% precision, or the physics behind his **Twin-Field QKD paper**!`;
  }

  // Thanks / Gratitude
  if (q.includes('thank') || q.includes('thx') || q.includes('tq')) {
    return `You're very welcome! Always happy to help. Let me know if you want to explore more about Jeswin's work or connect with him directly!`;
  }

  // How are you / small talk
  if (q.includes('how are you') || q.includes('how are u') || q.includes('how r u') || q.includes('how do you do')) {
    return `I'm doing fantastic, thank you for asking! 😊 Everything is humming along smoothly.\n\nHow can I help you today? Would you like to check out Jeswin's research publications, dive into his software projects, or learn about his academic journey?`;
  }

  // Who are you / about the bot
  if (q.includes('who are you') || q.includes('what are you') || q.includes('your name') || q.includes('who made you')) {
    return `I'm **Jeswin AI**, the interactive digital assistant built for this portfolio. Think of me as a direct window into Jeswin Jerard's background, research, and engineering systems!\n\nI can answer questions about his papers in Quantum Cryptography, his multi-agent orchestration frameworks, or his practical microservice architectures. What would you like to know?`;
  }

  // Who is Jeswin / overview
  if (q.includes('who is jeswin') || q.includes('tell me about jeswin') || q.includes('about him') || q.includes('introduction') || q.includes('introduce')) {
    return `Jeswin Jerard is an **Assistant Professor in AI & ML** at Girideepam Institute of Advanced Learning and an active researcher diving into quantum computing and multi-agent AI.\n\nWhat makes his journey fascinating is his multidisciplinary foundation: he actually started out in **Physics** (B.Sc from St. Thomas College, Palai) before pursuing his **MCA in AI & ML** at Kristu Jayanti University. That physics-first mindset gives him a unique theoretical edge—especially when solving tough challenges in quantum cryptography and autonomous systems.\n\nOn the practical side, he has built everything from high-concurrency microservices handling thousands of users to SpaCy-powered NLP ranking engines. Would you like to hear more about his research papers or his software systems?`;
  }

  // Research / QKD / IEEE / Publications
  if (q.includes('research') || q.includes('paper') || q.includes('ieee') || q.includes('qkd') || q.includes('quantum') || q.includes('publication') || q.includes('icemcsi')) {
    return `Jeswin’s research primarily explores two exciting frontiers:\n\nFirst is **Quantum Cryptography**. He co-authored a paper titled *"Hybrid MDI-TF-QKD Quantum Key Distribution"*, which was presented at ICEMCSI 2026 and published in **IEEE Xplore**. The core breakthrough here was synthesizing Measurement-Device-Independent and Twin-Field schemes, which essentially eliminates detector hacking vulnerabilities while letting secure cryptographic keys travel over much longer distances.\n\nSecond is his work on **Multi-Agent Systems (ARM)**, focusing on how autonomous AI agents are governed throughout their operational lifecycle.\n\nAre you curious about the mathematical physics behind the QKD setup, or would you like to know more about the multi-agent framework?`;
  }

  // ARM / Multi-Agent Systems
  if (q.includes('arm') || q.includes('agent') || q.includes('multi-agent') || q.includes('multi agent') || q.includes('lifecycle')) {
    return `Jeswin's **ARM (AI Resource Management)** framework tackled a really pressing question in modern AI: *Once you have dozens of autonomous agents running around in an enterprise, how do you manage them without chaos?*\n\nPresented at the National Student Research Symposium (2025), ARM outlines a structured lifecycle:\n- **Onboarding & Profiling**: Benchmarking each agent's cognitive capabilities and token costs before release.\n- **Dynamic Allocation**: Routing tasks intelligently based on real-time agent workloads.\n- **Telemetry**: Continuously watching for drift, latency spikes, and hallucinations.\n- **Safe Retirement**: Gracefully shutting down decommissioned agents and reclaiming memory.\n\nIt’s essentially DevOps meets autonomous agent orchestration. Pretty neat, right?`;
  }

  // Projects / work / code
  if (q.includes('project') || q.includes('built') || q.includes('nlp') || q.includes('erp') || q.includes('chatxp') || q.includes('system') || q.includes('github')) {
    return `Jeswin has built some impressive end-to-end systems that demonstrate both AI depth and backend engineering muscle:\n\n1. **NLP Resume Ranker**: An enterprise-grade candidate matching engine using SpaCy and TF-IDF vector similarity. It parsed and scored resumes against job requirements via a lightning-fast Flask API, delivering a **94.8% precision rate with under 120ms latency**.\n\n2. **KJU Placements ERP**: A high-throughput recruitment backend developed with reactive **Java Vert.x** and **MongoDB**. It automated student placements across Kristu Jayanti University, reliably handling over 5,000 concurrent requests with zero downtime.\n\n3. **ChatXP Telemetry**: A personal finance engine leveraging dynamic MongoDB aggregation pipelines to automatically categorize financial transactions and uncover predictive spending patterns.\n\nWhich of these would you like to take a deeper look at?`;
  }

  // Skills / tech stack / languages
  if (q.includes('skill') || q.includes('tech stack') || q.includes('stack') || q.includes('python') || q.includes('java') || q.includes('language') || q.includes('technologies')) {
    return `Jeswin’s skill set is built around scalable engineering and applied intelligence:\n\n- **Core Languages**: Python and Java are his daily drivers, supported by strong object-oriented principles, algorithms, and clean system design.\n- **AI & NLP**: He works deeply with SpaCy, Scikit-learn, Generative AI, RAG architectures, prompt engineering, and vector search embeddings.\n- **Backend Infrastructure**: He designs microservices using Flask and reactive Java Vert.x, with Redis caching for ultra-low latency.\n- **Databases**: Both relational SQL databases and optimized NoSQL document stores like MongoDB.\n\nHe also holds several Oracle Cloud and AWS certifications validating these skills. Looking for a particular technology for your team?`;
  }

  // Education / College / Degree
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('mca') || q.includes('physics') || q.includes('study') || q.includes('graduat')) {
    return `Jeswin has an academic path that really sets him apart:\n\nHe earned his **MCA (AI & ML)** from **Kristu Jayanti University, Bengaluru** (Class of 2026) with a stellar **8.1 / 10.0 CGPA**. Before that, he graduated with a **B.Sc in Physics** from **St. Thomas College, Palai** (Class of 2024, **7.99 / 10.0 CGPA**).\n\nHaving that foundational grounding in quantum mechanics, thermodynamics, and mathematics allows him to understand AI beyond just calling APIs—he looks at loss landscapes, optimization vectors, and quantum information theory from first principles.`;
  }

  // Certifications
  if (q.includes('certif') || q.includes('oracle') || q.includes('aws') || q.includes('uipath') || q.includes('credential')) {
    return `Jeswin takes continuous learning very seriously! Some of his key verified credentials include:\n\n- **Oracle Gen AI Professional** (OCI Generative AI Architecture)\n- **Oracle AI Vector Search** (Vector Databases & Semantic Retrieval)\n- **Oracle Cloud AI Foundations** (Core Neural & Model Concepts)\n- **AWS Cloud Development** (AWS Academy Graduate)\n- **UiPath Agentic Automation** (Autonomous Agent & Prompt Engineering)\n\nThese reflect his hands-on experience deploying AI both in cloud environments and on enterprise-grade infrastructure.`;
  }

  // Contact / Hire / Email / Collaboration
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('collab') || q.includes('job') || q.includes('available') || q.includes('message')) {
    return `Jeswin is actively open to **AI Engineering opportunities**, **Backend Architecture roles**, and **Academic/Industry Research Collaborations**!\n\nThe best way to reach him directly is via email at **[jeswinjerard.work@gmail.com](mailto:jeswinjerard.work@gmail.com)**.\n\nHe's based in Kottayam, Kerala, and loves discussing new ideas, novel AI architectures, or discussing how he can bring value to an ambitious engineering team. Would you like me to guide you to the contact section of this page?`;
  }

  // Why Physics / Transition
  if (q.includes('why physics') || q.includes('switch') || q.includes('transition')) {
    return `That’s one of the best questions! Jeswin’s transition from Physics to Computer Science and AI wasn’t a departure—it was a natural evolution.\n\nPhysics trains your mind to strip complicated phenomena down to fundamental mathematical laws. When Jeswin saw modern neural networks and quantum computing, he realized that modern AI is essentially statistical mechanics and linear algebra at scale. Studying Physics gave him the exact intuition needed to research Quantum Key Distribution (QKD) and multi-agent dynamical systems!`;
  }

  // General default response - warm, casual, and human
  return `I'm happy to chat about anything related to Jeswin! You can ask about his **IEEE-published Quantum Cryptography research**, his **Multi-Agent ARM framework**, his **NLP and microservice projects**, or how to get in touch with him.\n\nWhat would you like to know?`;
};

const SUGGESTED_PROMPTS = [
  "🔬 Tell me about your IEEE QKD research",
  "🤖 How does your Multi-Agent ARM framework work?",
  "💻 What are your top engineering projects?",
  "⚡ What is your full tech stack?",
  "🎓 Why did you transition from Physics to AI?",
  "📬 How can I collaborate or hire you?"
];

const AiChatbot = ({ theme = 'dark' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasPromptedPill, setHasPromptedPill] = useState(true);
  
  // Optional default API Key (leave empty so secrets are never pushed to GitHub)
  const DEFAULT_API_KEY = "";

  // API Configuration State - connected by default
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('jeswin_ai_api_key') || import.meta.env.VITE_GEMINI_API_KEY || DEFAULT_API_KEY;
  });
  const [provider, setProvider] = useState(() => {
    return localStorage.getItem('jeswin_ai_provider') || 'gemini'; // 'gemini' | 'openrouter'
  });
  const [tempApiKey, setTempApiKey] = useState(apiKey || DEFAULT_API_KEY);
  const [tempProvider, setTempProvider] = useState(provider);

  // Chat conversation state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hey there! 👋 I'm **Jeswin AI**.\n\nI can tell you all about Jeswin's **IEEE-published research in Quantum Cryptography**, his **Multi-Agent AI framework**, or walk you through his **software projects** and academic background.\n\nWhat would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isStreamingRef = useRef(false);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamingText, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showSettings) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setHasPromptedPill(false);
    }
  }, [isOpen, showSettings]);

  // Hide the initial launcher pill after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedPill(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const saveSettings = () => {
    setApiKey(tempApiKey.trim());
    setProvider(tempProvider);
    if (tempApiKey.trim()) {
      localStorage.setItem('jeswin_ai_api_key', tempApiKey.trim());
    } else {
      localStorage.removeItem('jeswin_ai_api_key');
    }
    localStorage.setItem('jeswin_ai_provider', tempProvider);
    setShowSettings(false);
    setErrorMessage(null);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        text: "Fresh canvas! Feel free to ask me anything about Jeswin's work, research, or background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setStreamingText('');
  };

  // Human-like typewriter streaming effect
  const streamTextSmoothly = async (fullText) => {
    setIsLoading(false);
    setStreamingText('');
    isStreamingRef.current = true;

    // Split into natural word chunks for realistic streaming speed
    const words = fullText.split(' ');
    let current = '';

    for (let i = 0; i < words.length; i++) {
      if (!isStreamingRef.current) break;
      current += (i === 0 ? '' : ' ') + words[i];
      setStreamingText(current);
      // Dynamic delay mimicking human conversational flow (faster for short words, slight pauses on punctuation)
      const lastChar = words[i].slice(-1);
      const isPunctuation = ['.', '!', '?', '\n'].includes(lastChar);
      const delay = isPunctuation ? 35 : 18;
      await new Promise(res => setTimeout(res, delay));
    }

    setMessages(prev => [
      ...prev,
      {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        text: fullText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setStreamingText('');
    isStreamingRef.current = false;
  };

  // Call Live Gemini API with official system_instruction support
  const callGeminiApi = async (userPrompt, chatHistory) => {
    // Current active Gemini models
    const primaryModel = 'gemini-3.6-flash';
    const fallbackModel = 'gemini-flash-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${primaryModel}:generateContent?key=${apiKey}`;

    // Proper conversation history formatting for Gemini
    const contents = [];
    
    // Feed previous conversational turns
    chatHistory.slice(-6).forEach(m => {
      contents.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }]
    });

    const bodyPayload = {
      system_instruction: {
        parts: [{ text: JESWIN_HUMAN_SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
      // Fallback try with fallbackModel if primary has an issue
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${fallbackModel}:generateContent?key=${apiKey}`;
      const fallbackResp = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      if (!fallbackResp.ok) {
        const errData = await fallbackResp.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Gemini API returned HTTP ${response.status}`);
      }

      const fbData = await fallbackResp.json();
      return fbData.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't formulate a response. Let's try again!";
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't formulate a response. Let's try again!";
  };

  // Call OpenRouter API with conversational system message
  const callOpenRouterApi = async (userPrompt, chatHistory) => {
    const url = 'https://openrouter.ai/api/v1/chat/completions';

    const formattedMessages = [
      { role: 'system', content: JESWIN_HUMAN_SYSTEM_PROMPT }
    ];

    chatHistory.slice(-6).forEach(m => {
      formattedMessages.push({
        role: m.role,
        content: m.text
      });
    });

    formattedMessages.push({ role: 'user', content: userPrompt });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Jeswin Jerard Portfolio AI'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: formattedMessages,
        temperature: 0.8,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `OpenRouter returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading || isStreamingRef.current) return;

    setInputMessage('');
    setErrorMessage(null);

    const userMsg = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      let botReply = '';

      if (apiKey) {
        // Use live LLM API (Gemini or OpenRouter)
        if (provider === 'gemini') {
          botReply = await callGeminiApi(query, messages);
        } else {
          botReply = await callOpenRouterApi(query, messages);
        }
      } else {
        // Simulated thoughtful pause, then human-like response
        await new Promise(r => setTimeout(r, 650));
        botReply = getHumanLikeResponse(query);
      }

      // Stream the response with a typewriter effect like ChatGPT/Gemini
      await streamTextSmoothly(botReply);

    } catch (err) {
      console.warn('Live LLM request failed, engaging smart conversational fallback:', err);
      setErrorMessage(`Live API issue: ${err.message}. Answering with local conversational intelligence.`);
      
      const fallbackReply = getHumanLikeResponse(query);
      await streamTextSmoothly(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  // Markdown renderer for rich and clean chat visuals
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Parse markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a 
            key={match.index} 
            href={match[2]} 
            target={match[2].startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 font-semibold inline-flex items-center gap-0.5"
          >
            {match[1]} <ArrowUpRight size={10} />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : (
        <span dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
            .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-xs">$1</code>')
        }} />
      );

      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-1 leading-relaxed">
            {content}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="ml-2 text-slate-200 my-1.5 leading-relaxed font-sans">
            {content}
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-slate-200 my-1.5 leading-relaxed font-sans">
          {content}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (FAB Launcher) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none">
        
        {/* Intro Notification Pill */}
        <AnimatePresence>
          {!isOpen && hasPromptedPill && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer aurora-glass-card rounded-2xl px-4 py-2.5 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] hidden sm:flex items-center gap-3 text-xs text-white group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <div>
                <p className="font-bold text-cyan-300 group-hover:text-cyan-200 font-syne">Chat with Jeswin AI</p>
                <p className="text-[10px] text-slate-400 font-mono">Ask about research & projects</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setHasPromptedPill(false); }}
                className="text-slate-400 hover:text-white ml-1 p-0.5 rounded-full hover:bg-white/10"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Pulse Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-[#0f172a] text-cyan-400 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
              : 'bg-gradient-to-tr from-cyan-600 via-purple-600 to-amber-500 text-white shadow-[0_0_35px_rgba(6,182,212,0.5)] border border-white/20'
          }`}
          aria-label="Toggle AI Assistant"
        >
          {/* Orbital Ring Animation */}
          {!isOpen && (
            <div className="absolute inset-[-4px] rounded-full border border-cyan-400/50 animate-spin-slow pointer-events-none"></div>
          )}

          {isOpen ? (
            <X size={24} className="transition-transform rotate-0 group-hover:rotate-90" />
          ) : (
            <div className="relative">
              <Bot size={26} />
              <Sparkles size={12} className="absolute -top-1 -right-1 text-amber-300 animate-pulse" />
            </div>
          )}

          {/* Active online indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0f0e17]"></span>
        </motion.button>
      </div>

      {/* Main Chatbot Floating Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] md:w-[480px] h-[620px] max-h-[82vh] rounded-3xl flex flex-col overflow-hidden aurora-glass-card border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] bg-[#0a0f1d]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 px-5 border-b border-white/10 bg-gradient-to-r from-[#0d162d] via-[#111e3f] to-[#0d162d] flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Bot size={22} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c101d] animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-syne font-bold text-white text-base">Jeswin AI</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      apiKey 
                        ? (provider === 'gemini' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-purple-500/20 text-purple-300 border-purple-500/40')
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {apiKey ? (provider === 'gemini' ? 'Gemini 3.6 Live' : 'OpenRouter Live') : 'Conversational Mode'}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">Quantum Neural Portfolio Companion</p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="Configure Live Gemini API Key"
                  className={`p-2 rounded-xl transition-colors ${
                    showSettings 
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Error Notification Banner if any */}
            {errorMessage && (
              <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/30 text-[11px] font-mono text-amber-300 flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <AlertCircle size={14} className="shrink-0 text-amber-400" />
                  <span className="truncate">{errorMessage}</span>
                </div>
                <button onClick={() => setErrorMessage(null)} className="text-amber-400 hover:text-white ml-2">
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Settings Overlay Drawer */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-white/10 bg-[#080d1a] p-4 text-xs font-mono space-y-3 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-white font-bold pb-1 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Key size={14} />
                      <span>Live LLM Model Connection</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    Want unlimited, open-ended reasoning powered directly by Google Gemini? Paste your free key below. If left empty, it uses the human-crafted conversational engine!
                  </p>

                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-300 block">AI Engine:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTempProvider('gemini')}
                        className={`py-1.5 px-3 rounded-xl border text-center transition-colors ${
                          tempProvider === 'gemini'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 font-bold'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        Google Gemini (Free)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempProvider('openrouter')}
                        className={`py-1.5 px-3 rounded-xl border text-center transition-colors ${
                          tempProvider === 'openrouter'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-bold'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        OpenRouter API
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] text-slate-300">
                        {tempProvider === 'gemini' ? 'Google Gemini API Key:' : 'OpenRouter API Key:'}
                      </label>
                      {tempProvider === 'gemini' && (
                        <a 
                          href="https://aistudio.google.com/app/apikey" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          Get Free Key <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    <input
                      type="password"
                      placeholder={tempProvider === 'gemini' ? 'AIzaSy...' : 'sk-or-...'}
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={saveSettings}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1.5 text-xs"
                    >
                      <Check size={14} />
                      <span>Save & Apply</span>
                    </button>
                    <button
                      onClick={() => {
                        setTempApiKey('');
                        setApiKey('');
                        localStorage.removeItem('jeswin_ai_api_key');
                        setShowSettings(false);
                      }}
                      className="py-2 px-3 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/15 transition-all text-xs"
                    >
                      Clear
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm font-sans">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {msg.role === 'user' ? 'You' : 'Jeswin AI'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">• {msg.timestamp}</span>
                  </div>

                  <div 
                    className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-tr-xs'
                        : 'bg-[#141d33]/95 border border-white/10 text-slate-200 rounded-tl-xs shadow-[0_4px_25px_rgba(0,0,0,0.35)]'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Live Streaming Typewriter Bubble */}
              {streamingText && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-cyan-400">Jeswin AI</span>
                    <span className="text-[9px] font-mono text-slate-500">• Speaking</span>
                  </div>
                  <div className="max-w-[88%] rounded-2xl rounded-tl-xs p-4 bg-[#141d33]/95 border border-cyan-500/40 text-slate-200 text-xs sm:text-[13px] leading-relaxed shadow-lg">
                    {renderFormattedText(streamingText)}
                    <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle"></span>
                  </div>
                </div>
              )}

              {/* Thinking / Neural Pulse Indicator */}
              {isLoading && !streamingText && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-cyan-400">Jeswin AI</span>
                    <span className="text-[9px] font-mono text-slate-500">• Thinking</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-xs p-3.5 bg-[#141d33]/95 border border-cyan-500/30 text-cyan-300 flex items-center gap-2.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]"></span>
                    <span className="font-mono text-xs text-slate-300 ml-1">Formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#090e1c] overflow-x-auto flex gap-2 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading || !!streamingText}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-[11px] font-space transition-all disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3.5 border-t border-white/10 bg-[#0a1020] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything naturally (e.g. Tell me about his research...)"
                disabled={isLoading || !!streamingText}
                className="flex-1 bg-white/[0.05] border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading || !!streamingText}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-purple-600 to-amber-500 text-white flex items-center justify-center hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                aria-label="Send Message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbot;
