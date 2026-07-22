"use client";

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import ScrollGlobeBackground from '@/components/ScrollGlobeBackground';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Scroll Globe background animation */}
      <ScrollGlobeBackground />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
