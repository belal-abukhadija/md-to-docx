"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/converter", label: "Converter" },
  { href: "/docs", label: "Guide" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="wb-bar" style={{ width: "100%", flexWrap: "wrap" }}>
      <Link href="/" className="wb-brand">
        <span className="wb-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13v5l2-2 2 2v-5" />
          </svg>
        </span>
        <span className="wb-brand-text">
          <span className="wb-brand-name">MarkFlow</span>
          <span className="wb-brand-owner">Belal&apos;s tools</span>
        </span>
      </Link>

      <nav className="wb-nav" aria-label="Main" style={{ marginInlineStart: "auto" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {pathname !== "/converter" && (
        <Link href="/converter" className="wb-btn wb-btn--primary hidden sm:inline-flex">
          Open the converter
        </Link>
      )}
    </header>
  );
}
