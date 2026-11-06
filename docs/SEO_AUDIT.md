# SEO audit — GEOura

## Implemented (code)

| Area | Status |
|------|--------|
| Title / description per locale page | Yes |
| Canonical + hreflang (`en`, `pt-BR`, `x-default`) | Yes |
| Open Graph + Twitter + dynamic images | Yes |
| `html lang` per locale | Yes |
| robots.txt | Allow `/`, disallow `/api/` |
| sitemap.xml | Static indexable routes + published articles only |
| Draft articles `noindex` | Yes (`editorial` / `publishedSlugs`) |
| JSON-LD Organization, WebSite, Article, Breadcrumb, FAQPage | Yes (FAQ on homepage) |
| Locale middleware (invalid → `/en`) | Yes |
| Privacy / Terms / About in sitemap | Yes |

## Intentional exclusions

- Draft article URLs reachable but `noindex` + out of sitemap
- `publishedSlugs` empty until editorial hubs are rewritten
- No AMP / news / video sitemaps (N/A)
- No fabricated AggregateRating / Review schema

## Remaining gaps

1. Self-host fonts (`next/font`) to reduce render-blocking CSS `@import`
2. Per-locale OG copy
3. Search Console verification meta (env-driven)
4. Journal index still lists drafts (clearly labeled; consider `noindex` on draft-heavy views later)
5. Article bodies still templated — content SEO debt (see CONTENT_ROADMAP)

## Crawl notes

- Prefer SSR HTML (articles already SSR)
- Domain interest API never fetches user URLs (SSRF-safe)
- Internal pagination uses `<Link href="?page=">` for crawlability of journal UI
