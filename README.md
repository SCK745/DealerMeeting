# DealerMeeting — Bennington 2026 Lineup Site

Static marketing site for a Bennington pontoon dealership. Walks shoppers up the
price/luxury ladder across all six series: **S → M → R → RX → Q → QX**.

Plain HTML/CSS/JS — no build step, no framework. Deployable straight to GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage — hero + full price ladder |
| `s.html` `m.html` `r.html` `rx.html` `q.html` `qx.html` | One page per series (shared template) |
| `compare.html` | Side-by-side comparison table |

## Shared pieces

- `styles.css` — all styling; palette lives in the `:root` variables at the top.
- `script.js` — renders the nav, footer, and the reusable **price-ladder component**
  on every page. The `SERIES` array at the top is the single source of truth for
  names, taglines, price bands, and the step-up/step-down copy.

## Swapping in real content before launch

1. **Pricing** — the price bands are PLACEHOLDERS. Update them in two places:
   the `SERIES` array in `script.js` (feeds the ladder everywhere), and the
   per-page cost cards / hero chips + the `compare.html` table (marked with comments).
2. **Photos** — series photos live in `NO Background boat photots/`. Each page's
   hero `<img>` has a comment where to swap the `src`.
3. **Copy** — overview / features / what's-new sections are plain HTML on each
   series page, marked with `a.`–`e.` comments matching the site spec.

## Deploying to GitHub Pages

All asset paths are relative, so the site works under a project path like
`https://<user>.github.io/DealerMeeting/`. In the repo settings, enable
Pages → Deploy from branch → `main` / root.
