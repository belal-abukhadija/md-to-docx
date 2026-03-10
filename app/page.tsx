import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Private",
    desc: "Your files never leave your device. All conversion happens in the browser using JavaScript — no server, no uploads.",
    color: "10b981",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Near-instant conversion powered by modern browser APIs and optimized WebAssembly-ready parsing pipelines.",
    color: "f59e0b",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" /><path d="M8 2v16M16 6v16" />
      </svg>
    ),
    title: "GFM + Extensions",
    desc: "Full GitHub Flavored Markdown: tables, task lists, footnotes, code highlighting, math (KaTeX), and Mermaid diagrams.",
    color: "6366f1",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: "Professional DOCX",
    desc: "Exports native Word documents with proper headings, tables, embedded images, clickable links, and styled code blocks.",
    color: "0ea5e9",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Monaco Editor",
    desc: "Write Markdown in the same editor that powers VS Code — with syntax highlighting, word wrap, and live preview.",
    color: "a855f7",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
    title: "Batch Conversion",
    desc: "Upload multiple .md files and download them all as a ZIP archive in one click.",
    color: "ec4899",
  },
];

const steps = [
  { num: "01", title: "Upload or Type", desc: "Drag & drop .md files or type Markdown directly in the Monaco editor." },
  { num: "02", title: "Customize Style", desc: "Choose a document preset, font, margins, and whether to include a table of contents." },
  { num: "03", title: "Export", desc: "Click Export to DOCX. Your file downloads instantly from your own browser." },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--gradient-hero)" }}>
        {/* Decorative blobs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-1)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-2)" }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 badge mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            100% Client-Side · No Server · No Uploads
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up"
            style={{ color: "var(--text-primary)" }}
          >
            Markdown to Word
            <br />
            <span className="gradient-text">in your browser</span>
          </h1>

          <p
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100"
            style={{ color: "var(--text-secondary)" }}
          >
            Convert <code style={{ color: "var(--accent-hover)", background: "var(--accent-subtle)", padding: "2px 6px", borderRadius: 4, fontSize: "0.9em" }}>.md</code> and{" "}
            <code style={{ color: "var(--accent-hover)", background: "var(--accent-subtle)", padding: "2px 6px", borderRadius: 4, fontSize: "0.9em" }}>.mdx</code> files into
            professional Word documents with full GFM support, math equations, diagrams, and custom styles —
            entirely locally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <Link href="/converter" className="btn-primary text-base px-8 py-3 animate-pulse-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              Start Converting Free
            </Link>
            <Link href="/docs" className="btn-secondary text-base px-8 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Documentation
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 animate-fade-in delay-300">
            {[
              ["🔒", "Zero data collection"],
              ["⚡", "Instant conversion"],
              ["📶", "Works offline"],
              ["🆓", "Completely free"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Everything you need, <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            A carefully crafted feature set for developers, writers, and documentation teams.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `rgba(${hexToRgb(f.color)},0.12)`, color: `#${f.color}` }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              How it works
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>Three steps to a professional Word document</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-12px)] w-full h-px opacity-20" style={{ background: "var(--accent)" }} />
                )}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl"
                  style={{ background: "var(--accent-subtle)", border: "1px solid rgba(99,102,241,0.3)", color: "var(--accent-hover)" }}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/converter" className="btn-primary">
              Try it now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Powered by open-source browser technologies</p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Next.js 14", "Monaco Editor", "remark / rehype", "docx.js", "KaTeX", "Mermaid.js", "JSZip", "React Dropzone"].map((tech) => (
            <span key={tech} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r},${g},${b}`;
}
