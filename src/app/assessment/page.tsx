import type { Metadata } from "next";
import { Server, Gauge, ShieldCheck, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { CalEmbed } from "@/components/CalEmbed";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Free Cloud Cost & Risk Assessment | CloudSwift";
const description = "Book a free 30-minute call with a CloudSwift cloud architect. We'll walk through your current environment, budget risk areas, security exposure, and a realistic timeline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/assessment" },
  ...pageSocial(title, description, "/assessment"),
};

const breakdown = [
  { icon: <Server />, accent: "teal" as const, title: "Current environment", body: "Where your infrastructure actually stands today, not what the diagram says." },
  { icon: <Gauge />, accent: "rust" as const, title: "Budget risk areas", body: "Where cloud spend is most likely to break, and why." },
  { icon: <ShieldCheck />, accent: "gold" as const, title: "Security exposure", body: "Gaps in access control, data protection, and compliance posture." },
  { icon: <Clock />, accent: "purple" as const, title: "Realistic timeline", body: "A timeline based on your actual setup, not a best-case estimate." },
];

export default function AssessmentPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Free Assessment", href: "/assessment" }]} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Free Cloud Cost & Risk Assessment"
          title="Find Out If Your Cloud Migration Is About to Go Over Budget — Before It Does"
          body="A free 30-minute call with a CloudSwift cloud architect. No sales pitch — just a clear-eyed look at your migration plan, your risk exposure, and where the budget usually breaks. You'll get a written summary within 24 hours either way."
        />

        <FeatureGrid features={breakdown} cols={4} />

        <section className="bg-cream pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-ink/55">
              ISO 9001-2015 Certified · Microsoft Azure Partner · Offices in Bengaluru &amp; Mumbai
            </p>
            <div className="mx-auto h-[700px] max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-[0_2px_24px_rgba(1,33,33,0.08)]">
              <CalEmbed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
