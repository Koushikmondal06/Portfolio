"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

const VantaBackground = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    const initVanta = () => {
        if (!vantaEffect && window.VANTA && window.THREE && vantaRef.current) {
            setVantaEffect(
                window.VANTA.GLOBE({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x2e15a7,
                    backgroundColor: 0x111116,
                    backgroundAlpha: 0.0
                })
            );
        }
    };

    useEffect(() => {
        // Attempt init on mount just in case
        initVanta();

        return () => {
            // Clean up VANTA effect
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="lazyOnload"
                onLoad={initVanta}
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
                strategy="lazyOnload"
                onLoad={initVanta}
            />

            <div
                ref={vantaRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ width: '100%', height: '100%', opacity: 0.6 }}
            />
        </>
    );
};

export default VantaBackground;
