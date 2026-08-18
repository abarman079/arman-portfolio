import Link from "next/link";

import { ActionLink } from "@/components/ui/action-link";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Resume",
  "Read or download the current public resume of Md. Akibul Hasan Arman.",
);

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page">
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

          <object
            className="resume-viewer"
            data={`${siteConfig.resumePdfUrl}#view=FitH`}
            type="application/pdf"
            title="Md. Akibul Hasan Arman resume PDF"
            aria-label="Md. Akibul Hasan Arman resume PDF"
          >
            <div className="resume-viewer__fallback">
              <p>Your browser cannot display the resume inline.</p>
              <a
                href={siteConfig.resumePdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open the resume PDF in a new tab
              </a>
            </div>
          </object>

          <p className="resume-fallback-note">
            If the embedded document is unavailable on your device, use the
            “Open PDF” action above. Downloading is always a separate action.
          </p>
        </section>
      </div>
    </main>
  );
}
