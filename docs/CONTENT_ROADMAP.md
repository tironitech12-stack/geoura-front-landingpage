# Content roadmap — GEOura Journal

## Editorial principle

Do **not** mass-publish the 1,200 templated drafts. Treat `content/` as a research backlog. Only `published` status is indexable (`lib/editorial.ts` + `publishedSlugs`).

Current published set: **empty** (credibility first).

## Status flow

`draft → in_review → published → archived`

## Priority hubs (rewrite first)

Justification: maps to Google Search fundamentals + commercial intent + differentiation (SEO/GEO/AEO).

| Priority | Cluster | Candidate slugs | Why |
|----------|---------|-----------------|-----|
| P0 | Foundations | `SEO-search-engine-optimization`, `GEO-generative-engine-optimization`, `AEO-answer-engine-optimization` | Flagship definitions |
| P0 | Technical SEO | `SEO-robots-txt`, `SEO-xml-sitemap`, `SEO-canonical-tags`, `SEO-core-web-vitals` | Crawl/index fundamentals |
| P0 | Trust / AI | `GEO-what-is-google-ai-overviews`, `AEO-answer-first-content`, helpful-content original hub (new) | Align with Google AI + helpful content |
| P1 | Structured data | `SEO-structured-data-seo`, `AEO-faq-schema-markup` | Appearance / AEO |
| P1 | Measurement | Search Console hubs, GEO citation measurement | Commercial follow-up |
| P2 | Verticals | Collapse `*-for-*` long-tails into fewer industry hubs | Reduce cannibalization |

## Clusters to organize

- SEO Fundamentals
- Technical SEO
- GEO
- AEO
- AI Search
- Content Strategy
- Organic Growth
- Analytics & Measurement
- SEO Tools
- Industry Use Cases

## Rewrite checklist (per hub)

1. Answer-first lead (AEO)
2. Primary Google / primary-source citations with URLs
3. Original examples or screenshots (labeled)
4. Author + real publish / update dates
5. Full PT-BR rewrite (not EN paste)
6. Internal links to sibling hubs
7. No fabricated metrics
8. Move slug into `publishedSlugs` only after review

## Explicit non-goals this cycle

- Regenerating 2,400 markdown files
- Auto-translating with machine MT and publishing
- Indexing question-farm variants (`how can i…` × hundreds)
