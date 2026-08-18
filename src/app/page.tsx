import { AboutSection } from "@/components/sections/about-section";
import { ArchiveFoundation } from "@/components/sections/archive-foundation";
import { CapabilityGallery } from "@/components/sections/capability-gallery";
import { ContactFoundation } from "@/components/sections/contact-foundation";
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
      <ContactFoundation />
    </main>
  );
}
