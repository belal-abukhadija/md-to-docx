import JSZip from "jszip";
import { saveAs } from "file-saver";
import { convertMarkdownToDocx, type ConvertOptions } from "./docx/converter";

export interface BatchFile {
  name: string;
  content: string;
}

/** Convert multiple Markdown strings to DOCX and bundle into a ZIP */
export async function batchConvertToZip(
  files: BatchFile[],
  options: ConvertOptions = {},
  onProgress?: (completed: number, total: number) => void
): Promise<void> {
  const zip = new JSZip();
  const total = files.length;

  for (let i = 0; i < total; i++) {
    const file = files[i];
    const blob = await convertMarkdownToDocx(file.content, options);
    const docxName = file.name.replace(/\.(md|mdx)$/i, ".docx");
    zip.file(docxName, blob);
    onProgress?.(i + 1, total);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  saveAs(zipBlob, "markflow-converted.zip");
}

/** Convert a single Markdown file to DOCX and trigger download */
export async function downloadSingleDocx(
  fileName: string,
  content: string,
  options: ConvertOptions = {}
): Promise<void> {
  const blob = await convertMarkdownToDocx(content, options);
  const docxName = fileName.replace(/\.(md|mdx)$/i, ".docx");
  saveAs(blob, docxName);
}
