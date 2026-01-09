"use client";

import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const words = ['CS Student', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentIndex((current) => (current + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting, words]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Effects with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-emerald-900/20"></div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>
      </div>

      {/* Floating blobs with parallax */}
      <div
        className="absolute top-20 left-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
        }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float"
        style={{
          animationDelay: '2s',
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float"
        style={{
          animationDelay: '4s',
          transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px)`
        }}
      ></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white mb-2 hover:scale-105 transition-transform duration-300">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent animate-gradient hover:scale-105 transition-transform duration-300">
              Koushik Mondal
            </span>
          </h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="border-r-2 border-emerald-500 pr-1 animate-pulse">
              {text}
            </span>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed hover:text-gray-300 transition-colors duration-300">
            Passionate about creating beautiful, functional, and user-centered digital experiences.
            I bring ideas to life through code and design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-center sm:text-left">
          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => scrollToAbout()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/50 animate-pulse-glow"
          >
            View My Work
          </Button>

          {/* Meme Text */}
          <p className="text-gray-400 text-base sm:text-lg max-w-md hover:text-gray-300 transition-colors duration-300">
            <span className="inline-block animate-wiggle">
              🐛
            </span>{" "}
            If it works, it's not a bug — it's a feature.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          {[
            { icon: Github, href: 'https://github.com/Koushikmondal06', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/koushik-mondal-011308329/', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email' },
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              className="p-3 rounded-full bg-slate-800/50 text-gray-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 hover:scale-125 hover:rotate-12 animate-pulse-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        <button
          onClick={scrollToAbout}
          className="animate-bounce text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;