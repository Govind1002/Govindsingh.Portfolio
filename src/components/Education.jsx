import React, { useEffect } from 'react';
import AOS from 'aos';
import { LuSchool, LuGraduationCap, LuBrainCircuit } from 'react-icons/lu';

export default function Education() {
  useEffect(() => { AOS.init(); }, []);

  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80" data-aos="fade-up">Academic Path</span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2" data-aos="fade-up" data-aos-delay="100">
          Education Timeline
        </h3>
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-800" />

        <div className="space-y-12 md:space-y-16 relative">

          {/* School — HSC & SSLC */}
          <div className="flex flex-row md:flex-row items-start md:items-center md:justify-between w-full">
            <div className="hidden md:block md:w-[45%] order-3" />
            <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-luxury-yellow/40 flex items-center justify-center text-luxury-yellow relative z-20 order-1 md:order-2 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <LuSchool className="text-lg" />
            </div>
            <div className="flex-1 md:flex-none md:w-[45%] text-left md:text-right order-2 md:order-1 ml-4 md:ml-0" data-aos="fade-right">
              <span className="text-xs font-mono text-luxury-yellow tracking-wider font-semibold">HSC / SSLC</span>
              <h4 className="font-display font-bold text-xl text-white mt-1">Kendriya Vidyalaya Cantt Kanpur</h4>
              <p className="text-sm text-zinc-400 mt-2">Completed HSC with 70% and SSLC with 74%, building a strong foundation in science and mathematics.</p>
            </div>
          </div>

          {/* College — B.E. CSE with CGPA */}
          <div className="flex flex-row md:flex-row items-start md:items-center md:justify-between w-full">
            <div className="hidden md:block md:w-[45%] order-1" />
            <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-luxury-yellow/40 flex items-center justify-center text-luxury-yellow relative z-20 order-1 md:order-2 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <LuGraduationCap className="text-lg" />
            </div>
            <div className="flex-1 md:flex-none md:w-[45%] text-left order-2 md:order-3 ml-4 md:ml-0" data-aos="fade-left">
              <span className="text-xs font-mono text-luxury-yellow tracking-wider font-semibold">Maharana Pratap Engineering College, Kanpur</span>
              <h4 className="font-display font-bold text-xl text-white mt-1">Bachelor of Technologyz — Computer Science &amp; Engineering</h4>
              <p className="text-sm text-zinc-400 mt-2">Completed B.Tech. in Computer Science and Engineering with a CGPA of 7.8, combining academic theory with hands-on full-stack project experience.</p>
            </div>
          </div>

          {/* Ongoing Full Stack MERN Development */}
          <div className="flex flex-row md:flex-row items-start md:items-center md:justify-between w-full">
            <div className="hidden md:block md:w-[45%] order-3" />
            <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-luxury-yellow/40 flex items-center justify-center text-luxury-yellow relative z-20 order-1 md:order-2 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <LuBrainCircuit className="text-lg" />
            </div>
            <div className="flex-1 md:flex-none md:w-[45%] text-left md:text-right order-2 md:order-1 ml-4 md:ml-0" data-aos="fade-right">
              <span className="text-xs font-mono text-luxury-yellow tracking-wider font-semibold">Ongoing Development</span>
              <h4 className="font-display font-bold text-xl text-white mt-1">Full Stack MERN Development</h4>
              <p className="text-sm text-zinc-400 mt-2">Actively building projects and sharpening skills across MongoDB, Express.js, React.js, and Node.js — focusing on real-world apps, REST APIs, and clean, scalable code.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}