import styles from "./cinematic-passage.module.css";

const chapters = {
  work: {
    number: "01 / SELECTED PROJECTS",
    title: "From interface to infrastructure.",
    description: "A closer look at the applications, APIs and systems behind the screen.",
    action: "Continue to selected work",
    href: "#work",
    index: "INTERFACE / LOGIC / DATA",
  },
  research: {
    number: "02 / RESEARCH",
    title: "From graphics to measured results.",
    description: "The next experiments compare model performance and the choices that affect it.",
    action: "Continue to research",
    href: "#research",
    index: "INPUT / EVALUATION / RESULT",
  },
} as const;

export function CinematicPassage({ chapter }: { chapter: keyof typeof chapters }) {
  const scene = chapters[chapter];
  const headingId = `passage-${chapter}-title`;

  return (
    <section
      className={`cinematic-v2 ${styles.passage} ${styles[chapter]}`}
      aria-labelledby={headingId}
      data-cinematic-passage={chapter}
    >
      <div className={styles.stage}>
        <div className={styles.art} aria-hidden="true">
          <div className={styles.camera} data-passage-camera>
            {chapter === "work" ? (
              <>
                <div className={`${styles.plane} ${styles.back}`} data-passage-plane="back"><i /><i /><i /></div>
                <div className={`${styles.plane} ${styles.middle}`} data-passage-plane="middle"><i /><i /><i /></div>
                <div className={`${styles.plane} ${styles.front}`} data-passage-plane="front"><i /><i /><i /></div>
              </>
            ) : (
              <>
                <div className={`${styles.ring} ${styles.ringOuter}`} data-passage-plane="back" />
                <div className={`${styles.ring} ${styles.ringMiddle}`} data-passage-plane="middle" />
                <div className={`${styles.ring} ${styles.ringInner}`} data-passage-plane="front" />
              </>
            )}
          </div>
          <span className={styles.axis} />
        </div>
        <div className={styles.content}>
          <p className={styles.kicker}>{scene.number}</p>
          <h2 id={headingId}>{scene.title}</h2>
          <p className={styles.description}>{scene.description}</p>
          <a href={scene.href} className={styles.action}>{scene.action}<span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.foot} aria-hidden="true">
          <span>{scene.index}</span><span className={styles.track}><i data-passage-progress /></span><span>ARMAN.</span>
        </div>
      </div>
    </section>
  );
}
