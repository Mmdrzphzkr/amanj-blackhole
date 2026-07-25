"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(0);

  const phases = [
    "INITIALIZING VOID...",
    "CALIBRATING GRAVITY...",
    "WARPING SPACETIME...",
    "ENTERING THE SINGULARITY...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 600);
          return 100;
        }
        return next;
      });
    }, 40);

    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, phases.length - 1));
    }, 700);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#000005" }}
        >
          {/* Black hole loading visual */}
          <div className="relative mb-12">
            {/* Outer rings */}
            {[100, 80, 60, 40].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-purple-500/20"
                style={{
                  width: size * 1.5,
                  height: size * 1.5,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Core */}
            <motion.div
              className="relative w-24 h-24 rounded-full"
              style={{
                background: "radial-gradient(circle, #1a0040 0%, #000005 70%)",
                boxShadow:
                  "0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.2)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Accretion hint */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(124,58,237,0.3), rgba(245,158,11,0.2), transparent)",
                }}
              />
            </motion.div>
          </div>

          {/* Progress */}
          <div className="w-64 mb-6">
            <div className="flex justify-between mb-2">
              <span
                className="text-xs tracking-widest text-purple-400"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {phases[phase]}
              </span>
              <span
                className="text-xs text-purple-300"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {Math.floor(progress)}%
              </span>
            </div>
            <div className="h-px bg-purple-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #f59e0b)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div
              className="text-2xl font-bold tracking-[0.3em] text-white mb-1"
              style={{ fontFamily: "var(--font-display, sans-serif)" }}
            >
              AMANJ <span style={{ color: "#7c3aed" }}>DEVS</span>
            </div>
            <div
              className="text-xs tracking-[0.5em] text-purple-400/60"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              DIGITAL UNIVERSE
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
