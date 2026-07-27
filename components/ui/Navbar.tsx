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
      setScrolled(window.scrollY > 80);

      // Detect active section
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "glass border-b border-purple-900/20" : ""
        }`}
        style={!scrolled ? {
          background: "linear-gradient(to bottom, rgba(0,0,5,0.6) 0%, rgba(0,0,5,0.2) 70%, transparent 100%)",
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-full relative"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #7c3aed, #000005)",
                  boxShadow: "0 0 15px rgba(124,58,237,0.6)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full animate-spin-slow"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 60%, rgba(245,158,11,0.4), transparent)",
                  }}
                />
              </div>
              <span
                className="text-sm font-bold tracking-[0.2em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                AMANJ<span className="text-gradient-purple"> DEVS</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {SECTIONS.slice(0, 6).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`relative px-4 py-2 text-xs tracking-widest transition-colors duration-300
                    ${active === section.id ? "text-purple-400" : "text-slate-300 hover:text-white"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {section.label}
                  {active === section.id && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #7c3aed, transparent)",
                      }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="ml-4 px-5 py-2 rounded-full text-xs tracking-widest
                  text-white transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                ENTER VOID
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-6 h-px bg-purple-400"
                  animate={{
                    rotate:
                      menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                    y: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center"
            style={{
              background: "rgba(0,0,5,0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            {SECTIONS.map((section, i) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(section.id)}
                className="py-4 text-2xl tracking-widest text-slate-400 hover:text-white
                  transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
