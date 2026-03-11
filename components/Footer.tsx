import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-12 mt-auto text-center"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          © 2026 MarkFlow. All rights reserved.
        </p>
        <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
          Programmer: Belal Abukhadija (
          <a href="mailto:belalabukhadija97@gmail.com" className="hover:underline" style={{ color: "var(--accent)" }}>
            belalabukhadija97@gmail.com
          </a>
          )
        </p>
        <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
          For more free tools, visit my website{" "}
          <a href="https://belal.work" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent)" }}>
            belal.work
          </a>
          .
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          This tool is for personal use only. Please respect copyright laws and terms of service of the platforms.
        </p>
      </div>
    </footer>
  );
}
