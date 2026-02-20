"use client";

import { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Terminal } from 'lucide-react';
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
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      if (contentRef.current) {
        const cards = gsap.utils.toArray(contentRef.current.children);
        cards.forEach((card: any, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const links = [
    { icon: Mail, href: 'mailto:koushikmondal0069@gmail.com', label: 'Email', text: 'koushikmondal0069@gmail.com', desc: 'Drop me a message' },
    { icon: Github, href: 'https://github.com/Koushikmondal06', label: 'GitHub', text: 'Koushikmondal06', desc: 'View my repositories' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/koushik-mondal-011308329/', label: 'LinkedIn', text: 'Koushik Mondal', desc: 'Connect professionally' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="section-divider max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <p className="mono-label mb-4">Get In Touch</p>
          <h2 className="giant-heading">
            Con<span className="text-[var(--accent)]">tact</span>
          </h2>
          <p className="text-[#555] text-lg mt-6 max-w-lg leading-relaxed">
            I'm always open to new opportunities and interesting conversations.
            Let's build something great together.
          </p>
        </div>

        {/* Contact cards */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="wf-card p-6 group cursor-pointer flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-lg bg-[#111] text-[#555] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-dim)] transition-all duration-300">
                  <link.icon size={22} strokeWidth={1.5} />
                </div>
                <ArrowUpRight size={16} className="text-[#222] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-1">
                {link.label}
              </h3>
              <p className="text-[12px] text-[#444] font-mono mb-3">{link.desc}</p>
              <p className="text-[13px] text-[#666] font-mono mt-auto truncate">{link.text}</p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="wf-card p-6 flex items-center gap-4" style={{ opacity: 0 }}>
          <Terminal size={20} className="text-[var(--accent)] flex-shrink-0" />
          <p className="text-[14px] text-[#555] font-mono">
            <span className="text-[var(--accent)] font-bold">$</span> echo "Let's collaborate!" | mail koushik
          </p>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-[#1a1a1a]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">K</span>
              </div>
              <span className="text-[13px] text-[#444] font-mono">
                © {new Date().getFullYear()} Koushik Mondal
              </span>
            </div>
            <p className="text-[13px] text-[#333] font-mono">
              Built with Next.js · Powered by ☕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
