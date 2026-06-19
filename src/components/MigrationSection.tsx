import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { MIGRATION } from "@/lib/site-content";

export function MigrationSection() {
  return (
    <section className="bg-cream py-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-surface p-8 shadow-[0_2px_24px_rgba(1,33,33,0.06)] md:grid-cols-2 md:p-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-light leading-snug text-ink md:text-3xl">
              {MIGRATION.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/85">
              {MIGRATION.body}
            </p>
            <div className="mt-6">
              <CtaButton href="#" variant="primary">
                {MIGRATION.cta}
              </CtaButton>
            </div>
          </div>
          <div className="relative h-[260px] w-full">
            <Image
              src={MIGRATION.image}
              alt="VM Migration Liftoff Kit"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
