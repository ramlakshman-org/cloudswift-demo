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
            <div key={col.heading} className="min-w-0">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="block break-words text-sm text-white/65 transition-colors hover:text-gold"
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
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/security" className="hover:text-white/80">
              Security
            </Link>
            <a
              href="https://wa.me/919071416809"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with CloudSwift on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-[#25D366] hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 3.5C7.27 3.5 3.4 7.37 3.4 12.15c0 1.6.42 3.1 1.2 4.4L3.5 20.5l4.05-1.06a8.8 8.8 0 0 0 4.5 1.22h.01c4.78 0 8.65-3.87 8.65-8.65 0-2.3-.9-4.46-2.61-6.69ZM12.06 19a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.77.73.74-2.7-.18-.28a7.3 7.3 0 0 1-1.12-3.92c0-4.04 3.3-7.34 7.36-7.34a7.3 7.3 0 0 1 5.2 2.16 7.3 7.3 0 0 1 2.15 5.18c0 4.05-3.3 7.35-7.39 7.35Zm4.03-5.5c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.14.22-.57.72-.7.86-.13.15-.26.16-.48.06-.22-.11-.93-.34-1.77-1.1-.65-.58-1.1-1.3-1.23-1.52-.13-.22-.01-.34.1-.46.11-.11.25-.28.37-.42.13-.14.17-.24.25-.4.08-.16.04-.3-.02-.41-.07-.11-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46h-.51c-.16 0-.43.06-.66.3-.22.24-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.13.16 1.74 2.66 4.23 3.62 2.5.96 2.5.64 2.95.6.45-.04 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.44-.28Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
