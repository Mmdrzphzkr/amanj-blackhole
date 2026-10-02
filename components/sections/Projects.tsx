"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/Constants";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="section-container relative z-10"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            004 — SELECTED WORK
          </span>
          <h2>
            Work that pays
            <br />
            for itself.
          </h2>
          <div className="section-rule" />
          <p>
            A sample of e-commerce, SaaS, trading and platform builds.
            Every project below shipped to real users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="panel p-8 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="text-[11px] tracking-[0.22em] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {project.category.toUpperCase()}
                </span>
                <span
                  className="text-[12px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--faint)",
                  }}
                >
                  {project.year}
                </span>
              </div>

              <h3
                className="mt-4 text-[1.35rem] font-bold leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {project.title}
              </h3>

              <p
                className="mt-3 text-[15.5px] leading-relaxed flex-1"
                style={{ color: "var(--muted)" }}
              >
                {project.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="chip"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
