"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface TerminalLine {
    type: 'input' | 'output' | 'success' | 'error' | 'info';
    content: string;
}

const SECTIONS = ['home', 'projects', 'skills', 'contact'];

const ASCII_ART = `  _  __               _     _ _    
 | |/ /___  _   _ ___| |__ (_) | __
 | ' // _ \\| | | / __| '_ \\| | |/ /
 | . \\ (_) | |_| \\__ \\ | | | |   < 
 |_|\\_\\___/ \\__,_|___/_| |_|_|_|\\_\\`;

const HELP_TEXT = `  COMMAND        DESCRIPTION
  ───────        ───────────
  ls             list sections
  cd <section>   navigate to section
  cat readme     show info about me
  neofetch       system info
  help           show this help
  clear          clear terminal`;

const NEOFETCH = `  koushik@portfolio
  ─────────────────
  OS:      Portfolio Linux x86_64
  Host:    localhost:3000
  Shell:   bash 5.1.16
  Stack:   React / Next.js / TypeScript
  Theme:   Terminal Green [#22C55E]
  Font:    JetBrains Mono
  Uptime:  always online`;

const CAT_README = `  # Koushik Mondal
  
  CS Student & Web Developer
  
  > Passionate about building innovative
  > digital solutions with modern tech.
  
  Languages: JavaScript, TypeScript, C, Java, Python
  Frontend:  React, Next.js, Tailwind CSS
  Backend:   Node.js, Express, MongoDB
  Web3:      Solidity, Ethers.js, Hardhat
  
  GitHub:    github.com/Koushikmondal06
  LinkedIn:  linkedin.com/in/koushik-mondal-011308329
  Email:     koushikmondal0069@gmail.com`;

const Terminal = () => {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'info', content: ASCII_ART },
        { type: 'success', content: '  Welcome! Type "help" for available commands.\n' },
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isAutoTyping, setIsAutoTyping] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAutoTyped = useRef(false);

    // Auto-scroll to bottom
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [lines]);

    // GSAP entrance
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
            );
        }
    }, []);

    // Auto-type demo
    useEffect(() => {
        if (hasAutoTyped.current) return;
        hasAutoTyped.current = true;

        const autoType = async () => {
            await new Promise(r => setTimeout(r, 1000));
            const cmd = 'ls';
            for (let i = 0; i <= cmd.length; i++) {
                await new Promise(r => setTimeout(r, 100));
                setInput(cmd.substring(0, i));
            }
            await new Promise(r => setTimeout(r, 300));
            executeCommand(cmd);
            setInput('');
            setIsAutoTyping(false);
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
            { type: 'input', content: `koushik@portfolio:~$ ${cmd}` },
        ];

        switch (command) {
            case 'ls':
                newLines.push({
                    type: 'output',
                    content: SECTIONS.map(s => `  drwxr-xr-x  ${s}/`).join('\n'),
                });
                break;

            case 'cd': {
                if (!arg) {
                    newLines.push({ type: 'error', content: '  bash: cd: missing operand' });
                    break;
                }
                const match = SECTIONS.find(s => s === arg || s.startsWith(arg));
                if (match) {
                    newLines.push({ type: 'success', content: `  → navigating to /${match}` });
                    setTimeout(() => scrollToSection(match), 300);
                } else {
                    newLines.push({ type: 'error', content: `  bash: cd: ${arg}: No such directory` });
                }
                break;
            }

            case 'cat':
                if (arg === 'readme' || arg === 'readme.md') {
                    newLines.push({ type: 'output', content: CAT_README });
                } else {
                    newLines.push({ type: 'error', content: `  cat: ${arg || '???'}: No such file` });
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
                newLines.push({ type: 'output', content: '  /home/koushik/portfolio' });
                break;

            case 'whoami':
                newLines.push({ type: 'output', content: '  koushik' });
                break;

            case '':
                setLines(prev => [...prev, ...newLines]);
                return;

            default: {
                const sectionMatch = SECTIONS.find(s => s === command || s.startsWith(command));
                if (sectionMatch) {
                    newLines.push({ type: 'success', content: `  → navigating to /${sectionMatch}` });
                    setTimeout(() => scrollToSection(sectionMatch), 300);
                } else {
                    newLines.push({ type: 'error', content: `  bash: ${command}: command not found` });
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
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Tab completion
            const partial = input.trim().toLowerCase();
            const commands = ['ls', 'cd', 'cat', 'neofetch', 'help', 'clear', 'pwd', 'whoami'];
            const match = commands.find(c => c.startsWith(partial));
            if (match) setInput(match);
        }
    };

    return (
        <div
            ref={containerRef}
            className="w-full max-w-2xl mx-auto relative"
            style={{ opacity: 0 }}
        >
            {/* Terminal window */}
            <div className="bg-[#0a0e17] border border-[#1a2332] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] border-b border-[#1a2332]">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-[13px] text-[#4a5568] font-mono select-none font-medium">
                        koushik@portfolio: ~
                    </span>
                </div>

                {/* Terminal body */}
                <div
                    ref={bodyRef}
                    className="px-5 py-4 min-h-[240px] max-h-[360px] overflow-y-auto font-mono text-[15px] leading-relaxed cursor-text font-medium"
                    onClick={() => inputRef.current?.focus()}
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a2332 transparent' }}
                >
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={
                                line.type === 'input' ? 'text-[#c9d1d9] font-semibold' :
                                    line.type === 'success' ? 'text-[#22C55E] font-semibold' :
                                        line.type === 'error' ? 'text-[#f87171] font-semibold' :
                                            line.type === 'info' ? 'text-[#22C55E] font-bold' :
                                                'text-[#8b949e] font-medium'
                            }
                        >
                            <pre className="whitespace-pre-wrap text-[15px]">{line.content}</pre>
                        </div>
                    ))}

                    {/* Input line */}
                    <form onSubmit={handleSubmit} className="flex items-center mt-1">
                        <span className="text-[#22C55E] font-bold mr-2 whitespace-nowrap text-[15px]">
                            koushik@portfolio<span className="text-[#8b949e]">:</span><span className="text-[#58a6ff]">~</span><span className="text-[#8b949e]">$</span>
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9] font-mono text-[15px] font-semibold caret-[#22C55E]"
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
