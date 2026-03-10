import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  ExternalHyperlink,
  ShadingType,
  BorderStyle,
  convertInchesToTwip,
  LineRuleType,
} from "docx";
import type { Root, Node, Text, Parent, Image } from "mdast";
import { markdownToAst } from "../markdown/parser";
import {
  PRESETS,
  NUMBERING_CONFIG,
  TABLE_STYLE,
  type DocxStylePreset,
} from "./styles";

export interface ConvertOptions {
  preset?: string;
  fontFamily?: string;
  fontSize?: number;
  includeToC?: boolean;
}

// Helper: safely get children of a parent-like node
function getChildren(node: Node): Node[] {
  return (node as Parent).children ?? [];
}

// Helper: extract plain text from a node tree
function extractText(node: Node): string {
  if (node.type === "text") return (node as Text).value;
  return getChildren(node).map(extractText).join("");
}

// Helper: convert a hex color string (without #)
function hexColor(hex: string): string {
  return hex.replace("#", "");
}

/** Main export: Markdown string → .docx Blob */
export async function convertMarkdownToDocx(
  markdown: string,
  options: ConvertOptions = {}
): Promise<Blob> {
  const preset: DocxStylePreset = {
    ...PRESETS[options.preset ?? "default"],
    ...(options.fontFamily ? { bodyFont: options.fontFamily, headingFont: options.fontFamily } : {}),
    ...(options.fontSize ? { fontSize: options.fontSize * 2 } : {}),
  };

  const ast = await markdownToAst(markdown);
  const children: (Paragraph | Table)[] = [];

  // Optional Table of Contents
  if (options.includeToC) {
    children.push(
      new Paragraph({
        text: "Table of Contents",
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      })
    );
    // Collect headings for ToC
    (function collectHeadings(nodes: Node[]) {
      for (const node of nodes) {
        if (node.type === "heading") {
          const depth = (node as unknown as { depth: number }).depth;
          const text = extractText(node);
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "  ".repeat(depth - 1) + text,
                  font: preset.bodyFont,
                  size: preset.fontSize - 2,
                  color: "6366F1",
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }
        if ((node as unknown as Parent).children) collectHeadings((node as unknown as Parent).children);
      }
    })(ast.children as Node[]);

    children.push(new Paragraph({ text: "", pageBreakBefore: true }));
  }

  // Process AST nodes
  for (const node of ast.children) {
    const elements = await nodeToDocx(node as Node, preset, 0);
    children.push(...(elements as (Paragraph | Table)[]));
  }

  const doc = new Document({
    numbering: NUMBERING_CONFIG,
    sections: [
      {
        properties: {
          page: {
            margin: preset.margins,
          },
        },
        children,
      },
    ],
    styles: {
      default: {
        document: {
          run: {
            font: preset.bodyFont,
            size: preset.fontSize,
            color: "374151",
          },
          paragraph: {
            spacing: { line: preset.lineSpacing, lineRule: LineRuleType.AUTO, after: 160 },
          },
        },
      },
    },
  });

  return await Packer.toBlob(doc);
}

