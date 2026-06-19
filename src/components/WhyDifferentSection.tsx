"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { WHY_DIFFERENT } from "@/lib/site-content";

const TAB_MS = 7000;

export function WhyDifferentSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = WHY_DIFFERENT.features.length;

  function startCycle(fromIdx: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    let idx = fromIdx;
    timerRef.current = setInterval(() => {
      idx = (idx + 1) % count;
      setActive(idx);
      setAnimKey((k) => k + 1);
    }, TAB_MS);
  }

  useEffect(() => {
    if (window.innerWidth > 991) startCycle(0);
    const onResize = () => {
      if (window.innerWidth <= 991) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        startCycle(active);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabClick(i: number) {
    setActive(i);
    setAnimKey((k) => k + 1);
    startCycle(i);
  }

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white">
      {/* Background pattern */}
      <Image
        src={WHY_DIFFERENT.bg}
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-25 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <Reveal className="mb-14">
          <p className="mb-4 text-sm font-medium tracking-wide text-gold">
            {WHY_DIFFERENT.eyebrow}
          </p>
          <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight md:text-[40px]">
            {WHY_DIFFERENT.heading}
          </h2>
        </Reveal>

        {/* ── Desktop: animated tabs ───────────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left: tab list */}
          <div className="flex flex-col">
            {WHY_DIFFERENT.features.map((f, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className="relative flex gap-5 text-left py-7 border-b border-white/10 last:border-0 focus:outline-none"
              >
                {/* Vertical progress track */}
                <div className="relative w-[3px] shrink-0 bg-white/15 self-stretch rounded-full overflow-hidden">
                  {i === active && (
                    <span
                      key={`prog-${animKey}`}
                      className="absolute inset-x-0 top-0 w-full bg-gold rounded-full"
                      style={{ animation: `tab-fill ${TAB_MS}ms linear forwards` }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-light text-white transition-[font-size,letter-spacing] duration-500 ease-out leading-tight"
                    style={{
                      fontSize: i === active ? "2.125rem" : "1.125rem",
                      letterSpacing: i === active ? "-0.025em" : "0em",
                    }}
                  >
                    {f.title}
                  </h3>
                  <div
                    className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
                    style={{
                      maxHeight: i === active ? "200px" : "0px",
                      opacity: i === active ? 1 : 0,
                    }}
                  >
                    <p className="mt-3 text-base leading-relaxed text-white/70">{f.body}</p>
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-10">
              <CtaButton href="/assessment" variant="primary">
                {WHY_DIFFERENT.cta}
              </CtaButton>
            </div>
          </div>

          {/* Right: switching image */}
          <div className="relative aspect-[4/3] w-full max-w-lg ml-auto">
            {WHY_DIFFERENT.features.map((f, i) =>
              f.image ? (
                <Image
                  key={i}
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-contain transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0 }}
                  sizes="(max-width: 1280px) 50vw, 600px"
                />
              ) : null
            )}
          </div>
        </div>

        {/* ── Mobile: stacked cards ────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-8">
          {WHY_DIFFERENT.features.map((f, i) => (
            <Reveal
              key={i}
              delay={i * 120}
              className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm"
            >
              {f.image && (
                <Image
                  src={f.image}
                  alt=""
                  width={64}
                  height={64}
                  className="mb-6 opacity-90"
                />
              )}
              <h3 className="text-xl font-light text-white">{f.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">{f.body}</p>
            </Reveal>
          ))}
          <div className="mt-4">
            <CtaButton href="/assessment" variant="primary">
              {WHY_DIFFERENT.cta}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
