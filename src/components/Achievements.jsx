import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const containerRef = useRef(null);

  const stats = [
    { target: 12, suffix: '+', label: 'GitHub Repositories' },
    { target: 5, suffix: '+', label: 'Projects Built' },
    { target: 4, suffix: '', label: 'MERN Stack Skills' },
    { target: 100, suffix: '%', label: 'Progress Over Perfection' }
  ];

  useEffect(() => {
    // GSAP scroll trigger for counting
    const ctx = gsap.context(() => {
      gsap.from('.stat-count', {
        innerText: 0,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">
          Statistics Dashboard
        </span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2">
          Milestones & Achievements
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 flex flex-col justify-center items-center text-center shadow-lg transition-colors group"
          >
            {/* Counter display */}
            <div className="font-display font-black text-6xl text-luxury-yellow tracking-tighter mb-4 flex items-baseline">
              <span className="stat-count">{stat.target}</span>
              <span>{stat.suffix}</span>
            </div>
            
            <p className="text-sm font-display font-bold tracking-wider text-white/80 uppercase group-hover:text-white transition-colors">
              {stat.label}
            </p>
            <span className="text-[10px] font-mono text-zinc-500 mt-2 uppercase">
              Verified Metric
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
