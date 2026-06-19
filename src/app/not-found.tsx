import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaButton } from "@/components/CtaButton";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-cream px-6 py-32 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-rust">404</p>
        <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight text-ink md:text-[56px]">
          Page not found
        </h1>
        <p className="mb-10 max-w-md text-lg leading-relaxed text-ink/65">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CtaButton href="/" variant="primary">
            Back to home
          </CtaButton>
          <CtaButton href="/contact" variant="outline">
            Contact us
          </CtaButton>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-ink/50">
          {[
            { label: "Our Services", href: "/services" },
            { label: "Microsoft Azure", href: "/solutions/azure" },
            { label: "Managed Cloud", href: "/managed-cloud" },
            { label: "About Us", href: "/about" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-rust transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
