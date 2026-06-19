import type { Metadata } from "next";
import { Building2, Users, Cog, Plug, TrendingUp, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Microsoft Dynamics 365 Implementation India | CloudSwift";
const description = "CloudSwift implements and supports Dynamics 365 ERP and CRM — Finance, Supply Chain, Sales, Customer Service. End-to-end D365 partner in Bengaluru & Mumbai.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/dynamics-365" },
  ...pageSocial(title, description, "/solutions/dynamics-365"),
};

const features = [
  { icon: <Building2 />, accent: "teal" as const, title: "Dynamics 365 ERP", body: "Finance, Supply Chain, Commerce, and Operations modules — implemented and configured to match your business processes." },
  { icon: <Users />, accent: "rust" as const, title: "Dynamics 365 CRM", body: "Sales, Customer Service, Marketing, and Field Service — unified customer engagement on one platform." },
  { icon: <Cog />, accent: "leaf" as const, title: "Implementation Services", body: "End-to-end D365 implementation: discovery, configuration, data migration, integration, UAT, and go-live support." },
  { icon: <Plug />, accent: "gold" as const, title: "Integration", body: "Connect Dynamics 365 with your existing systems — ERP, CRM, Power Platform, Azure services, and third-party apps." },
  { icon: <TrendingUp />, accent: "purple" as const, title: "Power BI + D365", body: "Unlock real-time business intelligence from your Dynamics data with native Power BI integration and custom dashboards." },
  { icon: <LifeBuoy />, accent: "teal" as const, title: "Ongoing Support", body: "Post-go-live managed support, user training, and continuous improvement to maximize your D365 investment." },
];

const faqs = [
  {
    q: "What Dynamics 365 modules does CloudSwift implement?",
    a: "CloudSwift implements the full Dynamics 365 suite — ERP modules (Finance, Supply Chain, Commerce, Operations) and CRM modules (Sales, Customer Service, Marketing, Field Service). We configure and integrate each module to match your specific business processes.",
  },
  {
    q: "Does CloudSwift handle Dynamics 365 data migration?",
    a: "Yes. Data migration is a core part of every CloudSwift D365 implementation. We handle source data extraction, cleansing, mapping, migration, and validation — ensuring your historical data moves accurately to Dynamics 365.",
  },
  {
    q: "Can CloudSwift integrate Dynamics 365 with existing systems?",
    a: "Yes. CloudSwift integrates Dynamics 365 with your existing systems including ERP platforms, Power Platform, Azure services, SharePoint, and third-party applications via standard connectors and custom APIs.",
  },
  {
    q: "Does CloudSwift provide post-go-live Dynamics 365 support?",
    a: "Yes. CloudSwift offers post-go-live managed support for Dynamics 365 — including user training, system administration, ongoing configuration, bug fixes, and continuous improvement to maximise your D365 investment.",
  },
  {
    q: "Can Power BI be connected to Dynamics 365?",
    a: "Yes. CloudSwift implements native Power BI integration with Dynamics 365, enabling real-time dashboards and business intelligence directly from your ERP and CRM data — with no custom middleware required.",
  },
];

export default function Dynamics365Page() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Dynamics 365", href: "/solutions/dynamics-365" }]} />
      <ServiceSchema
        name="Microsoft Dynamics 365 Implementation India"
        description="CloudSwift implements and supports Dynamics 365 ERP and CRM — Finance, Supply Chain, Sales, Customer Service — end-to-end across India."
        url="/solutions/dynamics-365"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Dynamics 365"
          title="Transform your business with Dynamics 365"
          body="CloudSwift implements and supports Microsoft Dynamics 365 ERP and CRM solutions — from initial discovery and configuration to data migration, integration, and post-go-live managed support."
          cta={{ label: "Talk to a D365 expert", href: "/contact" }}
          ctaSecondary={{ label: "Explore Power BI", href: "/solutions/power-bi" }}
        />
        <FeatureGrid heading="Dynamics 365 services" subheading="What we deliver" features={features} cols={3} />
        <FaqSection heading="Dynamics 365 — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
