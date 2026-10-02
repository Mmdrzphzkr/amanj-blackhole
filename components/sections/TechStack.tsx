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

const CREW = [
  {
    role: "Lead Developer",
    name: "Amanj",
    skills: "React · .NET · Python · Trading",
  },
  {
    role: "Full-Stack Developer",
    name: "Developer",
    skills: "React · Backend · APIs",
  },
  {
    role: "UI/UX Designer",
    name: "Designer",
    skills: "Figma · Branding · Motion",
  },
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
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            006 — STACK & CREW
          </span>
          <h2>
            Lean stack.
            <br />
            Senior crew.
          </h2>
          <div className="section-rule" />
          <p>
            Boring technology where it counts, modern where it matters.
            A small team means you always talk to the person writing
            the code.
          </p>
        </motion.div>

        <div className="panel p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5">
            {TECH.map((tech) => (
              <div key={tech.name} className="flex flex-col">
                <span
                  className="text-[15px] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text)",
                  }}
                >
                  {tech.name}
                </span>
                <span
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--faint)" }}
                >
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="mt-6 grid md:grid-cols-3 gap-4"
        >
          {CREW.map((member) => (
            <div key={member.role} className="panel p-8 text-center">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-[11px] font-bold tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  color: "var(--accent)",
                }}
              >
                {member.role
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div
                className="text-[11px] tracking-[0.25em] font-semibold"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                }}
              >
                {member.role.toUpperCase()}
              </div>
              <div
                className="mt-2 font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {member.name}
              </div>
              <div
                className="mt-1 text-[13px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                }}
              >
                {member.skills}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
