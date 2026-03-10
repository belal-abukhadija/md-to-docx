import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-10 mt-auto"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: "var(--gradient-1)" }}>M</div>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Mark<span className="gradient-text">Flow</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              A privacy-first Markdown to Word converter. All processing happens locally in your browser — no uploads, no servers, no data collection.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="badge">100% Client-Side</span>
              <span className="badge">Offline Ready</span>
              <span className="badge">Open Source</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Product</h3>
            <ul className="space-y-2">
              {[["Converter", "/converter"], ["Documentation", "/docs"], ["About", "/about"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Technology</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>Next.js 14</li>
              <li>Monaco Editor</li>
              <li>docx.js</li>
              <li>remark / rehype</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 MarkFlow. Built with ❤️ for the developer community.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Your files never leave your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
