import type { Metadata } from "next";
import { Database, ArrowLeftRight, Server, Cloud, Cog, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Managed Oracle Cloud Services & MSP India | CloudSwift";
const description = "CloudSwift provides Oracle Cloud MSP services — advisory, migrations, managed Oracle IaaS and PaaS, Oracle Engineered Systems, and hybrid cloud support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/oracle-cloud" },
  ...pageSocial(title, description, "/solutions/oracle-cloud"),
};

const features = [
  { icon: <Cog />, accent: "teal" as const, title: "Oracle Cloud Advisory", body: "Assessment, roadmap planning, and architecture design for Oracle Cloud Infrastructure adoption tailored to your workloads." },
  { icon: <ArrowLeftRight />, accent: "rust" as const, title: "Oracle Cloud Migrations", body: "Migrate Oracle databases and applications to OCI with minimal disruption — planning, execution, and validated cutover." },
  { icon: <Database />, accent: "leaf" as const, title: "Managed Oracle IaaS", body: "Day-to-day management of Oracle Infrastructure-as-a-Service — provisioning, patching, monitoring, and capacity planning." },
  { icon: <Server />, accent: "gold" as const, title: "Oracle Engineered Systems", body: "Support and management for Oracle Exadata, Exalogic, and other Oracle Engineered Systems deployments." },
  { icon: <Cloud />, accent: "purple" as const, title: "Managed Oracle PaaS", body: "Platform-as-a-Service management for Oracle Database Cloud, Java Cloud, and integration services." },
  { icon: <LifeBuoy />, accent: "teal" as const, title: "Hybrid Oracle Cloud Support", body: "Connect on-premise Oracle environments with OCI for hybrid deployments, with 24/7 managed support across both." },
];

const faqs = [
  {
    q: "What Oracle Cloud services does CloudSwift provide?",
    a: "CloudSwift provides Oracle Cloud advisory, migrations to OCI, managed Oracle IaaS and PaaS, Oracle Engineered Systems support, and hybrid cloud connectivity between on-premise Oracle environments and OCI.",
  },
  {
    q: "Can CloudSwift migrate our existing Oracle databases to the cloud?",
    a: "Yes. CloudSwift plans and executes Oracle database and application migrations to Oracle Cloud Infrastructure, handling assessment, execution, and cutover with minimal downtime.",
  },
  {
    q: "Does CloudSwift offer 24/7 support for Oracle Cloud environments?",
    a: "Yes. CloudSwift provides 24/7 managed support for Oracle IaaS, PaaS, and Engineered Systems — including monitoring, patching, and incident response.",
  },
  {
    q: "Can CloudSwift support a hybrid Oracle Cloud setup?",
    a: "Yes. CloudSwift connects on-premise Oracle environments with Oracle Cloud Infrastructure for hybrid deployments, managing both sides under one support model.",
  },
  {
    q: "What is an Oracle Cloud MSP and why would we need one?",
    a: "An Oracle Cloud Managed Service Provider handles the ongoing operation, monitoring, and optimisation of your Oracle Cloud environment, so your team isn't managing infrastructure instead of running the business.",
  },
];

export default function OracleCloudPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Oracle Cloud", href: "/solutions/oracle-cloud" }]} />
      <ServiceSchema
        name="Managed Oracle Cloud Services & MSP India"
        description="CloudSwift provides Oracle Cloud MSP services — advisory, migrations, managed Oracle IaaS and PaaS, Oracle Engineered Systems, and hybrid cloud support."
        url="/solutions/oracle-cloud"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Oracle Cloud"
          title="Managed Oracle Cloud services, end to end"
          body="CloudSwift advises, migrates, and manages Oracle Cloud environments — IaaS, PaaS, Engineered Systems, and hybrid deployments — backed by 24/7 support."
          cta={{ label: "Get Your Free Assessment", href: "/assessment" }}
          ctaSecondary={{ label: "Explore Managed Cloud", href: "/managed-cloud" }}
          teal
        />
        <FeatureGrid heading="Oracle Cloud services we deliver" subheading="Capabilities" features={features} cols={3} />
        <FaqSection heading="Oracle Cloud — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
