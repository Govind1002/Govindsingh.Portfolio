import React from 'react';
import { LuArrowUpRight, LuMessageSquare } from 'react-icons/lu';

export default function Footer() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -80;
      const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-luxury-yellow text-zinc-950 overflow-hidden pt-24 pb-12 z-20 flex flex-col items-center">

      {/* Infinite Alternating Marquees */}
      <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-5 pointer-events-none select-none z-0">
        <div className="flex w-max animate-marquee-slow gap-8 font-display font-black text-[12vw] uppercase leading-none tracking-tighter">
          <span>Govind GS</span>
          <span>Full Stack Dev</span>
          <span>Govind GS</span>
          <span>Full Stack Dev</span>
        </div>
        <div className="flex w-max animate-marquee-reverse gap-8 font-display font-black text-[12vw] uppercase leading-none tracking-tighter">
          <span>MERN Stack</span>
          <span>Progress Over Perfection</span>
          <span>MERN Stack</span>
          <span>Progress Over Perfection</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center z-10 relative">

        {/* Profile Showcase Block */}
        <div className="relative mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-zinc-950 shadow-2xl scale-100 hover:scale-105 transition-transform duration-500">
            <img src="/assets/icon.jpeg" alt="Govind GS" className="w-full h-full object-cover object-top" />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/govind-singh-5b6473296/"

              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
            >
              Follow
              <LuArrowUpRight />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
            >
              Message
              <LuMessageSquare />
            </a>
          </div>
        </div>

        {/* Luxury Branding */}
        <div className="text-center mb-12">
          <h4 className="font-display font-black text-4xl tracking-tighter uppercase mb-2">
            GOVIND'S <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Portfolio</span>
          </h4>
          <p className="text-zinc-800 text-sm font-medium font-mono uppercase tracking-widest">
            Full Stack Developer · MERN Stack
          </p>
        </div>

        <div className="w-full h-[1px] bg-zinc-950/10 mb-8 rounded-full" />

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8">
          {[
            { label: 'About', id: 'about' },
            { label: 'Work', id: 'work' },
            { label: 'Service', id: 'service' },
            { label: 'Contact', id: 'contact' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="font-display text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-center w-full border-t border-zinc-950/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-700 font-mono gap-4">
          <span>© 2026 All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-zinc-950 transition-colors">
              Back to top 
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
