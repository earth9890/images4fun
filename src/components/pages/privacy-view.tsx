"use client";

export function PrivacyView() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-ink-faint)]">Last updated: March 18, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-custom space-y-8">
          <section>
            <h2>Summary</h2>
            <p>
              images4.fun is a browser-based image processing tool. All image processing — including compression, cropping, merging, and format conversion — happens entirely within your web browser using JavaScript, WebAssembly, and the HTML Canvas API. <strong>Your images are never uploaded to any server.</strong> We do not have the technical capability to access, view, or store your images because there is no server-side processing infrastructure. The application is deployed as a static website.
            </p>
          </section>

          <section>
            <h2>Image Data</h2>
            <p>
              When you select an image on images4.fun, the file is read into your browser&apos;s memory using the JavaScript File API. It is then processed locally — either by a Web Worker running WebAssembly codecs (for compression and conversion) or by the Canvas API (for cropping and merging). The resulting output is made available as a downloadable Blob URL, which exists only in your browser&apos;s memory.
            </p>
            <p>
              At no point during this process is any image data transmitted over the network. There are no API calls, no upload endpoints, and no cloud storage involved. When you close the browser tab, all image data held in memory is released by the browser&apos;s garbage collector.
            </p>
          </section>

          <section>
            <h2>Personal Information</h2>
            <p>
              images4.fun does not require or collect any personal information. There are no user accounts, no email collection forms, no login screens, and no registration flows. You can use every feature of the service without providing any identifying information whatsoever.
            </p>
          </section>

          <section>
            <h2>Cookies and Local Storage</h2>
            <p>
              images4.fun does not set any cookies for tracking, advertising, or analytics purposes. We do not use any third-party advertising cookies, marketing pixels, or fingerprinting techniques. Your browser may cache static assets (HTML, CSS, JavaScript files) as part of standard web caching behavior, but this is handled by the browser itself and does not involve tracking.
            </p>
          </section>

          <section>
            <h2>Analytics</h2>
            <p>
              We may use privacy-friendly, cookie-free analytics to understand aggregate usage patterns such as total page views and which tools are used most frequently. This data is anonymous, aggregated, and cannot be used to identify or track individual users. We do not use Google Analytics, Facebook Pixel, or any other user-tracking analytics platform.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              The website is hosted as a static site on Vercel&apos;s global edge network. Vercel may log standard HTTP access information (IP address, user agent, request timestamp) as part of their infrastructure operations. We do not actively collect, analyze, or store this server access log data. We may display advertisements through Google AdSense, which is subject to <a href="https://policies.google.com/privacy" className="text-[var(--color-brand)] hover:underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              Since images4.fun does not collect personal data or image data, there is nothing to retain. All image processing occurs in volatile browser memory. There is no server-side database, file storage, or backup system that could hold user data. When your browser session ends, all data associated with your use of the site is gone.
            </p>
          </section>

          <section>
            <h2>Children&apos;s Privacy</h2>
            <p>
              images4.fun does not knowingly collect any data from children under the age of 13 (or the applicable age of consent in your jurisdiction). Since we do not collect personal information from any user regardless of age, this requirement is met inherently by our architecture.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              Under regulations like GDPR and CCPA, you have rights regarding your personal data. Since images4.fun does not collect, process, or store personal data, there is no personal data to access, correct, delete, or port. If you have questions about this, please contact us.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or for legal compliance. Changes will be posted on this page with an updated date. Since we do not collect contact information, we cannot send direct notifications — please review this page periodically.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at <strong>hello@images4.fun</strong> or through our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
