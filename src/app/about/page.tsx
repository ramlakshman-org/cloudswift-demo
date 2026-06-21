import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Scale, Lightbulb, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/CtaButton";
import { MainCtaSection } from "@/components/MainCtaSection";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "About CloudSwift | ISO 9001 Certified Cloud Partner India";
const description = "CloudSwift is an ISO 9001-2015 certified cloud and IT managed services company headquartered in Bengaluru. Microsoft Azure Partner serving businesses across India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  ...pageSocial(title, description, "/about"),
};

const values: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: <Scale size={28} strokeWidth={1.5} />, title: "Integrity", desc: "We maintain the highest ethical standards in every client engagement — transparent pricing, honest advice, and accountable delivery." },
  { icon: <Lightbulb size={28} strokeWidth={1.5} />, title: "Innovation", desc: "We embrace creativity and stay ahead of the technology curve so our clients always have access to the best cloud solutions." },
  { icon: <Users size={28} strokeWidth={1.5} />, title: "Collaboration", desc: "We foster teamwork — within our own team and with our clients — to build solutions that truly work for your business." },
];

const stats = [
  { value: "95%", label: "Cloud Managed Services" },
  { value: "92%", label: "Cloud Security" },
  { value: "95%", label: "Cloud Migration" },
  { value: "85%", label: "Data & Analytics" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink py-28 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">
                About CloudSwift
              </p>
              <h1 className="mb-6 max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-[56px]">
                Your trusted partner for cloud-first transformation
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/70">
                CloudSwift is an ISO 9001-2015 certified cloud and IT infrastructure services company. With a team of accredited experts, we assist clients to plan, right-size, optimize, manage, and innovate their IT infrastructure throughout the entire lifecycle.
              </p>
              <CtaButton href="/assessment" variant="primary">Get Your Free Assessment</CtaButton>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 80} className="text-center">
                  <p className="text-5xl font-light text-teal">{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-ink/60">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">Our mission</p>
                <h2 className="mb-6 text-3xl font-light leading-tight tracking-tight text-ink md:text-[40px]">
                  Data-driven, cost-saving cloud decisions
                </h2>
                <p className="text-base leading-relaxed text-ink/70">
                  We help organizations make data-driven and cost-saving decisions while navigating digital technology. CloudSwift specifically assists customers build the commercial and technical foundation for a successful and secure cloud-first, digital transformation journey.
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink/70">
                  We maintain strong strategic relationships with all leading technology vendors worldwide, and our{" "}
                  <a href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noopener noreferrer" className="text-teal underline hover:text-teal-dark">
                    ISO 9001-2015
                  </a>{" "}
                  certification reflects our commitment to quality management and consistent delivery.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-2xl bg-teal/5 p-10 ring-1 ring-teal/20">
                  <p className="text-sm font-medium uppercase tracking-widest text-teal mb-4">ISO 9001-2015</p>
                  <p className="text-lg font-light text-ink leading-relaxed">
                    &ldquo;With a team of accredited experts, we assist our clients with services to plan, right size, optimize, manage, and innovate their IT Infrastructure throughout the entire lifecycle.&rdquo;
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal className="mb-12">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">Our values</p>
              <h2 className="text-3xl font-light tracking-tight text-ink md:text-[40px]">
                Integrity. Innovation. Collaboration.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 80} className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(1,33,33,0.05)]">
                  <div className="mb-4 text-teal">{v.icon}</div>
                  <h3 className="mb-3 text-xl font-medium text-ink">{v.title}</h3>
                  <p className="text-base leading-relaxed text-ink/65">{v.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <Reveal className="mb-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">Our offices</p>
              <h2 className="text-3xl font-light text-white">Based in India, serving globally</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                <p className="mb-2 text-sm font-medium text-gold uppercase tracking-widest">Headquarters — Bengaluru</p>
                <p className="text-base leading-relaxed text-white/70">
                  HD-230 WeWork Salarpuria Symbiosis, Arekere Village, Begur Hobli,<br />
                  Bannerghatta Road, Bangalore 560076<br />
                  Karnataka – India
                </p>
              </Reveal>
              <Reveal delay={80} className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                <p className="mb-2 text-sm font-medium text-gold uppercase tracking-widest">Branch — Mumbai</p>
                <p className="text-base leading-relaxed text-white/70">
                  VO-481, WeWork Spectrum Tower, 4th Floor,<br />
                  Mindspace Chincholi Bunder Road, Off Link Road,<br />
                  Malad (West), Mumbai, MH 400064
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
