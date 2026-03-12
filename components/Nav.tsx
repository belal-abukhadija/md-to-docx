"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/converter", label: "Converter" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 pt-2 pb-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 bg-white wobbly-border hard-shadow px-6 py-2 rotate-[-0.5deg]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:rotate-2">
            <div
              className="w-8 h-8 flex items-center justify-center font-bold text-lg wobbly-border-subtle"
              style={{ background: "#fff9c4", color: "var(--text-primary)", transform: "rotate(3deg)" }}
            >
              M
            </div>
            <span className="font-kalam text-2xl" style={{ color: "var(--text-primary)" }}>
              Mark<span className="gradient-text">Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-lg font-patrick transition-all duration-200"
                style={{
                  color: pathname === link.href ? "var(--text-primary)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--accent-subtle)" : "transparent",
                  border: pathname === link.href ? "2px solid var(--border)" : "2px solid transparent",
                  borderRadius: "2px 255px 3px 255px / 255px 5px 225px 3px",
                  transform: pathname === link.href ? "rotate(-1deg)" : "rotate(0deg)",
                  fontWeight: pathname === link.href ? 700 : 400
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/converter" className="btn-primary" style={{ padding: "6px 16px", fontSize: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(15deg)" }}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Convert
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="btn-ghost"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ strokeLinecap: "round" }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ strokeLinecap: "round" }}>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 p-4 bg-white wobbly-border hard-shadow animate-fade-in relative z-40 transform rotate-[0.5deg]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-patrick text-lg mb-2 transition-all duration-200"
                style={{
                  color: pathname === link.href ? "var(--text-primary)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--accent-subtle)" : "transparent",
                  border: pathname === link.href ? "2px dashed var(--border)" : "2px dashed transparent",
                  borderRadius: "2px 255px 3px 255px / 255px 5px 225px 3px",
                  fontWeight: pathname === link.href ? 700 : 400
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/converter" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center mt-4">
              Convert Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
