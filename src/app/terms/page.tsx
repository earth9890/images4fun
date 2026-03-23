import type { Metadata } from "next";
import { TermsView } from "@/components/pages/terms-view";

export const metadata: Metadata = {
  title: "Terms of Service — images4.fun",
  description:
    "Terms of service for images4.fun. Free, browser-based image processing tools with no sign-up required.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TermsView />;
}
