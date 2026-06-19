import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BookingForm } from "@/components/BookingForm";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { pageSocial } from "@/lib/seo";

const title = "Contact CloudSwift | Cloud Consulting India";
const description = "Get in touch with CloudSwift for cloud consulting, Microsoft Azure, managed services, or IT support. Offices in Bengaluru (HQ) and Mumbai. Call +91-9606246099.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...pageSocial(title, description, "/contact"),
};

const offices = [
  {
    city: "Bengaluru",
    label: "Headquarters",
    flag: "🇮🇳",
    address: "HD-230 WeWork Salarpuria Symbiosis, Arekere Village, Begur Hobli, Bannerghatta Road, Bangalore 560076, Karnataka",
  },
  {
    city: "Mumbai",
    label: "Branch Office",
    flag: "🇮🇳",
    address: "VO-481, WeWork Spectrum Tower, 4th Floor, Mindspace Chincholi Bunder Road, Off Link Road, Malad (West), Mumbai MH 400064",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
              {/* Left */}
              <div>
                <Reveal>
                  <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Contact Us</p>
                  <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight md:text-[52px]">
                    Let&apos;s talk cloud
                  </h1>
                  <p className="mb-10 text-lg leading-relaxed text-white/70">
                    Whether you&apos;re planning a migration, evaluating managed services, or need support — our team is ready to help.
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  <div className="space-y-4 mb-10">
                    <a href="tel:+919606246099" className="flex items-center gap-3 text-base text-white/80 hover:text-white transition-colors">
                      <span className="text-xl">📞</span>
                      +91-9606246099
                    </a>
                    <a href="tel:+919071416809" className="flex items-center gap-3 text-base text-white/80 hover:text-white transition-colors">
                      <span className="text-xl">📞</span>
                      +91-9071416809
                    </a>
                    <a href="mailto:support@oncloudswift.com" className="flex items-center gap-3 text-base text-white/80 hover:text-white transition-colors">
                      <span className="text-xl">✉️</span>
                      support@oncloudswift.com
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">Our offices</h2>
                  <div className="space-y-6">
                    {offices.map((o) => (
                      <div key={o.city} className="flex items-start gap-4">
                        <span className="text-2xl mt-0.5">{o.flag}</span>
                        <div>
                          <p className="font-medium text-white">{o.city} <span className="text-white/40 font-normal text-sm">— {o.label}</span></p>
                          <p className="mt-1 text-sm leading-relaxed text-white/55">{o.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Right: form */}
              <Reveal delay={100}>
                <p className="mb-4 text-center text-sm text-white/70">
                  Prefer to talk it through?{" "}
                  <Link href="/assessment" className="font-medium text-gold hover:underline">
                    Book a Free Assessment
                  </Link>
                </p>
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
