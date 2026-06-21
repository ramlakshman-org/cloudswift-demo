"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Logo } from "@/components/icons";
import { CtaButton } from "@/components/CtaButton";
import { NAV_LEFT, NAV_RIGHT } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import type { NavEntry, NavDropdownData, NavSubSection } from "@/types";

// ── Arrow icon used on sidebar links ─────────────────────────────────────────
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14"
      viewBox="0 0 17 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 9.47L1.75 0H.25v10.97l13.96.001-3.493 3.493a.75.75 0 1 0 1.06 1.06l4.773-4.772a.75.75 0 0 0 0-1.061L12.777 4.918a.75.75 0 1 0-1.06 1.06l3.493 3.493L1.75 9.47Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Chevron for dropdown toggle ───────────────────────────────────────────────
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 15 9"
      fill="none"
      className={cn("transition-transform duration-200", open && "rotate-180")}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.055.73a1 1 0 0 1 1.414 0L7.882 6.143 13.295.73a1 1 0 1 1 1.414 1.414L8.589 8.264a1 1 0 0 1-1.414 0L1.055 2.143A1 1 0 0 1 1.055.73Z"
        fill="#1F7A78"
      />
    </svg>
  );
}

// ── Columns panel (single or multi-column arrow list) ────────────────────────
export function SimplePanel({ data }: { data: NavDropdownData }) {
  const columns = data.columns;
  if (!columns?.length) return null;

  if (columns.length === 1) {
    return (
      <div className="min-w-[200px] py-2">
        {columns[0].links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-cream transition-colors"
          >
            <ArrowIcon className="w-3 h-3 text-teal shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            {link.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex divide-x divide-ink/10">
      {columns.map((col, ci) => (
        <div key={ci} className="min-w-[190px] px-4 py-4">
          {col.heading && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink/65">
              {col.heading}
            </p>
          )}
          {col.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group flex items-center gap-2 rounded-md py-1.5 text-[13px] text-ink/80 hover:text-rust transition-colors"
            >
              <ArrowIcon className="w-3 h-3 text-teal shrink-0 translate-x-0 group-hover:translate-x-1 transition-transform" />
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Arrow sidebar section ─────────────────────────────────────────────────────
export function SidebarSection({ section }: { section: NavSubSection }) {
  return (
    <div className="flex flex-col gap-1">
      {section.heading && (
        <div className="mb-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/65">
            {section.heading}
          </p>
          {section.headingDesc && (
            <p className="text-xs text-ink/60 mt-0.5">{section.headingDesc}</p>
          )}
        </div>
      )}
      {section.links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="group flex items-center gap-2 rounded-md py-1.5 text-[13px] text-ink/80 hover:text-rust transition-colors"
        >
          <ArrowIcon className="w-3 h-3 shrink-0 text-teal translate-x-0 group-hover:translate-x-1 transition-transform" />
          {link.label}
        </Link>
      ))}
    </div>
  );
}

// ── Mega-menu panel (Our Platform) ────────────────────────────────────────────
export function PlatformPanel({ data }: { data: NavDropdownData }) {
  const featured = data.featured?.[0];
  return (
    <div className="flex gap-0">
      {/* Featured card */}
      {featured && (
        <Link
          href={featured.href}
          className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-ink/5 hover:bg-ink/10 transition-colors"
          style={{ width: 220, minHeight: 220, flexShrink: 0 }}
        >
          {featured.image && (
            <Image
              src={featured.image}
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="220px"
            />
          )}
          <div className="relative z-10 p-4 flex flex-col gap-3 h-full justify-between">
            <div>
              <p className="text-[13px] font-semibold text-ink leading-snug">{featured.title}</p>
              <p className="text-[11px] text-ink/60 mt-1">{featured.desc}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-rust">
              <ArrowIcon className="w-3 h-3" />
              {featured.cta}
            </div>
          </div>
        </Link>
      )}

      {/* Product columns */}
      {data.columns && data.columns.length > 0 && (
        <div className="flex gap-0 border-l border-ink/10">
          {data.columns.map((col, ci) => (
            <div
              key={ci}
              className={cn(
                "flex flex-col gap-0.5 px-4 py-2",
                ci > 0 && "border-l border-ink/10"
              )}
              style={{ width: 200 }}
            >
              {col.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col rounded-md px-2 py-2.5 hover:bg-cream transition-colors"
                >
                  <span className="text-[13px] font-medium text-ink group-hover:text-rust transition-colors">
                    {link.label}
                  </span>
                  {link.desc && (
                    <span className="text-[11px] text-ink/55 mt-0.5 leading-snug">
                      {link.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Sidebar: arrow links + optional CTA box */}
      {(data.sidebar || data.sideCta) && (
        <div className="flex flex-col gap-4 border-l border-ink/10 px-4 py-3" style={{ width: 210 }}>
          {data.sidebar && <SidebarSection section={data.sidebar} />}
          {data.sideCta && (
            <Link
              href={data.sideCta.href}
              className="group mt-auto flex flex-col gap-2 rounded-lg bg-teal/10 hover:bg-teal/20 transition-colors p-3"
            >
              {data.sideCta.image && (
                <Image
                  src={data.sideCta.image}
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
              <div>
                <p className="text-[12px] font-semibold text-ink">{data.sideCta.heading}</p>
                <p className="text-[11px] text-ink/60 mt-0.5 leading-snug">{data.sideCta.desc}</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-teal group-hover:gap-2 transition-all">
                <ArrowIcon className="w-3 h-3" />
                {data.sideCta.cta}
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ── Solution-style panel (AI / Edge / Fleet / Government) ─────────────────────
export function SolutionPanel({ data }: { data: NavDropdownData }) {
  const isDark = data.featured?.some((f) => f.dark);
  return (
    <div className="flex gap-0">
      {/* Featured cards */}
      {data.featured && data.featured.length > 0 && (
        <div className="flex flex-col gap-3 p-3" style={{ width: 220 }}>
          {data.featured.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={cn(
                "group relative flex flex-col justify-between rounded-lg p-4 transition-colors overflow-hidden",
                isDark
                  ? "bg-teal text-white hover:bg-teal-dark"
                  : "bg-ink/5 hover:bg-ink/10 text-ink"
              )}
              style={{ minHeight: 110 }}
            >
              <div>
                <p className={cn("text-[13px] font-semibold leading-snug", isDark ? "text-white" : "text-ink")}>
                  {card.title}
                </p>
                <p className={cn("text-[11px] mt-1 leading-snug", isDark ? "text-white/70" : "text-ink/60")}>
                  {card.desc}
                </p>
              </div>
              {card.cta && (
                <div className={cn("flex items-center gap-1.5 text-[11px] font-medium mt-3", isDark ? "text-gold" : "text-rust")}>
                  <ArrowIcon className="w-3 h-3" />
                  {card.cta}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Sidebar */}
      {data.sidebar && (
        <div className="border-l border-ink/10 px-4 py-3" style={{ width: 220 }}>
          <SidebarSection section={data.sidebar} />
        </div>
      )}
    </div>
  );
}

// ── Dropdown panel router ─────────────────────────────────────────────────────
function DropdownPanel({ data }: { data: NavDropdownData }) {
  // sideCta signals the wide PlatformPanel (featured card + product grid + sidebar + CTA)
  const isPlatform = !!data.sideCta;
  const isSolution = !isPlatform && !!data.featured?.length;
  const isSimple   = !isPlatform && !isSolution;

  return (
    <div className="dropdown-panel rounded-xl border border-ink/10 bg-surface shadow-xl shadow-ink/10 overflow-hidden">
      {isPlatform && <PlatformPanel data={data} />}
      {isSolution && <SolutionPanel data={data} />}
      {isSimple   && <SimplePanel   data={data} />}
    </div>
  );
}

// ── Desktop nav item (link or dropdown trigger) ───────────────────────────────
function DesktopNavItem({
  entry,
  open,
  onOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- accepted for API symmetry with MobileNavItem, never invoked here (see v8 ignore comment at call sites in Navbar)
  onClose,
  scheduleClose,
  cancelClose,
}: {
  entry: NavEntry;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  scheduleClose: () => void;
  cancelClose: () => void;
}) {
  if (entry.kind === "link") {
    return (
      <Link
        href={entry.href}
        className="rounded-md px-3 py-2 text-sm text-ink/80 hover:text-rust transition-colors whitespace-nowrap"
        onMouseEnter={cancelClose}
      >
        {entry.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); onOpen(); }}
      onMouseLeave={scheduleClose}
    >
      <button
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap",
          open ? "text-rust" : "text-ink/80 hover:text-rust"
        )}
        aria-expanded={open}
      >
        {entry.label}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 z-50"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <DropdownPanel data={entry} />
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion item ─────────────────────────────────────────────────────
export function MobileNavItem({ entry, onClose }: { entry: NavEntry; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (entry.kind === "link") {
    return (
      <Link
        href={entry.href}
        onClick={onClose}
        className="block px-3 py-3 text-sm font-medium text-ink border-b border-ink/8 hover:text-rust transition-colors"
      >
        {entry.label}
      </Link>
    );
  }

  // Flatten all links from this dropdown for mobile
  const allLinks: { label: string; href: string }[] = [
    ...(entry.featured?.map((f) => ({ label: f.title, href: f.href })) ?? []),
    ...(entry.columns?.flatMap((c) => c.links) ?? []),
    ...(entry.sidebar?.links ?? []),
  ];

  return (
    <div className="border-b border-ink/8">
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-ink"
      >
        {entry.label}
        <ChevronIcon open={expanded} />
      </button>
      {expanded && (
        <div className="bg-cream/60 pb-2">
          {allLinks.map((link) => (
            <Link
              key={link.label + link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 text-sm text-ink/70 hover:text-rust transition-colors"
            >
              <ArrowIcon className="w-3 h-3 text-teal shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Hamburger / close icon ────────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Single shared close timer — prevents Platform's timer from firing after AI opens
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveMenu(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const allEntries = [...NAV_LEFT, ...NAV_RIGHT];

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 w-full bg-surface transition-shadow duration-200",
        scrolled && "shadow-[0_2px_16px_rgba(13,27,53,0.10)]"
      )}
    >
      {/* ── Main nav bar ────────────────────────────────────────────────── */}
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 border-b border-ink/8">
        {/* Logo */}
        <Link href="/" aria-label="CloudSwift home" className="shrink-0 flex items-center gap-2.5 text-ink">
          <Logo />
          <span className="text-[17px] font-semibold tracking-tight leading-none">CloudSwift</span>
        </Link>

        {/* ── Desktop left nav ──────────────────────────────────────────── */}
        <div className="hidden xl:flex items-center gap-0.5 ml-8">
          {NAV_LEFT.map((entry) => (
            <DesktopNavItem
              key={entry.label}
              entry={entry}
              open={activeMenu === entry.label}
              onOpen={() => { cancelClose(); setActiveMenu(entry.label); }}
              /* v8 ignore next -- onClose is accepted by DesktopNavItem but never invoked there; dead prop, kept for API symmetry with MobileNavItem */
              onClose={() => setActiveMenu(null)}
              scheduleClose={scheduleClose}
              cancelClose={cancelClose}
            />
          ))}
        </div>

        {/* ── Desktop right nav ─────────────────────────────────────────── */}
        <div className="hidden xl:flex items-center gap-0.5 ml-auto">
          {NAV_RIGHT.map((entry) => (
            <DesktopNavItem
              key={entry.label}
              entry={entry}
              open={activeMenu === entry.label}
              onOpen={() => { cancelClose(); setActiveMenu(entry.label); }}
              /* v8 ignore next -- onClose is accepted by DesktopNavItem but never invoked there; dead prop, kept for API symmetry with MobileNavItem */
              onClose={() => setActiveMenu(null)}
              scheduleClose={scheduleClose}
              cancelClose={cancelClose}
            />
          ))}
          <CtaButton href="/assessment" variant="outline" className="ml-4 px-5 py-2 text-[13px]">
            Get Your Free Assessment
          </CtaButton>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <button
          className="xl:hidden text-ink ml-auto -mr-2.5 flex h-11 w-11 items-center justify-center"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ───────────────────────────────────── */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-[57px] z-40 flex flex-col bg-surface overflow-y-auto">
          <div className="flex flex-col py-2">
            {allEntries.map((entry) => (
              <MobileNavItem
                key={entry.label}
                entry={entry}
                onClose={() => setMobileOpen(false)}
              />
            ))}
          </div>
          <div className="p-4 border-t border-ink/10">
            <CtaButton href="/assessment" variant="primary" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
              Get Your Free Assessment
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
