"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="section-container relative z-10" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-20 text-center"
        >
          <div
            className="text-xs tracking-[0.5em] text-purple-500/60 mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ 007 ] — SINGULARITY
          </div>
          <h2
            className="text-5xl md:text-7xl font-black leading-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ENTER
            <br />
            THE VOID
          </h2>
          <p
            className="text-slate-500 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Send your project into the singularity. We'll pull it back
            transformed.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div
              className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #7c3aed30, transparent)",
                border: "1px solid #7c3aed40",
                boxShadow: "0 0 60px rgba(124,58,237,0.2)",
              }}
            >
              <span className="text-4xl">🌌</span>
            </div>
            <h3
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MESSAGE TRANSMITTED
            </h3>
            <p
              className="text-slate-500"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your signal has crossed the event horizon. We'll respond within 24
              hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {[
                {
                  key: "name",
                  label: "YOUR NAME",
                  placeholder: "John Doe",
                  type: "text",
                },
                {
                  key: "email",
                  label: "YOUR EMAIL",
                  placeholder: "john@example.com",
                  type: "email",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    className="block text-[10px] tracking-[0.4em] text-purple-500/60 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm
                      transition-all duration-300 outline-none focus:border-purple-500/60
                      placeholder-slate-700"
                    style={{
                      fontFamily: "var(--font-body)",
                      background: "rgba(3,0,15,0.6)",
                      border: "1px solid rgba(124,58,237,0.15)",
                    }}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  className="block text-[10px] tracking-[0.4em] text-purple-500/60 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  PROJECT TYPE
                </label>
                <select
                  value={form.project}
                  onChange={(e) =>
                    setForm({ ...form, project: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white text-sm
                    transition-all duration-300 outline-none appearance-none cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "rgba(3,0,15,0.6)",
                    border: "1px solid rgba(124,58,237,0.15)",
                    color: form.project ? "white" : "#334155",
                  }}
                >
                  <option value="" style={{ background: "#03000f" }}>
                    Select type
                  </option>
                  <option value="website" style={{ background: "#03000f" }}>
                    Website
                  </option>
                  <option value="webapp" style={{ background: "#03000f" }}>
                    Web Application
                  </option>
                  <option value="mobile" style={{ background: "#03000f" }}>
                    Mobile App
                  </option>
                  <option value="bot" style={{ background: "#03000f" }}>
                    Trading Bot
                  </option>
                  <option value="other" style={{ background: "#03000f" }}>
                    Other
                  </option>
                </select>
              </div>
              <div>
                <label
                  className="block text-[10px] tracking-[0.4em] text-purple-500/60 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  BUDGET RANGE
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm
                    transition-all duration-300 outline-none appearance-none cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "rgba(3,0,15,0.6)",
                    border: "1px solid rgba(124,58,237,0.15)",
                    color: form.budget ? "white" : "#334155",
                  }}
                >
                  <option value="" style={{ background: "#03000f" }}>
                    Select budget
                  </option>
                  <option value="<1k" style={{ background: "#03000f" }}>
                    Under $1,000
                  </option>
                  <option value="1-3k" style={{ background: "#03000f" }}>
                    $1,000 - $3,000
                  </option>
                  <option value="3-5k" style={{ background: "#03000f" }}>
                    $3,000 - $5,000
                  </option>
                  <option value="5-10k" style={{ background: "#03000f" }}>
                    $5,000 - $10,000
                  </option>
                  <option value="10k+" style={{ background: "#03000f" }}>
                    $10,000+
                  </option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label
                className="block text-[10px] tracking-[0.4em] text-purple-500/60 mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                YOUR MESSAGE
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your project, goals, and vision..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-white text-sm
                  transition-all duration-300 outline-none resize-none
                  placeholder-slate-700"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(3,0,15,0.6)",
                  border: "1px solid rgba(124,58,237,0.15)",
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-xl text-white font-bold tracking-widest
                transition-all duration-500 hover:scale-[1.02] disabled:opacity-60
                flex items-center justify-center gap-3 relative overflow-hidden group"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 40px rgba(124,58,237,0.3)",
              }}
            >
              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
              />

              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <span>SEND INTO THE VOID</span>
                  <span className="text-lg">🌌</span>
                </>
              )}
            </button>

            <p
              className="text-center text-xs text-slate-700 mt-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Response within 24 hours • No commitment required
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
