"use client";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 px-6 md:px-12 pt-16 pb-10"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div
              className="text-xl font-black tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
              }}
            >
              AMANJ <span style={{ color: "var(--accent)" }}>DEVS</span>
            </div>
            <p
              className="mt-4 max-w-sm text-[15.5px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              A senior team of three building websites, apps and trading
              systems that are fast, maintainable and built to convert.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary mt-6 px-7 py-3 text-[13px]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              START A PROJECT
            </button>
          </div>

          <div>
            <div
              className="text-[11px] tracking-[0.25em] font-semibold mb-5"
              style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
            >
              SITEMAP
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
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
                  className="text-left text-[15px] capitalize py-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--muted)",
                  }}
                >
                  {id === "techstack" ? "Stack" : id}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              className="text-[11px] tracking-[0.25em] font-semibold mb-5"
              style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
            >
              CONTACT
            </div>
            <div className="space-y-4">
              {[
                { label: "EMAIL", value: "contact@amanjdevs.com" },
                { label: "LOCATION", value: "Available worldwide" },
                { label: "STATUS", value: "Available for work" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-[11px] tracking-[0.2em]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--faint)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="mt-0.5 text-[15px]"
                    style={{ color: "var(--text)" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p
            className="text-[13px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
          >
            © {new Date().getFullYear()} AMANJ DEVS — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "#22c55e" }}
            />
            <span
              className="text-[12px] tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
            >
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
