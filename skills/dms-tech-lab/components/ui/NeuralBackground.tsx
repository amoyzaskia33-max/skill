"use client";

import { useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseVx: number;
    baseVy: number;
    size: number;
    baseSize: number;
    color: string;
    pulsePhase: number;
    pulseSpeed: number;
}

interface EnergyPulse {
    fromIndex: number;
    toIndex: number;
    progress: number;
    speed: number;
    color: string;
}

interface NeuralBackgroundProps {
    className?: string;
    particleCount?: number;
    simpleMode?: boolean;
}

function NeuralBackgroundComponent({ className, particleCount: customParticleCount, simpleMode = true }: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Config - 모바일에서 대폭 최적화
        const isMobile = window.innerWidth < 768;
        const isLowPower = simpleMode || isMobile || navigator.hardwareConcurrency <= 4;
        // Reduced particle count for performance
        const particleCount = customParticleCount ?? (simpleMode ? 30 : (isLowPower ? 20 : 60)); 
        const connectDistance = isLowPower ? 120 : 180;
        const mouseRadius = 250;
        const mouseAttractionRadius = 350;
        const skipFrames = isLowPower ? 2 : 1; 
        let frameCount = 0;

        // Intersection Observer logic
        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        if (canvas) observer.observe(canvas);

        const particles: Particle[] = [];
        const energyPulses: EnergyPulse[] = [];
        const colors = ["#00D1FF", "#A78BFA", "#06B6D4", "#8B5CF6", "#FFFFFF"];

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            const vx = (Math.random() - 0.5) * 1.2;
            const vy = (Math.random() - 0.5) * 1.2;
            const size = Math.random() * 3 + 1.5;
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx,
                vy,
                baseVx: vx,
                baseVy: vy,
                size,
                baseSize: size,
                color: colors[Math.floor(Math.random() * colors.length)],
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;
        let isMouseActive = false;

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseActive = true;
        };

        const onMouseLeave = () => {
            isMouseActive = false;
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", onMouseLeave);

        // Spawn energy pulse between connected nodes
        const spawnEnergyPulse = () => {
            if (energyPulses.length > 25) return;
            if (Math.random() > 0.08) return;

            // Find two connected particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectDistance && Math.random() > 0.95) {
                        energyPulses.push({
                            fromIndex: i,
                            toIndex: j,
                            progress: 0,
                            speed: 0.02 + Math.random() * 0.03,
                            color: colors[Math.floor(Math.random() * 3)], // Cyan/Purple only
                        });
                        return;
                    }
                }
            }
        };

        const animate = () => {
            // 모바일에서 프레임 스킵으로 성능 향상
            frameCount++;
            if (frameCount % skipFrames !== 0) {
                animId = requestAnimationFrame(animate);
                return;
            }

            // Optimization: Skip rendering if not visible
            if (!isVisible) {
                animId = requestAnimationFrame(animate); 
                return;
            }

            time += 0.016 * skipFrames;

            // Clear with slight trail for motion blur
            ctx.fillStyle = "rgba(5, 11, 27, 0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Wave motion parameters
            const waveTime = time * 0.5;

            // Update and draw particles (성능 최적화: 범위 제한)
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // Wave motion
                const waveOffsetX = Math.sin(waveTime + p.y * 0.005) * 0.3;
                const waveOffsetY = Math.cos(waveTime + p.x * 0.005) * 0.3;

                // Update position with wave
                p.x += p.vx + waveOffsetX;
                p.y += p.vy + waveOffsetY;

                // Soft boundary bounce
                const margin = 50;
                if (p.x < -margin) p.x = canvas.width + margin;
                if (p.x > canvas.width + margin) p.x = -margin;
                if (p.y < -margin) p.y = canvas.height + margin;
                if (p.y > canvas.height + margin) p.y = -margin;

                // Mouse interaction
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (isMouseActive && dist < mouseAttractionRadius) {
                    const force = (mouseAttractionRadius - dist) / mouseAttractionRadius;

                    if (dist < mouseRadius) {
                        // Close range: gentle attraction
                        const attractForce = force * 0.8;
                        p.vx += (dx / dist) * attractForce * 0.15;
                        p.vy += (dy / dist) * attractForce * 0.15;
                    } else {
                        // Medium range: subtle pull
                        const pullForce = force * 0.3;
                        p.vx += (dx / dist) * pullForce * 0.05;
                        p.vy += (dy / dist) * pullForce * 0.05;
                    }

                    // Speed limit
                    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (speed > 3) {
                        p.vx = (p.vx / speed) * 3;
                        p.vy = (p.vy / speed) * 3;
                    }
                }

                // Gradually return to base velocity
                p.vx += (p.baseVx - p.vx) * 0.01;
                p.vy += (p.baseVy - p.vy) * 0.01;

                // Pulse animation
                p.pulsePhase += p.pulseSpeed;
                const pulseFactor = 0.7 + 0.5 * Math.sin(p.pulsePhase);
                const currentSize = p.baseSize * pulseFactor;

                // 모바일/최적화 모드에서는 간단한 렌더링
                if (isLowPower) {
                    // 간단한 원만 그리기
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = pulseFactor * (simpleMode ? 0.6 : 0.8); // Slightly dimmer in simple mode
                    ctx.fill();
                    ctx.globalAlpha = 1;
                } else {
                    // Draw glow
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(0.3, p.color + "80");
                    gradient.addColorStop(0.6, p.color + "20");
                    gradient.addColorStop(1, "transparent");

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = pulseFactor * 0.4;
                    ctx.fill();

                    // Draw core
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = pulseFactor;
                    ctx.fill();

                    // Bright center
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.globalAlpha = pulseFactor * 0.8;
                    ctx.fill();

                    ctx.globalAlpha = 1;
                }

                // Draw connections (성능 최적화: 이중 루프 범위 제한)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                    if (cdist < connectDistance) {
                        const opacity = (1 - cdist / connectDistance) * 0.5;

                        // Check if mouse is near this connection
                        let lineBoost = 1;
                        if (isMouseActive) {
                            const midX = (p.x + p2.x) / 2;
                            const midY = (p.y + p2.y) / 2;
                            const mouseToDist = Math.sqrt(
                                (mouseX - midX) ** 2 + (mouseY - midY) ** 2
                            );
                            if (mouseToDist < mouseRadius) {
                                lineBoost = 1 + (1 - mouseToDist / mouseRadius) * 2;
                            }
                        }

                        // Gradient line
                        const alpha = Math.min(1, opacity * lineBoost);
                        
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        
                        if (simpleMode || isLowPower) {
                            // 단순 모드: 단색 라인 (그라데이션 계산 생략)
                            ctx.strokeStyle = p.color;
                            ctx.globalAlpha = alpha * 0.6;
                        } else {
                            // 고품질: 그라데이션 라인
                            const lineGradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                            lineGradient.addColorStop(0, p.color);
                            lineGradient.addColorStop(1, p2.color);
                            ctx.strokeStyle = lineGradient;
                            ctx.globalAlpha = alpha;
                        }

                        ctx.lineWidth = (simpleMode ? 0.5 : 1) + (lineBoost - 1) * 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            // Update and draw energy pulses (모바일에서 비활성화)
            if (!isLowPower) {
                spawnEnergyPulse();
            }

            // 모바일에서는 에너지 펄스 렌더링 스킵
            if (isLowPower) {
                energyPulses.length = 0;
            }

            energyPulses.forEach((pulse, index) => {
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) {
                    energyPulses.splice(index, 1);
                    return;
                }

                const from = particles[pulse.fromIndex];
                const to = particles[pulse.toIndex];

                if (!from || !to) return;

                const x = from.x + (to.x - from.x) * pulse.progress;
                const y = from.y + (to.y - from.y) * pulse.progress;

                // Draw pulse glow
                const pulseGradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
                pulseGradient.addColorStop(0, pulse.color);
                pulseGradient.addColorStop(0.3, pulse.color + "AA");
                pulseGradient.addColorStop(0.6, pulse.color + "40");
                pulseGradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(x, y, 15, 0, Math.PI * 2);
                ctx.fillStyle = pulseGradient;
                ctx.fill();

                // Draw pulse core
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFFFF";
                ctx.fill();
            });

            // Mouse glow effect
            if (isMouseActive) {
                const mouseGlow = ctx.createRadialGradient(
                    mouseX, mouseY, 0,
                    mouseX, mouseY, mouseRadius
                );
                mouseGlow.addColorStop(0, "rgba(0, 209, 255, 0.08)");
                mouseGlow.addColorStop(0.5, "rgba(167, 139, 250, 0.04)");
                mouseGlow.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(mouseX, mouseY, mouseRadius, 0, Math.PI * 2);
                ctx.fillStyle = mouseGlow;
                ctx.fill();
            }

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseleave", onMouseLeave);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn("block fixed inset-0 w-full h-full z-0", className)}
            style={{ pointerEvents: "auto" }}
        />
    );
}

// React.memo로 리렌더링 최적화
export default memo(NeuralBackgroundComponent);
