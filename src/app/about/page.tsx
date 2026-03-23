import type { Metadata } from "next";
import { AboutView } from "@/components/pages/about-view";

export const metadata: Metadata = {
  title: "About — images4.fun",
  description:
    "Learn about images4.fun — free, private, browser-based image tools powered by WebAssembly. No uploads, no servers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    title: "About — images4.fun",
    description:
      "Learn about images4.fun — free, private, browser-based image tools powered by WebAssembly.",
    url: "https://images4.fun/about",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — images4.fun",
    description:
      "Free, private, browser-based image tools powered by WebAssembly. No uploads, no servers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
