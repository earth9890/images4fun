"use client";

export function PrivacyView() {
  return (
    <div className="flex-1">
      <div className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-ink-faint)]">Last updated: March 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-custom space-y-8">
          <section>
            <h2>The Short Version</h2>
            <p>
              Your images never leave your device. We don&apos;t upload, store, process, or access any of your files. Everything happens in your browser. That&apos;s it.
            </p>
          </section>

          <section>
            <h2>What Data We Collect</h2>
            <p>
              <strong>Image data:</strong> None. All image processing (compression, cropping, merging, conversion) happens entirely within your browser using JavaScript, WebAssembly, and the Canvas API. Your images are never sent to any server.
            </p>
            <p>
              <strong>Personal information:</strong> We do not require accounts, sign-ups, email addresses, or any form of personal information to use our tools.
            </p>
            <p>
              <strong>Analytics:</strong> We may use privacy-friendly analytics (without cookies) to understand aggregate usage patterns such as page views and tool usage. This data is anonymous and cannot be used to identify individual users.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              images4.fun does not use tracking cookies. We do not use any third-party advertising or marketing cookies. Your browser may store standard technical data (like cached files) to improve loading performance, but we do not set any cookies for tracking purposes.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              Our website is hosted as a static site. We may use a CDN (Content Delivery Network) to serve the website files faster. These services may log standard server access information (IP address, browser type, request time) as part of their normal operation, but we do not actively collect or analyze this data.
            </p>
          </section>

          <section>
            <h2>Data Storage</h2>
            <p>
              images4.fun does not have a backend server, database, or any form of persistent storage for user data. All processing happens in-memory within your browser session. When you close the tab, all data is gone.
            </p>
          </section>

          <section>
            <h2>Children&apos;s Privacy</h2>
            <p>
              Our service does not knowingly collect any data from children under 13. Since we don&apos;t collect personal information from any users, this applies universally.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Since we don&apos;t collect email addresses, we cannot notify you directly, so please check back periodically.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us via our GitHub repository or at hello@images4.fun.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
