# DealerMeeting — Bennington 2027 Lineup Site

Static marketing site for a Bennington pontoon dealership. Walks shoppers through the
full lineup from entry to flagship: **S One → S → LX → LT → M → R → RT → RX → Q → QX**.

Plain HTML/CSS/JS, no build step, no framework. Deployed to GitHub Pages at
https://sck745.github.io/DealerMeeting/

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage: hero + full lineup navigator |
| `s-one.html` `s.html` `lx.html` `lt.html` `m.html` `r.html` `rt.html` `rx.html` `q.html` `qx.html` | One page per series (shared template) |
| `compare.html` | Side-by-side comparison table |
| `boats/*.html` | One page per boat model, reachable from the model dropdown on its series page |

## Shared pieces

- `styles.css`: all styling; palette lives in the `:root` variables at the top.
- `script.js`: renders the nav, footer, and the reusable **lineup navigator component**
  on every page. The `SERIES` array at the top is the single source of truth for
  names, taglines, price bands, and the step-up/step-down copy.

## Swapping in real content before launch

1. **Pricing**: the price bands are PLACEHOLDERS. Update them in two places:
   the `SERIES` array in `script.js` (feeds the lineup navigator everywhere), and the
   per-page cost cards / hero chips + the `compare.html` table (marked with comments).
2. **Photos**: series photos live in `Final_NoBackground/` (transparent PNGs, one per
   series). To swap a photo, replace the file there or update that page's hero `<img>`
   src (each has a comment marking the spot).
3. **Copy**: overview / features / what's-new sections are plain HTML on each
   series page, marked with `a.` to `e.` comments matching the site spec. The S One
   and LX pages contain placeholder copy to confirm against dealer materials.
4. **Boat models**: each page in `boats/` has placeholder Options and What's New
   lists to fill in. The model list lives in the `BOATS` map in `script.js` (drives
   every dropdown); to add a model, add its code there and run
   `python3 scripts/generate_boat_pages.py` to create its page (existing pages are
   never overwritten).

## Deploying to GitHub Pages

All asset paths are relative, so the site works under the project path.
Pages is enabled on this repo: Deploy from branch, `main`, root. Pushing to
`main` republishes the site automatically.
