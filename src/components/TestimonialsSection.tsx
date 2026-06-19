"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { TESTIMONIALS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % count), ROTATE_MS);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white">
      {/* decorative ribbon */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "url(/images/67adc1facb3bba96d481461f_testimonials-Ribbon.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "60%",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[900px] px-6 text-center">
        <div className="relative min-h-[280px]">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                i === active
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <blockquote className="text-xl font-light leading-relaxed text-white/95 md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-medium text-gold">
                  – {t.author}
                </span>
                <span className="mt-1 block text-sm text-white/60">
                  {t.role}
                </span>
                <Link
                  href={t.storyHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold"
                >
                  Read the full story
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* dots */}
        <div className="mt-10 flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="relative flex h-2 items-center"
            >
              <span className="absolute -inset-2" aria-hidden />
              <span
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === active ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
