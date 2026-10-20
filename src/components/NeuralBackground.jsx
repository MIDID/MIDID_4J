import React, { useEffect, useRef } from 'react';

const NeuralBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse Tracking
    const mouse = { x: canvas.width / 2, y: canvas.height / 2, radius: 180 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles Setup
    const particleCount = 70;
    const particles = [];
    const isLight = theme === 'light';

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;

        if (isLight) {
          const rand = Math.random();
          if (rand < 0.28) {
            this.color = 'rgba(2, 132, 199, '; // Blue
          } else if (rand < 0.52) {
            this.color = 'rgba(16, 185, 129, '; // Greenish
          } else if (rand < 0.76) {
            this.color = 'rgba(245, 158, 11, '; // Gold
          } else {
            this.color = 'rgba(225, 29, 72, '; // Red
          }
          this.alpha = Math.random() * 0.15 + 0.1;
        } else {
          this.color = Math.random() > 0.35 
            ? 'rgba(245, 158, 11, ' 
            : (Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(236, 72, 153, ');
          this.alpha = Math.random() * 0.65 + 0.25;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill canvas background for dark theme, transparent for light theme so CSS gradient shines through
      if (!isLight) {
        ctx.fillStyle = '#0f0e17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. Volumetric Light Curtains (Dark Mode Only)
        const curtainCount = 6;
        for (let i = 0; i < curtainCount; i++) {
          const barX = canvas.width * 0.55 + (i * 75) + Math.sin(time + i) * 20;
          const width = 50;
          const gradient = ctx.createLinearGradient(barX, 0, barX + width, canvas.height);
          const opacity = 0.04 + Math.sin(time * 0.5 + i * 0.8) * 0.025;

          gradient.addColorStop(0, `rgba(245, 158, 11, 0)`);
          gradient.addColorStop(0.35, `rgba(245, 158, 11, ${opacity * 1.6})`);
          gradient.addColorStop(0.7, `rgba(168, 85, 247, ${opacity})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(barX, 0, width, canvas.height);
        }

        // 2. Quantum Entanglement Orbs & Beam (Dark Mode Only)
        const orb1X = canvas.width * 0.22 + Math.sin(time * 0.7) * 45;
        const orb1Y = canvas.height * 0.42 + Math.cos(time * 0.5) * 35;
        const orb2X = canvas.width * 0.78 + Math.cos(time * 0.6) * 45;
        const orb2Y = canvas.height * 0.58 + Math.sin(time * 0.4) * 35;

        // Electric Plasma Beam
        ctx.beginPath();
        ctx.moveTo(orb1X, orb1Y);
        const midX = (orb1X + orb2X) / 2;
        const midY = (orb1Y + orb2Y) / 2 + Math.sin(time * 3) * 25;
        ctx.quadraticCurveTo(midX, midY, orb2X, orb2Y);
        
        ctx.strokeStyle = `rgba(56, 189, 248, 0.2)`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orb 1 Glow
        const gradOrb1 = ctx.createRadialGradient(orb1X, orb1Y, 5, orb1X, orb1Y, 150);
        gradOrb1.addColorStop(0, 'rgba(236, 72, 153, 0.15)');
        gradOrb1.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
        gradOrb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradOrb1;
        ctx.beginPath();
        ctx.arc(orb1X, orb1Y, 150, 0, Math.PI * 2);
        ctx.fill();

        // Orb 2 Glow
        const gradOrb2 = ctx.createRadialGradient(orb2X, orb2Y, 5, orb2X, orb2Y, 170);
        gradOrb2.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
        gradOrb2.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)');
        gradOrb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradOrb2;
        ctx.beginPath();
        ctx.arc(orb2X, orb2Y, 170, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Particles Update & Connection Web (Subtle in light mode)
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        // Mouse connection beam
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const alpha = (1 - distMouse / mouse.radius) * (isLight ? 0.15 : 0.25);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Particle web
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * (isLight ? 0.08 : 0.12);
            ctx.strokeStyle = isLight 
              ? (i % 2 === 0 ? `rgba(16, 185, 129, ${alpha})` : `rgba(2, 132, 199, ${alpha})`)
              : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default NeuralBackground;
