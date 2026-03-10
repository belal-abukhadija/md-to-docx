"use client";

interface FileItem {
  name: string;
  content: string;
}

interface FileListProps {
  files: FileItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
}

export default function FileList({ files, activeIndex, onSelect, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer"
          style={{
            background: activeIndex === i ? "var(--accent-subtle)" : "transparent",
            border: `1px solid ${activeIndex === i ? "var(--accent)" : "transparent"}`,
          }}
          onClick={() => onSelect(i)}
        >
          {/* File icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: activeIndex === i ? "var(--accent-hover)" : "var(--text-muted)", flexShrink: 0 }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>

          {/* Name */}
          <span
            className="text-xs font-medium flex-1 truncate"
            style={{ color: activeIndex === i ? "var(--accent-hover)" : "var(--text-secondary)" }}
            title={file.name}
          >
            {file.name}
          </span>

          {/* Word count */}
          <span className="text-xs flex-shrink-0 opacity-50" style={{ color: "var(--text-muted)" }}>
            {file.content.split(/\s+/).filter(Boolean).length}w
          </span>

          {/* Remove button */}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(i); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-0.5 rounded"
            title="Remove file"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
