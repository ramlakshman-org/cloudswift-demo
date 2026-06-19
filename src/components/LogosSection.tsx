import Image from "next/image";
import { LOGOS_HEADING, CUSTOMER_LOGOS } from "@/lib/site-content";

function MarqueeRow({
  logos,
  reverse,
  duration,
}: {
  logos: typeof CUSTOMER_LOGOS;
  reverse?: boolean;
  duration: number;
}) {
  // duplicate for seamless loop
  const items = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`marquee-track gap-16 ${reverse ? "is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-12 w-[140px] shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={120}
              height={40}
              className="max-h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogosSection() {
  const half = Math.ceil(CUSTOMER_LOGOS.length / 2);
  const rowA = CUSTOMER_LOGOS.slice(0, half);
  const rowB = CUSTOMER_LOGOS.slice(half);
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="mb-10 text-center text-xl font-light text-ink">
          {LOGOS_HEADING}
        </h2>
        <div className="flex flex-col gap-8">
          <MarqueeRow logos={rowA} duration={45} />
          <MarqueeRow logos={rowB} reverse duration={50} />
        </div>
      </div>
    </section>
  );
}
