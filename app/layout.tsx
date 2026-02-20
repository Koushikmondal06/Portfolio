import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Koushik Mondal — Developer Portfolio',
  description: 'CS student & web developer. Explore my projects, skills, and experience through an interactive terminal-style portfolio.',
  keywords: ['Koushik Mondal', 'developer', 'portfolio', 'web development', 'React', 'Next.js'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}