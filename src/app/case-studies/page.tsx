import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { MainCtaSection } from "@/components/MainCtaSection";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";
import { CASE_STUDIES } from "@/lib/site-content";

const title = "Case Studies | CloudSwift";
const description = "How CloudSwift has helped financial services, manufacturing, and retail businesses migrate, secure, and manage their cloud infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies" },
  ...pageSocial(title, description, "/case-studies"),
};

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }]} />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Case Studies"
          title="Real environments, real outcomes"
          body="A look at how CloudSwift has helped businesses across financial services, manufacturing, and retail plan, migrate, and manage their cloud infrastructure."
          teal
        />

        <section className="bg-cream py-20">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_40px_rgba(1,33,33,0.06)] transition hover:shadow-[0_8px_50px_rgba(1,33,33,0.12)]"
                >
                  {c.isPlaceholder && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold">
                      Illustrative example
                    </span>
                  )}
                  <p className="mb-2 text-sm font-medium uppercase tracking-widest text-rust">{c.industry}</p>
                  <h2 className="mb-3 text-xl font-medium text-ink">{c.client}</h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/65">{c.summary}</p>
                  <span className="text-sm font-medium text-teal transition-colors group-hover:text-rust">
                    Read case study →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
