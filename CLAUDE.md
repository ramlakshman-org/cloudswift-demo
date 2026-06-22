# CloudSwift website

Marketing site for CloudSwift — ISO 9001-2015 certified cloud & IT managed services, Bengaluru (HQ) & Mumbai. Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.

## Repo & deploy

- GitHub: https://github.com/ramlakshman-org/cloudswift-demo (branch `master`)
- Not yet connected to Vercel — deploy is still pending
- `RESEND_API_KEY` env var required for the contact form (`/api/contact`) to actually send mail; without it, submissions just log to the server console
- `MONGODB_URI` / `MONGODB_DB` required for `/api/contact` to persist enquiries (and for `/admin` to show anything); without `MONGODB_URI`, `insertEnquiry()` logs and no-ops, same dev-fallback pattern as Resend
- `ADMIN_PASSWORD` required for `/admin` login to ever succeed; `ADMIN_USERNAME` defaults to `admin` if unset; `ADMIN_SESSION_SECRET` should be set separately in production (falls back to `ADMIN_PASSWORD` if unset)

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test            # vitest run
npm run test:watch      # vitest (watch mode)
npm run test:coverage   # vitest run --coverage
npm run check           # lint + typecheck + build + test
```

## Testing

Vitest + React Testing Library + jsdom. Config in `vitest.config.ts`/`vitest.setup.ts`. Coverage thresholds are set to 100% (lines/branches/functions/statements) and currently pass exactly at 100% — `npm run test:coverage` fails loudly if a change drops below that.

- `vitest.setup.ts` mocks `next/font/google` (real font loading needs the Next build pipeline) and provides a controllable `IntersectionObserver` mock (`globalThis.__ioInstances`) for `useReveal`/`Reveal` tests.
- `RootLayout` returns `<html>`/`<body>` itself, which conflicts with RTL's normal container mounting — query via `document.querySelector(...)` instead of the `render()` return's `container` for layout tests.
- Pages share `Navbar`/`Footer`, which duplicate a lot of link text/hrefs found in page content itself (e.g. "Get Your Free Assessment", "Microsoft Azure", phone numbers, "About Us"). Scope page-level queries with `within(screen.getByRole("main"))` to avoid ambiguous multi-match errors, and use `getAllByRole`/`getAllByText` where the *same* page legitimately renders something twice (e.g. `PageHero`'s cta + `MainCtaSection`'s cta both say "Get Your Free Assessment").
- `fireEvent.click` on a `type="submit"` button doesn't reliably trigger form submission in jsdom — use `fireEvent.submit(button.closest("form"))` instead (see `BookingForm.test.tsx`).
- Images with `alt=""` are accessibility role `presentation`, not `img` — query via `document.querySelector("img")`, not `getByRole("img")`.
- `Navbar.tsx` exports several otherwise-internal sub-components (`SimplePanel`, `SolutionPanel`, `PlatformPanel`, `SidebarSection`, `MobileNavItem`) purely so they can be unit-tested directly with prop combinations the real `NAV_LEFT`/`NAV_RIGHT` data never exercises (e.g. `SimplePanel` is never reached through the real dropdown router, since every real entry resolves to `PlatformPanel` or `SolutionPanel`).
- `DesktopNavItem`'s `onClose` prop is genuinely dead code (accepted, never invoked) — marked with both a `/* v8 ignore next */` comment and an eslint-disable, not silently deleted, since removing it would be an unrequested behavior-adjacent change.

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

## Backend & admin (MongoDB)

- `src/lib/mongodb.ts` caches the `MongoClient` connection on `global.__mongoClientPromise` — without this, every serverless cold start (and every dev HMR reload) would open a fresh connection pool instead of reusing one.
- `src/lib/enquiries.ts` is the data layer: `insertEnquiry` (called from `/api/contact` and `/api/assessment`), `listEnquiries` (filter by category/status/search), `updateEnquiryStatus`. `ENQUIRY_CATEGORIES` mirrors the `usecase` dropdown options in `BookingForm.tsx` — keep them in sync if that dropdown changes.
- `/admin` is gated by a single shared master username/password, not per-user accounts — by explicit choice (small team, fastest to ship), not an oversight. `src/lib/auth.ts`'s `checkAdminCredentials(username, password)` checks both against `ADMIN_USERNAME` (default `"admin"`) and `ADMIN_PASSWORD` with a timing-safe comparison.
- `src/lib/auth.ts` signs session tokens with Web Crypto (`crypto.subtle`), not `node:crypto` — this lets the exact same signing code run in both `middleware.ts` (Edge runtime) and the Node API routes without a runtime-specific branch.
- `src/proxy.ts` (Next 16's renamed `middleware.ts` convention — the file must be named `proxy.ts` exporting a `proxy` function, not `middleware.ts`/`middleware`) guards `/admin/*` and `/api/admin/*` (except the login routes) — redirects to `/admin/login` for pages, returns 401 JSON for API routes.
- `/admin` is excluded from `robots.ts` for every listed user-agent group, not just `*` — per the robots.txt spec, a crawler matching a specific named group (e.g. `GPTBot`) ignores the `*` group entirely, so the disallow has to be repeated per agent or it's a no-op for any bot with its own group.

## Admin UI (shadcn-admin style)

`/admin` was rebuilt from a single plain-table page into a shadcn-admin-style dashboard, per explicit user request to match https://github.com/satnaing/shadcn-admin. This pulled in real shadcn/ui primitives (not hand-rolled): `Sidebar`, `Table`, `Badge`, `Avatar`, `Select`, `DropdownMenu`, `Sheet`, `Card` — added via `npx shadcn@latest add <name>` — plus `@tanstack/react-table` for the data grid.

- Route structure: `src/app/admin/(dashboard)/` is a route group (no URL segment) holding `layout.tsx` (the `SidebarProvider` + `AdminSidebar` shell) and two pages — `page.tsx` (`/admin`, stat cards + recent list) and `enquiries/page.tsx` (`/admin/enquiries`, the full `EnquiriesDataTable`). `src/app/admin/login/page.tsx` stays a sibling outside the group, so it renders without the sidebar.
- `EnquiriesDataTable.tsx` replaced the old `EnquiriesTable.tsx` (deleted). Filtering/sorting/pagination/column-visibility all run through TanStack Table; row "View" opens `EnquiryDetailSheet.tsx` (a side panel) instead of an inline expand-row — status changes happen there, not in the table itself.
- `src/components/admin/badges.tsx` (`StatusBadge`, `SourceBadge`) is the single place status/source color-coding lives — used by both the dashboard's recent list and the data table.
- **Test gotcha**: Base UI's `Select` (`@base-ui/react/select`, what shadcn's `select.tsx` wraps) only commits a clicked option if that option is already internally "highlighted" — real mouse hovering sets this via `onMouseMove` before the click; a synthetic `fireEvent.click()` alone is a no-op (confirmed by reading `SelectItem.js`'s `onClick`/`onMouseUp` handlers directly). Tests must fire `fireEvent.mouseMove(option)` immediately before `fireEvent.click(option)` — see the `selectOption()` helper in `EnquiriesDataTable.test.tsx`.
- `vitest.config.ts` excludes `src/components/ui/**` and `src/hooks/use-mobile.ts` from the 100% coverage requirement — these are vendored shadcn-generated files, not first-party code, and ship variants (radio-group items, the sidebar's floating/icon-collapse modes) this app never uses.
- `.admin-theme` (in `globals.css`) overrides `--background`/`--card`/`--secondary`/`--muted`/etc. to a neutral oklch grayscale, applied via `className="admin-theme"` on the `(dashboard)/layout.tsx`'s `SidebarProvider`. Without it, the dashboard inherits CloudSwift's blue-tinted `--background` (`#eef4ff`) used everywhere else on the marketing site, which doesn't read as a neutral admin tool.
- **`/admin/login` deliberately does NOT use `.admin-theme`** — by explicit user decision, the login screen uses the marketing site's actual brand styling (`bg-cream`, `bg-rust` button, the real `Logo` component from `src/components/icons.tsx`) since it's the public-facing gateway people see before they're inside the tool. Only the post-login dashboard pages (`/admin`, `/admin/enquiries`) use the neutral shadcn-admin theme. Don't "fix" this inconsistency without asking — it's intentional, not a missed override.

## Assessment wizard (no Cal.com)

`/assessment` was previously a Cal.com calendar embed; it's now a self-contained 3-step qualifying form (`AssessmentWizard.tsx`) — category → category-specific questions → contact info → "we'll be in touch" confirmation. No external scheduling system, no Cal.com dependency at all (deliberately removed — `@calcom/embed-react`, `src/lib/cal.ts`, `CalEmbed.tsx`, and `/api/webhooks/cal` were all deleted, not just unused).

- `src/lib/assessment-questions.ts` is the single source of truth for the qualifying question set — `ASSESSMENT_QUESTIONS[category]` is an ordered list of `{ id, question, options }`. Both the wizard (rendering steps) and `EnquiriesTable` (labeling stored answers) read from this file, so the two can't drift out of sync. The `Other` category's question has `options: []`, which the wizard renders as a free-text textarea instead of multiple-choice buttons — that's the only category that works that way.
- `POST /api/assessment` validates `category` against `ENQUIRY_CATEGORIES`, then calls `insertEnquiry` with `answers: Record<string,string>` and `source: "assessment"`. Sends a Resend notification email the same way `/api/contact` does (same dev-fallback if `RESEND_API_KEY` is unset).
- `Enquiry.answers` is optional — only assessment-wizard submissions have it; contact form submissions don't. `EnquiriesTable` renders a "View details" toggle only when `answers` has at least one key, expanding a row below with question-label/answer pairs (looked up via `ASSESSMENT_QUESTIONS`, not the raw answer key).
- `source: "assessment"` now means "came from the qualifying wizard," not "Cal.com booking" — the type didn't change, just its real-world meaning, when Cal.com was dropped.

## Open items (not yet resolved)

- **About page stat tiles** ("Cloud Managed Services — 95%", "Cloud Security — 92%", "Cloud Migration — 95%", "Data & Analytics — 85%") — confirmed accurate: these match the identical numbers/labels already published on the client's live site (oncloudswift.com). Not fabricated, no action needed.
- **Testimonials** (`TESTIMONIALS` in `src/lib/site-content.ts`) — have Indian names/roles but no company names, and "Read the full story" links still point to `/contact` rather than a real `/case-studies/[slug]` page (not yet rewired — the testimonials and case studies content aren't a 1:1 match, so this needs human judgment, not an automatic swap).
- **Case studies** (`CASE_STUDIES` in `src/lib/site-content.ts`, pages at `/case-studies` and `/case-studies/[slug]`) — all 3 entries are explicitly marked `isPlaceholder: true` with fictional/anonymized clients ("A regional financial services firm", etc.) and a visible "Illustrative example" disclaimer banner on the detail page. Ram is providing 2-3 real client stories to replace these before launch — when that happens, set `isPlaceholder: false` and the disclaimer banner disappears automatically.
- **Hero visual**: intentionally uses the original SpectroCloud-style stacked-hexagon illustration (`/images/hero-hexstack.svg`) per explicit user decision — this was raised as a likely visual copy of a competitor's signature graphic but kept anyway. Don't re-attempt replacing it without being asked.
- Deployed to Vercel at https://cloudswift-demo.vercel.app — domain `oncloudswift.com` still points to the old WordPress site (not yet cut over). Sitemap not yet submitted to Google Search Console (do after domain cutover, if/when that happens).
