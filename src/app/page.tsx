import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LogosSection } from "@/components/LogosSection";
import { MigrationSection } from "@/components/MigrationSection";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { WhyDifferentSection } from "@/components/WhyDifferentSection";
import { WhereHelpSection } from "@/components/WhereHelpSection";
import { VMBannerSection } from "@/components/VMBannerSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { Footer } from "@/components/Footer";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema } from "@/components/SchemaMarkup";
import { PRICING_PLANS, formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Cloud Managed Services & Azure Partner India | CloudSwift",
  description:
    "ISO 9001-2015 certified cloud managed services company. Azure migration, Microsoft 365, Dynamics 365, Power BI, and 24/7 managed cloud support across India.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "What is CloudSwift?",
    a: "CloudSwift is an ISO 9001-2015 certified cloud and IT managed services company headquartered in Bengaluru, India. We help businesses plan, migrate, manage, and optimise their cloud infrastructure — with deep expertise in Microsoft Azure, Dynamics 365, Microsoft 365, and Power BI.",
  },
  {
    q: "Is CloudSwift a Microsoft Partner?",
    a: "Yes. CloudSwift is a certified Microsoft Azure Partner with accredited expertise across the full Microsoft cloud stack — Azure infrastructure, Dynamics 365 ERP/CRM, Microsoft 365 Modern Workplace, and Power BI analytics.",
  },
  {
    q: "Where is CloudSwift located?",
    a: "CloudSwift has its headquarters at WeWork Salarpuria Symbiosis, Bannerghatta Road, Bengaluru 560076, Karnataka, and a branch office in WeWork Spectrum Tower, Malad (West), Mumbai 400064. We serve businesses across India.",
  },
  {
    q: "What industries does CloudSwift serve?",
    a: "CloudSwift serves businesses across financial services, healthcare, manufacturing, retail and e-commerce, and professional services. Our multi-cloud expertise and Microsoft certifications make us a reliable partner for both regulated sectors and fast-growth companies.",
  },
  {
    q: "What is CloudSwift's managed cloud pricing?",
    a: `CloudSwift offers three managed cloud tiers: Silver (${formatPrice(PRICING_PLANS.silver.price)}/month) for proactive monitoring and business-hours support; Gold (${formatPrice(PRICING_PLANS.gold.price)}/month) for extended 16×7 support and weekly health checks; and Platinum (${formatPrice(PRICING_PLANS.platinum.price)}/month) for 24×7 NOC monitoring, daily reports, and a dedicated account manager.`,
  },
  {
    q: "How do I get started with CloudSwift?",
    a: "Book a free 30-minute Cloud Cost & Risk Assessment at oncloudswift.com/assessment. A CloudSwift cloud architect will walk through your current environment, budget risk areas, security exposure, and a realistic timeline — whether that's migration, managed services, or a specific Microsoft solution.",
  },
];

export default function Home() {
  return (
    <>
      <FaqSchema items={homeFaqs} />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LogosSection />
        <MigrationSection />
        <WhatWeDoSection />
        <WhyDifferentSection />
        <WhereHelpSection />
        <WhyChooseSection />
        <IndustriesSection />
        <VMBannerSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <FaqSection heading="Frequently asked questions about CloudSwift" items={homeFaqs} />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
