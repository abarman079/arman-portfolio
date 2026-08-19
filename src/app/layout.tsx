import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollLoader } from "@/components/motion/smooth-scroll-loader";
import { rootMetadata } from "@/lib/seo";

import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-interface",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${instrumentSerif.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <SmoothScrollLoader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
