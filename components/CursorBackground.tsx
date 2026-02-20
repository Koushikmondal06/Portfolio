"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });
    const particles = useRef<Array<{
        x: number;
        y: number;
        baseX: number;
        baseY: number;
        size: number;
        speed: number;
        alpha: number;
    }>>([]);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Initialize particles
        const initParticles = () => {
            const count = Math.floor((canvas.width * canvas.height) / 8000);
            particles.current = Array.from({ length: Math.min(count, 200) }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseX: Math.random() * canvas.width,
                baseY: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2,
                alpha: Math.random() * 0.5 + 0.1,
            }));
        };

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            // Smooth lerp for mouse position
            mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.08;
            mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.08;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw radial glow at cursor position
            const gradient = ctx.createRadialGradient(
                mousePos.current.x, mousePos.current.y, 0,
                mousePos.current.x, mousePos.current.y, 350
            );
            gradient.addColorStop(0, 'rgba(34, 197, 94, 0.08)');
            gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.03)');
            gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update particles
            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            particles.current.forEach((p) => {
                // Calculate distance from cursor
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 250;

                if (dist < maxDist) {
                    // Push particles away from cursor
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 3;
                    p.y -= Math.sin(angle) * force * 3;
                } else {
                    // Drift back to base position
                    p.x += (p.baseX - p.x) * 0.01;
                    p.y += (p.baseY - p.y) * 0.01;
                }

                // Gentle floating
                p.x += Math.sin(Date.now() * 0.001 * p.speed) * 0.3;
                p.y += Math.cos(Date.now() * 0.001 * p.speed) * 0.3;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const pAlpha = dist < maxDist
                    ? p.alpha + (1 - dist / maxDist) * 0.4
                    : p.alpha;
                ctx.fillStyle = `rgba(34, 197, 94, ${pAlpha})`;
                ctx.fill();

                // Draw connections to nearby particles
                particles.current.forEach((p2) => {
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 100 && d > 0) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const lineAlpha = (1 - d / 100) * 0.08;
                        ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            // Draw grid lines that warp near cursor
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.03)';
            ctx.lineWidth = 0.5;
            const gridSize = 60;

            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                for (let y = 0; y < canvas.height; y += 5) {
                    const dx = mx - x;
                    const dy = my - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const warp = dist < 200 ? (200 - dist) / 200 * 15 : 0;
                    const angle = Math.atan2(dy, dx);
                    const wx = x - Math.cos(angle) * warp;

                    if (y === 0) ctx.moveTo(wx, y);
                    else ctx.lineTo(wx, y);
                }
                ctx.stroke();
            }

            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 5) {
                    const dx = mx - x;
                    const dy = my - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const warp = dist < 200 ? (200 - dist) / 200 * 15 : 0;
                    const angle = Math.atan2(dy, dx);
                    const wy = y - Math.sin(angle) * warp;

                    if (x === 0) ctx.moveTo(x, wy);
                    else ctx.lineTo(x, wy);
                }
                ctx.stroke();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

        // Set initial mouse position to center
        targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'var(--bg-primary)' }}
        />
    );
};

export default CursorBackground;
