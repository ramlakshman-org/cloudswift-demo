import { Reveal } from "@/components/Reveal";
import { WHAT_WE_DO } from "@/lib/site-content";

export function WhatWeDoSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[860px] px-6 text-center">
        <Reveal>
          <p className="mb-6 text-sm font-medium uppercase tracking-wide text-teal">
            {WHAT_WE_DO.heading}
          </p>
          <div className="space-y-6">
            {WHAT_WE_DO.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg font-light leading-relaxed text-ink/90"
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
