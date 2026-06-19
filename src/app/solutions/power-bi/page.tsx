import type { Metadata } from "next";
import { BarChart2, Database, Cpu, LayoutDashboard, Workflow, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MainCtaSection } from "@/components/MainCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqSchema, ServiceSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Power BI Consulting & Data Analytics India | CloudSwift",
  description: "CloudSwift builds Power BI dashboards, Azure data services, and AI-powered self-service analytics. Expert Power BI consulting for businesses across India.",
  alternates: { canonical: "/solutions/power-bi" },
};

const features = [
  { icon: <BarChart2 />, accent: "teal" as const, title: "Power BI Dashboards", body: "Design and deploy interactive Power BI dashboards that give leadership real-time visibility into operations, sales, and finance." },
  { icon: <Database />, accent: "rust" as const, title: "Azure DB Services", body: "Azure SQL, Cosmos DB, Synapse Analytics, and Data Factory — the data infrastructure that powers your analytics." },
  { icon: <Cpu />, accent: "leaf" as const, title: "AI-Powered Self-Service BI", body: "Enable business users to explore data independently with AI-assisted analytics, natural language queries, and automated insights." },
  { icon: <LayoutDashboard />, accent: "gold" as const, title: "Intelligent Dashboards", body: "Custom KPI dashboards for every business function — finance, HR, operations, sales — built to match your decision-making process." },
  { icon: <Workflow />, accent: "purple" as const, title: "Data Integration", body: "Connect data sources across Azure, Dynamics 365, Salesforce, and on-premise systems into a unified analytics layer." },
  { icon: <GraduationCap />, accent: "teal" as const, title: "Training & Support", body: "Power BI user training, workspace governance, and ongoing managed support to keep your analytics environment healthy." },
];

const faqs = [
  {
    q: "What Power BI services does CloudSwift provide?",
    a: "CloudSwift provides end-to-end Power BI services — dashboard design and deployment, Azure data infrastructure (SQL, Cosmos DB, Synapse Analytics), AI-powered self-service BI, data integration across Azure and Dynamics 365, and ongoing Power BI managed support and user training.",
  },
  {
    q: "Can CloudSwift connect Power BI to our existing systems?",
    a: "Yes. CloudSwift integrates Power BI with a wide range of data sources including Microsoft Azure, Dynamics 365, Salesforce, SAP, on-premise SQL databases, and custom APIs — creating a unified analytics layer across your organisation.",
  },
  {
    q: "What is AI-powered self-service BI?",
    a: "AI-powered self-service BI enables business users to explore data independently — using natural language queries, automated insights, and AI-assisted analytics in Power BI. CloudSwift configures these capabilities so non-technical users can get answers from data without needing IT involvement.",
  },
  {
    q: "Does CloudSwift build custom Power BI dashboards?",
    a: "Yes. CloudSwift designs and builds custom Power BI dashboards tailored to each business function — finance, HR, operations, sales, supply chain — with KPIs, drill-through reports, and real-time data refresh.",
  },
  {
    q: "Does CloudSwift provide Power BI training for our team?",
    a: "Yes. CloudSwift provides Power BI end-user training, workspace governance setup, and ongoing managed support to ensure your team can use and maintain your analytics environment confidently after deployment.",
  },
];

export default function PowerBIPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/services" }, { name: "Power BI", href: "/solutions/power-bi" }]} />
      <ServiceSchema
        name="Power BI Consulting & Data Analytics India"
        description="CloudSwift builds Power BI dashboards, Azure data services, and AI-powered self-service analytics for businesses across India."
        url="/solutions/power-bi"
      />
      <FaqSchema items={faqs} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Power BI & Analytics"
          title="Turn your data into decisions with Power BI"
          body="CloudSwift delivers end-to-end data and analytics services — from Azure data infrastructure and Power BI dashboards to AI-powered self-service BI that empowers every business user."
          cta={{ label: "Get in touch", href: "/contact" }}
          ctaSecondary={{ label: "Explore Dynamics 365", href: "/solutions/dynamics-365" }}
        />
        <FeatureGrid heading="Data & analytics services" subheading="What we deliver" features={features} cols={3} />
        <FaqSection heading="Power BI & Analytics — your questions answered" items={faqs} />
        <TestimonialsSection />
        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
