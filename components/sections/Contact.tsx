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

  const fieldLabel = (text: string) => (
    <label
      className="mb-2 block text-[11px] tracking-[0.25em] font-semibold"
      style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
    >
      {text}
    </label>
  );

  return (
    <section id="contact" className="section-container relative z-10" ref={ref}>
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-head center items-center"
        >
          <span className="eyebrow" style={{ fontFamily: "var(--font-mono)" }}>
            007 — CONTACT
          </span>
          <h2>
            Tell us about
            <br />
            your project.
          </h2>
          <div className="section-rule" />
          <p>
            One message is enough. We reply within 24 hours with next
            steps, timeline and a fixed quote.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel p-14 text-center"
          >
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
              }}
            >
              ✓
            </div>
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
              }}
            >
              Message received
            </h3>
            <p className="lead mx-auto mt-3 max-w-md">
              Thanks for reaching out. We&apos;ll respond within 24 hours
              with a plan and pricing.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="panel p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                {fieldLabel("YOUR NAME")}
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="field"
                  style={{ fontFamily: "var(--font-body)" }}
                  required
                />
              </div>
              <div>
                {fieldLabel("YOUR EMAIL")}
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@company.com"
                  className="field"
                  style={{ fontFamily: "var(--font-body)" }}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                {fieldLabel("PROJECT TYPE")}
                <select
                  value={form.project}
                  onChange={(e) =>
                    setForm({ ...form, project: e.target.value })
                  }
                  className="field cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: form.project ? "var(--text)" : "var(--faint)",
                  }}
                  required
                >
                  <option value="">Select type</option>
                  <option value="website">Website</option>
                  <option value="webapp">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="bot">Trading Bot</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                {fieldLabel("BUDGET RANGE")}
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="field cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: form.budget ? "var(--text)" : "var(--faint)",
                  }}
                  required
                >
                  <option value="">Select budget</option>
                  <option value="<1k">Under $1,000</option>
                  <option value="1-3k">$1,000 - $3,000</option>
                  <option value="3-5k">$3,000 - $5,000</option>
                  <option value="5-10k">$5,000 - $10,000</option>
                  <option value="10k+">$10,000+</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              {fieldLabel("PROJECT DETAILS")}
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you building? Goals, timeline, links to references…"
                rows={5}
                className="field resize-none"
                style={{ fontFamily: "var(--font-body)" }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full py-4 text-sm tracking-[0.15em] disabled:opacity-60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {sending ? "SENDING…" : "SEND MESSAGE"}
            </button>

            <p
              className="mt-4 text-center text-[13px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
            >
              Response within 24 hours — no commitment required
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
