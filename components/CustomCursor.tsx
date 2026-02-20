"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_COUNT = 8;

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<HTMLDivElement[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const isTouch = useRef(false);

    useEffect(() => {
        // Detect touch device
        isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch.current) return;

        // Activate custom cursor
        document.body.classList.add('custom-cursor-active');

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const trails = trailRefs.current;

        if (!cursor || !dot) return;

        // Set initial position off-screen
        gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
        gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
        trails.forEach(trail => {
            gsap.set(trail, { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });
        });

        // Track mouse position and update cursor with lerp
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Dot follows instantly
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.05,
                ease: 'power2.out',
            });

            // Ring follows with smooth delay
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
            });

            // Trail particles — backward fading effect
            trails.forEach((trail, i) => {
                gsap.to(trail, {
                    x: e.clientX,
                    y: e.clientY,
                    opacity: 0.4 - (i * 0.04),
                    scale: 1 - (i * 0.08),
                    duration: 0.3 + (i * 0.08),
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(trail, { opacity: 0, duration: 0.4, delay: 0.05 });
                    },
                });
            });
        };

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');

        const onEnter = () => {
            gsap.to(cursor, {
                width: 50,
                height: 50,
                borderColor: '#22C55E',
                borderWidth: 1,
                duration: 0.25,
                ease: 'power2.out',
            });
        };

        const onLeave = () => {
            gsap.to(cursor, {
                width: 20,
                height: 20,
                borderColor: '#22C55E',
                borderWidth: 2,
                duration: 0.25,
                ease: 'power2.out',
            });
        };

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.classList.remove('custom-cursor-active');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            {/* Trail particles */}
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <div
                    key={`trail-${i}`}
                    ref={el => { if (el) trailRefs.current[i] = el; }}
                    className="cursor-trail"
                    style={{
                        width: `${8 - i * 0.5}px`,
                        height: `${8 - i * 0.5}px`,
                    }}
                />
            ))}
            {/* Cursor ring */}
            <div ref={cursorRef} className="custom-cursor" />
            {/* Center dot */}
            <div ref={dotRef} className="custom-cursor--dot" />
        </>
    );
};

export default CustomCursor;
