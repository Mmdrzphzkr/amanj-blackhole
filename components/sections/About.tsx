"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-container relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Identity */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div
                className="text-xs tracking-[0.5em] text-purple-500/60 mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [ 001 ] — ENTITY
              </div>

              <h2
                className="text-5xl md:text-7xl font-black leading-none mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  background:
                    "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WHO
                <br />
                AM I
              </h2>

              <div
                className="space-y-5 text-slate-400 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <p>
                  I am a{" "}
                  <span className="text-white font-medium">
                    25-year-old developer
                  </span>{" "}
                  who doesn't just write code — I architect{" "}
                  <span className="text-purple-400">digital realities</span>.
                </p>
                <p>
                  With <span className="text-white">4+ years</span> of
                  experience, I build across the full spectrum — from
                  pixel-perfect frontends to algorithmic trading systems that
                  operate in milliseconds.
                </p>
                <p>
                  I lead{" "}
                  <span className="text-gradient-gold font-semibold">
                    Amanj Devs
                  </span>{" "}
                  — a precision team of 3: two engineers and a designer, united
                  by one obsession:{" "}
                  <span className="text-white">excellence</span>.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right - Stats & Identity Cards */}
          <div className="space-y-4">
            {[
              {
                label: "EXPERIENCE",
                value: "4+ Years",
                sub: "Professional development",
                color: "#7c3aed",
              },
              {
                label: "PROJECTS",
                value: "50+",
                sub: "Delivered globally",
                color: "#f59e0b",
              },
              {
                label: "TEAM",
                value: "Amanj Devs",
                sub: "3 specialists, 1 vision",
                color: "#06b6d4",
              },
              {
                label: "SPECIALTY",
                value: "Trading Bots",
                sub: "Algorithmic automation",
                color: "#10b981",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 flex items-center justify-between
                  group hover:border-purple-500/30 transition-all duration-500"
                style={{ borderColor: `${item.color}15` }}
              >
                <div>
                  <div
                    className="text-[10px] tracking-[0.4em] mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: item.color,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="text-xs text-slate-500 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.sub}
                  </div>
                </div>
                <div
                  className="w-12 h-12 rounded-full opacity-20 group-hover:opacity-40
                    transition-opacity duration-500"
                  style={{ background: item.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div
            className="text-3xl md:text-5xl font-light text-slate-600 leading-tight
              max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "Every project is a{" "}
            <span className="text-gradient-purple font-bold">galaxy</span>.
            <br />
            Every skill is a{" "}
            <span className="text-gradient-gold font-bold">celestial body</span>
            ."
          </div>
        </motion.div>
      </div>
    </section>
  );
}
