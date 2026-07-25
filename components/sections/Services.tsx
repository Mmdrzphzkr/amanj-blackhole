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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-20"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-500/60 mb-4 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 005 ] — FORCES
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
            WHAT WE
            <br />
            BUILD
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 group relative overflow-hidden cursor-pointer"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-700 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at top left, ${service.color}08, transparent)`,
                }}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-5">{service.icon}</div>

                <h3
                  className="text-lg font-bold text-white mb-3 transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-sm text-slate-500 leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {service.desc}
                </p>

                <div className="flex items-center gap-2">
                  <div
                    className="h-px flex-1 transition-all duration-500 group-hover:flex-none"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, transparent)`,
                    }}
                  />
                  <span
                    className="text-[10px] tracking-widest transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: service.color,
                    }}
                  >
                    EXPLORE
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 opacity-0 
                  group-hover:opacity-5 transition-opacity duration-700 rounded-tl-full"
                style={{ background: service.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
