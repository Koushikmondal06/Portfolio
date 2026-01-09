"use client";

import { useState, useEffect, useRef } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const skills = [
    { name: "JavaScript", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "C", level: 75 },
    { name: "Java", level: 80 },
    { name: "React", level: 70 },
    { name: "HTML & CSS", level: 85 },
    { name: "Git & GitHub", level: 75 },
    { name: "Node.js", level: 60 },
  ];

  const tools = [
    "VS Code",
    "Git",
    "Chrome DevTools",

    "Vercel",
    "npm",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies I'm learning and using in my projects.
          </p>
        </div>

        {/* Skills */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Programming & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center group hover:border-emerald-500/50 transition-all duration-300`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${index * 50}ms`,
                    transition: "all 0.6s ease-out",
                  }}
                >
                  <span className="text-gray-300 font-medium text-sm group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className={`p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center group hover:border-emerald-500/50 transition-all duration-300`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${index * 50}ms`,
                    transition: "all 0.6s ease-out",
                  }}
                >
                  <span className="text-gray-300 font-medium text-sm group-hover:text-white transition-colors">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
