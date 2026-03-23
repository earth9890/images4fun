export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
      <h1 className="mb-3 text-6xl font-semibold text-[var(--color-ink)]">404</h1>
      <p className="mb-8 text-lg text-[var(--color-ink-muted)]">
        Page not found
      </p>
      <a
        href="/"
        className="rounded-[10px] bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
      >
        Go back home
      </a>
    </main>
  );
}
