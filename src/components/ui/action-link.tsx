import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkVariant = "primary" | "secondary" | "quiet";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: ActionLinkVariant;
  external?: boolean;
  native?: boolean;
  download?: string;
  className?: string;
  ariaLabel?: string;
}

export function ActionLink({
  href,
  children,
  variant = "secondary",
  external = false,
  native = false,
  download,
  className = "",
  ariaLabel,
}: ActionLinkProps) {
  const classes = `action-link action-link--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="action-link__mark">
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (external || download || native) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        download={download}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
