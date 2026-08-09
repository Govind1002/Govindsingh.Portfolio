import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.35 + 0.05;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(250, 204, 21, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles (low density for high performance)
    const count = Math.min(40, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
      // Disperse initial Y positions
      particles[i].y = Math.random() * canvas.height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
      {/* Noise Overlay Filter */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-10 opacity-[0.85]" />

      {/* Ambient Moving Mesh Lights (CSS Blur Spheres) */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-luxury-yellow/10 blur-[130px] animate-pulse duration-[8000ms] ease-in-out" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-blue-500/5 blur-[120px] animate-pulse duration-[12000ms] ease-in-out" />
      <div className="absolute top-[50%] left-[40%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-purple-500/5 blur-[140px]" />

      {/* Interactive Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-5" />
    </div>
  );
}
