import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { VM_BANNER } from "@/lib/site-content";

export function VMBannerSection() {
  return (
    <section className="bg-cream pb-6">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-rust to-rust-dark px-8 py-10 text-white md:flex-row md:px-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-light md:text-[28px]">
              {VM_BANNER.title}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/85">
              {VM_BANNER.body}
            </p>
          </div>
          <CtaButton
            href="/assessment"
            variant="outline"
            className="shrink-0 border-white text-white hover:bg-white hover:text-rust"
          >
            {VM_BANNER.cta}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
