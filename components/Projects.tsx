"use client";

import { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: 'CrowdX',
      description: 'A decentralized crowdfunding platform on Ethereum Sepolia with trustless security, smart contract-locked funds, MetaMask integration, and real-time funding progress. Features modern dark theme with glassmorphism effects and fully responsive design.',
      technologies: ['Next.js', 'Solidity', 'Ethers.js', 'Tailwind CSS', 'Hardhat', 'Framer Motion'],
      github: 'https://github.com/Koushikmondal06/CrowdX',
      demo: 'https://crowdx.002014.xyz/'
    },
    {
      title: 'BlockOff',
      description: 'Revolutionary mesh networking protocol enabling blockchain transactions offline via Bluetooth Low Energy (BLE). Supports multi-chain EVM networks with packet fragmentation, EIP-3009 meta-transactions, and peer-to-peer relay until reaching internet-connected gateway nodes.',
      technologies: ['React', 'Blockchain', 'BLE', 'Web3', 'EVM', 'TypeScript'],
      github: 'https://github.com/HimanshuM685/BlockOff',
      demo: 'https://blockoff.007575.xyz/'
    },
    {
      title: 'Eco-Tracker',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express'],
      github: 'https://github.com/HimanshuM685/EcoTracker.git',
      demo: 'https://eco-test-theta.vercel.app/'
    },
    {
      title: 'Music-Website',
      description: 'A platform for discovering and streaming music, featuring playlists, artist profiles, and social sharing.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      github: 'https://github.com/Koushikmondal06/Music-website.git',
      demo: '#'
    },
    {
      title: 'To-Do List App',
      description: 'A modern to-do list application built with React, featuring user authentication, task categorization, and a responsive design.',
      technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/Koushikmondal06/to-do-list.git',
      demo: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Portflowio is a personal portfolio website to showcase projects, skills, and experience. Built with a modern tech stack, it features a responsive design, interactive project gallery, and smooth animations for an engaging user experience.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js'],
      github: 'https://github.com/Koushikmondal06/Music-website.git',
      demo: '#'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="projects" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some projects I've built while learning web development.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="min-w-full px-4"
                >
                  <div className="group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm">
                    {/* Project Header with Gradient */}
                    <div className="relative h-48 bg-gradient-to-br from-emerald-600/20 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-black/30"></div>
                      <h3 className="relative text-3xl font-bold text-white z-10 group-hover:scale-110 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                    </div>

                    <div className="p-8">
                      <p className="text-gray-300 mb-6 text-base leading-relaxed min-h-[80px]">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-600/30 hover:bg-emerald-600/30 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                          >
                            <Github className="w-5 h-5 mr-2" />
                            View Code
                          </Button>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            size="lg"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-slate-800/80 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-slate-700 hover:border-emerald-500 z-20"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-slate-800/80 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-slate-700 hover:border-emerald-500 z-20"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${currentSlide === index
                  ? 'w-12 h-3 bg-emerald-500'
                  : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Project Counter */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Project {currentSlide + 1} of {projects.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;