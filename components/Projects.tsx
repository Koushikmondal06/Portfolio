"use client";

import { useEffect, useRef } from 'react';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'CrowdX',
      description: 'Decentralized crowdfunding platform on Ethereum Sepolia with trustless security, smart contract-locked funds, MetaMask integration, and real-time funding progress. Features modern dark theme with glassmorphism effects.',
      technologies: ['Next.js', 'Solidity', 'Ethers.js', 'Tailwind CSS', 'Hardhat'],
      github: 'https://github.com/Koushikmondal06/CrowdX',
      demo: 'https://crowdx.002014.xyz/',
    },
    {
      title: 'BlockOff',
      description: 'Revolutionary mesh networking protocol enabling blockchain transactions offline via Bluetooth Low Energy (BLE). Supports multi-chain EVM networks with packet fragmentation and peer-to-peer relay.',
      technologies: ['React', 'Blockchain', 'BLE', 'Web3', 'TypeScript'],
      github: 'https://github.com/HimanshuM685/BlockOff',
      demo: 'https://blockoff.007575.xyz/',
    },
    {
      title: 'Eco-Tracker',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with a modern full-stack architecture.',
      technologies: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express'],
      github: 'https://github.com/HimanshuM685/EcoTracker.git',
      demo: 'https://eco-test-theta.vercel.app/',
    },
    {
      title: 'Music Website',
      description: 'A platform for discovering and streaming music, featuring curated playlists, artist profiles, and social sharing capabilities with a responsive interface.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      github: 'https://github.com/Koushikmondal06/Music-website.git',
      demo: '#',
    },
    {
      title: 'To-Do List App',
      description: 'A modern to-do list application with user authentication, task categorization, priority levels, and a fully responsive design with dark mode support.',
      technologies: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Koushikmondal06/to-do-list.git',
      demo: '#',
    },
    {
      title: 'Portfolio',
      description: 'This interactive terminal-style portfolio website. Features an embedded Linux terminal for navigation, cursor-reactive background animations, and GSAP-powered scroll effects.',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP'],
      github: 'https://github.com/Koushikmondal06/Portfolio.git',
      demo: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-14" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-[#1a2332] rounded-lg mb-5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-sm text-[#8b949e] font-mono font-semibold">
              ls -la ~/projects/
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c9d1d9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Featured Projects
          </h2>
          <p className="text-[#4a5568] text-base mt-3 font-mono font-medium">
            total {projects.length} · drwxr-xr-x koushik developers
          </p>
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-[#0d1117] border border-[#1a2332] rounded-xl overflow-hidden hover:border-[#22C55E]/40 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#22C55E]/5"
              style={{ opacity: 0 }}
            >
              {/* File header */}
              <div className="flex items-center gap-3 px-5 py-3 bg-[#0a0e17] border-b border-[#1a2332]">
                <FolderOpen size={16} className="text-[#22C55E]" strokeWidth={1.5} />
                <span className="text-sm text-[#8b949e] font-mono font-semibold group-hover:text-[#c9d1d9] transition-colors">
                  {project.title.toLowerCase().replace(/\s+/g, '-')}/
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#c9d1d9] group-hover:text-[#22C55E] transition-colors mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  {project.title}
                </h3>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-5 font-medium">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-[#0a0e17] text-[#8b949e] border border-[#1a2332] font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-[#1a2332]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#22C55E] transition-colors cursor-pointer font-mono font-semibold"
                  >
                    <Github size={16} /> source
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#22C55E] transition-colors cursor-pointer font-mono font-semibold"
                    >
                      <ExternalLink size={16} /> live demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;