"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "@/lib/Constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      sections.forEach((section, i) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActive(SECTIONS[i].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-3"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                }}
              >
                A
              </div>
              <span
                className="text-sm font-bold tracking-[0.18em]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                AMANJ DEVS
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {SECTIONS.slice(1, 7).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="px-4 py-2 text-[13px] font-medium tracking-wide"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      active === section.id ? "var(--text)" : "var(--muted)",
                    borderBottom:
                      active === section.id
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                  }}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary ml-4 px-6 py-2.5 text-[13px] tracking-wide"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                START A PROJECT
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-6 rounded-full"
                  style={{ height: 2, background: "var(--text)" }}
                  animate={{
                    rotate:
                      menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                    y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0,
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center gap-2 px-8"
            style={{ background: "var(--bg)" }}
          >
            {SECTIONS.map((section, i) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(section.id)}
                className="py-3 text-xl font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {section.label}
              </motion.button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary mt-6 px-10 py-3.5 text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              START A PROJECT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
