import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { MainCtaSection } from "@/components/MainCtaSection";
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "IT Managed Services | CloudSwift India",
  description: "CloudSwift delivers end-user support, systems and network management, cloud BCP & DR, and advisory services across India. Based in Bengaluru and Mumbai.",
  alternates: { canonical: "/services" },
};

const serviceGroups = [
  {
    id: "end-user",
    title: "End-User Support Services",
    accent: "teal",
    services: ["Collaboration", "Identity", "Mobility", "Deskside Support", "Help Desk", "Managed Print"],
    desc: "Comprehensive support for every end-user touchpoint — from collaboration tools and identity management to mobile devices, deskside support, and managed printing.",
  },
  {
    id: "systems",
    title: "Systems Support",
    accent: "rust",
    services: ["Servers", "Virtualization", "Storage", "Operating Systems", "Database Management"],
    desc: "Proactive management of your core infrastructure — physical and virtual servers, storage, OS patching, and database administration.",
  },
  {
    id: "network",
    title: "Network Support",
    accent: "leaf",
    services: ["Managed Security", "Managed LANs", "Managed Wireless"],
    desc: "Full-stack network management: security monitoring, LAN management, and wireless infrastructure — all under a single managed service agreement.",
  },
  {
    id: "uptime",
    title: "Business Uptime Services",
    accent: "gold",
    services: ["Proactive Monitoring", "Data Protection", "Virtual Bench", "Virtual Employee"],
    desc: "Keep your business running 24/7 with proactive monitoring, robust data protection, and flexible virtual resource models to cover gaps and scale on demand.",
  },
  {
    id: "advisory",
    title: "Advisory Services",
    accent: "purple",
    services: ["Security Assessment", "Infrastructure Assessment"],
    desc: "Independent expert assessments of your security posture and IT infrastructure — identifying gaps, risks, and cost optimisation opportunities.",
  },
  {
    id: "projects",
    title: "Project Services",
    accent: "teal",
    services: ["Design & Architecture", "Build & Deploy", "Migrations", "Integration"],
    desc: "Hands-on project delivery: design, build, migrate, and integrate IT systems with precision, speed, and minimum business disruption.",
  },
  {
    id: "bcp-dr",
    title: "Cloud BCP & DR",
    accent: "rust",
    services: ["Business Continuity Planning", "Disaster Recovery", "Backup & Restore", "RTO/RPO Planning", "Failover Testing"],
    desc: "Protect your business against the unexpected — CloudSwift designs and manages BCP and DR solutions that minimise downtime and data loss when it matters most.",
  },
];

const accentStyles: Record<string, { border: string; tag: string; dot: string }> = {
  teal: { border: "border-teal/20 hover:border-teal/50", tag: "text-teal", dot: "bg-teal" },
  rust: { border: "border-rust/20 hover:border-rust/50", tag: "text-rust", dot: "bg-rust" },
  leaf: { border: "border-leaf/20 hover:border-leaf/50", tag: "text-leaf", dot: "bg-leaf" },
  gold: { border: "border-gold/30 hover:border-gold/60", tag: "text-[#8a6a00]", dot: "bg-gold" },
  purple: { border: "border-purple/20 hover:border-purple/50", tag: "text-purple", dot: "bg-purple" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <ServiceSchema
        name="IT Managed Services India"
        description="CloudSwift delivers end-user support, systems and network management, cloud BCP & DR, and advisory services across India. Based in Bengaluru and Mumbai."
        url="/services"
      />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Our Services</p>
              <h1 className="mb-6 max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-[52px]">
                End-to-end IT services — support, infrastructure & cloud
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/70">
                From help desk and end-user support to systems management, BCP & DR, advisory assessments, and complex project delivery — CloudSwift covers every layer of your IT lifecycle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Service groups */}
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {serviceGroups.map((g) => {
                const s = accentStyles[g.accent];
                return (
                  <div key={g.id} id={g.id} className="scroll-mt-24">
                  <Reveal
                    className={`rounded-2xl border bg-white p-8 shadow-[0_2px_20px_rgba(1,33,33,0.05)] transition-all ${s.border}`}
                  >
                    <p className={`mb-3 text-xs font-semibold uppercase tracking-widest ${s.tag}`}>
                      {g.title}
                    </p>
                    <p className="mb-5 text-base leading-relaxed text-ink/65">{g.desc}</p>
                    <ul className="space-y-2">
                      {g.services.map((svc) => (
                        <li key={svc} className="flex items-center gap-2 text-sm text-ink/70">
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                          {svc}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
