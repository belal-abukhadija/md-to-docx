import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MarkFlow — Markdown to DOCX Converter",
  description:
    "Convert Markdown (.md, .mdx) files to professional Word documents entirely in your browser. 100% private, offline-capable, zero uploads.",
  keywords: [
    "markdown to word",
    "md to docx",
    "markdown converter",
    "docx generator",
    "client-side",
    "privacy",
    "offline",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "MarkFlow — Markdown to DOCX Converter",
    description:
      "Convert Markdown files to Word documents in your browser. No uploads, no servers, 100% private.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
