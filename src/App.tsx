import React, { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';

// Lazy load components for better performance
const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const SnowAnimation = lazy(() => import('./components/SnowAnimation'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Snow Animation - only in dark mode for performance */}
      {darkMode && (
        <Suspense fallback={null}>
          <SnowAnimation particleCount={100} enabled={darkMode} />
        </Suspense>
      )}

      {/* Navigation */}
      <Suspense fallback={<div className="h-16 bg-gray-200 dark:bg-gray-800" />}>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Suspense>

      {/* Main Content */}
      <main className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero darkMode={darkMode} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Experience darkMode={darkMode} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Education darkMode={darkMode} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Projects darkMode={darkMode} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Skills darkMode={darkMode} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Contact darkMode={darkMode} /> {/* Added darkMode prop */}
        </Suspense>
      </main>
    </div>
  );
};

export default App;