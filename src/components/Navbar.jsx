import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LuPlus, LuX, LuMenu, LuSun, LuMoon } from 'react-icons/lu';

export default function Navbar({ theme, setTheme, onAddTestimonial }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  
  // Testimonial Form State
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });

  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  // Scroll detection to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setShowNavbar(false); // scrolling down - hide
        } else {
          setShowNavbar(true); // scrolling up - show
        }
      } else {
        setShowNavbar(true); // near top - show
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Intro animation for navbar
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.2 }
    );
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Offset for sticky navbar
      const yOffset = -80; 
      const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    onAddTestimonial({
      name: formData.name,
      role: formData.role || 'Client',
      message: formData.message,
      avatar: '/assets/icon.jpeg' // default avatar placeholder
    });

    setFormData({ name: '', role: '', message: '' });
    setIsModalOpen(false);
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Service', id: 'service' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-[110%]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="glassmorphism rounded-full px-6 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-luxury-yellow to-yellow-600 shadow-[0_0_15px_rgba(250,204,21,0.2)] group-hover:scale-105 transition-transform duration-300">
               <span className="font-display font-bold text-lg text-zinc-950">GS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-tight text-white group-hover:text-luxury-yellow transition-colors duration-300">
                  GOVIND GS
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                  ENGINEER × DESIGNER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="font-display text-sm tracking-wide text-zinc-300 hover:text-luxury-yellow transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-luxury-yellow after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Premium CTA & Testimonial Trigger */}
            <div className="flex items-center gap-4">
              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-950/10 dark:border-white/10 bg-zinc-950/5 dark:bg-white/5 text-zinc-950 dark:text-white hover:text-luxury-yellow dark:hover:text-luxury-yellow transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <LuSun className="text-lg" /> : <LuMoon className="text-lg" />}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-luxury-yellow hover:bg-yellow-400 text-zinc-950 font-display font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <LuPlus className="text-sm" />
                Add Review
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-luxury-yellow/50 transition-colors"
                aria-label="Toggle Navigation"
              >
                {isMenuOpen ? <LuX className="text-xl" /> : <LuMenu className="text-xl" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl transition-all duration-500 md:hidden flex flex-col justify-center px-12 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`font-display text-4xl font-bold tracking-tight text-white hover:text-luxury-yellow transition-colors ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms`, transitionDuration: '400ms' }}
            >
              {link.label}
            </a>
          ))}
          
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsModalOpen(true);
            }}
            className="w-fit flex items-center gap-2 bg-luxury-yellow text-zinc-950 font-display font-semibold px-6 py-4 rounded-full mt-6"
          >
            <LuPlus className="text-lg" />
            Add Review
          </button>
        </div>
      </div>

      {/* Testimonial Form Modal (Apple inspired glassmorphism) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="glassmorphism w-full max-w-md p-8 rounded-3xl relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 hover:border-luxury-yellow/50 flex items-center justify-center transition-colors"
            >
              <LuX className="text-zinc-400 hover:text-white" />
            </button>

            <h3 className="font-display font-bold text-2xl mb-2 text-white">ADD TESTIMONIAL</h3>
            <p className="text-sm text-zinc-400 mb-6">leave your review to showcase on the live portfolio marquee.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name!!"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-yellow/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Role / Company</label>
                <input
                  type="text"
                  placeholder="ex - CEO , Tech Lead"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-yellow/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Review</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Leave your Feedback here!"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-yellow/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-luxury-yellow hover:bg-yellow-400 text-zinc-950 font-display font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
