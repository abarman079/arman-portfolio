interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${tone}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading__body">
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
