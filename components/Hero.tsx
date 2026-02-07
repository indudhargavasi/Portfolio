import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Download, Sparkles, ChevronLeft, ChevronRight, Quote, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';

// Updated to your hosted image link
const PROFILE_IMAGE_URL = "https://indudhargavasi.in/assets/profileimage.png";

const testimonials = [
  {
    quote: "Indudhar delivered a website that exceeded our expectations. Truly a visionary in digital craft.",
    author: "Sarah Johnson",
    company: "TechCorp CEO"
  },
  {
    quote: "Exceptional design sense and technical expertise. He transformed our brand presence completely.",
    author: "Michael Chen",
    company: "Creative Studio MD"
  },
  {
    quote: "Professional, efficient, and highly creative. The results for our SEO strategy were immediate.",
    author: "Elena Rodriguez",
    company: "BrandX Marketing"
  }
];

const Hero: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const prevTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/indudhar-gavasi-0778732ab", label: "LinkedIn" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/indudhar.gavasi", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/indudhar_gavasi", label: "Instagram" },
    { icon: <MessageCircle className="w-5 h-5" />, href: "https://wa.me/918660448954", label: "WhatsApp" },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-32 md:pt-48 pb-20 overflow-hidden bg-[#0f172a]">
      <div id="home" className="absolute top-0" />
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-slate-900 to-slate-900" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Floating Social Dock */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 social-dock-in">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-700 to-slate-700 mx-auto" />
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300"
            title={social.label}
          >
            {social.icon}
            <span className="absolute left-14 px-3 py-1 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap uppercase tracking-widest">
              {social.label}
            </span>
          </a>
        ))}
        <div className="w-px h-20 bg-gradient-to-t from-transparent via-slate-700 to-slate-700 mx-auto" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="text-left order-2 lg:order-1 hero-fade-in lg:pl-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for New Projects
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.05]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Indudhar</span>,<br />
              Crafting Digital <br className="hidden md:block" /> Excellence.
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              A specialized <span className="text-white font-semibold">Creative Technologist</span> with 7+ years of experience in turning complex problems into elegant digital solutions through code and design.
            </p>

            <div className="mb-10 max-w-lg relative group">
              <div className="h-[100px] flex flex-col justify-center">
                <div className={`transition-all duration-400 ease-out flex gap-4 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  <Quote className="w-8 h-8 text-cyan-500/20 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 italic text-sm md:text-base leading-relaxed mb-2 line-clamp-2">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-xs uppercase tracking-wider">{testimonials[currentTestimonial].author}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">{testimonials[currentTestimonial].company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={(e) => scrollToSection(e, 'portfolio')}
                className="btn-lg w-full sm:w-auto bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 hover:text-slate-950 transition-all flex items-center justify-center gap-3 group active:scale-[0.97] shadow-2xl shadow-cyan-500/10"
              >
                Explore Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button 
                className="btn-lg w-full sm:w-auto bg-slate-800/40 text-white border border-slate-700/60 font-semibold rounded-2xl hover:bg-slate-800/80 hover:border-slate-600 transition-all flex items-center justify-center gap-3 active:scale-[0.97]"
              >
                <Download className="w-5 h-5" />
                Resume
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-slate-800/50 pt-10">
              {[
                { label: 'Experience', value: '7+ Years' },
                { label: 'Projects', value: '150+' },
                { label: 'Happy Clients', value: '80+' },
                { label: 'Skillsets', value: '15+' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-display font-bold text-white mb-0.5">{stat.value}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end z-10 hero-image-in">
            <div className="relative w-full max-w-[480px] aspect-[4/5.5] group">
              <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/20 to-indigo-600/10 rounded-[5rem] blur-[80px] opacity-60" />
              
              <div className="relative h-full w-full rounded-[4rem] border border-slate-700/50 overflow-hidden bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]">
                <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Indudhar Gavasi"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40" />
                
                <div className="absolute bottom-10 left-8 right-8 p-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                        <Sparkles className="w-6 h-6" />
                     </div>
                     <div>
                       <span className="block text-white font-bold text-lg leading-tight">Indudhar Gavasi</span>
                       <span className="block text-cyan-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Lead Creative Tech</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-40 h-40 border-t-4 border-r-4 border-blue-500/20 rounded-tr-[5rem] pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 border-b-4 border-l-4 border-indigo-500/20 rounded-bl-[5rem] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroImageIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes socialDockIn {
          from { opacity: 0; transform: translate(-20px, -50%); }
          to { opacity: 1; transform: translate(0, -50%); }
        }
        .hero-fade-in { animation: heroFadeIn 1s ease-out forwards; }
        .hero-image-in { animation: heroImageIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .social-dock-in { animation: socialDockIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};

export default Hero;