import type { Metadata } from "next";
import { AboutView } from "@/components/pages/about-view";

export const metadata: Metadata = {
  title: "About — images4.fun",
  description:
    "Learn about images4.fun — free, private, browser-based image tools powered by WebAssembly. No uploads, no servers.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
