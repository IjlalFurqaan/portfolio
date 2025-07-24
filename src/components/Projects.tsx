import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Blood Bank Management System",
    description: "Built an end-to-end platform to manage donor data, blood inventory, and donation records in real time. Features include donor registration, blood type matching, inventory tracking, and automated notifications.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Node.js", "Express", "MongoDB", "React"]
  },
  {
    id: 2,
    title: "Bat Tracking System",
    description: "Developed a real-time detection and tracking system to monitor bat flight patterns using the YOLO algorithm. Implemented computer vision techniques for accurate detection and tracking in various lighting conditions.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Python", "YOLO", "OpenCV", "Flask"]
  },
  {
    id: 3,
    title: "Course Enrollment System",
    description: "Designed and implemented a comprehensive course enrollment system using Node.js, React, and RESTful APIs. Utilized React.memo and lazy loading to boost user engagement by 30% and improve performance.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Node.js", "React", "RESTful APIs", "JavaScript"]
  },
  {
    id: 4,
    title: "JPMC Next-Gen Portal",
    description: "Built secure modules for portfolio summaries, capital transfers, and user management using advanced React state management and custom contexts. Developed feature-rich dashboard with React functional components.",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "JavaScript", "State Management", "RESTful APIs"]
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Animate cards on scroll
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotationX: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Section title animation
    gsap.fromTo('.projects-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.projects-title',
          start: "top 80%"
        }
      }
    );

  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-5 dark:opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
            My Projects
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-blue-600 dark:text-blue-200 transition-colors duration-300">
            A showcase of full-stack development projects featuring real-time systems, web applications, 
            and innovative solutions using modern technologies like React, Node.js, Python, and machine learning.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => addToRefs(el, index)}
              className="group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-amber-400/50 dark:hover:border-amber-400/30 hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10"
              style={{
                transform: 'perspective(1000px) rotateX(0deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Frost Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-slate-900/80 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed transition-colors duration-300 text-gray-600 dark:text-blue-200">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs rounded-full border transition-colors duration-300 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
