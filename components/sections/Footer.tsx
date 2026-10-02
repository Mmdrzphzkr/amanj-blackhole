"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 border-t border-purple-900/20 py-16 px-6 md:px-12"
      style={{
        background: "linear-gradient(to top, rgba(0,0,5,0.92) 0%, rgba(0,0,5,0.65) 55%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-2xl font-black tracking-[0.2em] text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AMANJ<span className="text-gradient-purple"> DEVS</span>
            </div>
            <p
              className="text-[15px] card-text leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              A team of 3 specialists building extraordinary digital products.
              Websites, apps, and trading systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-[10px] tracking-[0.4em] text-purple-400 mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              NAVIGATE
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "hero",
                "about",
                "skills",
                "experience",
                "projects",
                "services",
                "techstack",
                "contact",
              ].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left text-[14px] card-text hover:text-white
                      transition-colors duration-300 capitalize"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {id === "hero"
                    ? "Origin"
                    : id === "about"
                      ? "Entity"
                      : id === "techstack"
                        ? "Arsenal"
                        : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div
              className="text-[10px] tracking-[0.4em] text-purple-400 mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CONTACT
            </div>
            <div className="space-y-2">
              {[
                { label: "Email", value: "contact@amanjdevs.com" },
                { label: "Location", value: "Available Worldwide" },
                { label: "Status", value: "Available for Work" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-[10px] tracking-widest card-text-dim"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-[14px] card-text"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t border-purple-900/20 flex flex-col md:flex-row
            items-center justify-between gap-4"
        >
          <p
            className="text-xs text-slate-400"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} AMANJ DEVS — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span
              className="text-[10px] tracking-widest text-slate-400"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
