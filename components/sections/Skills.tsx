"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/Constants";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<string | null>(null);

  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));

  return (
    <section id="skills" className="section-container relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-16"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-500/60 mb-4 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 002 ] — ELEMENTS
          </div>
          <h2
            className="text-5xl md:text-7xl font-black text-center leading-none"
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TECH
            <br />
            ARSENAL
          </h2>
        </motion.div>

        {/* Orbital Skill Display */}
        <div className="relative">
          {/* Center point */}
          <div className="flex flex-wrap gap-4 justify-center">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  type: "spring",
                  stiffness: 200,
                }}
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative group cursor-pointer"
              >
                <div
                  className="relative px-5 py-3 rounded-full transition-all duration-500"
                  style={{
                    background:
                      hovered === skill.name
                        ? `${skill.color}20`
                        : "rgba(10,0,32,0.6)",
                    border: `1px solid ${
                      hovered === skill.name
                        ? skill.color
                        : "rgba(124,58,237,0.15)"
                    }`,
                    boxShadow:
                      hovered === skill.name
                        ? `0 0 30px ${skill.color}30, 0 0 60px ${skill.color}10`
                        : "none",
                    transform:
                      hovered === skill.name ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: skill.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: hovered === skill.name ? skill.color : "#94a3b8",
                      }}
                    >
                      {skill.name}
                    </span>
                    {hovered === skill.name && (
                      <span
                        className="text-xs"
                        style={{
                          color: skill.color,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {skill.level}%
                      </span>
                    )}
                  </div>

                  {/* Skill bar on hover */}
                  {hovered === skill.name && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 h-px rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: skill.color,
                        transformOrigin: "left",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {categories.map((cat, i) => {
            const catSkills = SKILLS.filter((s) => s.category === cat);
            const avgLevel =
              catSkills.reduce((a, b) => a + b.level, 0) / catSkills.length;

            return (
              <div key={cat} className="glass rounded-xl p-6">
                <div
                  className="text-[10px] tracking-[0.3em] text-purple-500/60 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {cat.toUpperCase()}
                </div>
                <div
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {Math.round(avgLevel)}%
                </div>
                <div className="h-px bg-purple-900/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${avgLevel}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #7c3aed, ${catSkills[0]?.color})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
