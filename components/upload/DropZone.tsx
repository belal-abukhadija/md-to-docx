"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFiles: (files: { name: string; content: string }[]) => void;
  compact?: boolean;
}

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);

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
        className={`wb-btn ${isDragActive ? "wb-btn--primary" : ""}`}
        style={{ flex: "none" }}
      >
        <input {...getInputProps()} />
        <UploadIcon />
        {isDragActive ? "Drop to add" : "Add .md files"}
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={`wb-drop${isDragActive ? " is-over" : ""}`} style={{ minHeight: 300 }}>
      <input {...getInputProps()} />
      <span className="wb-drop-icon"><UploadIcon /></span>
      <p className="wb-drop-title">{isDragActive ? "Drop to add these files" : "Drop Markdown files here"}</p>
      <p className="wb-drop-hint">or click to choose. .md and .mdx, as many as you like.</p>
    </div>
  );
}
