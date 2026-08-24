import { AboutSection } from "@/components/sections/about-section";
import { HomepageMotionShell } from "@/components/motion/homepage-motion-shell";
import { ArchiveFoundation } from "@/components/sections/archive-foundation";
import { CapabilityGallery } from "@/components/sections/capability-gallery";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroFoundation } from "@/components/sections/hero-foundation";
import { SelectedWorkFoundation } from "@/components/sections/selected-work-foundation";
import { JsonLd } from "@/components/seo/json-ld";
import { createPersonStructuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <HomepageMotionShell>
      <JsonLd data={createPersonStructuredData()} />
      <HeroFoundation />
      <SelectedWorkFoundation />
      <CapabilityGallery />
      <ArchiveFoundation />
      <AboutSection />
      <ContactSection />
    </HomepageMotionShell>
  );
}
