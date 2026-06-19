import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { MAIN_CTA } from "@/lib/site-content";

export function MainCtaSection() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-light leading-tight tracking-tight text-ink md:text-[44px]">
            {MAIN_CTA.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-ink/85">
            {MAIN_CTA.body}
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="/get-started" variant="primary" className="px-8 py-4">
              {MAIN_CTA.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
