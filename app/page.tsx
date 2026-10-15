import Link from "next/link";

const features = [
  {
    title: "Nothing leaves your device",
    desc: "Parsing, preview and the Word file are all made by JavaScript in this tab. There is no server to send anything to.",
  },
  {
    title: "The Markdown you already write",
    desc: "GitHub Flavored Markdown: tables, task lists, footnotes, highlighted code, KaTeX maths and Mermaid diagrams.",
  },
  {
    title: "A Word file that behaves like one",
    desc: "Real heading styles, native tables, embedded images, working links and shaded code blocks.",
  },
  {
    title: "The VS Code editor",
    desc: "Monaco, with syntax highlighting and word wrap, next to a preview that updates as you type.",
  },
  {
    title: "Many files at once",
    desc: "Drop in a folder's worth of .md files and download them all as one ZIP.",
  },
  {
    title: "Four document styles",
    desc: "Default, academic, modern or minimal, with your own font, size and an optional table of contents.",
  },
];

const steps = [
  { title: "Add your Markdown", desc: "Drop .md files onto the converter, or type and paste into the editor." },
  { title: "Pick a style", desc: "Choose a preset, a font and a size, and whether to start with a table of contents." },
  { title: "Export", desc: "Press Export to DOCX. The file downloads straight from your browser." },
];

const sampleMd = `# Quarterly report

Revenue grew **18%** on the
back of the new *starter plan*.

| Region | Q3    | Q4    |
|--------|-------|-------|
| North  | 41.2k | 48.9k |
| South  | 27.5k | 30.1k |

- [x] Ship the starter plan
- [ ] Hire two support staff`;

export default function LandingPage() {
  return (
    <div className="wb-page">
      {/* Hero */}
      <section className="grid gap-10 pt-8 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:pt-14 lg:pb-24">
        <div>
          <h1
            className="m-0 font-semibold"
            style={{ fontSize: "clamp(2.75rem, 1.4rem + 3.6vw, 4.75rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
          >
            Markdown in, Word out
          </h1>
          <p className="wb-lede" style={{ marginTop: "var(--wb-s5)" }}>
            Turn .md and .mdx files into Word documents with tables, maths, diagrams and proper heading styles. It all happens in your browser.
          </p>
          <div className="wb-row" style={{ marginTop: "var(--wb-s6)", gap: "var(--wb-s3)" }}>
            <Link href="/converter" className="wb-btn wb-btn--primary wb-btn--lg">
              Open the converter
            </Link>
            <Link href="/docs" className="wb-btn wb-btn--quiet wb-btn--lg">
              Read the guide
            </Link>
          </div>
        </div>

        {/* A real fragment of what the converter does */}
        <div className="grid gap-3 sm:grid-cols-2" aria-label="Example: Markdown on the left, the Word page on the right">
          <pre
            className="wb-output wb-output--code m-0"
            style={{ background: "var(--wb-ink)", color: "var(--wb-bg)", fontSize: "0.8rem", lineHeight: 1.7, minHeight: 300 }}
          >
            {sampleMd}
          </pre>
          <div className="md-preview" style={{ background: "#fff", borderRadius: "var(--wb-r-lg)", padding: "24px 26px", fontSize: 13, minHeight: 300 }}>
            <h1 style={{ marginTop: 0, fontSize: "1.7em" }}>Quarterly report</h1>
            <p>
              Revenue grew <strong>18%</strong> on the back of the new <em>starter plan</em>.
            </p>
            <table>
              <thead>
                <tr><th>Region</th><th>Q3</th><th>Q4</th></tr>
              </thead>
              <tbody>
                <tr><td>North</td><td>41.2k</td><td>48.9k</td></tr>
                <tr><td>South</td><td>27.5k</td><td>30.1k</td></tr>
              </tbody>
            </table>
            <p style={{ marginBottom: 0 }}>☑ Ship the starter plan<br />☐ Hire two support staff</p>
          </div>
        </div>
      </section>

      {/* What it handles */}
      <section className="grid gap-8 py-16 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]" aria-labelledby="features-title">
        <h2 id="features-title" className="wb-title" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.5rem)" }}>
          What it handles
        </h2>
        <dl className="m-0 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title}>
              <dt className="wb-h3" style={{ fontSize: "var(--wb-t-lg)" }}>{f.title}</dt>
              <dd className="m-0 mt-2" style={{ color: "var(--wb-muted)" }}>{f.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works: a real sequence */}
      <section className="rounded-[var(--wb-r-lg)] p-6 sm:p-10" style={{ background: "var(--wb-ink)", color: "var(--wb-bg)" }} aria-labelledby="steps-title">
        <h2 id="steps-title" className="wb-title" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.5rem)" }}>
          Three steps
        </h2>
        <ol className="m-0 mt-8 grid list-none gap-8 p-0 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-full font-semibold"
                style={{ background: "var(--wb-accent)", color: "var(--wb-accent-ink)" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="wb-h3" style={{ fontSize: "var(--wb-t-lg)" }}>{step.title}</h3>
                <p className="m-0 mt-1" style={{ opacity: 0.75 }}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/converter" className="wb-btn wb-btn--primary wb-btn--lg" style={{ marginTop: "var(--wb-s6)" }}>
          Start converting
        </Link>
      </section>

      <p className="wb-note pt-12">
        Built on Next.js, Monaco Editor, remark and rehype, docx.js, KaTeX, Mermaid, JSZip and React Dropzone.
      </p>
    </div>
  );
}
