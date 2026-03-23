import type { Metadata } from "next";
import { PrivacyView } from "@/components/pages/privacy-view";

export const metadata: Metadata = {
  title: "Privacy Policy — images4.fun",
  description:
    "Privacy policy for images4.fun. All image processing happens in your browser. We never upload, store, or access your images.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