/** Convert a single MDAST node → array of docx elements */
async function nodeToDocx(
  node: Node,
  preset: DocxStylePreset,
  listDepth: number
): Promise<(Paragraph | Table)[]> {
  switch (node.type) {
    case "heading": {
      const depth = (node as unknown as { depth: number }).depth;
      const runs = await inlineToRuns(getChildren(node), preset);
      return [
        new Paragraph({
          children: runs,
          heading: getDocxHeadingLevel(depth),
          spacing: { before: 300, after: 120 },
        }),
      ];
    }

    case "paragraph": {
      const runs = await inlineToRuns(getChildren(node), preset);
      return [
        new Paragraph({
          children: runs,
          spacing: { after: 160 },
        }),
      ];
    }

    case "blockquote": {
      const results: (Paragraph | Table)[] = [];
      for (const child of getChildren(node)) {
        const childElements = await nodeToDocx(child, preset, listDepth);
        for (const el of childElements) {
          if (el instanceof Paragraph) {
            // Re-wrap blockquote children with indent/border styling
            results.push(
              new Paragraph({
                shading: { type: ShadingType.SOLID, color: "F3F4F6" },
                indent: { left: convertInchesToTwip(0.3) },
                border: {
                  left: { style: BorderStyle.SINGLE, size: 12, color: "6366F1" },
                },
                spacing: { after: 100 },
              })
            );
          }
        }
      }
      return results;
    }

    case "code": {
      const code = (node as unknown as { value: string }).value;
      const lines = code.split("\n");
      return lines.map(
        (line) =>
          new Paragraph({
            children: [
              new TextRun({
                text: line || " ",
                font: "Courier New",
                size: 18,
                color: "1F2937",
              }),
            ],
            shading: { type: ShadingType.SOLID, color: "F9FAFB" },
            spacing: { before: 0, after: 0, line: 240, lineRule: LineRuleType.AUTO },
            indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
          })
      );
    }

    case "list": {
      const ordered = (node as unknown as { ordered: boolean }).ordered;
      const results: (Paragraph | Table)[] = [];
      for (const item of getChildren(node)) {
        const elements = await listItemToDocx(item, preset, ordered, listDepth);
        results.push(...elements);
      }
      return results;
    }

    case "table": {
      return [await tableToDocx(node as Node, preset)];
    }

    case "thematicBreak": {
      return [
        new Paragraph({
          text: "",
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 2, color: "D1D5DB" },
          },
          spacing: { before: 200, after: 200 },
        }),
      ];
    }

    case "html": {
      // Skip raw HTML nodes
      return [];
    }

    case "definition":
    case "footnoteDefinition":
    case "yaml":
    case "toml":
      return [];

    default: {
      // Fallback: try to render as paragraph
      try {
        const runs = await inlineToRuns(getChildren(node), preset);
        if (runs.length > 0) {
          return [new Paragraph({ children: runs, spacing: { after: 120 } })];
        }
      } catch {
        // ignore
      }
      return [];
    }
  }
}

async function listItemToDocx(
  item: Node,
  preset: DocxStylePreset,
  ordered: boolean,
  depth: number
): Promise<(Paragraph | Table)[]> {
  const results: (Paragraph | Table)[] = [];
  const children = getChildren(item);

  // Check for task list checkbox
  const isTask = (item as unknown as { checked?: boolean }).checked !== undefined;
  const checked = (item as unknown as { checked?: boolean }).checked;

  for (const child of children) {
    if (child.type === "paragraph") {
      const runs = await inlineToRuns(getChildren(child), preset);
      const taskPrefix = isTask
        ? [
            new TextRun({ text: checked ? "☑ " : "☐ ", size: preset.fontSize }),
          ]
        : [];
      results.push(
        new Paragraph({
          children: [...taskPrefix, ...runs],
          numbering: ordered
            ? { reference: "ordered-list", level: depth }
            : { reference: "unordered-list", level: depth },
          spacing: { after: 80 },
        })
      );
    } else if (child.type === "list") {
      const subOrdered = (child as unknown as { ordered: boolean }).ordered;
      for (const subItem of getChildren(child)) {
        const subElements = await listItemToDocx(subItem, preset, subOrdered, depth + 1);
        results.push(...subElements);
      }
    } else {
      const elements = await nodeToDocx(child, preset, depth + 1);
      results.push(...elements);
    }
  }
  return results;
}

async function tableToDocx(node: Node, preset: DocxStylePreset): Promise<Table> {
  const rows = getChildren(node);
  const tableRows: TableRow[] = [];

  for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
    const row = rows[rowIdx];
    if (row.type !== "tableRow") continue;
    const cells = getChildren(row);
    const isHeader = rowIdx === 0;

    const tableCells = await Promise.all(
      cells.map(async (cell) => {
        const runs = await inlineToRuns(getChildren(cell), preset);
        return new TableCell({
          children: [
            new Paragraph({
              children: isHeader
                ? runs.map((r) => {
                    if (r instanceof TextRun) {
                      return new TextRun({ ...r, bold: true });
                    }
                    return r;
                  })
                : runs,
              spacing: { after: 60 },
            }),
          ],
          shading: isHeader
            ? { type: ShadingType.SOLID, color: "F3F4F6" }
            : undefined,
          margins: {
            top: convertInchesToTwip(0.05),
            bottom: convertInchesToTwip(0.05),
            left: convertInchesToTwip(0.1),
            right: convertInchesToTwip(0.1),
          },
        });
      })
    );

    tableRows.push(
      new TableRow({
        children: tableCells,
        tableHeader: isHeader,
      })
    );
  }

  return new Table({
    ...TABLE_STYLE,
    rows: tableRows,
  });
}

