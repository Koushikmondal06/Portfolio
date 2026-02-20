"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: '~/' },
    { href: '#projects', label: '/projects' },
    { href: '#skills', label: '/skills' },
    { href: '#contact', label: '/contact' },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0a0e17]/95 backdrop-blur-md border-b border-[#1a2332]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] group-hover:shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-shadow" />
            <span className="text-[12px] text-[#8b949e] font-mono group-hover:text-[#c9d1d9] transition-colors">
              koushik@portfolio
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1 text-[12px] text-[#4a5568] hover:text-[#22C55E] transition-colors duration-150 cursor-pointer font-mono rounded hover:bg-[#22C55E]/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#4a5568] hover:text-[#22C55E] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e17]/98 backdrop-blur-md border-b border-[#1a2332]">
          <div className="px-4 py-2 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-[12px] text-[#4a5568] hover:text-[#22C55E] hover:bg-[#22C55E]/5 rounded transition-colors duration-150 cursor-pointer font-mono"
              >
                <span className="text-[#22C55E] mr-1">$</span> cd {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;