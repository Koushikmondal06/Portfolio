"use client";

import { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#1a1a1a]'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-md bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-sm font-bold text-white tracking-wider uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Koushik
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="px-4 py-2 text-[13px] text-[#888] hover:text-white transition-colors duration-200 cursor-pointer rounded-lg hover:bg-white/5"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-3 flex items-center gap-2">
              <a
                href="https://github.com/Koushikmondal06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#555] hover:text-white transition-colors cursor-pointer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/koushik-mondal-011308329/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#555] hover:text-white transition-colors cursor-pointer"
              >
                <Linkedin size={18} />
              </a>

            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#888] hover:text-white cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050505]/98 backdrop-blur-xl border-t border-[#1a1a1a]">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-4 py-3 text-sm text-[#888] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </button>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;