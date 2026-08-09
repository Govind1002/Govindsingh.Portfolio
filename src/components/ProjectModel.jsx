import React from 'react';
import { LuX, LuGithub, LuGlobe } from 'react-icons/lu';

function ActionLink({ href, icon, label, variant }) {
  const base =
    'flex-1 flex items-center justify-center gap-2 font-display font-semibold py-3 rounded-xl transition-all shadow-md text-sm';
  const styles =
    variant === 'primary'
      ? 'bg-white hover:bg-zinc-200 text-zinc-950'
      : 'bg-luxury-yellow hover:bg-yellow-400 text-zinc-950';

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
      {icon}
      {label}
    </a>
  );
}

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glassmorphism w-full max-w-2xl max-h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-white/20 hover:border-luxury-yellow/50 flex items-center justify-center transition-colors bg-zinc-950/90 backdrop-blur-sm z-50 shadow-lg active:scale-95"
          aria-label="Close project details"
        >
          <LuX className="text-white text-lg sm:text-base hover:text-luxury-yellow" />
        </button>

        {/* Left Side (Image) */}
        <div className="w-full md:w-1/2 h-[200px] md:h-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-white/5 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Details) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between min-h-[300px]">
          <div>
           <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-tight pr-10">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags/Tech Stack list */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full border border-white/5 bg-white/5 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 border-t border-white/5 pt-6 mt-auto">
            <ActionLink
              href={project.github}
              icon={<LuGithub />}
              label="GitHub"
              variant="primary"
            />
            {project.demo && (
              <ActionLink
                href={project.demo}
                icon={<LuGlobe />}
                label="Live Demo"
                variant="accent"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}