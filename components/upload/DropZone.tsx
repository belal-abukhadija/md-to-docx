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
        className={`flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl cursor-pointer transition-all duration-200 min-w-[240px] ${
          isDragActive ? "drop-active scale-[1.02]" : "hover:bg-white/5"
        }`}
        style={{
          border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          background: isDragActive ? "var(--accent-subtle)" : "var(--bg-elevated)",
        }}
      >
        <input {...getInputProps()} />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: isDragActive ? "var(--accent-hover)" : "var(--text-secondary)" }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <span className="text-sm font-medium" style={{ color: isDragActive ? "var(--accent-hover)" : "var(--text-secondary)" }}>
          {isDragActive ? "Drop files now!" : "Drag & Drop files here"}
        </span>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`rounded-xl p-16 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
        isDragActive ? "drop-active scale-[1.02]" : ""
      }`}
      style={{
        border: `3px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
        background: isDragActive ? "var(--accent-subtle)" : "var(--bg-surface)",
      }}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-5">
        <div
          className={`w-24 h-24 rounded-3xl shadow-lg flex items-center justify-center transition-all duration-300 ${
            isDragActive ? "animate-float" : ""
          }`}
          style={{ background: "var(--accent-subtle)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <svg
            width="40"
            height="40"
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
          <p className="text-xl font-bold" style={{ color: "var(--accent-hover)" }}>
            Drop your files here!
          </p>
        ) : (
          <>
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Drag & drop Markdown files
            </p>
            <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
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
