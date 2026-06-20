import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, Building2, GitMerge, ShieldCheck, Server, Database } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";
import { PRICING_PLANS, formatPrice } from "@/lib/pricing";

const title = "Managed Cloud Services India | CloudSwift";
const description = `CloudSwift manages public, private, hybrid, and Oracle Cloud environments for businesses across India. Silver, Gold & Platinum plans starting at ${formatPrice(PRICING_PLANS.silver.price)}/month.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/managed-cloud" },
  ...pageSocial(title, description, "/managed-cloud"),
};

const tiers = [
  { id: "public", icon: <Cloud />, accent: "teal" as const, title: "Public Cloud", body: "Managed services for AWS, Microsoft Azure, Office 365, and Google Cloud — infrastructure, operations, and cost optimisation." },
  { id: "private", icon: <Building2 />, accent: "rust" as const, title: "Private Cloud", body: "VMware, HyperV, and OpenStack private cloud management — provisioning, patching, monitoring, and support." },
  { id: "hybrid", icon: <GitMerge />, accent: "leaf" as const, title: "Hybrid Cloud", body: "Helion OpenStack, Cloud Computing, Data Replication, Cloud Storage, and Self-Service portals for hybrid environments." },
  { id: "security", icon: <ShieldCheck />, accent: "gold" as const, title: "Cloud Security", body: "Network Security, Backup & DR, Private WAN, Compliance monitoring, and 24/7 security operations." },
  { id: "data-centre", icon: <Server />, accent: "purple" as const, title: "Managed Data Centre", body: "Facilities management, Colocation services, On-Premise infrastructure, and Hybrid MPLS networking." },
  { id: "oracle", icon: <Database />, accent: "teal" as const, title: "Oracle Cloud", body: "Oracle MSP, Advisory Services, Cloud Migrations, Managed Oracle IaaS, Oracle Engineered Systems, Managed Oracle PaaS, and Hybrid Cloud." },
];

const serviceTiers = [
  {
    name: PRICING_PLANS.silver.name,
    price: formatPrice(PRICING_PLANS.silver.price),
    period: "/month",
    color: "border-ink/20",
    features: [
      "Proactive infrastructure monitoring",
      "Business-hours support (8×5)",
      "Monthly performance & health reports",
      "Email & ticket support",
    ],
  },
  {
    name: PRICING_PLANS.gold.name,
    price: formatPrice(PRICING_PLANS.gold.price),
    period: "/month",
    color: "border-teal border-2",
    features: [
      "Everything in Silver",
      "Extended support (16×7)",
      "Weekly health checks & reviews",
      "Priority response SLA",
      "Phone & email support",
    ],
  },
  {
    name: PRICING_PLANS.platinum.name,
    price: formatPrice(PRICING_PLANS.platinum.price),
    period: "/month",
    color: "border-ink/20",
    features: [
      "Everything in Gold",
      "24×7 NOC monitoring & response",
      "Daily health & security reports",
      "Dedicated account manager",
      "Custom SLA agreement",
    ],
  },
];

const faqs = [
  {
    q: "What cloud platforms does CloudSwift manage?",
    a: "CloudSwift manages public cloud (AWS, Microsoft Azure, Office 365, Google Cloud), private cloud (VMware, HyperV, OpenStack), hybrid cloud environments, Oracle Cloud IaaS/PaaS, and managed data centre infrastructure.",
  },
  {
    q: "What is included in the Silver managed cloud plan?",
    a: `The Silver plan (${formatPrice(PRICING_PLANS.silver.price)}/month) includes proactive infrastructure monitoring, business-hours support (8×5), monthly performance and health reports, and email and ticket support.`,
  },
  {
    q: "What does the Gold plan include?",
    a: `The Gold plan (${formatPrice(PRICING_PLANS.gold.price)}/month) includes everything in Silver, plus extended 16×7 support, weekly health checks and reviews, priority response SLA, and phone and email support.`,
  },
  {
    q: "What is the Platinum managed cloud plan?",
    a: `The Platinum plan (${formatPrice(PRICING_PLANS.platinum.price)}/month) delivers 24×7 NOC monitoring and response, daily health and security reports, a dedicated account manager, and a fully customised SLA agreement.`,
  },
  {
    q: "Does CloudSwift provide cloud BCP and disaster recovery?",
    a: "Yes. CloudSwift's managed cloud services include Business Continuity Planning (BCP) and Disaster Recovery (DR) — covering backup and restore, RTO/RPO planning, and failover testing to protect your business against unexpected outages.",
  },
];

export default function ManagedCloudPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Managed Cloud", href: "/managed-cloud" }]} />
      <ServiceSchema
        name="Managed Cloud Services India"
        description="CloudSwift manages public, private, hybrid, and Oracle Cloud environments for businesses across India. Silver, Gold & Platinum plans available."
        url="/managed-cloud"
        offers={[
          { name: "Silver Plan", price: PRICING_PLANS.silver.price.toFixed(2) },
          { name: "Gold Plan", price: PRICING_PLANS.gold.price.toFixed(2) },
          { name: "Platinum Plan", price: PRICING_PLANS.platinum.price.toFixed(2) },
        ]}
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-teal py-28 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Managed Cloud</p>
              <h1 className="mb-6 max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-[56px]">
                Your cloud, expertly managed
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/75">
                CloudSwift manages your cloud environment end-to-end — public, private, hybrid, Oracle Cloud, and BCP & DR — so you can focus on your business, not your infrastructure.
              </p>
            </Reveal>
          </div>
        </section>

        <FeatureGrid
          heading="Cloud platforms we manage"
          subheading="Coverage"
          features={tiers}
          cols={3}
        />

        {/* Pricing */}
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">Pricing</p>
              <h2 className="text-3xl font-light md:text-[40px]">Simple, transparent plans</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {serviceTiers.map((t, i) => (
                <Reveal key={i} delay={i * 80} className={`rounded-2xl border bg-white/5 p-8 ${t.color}`}>
                  <p className="mb-1 text-sm font-medium uppercase tracking-widest text-gold">{t.name}</p>
                  <p className="mb-6 text-4xl font-light text-white">
                    {t.price}<span className="text-lg text-white/50">{t.period}</span>
                  </p>
                  <ul className="space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/assessment"
                    className="mt-8 block w-full rounded-[6px] border border-white/30 px-4 py-3 text-center text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
                  >
                    Book Your Free Assessment
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FaqSection heading="Managed cloud — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
