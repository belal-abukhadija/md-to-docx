"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFiles: (files: { name: string; content: string }[]) => void;
  compact?: boolean;
}

export default function DropZone({ onFiles, compact = false }: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const readers = acceptedFiles.map((file) => {
        return new Promise<{ name: string; content: string }>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ name: file.name, content: e.target?.result as string });
          };
          reader.readAsText(file);
        });
      });
      Promise.all(readers).then(onFiles);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md", ".mdx"],
      "text/plain": [".md", ".mdx"],
    },
    multiple: true,
  });

  if (compact) {
    return (
      <div
        {...getRootProps()}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
          isDragActive ? "drop-active" : ""
        }`}
        style={{
          border: "1px dashed var(--border)",
          background: isDragActive ? "var(--accent-subtle)" : "transparent",
        }}
      >
        <input {...getInputProps()} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {isDragActive ? "Drop files here" : "Upload .md / .mdx"}
        </span>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragActive ? "drop-active scale-[1.01]" : ""
      }`}
      style={{
        border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
        background: isDragActive ? "var(--accent-subtle)" : "var(--bg-surface)",
      }}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragActive ? "animate-float" : ""
          }`}
          style={{ background: "var(--accent-subtle)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--accent-hover)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        {isDragActive ? (
          <p className="text-base font-semibold" style={{ color: "var(--accent-hover)" }}>
            Drop your files here!
          </p>
        ) : (
          <>
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              Drag & drop Markdown files
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              or click to browse · Supports <code style={{ color: "var(--accent-hover)" }}>.md</code> and{" "}
              <code style={{ color: "var(--accent-hover)" }}>.mdx</code>
            </p>
          </>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="badge">Multiple files</span>
          <span className="badge">Batch conversion</span>
        </div>
      </div>
    </div>
  );
}
