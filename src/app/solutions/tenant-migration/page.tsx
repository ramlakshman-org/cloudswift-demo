import type { Metadata } from "next";
import { ArrowLeftRight, Mail, ShieldCheck, FolderOpen, Clock, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Tenant & G-Suite Migration Services India | CloudSwift";
const description = "CloudSwift migrates mailboxes, files, and tenants from Google Workspace, legacy Exchange, or between Microsoft 365 tenants — zero data loss, minimal downtime.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/tenant-migration" },
  ...pageSocial(title, description, "/solutions/tenant-migration"),
};

const features = [
  { icon: <ArrowLeftRight />, accent: "teal" as const, title: "Tenant-to-Tenant Migration", body: "Move mailboxes, SharePoint sites, Teams, and OneDrive between Microsoft 365 tenants — common in mergers, acquisitions, and divestitures." },
  { icon: <Mail />, accent: "rust" as const, title: "G-Suite to Microsoft 365", body: "Migrate Gmail, Google Calendar, Google Drive, and Contacts to Exchange Online, SharePoint, and OneDrive with full fidelity." },
  { icon: <FolderOpen />, accent: "leaf" as const, title: "Legacy Exchange Migration", body: "Move on-premise Exchange or older hosted email platforms to Exchange Online without losing mail flow or calendar history." },
  { icon: <ShieldCheck />, accent: "gold" as const, title: "Zero Data Loss Validation", body: "Pre-migration discovery, delta sync, and post-migration reconciliation to confirm every mailbox, file, and permission moved correctly." },
  { icon: <Clock />, accent: "purple" as const, title: "Minimal Downtime Cutover", body: "Staged migration waves and DNS/MX cutover planning so users keep working with little to no disruption on go-live day." },
  { icon: <LifeBuoy />, accent: "teal" as const, title: "Post-Migration Support", body: "Hypercare support after cutover — fixing sync issues, retraining users, and decommissioning the old environment safely." },
];

const faqs = [
  {
    q: "Can CloudSwift migrate us from Google Workspace to Microsoft 365?",
    a: "Yes. CloudSwift specialises in G-Suite to Microsoft 365 migrations — moving Gmail, Google Calendar, Drive, and Contacts to Exchange Online, SharePoint, and OneDrive with zero data loss.",
  },
  {
    q: "What is tenant-to-tenant migration and when do we need it?",
    a: "Tenant-to-tenant migration moves mailboxes, Teams, SharePoint, and OneDrive content between two Microsoft 365 tenants. It's typically needed during mergers, acquisitions, divestitures, or company rebrands.",
  },
  {
    q: "Will our users experience downtime during migration?",
    a: "CloudSwift plans staged migration waves with minimal downtime — most users experience little to no disruption, with cutover scheduled outside business hours where possible.",
  },
  {
    q: "How does CloudSwift verify nothing was lost during migration?",
    a: "We run pre-migration discovery and post-migration reconciliation reports comparing mailbox counts, file counts, and permissions between source and destination to confirm a complete, accurate migration.",
  },
  {
    q: "Does CloudSwift support us after the migration is complete?",
    a: "Yes. We provide hypercare support immediately after cutover to resolve sync issues, retrain users on the new environment, and safely decommission the old platform.",
  },
];

export default function TenantMigrationPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Tenant & G-Suite Migration", href: "/solutions/tenant-migration" }]} />
      <ServiceSchema
        name="Tenant & G-Suite Migration Services India"
        description="CloudSwift migrates mailboxes, files, and tenants from Google Workspace, legacy Exchange, or between Microsoft 365 tenants — zero data loss, minimal downtime."
        url="/solutions/tenant-migration"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Migration Services"
          title="Tenant & G-Suite migration with zero data loss"
          body="CloudSwift plans and executes Microsoft 365 tenant-to-tenant migrations and Google Workspace to M365 migrations — every mailbox, file, and permission accounted for."
          cta={{ label: "Book Your Free Assessment", href: "/assessment" }}
          ctaSecondary={{ label: "Explore Microsoft 365", href: "/solutions/m365" }}
          teal
        />
        <FeatureGrid heading="Migration services we deliver" subheading="Capabilities" features={features} cols={3} />
        <FaqSection heading="Tenant & G-Suite migration — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
