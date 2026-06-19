import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Award, Lock, KeyRound, Server, ClipboardCheck, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security | CloudSwift",
  description: "How CloudSwift protects your data and maintains enterprise-grade security standards.",
  alternates: { canonical: "/security" },
};

const practices: { icon: ReactNode; heading: string; body: string }[] = [
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    heading: "ISO 9001-2015 certified",
    body: "CloudSwift holds ISO 9001-2015 certification, reflecting our commitment to quality management systems, consistent delivery, and continuous improvement across every engagement.",
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
    body: "Our infrastructure runs on Microsoft Azure with enterprise-grade security controls including DDoS protection, network segmentation, Web Application Firewall, and continuous threat monitoring.",
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
      </main>
      <Footer />
    </>
  );
}