/** Convert inline MDAST nodes (strong, em, text, link, image, code, etc.) → TextRun[] */
async function inlineToRuns(
  nodes: Node[],
  preset: DocxStylePreset,
  options: { bold?: boolean; italic?: boolean; code?: boolean; strikethrough?: boolean } = {}
): Promise<(TextRun | ExternalHyperlink)[]> {
  const runs: (TextRun | ExternalHyperlink)[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "text": {
        runs.push(
          new TextRun({
            text: (node as Text).value,
            bold: options.bold,
            italics: options.italic,
            strike: options.strikethrough,
            font: options.code ? "Courier New" : preset.bodyFont,
            size: options.code ? preset.fontSize - 2 : preset.fontSize,
            color: options.code ? "7C3AED" : undefined,
          })
        );
        break;
      }

      case "strong": {
        const subRuns = await inlineToRuns(getChildren(node), preset, { ...options, bold: true });
        runs.push(...subRuns);
        break;
      }

      case "emphasis": {
        const subRuns = await inlineToRuns(getChildren(node), preset, { ...options, italic: true });
        runs.push(...subRuns);
        break;
      }

      case "delete": {
        const subRuns = await inlineToRuns(getChildren(node), preset, { ...options, strikethrough: true });
        runs.push(...subRuns);
        break;
      }

      case "inlineCode": {
        runs.push(
          new TextRun({
            text: (node as unknown as { value: string }).value,
            font: "Courier New",
            size: preset.fontSize - 2,
            color: "7C3AED",
            shading: { type: ShadingType.SOLID, color: "F5F3FF" },
          })
        );
        break;
      }

      case "link": {
        const linkRuns = await inlineToRuns(getChildren(node), preset, options);
        runs.push(
          new ExternalHyperlink({
            link: (node as unknown as { url: string }).url,
            children: linkRuns.filter((r) => r instanceof TextRun) as TextRun[],
          })
        );
        break;
      }

      case "image": {
        try {
          const imgNode = node as Image;
          const imageData = await fetchImageAsBuffer(imgNode.url);
          if (imageData) {
            // Only use non-svg types (svg requires a fallback in docx)
            const imgType = imageData.type as "png" | "jpg" | "gif" | "bmp";
            runs.push(
              new ImageRun({
                data: imageData.data as ArrayBuffer,
                transformation: { width: Math.min(imageData.width, 560), height: imageData.height },
                type: imgType === ("svg" as unknown as "png") ? "png" : imgType,
                altText: { name: imgNode.alt ?? "image", description: imgNode.alt ?? "", title: imgNode.alt ?? "" },
              })
            );
          } else {
            runs.push(new TextRun({ text: `[Image: ${imgNode.alt ?? imgNode.url}]`, italics: true, color: "9CA3AF" }));
          }
        } catch {
          const imgNode = node as Image;
          runs.push(new TextRun({ text: `[Image: ${imgNode.alt ?? imgNode.url}]`, italics: true, color: "9CA3AF" }));
        }
        break;
      }

      case "break": {
        runs.push(new TextRun({ break: 1 }));
        break;
      }

      case "html": {
        // Ignore raw HTML in inline positions
        break;
      }

      case "inlineMath": {
        // Render math as text
        runs.push(
          new TextRun({
            text: (node as unknown as { value: string }).value,
            font: "Cambria Math",
            size: preset.fontSize,
          })
        );
        break;
      }

      default:
        if ((node as unknown as Parent).children) {
          const subRuns = await inlineToRuns(getChildren(node), preset, options);
          runs.push(...subRuns);
        }
    }
  }

  return runs;
}

function getDocxHeadingLevel(depth: number): (typeof HeadingLevel)[keyof typeof HeadingLevel] {
  const map: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  };
  return map[depth] ?? HeadingLevel.HEADING_1;
}

interface ImageFetchResult {
  data: Buffer | ArrayBuffer;
  width: number;
  height: number;
  type: string;
}

async function fetchImageAsBuffer(url: string): Promise<ImageFetchResult | null> {
  try {
    // Handle data URLs
    if (url.startsWith("data:")) {
      const [header, b64] = url.split(",");
      const mimeType = header.split(":")[1].split(";")[0];
      const ext = mimeTypeToExt(mimeType);
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return { data: bytes.buffer, width: 400, height: 300, type: ext };
    }

    // Handle remote URLs
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/png";
    const ext = mimeTypeToExt(contentType);
    const buffer = await res.arrayBuffer();
    return { data: buffer, width: 400, height: 300, type: ext };
  } catch {
    return null;
  }
}

function mimeTypeToExt(mimeType: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/svg+xml": "svg",
    "image/webp": "png", // docx doesn't support webp, fallback
  };
  return map[mimeType] ?? "png";
}
