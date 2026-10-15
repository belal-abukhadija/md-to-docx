import type { Metadata, Viewport } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const readex = Readex_Pro({ subsets: ["latin", "arabic"], variable: "--font-readex" });

export const metadata: Metadata = {
  title: "MarkFlow: Markdown to Word",
  description:
    "Convert Markdown (.md, .mdx) files to Word documents entirely in your browser. Nothing is uploaded.",
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
    title: "MarkFlow: Markdown to Word",
    description:
      "Convert Markdown files to Word documents in your browser. Nothing is uploaded.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eceef0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={readex.variable} suppressHydrationWarning>
      <body className="wb min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
