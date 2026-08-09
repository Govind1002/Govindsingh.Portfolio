import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Portfolio() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const ringRef = useRef(null);
  const sharpImgRef = useRef(null);
  const [activeColor, setActiveColor] = useState('yellow');

  // Background glow colors
  const colorMap = {
    red: 'from-red-600/30 to-zinc-950',
    yellow: 'from-yellow-600/30 to-zinc-950',
    green: 'from-green-600/30 to-zinc-950',
    purple: 'from-purple-600/30 to-zinc-950',
    rose: 'from-rose-600/30 to-zinc-950',
    orange: 'from-orange-600/30 to-zinc-950'
  };

  const glowBorderMap = {
    red: 'shadow-[0_0_40px_rgba(239,68,68,0.5)] border-red-500',
    yellow: 'shadow-[0_0_40px_rgba(250,204,21,0.5)] border-yellow-500',
    green: 'shadow-[0_0_40px_rgba(34,197,94,0.5)] border-green-500',
    purple: 'shadow-[0_0_40px_rgba(168,85,247,0.5)] border-purple-500',
    rose: 'shadow-[0_0_40px_rgba(244,63,94,0.5)] border-rose-500',
    orange: 'shadow-[0_0_40px_rgba(249,115,22,0.5)] border-orange-500'
  };

  const bulletColors = [
    { name: 'red', hex: '#ef4444' },
    { name: 'yellow', hex: '#facc15' },
    { name: 'green', hex: '#22c55e' },
    { name: 'purple', hex: '#a855f7' },
    { name: 'rose', hex: '#f43f5e' },
    { name: 'orange', hex: '#f97316' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    const ring = ringRef.current;
    const sharp = sharpImgRef.current;
    if (!container || !frame || !ring || !sharp) return;

    // Parallax text quickTo handlers (keep smooth for immersive depth)
    const textXTo = gsap.quickTo('.scanner-parallax', 'x', { duration: 0.4, ease: 'power2.out' });
    const textYTo = gsap.quickTo('.scanner-parallax', 'y', { duration: 0.4, ease: 'power2.out' });

    // Set initial position to center of image frame
    const initPos = () => {
      const rect = frame.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      gsap.set(ring, { left: cx, top: cy, xPercent: -50, yPercent: -50 });
      container.style.setProperty('--scanner-x', `${cx}px`);
      container.style.setProperty('--scanner-y', `${cy}px`);
    };
    initPos();
    window.addEventListener('resize', initPos);

    const handleMouseMove = (e) => {
      const frameRect = frame.getBoundingClientRect();
      const relativeX = e.clientX - frameRect.left;
      const relativeY = e.clientY - frameRect.top;

      // Update positions instantly (no lag/damping) relative to the image frame bounds
      container.style.setProperty('--scanner-x', `${relativeX}px`);
      container.style.setProperty('--scanner-y', `${relativeY}px`);

      ring.style.left = `${relativeX}px`;
      ring.style.top = `${relativeY}px`;

      // Subtle parallax effect on the underlying text relative to parent container
      const parentRect = container.getBoundingClientRect();
      const px = ((e.clientX - parentRect.left) / parentRect.width - 0.5) * 20;
      const py = ((e.clientY - parentRect.top) / parentRect.height - 0.5) * 20;
      textXTo(-px);
      textYTo(-py);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initPos);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-gradient-to-b ${colorMap[activeColor]} transition-all duration-[1000ms] flex flex-col justify-center items-center cursor-crosshair z-10`}
      style={{
        '--scanner-x': '50%',
        '--scanner-y': '50%'
      }}
    >
      {/* Background outlined text PORTFOLIO */}
      {/* Stroke letters R and O explicitly outlined */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="font-display font-extrabold text-[15vw] leading-none tracking-tighter scanner-parallax">
          <span className="text-stroke">PORTFOLIO!</span>
        </h2>
      </div>

      {/* Label above the card */}
      <div className="relative z-20 mb-6 select-none pointer-events-none">
        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/60">
          Move the cursor to unlock
        </span>
      </div>

      {/* Primary Banner Image Frame (Centered 1:1 Square Redesign) */}
      <div
        ref={frameRef}
        className="relative w-[85vw] max-w-[400px] aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-zinc-900/50 select-none"
      >

        {/* Layer 1: Blurred Cover Layer (object-top to cover face) */}
        <div className="absolute inset-0 w-full h-full filter blur-[6px] brightness-[0.7]">
          <img
            src="/assets/projects/profile.jpeg"
            alt="Blurred Banner"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        </div>

        {/* Layer 2: Sharp Mask Reveal Box (circular clip-path) */}
        <div
          ref={sharpImgRef}
          className="absolute inset-0 w-full h-full transition-all pointer-events-none z-10"
          style={{
            clipPath: 'circle(85px at var(--scanner-x) var(--scanner-y))',
            WebkitClipPath: 'circle(85px at var(--scanner-x) var(--scanner-y))'
          }}
        >
          <img
            src="/assets/projects/profile.jpeg"
            alt="Sharp Reveal"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        </div>

        {/* Layer 3: Scanner Circle Follower (Floating border on top - resized to 170px) */}
        <div
          ref={ringRef}
          className={`absolute w-[170px] h-[170px] rounded-full border-2 ${glowBorderMap[activeColor]} pointer-events-none z-30`}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {/* Dashboard corner bracket accents */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-blue-500" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-blue-500" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-blue-500" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-blue-500" />
          
          {/* Marching ants dashed path circle border overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <circle cx="85" cy="85" r="82" fill="none" className="marching-ants-path" />
          </svg>
        </div>
      </div>

      {/* Color switcher dot selector */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/60 border border-white/10 px-6 py-3.5 rounded-full backdrop-blur-md z-30 shadow-2xl">
        <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Aura Glowing Effects ~</span>
        <div className="flex gap-2">
          {bulletColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setActiveColor(color.name)}
              className={`w-4 h-4 rounded-full transition-transform duration-300 hover:scale-125 ${activeColor === color.name
                  ? 'ring-2 ring-white scale-110 shadow-lg'
                  : 'opacity-70 hover:opacity-100'
                }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Switch overlay glow to ${color.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}