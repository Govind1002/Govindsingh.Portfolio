import React, { useEffect } from 'react';
import AOS from 'aos';
function TechCard({ tech }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 transition-all duration-300 ${tech.color}`}>
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0">
        {tech.icons ? (
          <div className="flex items-center justify-center gap-0.5">
            {tech.icons.map((src, i) => (
              <img key={i} src={src} alt={tech.name} className="w-5 h-5 object-contain" />
            ))}
          </div>
        ) : tech.icon ? (
          <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
        ) : (
          <span className="text-xl">{tech.emoji}</span>
        )}
      </div>
      <div>
        <span className="font-display font-bold text-white text-sm">{tech.name}</span>
        {tech.note && <p className="text-xs text-zinc-500 mt-0.5">{tech.note}</p>}
      </div>
    </div>
  );
}

export default function TechStack() {
  useEffect(() => { AOS.init(); }, []);

  const stackData = {
    backend: [
      { name: 'Node.js', icon: '/assets/nodejs.png', note: 'Runtime Environment', color: 'hover:shadow-[0_0_30px_rgba(104,160,99,0.3)] hover:border-[#68a063]/50' },
      { name: 'Express.js', icon: '/assets/expressjs.png', note: 'Web Framework', color: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30' },
      { name: 'MongoDB', icon: '/assets/mongodb.png', note: 'NoSQL Database', color: 'hover:shadow-[0_0_30px_rgba(71,162,72,0.3)] hover:border-[#47a248]/50' },
    ],
    frontend: [
      { name: 'React.js', icon: '/assets/React.png', note: 'UI Library', color: 'hover:shadow-[0_0_30px_rgba(97,218,251,0.3)] hover:border-[#61dafb]/50' },
      { name: 'JavaScript', icon: '/assets/jslogo.png', note: 'Core Language', color: 'hover:shadow-[0_0_30px_rgba(247,223,30,0.3)] hover:border-[#f7df1e]/50' },
    { name: 'HTML5 + CSS3', icons: ['/assets/HTML5.png', '/assets/CSS3.png'], note: 'Structure & Style', color: 'hover:shadow-[0_0_30px_rgba(227,76,38,0.3)] hover:border-[#e34c26]/50' },
    ],
    tools: [
      { name: 'Git & GitHub', icons: ['/assets/git.png', '/assets/github.png'], note: 'Version Control', color: 'hover:shadow-[0_0_30px_rgba(227,76,38,0.3)] hover:border-[#e34c26]/50' },
      { name: 'REST APIs', icon: '/assets/restapi.png', note: 'API Design', color: 'hover:shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:border-luxury-yellow/30' },
      { name: 'Vercel', icon: '/assets/vercel.svg', note: 'Deployment', color: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30' },
    ] 
  };

  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80" data-aos="fade-up">Capabilities</span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2" data-aos="fade-up" data-aos-delay="100">
          Tech Stack Ecosystem
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">Backend</h4>
            <div className="space-y-4">
              {stackData.backend.map((tech) => <TechCard key={tech.name} tech={tech} />)}
            </div>
          </div>
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">Frontend</h4>
            <div className="space-y-4">
              {stackData.frontend.map((tech) => <TechCard key={tech.name} tech={tech} />)}
            </div>
          </div>
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">Tools</h4>
            <div className="space-y-4">
              {stackData.tools.map((tech) => <TechCard key={tech.name} tech={tech} />)}
            </div>
          </div>
        </div>

        {/* MERN Badge */}
        <div className="mt-12 text-center" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-zinc-900/60 border border-luxury-yellow/20 px-8 py-4 rounded-2xl">
            <span className="text-luxury-yellow font-display font-black text-2xl tracking-tight">MERN</span>
            <span className="text-zinc-400 text-sm font-mono">MongoDB · Express · React · Node</span>
          </div>
        </div>
      </div>
    </section>
  );
}