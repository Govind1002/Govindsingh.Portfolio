import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Service from './components/Service';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModel';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { FaWhatsapp } from 'react-icons/fa';
import { LuArrowUp } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [toasts, setToasts] = useState([]);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferredDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('utm_source');
    url.searchParams.delete('utm_medium');
    url.searchParams.delete('utm_content');
    url.searchParams.delete('utm_campaign');
    url.searchParams.delete('fbclid');
    window.history.replaceState({}, '', url.pathname);
  }, []);

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('portfolio-testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing testimonials from localStorage:", e);
      }
    }
    return [
      {
        name: "Tech Startup Client",
        role: "Founder",
        message: "Govind built our entire web platform from scratch using the MERN stack. Fast, clean, and exactly what we needed!",
        avatar: "/assets/icon.jpeg"
      },
      {
        name: "Open Source Community",
        role: "Contributor",
        message: "Great code quality and attention to detail. Her projects on GitHub are well-structured and easy to understand.",
        avatar: "/assets/icon.jpeg"
      },
      {
        name: "Classmate & Collaborator",
        role: "Developer",
        message: "Working with Govind is a pleasure — he learns fast, codes clean, and always pushes for progress over perfection.",
        avatar: "/assets/icon.jpeg"
      },
      {
        name: "Project Manager",
        role: "Team Lead",
        message: "Govind delivered a full-stack solution on time with excellent documentation. Highly recommend his work!",
        avatar: "/assets/icon.jpeg"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('portfolio-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    if (loading) return;

    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  const handleShowToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 220);
    }, 3200);
  };

  const handleAddTestimonial = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
    handleShowToast('success', 'Review Added', 'Your review was submitted and added to the marquee!');
  };

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen text-zinc-950 dark:text-white select-none selection:bg-luxury-yellow selection:text-zinc-950">

          <CustomCursor />
          <BackgroundEffects />
          <Navbar theme={theme} setTheme={setTheme} onAddTestimonial={handleAddTestimonial} />

          <main className="relative w-full overflow-hidden">
            <Hero />
            <Welcome testimonials={testimonials} />
            <Portfolio />
            <About />
            <Education />
            <TechStack />
            <Service />
            <Projects onSelectProject={setActiveProject} />
            <Achievements />
            <Contact onShowToast={handleShowToast} />
          </main>

          <Footer />

          {activeProject && (
            <ProjectModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          <div className="fixed bottom-6 left-6 z-[110] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex gap-3 bg-zinc-900/90 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-300 max-w-sm ${toast.leaving ? 'opacity-0 -translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                  <span className="font-bold">{toast.type === 'success' ? '\u2713' : '!'}</span>
                </div>
                <div>
                  <strong className="block text-sm text-white">{toast.title}</strong>
                  <p className="text-xs text-zinc-400 mt-1">{toast.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
            <a
              href="https://wa.me/918299068146?text=HI%20GAURAV%2C%20I%20REVIEWED%20YOUR%20PROFILE%20AND%20WAS%20IMPRESSED%20BY%20YOUR%20SKILLS%20AND%20PROJECTS.%20WE%20HAVE%20AN%20EXCITING%20OPPORTUNITY%20THAT%20MATCHES%20YOUR%20BACKGROUND.%20I%E2%80%99D%20LOVE%20TO%20CONNECT%20AND%20DISCUSS%20  FURTHER.%20LOOKING%20FORWARD%20TO%20HEARING%20  FROM%20  YOU."
              target="_blank"
              rel="noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white border border-white/10 hover:border-transparent flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <FaWhatsapp className="text-xl" />
            </a>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-luxury-yellow text-zinc-400 hover:text-zinc-950 border border-white/10 hover:border-transparent flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <LuArrowUp className="text-xl" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
