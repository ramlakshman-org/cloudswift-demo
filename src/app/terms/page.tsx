import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | CloudSwift",
  description: "Terms and conditions governing use of the CloudSwift website and services.",
};

const sections = [
  {
    heading: "Acceptance of terms",
    body: "By accessing or using the CloudSwift website (oncloudswift.com), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue use of our site.",
  },
  {
    heading: "Use of the website",
    body: "You may use this website for lawful purposes only. You must not use the site in any way that breaches applicable laws, infringes intellectual property rights, or transmits harmful or disruptive content.",
  },
  {
    heading: "Intellectual property",
    body: "All content on this website — including text, graphics, logos, and software — is the property of CloudSwift or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written permission.",
  },
  {
    heading: "Service descriptions",
    body: "Information on this website about CloudSwift services is provided for general informational purposes. We reserve the right to modify, suspend, or discontinue any service at any time. Specific terms for contracted services are governed by separate agreements.",
  },
  {
    heading: "Limitation of liability",
    body: "To the fullest extent permitted by law, CloudSwift shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided herein.",
  },
  {
    heading: "Third-party links",
    body: "This website may contain links to third-party websites. These links are provided for convenience only. CloudSwift does not endorse or take responsibility for the content, privacy practices, or accuracy of third-party sites.",
  },
  {
    heading: "Governing law",
    body: "These Terms of Use are governed by the laws of India. Any disputes arising from use of this website shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka, India.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these Terms of Use from time to time. Updated terms will be posted on this page with a revised effective date. Continued use of the website constitutes your acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Legal</p>
            <h1 className="mb-4 text-4xl font-light leading-tight tracking-tight md:text-[52px]">
              Terms of Use
            </h1>
            <p className="text-sm text-white/50">Effective date: 1 January 2024</p>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[780px] px-6">
            <p className="mb-12 text-base leading-relaxed text-ink/70">
              Please read these Terms of Use carefully before using the CloudSwift website or services.
              These terms form a legally binding agreement between you and CloudSwift.
            </p>

            <div className="space-y-10">
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="mb-3 text-xl font-medium text-ink">{s.heading}</h2>
                  <p className="text-base leading-relaxed text-ink/70">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-teal/5 p-8 ring-1 ring-teal/15">
              <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">Questions?</p>
              <p className="text-base leading-relaxed text-ink/70">
                For any questions about these Terms, contact us at{" "}
                <a href="mailto:support@oncloudswift.com" className="text-rust underline hover:text-rust-dark">
                  support@oncloudswift.com
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className="text-rust underline hover:text-rust-dark">
                  Contact page
                </Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
