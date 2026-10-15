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
    <div className="flex items-center gap-1" role="tablist" aria-label="Open files">
      {files.map((file, i) => {
        const active = activeIndex === i;
        return (
          <div
            key={`${file.name}-${i}`}
            className="group flex shrink-0 items-center gap-1 rounded-full pl-4 pr-1 transition-colors"
            style={{
              minHeight: 40,
              background: active ? "var(--wb-ink)" : "transparent",
              color: active ? "var(--wb-bg)" : "var(--wb-muted)",
            }}
          >
            <button
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(i)}
              className="max-w-[180px] truncate border-0 bg-transparent p-0 text-sm font-medium"
              style={{ color: "inherit", cursor: "pointer" }}
              title={file.name}
            >
              {file.name}
              <span className="wb-num ml-2" style={{ opacity: 0.6, fontWeight: 400 }}>
                {file.content.split(/\s+/).filter(Boolean).length}w
              </span>
            </button>
            <button
              onClick={() => onRemove(i)}
              className="grid size-8 place-items-center rounded-full border-0 bg-transparent opacity-60 hover:opacity-100"
              style={{ color: "inherit", cursor: "pointer" }}
              aria-label={`Close ${file.name}`}
              title="Close file"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
