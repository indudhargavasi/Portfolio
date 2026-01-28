import React from 'react';
import { Palette, Code, Megaphone, Layout, Smartphone, TrendingUp } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      description: "Custom, responsive websites built with React, TypeScript, and modern frameworks. Performance focused."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Graphic Design",
      description: "Brand identity, logo design, and marketing materials that tell your story visually."
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Digital Marketing",
      description: "SEO, social media strategy, and content marketing to grow your audience and ROI."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "User-centric interfaces designed for clarity, usability, and aesthetic appeal."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App Design",
      description: "Intuitive mobile application interfaces for iOS and Android platforms."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Brand Strategy",
      description: "Comprehensive strategies to position your brand effectively in the market."
    }
  ];

  return (
    <section id="services" className="py-24 relative bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">My Expertise</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive suite of digital services designed to take your business to the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;