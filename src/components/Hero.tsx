import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Ijlal Furqaan";
  const subtitle = "Software Engineer & Full-Stack Developer";

  useEffect(() => {
    // Typewriter effect
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        // Animate subtitle after name is complete
        gsap.fromTo('.hero-subtitle', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
        gsap.fromTo('.hero-description', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1 }
        );
        gsap.fromTo('.hero-cta', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1.5 }
        );
        gsap.fromTo('.hero-social', 
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 2, stagger: 0.1 }
        );
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`} />
      
      {/* Frost Overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-t from-transparent via-blue-500/5 to-white/10' 
          : 'bg-gradient-to-t from-transparent via-blue-200/10 to-white/20'
      }`} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Name with typewriter effect */}
        <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-colors duration-500 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {displayText}
          <span className="animate-pulse text-amber-400">|</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className={`hero-subtitle text-2xl md:text-4xl font-light mb-8 opacity-0 transition-colors duration-500 ${
          darkMode ? 'text-blue-100' : 'text-blue-700'
        }`}>
          {subtitle}
        </h2>
        
        {/* Description */}
        <p className={`hero-description text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 transition-colors duration-500 ${
          darkMode ? 'text-blue-200' : 'text-blue-600'
        }`}>
          Passionate Master's student in Computer Science who loves diving into full-stack development and system optimization. 
          I enjoy building scalable apps with RESTful APIs, solving complex problems with a creative twist, and always finding new ways to learn and innovate.
        </p>
        
        {/* CTA Button */}
        <div className="hero-cta opacity-0">
          <button
            onClick={scrollToProjects}
            className={`group relative px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              darkMode 
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-300 hover:to-amber-400 hover:shadow-amber-400/25' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/25'
            }`}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-12">
          <a
            href="https://github.com/IjlalFurqaan"
            className={`hero-social p-3 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 opacity-0 ${
              darkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ijlal-furqaan32b7251b6/"
            className={`hero-social p-3 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 opacity-0 ${
              darkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:ijlalfurqaan5@gmail.com"
            className={`hero-social p-3 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 opacity-0 ${
              darkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className={`transition-colors duration-500 ${
          darkMode ? 'text-white/60' : 'text-gray-600'
        }`} size={32} />
      </div>
    </section>
  );
};

export default Hero;