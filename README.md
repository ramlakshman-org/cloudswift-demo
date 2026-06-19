# CloudSwift

Marketing website for CloudSwift — an ISO 9001-2015 certified cloud and IT managed services company operating out of Bengaluru and Mumbai. Built on Next.js 16 (App Router, React 19, TypeScript).

## Stack

- **Framework:** Next.js 16, App Router, React 19, TypeScript strict
- **UI:** shadcn/ui (Radix primitives), Tailwind CSS v4
- **Email:** Resend REST API (contact form → `/api/contact`)
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
