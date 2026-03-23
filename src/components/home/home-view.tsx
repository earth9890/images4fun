"use client";

import { clsx } from "clsx";
import {
  FileMinusIcon,
  Layers01Icon,
  CropIcon,
  RefreshIcon,
  ShieldKeyIcon,
  FlashIcon,
  GiftIcon,
  GlobalIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { TOOLS } from "@/lib/constants";
import type { IconSvgElement } from "@hugeicons/react";

const iconMap: Record<string, IconSvgElement> = {
  "file-minus-02": FileMinusIcon,
  "layers-01": Layers01Icon,
  crop: CropIcon,
  refresh: RefreshIcon,
};

const toolColorMap: Record<string, { bg: string; light: string }> = {
  compress: { bg: "var(--color-tool-compress)", light: "var(--color-tool-compress-light)" },
  crop: { bg: "var(--color-tool-crop)", light: "var(--color-tool-crop-light)" },
  merge: { bg: "var(--color-tool-merge)", light: "var(--color-tool-merge-light)" },
  convert: { bg: "var(--color-tool-convert)", light: "var(--color-tool-convert-light)" },
};

const FEATURES = [
  {
    icon: ShieldKeyIcon,
    title: "100% Private",
    description: "Everything runs locally in your browser using WebAssembly. No uploads, no servers, no tracking. Your files never leave your device.",
  },
  {
    icon: FlashIcon,
    title: "Lightning Fast",
    description: "WebAssembly-powered codecs deliver near-native performance. Process images in milliseconds, not minutes — no waiting for server round-trips.",
  },
  {
    icon: GiftIcon,
    title: "Completely Free",
    description: "No sign-ups, no watermarks, no file limits, no premium tiers. Every tool is free and open to everyone, forever.",
  },
  {
    icon: GlobalIcon,
    title: "Works Everywhere",
    description: "Chrome, Firefox, Safari, Edge — desktop and mobile. No plugins or installations required. Just open the page and start working.",
  },
];

const TOOL_DETAILS: Record<string, { tagline: string; bullets: string[]; howItWorks: string }> = {
  compress: {
    tagline: "Reduce file size while keeping quality high",
    bullets: ["JPEG, PNG, WebP, AVIF output", "Quality slider for precise control", "Optional resize with max dimensions"],
    howItWorks: "Our compressor uses WebAssembly-compiled codecs to decode your image and re-encode it at your chosen quality level. The entire process happens in a Web Worker, so your browser stays responsive.",
  },
  crop: {
    tagline: "Trim images to the exact size you need",
    bullets: ["Interactive drag-to-crop canvas", "Preset ratios: 1:1, 4:3, 3:2, 16:9", "PNG or JPEG output"],
    howItWorks: "Drag the crop handles on the interactive canvas to select your desired area. Choose from preset aspect ratios or go freeform. The Canvas API exports your cropped region pixel-perfect.",
  },
  merge: {
    tagline: "Combine multiple images into a single file",
    bullets: ["Horizontal, vertical, or grid layout", "Drag-to-reorder image list", "Adjustable gap and background color"],
    howItWorks: "Upload up to 10 images, arrange them in your preferred layout, and adjust spacing and background. The merge is performed using the HTML Canvas API entirely in your browser.",
  },
  convert: {
    tagline: "Switch between image formats instantly",
    bullets: ["Supports JPEG, PNG, WebP, AVIF", "Quality control for lossy formats", "See size comparison instantly"],
    howItWorks: "Select your target format and quality. Our WebAssembly codecs decode your original and re-encode it to the new format. You can instantly compare file sizes to pick the best option.",
  },
};

export function HomeView() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-5 text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl animate-fade-in">
            Every image tool you need, in one place
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)] md:text-xl animate-slide-up">
            Compress, crop, merge, and convert images — all 100% free and running entirely in your browser. No uploads, no servers, completely private.
          </p>
        </div>
      </section>

      {/* Tool cards grid */}
      <section className="mx-auto max-w-5xl px-4 -mt-6 md:-mt-10" aria-label="Image tools">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, i) => {
            const icon = iconMap[tool.icon];
            const colors = toolColorMap[tool.id];
            return (
              <a
                key={tool.id}
                href={tool.route}
                className={clsx(
                  "group flex flex-col items-start gap-4 rounded-[14px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-6 text-left",
                  "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-[var(--color-edge-strong)]",
                  `animate-slide-up delay-${i + 1}`
                )}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[12px] transition-all duration-200 group-hover:scale-110"
                  style={{ backgroundColor: colors.light }}
                >
                  {icon && (
                    <span style={{ color: colors.bg }}>
                      <Icon icon={icon} size={22} />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--color-ink)]">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {tool.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Tool details section */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="mb-12 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Powerful tools, simple to use
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TOOLS.map((tool) => {
            const icon = iconMap[tool.icon];
            const details = TOOL_DETAILS[tool.id];
            const colors = toolColorMap[tool.id];
            return (
              <article key={tool.id} className="rounded-[14px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                    style={{ backgroundColor: colors.light }}
                  >
                    {icon && <span style={{ color: colors.bg }}><Icon icon={icon} size={18} /></span>}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-ink)]">{tool.name}</h3>
                </div>
                <p className="mb-3 text-sm text-[var(--color-ink-muted)]">{details.tagline}</p>
                <ul className="space-y-1.5 mb-4">
                  {details.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--color-ink-muted)]">
                      <span className="mt-0.5 shrink-0" style={{ color: colors.bg }}><Icon icon={Tick01Icon} size={14} /></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-[var(--color-ink-faint)] mb-4">{details.howItWorks}</p>
                <a
                  href={tool.route}
                  className="inline-block rounded-[8px] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: colors.bg }}
                >
                  Try {tool.name} tool
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--color-surface-raised)] py-20 border-y border-[var(--color-edge)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            How images4.fun works
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Our technology is fundamentally different from other image tools. Instead of uploading your files to a remote server, we bring the processing power directly to your browser.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-lg font-semibold">1</div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Select your file</h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">Drag and drop your image or click to browse. Supported formats include JPEG, PNG, and WebP. Files up to 50MB are accepted.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-lg font-semibold">2</div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Adjust settings</h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">Choose your output format, quality level, crop region, or merge layout. Changes apply instantly with a live preview so you can see results before downloading.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-lg font-semibold">3</div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Download result</h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">Download your processed image with one click. No watermarks, no sign-ups. The file is generated entirely on your device and never touches any server.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-[var(--color-surface-sunken)] py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            Why choose images4.fun?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-[var(--color-ink-muted)]">
            Unlike other tools that upload your images to remote servers, we process everything directly in your browser using WebAssembly technology.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-edge)] shadow-sm">
                  <Icon icon={feature.icon} size={22} className="text-[var(--color-brand)]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is images4.fun really free?",
                a: "Yes, completely free. There are no hidden charges, premium tiers, or sign-up requirements. Every tool is available to everyone without limits.",
              },
              {
                q: "Are my images uploaded to a server?",
                a: "No. All processing happens locally in your browser using WebAssembly and the Canvas API. Your images never leave your device. There is no backend server involved in processing — we simply serve the static website files.",
              },
              {
                q: "What image formats are supported?",
                a: "We support JPEG, PNG, and WebP as input formats. For output, you can choose JPEG, PNG, WebP, or AVIF depending on the tool. AVIF offers excellent compression for modern browsers.",
              },
              {
                q: "Is there a file size limit?",
                a: "The maximum file size is 50MB per image. Since processing happens in your browser, very large files may take longer depending on your device's performance.",
              },
              {
                q: "What browsers are supported?",
                a: "images4.fun works on all modern browsers including Chrome, Firefox, Safari, and Edge on both desktop and mobile devices. No plugins or extensions are required.",
              },
              {
                q: "How does the compression work?",
                a: "We use WebAssembly-compiled versions of industry-standard codecs (via jsquash) to decode your image and re-encode it at your chosen quality and format. This runs in a background Web Worker so your page remains responsive.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
                <h3 className="text-sm font-semibold text-[var(--color-ink)] mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[var(--color-surface-sunken)] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-sm text-[var(--color-ink-muted)]">
            Pick a tool and start processing your images. No sign-up required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TOOLS.map((tool) => {
              const colors = toolColorMap[tool.id];
              return (
                <a
                  key={tool.id}
                  href={tool.route}
                  className="rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: colors.bg }}
                >
                  {tool.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
