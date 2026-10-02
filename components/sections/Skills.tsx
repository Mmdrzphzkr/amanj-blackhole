"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/Constants";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));

  return (
    <section id="skills" className="section-container relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            002 — WHAT I USE
          </span>
          <h2>
            Tech arsenal,
            <br />
            production-ready.
          </h2>
          <div className="section-rule" />
          <p>
            The stack I use daily for client work. Hover any skill to see
            proficiency — grouped by discipline below.
          </p>
        </motion.div>

        <div className="panel p-8 md:p-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="chip group"
                style={{ fontFamily: "var(--font-mono)" }}
                title={`${skill.name} — ${skill.level}%`}
              >
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span style={{ color: "var(--text)" }}>{skill.name}</span>
                <span className="ml-2" style={{ color: "var(--faint)" }}>
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const catSkills = SKILLS.filter((s) => s.category === cat);
            const avgLevel =
              catSkills.reduce((a, b) => a + b.level, 0) / catSkills.length;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="panel p-6"
              >
                <div
                  className="text-[11px] tracking-[0.25em] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {cat.toUpperCase()}
                </div>
                <div
                  className="mt-2 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text)",
                  }}
                >
                  {Math.round(avgLevel)}%
                </div>
                <div
                  className="mt-3 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--surface-2)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${avgLevel}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.08 }}
                    className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </div>
                <div
                  className="mt-2 text-[13px]"
                  style={{ color: "var(--faint)" }}
                >
                  {catSkills.length} skills
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
