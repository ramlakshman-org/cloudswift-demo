import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CloudSwift",
  description: "How CloudSwift collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "Information we collect",
    body: "We collect information you provide directly — such as your name, email address, company name, and message when you fill out a contact or booking form. We may also collect usage data such as pages visited and time spent on site through analytics tools.",
  },
  {
    heading: "How we use your information",
    body: "We use the information collected to respond to your enquiries, provide our services, send relevant communications you have opted into, and improve our website and offerings. We do not sell your personal data to third parties.",
  },
  {
    heading: "Data storage and security",
    body: "Your data is stored securely on servers located within India and processed in accordance with applicable data protection regulations. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse.",
  },
  {
    heading: "Cookies",
    body: "Our website uses essential cookies to ensure the site functions correctly, and optional analytics cookies to understand how visitors use the site. You can control cookie preferences through your browser settings.",
  },
  {
    heading: "Third-party services",
    body: "We may use third-party services such as Microsoft Azure, Google Analytics, or email delivery providers. These services have their own privacy policies and we encourage you to review them.",
  },
  {
    heading: "Your rights",
    body: "You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us at support@oncloudswift.com.",
  },
  {
    heading: "Changes to this policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our site constitutes acceptance of the revised policy.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Legal</p>
            <h1 className="mb-4 text-4xl font-light leading-tight tracking-tight md:text-[52px]">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/50">Effective date: 1 January 2024</p>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[780px] px-6">
            <p className="mb-12 text-base leading-relaxed text-ink/70">
              CloudSwift (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy.
              This policy explains how we collect, use, and safeguard the personal information you provide when using our website or services.
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
              <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">Contact us</p>
              <p className="text-base leading-relaxed text-ink/70">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
