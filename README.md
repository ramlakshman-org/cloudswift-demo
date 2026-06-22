# CloudSwift

Marketing website for CloudSwift — an ISO 9001-2015 certified cloud and IT managed services company operating out of Bengaluru and Mumbai. Built on Next.js 16 (App Router, React 19, TypeScript).

## Stack

- **Framework:** Next.js 16, App Router, React 19, TypeScript strict
- **UI:** shadcn/ui (Base UI primitives, `style: "base-nova"`), Tailwind CSS v4
- **Email:** Resend REST API (contact form → `/api/contact`, assessment wizard → `/api/assessment`)
- **Database:** MongoDB Atlas (enquiry leads from both `/api/contact` and `/api/assessment` → `src/lib/enquiries.ts`)
- **Admin:** `/admin` — password-protected, shadcn-admin-style dashboard (sidebar + `/admin` overview + `/admin/enquiries` data table) built with shadcn/ui + TanStack Table, for triaging enquiries by category/status with structured `/assessment` answers shown in a detail panel
- **Lead capture:** `/assessment` is a 3-step qualifying wizard (category → questions → contact info), not a calendar booking — no external scheduling dependency
- **Deployment:** Vercel

## Commands

```bash
npm install
npm run dev        # start dev server
npm run build       # production build
npm run lint        # ESLint
npm run typecheck    # TypeScript check
npm run check        # lint + typecheck + build
```

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact form submissions via Resend. Without it, submissions are logged to the server console instead (dev fallback). |
| `MONGODB_URI` | Atlas connection string for persisting contact form and assessment wizard submissions as enquiries. Without it, enquiries are logged to the server console instead of saved (dev fallback) — both forms still work, nothing is lost silently in dev, but nothing is queryable in `/admin` either. |
| `MONGODB_DB` | Database name to use within the Atlas cluster. Defaults to `cloudswift` if unset. |
| `ADMIN_USERNAME` | Shared master username for `/admin` login. Defaults to `admin` if unset. |
| `ADMIN_PASSWORD` | Shared master password for `/admin` login. Required for the admin dashboard to be reachable at all — without it, login always fails regardless of username. |
| `ADMIN_SESSION_SECRET` | HMAC secret for signing admin session cookies. Falls back to `ADMIN_PASSWORD` if unset; set a separate value in production so rotating the login password doesn't invalidate the signing secret's security boundary. |

## Project structure

```
src/
  app/          # routes (Next.js App Router)
  components/   # React components
  lib/          # site content, utilities
  hooks/        # custom hooks
  types/        # shared TypeScript types
public/
  images/       # site images
  seo/          # favicons, OG assets
```
