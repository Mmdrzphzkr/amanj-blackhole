"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE } from "@/lib/Constants";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="section-container relative z-10"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            003 — TRACK RECORD
          </span>
          <h2>
            Experience that
            <br />
            compounds.
          </h2>
          <div className="section-rule" />
          <p>
            From enterprise systems to freelance delivery to running a
            product team — each step made the next one faster.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: "var(--line)" }}
          />
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative grid md:grid-cols-2 gap-6 ${
                  i % 2 === 0 ? "" : ""
                }`}
              >
                <div
                  className={`hidden md:block absolute left-1/2 top-10 -translate-x-1/2 h-3 w-3 rounded-full ${
                    i % 2 === 0 ? "" : ""
                  }`}
                  style={{
                    background: "var(--accent)",
                    border: "3px solid var(--bg)",
                  }}
                />
                <div
                  className={
                    i % 2 === 0
                      ? "md:pr-12 md:text-right pl-12 md:pl-0"
                      : "md:col-start-2 md:pl-12 pl-12"
                  }
                >
                  <div className="panel-accent-top p-8 text-left">
                    <div
                      className="text-[11px] tracking-[0.25em] font-semibold"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                      }}
                    >
                      {exp.year.toUpperCase()}
                    </div>
                    <h3
                      className="mt-3 text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text)",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      className="mt-1 text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--muted)",
                      }}
                    >
                      {exp.company}
                    </div>
                    <p
                      className="mt-4 text-[15.5px] leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {exp.desc}
                    </p>
                  </div>
                </div>
                {i % 2 === 0 && <div className="hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
