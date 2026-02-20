"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "FRONTEND ENDOWMENT",
      id: "01",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5", "CSS3"],
      accent: "var(--accent)"
    },
    {
      title: "BACKEND & SYSTEMS",
      id: "02",
      skills: ["Node.js", "Express", "C", "Java", "Python", "REST APIs", "GraphQL"],
      accent: "#28c840"
    },
    {
      title: "WEB3 & DECENTRALIZATION",
      id: "03",
      skills: ["Solidity", "Ethers.js", "Hardhat", "Smart Contracts", "Web3.js", "MetaMask"],
      accent: "#febc2e"
    },
    {
      title: "DEV TOOLS & DEPLOYMENT",
      id: "04",
      skills: ["Git", "GitHub", "Linux", "Docker", "Vercel", "npm/yarn", "VS Code"],
      accent: "#00e5ff"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Banner Animation
      if (bannerRef.current) {
        gsap.fromTo(bannerRef.current,
          { opacity: 0, scaleY: 0, transformOrigin: "top" },
          {
            opacity: 1, scaleY: 1, duration: 1, ease: 'expo.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 90%',
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax-like subtle float for Grid Elements
      if (gridRef.current) {
        // Individual Card entry
        const cards = gsap.utils.toArray(gridRef.current.children);
        cards.forEach((card: any, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, rotateX: -10, transformPerspective: 1000 },
            {
              opacity: 1, y: 0, rotateX: 0,
              duration: 1,
              ease: 'power3.out',
              delay: index * 0.1, // Stagger effect based on index
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: "play reverse play reverse", // Re-animate on scroll up/down
              }
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-black pt-20 pb-40">

      {/* MASSIVE ACCENT BANNER */}
      <div ref={bannerRef} className="w-full bg-[var(--accent)] py-12 px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between z-10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <p className="font-mono text-black font-bold tracking-widest uppercase text-sm mb-2">System Capabilities</p>
            <h2 className="text-black font-sans font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none">
              Arsenal
            </h2>
          </div>
          <div className="mt-6 md:mt-0 font-mono text-black text-left md:text-right text-sm font-bold uppercase max-w-sm">
            Engineered for high performance, scale, and uncompromising precision.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
        {/* Category Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {skillCategories.map((category) => (
            <div key={category.id} className="relative group flex flex-col pt-8">
              {/* Top border that expands */}
              <div
                className="absolute top-0 left-0 h-[2px] w-full bg-[#222]"
              />
              <div
                className="absolute top-0 left-0 h-[2px] w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500 ease-out z-10"
                style={{ backgroundColor: category.accent }}
              />

              <div className="flex items-end gap-4 mb-8">
                <span className="font-mono text-5xl lg:text-7xl font-light tracking-tighter" style={{ color: "rgba(255,255,255,0.05)" }}>
                  {category.id}
                </span>
                <h3 className="font-sans text-2xl lg:text-4xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300" style={{ ':hover': { color: category.accent } } as any}>
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[13px] md:text-[14px] font-bold uppercase tracking-widest px-5 py-3 border border-[#333] text-[#aaa] bg-[#050505] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Status footer for the section */}
        <div className="mt-40 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-none animate-pulse" />
            <span className="font-mono text-[#777] uppercase tracking-widest text-xs font-bold">System Online / Ready for Deployment</span>
          </div>
          <div className="font-mono text-[#555] uppercase text-xs tracking-widest font-bold">
            Always Adapting. Never Static.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
