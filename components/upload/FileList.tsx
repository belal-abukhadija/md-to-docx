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
    <div className="flex items-center gap-3 py-1">
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="group flex flex-shrink-0 items-center gap-2 px-3 py-1 transition-all duration-150 cursor-pointer wobbly-border-subtle"
          style={{
            background: activeIndex === i ? "#fff9c4" : "white",
            border: `2px solid ${activeIndex === i ? "var(--border)" : "transparent"}`,
            boxShadow: activeIndex === i ? "2px 2px 0px 0px var(--border)" : "inset 0 0 0 2px var(--border)",
            transform: activeIndex === i ? `scale(1.05) rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` : "none",
            opacity: activeIndex === i ? 1 : 0.8
          }}
          onClick={() => onSelect(i)}
        >
          {/* File icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--text-primary)", flexShrink: 0 }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>

          {/* Name */}
          <span
            className="text-lg font-patrick font-bold flex-1 truncate max-w-[120px]"
            style={{ color: "var(--text-primary)" }}
            title={file.name}
          >
            {file.name}
          </span>

          {/* Word count */}
          <span className="text-sm font-patrick flex-shrink-0 opacity-60" style={{ color: "var(--text-secondary)" }}>
            {file.content.split(/\s+/).filter(Boolean).length}w
          </span>

          {/* Remove button */}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(i); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1 rounded hover:bg-[rgba(0,0,0,0.1)]"
            title="Remove file"
            style={{ color: "var(--text-primary)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="3">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
