import React from 'react';
import { GoVerified } from 'react-icons/go';

export default function Welcome({ testimonials }) {
  // Divide testimonials into 2 rows for alternating marquees
  const halfLength = Math.ceil(testimonials.length / 2);
  const row1Testimonials = testimonials.slice(0, halfLength);
  const row2Testimonials = testimonials.slice(halfLength);

  return (
    <div className="relative w-full bg-zinc-950 text-white z-10">
      {/* Noise filter */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Welcome Typography */}
      <section className="w-full py-24 flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center text-center select-none">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-luxury-yellow/60 mb-6">
            Introduction
          </span>
          <h2 className="font-display font-black text-[18vw] sm:text-[20vw] md:text-[15vw] tracking-tighter text-white/10 uppercase leading-none select-none">
            WELCOME
          </h2>
          <p className="font-display text-lg md:text-xl tracking-widest text-zinc-400 mt-4 uppercase">
            To My Creative Space
          </p>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="w-full py-20 relative">
        <div className="max-w-7xl mx-auto px-6 w-full text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">
            Client Love
          </span>
          <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            What people are saying
          </h3>
        </div>

        <div className="flex flex-col gap-8 w-full overflow-hidden py-4 relative">
          {/* Top Row Marquee (Scrolls Left) */}
          <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] gap-6">
            {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
              <TestimonialCard key={`row1-${idx}`} item={item} />
            ))}
          </div>

          {/* Bottom Row Marquee (Scrolls Right) */}
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] gap-6">
            {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
              <TestimonialCard key={`row2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Minimal Review Card Helper
function TestimonialCard({ item }) {
  return (
    <div className="glassmorphism w-[380px] p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-luxury-yellow/30 hover:shadow-[0_15px_30px_rgba(250,204,21,0.05)] hover:-translate-y-1 transition-all duration-300">
      <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-medium italic">
        "{item.message}"
      </p>

      <div className="flex items-center gap-4">
        {/* Rounded Avatar */}
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-luxury-yellow uppercase overflow-hidden">
          {item.avatar && item.avatar !== '/assets/icon.jpeg' ? (
            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            item.name.charAt(0)
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
            {item.name}
            <GoVerified className="text-blue-500 text-xs" />
          </span>
          <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );
}