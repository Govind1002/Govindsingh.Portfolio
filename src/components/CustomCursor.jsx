import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Detect mobile / touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 768) {
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    // GSAP quickTo for ultra-smooth buttery performance
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    // Center cursor offsets
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover interactions
    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
        borderColor: 'rgba(250, 204, 21, 0.8)',
        borderWidth: '1px',
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.2
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(250, 204, 21, 0.4)',
        borderWidth: '1.5px',
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.2
      });
    };

    // Add listeners to interactive nodes
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .interactive'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addListeners();

    // Create a MutationObserver to watch for dynamic DOM changes (e.g. modals opening)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .interactive'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-luxury-yellow/40 pointer-events-none z-[9999] mix-blend-screen transition-transform duration-75 ease-out"
      />
      {/* Inner Core Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-luxury-yellow pointer-events-none z-[9999] shadow-[0_0_12px_#facc15]"
      />
    </>
  );
}
