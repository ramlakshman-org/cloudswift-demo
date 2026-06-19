import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const industries = [
  {
    name: "Financial Services",
    desc: "Compliance-ready cloud architecture with audit trails, data encryption, and identity governance — meeting RBI and SEBI cloud guidelines.",
    tags: ["Azure Security", "Compliance", "IAM"],
    href: "/contact",
  },
  {
    name: "Healthcare",
    desc: "HIPAA-equivalent data protection, always-on infrastructure, and secure collaboration for hospitals, diagnostics, and health-tech companies.",
    tags: ["Data Protection", "24/7 Uptime", "M365"],
    href: "/contact",
  },
  {
    name: "Manufacturing",
    desc: "ERP modernization with Dynamics 365, supply chain digitization, and hybrid cloud for shop-floor and enterprise systems integration.",
    tags: ["Dynamics 365 ERP", "Hybrid Cloud", "IIoT"],
    href: "/contact",
  },
  {
    name: "Retail & E-commerce",
    desc: "Scalable cloud infrastructure that handles seasonal spikes, unified CRM for customer data, and Power BI for real-time sales analytics.",
    tags: ["Power BI", "Dynamics CRM", "Azure Scale"],
    href: "/contact",
  },
];

export function IndustriesSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">
            Industries we serve
          </p>
          <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight text-ink md:text-[40px]">
            Cloud expertise built around your sector
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(13,27,53,0.05)] hover:shadow-[0_4px_32px_rgba(13,27,53,0.10)] transition-shadow"
            >
              <h3 className="mb-3 text-base font-semibold text-ink group-hover:text-teal transition-colors">
                {ind.name}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-ink/60 flex-1">
                {ind.desc}
              </p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {ind.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-teal/8 px-2.5 py-0.5 text-[11px] font-medium text-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={ind.href}
                className="text-[13px] font-medium text-rust hover:underline"
              >
                Talk to an expert →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
