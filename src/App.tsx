import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SnowAnimation from './components/SnowAnimation';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [snowEnabled, setSnowEnabled] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Snow Animation */}
      {!reducedMotion && snowEnabled && <SnowAnimation particleCount={400} enabled={snowEnabled} />}
      
      {/* Navigation */}
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-blue-200">
            © 2025 Ijlal Furqaan. Crafted with ❄️ and modern web technologies.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Built with React, TypeScript, Three.js, GSAP, and Tailwind CSS
          </p>
        </div>
      </footer>
      
      {/* Control Buttons */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col space-y-2">
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className="p-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-slate-700/80 transition-all duration-300"
          title="Toggle animations"
        >
          {reducedMotion ? '🎬' : '⏸️'}
        </button>
        <button
          onClick={() => setSnowEnabled(!snowEnabled)}
          className="p-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-slate-700/80 transition-all duration-300"
          title="Toggle snow"
        >
          {snowEnabled ? '❄️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default App;