import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "images4.fun — Free Online Image Tools",
  description:
    "Every image tool you need, 100% free. Compress, crop, merge, and convert images directly in your browser. No uploads, no servers, completely private.",
  keywords: [
    "image compressor",
    "image converter",
    "crop image online",
    "merge images",
    "compress JPEG",
    "convert to WebP",
    "convert to AVIF",
    "free image tools",
    "online image editor",
    "browser image processing",
    "privacy-first image tools",
  ],
  authors: [{ name: "images4.fun" }],
  creator: "images4.fun",
  publisher: "images4.fun",
  metadataBase: new URL("https://images4.fun"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://images4.fun",
    siteName: "images4.fun",
    title: "images4.fun — Free Online Image Tools",
    description:
      "Compress, crop, merge, and convert images for free. Everything runs in your browser — fast, private, and no sign-up required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "images4.fun — Free Online Image Tools",
    description:
      "Compress, crop, merge, and convert images for free. Everything runs in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#FFFAF6" />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
