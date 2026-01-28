import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, ChevronDown, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Project Inquiry');
  const [showSuccess, setShowSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const subjects = ['Project Inquiry', 'Job Opportunity', 'Graphic Design', 'Web Development', 'Other'];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/indudhar-gavasi-0778732ab", color: "hover:bg-[#0077B5]" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/indudhar.gavasi", color: "hover:bg-[#1877F2]" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/indudhar_gavasi", color: "hover:bg-[#E4405F]" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const whatsappNumber = "918660448954";
    const text = `*New Inquiry from Portfolio*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Subject:* ${selectedSubject}%0A%0A` +
                 `*Message:*%0A${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', message: '' });
      setSelectedSubject('Project Inquiry');
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.05))] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info Column */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Let's Work Together
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-xl">
                Have a project in mind? Looking for a partner who can handle design, development, and marketing? Let's discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, text: "indudharsuja@gmail.com", label: "EMAIL ME" },
                { icon: <Phone className="w-5 h-5" />, text: "+91 8660448954", label: "CALL ME" },
                { icon: <MapPin className="w-5 h-5" />, text: "Bangalore, India", label: "LOCATION" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#1e293b] border border-slate-800 flex items-center justify-center text-cyan-400 shadow-lg group-hover:border-cyan-500/50 transition-all duration-300">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">{item.label}</span>
                    <span className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">FOLLOW MY JOURNEY</h4>
              <div className="flex gap-5">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 rounded-2xl bg-[#1e293b] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-xl ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-slate-800/60 shadow-2xl relative">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 text-cyan-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Prepared!</h3>
                <p className="text-slate-400 max-w-xs mx-auto mb-8">
                  I've opened WhatsApp with your message details. Please click send in the WhatsApp window.
                </p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-300 ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#0f172a]/80 border border-slate-700/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-600" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-300 ml-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0f172a]/80 border border-slate-700/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-600" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                {/* Custom Dropdown */}
                <div className="space-y-3" ref={dropdownRef}>
                  <label className="text-sm font-semibold text-slate-300 ml-1">Subject</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-[#0f172a]/80 border rounded-2xl px-6 py-4 text-left flex justify-between items-center transition-all ${
                        isDropdownOpen ? 'border-cyan-500 ring-2 ring-cyan-500/50' : 'border-slate-700/50'
                      }`}
                    >
                      <span className={selectedSubject ? 'text-white' : 'text-slate-600'}>
                        {selectedSubject || 'Select a subject'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    </button>

                    {/* Dropdown Popup */}
                    <div 
                      className={`absolute z-20 top-[calc(100%+8px)] left-0 right-0 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
                        isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="p-2 space-y-1">
                        {subjects.map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              setSelectedSubject(sub);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 rounded-xl text-sm transition-colors ${
                              selectedSubject === sub 
                                ? 'bg-cyan-500 text-white' 
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-300 ml-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a]/80 border border-slate-700/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-600 resize-none" 
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-lg w-full bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98] shadow-2xl shadow-cyan-500/10 group overflow-hidden relative"
                >
                  <span className="relative z-10">Send to WhatsApp</span>
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;