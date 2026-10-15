const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      {
        heading: "Opening the Converter",
        body: `Navigate to the [Converter](/converter) page. You will see three panels:
- **Editor**: Monaco, for writing Markdown
- **Preview**: the page as it will look
- **Export**: document style and the download buttons`,
      },
      {
        heading: "Uploading Files",
        body: `Drag and drop one or more **.md** or **.mdx** files onto the converter, or press **Add .md files** in the toolbar.
Multiple files will appear as tabs in the toolbar — click any filename to switch to it.`,
      },
      {
        heading: "Pasting Markdown",
        body: `Simply click inside the Monaco editor and paste any Markdown content. The preview updates automatically within 350ms.`,
      },
    ],
  },
  {
    id: "markdown-support",
    title: "Markdown Support",
    content: [
      {
        heading: "GitHub Flavored Markdown (GFM)",
        body: `MarkFlow supports the full GFM spec including:
- **Headings** H1–H6
- **Bold** \`**text**\` and *italic* \`*text*\`
- **Strikethrough** \`~~text~~\`
- **Links** \`[label](url)\`
- **Images** \`![alt](url)\`
- **Tables** with alignment
- **Task lists** \`- [x] done\`
- **Footnotes** \`[^1]\`
- **Code blocks** with language tags`,
      },
      {
        heading: "Math Equations (KaTeX)",
        body: `Inline math: \`$E = mc^2$\`

Block math:
\`\`\`
$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
\`\`\``,
      },
      {
        heading: "Mermaid Diagrams",
        body: `Wrap diagrams in a fenced \`\`\`mermaid\`\`\` block:
\`\`\`
\`\`\`mermaid
graph LR
  A[Input] --> B[Parser] --> C[Output]
\`\`\`
\`\`\`
Supported: flowcharts, sequence, class, Gantt, state diagrams.`,
      },
      {
        heading: "Callouts / Notes",
        body: `Use GitHub-style callouts:
\`\`\`
> [!NOTE]
> This is a note

> [!WARNING]
> This is a warning

> [!TIP]
> This is a tip
\`\`\`
Types: NOTE, TIP, WARNING, DANGER, CAUTION, IMPORTANT.`,
      },
    ],
  },
  {
    id: "export",
    title: "Exporting to DOCX",
    content: [
      {
        heading: "Single File Export",
        body: `Press **Export to DOCX** in the Export panel. The file downloads immediately — no server involved.`,
      },
      {
        heading: "Batch Export (ZIP)",
        body: `Upload multiple .md files. When 2+ files are loaded, an **Export all as ZIP** button appears. All files are converted simultaneously and bundled into a single ZIP archive.`,
      },
      {
        heading: "What is preserved in DOCX",
        body: `- Heading hierarchy (Word styles H1–H6)
- Native Word tables
- Embedded images (fetched at export time)
- Clickable hyperlinks
- Bold, italic, strikethrough text
- Ordered and unordered lists (nested)
- Task list checkboxes
- Code blocks (monospace font, shaded background)
- Blockquotes (left border)`,
      },
    ],
  },
  {
    id: "customization",
    title: "Style Customization",
    content: [
      {
        heading: "Presets",
        body: `Choose from four presets under **Document style** in the Export panel:
- **Default** — Calibri, standard margins
- **Academic** — Times New Roman, wide margins, double spacing
- **Modern** — Arial, compact, colored headings
- **Minimal** — Georgia, tight layout`,
      },
      {
        heading: "Font Override",
        body: `Select any supported font to override the preset default. Options include Arial, Times New Roman, Georgia, Garamond, and more.`,
      },
      {
        heading: "Body Font Size",
        body: `Drag the slider to set body text size from 9pt to 16pt. Heading sizes scale proportionally.`,
      },
      {
        heading: "Table of Contents",
        body: `Turn on **Start with a table of contents** to prepend a ToC page with all headings linked.`,
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Offline",
    content: [
      {
        heading: "Client-Side Architecture",
        body: `MarkFlow has **no backend**. There is no server that receives your files. All Markdown parsing, HTML preview rendering, and DOCX generation happen in your browser using JavaScript.`,
      },
      {
        heading: "No Data Collection",
        body: `We do not log, store, or analyze your documents. There are no analytics trackers, no cookies, no accounts required.`,
      },
      {
        heading: "Offline Use (PWA)",
        body: `MarkFlow is a Progressive Web App. After the first visit, the app and all libraries are cached locally. You can use it offline without an internet connection.`,
      },
    ],
  },
];

function renderInline(body: string) {
  return body
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="wb-code mf-inline-code">$1</code>');
}

export default function DocsPage() {
  return (
    <div className="wb-page">
      <div className="wb-head">
        <h1 className="wb-title">The MarkFlow guide</h1>
        <p className="wb-lede">How to get Markdown in, what it supports, and what comes out in Word.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 flex flex-col gap-1" aria-label="On this page">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-4 py-2 text-sm no-underline transition-colors hover:bg-[var(--wb-sunk)]"
                style={{ color: "var(--wb-muted)" }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-col gap-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-6">
              <h2 className="wb-title" style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.5vw, 2.25rem)" }}>
                {section.title}
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {section.content.map((item) => (
                  <div key={item.heading} className="wb-panel">
                    <h3 className="wb-h3" style={{ fontSize: "var(--wb-t-lg)" }}>{item.heading}</h3>
                    <div
                      className="mf-doc-body mt-2 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: renderInline(item.body) }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
