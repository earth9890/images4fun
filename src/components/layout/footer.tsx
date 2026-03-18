"use client";

import { TOOLS } from "@/lib/constants";

interface FooterProps {
  onNavigate: (hash: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[var(--color-surface-dark)] text-[var(--color-ink-on-dark)]">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => onNavigate("#/")}
              className="flex items-center gap-2 group"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[var(--color-brand)] text-white text-xs font-semibold">
                i4
              </span>
              <span className="text-base font-semibold tracking-tight">
                images4.fun
              </span>
            </button>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Free, private, browser-based image tools. No uploads, no accounts, no limits.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Tools
            </p>
            <ul className="flex flex-col gap-2.5">
              {TOOLS.map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.route)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {tool.name} Image
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "About Us", route: "#/about" },
                { label: "Privacy Policy", route: "#/privacy" },
                { label: "Terms of Service", route: "#/terms" },
              ].map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => onNavigate(link.route)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Supported Formats
            </p>
            <div className="flex flex-wrap gap-2">
              {["JPEG", "PNG", "WebP", "AVIF"].map((fmt) => (
                <span
                  key={fmt}
                  className="rounded-[6px] bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} images4.fun. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Made with care. Your images never leave your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
