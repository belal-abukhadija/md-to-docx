"use client";
import { useEffect, useRef } from "react";

interface PreviewPanelProps {
  html: string;
  isLoading: boolean;
}

export default function PreviewPanel({ html, isLoading }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Mermaid after HTML renders
  useEffect(() => {
    if (!html || typeof window === "undefined") return;

    const initMermaid = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#6366f1",
            primaryTextColor: "#e8eaf2",
            primaryBorderColor: "#4f46e5",
            lineColor: "#8b95b0",
            sectionBkgColor: "#1a2030",
            altSectionBkgColor: "#141820",
            gridColor: "#232a3a",
            background: "#0f1319",
            mainBkg: "#1a2030",
            nodeBorder: "#232a3a",
            clusterBkg: "#141820",
            titleColor: "#e8eaf2",
            edgeLabelBackground: "#1a2030",
          },
        });

        const mermaidElements = containerRef.current?.querySelectorAll(".mermaid");
        if (mermaidElements && mermaidElements.length > 0) {
          await mermaid.run({
            nodes: Array.from(mermaidElements) as HTMLElement[],
          });
        }
      } catch (err) {
        console.warn("Mermaid render error:", err);
      }
    };

    initMermaid();
  }, [html]);

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ background: "var(--bg-secondary)" }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4 bg-white p-6 wobbly-border-subtle hard-shadow transform rotate-[1deg]">
            <div
              className="w-10 h-10 border-[4px] border-t-transparent animate-spin rounded-full"
              style={{ borderColor: "var(--border)", borderTopColor: "transparent" }}
            />
            <span className="text-xl font-kalam font-bold" style={{ color: "var(--text-secondary)" }}>
              Sketching preview…
            </span>
          </div>
        </div>
      ) : !html ? (
        <div className="flex flex-col items-center justify-center h-full gap-5 opacity-70">
          <div className="bg-white p-8 wobbly-border-subtle hard-shadow flex flex-col items-center transform -rotate-[2deg]">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--border)" }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" strokeDasharray="4 4"/>
              <line x1="16" y1="17" x2="8" y2="17" strokeDasharray="4 4"/>
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <p className="text-2xl font-kalam font-bold mt-4" style={{ color: "var(--text-primary)" }}>
              Preview will appear here
            </p>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="md-preview px-6 py-6 max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
