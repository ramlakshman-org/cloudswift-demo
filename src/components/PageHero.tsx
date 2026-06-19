import { CtaButton } from "@/components/CtaButton";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  dark?: boolean;
  teal?: boolean;
}

export function PageHero({ eyebrow, title, body, cta, ctaSecondary, dark, teal }: PageHeroProps) {
  const bg = dark ? "bg-ink text-white" : teal ? "bg-teal text-white" : "bg-cream text-ink";
  const eyebrowColor = dark || teal ? "text-gold" : "text-rust";
  const bodyColor = dark || teal ? "text-white/70" : "text-ink/70";

  return (
    <section className={`py-28 ${bg}`}>
      <div className="mx-auto max-w-[1280px] px-6">
        {eyebrow && (
          <p className={`mb-4 text-sm font-medium uppercase tracking-widest ${eyebrowColor}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="mb-6 max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-[56px]">
          {title}
        </h1>
        <p className={`mb-10 max-w-xl text-lg leading-relaxed ${bodyColor}`}>
          {body}
        </p>
        {(cta || ctaSecondary) && (
          <div className="flex flex-wrap gap-4">
            {cta && (
              <CtaButton href={cta.href} variant="primary">
                {cta.label}
              </CtaButton>
            )}
            {ctaSecondary && (
              <CtaButton href={ctaSecondary.href} variant="outline">
                {ctaSecondary.label}
              </CtaButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
