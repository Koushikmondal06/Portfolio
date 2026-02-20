"use client";

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

// Dynamic imports for heavy client-only components
const CursorBackground = dynamic(() => import('@/components/CursorBackground'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Cursor-oriented background animation */}
      <CursorBackground />

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