import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — images4.fun",
  description:
    "Get in touch with the images4.fun team. Questions, feedback, or partnership inquiries welcome.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact — images4.fun",
    description:
      "Get in touch with the images4.fun team. Questions, feedback, or partnership inquiries.",
    url: "https://images4.fun/contact",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary",
    title: "Contact — images4.fun",
    description:
      "Get in touch with the images4.fun team. Questions, feedback, or partnership inquiries.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Have questions, feedback, or a partnership inquiry? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-[14px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-8 text-center">
          <h2 className="mb-3 text-lg font-semibold text-[var(--color-ink)]">
            Email Us
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            The best way to reach us is by email. We typically respond within 24 hours.
          </p>
          <a
            href="mailto:hello@images4.fun"
            className="inline-block rounded-[10px] bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
          >
            hello@images4.fun
          </a>
        </div>
      </section>
    </main>
  );
}
