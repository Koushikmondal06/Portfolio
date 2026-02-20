"use client";

import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import Terminal from '@/components/Terminal';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(socialsRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 1, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: Github, href: 'https://github.com/Koushikmondal06', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/koushik-mondal-011308329/', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6"
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Header info */}
        <div ref={headerRef} className="mb-6 text-center" style={{ opacity: 0 }}>
          <p className="text-[11px] text-[#4a5568] font-mono mb-1">
            user@koushik-portfolio · bash · 120×40
          </p>
        </div>

        {/* Terminal */}
        <Terminal />

        {/* Social Links */}
        <div ref={socialsRef} className="flex justify-center gap-3 mt-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-2.5 rounded-md bg-[#0d1117] border border-[#1a2332] text-[#4a5568] hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200 cursor-pointer"
              aria-label={social.label}
            >
              <social.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Hint text */}
        <p className="text-center text-[11px] text-[#2d3748] font-mono mt-4">
          try: ls · neofetch · cat readme · cd projects
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#2d3748] text-[10px] font-mono">
        <span>↓ scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#22C55E]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;