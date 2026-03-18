"use client";

import {
  ShieldKeyIcon,
  FlashIcon,
  GiftIcon,
  GlobalIcon,
  CodeIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";

const VALUES = [
  {
    icon: ShieldKeyIcon,
    title: "Privacy First",
    description:
      "Your images are processed entirely in your browser using WebAssembly. We never upload, store, or even see your files. There are no servers involved in processing — just your device.",
  },
  {
    icon: FlashIcon,
    title: "Blazing Fast",
    description:
      "Powered by WebAssembly codecs, our tools run at near-native speed. No waiting for uploads and downloads — results appear in milliseconds, right on your machine.",
  },
  {
    icon: GiftIcon,
    title: "Truly Free",
    description:
      "No sign-ups, no watermarks, no file limits, no premium tiers. Every tool is completely free to use, forever. We believe great tools should be accessible to everyone.",
  },
  {
    icon: GlobalIcon,
    title: "Works Everywhere",
    description:
      "images4.fun works on any modern browser — Chrome, Firefox, Safari, Edge. Desktop or mobile. No app to install, no plugins required.",
  },
  {
    icon: CodeIcon,
    title: "Modern Technology",
    description:
      "Built with Next.js, React, and WebAssembly. We use industry-standard codecs (jsquash) for encoding and decoding images at the highest quality.",
  },
  {
    icon: UserGroupIcon,
    title: "For Everyone",
    description:
      "Whether you're a designer resizing assets, a developer optimizing images, or someone who just needs to crop a photo — we built this for you.",
  },
];

export function AboutView() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            About images4.fun
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
            We believe image tools should be free, fast, and private. That&apos;s why we built a suite of browser-based tools that process everything locally on your device.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink)]">Our Story</h2>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <p>
            images4.fun was born out of frustration. Every time we needed to compress an image or convert a format, we had to upload files to some random website, wait for processing, and hope our data wasn&apos;t being stored somewhere. Many tools also had aggressive limits, watermarks, or forced sign-ups.
          </p>
          <p>
            We thought: modern browsers are incredibly powerful — they can run WebAssembly at near-native speed, handle canvas operations effortlessly, and manage complex image processing pipelines. Why are we still uploading files to servers?
          </p>
          <p>
            So we built images4.fun — a complete set of image tools that run 100% in your browser. Your images never leave your device. There are no servers processing your files, no accounts to create, and absolutely no cost. Just open the page and start working.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[var(--color-surface-sunken)] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-xl font-semibold text-[var(--color-ink)]">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-[12px] bg-[var(--color-surface-raised)] border border-[var(--color-edge)] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-brand-light)]">
                  <Icon icon={value.icon} size={20} className="text-[var(--color-brand)]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink)]">How It Works</h2>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <p>
            When you select an image, it&apos;s read directly into your browser&apos;s memory. For compression and conversion, we use Web Workers running WebAssembly-compiled codecs (JPEG, PNG, WebP, and AVIF) to decode and re-encode your images at the settings you choose.
          </p>
          <p>
            For cropping and merging, we use the Canvas API on the main thread — drawing your images onto an HTML canvas and exporting the result. It&apos;s the same technology that powers advanced web applications, games, and creative tools.
          </p>
          <p>
            The entire application is a static site — there&apos;s no backend server, no API, no database. The HTML, CSS, and JavaScript are served once, and everything else happens on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
