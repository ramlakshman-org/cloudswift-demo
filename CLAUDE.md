# CloudSwift website

Marketing site for CloudSwift — ISO 9001-2015 certified cloud & IT managed services, Bengaluru (HQ) & Mumbai. Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.

## Repo & deploy

- GitHub: https://github.com/ramlakshman-org/cloudswift-demo (branch `master`)
- Not yet connected to Vercel — deploy is still pending
- `RESEND_API_KEY` env var required for the contact form (`/api/contact`) to actually send mail; without it, submissions just log to the server console

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check   # lint + typecheck + build
```

## Brand tokens (src/app/globals.css)

Note the naming is non-literal: `--teal` is actually a blue (`#1a5fcc`), not green-teal. Don't assume color from the variable name.

- `--ink` `#0d1b35` (dark navy text)
- `--teal` `#1a5fcc` (primary blue accent)
- `--cream` `#eef4ff` (page background, blue-tinted)
- `--rust` `#e05c20` (CTA orange)
- `--gold` `#f0be65`
- `--purple` `#61396b`, `--leaf` `#395d18` (secondary accents, used sparingly)
- Font: Plus Jakarta Sans (`--font-jakarta`)

## Conventions

- New pages: define `title`/`description` as local consts, spread `...pageSocial(title, description, "/path")` from `src/lib/seo.ts` into metadata (handles OG/Twitter image + per-page social previews — see note below on why this is necessary)
- `BreadcrumbSchema` / `ServiceSchema` / `FaqSchema` (`src/components/SchemaMarkup.tsx`) on every content page
- `FeatureGrid` cards accept an optional `id` (renders through `Reveal`) for anchor-linkable sections — used by `/services` and `/managed-cloud#security`
- robots.txt explicitly allowlists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.), not just `*`

## Known gotcha

Next.js **replaces, not merges**, a page's `openGraph`/`twitter` metadata object when a page defines its own. If a page sets `openGraph: { title, description }` without `images`, it silently drops the layout's inherited OG image. Always go through `pageSocial()` rather than hand-writing `openGraph`/`twitter` blocks.

## Open items (not yet resolved)

- **About page stat tiles** ("Cloud Managed Services — 95%", "Cloud Security — 92%", "Cloud Migration — 95%", "Data & Analytics — 85%") — confirmed accurate: these match the identical numbers/labels already published on the client's live site (oncloudswift.com). Not fabricated, no action needed.
- **Testimonials** (`TESTIMONIALS` in `src/lib/site-content.ts`) — have Indian names/roles but no company names, and all "Read the full story" links point to `/contact` rather than a real case study. The old site's own "case study" section is equally generic (no company name, no real numbers — reads like unedited template content), so this isn't a regression, just an opportunity to do better if real client quotes become available.
- **Hero visual**: intentionally uses the original SpectroCloud-style stacked-hexagon illustration (`/images/hero-hexstack.svg`) per explicit user decision — this was raised as a likely visual copy of a competitor's signature graphic but kept anyway. Don't re-attempt replacing it without being asked.
- Deployed to Vercel at https://cloudswift-demo.vercel.app — domain `oncloudswift.com` still points to the old WordPress site (not yet cut over). Sitemap not yet submitted to Google Search Console (do after domain cutover, if/when that happens).
