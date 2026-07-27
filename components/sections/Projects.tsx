"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/Constants";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="section-container relative z-10"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-20"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-400 mb-4 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 004 ] — GALAXIES
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
            FEATURED
            <br />
            WORK
          </h2>
        </motion.div>

        {/* Project Grid - Magazine Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onClick={() =>
                setSelected(selected === project.id ? null : project.id)
              }
              className={`relative rounded-2xl overflow-hidden cursor-pointer group
                transition-all duration-700 ${
                  i === 0 || i === 3 ? "md:row-span-2" : ""
                }`}
              style={{
                minHeight: i === 0 || i === 3 ? "480px" : "220px",
              }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.color}, transparent)`,
                }}
              />

              {/* Border */}
              <div
                className="absolute inset-0 rounded-2xl transition-all duration-500"
                style={{
                  border: `1px solid ${project.color}20`,
                  ...(selected === project.id && {
                    border: `1px solid ${project.color}60`,
                    boxShadow: `0 0 40px ${project.color}20`,
                  }),
                }}
              />

              {/* Glass bg */}
              <div className="absolute inset-0 glass rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="text-[10px] tracking-[0.4em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </div>
                    <div
                      className="text-[10px] text-slate-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {project.year}
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-gradient-purple
                      transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  <AnimatePresence>
                    {(selected === project.id || i === 0 || i === 3) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-slate-300 leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {project.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] px-2 py-1 rounded-full"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}20`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover particle effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-700 pointer-events-none"
              >
                {[...Array(6)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: project.color,
                      left: `${20 + j * 15}%`,
                      top: `${30 + (j % 3) * 20}%`,
                    }}
                    animate={{
                      y: [-5, -20, -5],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: j * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
