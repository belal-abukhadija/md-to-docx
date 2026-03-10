"use client";
import { useState } from "react";
import StyleCustomizer from "./StyleCustomizer";
import type { ConvertOptions } from "@/lib/docx/converter";

interface ExportFile {
  name: string;
  content: string;
}

interface ExportPanelProps {
  currentFile: ExportFile | null;
  allFiles: ExportFile[];
  options: ConvertOptions;
  onOptionsChange: (opts: ConvertOptions) => void;
}

export default function ExportPanel({
  currentFile,
  allFiles,
  options,
  onOptionsChange,
}: ExportPanelProps) {
  const [converting, setConverting] = useState(false);
  const [batchConverting, setBatchConverting] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showFeedback = (msg: string, isError = false) => {
    if (isError) { setError(msg); setSuccess(null); }
    else { setSuccess(msg); setError(null); }
    setTimeout(() => { setError(null); setSuccess(null); }, 4000);
  };

  const handleSingleExport = async () => {
    if (!currentFile) return;
    setConverting(true);
    setError(null);
    try {
      const { downloadSingleDocx } = await import("@/lib/zip");
      await downloadSingleDocx(currentFile.name, currentFile.content, options);
      showFeedback(`✓ "${currentFile.name.replace(/\.(md|mdx)$/i, ".docx")}" downloaded!`);
    } catch (e) {
      showFeedback(`Export failed: ${(e as Error).message}`, true);
    } finally {
      setConverting(false);
    }
  };

  const handleBatchExport = async () => {
    if (allFiles.length === 0) return;
    setBatchConverting(true);
    setBatchProgress(0);
    setError(null);
    try {
      const { batchConvertToZip } = await import("@/lib/zip");
      await batchConvertToZip(allFiles, options, (done, total) => {
        setBatchProgress(Math.round((done / total) * 100));
      });
      showFeedback(`✓ ${allFiles.length} files converted and zipped!`);
    } catch (e) {
      showFeedback(`Batch export failed: ${(e as Error).message}`, true);
    } finally {
      setBatchConverting(false);
      setBatchProgress(0);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-auto p-4">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Export Controls</h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          All processing is local — no uploads
        </p>
      </div>

      {/* Privacy badge */}
      <div
        className="flex items-center gap-2 p-3 rounded-xl"
        style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-xs font-medium" style={{ color: "#10b981" }}>100% Private — stays in your browser</span>
      </div>

      {/* Style customizer */}
      <StyleCustomizer options={options} onChange={onOptionsChange} />

      {/* Single file export */}
      <div className="space-y-2">
        <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Current File</p>
        <button
          onClick={handleSingleExport}
          disabled={!currentFile || converting}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {converting ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-white" />
              Converting…
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export to DOCX
            </>
          )}
        </button>
      </div>

      {/* Batch export */}
      {allFiles.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            Batch ({allFiles.length} files)
          </p>
          <button
            onClick={handleBatchExport}
            disabled={batchConverting}
            className="btn-secondary w-full justify-center disabled:opacity-50"
          >
            {batchConverting ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
                {batchProgress}%
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download All as ZIP
              </>
            )}
          </button>

          {batchConverting && (
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${batchProgress}%`, background: "var(--gradient-1)" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {success && (
        <div
          className="p-3 rounded-xl text-xs animate-fade-in"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          className="p-3 rounded-xl text-xs animate-fade-in"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
        >
          {error}
        </div>
      )}

      {/* Supported features */}
      <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Supported features</p>
        <div className="flex flex-wrap gap-1.5">
          {["Headings", "Tables", "Lists", "Code", "Links", "Images", "Math", "Task lists", "Footnotes"].map((f) => (
            <span key={f} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
