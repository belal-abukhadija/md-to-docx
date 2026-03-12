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
        className={`flex items-center justify-center gap-3 px-6 py-2.5 cursor-pointer transition-all duration-200 min-w-[240px] wobbly-border ${
          isDragActive ? "drop-active scale-[1.05] rotate-2" : "hover:bg-[rgba(0,0,0,0.02)] hover:scale-[1.02] -rotate-1"
        }`}
        style={{
          border: `3px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          background: isDragActive ? "#fff9c4" : "white",
          boxShadow: isDragActive ? "2px 2px 0px 0px var(--accent)" : "2px 2px 0px 0px var(--border)",
        }}
      >
        <input {...getInputProps()} />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: isDragActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <span className="text-lg font-patrick font-bold" style={{ color: isDragActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
          {isDragActive ? "Drop files now!" : "Drag & Drop files here"}
        </span>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`p-16 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 wobbly-border hard-shadow-lg ${
        isDragActive ? "drop-active scale-[1.02] rotate-1" : "hover:-translate-y-1 hover:rotate-1"
      }`}
      style={{
        border: `4px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
        background: isDragActive ? "#fff9c4" : "white",
      }}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-6">
        <div
          className={`w-28 h-28 flex items-center justify-center transition-all duration-300 wobbly-border-subtle ${
            isDragActive ? "animate-float scale-110 rotate-3" : "-rotate-3"
          }`}
          style={{ background: "#fdfbf7", border: "3px solid var(--border)", boxShadow: "4px 4px 0px 0px var(--border)" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: "var(--text-primary)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        {isDragActive ? (
          <p className="text-3xl font-kalam font-bold" style={{ color: "var(--accent)" }}>
            Drop your files here!
          </p>
        ) : (
          <>
            <p className="text-4xl font-kalam font-bold" style={{ color: "var(--text-primary)" }}>
              Drag & drop Markdown files
            </p>
            <p className="text-xl mt-2 font-patrick" style={{ color: "var(--text-secondary)" }}>
              or click to browse · Supports <code className="bg-[#fff9c4] px-2 py-0.5 wobbly-border-subtle inline-block" style={{ border: "2px solid var(--border)", transform: "rotate(-2deg)" }}>.md</code> and{" "}
              <code className="bg-[#fff9c4] px-2 py-0.5 wobbly-border-subtle inline-block" style={{ border: "2px solid var(--border)", transform: "rotate(2deg)" }}>.mdx</code>
            </p>
          </>
        )}
        <div className="flex items-center gap-4 mt-4">
          <span className="badge text-lg px-4 py-1" style={{ transform: "rotate(2deg)" }}>Multiple files</span>
          <span className="badge text-lg px-4 py-1 bg-white" style={{ transform: "rotate(-3deg)" }}>Batch conversion</span>
        </div>
      </div>
    </div>
  );
}
