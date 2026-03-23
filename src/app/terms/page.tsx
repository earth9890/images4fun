import type { Metadata } from "next";
import { TermsView } from "@/components/pages/terms-view";

export const metadata: Metadata = {
  title: "Terms of Service — images4.fun",
  description:
    "Terms of service for images4.fun. Free, browser-based image processing tools with no sign-up required.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    title: "Terms of Service — images4.fun",
    description:
      "Terms of service for images4.fun. Free, browser-based image processing tools.",
    url: "https://images4.fun/terms",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service — images4.fun",
    description:
      "Terms of service for images4.fun. Free, browser-based image processing tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsView />;
}
