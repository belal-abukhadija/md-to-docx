import Link from "next/link";



export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="badge mb-4 inline-block">About</span>
        <h1 className="text-4xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          About <span className="gradient-text">MarkFlow</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          A privacy-first, zero-server Markdown to Word converter built for developers, writers, and documentation teams.
        </p>
      </div>

      {/* Mission */}
      <div
        className="p-8 rounded-2xl mb-12"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          Document conversion tools typically require uploading your files to a third-party server. This creates privacy risks, requires an internet connection, and introduces unnecessary latency.
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          MarkFlow proves that sophisticated document processing can happen entirely in the browser. By leveraging modern JavaScript libraries, WebAssembly, and the File APIs — your documents stay on your device, conversion is instant, and the tool works even offline.
        </p>
      </div>

      {/* Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
        {[
          { icon: "🔒", title: "Privacy First", body: "No file uploads. No data collection. No accounts. Your documents never leave your device." },
          { icon: "⚡", title: "Performance", body: "Browser-native APIs and optimized libraries deliver near-instant conversion of even large documents." },
          { icon: "🌍", title: "Accessibility", body: "Free forever. Works on any modern browser. No installation. No sign-up. No vendor lock-in." },
        ].map((p) => (
          <div key={p.title} className="p-6 rounded-2xl text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="text-3xl mb-3">{p.icon}</div>
            <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{p.body}</p>
          </div>
        ))}
      </div>



      {/* Privacy commitment */}
      <div
        className="p-8 rounded-2xl mb-12"
        style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#10b981" }}>Privacy Commitment</h2>
        </div>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {[
            "All file processing happens locally in your browser",
            "No analytics, tracking scripts, or cookies",
            "No user accounts or authentication required",
            "Works offline after the first load (PWA)",
            "Files are never sent to any server",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/converter" className="btn-primary text-base px-8 py-3">
          Start Converting →
        </Link>
      </div>
    </div>
  );
}
