import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Building, GraduationCap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  location: string;
  duration: string;
  description: string[];
  achievements?: string[];
}

const educationData: EducationItem[] = [
  {
    id: 1,
    title: 'Masters in Computer Science',
    institution: 'The Philipp Universität Marburg',
    location: 'Hesse, Germany',
    duration: '2024/04 – 2026/04',
    description: [
      'Currently pursuing Master\'s degree in Computer Science with focus on advanced software engineering and system optimization.',
      'Specializing in full-stack development, algorithms, and modern web technologies.',
      'Engaging in research projects involving machine learning and distributed systems.'
    ],
    achievements: [
      'Advanced Software Engineering',
      'Machine Learning & AI',
      'Distributed Systems',
      'Web Technologies'
    ]
  },
  {
    id: 2,
    title: 'Bachelor of Engineering - CSE',
    institution: 'University college of engineering, Osmania University',
    location: 'Hyderabad, India',
    duration: '2017/07 – 2021/08',
    description: [
      'Completed Bachelor of Engineering in Computer Science and Engineering.',
      'Built strong foundation in programming, data structures, algorithms, and software development principles.',
      'Participated in various coding competitions and technical workshops.'
    ],
    achievements: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Management',
      'Computer Networks'
    ]
  }
];

interface EducationProps {
  darkMode: boolean;
}

const Education: React.FC<EducationProps> = ({ darkMode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate education items
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
    gsap.fromTo('.education-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.education-title',
          start: "top 80%"
        }
      }
    );

    // Timeline line animation
    gsap.fromTo('.education-timeline-line',
      { height: '0%' },
      {
        height: '100%',
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.education-timeline-container',
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
      id="education"
      ref={sectionRef}
      className={`relative py-20 px-6 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/5' : 'bg-purple-500/10'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`education-title text-4xl md:text-6xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Education
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-blue-200' : 'text-blue-600'
          }`}>
            My academic journey in computer science and continuous learning path.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="education-timeline-container relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 education-timeline-line" style={{ height: '0%' }} />

          {/* Timeline Items */}
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                ref={(el) => addToRefs(el, index)}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-4 z-10 shadow-lg shadow-blue-400/30 ${
                  darkMode ? 'border-slate-900' : 'border-white'
                }`} />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 group ${
                    darkMode 
                      ? 'bg-white/5 border-white/10 hover:border-blue-400/30' 
                      : 'bg-white/80 border-gray-200 hover:border-blue-400/50'
                  }`}>
                    {/* Frost Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Header */}
                    <div className="relative z-10 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="text-blue-400" size={20} />
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-400/20 text-blue-300 border border-blue-400/30">
                          Education
                        </span>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {edu.title}
                      </h3>
                      
                      <div className={`flex items-center space-x-4 text-sm mb-2 ${
                        darkMode ? 'text-blue-200' : 'text-blue-600'
                      }`}>
                        <div className="flex items-center space-x-1">
                          <Building size={14} />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-blue-300 text-sm">
                        <Calendar size={14} />
                        <span>{edu.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative z-10 space-y-2 mb-4">
                      {edu.description.map((desc, descIndex) => (
                        <p key={descIndex} className={`text-sm leading-relaxed ${
                          darkMode ? 'text-blue-200' : 'text-gray-600'
                        }`}>
                          • {desc}
                        </p>
                      ))}
                    </div>

                    {/* Achievements/Subjects */}
                    {edu.achievements && (
                      <div className="relative z-10">
                        <h4 className={`text-sm font-semibold mb-2 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Key Subjects:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((achievement, achievementIndex) => (
                            <span
                              key={achievementIndex}
                              className={`px-2 py-1 text-xs rounded border ${
                                darkMode 
                                  ? 'bg-blue-700/30 text-blue-300 border-blue-600/50' 
                                  : 'bg-blue-100 text-blue-700 border-blue-300'
                              }`}
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
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

export default Education;