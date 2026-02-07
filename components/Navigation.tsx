import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        <button 
          onClick={(e) => scrollToSection(e, 'about')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-xl text-white tracking-tight leading-tight">Indudhar Gavasi</span>
            <div className="mt-1 inline-block border border-cyan-500/60 px-2 py-0.5 rounded-sm">
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.25em] leading-none block">Entrepreneur</span>
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-all relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="btn-md bg-white text-slate-950 font-bold rounded-full text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Let's Talk
          </button>
        </div>

        <button 
          className="md:hidden text-white p-2 hover:bg-slate-800/50 rounded-xl transition-colors w-12 h-12 flex items-center justify-center border border-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 p-8 flex flex-col gap-8 transition-all duration-500 ease-in-out origin-top shadow-2xl ${
          isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <button 
            key={link.name} 
            onClick={(e) => scrollToSection(e, link.id)}
            className="text-left text-3xl font-display font-bold text-slate-200 hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </button>
        ))}
        <button 
          onClick={(e) => scrollToSection(e, 'contact')}
          className="btn-lg w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg active:scale-[0.98] shadow-2xl shadow-cyan-500/20"
        >
          Get In Touch
        </button>
      </div>
    </nav>
  );
};

export default Navigation;