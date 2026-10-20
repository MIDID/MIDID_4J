import React, { useState, useEffect } from 'react';
import FluidWaterBackground from './components/FluidWaterBackground';
import OceanLoadingScreen from './components/OceanLoadingScreen';
import OceanScrollytellingHUD from './components/OceanScrollytellingHUD';
import WaterRippleCursor from './components/WaterRippleCursor';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SkillModal from './components/SkillModal';
import SuperpositionEffect from './components/SuperpositionEffect';
import EntangledSplitView from './components/EntangledSplitView';
import AiChatbot from './components/AiChatbot';

const App = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isSuperposition, setIsSuperposition] = useState(false);
  const [isEntangled, setIsEntangled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`relative min-h-screen font-space transition-colors duration-500 overflow-x-hidden ${
      theme === 'light' 
        ? 'text-[#1a202c] bg-[#e0f2fe]/40 selection:bg-cyan-500/25 selection:text-cyan-950' 
        : 'text-[#f5f3f8] bg-[#030712] selection:bg-cyan-500/30 selection:text-cyan-200'
    }`}>
      {/* 1. Custom Ocean Loading Animation (The Ocean Agency Inspiration) */}
      {isLoading && (
        <OceanLoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Micro-Interactive Fluid Water Ripple Cursor */}
      <WaterRippleCursor theme={theme} />

      {/* 3. Interactive 3D Real-Time Fluid Water Graphics & Caustic Background */}
      <FluidWaterBackground theme={theme} />

      {/* 4. Immersive Oceanic Scrollytelling Depth HUD */}
      <OceanScrollytellingHUD theme={theme} />
      
      <div className={`transition-opacity duration-500 ${
        isSuperposition || isEntangled ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
      }`}>
        <NavBar 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          onToggleSuperposition={() => setIsSuperposition(true)} 
          onToggleEntanglement={() => setIsEntangled(true)}
        />
        
        <main className="relative z-10">
          <Hero theme={theme} />
          <About theme={theme} />
          <Projects theme={theme} />
          <Skills theme={theme} onSkillClick={setActiveSkill} />
          <Contact theme={theme} />
        </main>
      </div>

      <SkillModal 
        skill={activeSkill} 
        onClose={() => setActiveSkill(null)} 
        theme={theme}
      />

      <SuperpositionEffect 
        isActive={isSuperposition} 
        onDeactivate={() => setIsSuperposition(false)} 
        theme={theme} 
      />

      <EntangledSplitView
        isActive={isEntangled}
        onClose={() => setIsEntangled(false)}
        baseTheme={theme}
        onSkillClick={setActiveSkill}
      />

      <AiChatbot theme={theme} />
    </div>
  );
};

export default App;
