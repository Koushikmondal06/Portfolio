"use client";

import { useEffect, useRef } from 'react';

const CursorBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });
    const particles = useRef<Array<{
        x: number; y: number; baseX: number; baseY: number;
        size: number; speed: number; alpha: number;
    }>>([]);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const count = Math.floor((canvas.width * canvas.height) / 10000);
            particles.current = Array.from({ length: Math.min(count, 150) }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseX: Math.random() * canvas.width,
                baseY: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speed: Math.random() * 0.4 + 0.1,
                alpha: Math.random() * 0.4 + 0.05,
            }));
        };

        const onMouseMove = (e: MouseEvent) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.06;
            mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.06;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Radial glow — purple
            const gradient = ctx.createRadialGradient(
                mousePos.current.x, mousePos.current.y, 0,
                mousePos.current.x, mousePos.current.y, 400
            );
            gradient.addColorStop(0, 'rgba(108, 68, 252, 0.06)');
            gradient.addColorStop(0.5, 'rgba(108, 68, 252, 0.02)');
            gradient.addColorStop(1, 'rgba(108, 68, 252, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            // Particles
            particles.current.forEach((p) => {
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 250;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 2.5;
                    p.y -= Math.sin(angle) * force * 2.5;
                } else {
                    p.x += (p.baseX - p.x) * 0.01;
                    p.y += (p.baseY - p.y) * 0.01;
                }

                p.x += Math.sin(Date.now() * 0.001 * p.speed) * 0.2;
                p.y += Math.cos(Date.now() * 0.001 * p.speed) * 0.2;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const pAlpha = dist < maxDist ? p.alpha + (1 - dist / maxDist) * 0.3 : p.alpha;
                ctx.fillStyle = `rgba(108, 68, 252, ${pAlpha})`;
                ctx.fill();

                // Connections
                particles.current.forEach((p2) => {
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 80 && d > 0) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(108, 68, 252, ${(1 - d / 80) * 0.06})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                });
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
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
            style={{ background: '#050505' }}
        />
    );
};

export default CursorBackground;
