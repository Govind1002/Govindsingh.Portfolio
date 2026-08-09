import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Periodic-Table",
    tag: "Web App",
    color: "#648c11",
    description: "An interactive Periodic Table web application developed with HTML, CSS, and JavaScript, featuring a clean and responsive user interface.",
    image: "/assets/projects/PeriodicTable.png"
  },
  {
    title: "Mindcare-Psychologist",
    tag: "website",
    color: "#ff4500",
    description: "Advanced dashboards with analytics and data visualization.",
    image: "/assets/projects/MindCare.jpeg"
  },
  {
    title: "Dictionary-App",
    tag: "Retail",
    color: "#000080",
    description: "A simple dictionary application built with HTML, CSS, and JavaScript. with voice search and audio pronunciation features.",
    image: "/assets/projects/Dictionary.jpeg"
  },
  {
    title: "Weather-App",
    tag: "App",
    color: "#ff0000",
    description: "A simple weather application using HTML, CSS, JS & OpenWeatherMap API.",
    image: "/assets/projects/WeatherApp.png"
  },
  {
    title: "Portfolio Website",
    tag: "Creative",
    color: "#eab308", 
    description: "High-end portfolio experiences for creators and agencies.",
    image: "/assets/projects/Folio.jpeg"
  },
  {
    title: "Our-Love",
    tag: "Design",
    color: "#71717a", 
    description: "A simple love website using HTML, CSS, and JavaScript.",
    image: "/assets/projects/OurLove.png"
  }
];

export default function Service() {
  const pinSectionRef = useRef(null);
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);

  // Clear cards array ref on render
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    const pinSection = pinSectionRef.current;
    if (cards.length === 0 || !pinSection) return;

    // Card transform logic
    const updateTransforms = (progress) => {
      const activeOffsetIndex = progress * (servicesData.length - 1);
      
      // Interpolate background color directly
      const idx = Math.round(activeOffsetIndex);
      const currentColor = servicesData[idx]?.color || '#09090b';
      pinSection.style.background = `radial-gradient(circle at center, ${currentColor}22, #09090b 80%)`;

      // Apply circular math transforms directly to card DOM elements
      cards.forEach((card, index) => {
        if (!card) return;
        const offset = index - activeOffsetIndex;
        const angle = offset * (Math.PI / 8); // 22.5 degree spacing
        const radius = 600;
        
        const tx = Math.sin(angle) * radius;
        const ty = radius - Math.cos(angle) * radius + 100; // translate offset to curve under center
        const tz = -Math.abs(offset) * 150;
        
        const rz = angle * (180 / Math.PI); // rotate to face center
        const scale = 1 - Math.abs(offset) * 0.12;
        const opacity = 1 - Math.abs(offset) * 0.28;
        const zIndex = Math.round(100 - Math.abs(offset) * 10);

        card.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateZ(${rz}deg) scale(${scale})`;
        card.style.opacity = Math.max(0, opacity);
        card.style.zIndex = zIndex;
      });
    };

    // Initialize layout before scroll
    updateTransforms(0);

    // Desktop curve ScrollTrigger
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: '+=400%', // 500% scroll duration
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Run update directly on DOM nodes, bypassing React state change cycles
        updateTransforms(self.progress);
      }
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10">
      <section
        id="service"
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center transition-colors duration-1000 bg-zinc-950"
      >
        {/* Background Overlay Outlined Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="font-display font-extrabold text-[18vw] text-stroke opacity-10 leading-none tracking-tighter mix-blend-overlay">
            SERVICES
          </h2>
        </div>

        {/* Desktop Carousel (Curved Math using direct DOM handles) */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center perspective-2000">
          {servicesData.map((service) => (
            <div
              key={service.title}
              ref={addToRefs}
              className="absolute w-[420px] h-[520px] rounded-[30px] glassmorphism p-8 flex flex-col justify-between border border-white/10 hover:border-luxury-yellow/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-75 pointer-events-auto select-none overflow-hidden group"
              style={{
                transformOrigin: 'center center'
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Visual Image container with zoom hover */}
                <div className="w-full h-[180px] rounded-[20px] overflow-hidden border border-white/5 bg-zinc-950/40 relative">
                  {/* Glossy / Shade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent z-10 pointer-events-none" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full border"
                    style={{ borderColor: `${service.color}55`, color: service.color }}
                  >
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-white mt-1 leading-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner details */}
              <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Govind GS
                </span>
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: service.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel (Horizontal Snap Slider) */}
        <div className="md:hidden flex overflow-x-auto gap-6 px-6 py-20 snap-x snap-mandatory scrollbar-none w-full z-10">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className="min-w-[80vw] h-[450px] snap-center rounded-[30px] glassmorphism p-6 flex flex-col justify-between border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="w-full h-[150px] rounded-[20px] overflow-hidden border border-white/5 bg-zinc-950/40 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border border-white/10"
                    style={{ color: service.color, borderColor: `${service.color}55` }}
                  >
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl text-white mt-1">{service.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{service.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Creative Service</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: service.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
