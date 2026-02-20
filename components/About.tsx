"use client";

import { useEffect, useRef } from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Maintainable, scalable, and efficient code following best practices.',
    },
    {
      icon: Palette,
      title: 'Design Focus',
      description: 'Visually appealing interfaces with attention to detail and UX.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing for speed, accessibility, and cross-browser compatibility.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with teams to deliver quality projects.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Cards stagger
      if (cardsRef.current) {
        const cards = gsap.utils.toArray(cardsRef.current.children);
        cards.forEach((card: any, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techTags = ['React', 'JavaScript', 'Python', 'Tailwind CSS', 'Node.js', 'Git'];

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <p className="section-heading">// about</p>
          <h2 className="section-title text-3xl sm:text-4xl">Who I Am</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div ref={contentRef} className="space-y-6" style={{ opacity: 0 }}>
            <h3
              className="text-xl font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Computer Science Student
            </h3>

            <p className="text-[var(--text-muted)] leading-relaxed">
              I'm a Computer Science student passionate about web development and creating
              innovative digital solutions. Currently learning modern technologies like React,
              Next.js, and TypeScript while building projects that solve real-world problems.
            </p>

            <p className="text-[var(--text-muted)] leading-relaxed">
              I love exploring the latest tech trends, working on personal projects,
              and collaborating with fellow students on exciting ideas.
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="card p-5 cursor-pointer" style={{ opacity: 0 }}>
                <feature.icon className="w-6 h-6 text-[var(--accent)] mb-3" strokeWidth={1.5} />
                <h4
                  className="text-sm font-semibold text-[var(--text-primary)] mb-1.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {feature.title}
                </h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;