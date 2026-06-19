import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
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
            <CtaButton href="/get-started" variant="primary" className="px-7 py-3.5">
              {HERO.cta}
            </CtaButton>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative h-[320px] w-full lg:h-[440px]">
          <Image
            src={HERO.creasePattern}
            alt=""
            width={200}
            height={240}
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60"
            aria-hidden
          />
          <Image
            src={HERO.bgPattern}
            alt=""
            aria-hidden
            fill
            priority
            className="object-contain object-right"
          />
          {/* Colorful stacked-hexagon tower */}
          <Image
            src={HERO.hexStack}
            alt="AI infrastructure stack illustration"
            width={163}
            height={320}
            priority
            className="absolute right-[24%] top-1/2 z-10 h-[78%] w-auto -translate-y-1/2 drop-shadow-[0_12px_24px_rgba(1,33,33,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
