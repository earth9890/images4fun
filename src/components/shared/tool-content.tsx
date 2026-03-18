"use client";

interface ToolContentProps {
  title: string;
  description: string;
  steps: string[];
  faqs: { q: string; a: string }[];
}

export function ToolContent({ title, description, steps, faqs }: ToolContentProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink)]">{title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">{description}</p>

      <h3 className="mb-4 text-base font-semibold text-[var(--color-ink)]">How to use</h3>
      <ol className="mb-10 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-xs font-semibold text-[var(--color-brand)]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <h3 className="mb-4 text-base font-semibold text-[var(--color-ink)]">FAQ</h3>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <h4 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">{faq.q}</h4>
            <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
