import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // 0 to 100 counting animation over 1.8 seconds
    const obj = { value: 0 };
    const counterTween = gsap.to(obj, {
      value: 100,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
      onComplete: () => {
        // Exit transitions
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        tl.to(logoRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in'
        })
        .to(counterRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in'
        }, '<')
        .to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.8,
          ease: 'power4.inOut'
        }, '-=0.2');
      }
    });

    // Logo pulsing
    gsap.fromTo(logoRef.current, 
      { scale: 0.9, opacity: 0.7 },
      { scale: 1.05, opacity: 1, repeat: -1, yoyo: true, duration: 0.8, ease: 'sine.inOut' }
    );

    return () => {
      counterTween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-luxury-yellow/5 blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center gap-8 z-10">
        {/* Luxury Logo Mark */}
        <div 
          ref={logoRef} 
          className="relative w-24 h-24 rounded-full flex items-center justify-center border border-white/10 bg-zinc-900/80 shadow-[0_0_30px_rgba(250,204,21,0.1)]"
        >
          <span className="font-display font-bold text-3xl tracking-wider text-luxury-yellow">GS</span>
          {/* Circular outline loader */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="46"
              className="stroke-zinc-800 fill-none"
              strokeWidth="2"
            />
            <circle
              cx="48"
              cy="48"
              r="46"
              className="stroke-luxury-yellow fill-none transition-all duration-75"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
            />
          </svg>
        </div>

        {/* Counter */}
        <div ref={counterRef} className="flex flex-col items-center gap-2">
          <span className="font-display font-bold text-6xl tracking-tight text-white/90">
            {progress}%
          </span>
          <span className="font-display text-xs tracking-[0.25em] text-zinc-500 uppercase">
            Govind GS
          </span>
        </div>
      </div>
    </div>
  );
}
