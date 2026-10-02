"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/Constants";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="section-container relative z-10"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            005 — SERVICES
          </span>
          <h2>
            What we build
            <br />
            for clients.
          </h2>
          <div className="section-rule" />
          <p>
            Fixed scope, clear timelines, maintainable code. Pick one
            service or combine them into a full product.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="panel p-8"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                }}
              >
                {service.icon}
              </div>
              <h3
                className="mt-5 text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {service.title}
              </h3>
              <p
                className="mt-3 text-[15.5px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {service.desc}
              </p>
              <div
                className="mt-6 flex items-center gap-3 text-[12px] tracking-[0.2em] font-semibold"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                }}
              >
                <span
                  className="h-px flex-1"
                  style={{ background: "var(--line)" }}
                />
                INCLUDED IN QUOTE
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
