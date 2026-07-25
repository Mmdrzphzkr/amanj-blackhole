"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnterLink = () => {
      if (dotRef.current)
        dotRef.current.style.transform = "translate(-50%, -50%) scale(2)";
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
        ringRef.current.style.borderColor = "rgba(245,158,11,0.6)";
      }
    };

    const handleMouseLeaveLink = () => {
      if (dotRef.current)
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(168,85,247,0.5)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
