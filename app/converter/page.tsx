"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { ConvertOptions } from "@/lib/docx/converter";

const MarkdownEditor = dynamic(() => import("@/components/editor/MarkdownEditor"), { ssr: false });
const PreviewPanel = dynamic(() => import("@/components/editor/PreviewPanel"), { ssr: false });
const ExportPanel = dynamic(() => import("@/components/export/ExportPanel"), { ssr: false });
import DropZone from "@/components/upload/DropZone";
import FileList from "@/components/upload/FileList";

const SAMPLE_MARKDOWN = `# Welcome to MarkFlow

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
    <div className="wb-page" style={{ maxWidth: 1600 }}>
      <h1 className="wb-sr">Markdown to Word converter</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 pb-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <FileList
              files={files}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onRemove={removeFile}
            />
          </div>
          <DropZone onFiles={onFilesDropped} compact />
        </div>

        <div className="wb-seg" role="group" aria-label="Layout">
          {(["editor", "split", "preview"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={viewMode === mode}
              onClick={() => setViewMode(mode)}
            >
              {mode === "split" ? "Side by side" : mode === "editor" ? "Editor" : "Preview"}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 wb-note wb-num xl:flex">
          <span><strong style={{ color: "var(--wb-ink)" }}>{wordCount.toLocaleString()}</strong> words</span>
          <span><strong style={{ color: "var(--wb-ink)" }}>{charCount.toLocaleString()}</strong> characters</span>
          <span><strong style={{ color: "var(--wb-ink)" }}>{lines.toLocaleString()}</strong> lines</span>
        </div>
      </div>

      {/* Workspace */}
      <div className="mf-workspace" data-view={viewMode}>
        {(viewMode === "editor" || viewMode === "split") && (
          <section className="mf-pane" aria-label="Markdown editor">
            <div className="mf-pane-head">
              <span>{currentFile?.name ?? "Untitled.md"}</span>
            </div>
            <div className="mf-pane-body">
              <MarkdownEditor value={currentContent} onChange={updateContent} />
            </div>
          </section>
        )}

        {(viewMode === "preview" || viewMode === "split") && (
          <section className="mf-pane" aria-label="Preview">
            <div className="mf-pane-head">
              <span>Preview</span>
              {isRendering && <span className="wb-spin" style={{ width: 14, height: 14 }} aria-label="Updating" />}
            </div>
            <div className="mf-pane-body mf-paper-wrap">
              <div className="mf-paper">
                <PreviewPanel html={previewHtml} isLoading={isRendering} />
              </div>
            </div>
          </section>
        )}

        <section className="mf-pane mf-pane--side" aria-label="Export">
          <div className="mf-pane-body">
            <ExportPanel
              currentFile={currentFile}
              allFiles={files}
              options={options}
              onOptionsChange={setOptions}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
