import { CinematicPassage } from "@/components/sections/cinematic-passage";
import { AboutSection } from "@/components/sections/about-section";
import { HomepageMotionShell } from "@/components/motion/homepage-motion-shell";
import { ArchiveFoundation } from "@/components/sections/archive-foundation";
import { CapabilityGallery } from "@/components/sections/capability-gallery";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroFoundation } from "@/components/sections/hero-foundation";
import { InteractiveLabSection } from "@/components/sections/interactive-lab-section";
import { ResearchScenes } from "@/components/sections/research-scenes";
import { SelectedWorkFoundation } from "@/components/sections/selected-work-foundation";
import { JsonLd } from "@/components/seo/json-ld";
import { createPersonStructuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <HomepageMotionShell>
      <JsonLd data={createPersonStructuredData()} />
      <HeroFoundation />
      <CinematicPassage chapter="work" />
      <SelectedWorkFoundation />
      <CapabilityGallery />
      <InteractiveLabSection />
      <CinematicPassage chapter="research" />
      <ResearchScenes />
      <ArchiveFoundation />
      <AboutSection />
      <ContactSection />
    </HomepageMotionShell>
  );
}
