# GEOura — Technical & Commercial Audit

**Date:** 2026-11-05  
**Repo:** `geoura_site` (Next.js 15 / React 19)  
**Live reference:** https://geoura-front-landingpage.vercel.app/en

## Stack & architecture

| Item | Finding |
|------|---------|
| Framework | Next.js 15.5 App Router, React 19, TypeScript strict |
| Styling | Monolithic `app/globals.css` (no Tailwind) |
| Motion | framer-motion + CSS; partial `prefers-reduced-motion` |
| i18n | Path prefixes `/en`, `/pt` — manual copy, no next-intl |
| Backend | None (no auth, DB, analytics SDK, lead API) |
| Content | `topics.json` (1,200) + `content/{en,pt}/*.md` (2,400 drafts) |

### Public routes

- `/` → redirect `/en`
- `/[locale]` homepage
- `/[locale]/plataforma`
- `/[locale]/artigos` (+ query filters)
- `/[locale]/artigos/[slug]` (~1,200 × 2)
- `/sitemap.xml`, `/robots.txt`, OG/icon routes

## Confirmed problems

1. **Mobile nav missing** — primary links and CTA hidden ≤760px.
2. **Abstract / outcome-heavy copy** without a clear product action (no domain capture).
3. **Incomplete PT-BR UI** — many English strings on `/pt` routes (footer, journal H1, article chrome).
4. **Invalid locales** (e.g. `/fr`) render English without 404/redirect.
5. **Illustrative metrics** look like real GSC proof; disclaimers exist but CTAs reinforce “+ revenue”.
6. **No lead form / analytics** — only `mailto:`.
7. **No Privacy / Terms** pages.
8. **1,200 near-identical templated articles** — high scaled-content risk if mass-indexed.
9. **Three flagship slugs were indexable** while bodies remain editorial drafts (credibility risk).
10. **Journal index is indexable** and lists all drafts (crawl noise).
11. **No hamburger / focusable mobile menu**; keyboard path incomplete on small screens.
12. **SoftwareApplication JSON-LD** with price `0` / PreOrder may overstate product maturity.

## Potential problems

- `marked` + `dangerouslySetInnerHTML` without sanitizer (trusted content assumption).
- Sync `fs.readFileSync` per article request at scale.
- Google Fonts CSS `@import` (render-blocking).
- OG image English-only.
- Feature cards on homepage not linked into product narrative.

## Already implemented

- Locale layouts with `html lang`, hreflang + `x-default`, canonicals
- robots.txt, filtered sitemap, draft `noindex`
- Organization / WebSite / Article / Breadcrumb JSON-LD (partial)
- Dynamic icon + OG/Twitter images
- Journal search/filter/pagination with crawlable `?page=`
- Language switcher that preserves path
- Illustrative graphic with “illustrative” labels
- Editorial draft banners on unpublished posts

## Missing vs GEOura 2.0 brief

- Conversion-oriented hero + honest domain waitlist flow
- Problem / How it works / Features / Differentiation / FAQ sections
- Mobile navigation
- Analytics event layer
- Editorial status workflow beyond a slug Set
- Privacy & Terms
- Content roadmap for hub pages (not mass generation)
- Locale middleware
- Automated tests

## Recommended implementation order (this iteration)

1. Credibility: unpublish draft flagships; clarify illustrative metrics; honest CTA.
2. Value clarity: new hero + problem + how-it-works + pillars.
3. Conversion: domain interest capture (validated, no fake analysis) + events.
4. Product preview labeled as preview.
5. SEO/editorial hygiene + docs.
6. Performance/a11y (mobile nav, reduced motion, focus).

## Regression risks

- Homepage markup rewrite may break existing CSS selectors — extend tokens, keep class names where possible.
- Emptying `publishedSlugs` removes article URLs from sitemap (intentional).
- New API route must not fetch arbitrary URLs (SSRF).

## Dependencies

No new heavy UI frameworks required. Keep Next/React/framer-motion/lucide. Add only lightweight helpers + optional Node test runner if needed for smoke checks.
