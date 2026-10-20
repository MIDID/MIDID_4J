import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WaterRippleCursor = ({ theme = 'dark' }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* Outer Water Droplet / Caustic Ring */}
      <motion.div
        className="fixed rounded-full border border-cyan-400/50 backdrop-blur-[1px]"
        animate={{
          x: pos.x - (isHovered ? 28 : 16),
          y: pos.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          scale: isClicked ? 0.85 : 1,
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.85)' : 'rgba(6, 182, 212, 0.45)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 25px rgba(6, 182, 212, 0.35)' : 'none'
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 350,
          mass: 0.4
        }}
      />

      {/* Inner Fluid Core Point */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,1)]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isHovered ? 1.5 : (isClicked ? 0.5 : 1)
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 550,
          mass: 0.1
        }}
      />
    </div>
  );
};

export default WaterRippleCursor;
