import Link from "next/link";

import { ResumeViewer } from "@/components/resume/resume-viewer";
import { ActionLink } from "@/components/ui/action-link";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Resume",
  "Read or download the current public resume of Md. Akibul Hasan Arman.",
  { path: "/resume" },
);

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page" tabIndex={-1}>
      <div className="site-container">
        <div className="resume-page__back">
          <Link href="/">← Back to portfolio</Link>
        </div>

        <header className="resume-header">
          <div>
            <p className="eyebrow">Resume / Current public PDF</p>
            <h1>Md. Akibul Hasan Arman</h1>
            <p>
              Software Engineer building full-stack products, backend systems,
              and applied ML.
            </p>
          </div>

          <div className="resume-actions" aria-label="Resume actions">
            <ActionLink
              href={siteConfig.resumePdfUrl}
              external
              variant="secondary"
              ariaLabel="Open resume PDF in a new tab"
            >
              Open PDF
            </ActionLink>
            <ActionLink
              href={siteConfig.resumePdfUrl}
              download="md-akibul-hasan-arman-cv.pdf"
              variant="primary"
              ariaLabel="Download resume PDF"
            >
              Download PDF
            </ActionLink>
          </div>
        </header>

        <section className="resume-document" aria-labelledby="resume-document-title">
          <div className="resume-document__header">
            <h2 id="resume-document-title">Resume document</h2>
            <p>Two-page PDF · Native browser viewer</p>
          </div>

          <ResumeViewer pdfUrl={siteConfig.resumePdfUrl} />

          <p className="resume-fallback-note">
            If the embedded document is unavailable on your device, use the
            “Open PDF” action above. Downloading is always a separate action.
          </p>
        </section>
      </div>
    </main>
  );
}
