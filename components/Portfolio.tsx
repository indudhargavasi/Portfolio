import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, X, Eye, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../types';

const PortfolioCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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
      className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800/50 shadow-xl cursor-pointer transition-all duration-500 ease-out isolation-auto"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
        willChange: 'transform, opacity',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="aspect-[4/3] overflow-hidden relative rounded-[2.5rem] bg-slate-800">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
          style={{ transform: 'translateZ(0)' }}
          loading="lazy"
        />
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.4), transparent 70%)`,
            transform: 'translateZ(0)'
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-10 backdrop-blur-[4px] rounded-[2.5rem]">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{project.category}</span>
          <h3 className="text-white text-2xl md:text-3xl font-display font-bold mb-3">{project.title}</h3>
          <p className="text-slate-300 text-sm mb-6 line-clamp-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              className="h-10 px-5 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-xl hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-2"
            >
              Details <Eye className="w-3.5 h-3.5" />
            </button>

            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="h-10 px-5 bg-cyan-500 text-white text-xs font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                Live <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
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
      description: 'Advanced healthcare services and patient portal for Maiya Hospital.', liveUrl: 'http://maiyahospital.in/' 
    },
    { 
      id: '2', title: 'KCMS Education', category: 'Web Design', 
      image: getScreenshot('https://kcms.edu.in/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1491843351663-7c116e814852?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Kanaka College of Management Studies academic portal.', liveUrl: 'https://kcms.edu.in/' 
    },
    { 
      id: '3', title: 'RPS Solur', category: 'Web Design', 
      image: getScreenshot('https://rpssolur.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Integrated school management and information platform for RPS Solur.', liveUrl: 'https://rpssolur.com/' 
    },
    { 
      id: '9', title: 'Marlabs Corporate', category: 'Marketing', 
      image: getScreenshot('https://www.marlabs.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Global digital solutions and technology consulting firm.', liveUrl: 'https://www.marlabs.com/' 
    },
    { 
      id: '10', title: 'IndiQube Managed Spaces', category: 'Marketing', 
      image: getScreenshot('https://indiqube.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Premier coworking and office space provider in India.', liveUrl: 'https://indiqube.com/' 
    },
    { 
      id: '16', title: '7th Century Production', category: 'Graphic Design', 
      image: getScreenshot('https://7thcentury.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'High-end media production house and creative studio.', liveUrl: 'https://7thcentury.com/' 
    },
    { 
      id: '17', title: 'Glam Godess', category: 'Graphic Design', 
      image: getScreenshot('https://www.glamgodess.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1522338140262-f46f5912018a?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Fashion and lifestyle brand identity and e-commerce.', liveUrl: 'https://www.glamgodess.com/' 
    },
    { 
      id: '18', title: 'Haseen Traditions', category: 'Graphic Design', 
      image: getScreenshot('https://haseentraditions.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1594235412402-bbaa696f92ef?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Luxury traditional wear e-commerce experience.', liveUrl: 'https://haseentraditions.com/' 
    },
    { 
      id: '11', title: 'Tillcore Tech', category: 'Marketing', 
      image: getScreenshot('https://www.tillcore.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Innovative tech solutions and enterprise services.', liveUrl: 'https://www.tillcore.com/' 
    },
    { 
      id: '21', title: 'Cab Experiences', category: 'Marketing', 
      image: getScreenshot('https://cabexperiences.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1559297434-2d8a37aee974?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Premium travel and mobility experience platform.', liveUrl: 'https://cabexperiences.com/' 
    },
    { 
      id: '12', title: 'Republic Guru', category: 'Marketing', 
      image: getScreenshot('https://republicguru.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Tech-driven digital strategy and consulting agency.', liveUrl: 'https://republicguru.com/' 
    },
    { 
      id: '13', title: 'Infunity Tech', category: 'Marketing', 
      image: getScreenshot('https://infunitytech.com/'), 
      additionalImages: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Creative software and digital product development.', liveUrl: 'https://infunitytech.com/' 
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
    }, 500); // Slightly longer for smoother fade-out
  }, []);

  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
    setCurrentImageIndex(0);
  }, [selectedProject, filteredProjects]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
    setCurrentImageIndex(0);
  }, [selectedProject, filteredProjects]);

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          if (carouselImages.length > 1) {
            handleNextImage();
          } else {
            handleNextProject();
          }
          break;
        case 'ArrowLeft':
          if (carouselImages.length > 1) {
            handlePrevImage();
          } else {
            handlePrevProject();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, handleClose, handleNextProject, handlePrevProject, handleNextImage, handlePrevImage, carouselImages.length]);

  const categories = ['All', 'Web Design', 'Graphic Design', 'Marketing'];

  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">My Work</h2>
            <p className="text-slate-400 text-lg">A showcase of live websites I've developed over 7+ years.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`h-10 px-6 rounded-full text-sm font-semibold transition-all duration-500 ${
                  filter === cat ? 'bg-cyan-500 text-white shadow-xl scale-105' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]">
          {filteredProjects.map((project) => (
            <PortfolioCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ease-in-out ${isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Enhanced Overlay */}
          <div 
            className={`absolute inset-0 bg-slate-950/80 backdrop-blur-2xl transition-opacity duration-500 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
            onClick={handleClose} 
          />
          
          {/* Main Modal Container with Spring-like Opening */}
          <div className={`modal-container relative bg-slate-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] border border-slate-800/60 shadow-[0_0_100px_rgba(0,0,0,0.5)] no-scrollbar transition-all duration-500 transform ${
            isClosing ? 'scale-90 translate-y-20 opacity-0 blur-md' : 'scale-100 translate-y-0 opacity-100 blur-0 modal-spring'
          }`}>
            
            {/* Close Button entrance */}
            <button 
              onClick={handleClose} 
              className={`fixed top-8 right-8 z-[1100] bg-white text-slate-950 w-12 h-12 flex items-center justify-center rounded-full border-2 border-slate-950/10 shadow-2xl transition-all hover:bg-cyan-400 hover:scale-110 active:scale-90 group delay-300 ${isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Carousel Section */}
              <div className="lg:w-3/5 bg-slate-950 min-h-[40vh] md:min-h-[50vh] relative group/carousel overflow-hidden">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-slate-900 animate-pulse-slow pointer-events-none" />
                  <img 
                    key={selectedProject.id + currentImageIndex}
                    src={carouselImages[currentImageIndex]} 
                    className={`w-full h-full object-cover object-top transition-all duration-700 ease-out animate-fade-in-scale`} 
                    alt={`${selectedProject.title} view ${currentImageIndex + 1}`} 
                  />
                  
                  {carouselImages.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-cyan-500 hover:text-slate-950 active:scale-90"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-cyan-500 hover:text-slate-950 active:scale-90"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {carouselImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Content Staggered Entrance */}
              <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col bg-slate-900/40 relative">
                <div className={`content-entrance transition-all duration-700 delay-100 ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    {selectedProject.category}
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight tracking-tight">{selectedProject.title}</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-slate-300 text-base leading-relaxed">{selectedProject.description}</p>
                    <div className="h-px bg-slate-800/50 w-full" />
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Expertise</span>
                        <span className="text-white font-medium text-sm">{selectedProject.category}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Experience</span>
                        <span className="text-white font-medium text-sm">7+ Years</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-auto space-y-4 transition-all duration-700 delay-200 ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-md w-full bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-[0.98]"
                    >
                      Visit Website 
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                      onClick={handlePrevProject}
                      className="flex items-center justify-center gap-2 p-3 bg-slate-800/30 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-bold border border-slate-700/50"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                    <button 
                      onClick={handleNextProject}
                      className="flex items-center justify-center gap-2 p-3 bg-slate-800/30 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-bold border border-slate-700/50"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="w-full py-4 text-slate-500 hover:text-white transition-colors text-[10px] font-bold tracking-[0.2em] uppercase mt-2"
                  >
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes modalSpring {
          0% { transform: scale(0.9) translateY(40px); opacity: 0; filter: blur(10px); }
          100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes fadeInScale {
          0% { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .modal-spring {
          animation: modalSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        .modal-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;