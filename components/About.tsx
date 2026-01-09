"use client";

import { Code, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that follows best practices.'
    },
    {
      icon: Palette,
      title: 'Design Focus',
      description: 'Creating visually appealing interfaces with attention to detail and user experience.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and cross-browser compatibility.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with teams to deliver projects on time and exceed expectations.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Computer Science Student
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a Computer Science student passionate about web development and creating
              innovative digital solutions. Currently learning modern technologies like React,
              Next.js, and TypeScript while building projects that solve real-world problems.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              I love learning new technologies and applying them to creative projects. When I'm not
              studying or coding, you can find me exploring the latest tech trends, working on
              personal projects, or collaborating with fellow students on exciting ideas.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'JavaScript', 'Python', 'Tailwind CSS', 'Node.js', 'Git'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-600/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">
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