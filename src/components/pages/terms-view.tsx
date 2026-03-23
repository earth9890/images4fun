"use client";

export function TermsView() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-ink-faint)]">Last updated: March 18, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-custom space-y-8">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using images4.fun (&ldquo;the Service&rdquo;), you agree to these Terms of Service. The Service is a browser-based image processing tool that provides compression, cropping, merging, and format conversion capabilities. All processing occurs locally in your web browser. If you do not agree with these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2>2. What the Service Does</h2>
            <p>
              images4.fun provides four core image processing tools: <strong>Compress</strong> (reduce file size by re-encoding images with adjustable quality), <strong>Crop</strong> (trim images to custom dimensions with interactive handles), <strong>Merge</strong> (combine up to 10 images into horizontal, vertical, or grid layouts), and <strong>Convert</strong> (change between JPEG, PNG, WebP, and AVIF formats).
            </p>
            <p>
              All processing is performed client-side using WebAssembly codecs and the HTML Canvas API. No image data is transmitted to any server. The Service is delivered as a static website — there are no server-side API endpoints involved in image processing.
            </p>
          </section>

          <section>
            <h2>3. Acceptable Use</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:</p>
            <ul>
              <li>Use the Service to process content that is illegal in your jurisdiction</li>
              <li>Attempt to reverse-engineer, decompile, or extract proprietary portions of the Service&apos;s source code beyond what is publicly available</li>
              <li>Interfere with or disrupt the Service, its hosting infrastructure, or other users&apos; ability to access the Service</li>
              <li>Use automated tools, bots, or scrapers to excessively access or overload the Service&apos;s static hosting</li>
              <li>Misrepresent your identity or affiliation when communicating with us about the Service</li>
            </ul>
          </section>

          <section>
            <h2>4. Your Content and Intellectual Property</h2>
            <p>
              You retain complete ownership of all images you process using the Service. Since images are processed entirely within your browser and never transmitted to our servers, we have no access to, claim over, or license to your content at any point. The processed output files belong to you.
            </p>
            <p>
              The Service itself — including its user interface design, source code, written content, and visual assets — is the intellectual property of images4.fun and is protected by applicable copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, implied, or statutory. We do not warrant that:
            </p>
            <ul>
              <li>The Service will be available at all times without interruption</li>
              <li>Processing results will meet specific quality or accuracy requirements for all input files</li>
              <li>The Service will be compatible with all devices, browsers, or operating systems</li>
              <li>Specific file size reductions or quality levels will be achieved for any given image</li>
            </ul>
            <p>
              Image processing results depend on many factors including the input file, chosen settings, browser implementation, and device hardware. We recommend verifying output quality before using processed images in critical or professional applications.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, images4.fun and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of profits, business interruption, or loss of use, arising from or related to your use of the Service — regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise).
            </p>
          </section>

          <section>
            <h2>7. Service Availability and Modifications</h2>
            <p>
              We make reasonable efforts to keep the Service available and functional but do not guarantee uninterrupted access. We reserve the right to modify, update, suspend, or discontinue any aspect of the Service at any time, with or without notice. This includes adding new features, changing existing functionality, or removing tools.
            </p>
          </section>

          <section>
            <h2>8. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service. Updated terms will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Service after changes are posted constitutes acceptance of the updated terms. If you disagree with any changes, you should stop using the Service.
            </p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict-of-law principles. Any disputes arising from these Terms or the use of the Service shall be resolved through good-faith negotiation before pursuing formal legal proceedings.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at <strong>hello@images4.fun</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
