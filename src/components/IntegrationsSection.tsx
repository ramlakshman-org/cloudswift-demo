import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { INTEGRATIONS, INTEGRATION_LOGOS } from "@/lib/site-content";

export function IntegrationsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="max-w-xl">
            <h2 className="text-3xl font-light leading-tight tracking-tight text-ink md:text-[40px]">
              {INTEGRATIONS.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/85">
              {INTEGRATIONS.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {INTEGRATIONS.ctas.map((c) => (
                <CtaButton
                  key={c.label}
                  href={c.href}
                  variant={c.primary ? "primary" : "outline"}
                >
                  {c.label}
                </CtaButton>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {INTEGRATION_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex aspect-square items-center justify-center rounded-xl bg-surface p-4 shadow-[0_1px_8px_rgba(1,33,33,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(1,33,33,0.10)]"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
