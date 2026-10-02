"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center z-10"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
        <span
          className="label-badge"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          FULL-STACK DEVELOPER
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
      </motion.div>

      {/* Main title */}
      <div className="text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 3.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h1
            ref={titleRef}
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black leading-none
              tracking-tighter mb-2 select-none text-display-shadow"
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(180deg, #ffffff 0%, #f1edff 55%, #c9bdf5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AMANJ
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 3.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h1
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black leading-none
              tracking-tighter select-none"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #d8b4fe, #a855f7 45%, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 2px 12px rgba(0,0,0,0.95)) drop-shadow(0 0 30px rgba(124,58,237,0.45))",
            }}
          >
            DEVS
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 4.2 }}
          className="h-px my-6 mx-auto max-w-xs"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7c3aed, #f59e0b, transparent)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.4 }}
          className="text-base md:text-lg tracking-wide max-w-md mx-auto
            leading-relaxed readable px-6 py-4 rounded-2xl"
          style={{
            fontFamily: "var(--font-body)",
            background: "rgba(0,0,5,0.55)",
            border: "1px solid rgba(168,85,247,0.18)",
            backdropFilter: "blur(12px)",
          }}
        >
          You are not visiting a website.
          <br />
          <span className="text-gradient-purple font-semibold">
            You are entering a universe.
          </span>
        </motion.p>
      </div>

      {/* Bottom indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3"
      >
        <span
          className="text-[11px] tracking-[0.5em] readable px-4 py-2 rounded-full"
          style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(0,0,5,0.6)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(124,58,237,0.8), transparent)",
          }}
        />
      </motion.div>

      {/* Side labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex
          flex-col gap-6"
      >
        {["React", "Next.js", ".NET", "Python"].map((tech, i) => (
          <span
            key={tech}
            className="text-[11px] tracking-[0.3em] readable hover:text-purple-300
              transition-colors cursor-default px-2 py-1 rounded-md"
            style={{
              fontFamily: "var(--font-mono)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              background: "rgba(0,0,5,0.55)",
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex
          flex-col gap-2 items-end"
      >
        <div
          className="text-[11px] tracking-[0.3em] readable px-3 py-1.5 rounded-md"
          style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,5,0.55)" }}
        >
          25 YO DEVELOPER
        </div>
        <div
          className="text-[11px] tracking-[0.3em] readable px-3 py-1.5 rounded-md"
          style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,5,0.55)" }}
        >
          4+ YEARS EXP
        </div>
        <div
          className="text-[11px] tracking-[0.3em] px-3 py-1.5 rounded-md text-glow-purple"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#d8b4fe",
            background: "rgba(0,0,5,0.65)",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          AMANJ DEVS TEAM
        </div>
      </motion.div>
    </section>
  );
}
