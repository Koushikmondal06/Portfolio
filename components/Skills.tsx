"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'JavaScript', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'C', level: 75 },
    { name: 'Java', level: 80 },
    { name: 'React', level: 70 },
    { name: 'HTML & CSS', level: 85 },
    { name: 'Git', level: 75 },
    { name: 'Node.js', level: 60 },
  ];

  const tools = ['VS Code', 'Git', 'Chrome DevTools', 'Vercel', 'npm', 'Linux', 'Docker', 'Figma'];

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
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 82%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-14" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-[#1a2332] rounded-lg mb-5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-sm text-[#8b949e] font-mono font-semibold">
              cat ~/.config/skills.conf
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c9d1d9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Tech Stack
          </h2>
          <p className="text-[#4a5568] text-base mt-3 font-mono font-medium">
            runtime environment · production ready
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills - Progress bars */}
          <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl overflow-hidden" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 px-5 py-3 bg-[#0a0e17] border-b border-[#1a2332]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-sm text-[#8b949e] font-mono font-semibold">languages & frameworks</span>
            </div>
            <div className="p-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#c9d1d9] font-mono font-bold group-hover:text-[#22C55E] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs text-[#8b949e] font-mono font-semibold">
                      [{skill.level}%]
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, #22C55E ${skill.level - 30}%, #16A34A)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Info Panel */}
          <div className="space-y-6">
            {/* Tools */}
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl overflow-hidden" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 px-5 py-3 bg-[#0a0e17] border-b border-[#1a2332]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-sm text-[#8b949e] font-mono font-semibold">tools & platforms</span>
              </div>
              <div className="p-6 flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2.5 text-sm font-mono font-semibold rounded-lg bg-[#0a0e17] border border-[#1a2332] text-[#8b949e] hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all duration-200 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* System info panel */}
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl overflow-hidden" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 px-5 py-3 bg-[#0a0e17] border-b border-[#1a2332]">
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="text-sm text-[#8b949e] font-mono font-semibold">system.log</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <p className="text-[#8b949e] font-medium"><span className="text-[#22C55E] font-bold">[INFO]</span> Currently learning: Web3 & Blockchain</p>
                <p className="text-[#8b949e] font-medium"><span className="text-[#22C55E] font-bold">[INFO]</span> Focus: Full-stack development</p>
                <p className="text-[#8b949e] font-medium"><span className="text-[#febc2e] font-bold">[WARN]</span> Coffee levels: critically low</p>
                <p className="text-[#8b949e] font-medium"><span className="text-[#22C55E] font-bold">[INFO]</span> Status: Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
