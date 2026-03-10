"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { ConvertOptions } from "@/lib/docx/converter";

const MarkdownEditor = dynamic(() => import("@/components/editor/MarkdownEditor"), { ssr: false });
const PreviewPanel = dynamic(() => import("@/components/editor/PreviewPanel"), { ssr: false });
const ExportPanel = dynamic(() => import("@/components/export/ExportPanel"), { ssr: false });
import DropZone from "@/components/upload/DropZone";
import FileList from "@/components/upload/FileList";

const SAMPLE_MARKDOWN = `# Welcome to MarkFlow ✨

MarkFlow converts Markdown to professional Word documents — **entirely in your browser**.

## Features

- 📝 **Full GFM support** — tables, task lists, footnotes
- 🧮 **Math equations** — $E = mc^2$
- 💻 **Syntax highlighting** — code blocks with themes
- 📊 **Mermaid diagrams** — flowcharts, sequence diagrams
- 🔒 **100% private** — no uploads, no servers

## Quick Example

### Code Block

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}! 👋\`;
}

console.log(greet("World"));
\`\`\`

### Table

| Feature | Status | Notes |
|---------|--------|-------|
| Headings | ✅ | H1–H6 |
| Tables | ✅ | Native Word tables |
| Images | ✅ | Embedded in DOCX |
| Math | ✅ | KaTeX rendering |
| Mermaid | ✅ | Client-side |

### Task List

- [x] Upload a Markdown file
- [x] Edit in the Monaco editor
- [x] See real-time preview
- [ ] Export to DOCX
- [ ] Download your document

### Diagram

\`\`\`mermaid
graph LR
    A[Markdown] --> B[Parser]
    B --> C[Preview]
    B --> D[DOCX Engine]
    D --> E[Download]
\`\`\`

### Math

Block equation:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

### Blockquote

> [!NOTE]
> Your files are **never uploaded**. All processing happens locally using JavaScript.

---

*Start editing above or drag & drop a .md file!*
`;

interface FileItem {
  name: string;
  content: string;
}

type ViewMode = "split" | "editor" | "preview";

export default function ConverterPage() {
  const [files, setFiles] = useState<FileItem[]>([{ name: "sample.md", content: SAMPLE_MARKDOWN }]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [previewHtml, setPreviewHtml] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [options, setOptions] = useState<ConvertOptions>({ preset: "default", includeToC: false });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFile = files[activeIndex] ?? null;
  const currentContent = currentFile?.content ?? "";

  // Render preview whenever content changes (debounced 350ms)
  const renderPreview = useCallback(async (md: string) => {
    if (!md.trim()) { setPreviewHtml(""); return; }
    setIsRendering(true);
    try {
      const { markdownToHtml } = await import("@/lib/markdown/parser");
      const html = await markdownToHtml(md);
      setPreviewHtml(html);
    } catch (e) {
      console.error("Preview error:", e);
    } finally {
      setIsRendering(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => renderPreview(currentContent), 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [currentContent, renderPreview]);

  const updateContent = (value: string) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === activeIndex ? { ...f, content: value } : f))
    );
  };

  const onFilesDropped = (newFiles: FileItem[]) => {
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      const unique = newFiles.filter((f) => !names.has(f.name));
      return [...prev, ...unique];
    });
    if (newFiles.length > 0) setActiveIndex(files.length);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex((prev) => Math.max(0, prev > index ? prev - 1 : Math.min(prev, files.length - 2)));
  };

  const wordCount = currentContent.split(/\s+/).filter(Boolean).length;
  const charCount = currentContent.length;
  const lines = currentContent.split("\n").length;

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
        style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
      >
        {/* File operations */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-medium flex-shrink-0" style={{ color: "var(--text-muted)" }}>Files:</span>
          <div className="flex-1 min-w-0 overflow-x-auto">
            <FileList
              files={files}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onRemove={removeFile}
            />
          </div>
          <DropZone onFiles={onFilesDropped} compact />
        </div>

        {/* View mode toggles */}
        <div
          className="flex items-center gap-0.5 rounded-lg p-1 flex-shrink-0"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
        >
          {(["editor", "split", "preview"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 capitalize"
              style={{
                background: viewMode === mode ? "var(--accent-subtle)" : "transparent",
                color: viewMode === mode ? "var(--accent-hover)" : "var(--text-muted)",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          {[
            { label: "words", value: wordCount.toLocaleString() },
            { label: "chars", value: charCount.toLocaleString() },
            { label: "lines", value: lines.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="text-xs" style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{value}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Main workspace */}
      <div className="flex flex-1 min-h-0">
        {/* Editor panel */}
        {(viewMode === "editor" || viewMode === "split") && (
          <div
            className="flex flex-col min-w-0"
            style={{
              flex: viewMode === "editor" ? "1 1 100%" : "1 1 50%",
              borderRight: viewMode === "split" ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              className="px-4 py-2 text-xs font-medium flex items-center gap-2"
              style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              <span style={{ color: "var(--text-secondary)" }}>{currentFile?.name ?? "editor"}</span>
              <span className="font-mono text-xs opacity-50">.md</span>
            </div>
            <div className="flex-1 min-h-0">
              <MarkdownEditor value={currentContent} onChange={updateContent} />
            </div>
          </div>
        )}

        {/* Preview panel */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className="flex flex-col min-w-0"
            style={{ flex: viewMode === "preview" ? "1 1 100%" : "1 1 50%" }}
          >
            <div
              className="px-4 py-2 text-xs font-medium flex items-center gap-2"
              style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              Preview
              {isRendering && (
                <div className="w-3 h-3 border border-t-transparent rounded-full animate-spin ml-1" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
              )}
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <PreviewPanel html={previewHtml} isLoading={isRendering} />
            </div>
          </div>
        )}

        {/* Export sidebar */}
        <div
          className="flex-shrink-0 overflow-auto"
          style={{
            width: "260px",
            borderLeft: "1px solid var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          <ExportPanel
            currentFile={currentFile}
            allFiles={files}
            options={options}
            onOptionsChange={setOptions}
          />
        </div>
      </div>
    </div>
  );
}
