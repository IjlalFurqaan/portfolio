/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend Technologies
  { name: "React", level: 90, category: "Frontend" },
  { name: "JavaScript", level: 88, category: "Frontend" },
  { name: "HTML5", level: 85, category: "Frontend" },
  { name: "CSS3", level: 82, category: "Frontend" },
  { name: "TypeScript", level: 80, category: "Frontend" },
  { name: "Tailwind CSS", level: 78, category: "Frontend" },
  { name: "Bootstrap", level: 75, category: "Frontend" },
  { name: "Redux", level: 75, category: "Frontend" },
  
  // Backend Technologies
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "Python", level: 82, category: "Backend" },
  { name: "RESTful APIs", level: 85, category: "Backend" },
  { name: "C++", level: 75, category: "Backend" },
  
  // Database Technologies
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "SQL", level: 78, category: "Database" },
  
  // Tools & Others
  { name: "Git", level: 85, category: "Tools" },
  { name: "GitHub", level: 85, category: "Tools" },
  { name: "OpenCV", level: 70, category: "Tools" },
  { name: "Flask", level: 75, category: "Tools" },
  { name: "MS-Office", level: 80, category: "Tools" }
];

const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate skill bars
    barsRef.current.forEach((bar, index) => {
      if (bar) {
        const skill = skills[index];
        const progressBar = bar.querySelector('.progress-fill') as HTMLElement;
        const percentageText = bar.querySelector('.percentage') as HTMLElement;
        
        if (progressBar && percentageText) {
          // Set initial state
          gsap.set(progressBar, { width: '0%' });
          gsap.set(percentageText, { textContent: '0%' });
          
          // Animate on scroll
          ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            onEnter: () => {
              gsap.to(progressBar, {
                width: `${skill.level}%`,
                duration: 2,
                ease: "power3.out",
                delay: index * 0.1
              });
              
              gsap.to({ value: 0 }, {
                value: skill.level,
                duration: 2,
                ease: "power3.out",
                delay: index * 0.1,
                onUpdate: function() {
                  percentageText.textContent = `${Math.round(this.targets()[0].value)}%`;
                }
              });
            }
          });
        }
      }
    });

    // Section title animation
    gsap.fromTo('.skills-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.skills-title',
          start: "top 80%"
        }
      }
    );

    // Category cards animation
    gsap.fromTo('.skill-category',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: "top 80%"
        }
      }
    );

  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) barsRef.current[index] = el;
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Frontend: 'from-blue-400 to-cyan-400',
      Backend: 'from-green-400 to-emerald-400',
      Database: 'from-purple-400 to-violet-400',
      Tools: 'from-orange-400 to-amber-400'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative py-20 px-6 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-800 to-slate-900' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/5' : 'bg-purple-500/10'
        }`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`skills-title text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Technical Skills
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Over 2.5 years of professional experience in full-stack development, specializing in React, Node.js, 
            and modern web technologies. Passionate about building scalable applications and solving complex problems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, _index) => (
            <div
              key={category}
              className={`skill-category backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:border-white/20' 
                  : 'bg-white/80 border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${getCategoryColor(category)} bg-clip-text text-transparent`}>
                {category}
              </h3>
              
              <div className="space-y-4">
                {getSkillsByCategory(category).map((skill) => {
                  const globalIndex = skills.findIndex(s => s.name === skill.name);
                  return (
                    <div
                      key={skill.name}
                      ref={(el) => addToRefs(el, globalIndex)}
                      className="skill-bar"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {skill.name}
                        </span>
                        <span className="percentage text-amber-400 font-bold">0%</span>
                      </div>
                      
                      <div className={`relative h-3 rounded-full overflow-hidden ${
                        darkMode ? 'bg-slate-700' : 'bg-gray-200'
                      }`}>
                        {/* Background glow */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)} opacity-20 rounded-full`} />
                        
                        {/* Progress fill */}
                        <div
                          className={`progress-fill absolute inset-y-0 left-0 bg-gradient-to-r ${getCategoryColor(category)} rounded-full transition-all duration-300 shadow-lg`}
                          style={{ width: '0%' }}
                        />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className={`text-lg transition-colors duration-300 ${
            darkMode ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Continuously learning and exploring new technologies to stay current with industry trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;