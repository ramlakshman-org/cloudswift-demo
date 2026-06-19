import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Award, Lock, KeyRound, Server, ClipboardCheck, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { BreadcrumbSchema, FaqSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Cloud & IT Security | ISO 9001 Certified | CloudSwift";
const description = "CloudSwift secures your cloud and IT environment with ISO 9001-2015 certified processes, Azure-grade infrastructure security, encryption, and 24/7 monitoring.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  ...pageSocial(title, description, "/security"),
};

const faqs = [
  {
    q: "Is CloudSwift ISO certified for security and quality management?",
    a: "Yes. CloudSwift holds ISO 9001-2015 certification, reflecting our commitment to quality management systems, consistent delivery, and continuous improvement across every engagement.",
  },
  {
    q: "How does CloudSwift encrypt customer data?",
    a: "All data transmitted between your browser and our services is encrypted using TLS 1.2 or higher. Data at rest is encrypted using industry-standard AES-256 encryption.",
  },
  {
    q: "What access controls does CloudSwift enforce?",
    a: "CloudSwift enforces strict role-based access controls and multi-factor authentication across all internal systems. Access to client data is limited to authorised personnel only.",
  },
  {
    q: "How do I report a security vulnerability to CloudSwift?",
    a: "Email support@oncloudswift.com with details of the potential vulnerability. CloudSwift takes all reports seriously and responds within 24 hours.",
  },
];

const practices: { icon: ReactNode; heading: string; body: ReactNode }[] = [
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    heading: "ISO 9001-2015 certified",
    body: (
      <>
        CloudSwift holds{" "}
        <a href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noopener noreferrer" className="text-teal underline hover:text-teal-dark">
          ISO 9001-2015
        </a>{" "}
        certification, reflecting our commitment to quality
        management systems, consistent delivery, and continuous improvement across every
        engagement. Read more <Link href="/about" className="text-teal underline hover:text-teal-dark">about CloudSwift</Link>.
      </>
    ),
  },
  {
    icon: <Lock size={28} strokeWidth={1.5} />,
    heading: "Data encryption",
    body: "All data transmitted between your browser and our services is encrypted using TLS 1.2 or higher. Data at rest is encrypted using industry-standard AES-256 encryption.",
  },
  {
    icon: <KeyRound size={28} strokeWidth={1.5} />,
    heading: "Access control",
    body: "We enforce strict role-based access controls and multi-factor authentication across all internal systems. Access to client data is limited to authorised personnel only.",
  },
  {
    icon: <Server size={28} strokeWidth={1.5} />,
    heading: "Infrastructure security",
    body: (
      <>
        Our infrastructure runs on <Link href="/solutions/azure" className="text-teal underline hover:text-teal-dark">Microsoft Azure</Link> with
        enterprise-grade security controls including DDoS protection, network segmentation,
        Web Application Firewall, and continuous threat monitoring.
      </>
    ),
  },
  {
    icon: <ClipboardCheck size={28} strokeWidth={1.5} />,
    heading: "Compliance & auditing",
    body: "We conduct regular internal security reviews and maintain audit logs of all access to sensitive systems. Our processes are aligned with industry best practices and applicable regulations.",
  },
  {
    icon: <AlertTriangle size={28} strokeWidth={1.5} />,
    heading: "Incident response",
    body: "We maintain a documented incident response plan. In the event of a security incident affecting your data, we will notify affected parties promptly and take immediate remediation steps.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Security", href: "/security" }]} />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <section className="bg-teal py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Trust & Security</p>
            <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight md:text-[52px]">
              Security at CloudSwift
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">
              Protecting your data is fundamental to everything we do. Here&apos;s how we keep your information safe.
            </p>
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {practices.map((p) => (
                <div key={p.heading} className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(1,33,33,0.05)]">
                  <div className="mb-4 text-teal">{p.icon}</div>
                  <h2 className="mb-3 text-xl font-medium text-ink">{p.heading}</h2>
                  <p className="text-base leading-relaxed text-ink/65">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-ink p-10 text-white">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">Report a concern</p>
              <h2 className="mb-4 text-2xl font-light">Found a security issue?</h2>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-white/70">
                If you discover a potential security vulnerability in our systems, please contact us immediately.
                We take all reports seriously and will respond within 24 hours.
              </p>
              <a
                href="mailto:support@oncloudswift.com"
                className="inline-flex items-center gap-2 rounded-[6px] bg-rust px-6 py-3 text-sm font-medium text-white transition hover:bg-rust-dark"
              >
                Report to support@oncloudswift.com
              </a>
            </div>
          </div>
        </section>

        <FaqSection heading="Security — your questions answered" items={faqs} />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
