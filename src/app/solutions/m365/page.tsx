import type { Metadata } from "next";
import { MessageSquare, FolderOpen, Mail, ShieldCheck, Laptop, ArrowLeftRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Microsoft 365 Modern Workplace Solutions India | CloudSwift";
const description = "CloudSwift deploys and manages Microsoft 365 — Teams, SharePoint, Exchange, security hardening, and tenant migrations. M365 expertise across India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/m365" },
  ...pageSocial(title, description, "/solutions/m365"),
};

const features = [
  { icon: <MessageSquare />, accent: "teal" as const, title: "Microsoft Teams", body: "Deploy, configure, and manage Teams for collaboration, meetings, calling, and contact center workloads." },
  { icon: <FolderOpen />, accent: "rust" as const, title: "SharePoint & OneDrive", body: "Modern intranet portals, document management, and secure file sharing with SharePoint and OneDrive." },
  { icon: <Mail />, accent: "leaf" as const, title: "Exchange Online", body: "Migrate mailboxes to Exchange Online and manage your messaging environment with best-practice configuration." },
  { icon: <ShieldCheck />, accent: "gold" as const, title: "M365 Security", body: "Advanced Threat Protection, DLP, Endpoint Security, Conditional Access, and Multi-Factor Authentication." },
  { icon: <Laptop />, accent: "purple" as const, title: "Endpoint Management", body: "Microsoft Intune for device management, policy enforcement, and mobile device management across your fleet." },
  { icon: <ArrowLeftRight />, accent: "teal" as const, title: "Tenant & G-Suite Migration", body: "Migrate from Google Workspace, legacy Exchange, or between M365 tenants with zero data loss and minimal downtime." },
];

const faqs = [
  {
    q: "What Microsoft 365 services does CloudSwift provide?",
    a: "CloudSwift provides end-to-end Microsoft 365 services including Teams deployment, SharePoint and OneDrive setup, Exchange Online migration, M365 security hardening (ATP, DLP, MFA), Microsoft Intune endpoint management, and tenant or G-Suite migrations.",
  },
  {
    q: "Can CloudSwift migrate from Google Workspace to Microsoft 365?",
    a: "Yes. CloudSwift specialises in G-Suite to Microsoft 365 migrations — migrating emails, calendars, contacts, and files with zero data loss and minimal disruption to your business operations.",
  },
  {
    q: "Does CloudSwift handle Microsoft 365 security configuration?",
    a: "Yes. CloudSwift configures and manages M365 Advanced Threat Protection, Data Loss Prevention (DLP), Endpoint Security via Microsoft Intune, Conditional Access policies, and Multi-Factor Authentication — securing your Microsoft 365 environment against modern threats.",
  },
  {
    q: "Can CloudSwift set up Microsoft Teams for our organisation?",
    a: "Yes. CloudSwift deploys and configures Microsoft Teams for collaboration, meetings, calling, and contact centre workloads — including governance policies, channel structure, app integration, and user training.",
  },
  {
    q: "Does CloudSwift manage Microsoft 365 on an ongoing basis?",
    a: "Yes. CloudSwift provides ongoing managed support for Microsoft 365 environments — including licence management, security monitoring, user administration, and continuous configuration improvement.",
  },
];

export default function M365Page() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Microsoft 365", href: "/solutions/m365" }]} />
      <ServiceSchema
        name="Microsoft 365 Modern Workplace Solutions India"
        description="CloudSwift deploys and manages Microsoft 365 — Teams, SharePoint, Exchange Online, security hardening, Intune, and tenant migrations across India."
        url="/solutions/m365"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Microsoft 365"
          title="Modern Workplace powered by Microsoft 365"
          body="CloudSwift designs, deploys, and manages Microsoft 365 environments — from Teams and SharePoint to security hardening, device management, and tenant migrations."
          cta={{ label: "Book Your Free Assessment", href: "/assessment" }}
          ctaSecondary={{ label: "Explore Azure", href: "/solutions/azure" }}
          teal
        />
        <FeatureGrid heading="M365 services we deliver" subheading="Capabilities" features={features} cols={3} />
        <FaqSection heading="Microsoft 365 — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
