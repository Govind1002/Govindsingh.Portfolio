import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuFolderOpen, LuArrowUpRight } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Memory-Game",
    image: "/assets/projects/MemoryGame.jpeg",
    description: "A simple memory card game built with HTML, CSS, and JavaScript. Flip cards to find matching pairs and test your memory skills.",
    github: "https://github.com/Govind1002/Memory-Game",
    demo: "https://memory-game-eight-woad.vercel.app/",
    tags: ["HTML", "CSS3", "JavaScript"]
  },
  {
    id: 2,
    title: "MindCare-Psychologist",
    image: "/assets/projects/MindCare.jpeg",
    description: "A web application for mental health support, providing resources and tools for users to manage their well-being.",
    github: "https://github.com/Govind1002/MindCare-Psychologist",
    demo: "https://mindcare-psychologist.vercel.app/",
    tags: ["HTML", "CSS3", "JavaScript"]
  },
  {
    id: 3,
    title: "Our-love",
    image: "/assets/projects/OurLove.png",
    description: "A simple love website using HTML, CSS, and JavaScript.",
    github: "https://github.com/Govind1002/My-love",
    demo: "https://govind1002.github.io/My-Love/",
    tags: ["HTML", "CSS3", "JavaScript"]
  },
  {
    id: 4,
    title: "Dictionary",
    image: "/assets/projects/Dictionary.jpeg",
    description: "A simple dictionary application built with HTML, CSS, and JavaScript.",
    github: "https://govind1002.github.io/Dictionary/",
    demo: "",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 5,
    title: "More on GitHub",
    image: "/assets/projects/others.jpeg",
    description: "Explore more repositories on my GitHub — covering web development projects, To-Do apps, and learning experiments in JavaScript, React, and the MERN stack.",
    github: "https://github.com/Govind1002",
    demo: "https://github.com/Govind1002",
    tags: ["JavaScript", "React", "Node.js", "Open Source"]
  }
];

function ProjectCard({ project, onSelect }) {
  return (
    <div
      className="project-card-3d opacity-0 scale-[0.85] bg-zinc-900/60 border border-white/5 rounded-3xl overflow-hidden hover:border-luxury-yellow/20 transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
      </div>
      <div className="p-6">
        <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-luxury-yellow transition-colors">{project.title}</h4>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full border border-white/5">{tag}</span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-luxury-yellow hover:text-white transition-colors font-display font-semibold uppercase tracking-wider"
        >
          View on GitHub <LuArrowUpRight />
        </a>
      </div>
    </div>
  );
}

export default function Projects({ onSelectProject }) {
  const sectionRef = useRef(null);
  const [folderOpen, setFolderOpen] = useState(false);

  useEffect(() => {
    const folderTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'bottom 20%',
      onToggle: (self) => setFolderOpen(self.isActive)
    });

    return () => { folderTrigger.kill(); };
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024; // matches lg: breakpoint

    if (folderOpen) {
      gsap.to('.project-card-3d', {
        y: 0,
        x: 0,
        rotationZ:0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    } else {
      gsap.to('.project-card-3d', {
        y: 0, x: 0, rotationZ: 0,
        opacity: isDesktop ? 0 : 1,
        scale: isDesktop ? 0.85 : 1,
        stagger: 0.05, duration: 0.6, ease: 'power3.in'
      });
    }
  }, [folderOpen]);
  return (
    <section ref={sectionRef} id="work" className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">My Work</span>
          <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            Featured Projects
          </h3>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            A selection of projects from my GitHub — explore more at{' '}
            <a href="https://github.com/Govind1002" target="_blank" rel="noreferrer" className="text-luxury-yellow hover:underline">
              github.com/Govind1002
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="https://github.com/Govind1002?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-luxury-yellow/40 text-white font-display font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            <LuFolderOpen className="text-luxury-yellow" />
            View All 12+ Repos on GitHub
            <LuArrowUpRight className="text-luxury-yellow" />
          </a>
        </div>
      </div>
    </section>
  );
}
