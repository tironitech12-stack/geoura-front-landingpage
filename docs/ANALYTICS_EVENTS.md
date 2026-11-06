# Analytics events — GEOura

Provider-agnostic layer: `lib/analytics.ts` (`track`).

Supports (when present on `window`):

- `dataLayer.push`
- `gtag('event', …)`
- `posthog.capture`

No PII, tokens, or full page HTML are sent. Domain events use **hostname only**.

## Event catalog

| Event | When | Props (examples) |
|-------|------|------------------|
| `landing_view` | Home mount | `page` |
| `hero_cta_click` | Primary CTA / nav / submit | `source` |
| `domain_input_started` | First keystroke in domain field | — |
| `domain_submit` | Valid client-side submit | `hostname` |
| `domain_validation_error` | Client validation fail | `reason` |
| `analysis_failed` | API/network failure | `status` / `reason` |
| `waitlist_success` | API returns waitlist OK | `hostname` |
| `signup_completed` | Waitlist success | `mode=waitlist` |
| `faq_open` | FAQ expands | `index` |
| `nav_click` | Header nav | `id` |
| `language_changed` | EN ↔ PT | `from`, `to` |
| `article_cta_click` | Reserved for article CTAs | — |
| `pricing_viewed` | Reserved (no pricing page yet) | — |
| `analysis_started` / `analysis_completed` | Reserved until real analysis exists | — |
| `signup_started` | Reserved | — |

## Honesty rules

- Do **not** fire `analysis_completed` for waitlist-only submissions.
- Do **not** invent conversion events.
- Wire GA4/GTM/PostHog via env + snippet when approved; keep `track()` as the single call site.

## Consent

When a consent banner is added, gate `track()` behind consent for non-essential providers.
