import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo";

const title = "Book a Free Cloud Consultation | CloudSwift India";
const description = "Schedule a free consultation with a CloudSwift cloud expert. Walk through your infrastructure challenges and get a tailored plan — no commitment required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/get-started" },
  ...pageSocial(title, description, "/get-started"),
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BookingForm } from "@/components/BookingForm";

const benefits = [
  "Talk directly with a certified cloud architect, not a sales rep",
  "Get a tailored assessment of your current infrastructure and cloud readiness",
  "Understand migration, managed services, and security options for your organisation",
  "Walk away with a clear, actionable path forward — no commitment required",
];

const certifications = [
  "ISO 9001-2015 Certified",
  "Microsoft Partner",
  "Azure Certified",
  "M365 Expertise",
];

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-cream py-24">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
              {/* Left: pitch */}
              <div>
                <Reveal>
                  <p className="mb-4 text-sm font-medium uppercase tracking-widest text-rust">
                    Free consultation
                  </p>
                  <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight text-ink md:text-[52px]">
                    Let&apos;s talk about your cloud
                  </h1>
                  <p className="mb-10 text-lg leading-relaxed text-ink/70">
                    Schedule a free 1:1 with a CloudSwift expert. We&apos;ll listen to your challenges, assess your current setup, and recommend the right path forward — whether that&apos;s migration, managed services, security, or analytics.
                  </p>
                </Reveal>

                <Reveal delay={100}>
                  <h2 className="mb-4 text-base font-medium text-ink">What you&apos;ll get:</h2>
                  <ul className="space-y-4">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink/75">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={200} className="mt-12">
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-ink/40">Our credentials</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {certifications.map((c) => (
                      <span key={c} className="text-sm font-medium text-ink/50">{c}</span>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Right: booking form (client component for interactivity) */}
              <Reveal delay={150}>
                <BookingForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
