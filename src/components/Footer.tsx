import Link from "next/link";
import { Logo } from "@/components/icons";
import { FOOTER_COLUMNS } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="CloudSwift home" className="text-white">
              <Logo height={30} />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              CloudSwift helps its customers build the commercial and technical foundation for a successful and secure cloud-first digital transformation journey.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/65 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} CloudSwift. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/security" className="hover:text-white/80">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
