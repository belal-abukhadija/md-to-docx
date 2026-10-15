"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center gap-3 wb-note">
      <span className="wb-spin" aria-hidden="true" />
      Loading the editor
    </div>
  ),
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Follow the system colour scheme, like the rest of the page.
function usePrefersDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return dark;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const dark = usePrefersDark();

  return (
    <MonacoEditor
      height="100%"
      language="markdown"
      value={value}
      theme={dark ? "vs-dark" : "light"}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize: 14,
        fontFamily: "'Cascadia Code', 'SF Mono', Consolas, monospace",
        wordWrap: "on",
        lineNumbers: "on",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        renderLineHighlight: "gutter",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        padding: { top: 16, bottom: 16 },
        bracketPairColorization: { enabled: true },
        suggest: { showWords: false },
        quickSuggestions: false,
        overviewRulerBorder: false,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}
