import React, { useEffect, useState, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

const ScrollProgress = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const totalHeight = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;
      setProgress((currentScroll / totalHeight) * 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[200]">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const DotNavigation = ({ activeSection }: { activeSection: string }) => {
  const sections = [
    { id: 'about', label: 'Intro' },
    { id: 'services', label: 'Skills' },
    { id: 'portfolio', label: 'Work' },
    { id: 'contact', label: 'Hire' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-5">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-end"
        >
          <span className={`absolute right-8 text-[10px] font-bold uppercase tracking-widest text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`}>
            {section.label}
          </span>
          <div 
            className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/20 ${
              activeSection === section.id 
                ? 'h-8 bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
                : 'bg-white/10 hover:bg-white/40'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Add visible class to children with 'reveal' class
          const reveals = entry.target.querySelectorAll('.reveal');
          reveals.forEach(el => el.classList.add('active'));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = document.querySelectorAll('.snap-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-900 selection:bg-cyan-500/30 selection:text-cyan-200 h-screen overflow-hidden">
      <ScrollProgress scrollContainerRef={containerRef} />
      <Navigation />
      <DotNavigation activeSection={activeSection} />
      
      <div ref={containerRef} className="snap-container no-scrollbar md:block">
        <section id="about" className="snap-section">
          <Hero />
        </section>

        <section id="services" className="snap-section bg-slate-900">
          <div className="reveal">
            <Services />
          </div>
        </section>

        <section id="portfolio" className="snap-section bg-slate-950">
          <div className="reveal">
            <Portfolio />
          </div>
        </section>

        <section id="contact" className="snap-section bg-[#0f172a] relative">
          <div className="reveal pb-20">
            <Contact />
          </div>
          <Footer />
        </section>
      </div>

      <AIChat />
    </div>
  );
}

export default App;