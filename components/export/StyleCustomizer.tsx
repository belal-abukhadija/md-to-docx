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
        className="w-full flex items-center justify-between px-4 py-3 wobbly-border bg-white transition-all duration-200 transform hover:-translate-y-1 hover:rotate-1"
        style={{
          boxShadow: "2px 2px 0px 0px var(--border)",
          color: "var(--text-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 01-14.14 14.14M4.93 4.93a10 10 0 0114.14 14.14" />
          </svg>
          <span className="text-lg font-kalam font-bold">Customize Style</span>
        </div>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 p-5 space-y-5 animate-fade-in wobbly-border-subtle bg-white hard-shadow transform -rotate-1 relative z-10">
          <div className="absolute top-[-10px] right-4 w-8 h-4 bg-[rgba(255,255,255,0.7)] border-2 border-[var(--border)] border-dashed z-20 transform rotate-[-3deg]"></div>
          {/* Preset selector */}
          <div>
            <label className="block text-lg font-kalam font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Style Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => update({ preset: key })}
                  className="px-3 py-2 text-md font-patrick font-bold transition-all duration-150 wobbly-border-subtle"
                  style={{
                    background: options.preset === key ? "var(--accent)" : "#fdfbf7",
                    border: `2px solid var(--border)`,
                    color: options.preset === key ? "white" : "var(--text-primary)",
                    boxShadow: options.preset === key ? "none" : "2px 2px 0px 0px var(--border)",
                    transform: options.preset === key ? "translate(2px, 2px)" : "none",
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font override */}
          <div>
            <label className="block text-lg font-kalam font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Font Override
            </label>
            <select
              className="input text-lg font-patrick bg-[#fdfbf7] w-full"
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
            <label className="block text-lg font-kalam font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Body Font Size: {options.fontSize ?? 12}pt
            </label>
            <div className="relative pt-1">
              <input
                type="range"
                min={9}
                max={16}
                step={1}
                value={options.fontSize ?? 12}
                onChange={(e) => update({ fontSize: Number(e.target.value) })}
                className="w-full appearance-none h-2 bg-transparent focus:outline-none"
                style={{
                  border: "2px solid var(--border)",
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((options.fontSize ?? 12) - 9) / 7 * 100}%, #fdfbf7 ${((options.fontSize ?? 12) - 9) / 7 * 100}%, #fdfbf7 100%)`
                }}
              />
              <style jsx>{`
                input[type=range]::-webkit-slider-thumb {
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border: 3px solid var(--border);
                  background: white;
                  cursor: pointer;
                  border-radius: 4px 6px 5px 3px/5px 4px 5px 6px;
                  margin-top: -11px;
                }
                input[type=range]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border: 3px solid var(--border);
                  background: white;
                  cursor: pointer;
                  border-radius: 4px 6px 5px 3px/5px 4px 5px 6px;
                }
              `}</style>
            </div>
            <div className="flex justify-between text-sm font-patrick mt-2 font-bold" style={{ color: "var(--text-secondary)" }}>
              <span>9pt</span>
              <span>16pt</span>
            </div>
          </div>

          {/* Table of Contents */}
          <label className="flex items-center gap-4 cursor-pointer group pt-2 pb-2">
            <div
              onClick={() => update({ includeToC: !options.includeToC })}
              className="w-14 h-8 transition-all duration-200 flex items-center px-1 cursor-pointer flex-shrink-0 wobbly-border-subtle"
              style={{
                background: options.includeToC ? "var(--accent)" : "#fdfbf7",
                border: "2px solid var(--border)",
                boxShadow: options.includeToC ? "inset 0px 3px 0px rgba(0,0,0,0.2)" : "inset 0px 3px 0px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="w-6 h-6 bg-white transition-transform duration-200 border-2 border-[var(--border)]"
                style={{ 
                  transform: options.includeToC ? "translateX(24px) rotate(15deg)" : "translateX(0) rotate(-15deg)",
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" 
                }}
              />
            </div>
            <span className="text-lg font-patrick font-bold" style={{ color: "var(--text-primary)" }}>
              Include Table of Contents
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
