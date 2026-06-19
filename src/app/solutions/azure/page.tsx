import type { Metadata } from "next";
import { Server, ArrowLeftRight, ShieldCheck, Activity, Monitor, Headphones } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { Reveal } from "@/components/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Microsoft Azure Managed Services India | CloudSwift";
const description = "CloudSwift delivers end-to-end Microsoft Azure services — cloud migration, VDI, Azure security, and 24/7 managed support. Bengaluru & Mumbai based Azure partner.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/azure" },
  ...pageSocial(title, description, "/solutions/azure"),
};

const features = [
  { icon: <Server />, accent: "teal" as const, title: "Azure Infrastructure", body: "Design and deploy scalable, resilient Azure infrastructure tailored to your workload requirements and compliance needs." },
  { icon: <ArrowLeftRight />, accent: "rust" as const, title: "Cloud Migration", body: "Lift & Shift or re-architect workloads to Azure with minimal disruption. We handle planning, execution, and cutover." },
  { icon: <ShieldCheck />, accent: "leaf" as const, title: "Azure Security", body: "Microsoft Defender, Azure Sentinel, Identity & Access Management, and DLP policies to secure your cloud environment." },
  { icon: <Activity />, accent: "gold" as const, title: "Monitoring & Optimisation", body: "Azure Monitor, Log Analytics, and cost management tools to keep your environment performant and right-sized." },
  { icon: <Monitor />, accent: "purple" as const, title: "VDI on Azure", body: "Windows 10 Virtual Desktops, Remote Desktop Services, and Azure Virtual Desktop — managed end-to-end." },
  { icon: <Headphones />, accent: "teal" as const, title: "Managed Azure Support", body: "24/7 monitoring, patching, and incident management for your Azure environment by certified engineers." },
];

const faqs = [
  {
    q: "What Azure services does CloudSwift provide?",
    a: "CloudSwift provides end-to-end Microsoft Azure services including infrastructure design, cloud migration (lift & shift and re-architecture), Azure security (Defender, Sentinel, IAM, DLP), monitoring and cost optimisation, Azure Virtual Desktop (VDI), and 24/7 managed Azure support by certified engineers.",
  },
  {
    q: "Can CloudSwift migrate on-premise workloads to Azure?",
    a: "Yes. CloudSwift specialises in on-premise to Azure migrations — including lift & shift, re-architecture, and database migrations. We manage the full migration lifecycle: assessment, planning, execution, testing, and cutover with minimal business disruption.",
  },
  {
    q: "Does CloudSwift provide Azure Virtual Desktop (VDI) services?",
    a: "Yes. CloudSwift implements and manages Windows Virtual Desktop, Remote Desktop Services, and Azure Virtual Desktop — enabling your team to securely work from any location with fully managed virtual desktop infrastructure.",
  },
  {
    q: "What Azure security services does CloudSwift offer?",
    a: "CloudSwift secures Azure environments using Microsoft Defender, Azure Sentinel SIEM, Identity & Access Management (IAM), Data Loss Prevention (DLP), Conditional Access, and Multi-Factor Authentication — aligned with industry compliance standards.",
  },
  {
    q: "Is CloudSwift a certified Microsoft Azure partner in India?",
    a: "Yes. CloudSwift is a certified Microsoft Azure Partner headquartered in Bengaluru, India, with accredited engineers delivering Azure infrastructure, migration, security, and 24/7 managed support services.",
  },
];

export default function AzurePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Microsoft Azure", href: "/solutions/azure" }]} />
      <ServiceSchema
        name="Microsoft Azure Managed Services India"
        description="End-to-end Microsoft Azure services — infrastructure, migration, security, VDI, and 24/7 managed support by certified CloudSwift engineers."
        url="/solutions/azure"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Microsoft Azure"
          title="Azure cloud services, done right"
          body="From architecture design and migration to security and ongoing managed support — CloudSwift's certified Azure experts help you get more from Microsoft's cloud platform."
          cta={{ label: "Get in touch", href: "/contact" }}
          ctaSecondary={{ label: "All solutions", href: "/solutions/m365" }}
        />
        <FeatureGrid heading="Azure services we deliver" subheading="Capabilities" features={features} cols={3} />
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal>
              <div className="rounded-2xl bg-teal/8 p-10 ring-1 ring-teal/20 max-w-2xl">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-teal">VDI on Azure</p>
                <h3 className="mb-4 text-2xl font-light text-ink">Windows Virtual Desktops for your workforce</h3>
                <p className="text-base leading-relaxed text-ink/70">
                  Deploy secure, scalable virtual desktops on Azure — Windows 10 Virtual Desktops, Azure Virtual Desktop, VMware VDI Services, and Cloud Collaboration via Teams. Enable remote work without compromising security.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
        <FaqSection heading="Microsoft Azure — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
