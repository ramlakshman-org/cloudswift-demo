import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { HeroIllustration } from "@/components/HeroIllustration";
import { HERO } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* top hairline divider */}
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-t border-ink/10" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-6 text-sm font-medium text-teal">{HERO.eyebrow}</p>
          <h1 className="text-[40px] font-extralight leading-[1.15] tracking-[-0.01em] text-ink sm:text-[48px] lg:text-[52px]">
            {HERO.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/90">
            {HERO.body}
          </p>
          <div className="mt-8">
            <CtaButton href="#" variant="primary" className="px-7 py-3.5">
              {HERO.cta}
            </CtaButton>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative h-[380px] w-full lg:h-[460px]">
          <Image
            src={HERO.creasePattern}
            alt=""
            width={200}
            height={240}
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60"
            aria-hidden
          />
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
