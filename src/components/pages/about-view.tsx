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
      "Every image you process stays on your device. We use WebAssembly to run encoding and decoding directly in your browser. There are no servers that receive, process, or store your images — the entire pipeline runs client-side. We built it this way intentionally because we believe your personal photos, documents, and creative work should remain private.",
  },
  {
    icon: FlashIcon,
    title: "Blazing Fast",
    description:
      "By processing locally, we eliminate the upload-wait-download cycle that slows down other tools. Our WebAssembly codecs (compiled from C/C++ originals) run at near-native speed. A typical 5MB JPEG compresses in under 500 milliseconds. There is no network latency because your data never travels to a server.",
  },
  {
    icon: GiftIcon,
    title: "Truly Free — No Tricks",
    description:
      "There are no premium tiers, no daily limits, no forced sign-ups, and no watermarks on your output. We do not gate features behind a paywall. The compress, crop, merge, and convert tools are fully functional for every visitor from the first click, and they will stay that way.",
  },
  {
    icon: GlobalIcon,
    title: "Cross-Platform Compatibility",
    description:
      "images4.fun runs in any modern browser — Chrome, Firefox, Safari, Edge, and Opera — on desktop, tablet, and mobile. There is nothing to install, no app to download, and no browser extension required. If your device has a web browser released in the last few years, it will work.",
  },
  {
    icon: CodeIcon,
    title: "Built on Open Standards",
    description:
      "The technology stack is built on Next.js, React, and TypeScript for the UI layer, with Web Workers running WebAssembly-compiled codecs (jsquash) for image encoding and decoding. Cropping and merging use the standard Canvas API. The entire application is deployed as a static site — no backend, no API, no database.",
  },
  {
    icon: UserGroupIcon,
    title: "Built for Real Workflows",
    description:
      "Whether you are a designer exporting assets at specific dimensions, a developer optimizing images for page speed, a social media manager preparing posts, or someone who just needs to make a photo smaller to email — these tools are designed to fit into your actual workflow without friction.",
  },
];

export function AboutView() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            About images4.fun
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
            A complete suite of image processing tools that run 100% in your browser. Free, fast, and designed to keep your files private.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink)]">Why We Built This</h2>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <p>
            images4.fun exists because we were tired of the existing options. Every time we needed to compress an image, crop a screenshot, or convert a format, the process was the same: find a website, upload the file, wait for server-side processing, and hope the service was not quietly storing copies of our images or injecting watermarks.
          </p>
          <p>
            Many existing tools impose artificial restrictions — limiting file sizes, requiring account creation, adding watermarks to free-tier output, or capping the number of daily operations. These friction points exist to funnel users toward paid plans, not because the technology demands it.
          </p>
          <p>
            We realized that modern web browsers are powerful enough to handle these tasks directly. WebAssembly runs compiled code at near-native speed. The Canvas API handles pixel manipulation natively. Web Workers enable background processing without blocking the UI. The entire image processing pipeline can run on the client side, with zero server involvement.
          </p>
          <p>
            So we built images4.fun: four essential image tools — compress, crop, merge, and convert — that process everything locally in your browser. Your images are read into memory, processed using WebAssembly codecs or the Canvas API, and the result is available for download. At no point does any image data leave your device.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-surface-sunken)] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-xl font-semibold text-[var(--color-ink)]">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <article key={value.title} className="rounded-[12px] bg-[var(--color-surface-raised)] border border-[var(--color-edge)] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-brand-light)]">
                  <Icon icon={value.icon} size={20} className="text-[var(--color-brand)]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technical details */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink)]">How the Technology Works</h2>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <p>
            <strong className="text-[var(--color-ink)] font-semibold">Image compression and conversion</strong> are handled by Web Workers running WebAssembly-compiled codecs via the jsquash library. When you select an image, we read it as an ArrayBuffer using the File API, transfer it to a background worker thread, decode it with the appropriate codec (JPEG, PNG, or WebP), and re-encode it with your chosen format and quality settings. The encoded result is transferred back to the main thread as a Blob, which generates the download link and preview.
          </p>
          <p>
            <strong className="text-[var(--color-ink)] font-semibold">Image cropping</strong> uses the Canvas API on the main thread. Your image is drawn onto an HTML canvas element, and when you define a crop region using the interactive handles, we use <code className="text-xs bg-[var(--color-surface-sunken)] px-1 py-0.5 rounded">canvas.toBlob()</code> to export just the selected portion. The aspect ratio constraints, handle dragging, and overlay rendering are all computed in real-time using pointer events and canvas drawing operations.
          </p>
          <p>
            <strong className="text-[var(--color-ink)] font-semibold">Image merging</strong> also uses the Canvas API. We calculate the total canvas dimensions based on your chosen layout (horizontal, vertical, or grid), gap size, and the dimensions of each input image. Each image is drawn onto the canvas at its computed position, and the final result is exported as a PNG Blob.
          </p>
          <p>
            <strong className="text-[var(--color-ink)] font-semibold">The application itself</strong> is built with Next.js 16 and React, compiled as a fully static site. There is no backend server, no API endpoints, no database, and no server-side rendering. The HTML, CSS, and JavaScript files are served once from a CDN, and every subsequent interaction happens entirely within your browser session. When you close the tab, all processed data is released from memory.
          </p>
        </div>
      </section>
    </main>
  );
}
