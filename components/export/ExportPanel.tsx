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
    <div className="flex flex-col gap-6 h-full overflow-auto p-6" style={{ background: "#fdfbf7" }}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-kalam font-bold" style={{ color: "var(--text-primary)" }}>Export Controls</h2>
        <p className="text-sm mt-0.5 font-patrick" style={{ color: "var(--text-secondary)" }}>
          All processing is local — no uploads
        </p>
      </div>

      {/* Privacy badge */}
      <div
        className="flex items-center gap-3 p-3 wobbly-border-subtle bg-white transform -rotate-1"
        style={{ border: "2px solid #10b981", boxShadow: "2px 2px 0px 0px #10b981" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-sm font-patrick font-bold" style={{ color: "#10b981" }}>100% Private — stays in your browser</span>
      </div>

      {/* Style customizer */}
      <StyleCustomizer options={options} onChange={onOptionsChange} />

      {/* Single file export */}
      <div className="space-y-3">
        <p className="text-lg font-kalam font-bold" style={{ color: "var(--text-primary)" }}>Current File</p>
        <button
          onClick={handleSingleExport}
          disabled={!currentFile || converting}
          className="btn-primary w-full justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
        >
          {converting ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-white" />
              Converting…
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export to DOCX
            </>
          )}
        </button>
      </div>

      {/* Batch export */}
      {allFiles.length > 1 && (
        <div className="space-y-3">
          <p className="text-lg font-kalam font-bold" style={{ color: "var(--text-primary)" }}>
            Batch ({allFiles.length} files)
          </p>
          <button
            onClick={handleBatchExport}
            disabled={batchConverting}
            className="btn-secondary w-full justify-center text-lg disabled:opacity-50 transform hover:-translate-y-1"
          >
            {batchConverting ? (
              <>
                <div className="w-5 h-5 border-[3px] border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
                {batchProgress}%
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download All as ZIP
              </>
            )}
          </button>

          {batchConverting && (
            <div className="w-full h-4 wobbly-border-subtle overflow-hidden p-0.5 bg-white" style={{ border: "2px solid var(--border)" }}>
              <div
                className="h-full transition-all duration-300 wobbly-border flex items-center justify-center relative overflow-hidden"
                style={{ width: `${batchProgress}%`, background: "var(--accent-secondary)", border: "none" }}
              >
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)" }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {success && (
        <div
          className="p-3 wobbly-border-subtle text-sm font-patrick font-bold animate-fade-in bg-white transform rotate-1"
          style={{ border: "2px solid #10b981", boxShadow: "2px 2px 0px 0px #10b981", color: "#10b981" }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          className="p-3 wobbly-border-subtle text-sm font-patrick font-bold animate-fade-in bg-white transform -rotate-1"
          style={{ border: "2px solid #ef4444", boxShadow: "2px 2px 0px 0px #ef4444", color: "#ef4444" }}
        >
          {error}
        </div>
      )}

      {/* Supported features */}
      <div className="mt-auto pt-6" style={{ borderTop: "2px dashed var(--border)" }}>
        <p className="text-lg font-kalam font-bold mb-3" style={{ color: "var(--text-primary)" }}>Supported features</p>
        <div className="flex flex-wrap gap-2">
          {["Headings", "Tables", "Lists", "Code", "Links", "Images", "Math", "Task lists", "Footnotes"].map((f, i) => (
            <span key={f} className="text-sm font-patrick font-bold px-3 py-1 bg-white wobbly-border-subtle" style={{ color: "var(--text-secondary)", transform: `rotate(${i % 2 === 0 ? '-1deg' : '2deg'})`, border: "1px solid var(--border)", boxShadow: "2px 2px 0px 0px var(--border)" }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
