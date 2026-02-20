"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface TerminalLine {
    type: 'input' | 'output' | 'success' | 'error' | 'info';
    content: string;
}

const SECTIONS = ['home', 'projects', 'skills', 'contact'];

const HELP_TEXT = `  COMMAND         DESCRIPTION
  ───────         ───────────
  ls              list sections
  cd <section>    navigate to section
  cat readme      about me
  neofetch        system info
  help            show this help
  clear           clear terminal`;

const NEOFETCH = `  koushik@portfolio
  ─────────────────
  OS:      Portfolio v2.0
  Host:    002014.xyz
  Shell:   bash 5.1
  Stack:   Next.js / TypeScript / Solidity / Ethers.js
  Theme:   Electric Purple [#6c44fc]
  Font:    JetBrains Mono
  Uptime:  always online`;

const CAT_README = `  ┌─────────────────────────────────┐
  │  KOUSHIK MONDAL                │
  │  CS Student & Web Developer    │
  └─────────────────────────────────┘
  
  Languages: JavaScript, TypeScript, C, Java
  Frontend:  React, Next.js, Tailwind CSS
  Backend:   Node.js, Express, MongoDB
  Web3:      Solidity, Ethers.js, Hardhat
  
  github.com/Koushikmondal06
  koushikmondal0069@gmail.com`;

const Terminal = () => {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'info', content: '  ▸ koushik@portfolio — interactive terminal v2.0' },
        { type: 'success', content: '  Type "help" for commands.\n' },
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAutoTyped = useRef(false);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
            );
        }
    }, []);

    // Auto-type demo
    useEffect(() => {
        if (hasAutoTyped.current) return;
        hasAutoTyped.current = true;

        const autoType = async () => {
            await new Promise(r => setTimeout(r, 1200));
            const cmd = 'neofetch';
            for (let i = 0; i <= cmd.length; i++) {
                await new Promise(r => setTimeout(r, 80));
                setInput(cmd.substring(0, i));
            }
            await new Promise(r => setTimeout(r, 400));
            executeCommand(cmd);
            setInput('');
        };
        autoType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToSection = useCallback((sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const executeCommand = useCallback((cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const parts = trimmed.split(/\s+/);
        const command = parts[0];
        const arg = parts.slice(1).join(' ');

        const newLines: TerminalLine[] = [
            { type: 'input', content: `  $ ${cmd}` },
        ];

        switch (command) {
            case 'ls':
                newLines.push({
                    type: 'output',
                    content: SECTIONS.map(s => `  📁 ${s}/`).join('\n'),
                });
                break;

            case 'cd': {
                if (!arg) {
                    newLines.push({ type: 'error', content: '  ✗ missing argument' });
                    break;
                }
                const match = SECTIONS.find(s => s === arg || s.startsWith(arg));
                if (match) {
                    newLines.push({ type: 'success', content: `  → ${match}/` });
                    setTimeout(() => scrollToSection(match), 300);
                } else {
                    newLines.push({ type: 'error', content: `  ✗ "${arg}" not found` });
                }
                break;
            }

            case 'cat':
                if (arg === 'readme' || arg === 'readme.md') {
                    newLines.push({ type: 'output', content: CAT_README });
                } else {
                    newLines.push({ type: 'error', content: `  ✗ "${arg || '???'}" not found` });
                }
                break;

            case 'neofetch':
                newLines.push({ type: 'success', content: NEOFETCH });
                break;

            case 'help':
                newLines.push({ type: 'output', content: HELP_TEXT });
                break;

            case 'clear':
                setLines([]);
                return;

            case 'pwd':
                newLines.push({ type: 'output', content: '  ~/portfolio' });
                break;

            case 'whoami':
                newLines.push({ type: 'output', content: '  koushik' });
                break;

            case '':
                setLines(prev => [...prev, ...newLines]);
                return;

            default: {
                const sectionMatch = SECTIONS.find(s => s === command);
                if (sectionMatch) {
                    newLines.push({ type: 'success', content: `  → ${sectionMatch}/` });
                    setTimeout(() => scrollToSection(sectionMatch), 300);
                } else {
                    newLines.push({ type: 'error', content: `  ✗ command not found: ${command}` });
                }
            }
        }

        setLines(prev => [...prev, ...newLines]);
        setHistory(prev => [cmd, ...prev]);
        setHistoryIndex(-1);
    }, [scrollToSection]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const idx = historyIndex + 1;
                setHistoryIndex(idx);
                setInput(history[idx]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const idx = historyIndex - 1;
                setHistoryIndex(idx);
                setInput(history[idx]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const commands = ['ls', 'cd', 'cat', 'neofetch', 'help', 'clear', 'pwd', 'whoami'];
            const match = commands.find(c => c.startsWith(input.trim().toLowerCase()));
            if (match) setInput(match);
        }
    };

    return (
        <div
            ref={containerRef}
            className="w-full max-w-2xl mx-auto"
            style={{ opacity: 0 }}
        >
            <div className="wf-card overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0a0a0a] border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] text-[#444] font-mono">
                        terminal — koushik@portfolio
                    </span>
                    <div className="w-16" />
                </div>

                {/* Body */}
                <div
                    ref={bodyRef}
                    className="px-5 py-4 min-h-[200px] max-h-[320px] overflow-y-auto font-mono text-[14px] leading-relaxed cursor-text"
                    onClick={() => inputRef.current?.focus()}
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a1a1a transparent' }}
                >
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={
                                line.type === 'input' ? 'text-white font-semibold' :
                                    line.type === 'success' ? 'text-[var(--accent-light)]' :
                                        line.type === 'error' ? 'text-[#f87171]' :
                                            line.type === 'info' ? 'text-[var(--accent)] font-bold' :
                                                'text-[#777]'
                            }
                        >
                            <pre className="whitespace-pre-wrap text-[14px]">{line.content}</pre>
                        </div>
                    ))}

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="flex items-center mt-1">
                        <span className="text-[var(--accent)] font-bold mr-2 text-[14px]">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[14px] font-medium caret-[var(--accent)]"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            aria-label="Terminal input"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
