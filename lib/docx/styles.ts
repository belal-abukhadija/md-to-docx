import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  HeadingLevel,
  LevelFormat,
  TableLayoutType,
  WidthType,
} from "docx";

export interface DocxStylePreset {
  name: string;
  bodyFont: string;
  headingFont: string;
  fontSize: number;
  headingSizes: [number, number, number, number, number, number]; // H1-H6 in half-points
  margins: { top: number; bottom: number; left: number; right: number };
  headingColor: string;
  lineSpacing: number;
}

export const PRESETS: Record<string, DocxStylePreset> = {
  default: {
    name: "Default",
    bodyFont: "Calibri",
    headingFont: "Calibri",
    fontSize: 24, // 12pt
    headingSizes: [56, 44, 36, 28, 24, 22],
    margins: {
      top: convertInchesToTwip(1),
      bottom: convertInchesToTwip(1),
      left: convertInchesToTwip(1.25),
      right: convertInchesToTwip(1.25),
    },
    headingColor: "1F2937",
    lineSpacing: 276,
  },
  academic: {
    name: "Academic",
    bodyFont: "Times New Roman",
    headingFont: "Times New Roman",
    fontSize: 24,
    headingSizes: [48, 40, 32, 28, 24, 22],
    margins: {
      top: convertInchesToTwip(1),
      bottom: convertInchesToTwip(1),
      left: convertInchesToTwip(1.5),
      right: convertInchesToTwip(1.5),
    },
    headingColor: "111827",
    lineSpacing: 480, // double spacing
  },
  modern: {
    name: "Modern",
    bodyFont: "Arial",
    headingFont: "Arial",
    fontSize: 22,
    headingSizes: [52, 40, 32, 26, 22, 20],
    margins: {
      top: convertInchesToTwip(0.8),
      bottom: convertInchesToTwip(0.8),
      left: convertInchesToTwip(1),
      right: convertInchesToTwip(1),
    },
    headingColor: "4F46E5",
    lineSpacing: 300,
  },
  minimal: {
    name: "Minimal",
    bodyFont: "Georgia",
    headingFont: "Georgia",
    fontSize: 22,
    headingSizes: [44, 36, 30, 26, 22, 20],
    margins: {
      top: convertInchesToTwip(0.75),
      bottom: convertInchesToTwip(0.75),
      left: convertInchesToTwip(1),
      right: convertInchesToTwip(1),
    },
    headingColor: "374151",
    lineSpacing: 264,
  },
};

export function getHeadingLevel(depth: number): (typeof HeadingLevel)[keyof typeof HeadingLevel] {
  const map: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  };
  return map[depth] || HeadingLevel.HEADING_1;
}

export const NUMBERING_CONFIG = {
  config: [
    {
      reference: "ordered-list",
      levels: Array.from({ length: 9 }, (_, i) => ({
        level: i,
        format: LevelFormat.DECIMAL,
        text: `%${i + 1}.`,
        alignment: AlignmentType.START,
        style: {
          paragraph: {
            indent: { left: convertInchesToTwip(0.5 * (i + 1)), hanging: convertInchesToTwip(0.25) },
          },
        },
      })),
    },
    {
      reference: "unordered-list",
      levels: Array.from({ length: 9 }, (_, i) => ({
        level: i,
        format: LevelFormat.BULLET,
        text: ["•", "◦", "▪", "▸", "–", "•", "◦", "▪", "–"][i],
        alignment: AlignmentType.START,
        style: {
          paragraph: {
            indent: { left: convertInchesToTwip(0.5 * (i + 1)), hanging: convertInchesToTwip(0.25) },
          },
        },
      })),
    },
  ],
};

export const TABLE_STYLE = {
  layout: TableLayoutType.FIXED,
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    top: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
  },
};
