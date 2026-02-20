"use client";

import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import Terminal from '@/components/Terminal';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' }
      );

      // Fade out on scroll down
      if (scrollFadeRef.current) {
        gsap.to(scrollFadeRef.current, {
          y: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex flex-col justify-center relative pt-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Intro elements mapped here for scroll fade logic */}
        <div ref={scrollFadeRef}>
          {/* Giant heading */}
          <div ref={headingRef} className="mb-8" style={{ opacity: 0 }}>
            <p className="mono-label mb-4">CS Student · Web Developer · Problem Solver</p>
            <h1 className="giant-heading">
              Koushik<br />
              <span className="text-[var(--accent)]">Mondal</span>
            </h1>
          </div>

          <p ref={subtitleRef} className="text-[#777] text-lg max-w-xl mb-12 leading-relaxed" style={{ opacity: 0 }}>
            I build innovative digital experiences with modern web technologies.
            Currently exploring Web3, blockchain, and creative frontend development.
          </p>
        </div>

        {/* Terminal */}
        <Terminal />

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-[#333] hover:text-[var(--accent)] transition-colors cursor-pointer group"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;