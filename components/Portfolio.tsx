import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, Eye, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Globe, Calendar, Layout } from 'lucide-react';
import { Project } from '../types';

const PortfolioCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800/50 shadow-xl cursor-pointer transition-all duration-500 ease-out isolation-auto h-full"
      style={{
        transform: rotate.x !== 0 || rotate.y !== 0 
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'none',
        willChange: 'transform, opacity',
      }}
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-slate-800">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 backdrop-blur-[2px]">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{project.category}</span>
          <h3 className="text-white text-xl md:text-2xl font-display font-bold mb-2">{project.title}</h3>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="h-8 px-4 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-lg backdrop-blur-md flex items-center gap-2">
              View Details <Eye className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getScreenshot = (url: string) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=900`;

  const projects: Project[] = [
    { 
      id: '1', title: 'Maiya Hospital', category: 'Web Design', 
      image: getScreenshot('http://maiyahospital.in/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1538108197017-c1b89c0ef319?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Advanced healthcare services and patient portal for Maiya Hospital. A fully responsive digital presence built for patient convenience.', liveUrl: 'http://maiyahospital.in/' 
    },
    { 
      id: '2', title: 'KCMS Education', category: 'Web Design', 
      image: getScreenshot('https://kcms.edu.in/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1491843351663-7c116e814852?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Kanaka College of Management Studies academic portal, providing resources for students and faculty.', liveUrl: 'https://kcms.edu.in/' 
    },
    { 
      id: '3', title: 'RPS Solur', category: 'Web Design', 
      image: getScreenshot('https://rpssolur.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Integrated school management and information platform for RPS Solur, focusing on educational transparency.', liveUrl: 'https://rpssolur.com/' 
    },
    { 
      id: '9', title: 'Marlabs Corporate', category: 'Marketing', 
      image: getScreenshot('https://www.marlabs.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Global digital solutions and technology consulting firm. Strategy focused on enterprise-level growth.', liveUrl: 'https://www.marlabs.com/' 
    },
    { 
      id: '10', title: 'IndiQube Managed Spaces', category: 'Marketing', 
      image: getScreenshot('https://indiqube.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Premier coworking and office space provider in India. Marketing focused on lifestyle and productivity.', liveUrl: 'https://indiqube.com/' 
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const carouselImages = selectedProject 
    ? [selectedProject.image, ...(selectedProject.additionalImages || [])]
    : [];

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      setCurrentImageIndex(0);
    }, 400); 
  }, []);

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll and handle potential layout shifts
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [selectedProject, handleClose, handleNextImage, handlePrevImage]);

  const categories = ['All', 'Web Design', 'Graphic Design', 'Marketing'];

  const ModalContent = () => {
    if (!selectedProject) return null;

    return (
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 transition-all duration-400 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={handleClose} />
        
        {/* Close Button - Desktop (Outside Container) */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-[10001] hidden md:flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full transition-all group shadow-2xl"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Modal Container */}
        <div className={`relative w-full max-w-6xl h-full max-h-[90vh] lg:h-[80vh] bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${isClosing ? 'scale-95 translate-y-10 blur-sm' : 'scale-100 translate-y-0 blur-0 animate-modal-in shadow-[0_0_100px_rgba(0,0,0,0.5)]'}`}>
          
          {/* Mobile Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-[100] md:hidden w-10 h-10 bg-slate-950/60 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Media Gallery */}
          <div className="w-full lg:w-[60%] h-[40%] md:h-[50%] lg:h-full bg-slate-950 relative group/carousel shrink-0">
            <img 
              key={currentImageIndex}
              src={carouselImages[currentImageIndex]} 
              className="w-full h-full object-cover object-top animate-fade-in" 
              alt={selectedProject.title} 
            />
            
            {carouselImages.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-950/40 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center transition-all hover:bg-cyan-500 hover:text-slate-950 active:scale-90">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-950/40 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center transition-all hover:bg-cyan-500 hover:text-slate-950 active:scale-90">
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'}`} 
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Project Details */}
          <div className="w-full lg:w-[40%] flex flex-col h-full bg-slate-900 relative overflow-y-auto no-scrollbar">
            <div className="p-6 md:p-10 lg:p-12 flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Layout className="w-3 h-3" /> Service
                    </span>
                    <span className="text-white text-sm font-semibold">{selectedProject.category}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Duration
                    </span>
                    <span className="text-white text-sm font-semibold">Project Phase</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-10 flex flex-col gap-4">
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full h-14 bg-white text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all shadow-xl shadow-white/5 group active:scale-[0.98]"
                  >
                    Visit Live Website <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
                <button 
                  onClick={handleClose}
                  className="w-full h-12 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold rounded-2xl border border-slate-700/50 transition-all flex items-center justify-center gap-2 md:hidden"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Selected Projects</h2>
            <p className="text-slate-400 max-w-xl">Showcase of 7+ years in high-performance design and development.</p>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-slate-900 border border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* RENDER MODAL VIA PORTAL TO PREVENT STACKING CONTEXT ISSUES */}
      {selectedProject && createPortal(<ModalContent />, document.body)}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in { animation: modalIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Portfolio;