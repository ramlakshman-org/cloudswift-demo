"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({
  heading = "Frequently asked questions",
  items,
  className,
}: {
  heading?: string;
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={cn("py-20 bg-surface-alt", className)}>
      <div className="mx-auto max-w-[860px] px-6">
        <h2 className="mb-10 text-center text-3xl font-light tracking-tight text-ink md:text-[38px]">
          {heading}
        </h2>
        <div className="divide-y divide-ink/10 rounded-2xl border border-ink/8 bg-surface overflow-hidden">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-ink hover:text-teal transition-colors"
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "mt-0.5 shrink-0 text-ink/35 transition-transform duration-200",
                    open === i && "rotate-180 text-teal"
                  )}
                />
              </button>
              {open === i && (
                <p className="px-6 pb-5 text-[14px] leading-relaxed text-ink/65">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
