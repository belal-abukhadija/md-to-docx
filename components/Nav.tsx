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
      className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(10,13,20,0.85)", backdropFilter: "blur(16px)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm animate-pulse-glow"
              style={{ background: "var(--gradient-1)" }}
            >
              M
            </div>
            <span className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
              Mark<span className="gradient-text">Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: pathname === link.href ? "var(--accent-hover)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--accent-subtle)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/converter" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Convert Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden btn-ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all duration-200"
                style={{
                  color: pathname === link.href ? "var(--accent-hover)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--accent-subtle)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/converter" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center mt-2">
              Convert Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
