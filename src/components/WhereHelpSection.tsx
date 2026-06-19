import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { WHERE_HEADING, WHERE_CARDS } from "@/lib/site-content";
import type { UseCaseCard } from "@/types";
import { cn } from "@/lib/utils";

const accent: Record<UseCaseCard["variant"], string> = {
  1: "text-teal",
  2: "text-purple",
  3: "text-rust",
  4: "text-leaf",
};

const variantClass: Record<UseCaseCard["variant"], string> = {
  1: "where-card-1",
  2: "where-card-2",
  3: "where-card-3",
  4: "where-card-4",
};

export function WhereHelpSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal>
          <h2 className="mb-12 max-w-xl text-3xl font-light leading-tight tracking-tight text-ink md:text-[40px]">
            {WHERE_HEADING}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WHERE_CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 100}
              className={cn(
                "where-card group flex flex-col rounded-2xl bg-surface p-8",
                "shadow-[0_2px_20px_rgba(1,33,33,0.05)] hover:shadow-[0_8px_32px_rgba(1,33,33,0.10)]",
                "transition-shadow",
                variantClass[card.variant]
              )}
            >
              <h3
                className={cn(
                  "relative mb-6 pl-4 text-xl font-medium before:absolute before:left-0 before:top-1 before:h-6 before:w-1 before:rounded-full before:bg-current",
                  accent[card.variant]
                )}
              >
                {card.title}
              </h3>
              <ul className="mb-8 flex-1 space-y-4">
                {card.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base leading-relaxed text-ink/85"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={card.linkHref}
                className="where-card-link inline-flex items-center gap-2 text-sm font-medium text-rust transition-colors hover:text-rust-dark"
              >
                {card.linkLabel}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
