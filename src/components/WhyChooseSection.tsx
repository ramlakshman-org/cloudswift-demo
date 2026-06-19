import { Reveal } from "@/components/Reveal";

const differentiators = [
  {
    label: "ISO 9001-2015 Certified",
    desc: "Quality-managed processes across every engagement — consistent delivery, not best-effort.",
  },
  {
    label: "Microsoft Azure Partner",
    desc: "Certified expertise across the full Microsoft stack: Azure, Dynamics 365, M365, and Power BI.",
  },
  {
    label: "24/7 NOC Monitoring",
    desc: "Round-the-clock infrastructure oversight by dedicated engineers — not an answering service.",
  },
  {
    label: "India-Headquartered",
    desc: "Bengaluru HQ and Mumbai office. Local experts, India time zones, India compliance knowledge.",
  },
  {
    label: "Multi-cloud, Vendor-neutral",
    desc: "AWS, Azure, Google Cloud, VMware, Oracle — we manage the best fit for your workload, not the highest margin.",
  },
  {
    label: "End-to-End Ownership",
    desc: "From architecture design and migration to daily managed support — one partner, full lifecycle accountability.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">
            Why CloudSwift
          </p>
          <h2 className="text-3xl font-light leading-tight tracking-tight md:text-[40px]">
            What makes us different from every other IT vendor
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-white/10 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal
              key={i}
              delay={i * 60}
              className="bg-ink p-8 hover:bg-white/5 transition-colors"
            >
              <div className="mb-1 h-0.5 w-8 bg-teal" />
              <h3 className="mt-4 mb-2 text-base font-semibold text-white">
                {d.label}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
