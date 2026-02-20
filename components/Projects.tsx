"use client";

import { useEffect, useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
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
      description: 'Decentralized crowdfunding on Ethereum Sepolia — trustless fund locking, MetaMask integration, real-time progress tracking.',
      technologies: ['Next.js', 'Solidity', 'Ethers.js', 'Hardhat'],
      github: 'https://github.com/Koushikmondal06/CrowdX',
      demo: 'https://crowdx.002014.xyz/',
      featured: true,
    },
    {
      title: 'BlockOff',
      description: 'Offline blockchain transactions via Bluetooth Low Energy mesh networking. Multi-chain EVM support with P2P relay.',
      technologies: ['React', 'Blockchain', 'BLE', 'TypeScript'],
      github: 'https://github.com/HimanshuM685/BlockOff',
      demo: 'https://blockoff.007575.xyz/',
      featured: true,
    },
    {
      title: 'Eco-Tracker',
      description: 'Collaborative task management with real-time updates, drag-and-drop, and team collaboration features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/HimanshuM685/EcoTracker.git',
      demo: 'https://eco-test-theta.vercel.app/',
      featured: false,
    },
    {
      title: 'Music Website',
      description: 'Music discovery and streaming platform with playlists, artist profiles, and responsive design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Koushikmondal06/Music-website.git',
      demo: '#',
      featured: false,
    },
    {
      title: 'To-Do List',
      description: 'Modern to-do app with authentication, task categorization, and dark mode.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Koushikmondal06/to-do-list.git',
      demo: '#',
      featured: false,
    },
    {
      title: 'Portfolio',
      description: 'This interactive terminal-style portfolio with cursor-reactive animations and GSAP effects.',
      technologies: ['React', 'TypeScript', 'Next.js', 'GSAP'],
      github: 'https://github.com/Koushikmondal06/Portfolio.git',
      demo: '#',
      featured: false,
    },
  ];

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
      if (gridRef.current) {
        const cards = gsap.utils.toArray(gridRef.current.children);
        cards.forEach((card: any, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.98 },
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

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <p className="mono-label mb-4">Selected Work</p>
          <h2 className="giant-heading text-white">
            Pro<span className="text-[var(--accent)]">jects</span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`wf-card overflow-hidden group cursor-pointer ${project.featured ? 'md:col-span-1' : ''
                }`}
              style={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${project.featured ? 'bg-[var(--accent)]' : 'bg-[#333]'}`} />
                  <span className="text-[12px] text-[#555] font-mono font-medium uppercase tracking-wide">
                    {project.featured ? 'Featured' : 'Project'}
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-[#333] group-hover:text-[var(--accent)] transition-colors" />
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-[14px] text-[#777] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-[#111] border border-[#1a1a1a] text-[#666]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-[#1a1a1a]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[var(--accent)] transition-colors font-mono font-medium cursor-pointer"
                  >
                    <Github size={15} /> Source
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[var(--accent)] transition-colors font-mono font-medium cursor-pointer"
                    >
                      <ExternalLink size={15} /> Live
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