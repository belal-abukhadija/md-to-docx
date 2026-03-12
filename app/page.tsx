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
      <section className="relative overflow-hidden py-24 sm:py-32 flex justify-center">
        {/* Decorative sketchy background elements */}
        <div className="absolute top-10 left-10 opacity-20 transform -rotate-12 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <path d="M20 20 Q 100 0 180 20 T 180 180 T 20 180 Z" stroke="var(--border)" strokeWidth="2" strokeDasharray="10 10"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20 transform rotate-6 pointer-events-none">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <circle cx="75" cy="75" r="70" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 badge mb-8 animate-fade-in font-patrick text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border-[1.5px] border-[#2d2d2d]" />
            100% Client-Side · No Server · No Uploads
          </div>

          <div className="relative inline-block mb-6 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-kalam leading-tight" style={{ color: "var(--text-primary)" }}>
              Markdown to Word
              <br />
              <span className="relative inline-block text-[var(--accent)] transform -rotate-2 mt-4 decoration-wavy underline decoration-4 underline-offset-8">
                in your browser
              </span>
            </h1>
          </div>

          <p
            className="text-2xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100 font-patrick"
            style={{ color: "var(--text-secondary)" }}
          >
            Convert <code style={{ color: "var(--accent)", background: "#fff9c4", padding: "2px 8px", borderRadius: "10px", fontSize: "0.9em", border: "2px solid var(--border)", transform: "rotate(-1deg)", display: "inline-block" }}>.md</code> and{" "}
            <code style={{ color: "var(--accent)", background: "#fff9c4", padding: "2px 8px", borderRadius: "10px", fontSize: "0.9em", border: "2px solid var(--border)", transform: "rotate(1deg)", display: "inline-block" }}>.mdx</code> files into
            professional Word documents with full GFM support, math equations, diagrams, and custom styles —
            entirely locally.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up delay-200">
            <Link href="/converter" className="btn-primary" style={{ padding: "12px 32px", fontSize: "20px", transform: "rotate(-1deg)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              Start Converting Free
            </Link>
            <Link href="/docs" className="btn-secondary" style={{ padding: "12px 32px", fontSize: "18px", transform: "rotate(1deg)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Documentation
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-in delay-300 font-patrick text-lg" style={{ color: "var(--text-secondary)" }}>
            {[
              ["🔒", "Zero data collection"],
              ["⚡", "Instant conversion"],
              ["📶", "Works offline"],
              ["🆓", "Completely free"],
            ].map(([icon, label], i) => (
              <div key={label} className="flex items-center gap-2 bg-white px-4 py-2 wobbly-border-subtle" style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '2deg'})`, boxShadow: "2px 2px 0px 0px var(--border)" }}>
                <span className="text-xl">{icon}</span>
                <span className="font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl sm:text-5xl font-kalam mb-4" style={{ color: "var(--text-primary)" }}>
            Everything you need, <span className="text-[var(--accent)] underline decoration-wavy underline-offset-4 decoration-[3px]">nothing you don&apos;t</span>
          </h2>
          <p className="text-xl max-w-xl mx-auto font-patrick" style={{ color: "var(--text-secondary)" }}>
            A carefully crafted feature set for developers, writers, and documentation teams.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-6 transition-transform duration-300 hover:-translate-y-2 group animate-fade-in bg-white wobbly-border hard-shadow-lg"
              style={{
                animationDelay: `${i * 80}ms`,
                transform: `rotate(${i % 2 === 0 ? '1.5deg' : '-1.5deg'})`,
              }}
            >
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-6 bg-[rgba(255,255,255,0.7)] border-2 border-[var(--border)] border-dashed hidden sm:block z-10" style={{ transform: "translate(-50%, 0) rotate(-2deg)" }} />
              <div
                className="w-14 h-14 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 wobbly-border-subtle"
                style={{ background: "#fff9c4", color: "var(--text-primary)", boxShadow: "2px 2px 0px 0px var(--border)", transform: `rotate(${i % 2 === 0 ? '-4deg' : '4deg'})` }}
              >
                {f.icon}
              </div>
              <h3 className="text-2xl font-kalam mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-lg font-patrick leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Hand-drawn scribble divider top */}
        <div className="w-full h-8 mb-8 overflow-hidden flex justify-center opacity-30">
          <svg width="800" height="20" viewBox="0 0 800 20" fill="none">
            <path d="M0 10 Q 50 20 100 10 T 200 10 T 300 10 T 400 10 T 500 10 T 600 10 T 700 10 T 800 10" stroke="var(--border)" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl sm:text-5xl font-kalam mb-3 inline-block relative" style={{ color: "var(--text-primary)" }}>
              How it works
              <svg className="absolute -bottom-4 left-0 w-full" width="100%" height="12" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
                <path d="M2 10 Q 25 2 50 8 T 98 4" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </h2>
            <p className="text-xl font-patrick mt-6" style={{ color: "var(--text-secondary)" }}>Three steps to a professional document</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting dashed line */}
            <div className="hidden md:block absolute top-[60px] left-[15%] w-[70%] h-0 border-t-4 border-dashed border-[var(--border)] opacity-30 z-0"></div>
            
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center bg-white p-6 wobbly-border-subtle z-10" style={{ boxShadow: "4px 4px 0px 0px var(--border)", transform: `rotate(${i === 1 ? '1deg' : '-1deg'})` }}>
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-6 font-kalam font-bold text-3xl wobbly-border bg-[#fff9c4]"
                  style={{ color: "var(--text-primary)", boxShadow: "2px 2px 0px 0px var(--border)", transform: `rotate(${i === 1 ? '-4deg' : '4deg'})` }}
                >
                  {step.num}
                </div>
                <h3 className="text-2xl font-kalam font-bold mb-3" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-lg font-patrick" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <Link href="/converter" className="btn-primary" style={{ transform: "rotate(1deg)", fontSize: "20px" }}>
              Try it now →
            </Link>
          </div>
        </div>

        {/* Hand-drawn scribble divider bottom */}
        <div className="w-full h-8 mt-16 overflow-hidden flex justify-center opacity-30">
          <svg width="800" height="20" viewBox="0 0 800 20" fill="none">
            <path d="M0 10 Q 50 0 100 10 T 200 10 T 300 10 T 400 10 T 500 10 T 600 10 T 700 10 T 800 10" stroke="var(--border)" strokeWidth="3" fill="none"/>
          </svg>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
        <p className="text-xl font-kalam mb-8" style={{ color: "var(--text-secondary)" }}>Built with open-source tools:</p>
        <div className="flex flex-wrap justify-center gap-4">
          {["Next.js 14", "Monaco Editor", "remark / rehype", "docx.js", "KaTeX", "Mermaid.js", "JSZip", "React Dropzone"].map((tech, i) => (
            <span key={tech} className="px-5 py-2 text-lg font-patrick bg-white wobbly-border-subtle" style={{ color: "var(--text-primary)", boxShadow: "2px 2px 0px 0px var(--border)", transform: `rotate(${i % 3 === 0 ? '-2deg' : i % 2 === 0 ? '2deg' : '0deg'})` }}>
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
