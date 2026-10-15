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
          theme: "neutral",
          themeVariables: {
            fontFamily: "Readex Pro, Segoe UI, sans-serif",
            primaryColor: "#fff0c2",
            primaryTextColor: "#17191c",
            primaryBorderColor: "#17191c",
            lineColor: "#525860",
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

  if (!html && isLoading) {
    return (
      <div className="flex items-center gap-3 py-10 text-sm" style={{ color: "#525860" }}>
        <span className="wb-spin" aria-hidden="true" />
        Rendering the preview
      </div>
    );
  }

  if (!html) {
    return (
      <div className="py-10" style={{ color: "#525860" }}>
        <p className="m-0 text-lg font-semibold" style={{ color: "#17191c" }}>The preview is empty</p>
        <p className="m-0 mt-1">Type in the editor or add a .md file and the page appears here.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="md-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
