import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-intro">
      <div className="site-container page-intro__grid">
        <p className="eyebrow">404 / Page not found</p>
        <div>
          <h1>This page could not be found.</h1>
          <p>
            Only the four verified flagship projects publish case studies. The
            curated work index includes the broader project archive.
          </p>
          <div className="section-action">
            <Link className="action-link action-link--primary" href="/work">
              <span>Return to all work</span>
              <span aria-hidden="true" className="action-link__mark">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
