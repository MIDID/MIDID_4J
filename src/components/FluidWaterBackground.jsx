import React, { useEffect, useRef } from 'react';

const FluidWaterBackground = ({ theme = 'dark' }) => {
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

    // Mouse Tracking for Hydrodynamic Waves
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      radius: 140,
      isMoving: false
    };

    let moveTimeout;
    const handleMouseMove = (e) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.5, 30);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isMoving = true;

      // Spawn fluid ripples on motion
      if (mouse.speed > 3 && ripples.length < 25) {
        ripples.push(new WaterRipple(mouse.x, mouse.y, mouse.speed));
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        mouse.isMoving = false;
        mouse.speed = 0;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Click creates a major shockwave
    const handlePointerDown = (e) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          ripples.push(new WaterRipple(e.clientX, e.clientY, 25 - i * 5, 2.5 + i * 0.8));
        }, i * 70);
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);

    // Water Ripple Simulation
    class WaterRipple {
      constructor(x, y, intensity = 10, expandRate = 3.5) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = Math.min(220, 80 + intensity * 6);
        this.opacity = Math.min(0.65, 0.2 + intensity * 0.02);
        this.expandRate = expandRate;
      }

      update() {
        this.radius += this.expandRate;
        this.opacity *= 0.96;
      }

      draw(context) {
        if (this.opacity <= 0.01) return;
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = theme === 'light' 
          ? `rgba(2, 132, 199, ${this.opacity * 0.7})` 
          : `rgba(56, 189, 248, ${this.opacity})`;
        context.lineWidth = Math.max(1, 4 * (1 - this.radius / this.maxRadius));
        context.stroke();

        // Inner caustic refraction ring
        context.beginPath();
        context.arc(this.x, this.y, Math.max(0, this.radius - 12), 0, Math.PI * 2);
        context.strokeStyle = theme === 'light'
          ? `rgba(14, 165, 233, ${this.opacity * 0.3})`
          : `rgba(168, 85, 247, ${this.opacity * 0.4})`;
        context.lineWidth = 1.5;
        context.stroke();
        context.restore();
      }
    }

    const ripples = [];

    // Floating Underwater Plankton & Bubbles
    const bubbleCount = 45;
    class UnderwaterBubble {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20 + Math.random() * 50;
        this.size = Math.random() * 3.5 + 1.2;
        this.vy = -(Math.random() * 0.8 + 0.35); // Buoyancy upward speed
        this.vx = (Math.random() - 0.5) * 0.3;
        this.wobbleSpeed = Math.random() * 0.03 + 0.015;
        this.wobbleAmp = Math.random() * 2.2 + 0.5;
        this.time = Math.random() * 100;
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.time += this.wobbleSpeed;
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.time) * 0.4;

        // Mouse repulsion: water currents push bubbles away from cursor
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 3;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.y < -20) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (theme === 'light') {
          context.fillStyle = `rgba(2, 132, 199, ${this.alpha * 0.4})`;
          context.strokeStyle = `rgba(14, 165, 233, ${this.alpha * 0.8})`;
        } else {
          // Bioluminescent deep-ocean glow
          context.fillStyle = `rgba(56, 189, 248, ${this.alpha * 0.45})`;
          context.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
        }

        context.lineWidth = 0.8;
        context.fill();
        context.stroke();

        // Tiny specular highlight inside bubble
        context.beginPath();
        context.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.25, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.6)';
        context.fill();
        context.restore();
      }
    }

    const bubbles = Array.from({ length: bubbleCount }, () => new UnderwaterBubble());

    // Bioluminescent Plankton Swarm
    const planktonCount = 35;
    class Plankton {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.6;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.baseAlpha = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.04 + 0.02;
        this.phase = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.4 ? '56, 189, 248' : (Math.random() > 0.5 ? '168, 85, 247' : '245, 158, 11');
      }

      update(t) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(context, t) {
        const pulse = Math.sin(t * this.pulseSpeed + this.phase);
        const alpha = Math.max(0.1, this.baseAlpha + pulse * 0.25);
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${this.color}, ${alpha})`;
        context.shadowColor = `rgba(${this.color}, 0.8)`;
        context.shadowBlur = 8;
        context.fill();
        context.restore();
      }
    }

    const planktons = Array.from({ length: planktonCount }, () => new Plankton());

    let globalTime = 0;

    // Render Loop
    const render = () => {
      globalTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isLight = theme === 'light';

      // 1. Underwater Caustic Sunlight Beams (God Rays piercing the abyss)
      const rayCount = 7;
      for (let i = 0; i < rayCount; i++) {
        const rayAngle = -0.15 + (i * 0.06);
        const startX = width * (0.15 + i * 0.12) + Math.sin(globalTime * 0.4 + i) * 35;
        const rayWidth = 70 + Math.sin(globalTime * 0.6 + i) * 20;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX + rayWidth, 0);
        ctx.lineTo(startX + rayWidth + Math.tan(rayAngle) * height + 120, height);
        ctx.lineTo(startX + Math.tan(rayAngle) * height - 60, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(startX, 0, startX + 60, height);
        const rayAlpha = (0.04 + Math.sin(globalTime * 0.7 + i * 1.2) * 0.025) * (isLight ? 0.6 : 1.2);
        
        if (isLight) {
          grad.addColorStop(0, `rgba(14, 165, 233, ${rayAlpha * 1.5})`);
          grad.addColorStop(0.4, `rgba(56, 189, 248, ${rayAlpha * 0.8})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          grad.addColorStop(0, `rgba(56, 189, 248, ${rayAlpha * 1.8})`);
          grad.addColorStop(0.35, `rgba(6, 182, 212, ${rayAlpha})`);
          grad.addColorStop(0.7, `rgba(168, 85, 247, ${rayAlpha * 0.5})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // 2. Dynamic Fluid Surface Sine Wave Overlay
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width; x += 20) {
        const waveY = 18 + Math.sin(x * 0.008 + globalTime) * 12 + Math.cos(x * 0.015 - globalTime * 0.7) * 8;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fillStyle = isLight ? 'rgba(14, 165, 233, 0.08)' : 'rgba(56, 189, 248, 0.05)';
      ctx.fill();
      ctx.restore();

      // 3. Update & Draw Water Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.update();
        ripple.draw(ctx);
        if (ripple.opacity <= 0.01 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // 4. Update & Draw Underwater Plankton
      planktons.forEach(p => {
        p.update(globalTime);
        p.draw(ctx, globalTime);
      });

      // 5. Update & Draw Bubbles
      bubbles.forEach(b => {
        b.update();
        b.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* High-Resolution Ocean Photography Depth Canvas Layer */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          theme === 'light' ? 'opacity-15' : 'opacity-35'
        }`}
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/ocean_abyss.jpg')`,
          filter: theme === 'light' ? 'saturate(1.2) brightness(1.1)' : 'brightness(0.65) contrast(1.2)'
        }}
      />

      {/* Fluid Caustics Refraction Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-top mix-blend-screen opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/ocean_caustics.jpg')`,
          animation: 'pulse 8s ease-in-out infinite alternate'
        }}
      />

      {/* Atmospheric Ocean Depth Vignette & Abyss Gradient */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'light'
          ? 'bg-gradient-to-b from-sky-100/40 via-transparent to-sky-200/50'
          : 'bg-gradient-to-b from-[#050b18]/80 via-[#071126]/60 to-[#030611]/95'
      }`} />

      {/* Interactive Hydrodynamic Wave & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default FluidWaterBackground;
