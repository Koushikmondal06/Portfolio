"use client";

import { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Terminal, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const links = [
    { icon: Mail, href: 'mailto:koushikmondal0069@gmail.com', label: 'Email', text: 'koushikmondal0069@gmail.com', desc: 'Send me a message' },
    { icon: Github, href: 'https://github.com/Koushikmondal06', label: 'GitHub', text: 'github.com/Koushikmondal06', desc: 'Check out my repos' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/koushik-mondal-011308329/', label: 'LinkedIn', text: 'Koushik Mondal', desc: 'Connect with me' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-14" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-[#1a2332] rounded-lg mb-5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-sm text-[#8b949e] font-mono font-semibold">
              cat ~/.config/contact.md
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c9d1d9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Get In Touch
          </h2>
          <p className="text-[#8b949e] text-lg mt-3 font-medium max-w-lg">
            I'm always open to new opportunities, collaborations, and interesting conversations. Let's build something together.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-6 hover:border-[#22C55E]/40 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#22C55E]/5 flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#0a0e17] text-[#4a5568] group-hover:text-[#22C55E] group-hover:bg-[#22C55E]/10 transition-all duration-300">
                  <link.icon size={22} strokeWidth={1.5} />
                </div>
                <ArrowUpRight size={16} className="text-[#2d3748] group-hover:text-[#22C55E] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#c9d1d9] mb-1 font-mono group-hover:text-[#22C55E] transition-colors">
                {link.label}
              </h3>
              <p className="text-xs text-[#4a5568] font-mono mb-3 font-medium">
                {link.desc}
              </p>
              <p className="text-sm text-[#8b949e] font-mono font-semibold mt-auto truncate">
                {link.text}
              </p>
            </a>
          ))}
        </div>

        {/* Terminal-style CTA */}
        <div className="mt-12 max-w-4xl">
          <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-6 flex items-center gap-4" style={{ opacity: 0 }}>
            <Terminal size={20} className="text-[#22C55E] flex-shrink-0" />
            <p className="text-sm text-[#8b949e] font-mono font-medium">
              <span className="text-[#22C55E] font-bold">$</span> echo "Let's collaborate!" | mail -s "Hello" koushik
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[#1a2332]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-sm text-[#4a5568] font-mono font-medium">
              © {new Date().getFullYear()} koushik@portfolio · PID 1 · uptime ∞
            </p>
            <p className="text-sm text-[#4a5568] font-mono font-medium">
              built with next.js · powered by caffeine ☕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
