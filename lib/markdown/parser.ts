import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import type { Root } from "mdast";

/**  Parse Markdown → HTML string (for preview). */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(remarkGfm)
    .use(remarkMath)
    // Callout transformation: > [!NOTE] style
    .use(calloutPlugin)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    // @ts-expect-error rehypeHighlight options typing is incompatible with unified's .use()
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown);

  let html = String(result);

  // Wrap mermaid code blocks so we can target them
  html = html.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (_match, code) =>
      `<div class="mermaid-container"><div class="mermaid">${decodeHtmlEntities(code)}</div></div>`
  );

  return html;
}

/** Parse Markdown → MDAST (for DOCX generation). */
export async function markdownToAst(markdown: string): Promise<Root> {
  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(remarkGfm)
    .use(remarkMath)
    .parse(markdown);
  return file as Root;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Remark plugin: converts github-style > [!NOTE] callouts into <div class="callout callout-note"> */
function calloutPlugin() {
  return (tree: Root) => {
    const { visit } = require("unist-util-visit");
    visit(tree, "blockquote", (node: { type: string; children: { type: string; children: { type: string; value: string }[] }[] }) => {
      if (
        node.children?.length > 0 &&
        node.children[0].type === "paragraph" &&
        node.children[0].children?.[0]?.type === "text"
      ) {
        const text: string = node.children[0].children[0].value;
        const match = text.match(/^\[!(NOTE|TIP|WARNING|DANGER|CAUTION|IMPORTANT)\]/i);
        if (match) {
          const kind = match[1].toLowerCase();
          const typeMap: Record<string, string> = {
            note: "note",
            tip: "tip",
            warning: "warning",
            danger: "danger",
            caution: "warning",
            important: "note",
          };
          const calloutType = typeMap[kind] || "note";
          // Strip the tag from first text node
          node.children[0].children[0].value = text
            .replace(match[0], "")
            .trimStart();
          // Inject HTML wrapper via raw nodes
          (node as unknown as { type: string; data: { hName: string; hProperties: Record<string, string> } }).data = {
            hName: "div",
            hProperties: { className: `callout callout-${calloutType}` },
          };
        }
      }
    });
  };
}
