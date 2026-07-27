"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TECH = [
  { name: "React", category: "UI Framework" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "TypeScript", category: "Language" },
  { name: ".NET", category: "Backend" },
  { name: "Python", category: "Backend / AI" },
  { name: "Three.js", category: "3D / WebGL" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Node.js", category: "Runtime" },
  { name: "Tailwind", category: "Styling" },
  { name: "Framer", category: "Animation" },
  { name: "GSAP", category: "Animation" },
  { name: "FastAPI", category: "Python API" },
  { name: "Redis", category: "Cache" },
  { name: "AWS", category: "Cloud" },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="techstack"
      className="section-container relative z-10"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-20"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-400 mb-4 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 006 ] — ARSENAL
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
            STACK
          </h2>
        </motion.div>

        {/* Scrolling ticker rows */}
        <div className="space-y-4 overflow-hidden">
          {[TECH.slice(0, 8), TECH.slice(8)].map((row, rowIdx) => (
            <div key={rowIdx} className="relative">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: rowIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "200%" }}
              >
                {[...row, ...row].map((tech, i) => (
                  <div
                    key={`${tech.name}-${i}`}
                    className="flex-shrink-0 glass rounded-xl px-8 py-4 flex items-center
                      gap-3 hover:border-purple-500/40 transition-all duration-300 group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-purple-500 
                      group-hover:bg-yellow-400 transition-colors"
                    />
                    <span
                      className="text-sm font-medium text-slate-300 whitespace-nowrap
                        group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tech.name}
                    </span>
                    <span
                      className="text-[10px] text-slate-400 whitespace-nowrap"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tech.category}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-400 mb-8 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            THE CREW
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                role: "Lead Developer",
                name: "You",
                skills: "React · .NET · Python · Trading",
                color: "#7c3aed",
              },
              {
                role: "Full-Stack Developer",
                name: "Developer",
                skills: "React · Backend · APIs",
                color: "#06b6d4",
              },
              {
                role: "UI/UX Designer",
                name: "Designer",
                skills: "Figma · Branding · Motion",
                color: "#f59e0b",
              },
            ].map((member) => (
              <div
                key={member.role}
                className="glass rounded-2xl p-8 text-center group hover:scale-105
                  transition-all duration-500"
                style={{ borderColor: `${member.color}20` }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center
                    justify-center text-2xl"
                  style={{
                    background: `radial-gradient(circle, ${member.color}30, transparent)`,
                    border: `1px solid ${member.color}30`,
                  }}
                >
                  {member.role.includes("Lead")
                    ? "🚀"
                    : member.role.includes("Design")
                      ? "🎨"
                      : "⚡"}
                </div>
                <div
                  className="text-[10px] tracking-[0.3em] mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: member.color,
                  }}
                >
                  {member.role.toUpperCase()}
                </div>
                <div
                  className="text-white font-semibold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </div>
                <div
                  className="text-xs text-slate-400"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {member.skills}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
