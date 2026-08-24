"use client";

import { useEffect, useState } from "react";

const inlineViewerQuery = "(min-width: 48.01rem)";

interface ResumeViewerProps {
  pdfUrl: string;
}

export function ResumeViewer({ pdfUrl }: ResumeViewerProps) {
  const [showInlineViewer, setShowInlineViewer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(inlineViewerQuery);
    const sync = () => setShowInlineViewer(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <div className="resume-viewer" data-inline-pdf={showInlineViewer}>
      {showInlineViewer ? (
        <object
          className="resume-viewer__object"
          data={`${pdfUrl}#view=FitH`}
          type="application/pdf"
          title="Md. Akibul Hasan Arman resume PDF"
          aria-label="Md. Akibul Hasan Arman resume PDF"
        >
          <ResumeViewerFallback pdfUrl={pdfUrl} />
        </object>
      ) : (
        <ResumeViewerFallback pdfUrl={pdfUrl} mobile />
      )}
    </div>
  );
}

function ResumeViewerFallback({
  pdfUrl,
  mobile = false,
}: ResumeViewerProps & { mobile?: boolean }) {
  return (
    <div className="resume-viewer__fallback">
      <p>
        {mobile
          ? "Inline PDF viewing is reserved for larger screens."
          : "Your browser cannot display the resume inline."}
      </p>
      <a href={pdfUrl} target="_blank" rel="noreferrer">
        Open the resume PDF in a new tab
      </a>
    </div>
  );
}
