import { gsap } from "@/lib/gsap";

/** Called inside the existing homepage useGSAP context. Only decorative elements
 * are transformed; the document, links, headings and charts stay in normal flow.
 * ScrollTrigger owns progress. No listeners, pinning, second ticker or RAF. */
export function choreographPassages(root: HTMLElement) {
  for (const scene of root.querySelectorAll<HTMLElement>("[data-cinematic-passage]")) {
    const camera = scene.querySelector<HTMLElement>("[data-passage-camera]");
    const back = scene.querySelector<HTMLElement>('[data-passage-plane="back"]');
    const middle = scene.querySelector<HTMLElement>('[data-passage-plane="middle"]');
    const front = scene.querySelector<HTMLElement>('[data-passage-plane="front"]');
    const progress = scene.querySelector<HTMLElement>("[data-passage-progress]");
    if (!camera || !back || !middle || !front || !progress) continue;

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scene,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });
    if (scene.dataset.cinematicPassage === "work") {
      timeline
        .fromTo(camera, { rotationY: -10, rotationX: 5, scale: .88 }, { rotationY: 12, rotationX: -5, scale: 1.12 }, 0)
        .fromTo(back, { x: 0, y: 0, xPercent: -14, yPercent: 9, z: -130, rotationY: -27, rotationX: 14, scale: .86 }, { xPercent: -22, yPercent: 15, z: -30, rotationY: -8, rotationX: 4, scale: 1.12 }, 0)
        .fromTo(middle, { x: 0, y: 0, xPercent: 0, yPercent: 0, z: 0, rotationY: -27, rotationX: 14, scale: .96 }, { xPercent: 0, yPercent: 0, z: 95, rotationY: -8, rotationX: 4, scale: 1.18 }, 0)
        .fromTo(front, { x: 0, y: 0, xPercent: 14, yPercent: -9, z: 100, rotationY: -27, rotationX: 14, scale: 1 }, { xPercent: 22, yPercent: -15, z: 170, rotationY: -8, rotationX: 4, scale: 1.26 }, 0);
    } else {
      timeline
        .fromTo(camera, { rotationX: 12, rotationY: -12 }, { rotationX: -12, rotationY: 20 }, 0)
        .fromTo(back, { z: -100, scale: 1.05, rotation: -20 }, { z: 25, scale: 1.28, rotation: 38 }, 0)
        .fromTo(middle, { z: 0, scale: .72 }, { z: 75, scale: .88 }, 0)
        .fromTo(front, { z: 80, scale: .38 }, { z: 140, scale: .54 }, 0);
    }
    timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1 }, 0);
  }
}
