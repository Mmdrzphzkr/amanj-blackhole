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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-20"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-500/60 mb-4 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 003 ] — TIMELINE
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
            THROUGH
            <br />
            TIME
          </h2>
        </motion.div>

        {/* Cosmic Timeline */}
        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #7c3aed, #f59e0b, #06b6d4, transparent)",
              }}
            />
          </div>

          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 md:gap-16 ${
                  i % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden md:block">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 20px ${exp.color}60`,
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className={
                    i % 2 === 0
                      ? "md:text-right md:pr-12"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <div
                    className="glass rounded-2xl p-8 group hover:scale-[1.02]
                      transition-all duration-500 relative overflow-hidden"
                    style={{ borderColor: `${exp.color}20` }}
                  >
                    <div
                      className="text-[10px] tracking-[0.4em] mb-3"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: exp.color,
                      }}
                    >
                      {exp.year}
                    </div>

                    <h3
                      className="text-xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {exp.role}
                    </h3>

                    <div
                      className="text-sm mb-4"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: exp.color,
                      }}
                    >
                      {exp.company}
                    </div>

                    <p
                      className="text-sm text-slate-500 leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {exp.desc}
                    </p>

                    {/* Decorative corner */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-tl-full opacity-5"
                      style={{ background: exp.color }}
                    />
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {i % 2 === 0 && <div />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
