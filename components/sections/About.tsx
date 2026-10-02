"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FACTS = [
  { label: "Experience", value: "4+ Years", sub: "Professional development" },
  { label: "Projects", value: "50+", sub: "Delivered globally" },
  { label: "Team", value: "Amanj Devs", sub: "3 specialists, 1 vision" },
  { label: "Specialty", value: "Trading Bots", sub: "Algorithmic automation" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-container relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-head">
              <span
                className="eyebrow"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                001 — WHO AM I
              </span>
              <h2>
                Developer who
                <br />
                ships for business.
              </h2>
              <div className="section-rule" />
              <p>
                I&apos;m a 25-year-old full-stack developer. I lead{" "}
                <strong style={{ color: "var(--text)" }}>Amanj Devs</strong> —
                two engineers and a designer focused on one thing: products
                that load fast, look premium and convert.
              </p>
            </div>

            <div className="lead space-y-4 max-w-xl">
              <p>
                From pixel-perfect frontends in React and Next.js to .NET
                APIs, Python automation and millisecond trading systems —
                I build across the full stack.
              </p>
              <p>
                No templates. No bloated page builders. Clean architecture
                you can scale and maintain.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {FACTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="panel p-7"
              >
                <div
                  className="text-[11px] tracking-[0.25em] font-semibold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {item.label.toUpperCase()}
                </div>
                <div
                  className="mt-2 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text)",
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="mt-1 text-[15px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--muted)",
                  }}
                >
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="panel-strong mt-12 p-10 md:p-14 text-center"
        >
          <p
            className="mx-auto max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              lineHeight: 1.4,
              color: "var(--text)",
              fontWeight: 500,
            }}
          >
            “Every project is a product. Every line of code has to earn
            its place.”
          </p>
          <p
            className="mt-4 text-sm tracking-[0.25em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
          >
            AMANJ — FOUNDER, AMANJ DEVS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
