import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Hide mouse cursor on load
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hover state management
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], [data-hover='true']"
      );
      targets.forEach((target) => {
        if (target.getAttribute('data-cursor-bound')) return;
        target.setAttribute('data-cursor-bound', 'true');
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const interval = setInterval(addHoverListeners, 1000);
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(interval);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Exact center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: clicked ? 0.6 : hovered ? 1.5 : 1,
          backgroundColor: hovered ? "#10b981" : "#ffffff", // Emerald on hover, white on idle
        }}
      />
      {/* Spring follower ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{
          x: followerX,
          y: followerY,
          width: hovered ? 42 : 24,
          height: hovered ? 42 : 24,
          borderColor: hovered ? "#10b981" : "#6366f1", // Emerald on hover, Indigo on idle
          borderWidth: hovered ? '1.5px' : '1px',
          boxShadow: hovered ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
        }}
      />
    </>
  );
}
