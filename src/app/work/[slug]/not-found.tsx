import Link from "next/link";

export default function WorkNotFound() {
  return (
    <main id="main-content" className="page-intro">
      <div className="site-container page-intro__grid">
        <p className="eyebrow">404 / Case study not found</p>
        <div>
          <h1>This case study is not published.</h1>
          <p>
            The work index includes the broader project archive, while detailed
            case studies are currently limited to the four verified flagships.
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
