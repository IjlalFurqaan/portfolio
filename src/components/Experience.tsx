import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Building, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const workExperiences: ExperienceItem[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Mphasis',
    location: 'Pune, India',
    duration: '2021/09 – 2024/01',
    description: [
      'Designed and implemented a course enrollment system using Node.js, React, and RESTful APIs, with React.memo and lazy loading boosting engagement by 30%.',
      'Developed a feature-rich dashboard with React functional components for efficient fresher profile tracking and performance evaluation.',
      'Built secure modules for portfolio summaries, capital transfers, and user management on the JPMC Next-Gen Portal using advanced React state management and custom contexts.',
      'Automated routine tasks via Python and shell scripting in a Linux environment, integrating pytest-based unit tests to ensure robust code quality.'
    ],
    technologies: ['Node.js', 'React', 'RESTful APIs', 'Python', 'JavaScript', 'Linux']
  }
];

interface ExperienceProps {
  darkMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ darkMode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate timeline items
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Section title animation
    gsap.fromTo('.experience-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.experience-title',
          start: "top 80%"
        }
      }
    );

    // Timeline line animation
    gsap.fromTo('.timeline-line',
      { height: '0%' },
      {
        height: '100%',
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.timeline-container',
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1
        }
      }
    );

  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) itemsRef.current[index] = el;
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`relative py-20 px-6 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-800 to-slate-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-amber-500/5' : 'bg-amber-500/10'
        }`} />
        <div className={`absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`experience-title text-4xl md:text-6xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Work Experience
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-blue-200' : 'text-blue-600'
          }`}>
            My professional journey in software engineering and full-stack development.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 to-blue-400 timeline-line" style={{ height: '0%' }} />

          {/* Timeline Items */}
          <div className="space-y-12">
            {workExperiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => addToRefs(el, index)}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-amber-400/30" />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 group ${
                    darkMode 
                      ? 'bg-white/5 border-white/10 hover:border-amber-400/30' 
                      : 'bg-white/80 border-gray-200 hover:border-amber-400/50'
                  }`}>
                    {/* Frost Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Header */}
                    <div className="relative z-10 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="text-amber-400" size={20} />
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Work Experience
                        </span>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-1 group-hover:text-amber-400 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {exp.title}
                      </h3>
                      
                      <div className={`flex items-center space-x-4 text-sm mb-2 ${
                        darkMode ? 'text-blue-200' : 'text-blue-600'
                      }`}>
                        <div className="flex items-center space-x-1">
                          <Building size={14} />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-amber-300 text-sm">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative z-10 space-y-2 mb-4">
                      {exp.description.map((desc, descIndex) => (
                        <p key={descIndex} className={`text-sm leading-relaxed ${
                          darkMode ? 'text-blue-200' : 'text-gray-600'
                        }`}>
                          • {desc}
                        </p>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 text-xs rounded border ${
                            darkMode 
                              ? 'bg-slate-700/50 text-slate-300 border-slate-600/50' 
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.3)]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;