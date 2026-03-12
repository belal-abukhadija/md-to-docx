import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto pt-16 pb-12 text-center relative overflow-hidden">
      {/* Hand-drawn divider line */}
      <div className="w-full flex justify-center mb-8 relative">
        <svg width="400" height="10" viewBox="0 0 400 10" fill="none" className="max-w-full px-4">
          <path d="M5 5 Q 100 0, 200 5 T 395 5" stroke="var(--border)" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm font-patrick" style={{ color: "var(--text-secondary)", transform: "rotate(-1deg)" }}>
          © 2026 MarkFlow. All rights reserved.
        </p>
        <p className="text-lg font-kalam font-bold" style={{ color: "var(--text-secondary)" }}>
          Programmer: Belal Abukhadija (
          <a href="mailto:belalabukhadija97@gmail.com" className="hover:text-[var(--accent)] transition-colors underline decoration-wavy underline-offset-4" style={{ color: "var(--accent)" }}>
            belalabukhadija97@gmail.com
          </a>
          )
        </p>
        <div className="bg-[#fff9c4] wobbly-border-subtle inline-block px-6 py-3 transform rotate-2 mt-2" style={{ boxShadow: "2px 2px 0px 0px var(--border)" }}>
          <p className="text-lg font-patrick" style={{ color: "var(--text-secondary)" }}>
            For more tools:{" "}
            <a href="https://belal.work" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors underline decoration-wavy font-bold" style={{ color: "var(--text-primary)" }}>
              belal.work
            </a>
          </p>
        </div>
        <p className="text-sm font-patrick mt-4 opacity-80" style={{ color: "var(--text-muted)", maxWidth: "500px" }}>
          This tool is for personal use only. Please respect copyright laws and terms of service of the platforms.
        </p>
      </div>
    </footer>
  );
}
