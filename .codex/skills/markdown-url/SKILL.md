---
name: markdown-url
description: "Convert public read-only pages to Markdown when direct retrieval is incomplete or hard to read. Skip authenticated and interactive pages."
---

# markdown.new URL Prefix

Prefer direct source retrieval. Use `markdown.new` as an optional fallback for public read-only pages when it improves extraction. Do not route private, authenticated, or signed URLs through the conversion service.

## Rewrite Rule

1. Normalize the destination into an absolute URL with a scheme (`https://` preferred).
2. Prefix it with `https://markdown.new/` (do not drop the original scheme).

### Examples

- `https://example.com` -> `https://markdown.new/https://example.com`
- `https://example.com/docs?a=1#b` -> `https://markdown.new/https://example.com/docs?a=1#b`
- `example.com` -> `https://markdown.new/https://example.com`

## Agent workflow

1. Read the original source through an available direct retrieval tool.
2. If the public page is incomplete or hard to extract, try the prefixed URL once when compatible with the policy below.
3. Verify that the result contains the actual requested content and cite the original source.
4. On failure, use the original site or browser and report any remaining content gap.

## Policy: When To Use markdown.new (Required)

Do NOT route every site through `markdown.new`. Use it primarily for "read-only" pages where you want clean, extractable text:

- Documentation pages
- Blog posts / announcements / changelogs
- GitHub issues/PR discussions (when you just need readable text)
- Articles and guides

Skip `markdown.new` and go straight to the original URL when the destination is likely to be blocked or requires the original site behavior:

- Login, OAuth, checkout, payment, or any authenticated workflow
- Sites that gate content behind JS apps, CAPTCHAs, bot detection, or paywalls
- File uploads, forms, editors, dashboards, interactive widgets
- Anything where cookies/session state must be preserved

### Block/Failure Signals (Treat As Blocked)

If you try `markdown.new` and see any of the below, stop retrying and fall back to the original URL:

- HTTP `401/403/429`, "Access denied", "Forbidden", "rate limited"
- CAPTCHA / "verify you are human"
- Empty/partial content that clearly does not match the page
- Redirect loops or repeated navigation failures

### Fallback Behavior

1. Attempt `markdown.new` once when appropriate.
2. On block/failure, immediately switch to the original URL for browsing.
3. If you still need extractable text, try to extract from the original page (reader mode / copy text) and clearly note that `markdown.new` was blocked.

## Notes / Exceptions

- Keep this for reading/browsing. For API endpoints, OAuth flows, file uploads, or anything that depends on cookies/login state, use the original URL if the proxy breaks functionality.
- Do not rewrite local paths (`./README.md`) or non-HTTP(S) schemes.

## Optional CLI Helper

Convert a URL into its markdown.new-prefixed form:

```bash
node skills/markdown-url/scripts/markdown-url.js "https://example.com/docs"
```
