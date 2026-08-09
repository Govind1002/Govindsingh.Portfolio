import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { LuArrowDownRight, LuArrowUpRight } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to(textRef.current, {
      opacity: 0.1,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    const tl = gsap.timeline({ delay: 2.2 });
    tl.fromTo('.hero-fade-in',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    const words = wordsRef.current.children;
    const totalWords = words.length;
    let currentIndex = 0;

    const rollWords = () => {
      const currentWord = words[currentIndex];
      const nextIndex = (currentIndex + 1) % totalWords;
      const nextWord = words[nextIndex];

      gsap.timeline()
        .to(currentWord, { y: '-100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' })
        .fromTo(nextWord,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
        );

      currentIndex = nextIndex;
    };

    const interval = setInterval(rollWords, 2500);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/govind-singh-5b6473296/', color: 'hover:bg-[#0077B5] hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] hover:text-white', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/Govind1002', color: 'hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:text-zinc-950', label: 'GitHub' },
    { icon: <FaEnvelope />, url: 'mailto:gauravsingh25864@gmail.com', color: 'hover:bg-luxury-yellow hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:text-zinc-950', label: 'Email' },
    { icon: <FaPhone />, url: 'tel:+918299068146', color: 'hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:text-white', label: 'Phone' }
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-zinc-950 z-10"
    >
      {/* Absolute Background Typography Marquee */}
      <div className="absolute top-[35%] left-0 w-full whitespace-nowrap pointer-events-none select-none opacity-[0.02] z-0 font-display font-extrabold text-[22vw] tracking-tighter text-white uppercase leading-none">
        GOVIND GS
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">

        {/* Left Side Content */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="hero-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-luxury-yellow/20 bg-luxury-yellow/5 text-xs font-mono font-medium tracking-[0.2em] text-luxury-yellow uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-yellow animate-ping" />
            Full Stack Developer
          </span>

          <h1 className="hero-fade-in font-display font-bold tracking-tight text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl xl:text-8xl mb-6 uppercase">
            Hello, I'm <br />
            <span className="text-gradient-yellow">Govind GS</span> <br />
            <span className="inline-flex h-[1.1em] relative overflow-hidden align-bottom text-luxury-yellow">
              <span className="invisible select-none">Developer</span>
              <span ref={wordsRef} className="absolute inset-0 w-full h-full">
                <span className="absolute left-0 top-0 opacity-100">Developer</span>
                <span className="absolute left-0 top-0 opacity-0">Builder</span>
                <span className="absolute left-0 top-0 opacity-0">Engineer</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade-in max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
            Full Stack Web Developer crafting modern, scalable web experiences with the MERN stack. Passionate about clean code, intuitive UI and turning ideas into reality.
          </p>

          {/* Action buttons */}
          <div className="hero-fade-in flex flex-wrap gap-4 mb-10">
            <a
              href="/Govind_Singh_TECH (1).pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-luxury-yellow to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-display font-semibold px-8 py-4 rounded-full shadow-[0_15px_30px_rgba(250,204,21,0.2)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              View Resume
              <LuArrowUpRight className="text-lg" />
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('work');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-luxury-yellow/40 text-white font-display font-semibold px-8 py-4 rounded-full hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              Explore Projects
              <LuArrowDownRight className="text-lg text-luxury-yellow" />
            </a>
          </div>

          {/* Highlights & Tags */}
          <div className="hero-fade-in flex flex-wrap gap-3 items-center">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-2">Stack :</span>
            {['MongoDB', 'Express.js', 'React.js', 'Node.js'].map((hl) => (
              <span
                key={hl}
                className="text-xs text-zinc-300 bg-zinc-900/40 border border-white/5 px-4 py-2 rounded-full font-display font-medium tracking-wide"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side Parallax Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={imageRef}
            className="hero-fade-in relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-zinc-900/40 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group hover:border-luxury-yellow/20 transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-luxury-yellow/20 to-blue-500/10 opacity-30 group-hover:opacity-50 blur-xl -z-10 transition-opacity duration-500" />

            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-zinc-950 border border-white/5 relative">
              <img
                src="/assets/Gaurav.jpeg"
                alt="Govind GS"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 left-6 right-6 glassmorphism p-4 rounded-2xl flex items-center justify-between border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                <div>
                  <span className="block text-[10px] tracking-widest text-zinc-400 uppercase">Full Stack</span>
                  <span className="font-display font-bold text-sm text-white">MERN Developer</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-luxury-yellow/20 text-luxury-yellow font-display text-xs font-bold">
                  GS
                </div>
              </div>
            </div>

           {/* Social icons toolbar floating on side */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-20 sm:left-auto sm:translate-x-0 sm:-left-8 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:flex-col">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-400 ${social.color} transition-all duration-300 hover:scale-115`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
