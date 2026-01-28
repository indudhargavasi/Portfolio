import React from 'react';
import { Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const socials = [
    { 
      Icon: Linkedin, 
      href: 'https://www.linkedin.com/in/indudhar-gavasi-0778732ab', 
      label: 'LinkedIn',
      color: 'hover:text-[#0077B5]'
    },
    { 
      Icon: Facebook, 
      href: 'https://www.facebook.com/indudhar.gavasi', 
      label: 'Facebook',
      color: 'hover:text-[#1877F2]'
    },
    { 
      Icon: Instagram, 
      href: 'https://www.instagram.com/indudhar_gavasi', 
      label: 'Instagram',
      color: 'hover:text-[#E4405F]'
    },
    { 
      Icon: MessageCircle, 
      href: 'https://wa.me/918660448954', 
      label: 'WhatsApp',
      color: 'hover:text-green-500'
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-display font-bold text-2xl text-white mb-2">Indudhar Gavasi</h3>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} All rights reserved. Designed for performance.</p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ Icon, href, label, color }, i) => (
            <a 
              key={i} 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`text-slate-400 ${color} transition-all duration-300 p-2.5 hover:bg-slate-900 rounded-full hover:scale-110 active:scale-95`}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;