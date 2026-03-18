"use client";

export function TermsView() {
  return (
    <div className="flex-1">
      <div className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-ink-faint)]">Last updated: March 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-custom space-y-8">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using images4.fun (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              images4.fun provides free, browser-based image processing tools including compression, cropping, merging, and format conversion. All processing happens locally in your browser — no files are uploaded to our servers.
            </p>
          </section>

          <section>
            <h2>3. Use of the Service</h2>
            <p>You agree to use the Service only for lawful purposes. You may not:</p>
            <ul>
              <li>Use the Service to process illegal content</li>
              <li>Attempt to reverse-engineer, decompile, or extract the source code of the Service beyond what is publicly available</li>
              <li>Interfere with or disrupt the Service or its infrastructure</li>
              <li>Use automated systems to excessively access the Service</li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              The Service, including its design, code, and content, is the property of images4.fun and is protected by applicable intellectual property laws. You retain full ownership of any images you process using the Service.
            </p>
          </section>

          <section>
            <h2>5. No Warranty</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or that results will meet your specific requirements.
            </p>
            <p>
              While we strive for accuracy, image processing may produce results that vary depending on the input file, browser, and device. Always verify output quality before using processed images in critical applications.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, images4.fun shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, use, or profits, arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2>7. Availability</h2>
            <p>
              We strive to keep the Service available at all times but do not guarantee 100% uptime. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be reflected on this page with an updated date. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at hello@images4.fun.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
