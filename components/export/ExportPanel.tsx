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

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

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
      showFeedback(`Downloaded ${currentFile.name.replace(/\.(md|mdx)$/i, ".docx")}`);
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
      showFeedback(`Downloaded ${allFiles.length} documents as a ZIP`);
    } catch (e) {
      showFeedback(`Batch export failed: ${(e as Error).message}`, true);
    } finally {
      setBatchConverting(false);
      setBatchProgress(0);
    }
  };

  return (
    <div className="wb-stack wb-stack--lg" style={{ padding: "var(--wb-s5)" }}>
      <div>
        <h2 className="wb-h2">Export</h2>
        <p className="wb-note" style={{ margin: "4px 0 0" }}>Made in this browser. Nothing is uploaded.</p>
      </div>

      <StyleCustomizer options={options} onChange={onOptionsChange} />

      <div className="wb-stack" style={{ gap: "var(--wb-s2)" }}>
        <button
          onClick={handleSingleExport}
          disabled={!currentFile || converting}
          className="wb-btn wb-btn--primary wb-btn--lg wb-btn--block"
        >
          {converting ? <span className="wb-spin" aria-hidden="true" /> : <DownloadIcon />}
          {converting ? "Exporting" : "Export to DOCX"}
        </button>

        {allFiles.length > 1 && (
          <>
            <button
              onClick={handleBatchExport}
              disabled={batchConverting}
              className="wb-btn wb-btn--block"
            >
              {batchConverting ? <span className="wb-spin" aria-hidden="true" /> : <DownloadIcon />}
              {batchConverting ? `Converting, ${batchProgress}%` : `Export all ${allFiles.length} as ZIP`}
            </button>
            {batchConverting && (
              <div className="wb-progress" role="progressbar" aria-valuenow={batchProgress} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${batchProgress}%` }} />
              </div>
            )}
          </>
        )}
      </div>

      {success && <div className="wb-alert wb-alert--ok" role="status">{success}</div>}
      {error && <div className="wb-alert" role="alert">{error}</div>}

      <div>
        <p className="wb-label">Carried into Word</p>
        <div className="wb-row" style={{ gap: 6 }}>
          {["Headings", "Tables", "Lists", "Code", "Links", "Images", "Maths", "Task lists", "Footnotes"].map((f) => (
            <span key={f} className="wb-chip">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
