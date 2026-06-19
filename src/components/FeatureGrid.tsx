import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export interface Feature {
  id?: string;
  icon?: ReactNode;
  title: string;
  body: string;
  accent?: "teal" | "rust" | "gold" | "purple" | "leaf";
}

interface FeatureGridProps {
  heading?: string;
  subheading?: string;
  features: Feature[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}

const accentColor: Record<string, string> = {
  teal: "text-teal",
  rust: "text-rust",
  gold: "text-gold",
  purple: "text-purple",
  leaf: "text-leaf",
};

export function FeatureGrid({ heading, subheading, features, cols = 3, dark }: FeatureGridProps) {
  const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  const sectionBg = dark ? "bg-ink" : "bg-surface";
  const headingColor = dark ? "text-white" : "text-ink";
  const cardBg = dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white shadow-[0_2px_20px_rgba(1,33,33,0.05)]";
  const titleColor = dark ? "text-white" : "text-ink";
  const bodyColor = dark ? "text-white/65" : "text-ink/65";

  return (
    <section className={`py-20 ${sectionBg}`}>
      <div className="mx-auto max-w-[1280px] px-6">
        {(heading || subheading) && (
          <Reveal className="mb-12">
            {subheading && (
              <p className={`mb-3 text-sm font-medium uppercase tracking-widest ${dark ? "text-gold" : "text-rust"}`}>
                {subheading}
              </p>
            )}
            {heading && (
              <h2 className={`max-w-2xl text-3xl font-light tracking-tight md:text-[40px] ${headingColor}`}>
                {heading}
              </h2>
            )}
          </Reveal>
        )}
        <div className={`grid grid-cols-1 gap-8 ${colClass}`}>
          {features.map((f, i) => (
            <Reveal
              key={i}
              id={f.id}
              delay={i * 80}
              className={cn("rounded-2xl p-8 scroll-mt-24", cardBg)}
            >
              {f.icon && (
                <div className={cn("mb-5 [&>svg]:size-7 [&>svg]:stroke-[1.5]", f.accent ? accentColor[f.accent] : "text-teal")}>
                  {f.icon}
                </div>
              )}
              <h3 className={cn("mb-3 text-xl font-medium", titleColor)}>{f.title}</h3>
              <p className={cn("text-base leading-relaxed", bodyColor)}>{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
