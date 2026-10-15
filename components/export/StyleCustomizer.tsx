"use client";
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
  const update = (partial: Partial<ConvertOptions>) =>
    onChange({ ...options, ...partial });

  return (
    <div className="wb-stack wb-stack--lg">
      <div>
        <span className="wb-label">Document style</span>
        <div className="wb-seg wb-seg--grid" role="group" aria-label="Document style">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              aria-pressed={options.preset === key}
              onClick={() => update({ preset: key })}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="wb-label" htmlFor="font">Font</label>
        <select
          id="font"
          className="wb-select"
          value={options.fontFamily ?? ""}
          onChange={(e) => update({ fontFamily: e.target.value || undefined })}
        >
          <option value="">The style&apos;s own font</option>
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="wb-label-row">
          <label className="wb-label" htmlFor="size">Body text size</label>
          <span className="wb-num" style={{ fontWeight: 600 }}>{options.fontSize ?? 12} pt</span>
        </div>
        <input
          id="size"
          type="range"
          min={9}
          max={16}
          step={1}
          value={options.fontSize ?? 12}
          onChange={(e) => update({ fontSize: Number(e.target.value) })}
          className="wb-range"
        />
        <div className="wb-row wb-row--between wb-hint wb-num">
          <span>9 pt</span>
          <span>16 pt</span>
        </div>
      </div>

      <label className="wb-toggle-row">
        <span>Start with a table of contents</span>
        <input
          type="checkbox"
          role="switch"
          className="wb-switch"
          checked={!!options.includeToC}
          onChange={(e) => update({ includeToC: e.target.checked })}
        />
      </label>
    </div>
  );
}
