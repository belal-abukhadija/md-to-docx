import Link from "next/link";

const principles = [
  { title: "Private by construction", body: "No uploads, no accounts, no data collection. There is no server that could receive your documents." },
  { title: "Quick", body: "Browser APIs and well-tuned libraries turn even long documents around in a moment." },
  { title: "Open to everyone", body: "Free, nothing to install, no sign-up, and it runs in any modern browser." },
];

const promises = [
  "All file processing happens in your browser",
  "No analytics, tracking scripts or cookies",
  "No accounts or sign-in",
  "Works offline after the first visit",
  "Files are never sent to a server",
];

export default function AboutPage() {
  return (
    <div className="wb-page wb-page--narrow">
      <div className="wb-head">
        <h1 className="wb-title">About MarkFlow</h1>
        <p className="wb-lede">
          A Markdown to Word converter that never uploads anything, made for developers, writers and anyone who keeps notes in Markdown.
        </p>
      </div>

      <div className="wb-stack" style={{ gap: "var(--wb-s7)" }}>
        <section>
          <h2 className="wb-h2">Why it exists</h2>
          <p style={{ maxWidth: "62ch" }}>
            Most converters ask you to upload your file to someone else&apos;s server. That is a privacy risk, it needs a connection, and it is slower than it has to be.
          </p>
          <p style={{ maxWidth: "62ch", marginBottom: 0 }}>
            MarkFlow does the whole job in the browser with JavaScript and the File APIs. Your documents stay on your device, conversion is instant, and it keeps working offline.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="wb-h3" style={{ fontSize: "var(--wb-t-lg)" }}>{p.title}</h3>
              <p className="m-0 mt-2" style={{ color: "var(--wb-muted)" }}>{p.body}</p>
            </div>
          ))}
        </section>

        <section className="wb-panel">
          <h2 className="wb-h2">The privacy promise</h2>
          <ul className="m-0 mt-4 grid list-none gap-3 p-0">
            {promises.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: "var(--wb-ok-wash)", color: "var(--wb-ok)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div>
          <Link href="/converter" className="wb-btn wb-btn--primary wb-btn--lg">
            Open the converter
          </Link>
        </div>
      </div>
    </div>
  );
}
