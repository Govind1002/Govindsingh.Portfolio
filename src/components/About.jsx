import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex items-center justify-center"
    >
      <div className="absolute right-[-5%] top-[10%] pointer-events-none select-none opacity-[0.01] z-0 font-display font-extrabold text-[28vw] tracking-tighter text-white uppercase leading-none">
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">

        {/* Left Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80" data-aos="fade-up">
              About Me
            </span>
            <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-tight" data-aos="fade-up" data-aos-delay="100">
              Building the web <br />
              one <span className="text-gradient-yellow">stack at a time</span>.
            </h3>
          </div>

          <div className="space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            <p>
              I'm Govind GS — a passionate Full Stack Web Developer from Kanpur, Uttar Pradesh. I love bringing ideas to life through clean, performant and beautifully designed web applications.
            </p>
            <p>
              With expertise across the MERN stack (MongoDB, Express.js, React.js, Node.js) and JavaScript, I build everything from intuitive frontends to robust backends — always with a focus on user experience and code quality.
            </p>
            <p>
              My motto : <span className="text-luxury-yellow font-semibold">Progress Over Perfection.</span> I believe in shipping, learning and growing every single day.
            </p>
          </div>

          <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="300">
            <a
              href="mailto:gauravzsingh25864@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/40 border border-white/5 px-5 py-2.5 rounded-full font-display font-medium hover:border-luxury-yellow/40 transition-colors"
            >
              📧 gauravsingh25864@gmail.com
            </a>
            <a
              href="tel:+918299068146"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/40 border border-white/5 px-5 py-2.5 rounded-full font-display font-medium hover:border-luxury-yellow/40 transition-colors"
            >
              📞 +91 82990 68146
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/40 border border-white/5 px-5 py-2.5 rounded-full font-display font-medium">
              📍 Kanpur, Uttar Pradesh
            </span>
          </div>
        </div>

        {/* Right Side: Metrics Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Specialization</span>
            <span className="font-display font-bold text-lg text-white">Full Stack Web Development</span>
          </div>
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Core Stack</span>
            <span className="font-display font-bold text-lg text-white">MongoDB · Express · React · Node</span>
          </div>
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Other Skills</span>
            <span className="font-display font-bold text-lg text-white">JavaScript · HTML · CSS · Git</span>
          </div>
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 transition-all duration-300" data-aos="fade-up" data-aos-delay="500">
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Location</span>
            <span className="font-display font-bold text-lg text-white">Kanpur, Uttar Pradesh, India</span>
          </div>
        </div>

      </div>
    </section>
  );
}
