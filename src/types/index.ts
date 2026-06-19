// ── Nav types ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

/** A plain link entry in the mega-nav */
export interface NavPlainLink {
  kind: "link";
  label: string;
  href: string;
}

/** A featured hero-card inside a dropdown (big card with optional image/dark bg) */
export interface NavFeaturedCard {
  title: string;
  desc: string;
  href: string;
  cta?: string;
  image?: string;
  dark?: boolean; // teal/dark background (Government)
}

/** A single link row inside a dropdown panel */
export interface NavSubLink {
  label: string;
  href: string;
  desc?: string; // shown in card-grid style
}

/** A grouped section inside a dropdown panel */
export interface NavSubSection {
  heading?: string;
  headingDesc?: string;
  links: NavSubLink[];
  style?: "cards" | "arrows"; // cards = title+desc, arrows = icon+label
}

/** Optional CTA box (e.g. VMO box in Platform dropdown) */
export interface NavSideCta {
  heading: string;
  desc: string;
  href: string;
  cta: string;
  image?: string;
}

/** A dropdown/mega-menu entry in the main nav */
export interface NavDropdownData {
  kind: "dropdown";
  label: string;
  featured?: NavFeaturedCard[];  // big highlight cards (left column)
  columns?: NavSubSection[];     // product grid columns (middle)
  sidebar?: NavSubSection;       // right-side arrow links
  sideCta?: NavSideCta;          // bottom-right CTA box
}

export type NavEntry = NavPlainLink | NavDropdownData;

// ── Page content types ──────────────────────────────────────────────────────

export interface UseCaseCard {
  variant: 1 | 2 | 3 | 4;
  title: string;
  bullets: string[];
  linkLabel: string;
  linkHref: string;
  icon?: string;
}

export interface FeatureBlock {
  title: string;
  body: string;
  image?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  storyHref: string;
}

export interface IntegrationLogo {
  name: string;
  src: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
