import { AboutFoundation } from "@/components/sections/about-foundation";
import { ArchiveFoundation } from "@/components/sections/archive-foundation";
import { ContactFoundation } from "@/components/sections/contact-foundation";
import { ExpertiseFoundation } from "@/components/sections/expertise-foundation";
import { HeroFoundation } from "@/components/sections/hero-foundation";
import { SelectedWorkFoundation } from "@/components/sections/selected-work-foundation";

export default function Home() {
  return (
    <main id="main-content">
      <HeroFoundation />
      <SelectedWorkFoundation />
      <ExpertiseFoundation />
      <ArchiveFoundation />
      <AboutFoundation />
      <ContactFoundation />
    </main>
  );
}
