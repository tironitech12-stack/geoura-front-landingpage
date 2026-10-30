# GEOura — Organic Discovery Intelligence

Premium bilingual Next.js 15/React 19 site and editorial research system for SEO, GEO, and AEO.

## Start

```bash
npm install
npm run dev
# http://localhost:3000/en
```

Configure `NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com` in `.env.local` before production deployment. The initial canonical domain is illustrative. Update the contact address `hello@geoura.com` to an address you control.

## Included

- Bespoke responsive marketing landing, platform description, journal with search/filter/pagination, 3 research disciplines, alternate locale routes.
- 1,200 unique research topics imported from the supplied spreadsheet (400 SEO, 400 GEO, 400 AEO).
- 2,400 Markdown **working editorial drafts** (`content/en` and `content/pt`), each 15,000–20,000 characters. Content has deliberate repeated checklists and English sections in Portuguese drafts. This is not 2,400 independently researched, fact-checked or professionally translated articles. Do **not** publish as-is.
- Server-rendered article pages, metadata, canonical & language alternates, structured Article JSON-LD, robots, filtered XML sitemap, responsive styling, reduced-motion support, and accessible semantic navigation.
- Zero fabricated keyword volumes or performance outcomes. Product metrics in hero illustration are explicitly sample-only.

## Editorial safety — IMPORTANT

This site must **not** mass-index repetitive drafts. By default, only topic slugs in `publishedSlugs` at `lib/data.ts` are eligible for indexing/sitemap. These are showcase flags only, not a factual approval: review them too before a live launch. All other article pages have `robots.index=false` and are excluded from sitemap.

Before approving any article:
1. Merge equivalent query variations into comprehensive pages instead of splitting identical intent into many URLs.
2. Replace generic boilerplate with firsthand insights, verified sources, original examples, illustrations and genuinely distinctive solutions.
3. Rewrite the Portuguese version in natural Brazilian Portuguese; some draft sections remain in English.
4. Add a real editorial author, review date, primary-source references and change log.
5. Verify every example and product claim, ensure original helpful content, confirm uniqueness and update title/meta description.
6. Publish by adding a validated slug to `publishedSlugs`; keep unapproved pages `noindex`.

**Why:** Google Search spam policies discourage scaled content abuse. Being 15,000 characters long is not an SEO advantage. GEO/AEO is not guaranteed by schema alone.

## Production notes

- `generate_articles.py` regenerates drafts from `topics.json` (requires Python 3 only).
- `build_data.py` reconstructs topics from provided Excel, requires `artifact_tool` only in the build environment; deployment does not need the spreadsheet.
- No authentication, user database, crawler, billing, live API integrations, dashboards, or analytics data is present. This project is a complete marketing/editorial website and **product positioning demo**, not an operational SaaS backend.
- First 3 flagship articles need editorial approval before production publication; update the `publishedSlugs` set if they are not reviewed.
- For production on Vercel, `npm run build`; optionally add analytics consent, Search Console verification, actual screenshots, favicon, privacy policy, forms connected to your own backend.
