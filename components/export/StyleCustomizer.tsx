"use client";
import { useState } from "react";
import { PRESETS } from "@/lib/docx/styles";
import type { ConvertOptions } from "@/lib/docx/converter";

interface StyleCustomizerProps {
  options: ConvertOptions;
  onChange: (opts: ConvertOptions) => void;
}

const FONTS = [
  "Calibri",
  "Arial",
  "Times New Roman",
  "Georgia",
  "Helvetica",
  "Garamond",
  "Palatino Linotype",
  "Trebuchet MS",
  "Verdana",
];

export default function StyleCustomizer({ options, onChange }: StyleCustomizerProps) {
  const [open, setOpen] = useState(false);

  const update = (partial: Partial<ConvertOptions>) =>
    onChange({ ...options, ...partial });

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-highlight)",
          color: "var(--text-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 01-14.14 14.14M4.93 4.93a10 10 0 0114.14 14.14" />
          </svg>
          <span className="text-sm font-medium">Customize Style</span>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 p-4 rounded-xl space-y-4 animate-fade-in" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
          {/* Preset selector */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Style Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => update({ preset: key })}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    background: options.preset === key ? "var(--accent-subtle)" : "var(--bg-surface)",
                    border: `1px solid ${options.preset === key ? "var(--accent)" : "var(--border)"}`,
                    color: options.preset === key ? "var(--accent-hover)" : "var(--text-secondary)",
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font override */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Font Override
            </label>
            <select
              className="input text-sm"
              value={options.fontFamily ?? ""}
              onChange={(e) => update({ fontFamily: e.target.value || undefined })}
            >
              <option value="">Use preset default</option>
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Body Font Size: {options.fontSize ?? 12}pt
            </label>
            <input
              type="range"
              min={9}
              max={16}
              step={1}
              value={options.fontSize ?? 12}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="w-full"
              style={{ accentColor: "var(--accent)" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>9pt</span>
              <span>16pt</span>
            </div>
          </div>

          {/* Table of Contents */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => update({ includeToC: !options.includeToC })}
              className="w-10 h-5 rounded-full transition-all duration-200 flex items-center px-0.5 cursor-pointer flex-shrink-0"
              style={{
                background: options.includeToC ? "var(--accent)" : "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-4 h-4 rounded-full bg-white transition-transform duration-200"
                style={{ transform: options.includeToC ? "translateX(20px)" : "translateX(0)" }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Include Table of Contents
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
