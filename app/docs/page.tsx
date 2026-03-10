const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      {
        heading: "Opening the Converter",
        body: `Navigate to the [Converter](/converter) page. You'll see a three-panel layout:
- **Left**: Monaco editor for Markdown input
- **Center**: Live HTML preview
- **Right**: Export controls and style customization`,
      },
      {
        heading: "Uploading Files",
        body: `Drag and drop one or more **.md** or **.mdx** files onto the drop zone in the toolbar, or click "Upload .md / .mdx".
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
        body: `Click **Export to DOCX** in the right panel. The file downloads immediately — no server involved.`,
      },
      {
        heading: "Batch Export (ZIP)",
        body: `Upload multiple .md files. When 2+ files are loaded, a **Download All as ZIP** button appears. All files are converted simultaneously and bundled into a single ZIP archive.`,
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
        body: `Choose from four presets in the **Customize Style** panel:
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
        body: `Toggle **Include Table of Contents** to prepend a ToC page with all headings linked.`,
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

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="badge mb-4 inline-block">Documentation</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          MarkFlow <span className="gradient-text">Guide</span>
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Everything you need to know about converting Markdown to Word documents.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar ToC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>On this page</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm py-1.5 px-2 rounded-lg transition-colors hover:text-indigo-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2
                className="text-2xl font-bold mb-6 pb-3"
                style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.content.map((item) => (
                  <div key={item.heading} className="panel p-5">
                    <h3 className="text-base font-semibold mb-3" style={{ color: "var(--accent-hover)" }}>
                      {item.heading}
                    </h3>
                    <div
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "var(--text-secondary)" }}
                      dangerouslySetInnerHTML={{
                        __html: item.body
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent-hover);text-decoration:underline;">$1</a>')
                          .replace(/\*\*([^*]+)\*\*/g, "<strong style=\"color:var(--text-primary)\">$1</strong>")
                          .replace(/\*([^*]+)\*/g, "<em>$1</em>")
                          .replace(/`([^`]+)`/g, "<code style=\"font-family:JetBrains Mono,monospace;font-size:0.85em;background:var(--bg-elevated);border:1px solid var(--border);padding:2px 5px;border-radius:4px;color:#e879f9\">$1</code>"),
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
