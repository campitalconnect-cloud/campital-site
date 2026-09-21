import React, { useEffect, useRef } from 'react';

export const Animated3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D parallax depth
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Node particles representing Campus (Blue) and Capital (Violet/Cyan)
    const NUM_PARTICLES = Math.min(Math.floor(width / 32), 45);
    const particles = [];

    const colors = [
      'rgba(0, 102, 255, ',   // Royal Blue (Logo Primary)
      'rgba(0, 82, 255, ',    // Azure Blue (Logo Graduate Cap)
      'rgba(0, 180, 216, ',   // Vibrant Cyan / Teal
      'rgba(56, 189, 248, ',  // Sky Azure Glow
    ];

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // 3D depth layer (0.2 far to 1.0 near)
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    let gridOffset = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Perspective Grid at the bottom
      const horizonY = height * 0.55;
      gridOffset = (gridOffset + 0.3) % 40;

      ctx.save();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
      ctx.lineWidth = 1;

      // Vertical perspective lines converging to horizon
      const perspectiveLines = 14;
      const fovCenter = width * 0.5 + (mouse.x - width * 0.5) * 0.05;

      for (let i = -perspectiveLines; i <= perspectiveLines; i++) {
        const startX = fovCenter + i * (width / (perspectiveLines * 0.85));
        ctx.beginPath();
        ctx.moveTo(fovCenter, horizonY);
        ctx.lineTo(startX, height);
        ctx.stroke();
      }

      // Horizontal perspective grid rungs
      for (let y = horizonY; y < height; y += (y - horizonY) * 0.25 + 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw 3D Connected Node Network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        p.pulse += p.pulseSpeed;

        // Wrap edges with padding
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // 3D Parallax offset based on depth Z
        const parallaxX = (mouse.x - width / 2) * (p.z * 0.035);
        const parallaxY = (mouse.y - height / 2) * (p.z * 0.035);
        const drawX = p.x + parallaxX;
        const drawY = p.y + parallaxY;

        const currentRadius = p.radius * p.z * (1 + Math.sin(p.pulse) * 0.25);
        const alpha = (0.35 + Math.sin(p.pulse) * 0.15) * p.z;

        // Draw connections between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2DrawX = p2.x + (mouse.x - width / 2) * (p2.z * 0.035);
          const p2DrawY = p2.y + (mouse.y - height / 2) * (p2.z * 0.035);

          const dx = drawX - p2DrawX;
          const dy = drawY - p2DrawY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150 * ((p.z + p2.z) / 2);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18 * ((p.z + p2.z) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `${p.colorBase}${lineAlpha})`;
            ctx.lineWidth = 1 * ((p.z + p2.z) / 2);
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2DrawX, p2DrawY);
            ctx.stroke();
          }
        }

        // Draw Particle Node with Outer Glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, currentRadius * 3);
        gradient.addColorStop(0, `${p.colorBase}${alpha})`);
        gradient.addColorStop(0.4, `${p.colorBase}${alpha * 0.5})`);
        gradient.addColorStop(1, `${p.colorBase}0)`);

        ctx.fillStyle = gradient;
        ctx.arc(drawX, drawY, currentRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.arc(drawX, drawY, currentRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Dynamic 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Luminous Neon Gradient Mesh Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'floatOrb 14s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '45%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(6, 182, 212, 0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'floatOrb 18s ease-in-out infinite alternate-reverse',
        }}
      />

      <style>{`
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
          100% { transform: translate(-30px, 40px) scale(0.95); }
        }
      `}</style>
    </div>
  );
};
