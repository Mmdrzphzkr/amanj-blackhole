"use client";
import { motion } from "framer-motion";

const STATS = [
  { value: "4+", label: "Years experience" },
  { value: "50+", label: "Projects shipped" },
  { value: "3", label: "Person core team" },
  { value: "24h", label: "Response time" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center z-10 px-6 pt-28 pb-20"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        >
          <span
            className="eyebrow"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            FULL-STACK DEVELOPER — AMANJ DEVS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.55 }}
          className="h-display mt-8 font-black leading-[0.95] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 10vw, 7.5rem)",
          }}
        >
          AMANJ
          <br />
          <span style={{ color: "var(--accent)" }}>DEVS</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.9 }}
          className="section-rule mt-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0 }}
          className="lead mt-8 max-w-xl"
          style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem" }}
        >
          Websites, apps and trading systems — designed to win clients,
          not just impress developers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="btn-primary px-8 py-3.5 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            START A PROJECT
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="btn-ghost px-8 py-3.5 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VIEW WORK
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 4.35 }}
          className="panel mt-14 w-full grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 overflow-hidden"
          style={{ borderColor: "var(--line)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[13px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--muted)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-3"
      >
        <span
          className="text-[11px] tracking-[0.35em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-10"
          style={{ background: "var(--line)" }}
        />
      </motion.div>
    </section>
  );
}
