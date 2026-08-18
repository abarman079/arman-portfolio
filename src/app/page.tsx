import { AboutSection } from "@/components/sections/about-section";
import { ArchiveFoundation } from "@/components/sections/archive-foundation";
import { CapabilityGallery } from "@/components/sections/capability-gallery";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroFoundation } from "@/components/sections/hero-foundation";
import { SelectedWorkFoundation } from "@/components/sections/selected-work-foundation";

export default function Home() {
  return (
    <main id="main-content">
      <HeroFoundation />
      <SelectedWorkFoundation />
      <CapabilityGallery />
      <ArchiveFoundation />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
