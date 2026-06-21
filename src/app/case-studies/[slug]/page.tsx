import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { MainCtaSection } from "@/components/MainCtaSection";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";
import { CASE_STUDIES } from "@/lib/site-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.client} — Case Study | CloudSwift`;
  const description = caseStudy.summary;
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${slug}` },
    ...pageSocial(title, description, `/case-studies/${slug}`),
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);
  if (!caseStudy) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: caseStudy.client, href: `/case-studies/${caseStudy.slug}` },
        ]}
      />
      <Navbar />
      <main className="flex-1">
        <section className="bg-teal py-24 text-white">
          <div className="mx-auto max-w-[900px] px-6">
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">{caseStudy.industry}</p>
              <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight md:text-[48px]">{caseStudy.client}</h1>
              <p className="text-lg leading-relaxed text-white/75">{caseStudy.summary}</p>
            </Reveal>
          </div>
        </section>

        {caseStudy.isPlaceholder && (
          <div className="bg-gold/15 px-6 py-4 text-center text-sm text-ink">
            <strong>Illustrative example.</strong> This case study describes a representative engagement, not a named client. It will be replaced with a verified client story.
          </div>
        )}

        <section className="bg-white py-20">
          <div className="mx-auto max-w-[900px] px-6 space-y-12">
            <Reveal>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">The challenge</h2>
              <p className="text-lg leading-relaxed text-ink/75">{caseStudy.challenge}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">The solution</h2>
              <p className="text-lg leading-relaxed text-ink/75">{caseStudy.solution}</p>
            </Reveal>
            <Reveal delay={160}>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-rust">The results</h2>
              <ul className="space-y-3">
                {caseStudy.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-lg leading-relaxed text-ink/75">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <MainCtaSection />
      </main>
      <Footer />
    </>
  );
}
