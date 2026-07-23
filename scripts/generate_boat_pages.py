#!/usr/bin/env python3
"""Generate one page per boat model into boats/.

Usage:  python3 scripts/generate_boat_pages.py

The model list below mirrors the BOATS map in script.js — keep them in sync.
Existing boat pages are NOT overwritten (so hand-edited options/what's-new
content is safe); delete a file first if you want it regenerated fresh.
"""
import os, re

# series id -> (display name, series page, hero photo)
SERIES = {
    "s-one": ("S One Series", "s-one.html", "Final_NoBackground/LargeNoBackgroundSOne-Red.png"),
    "s":     ("S Series",     "s.html",     "Final_NoBackground/NoBackgroundS-series.png"),
    "lx":    ("LX Series",    "lx.html",    "Final_NoBackground/NoBackgroundLX.png"),
    "lt":    ("LT Series",    "lt.html",    "Final_NoBackground/LT-Series.png"),
    "m":     ("M Series",     "m.html",     "Final_NoBackground/NoBackgroundM.png"),
    "r":     ("R Series",     "r.html",     "Final_NoBackground/NoBackgroundR.png"),
    "rt":    ("RT Series",    "rt.html",    "Final_NoBackground/NoBckgroundBowRider.png"),
    "rx":    ("RX Series",    "rx.html",    "Final_NoBackground/NobackgroundRX.png"),
    "q":     ("Q Series",     "q.html",     "Final_NoBackground/NoBackgroundQ.png"),
    "qx":    ("QX Series",    "qx.html",    "Final_NoBackground/NoBackgroundQX.png"),
}

BOATS = {
    "s-one": ["188S1L", "20S1SR", "22S1SB"],
    "s": ["22SSB", "22SSR", "20SSR-LUXE", "23QC-LUXE", "22SSR-LUXE", "22SSB-SPORT", "25SSB-LUXE"],
    "lx": ["23LXSSB"],
    "m": ["21ML", "22MFC", "22MFB", "23MOFB-SPORT/30LE", "24MSL-SPORT/30LE", "24MCSB-LUXE", "26MSB-LUXE"],
    "r": ["23RSB-30LE", "25RSBA", "27RFBWAT2-30LE", "25RFBWA"],
    "rt": ["25RTSBA"],
    "rx": ["25RXFBA", "27RXSBWAT2"],
    "q": ["25QSBA"],
    "qx": ["25QXSBA", "27QXFBAT2", "27QXFBAX2-30LE", "30QXSBWAX2"],
}

def slug(code):
    return re.sub(r"[^a-z0-9]+", "-", code.lower())

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0b1826" />
<title>{code} | Bennington {series_name}</title>
<meta name="description" content="Bennington {code}: options and what's new for 2027 on this {series_name} model." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../styles.css" />
</head>
<!-- data-page = parent series (drives nav + lineup highlight);
     data-boat = this model (drives the dropdown's selected item) -->
<body data-page="{series_id}" data-boat="{code}">

<div id="site-nav"></div>

<main>

  <!-- ============ BOAT HERO ============
       PLACEHOLDER photo (shared series image) — swap the img src below
       for a photo of this specific boat when available. -->
  <section class="series-hero">
    <div class="wrap series-hero-inner">
      <div>
        <p class="series-kicker">{series_name} · Model</p>
        <h1>{code}</h1>
        <p class="series-tagline">Placeholder: add a one-line description of the {code}.</p>
        <a class="back-chip" href="../{series_page}">&larr; Back to {series_name}</a>
        <span id="boat-menu"></span> <!-- model dropdown rendered by script.js -->
      </div>
      <img class="series-photo" src="../{photo}"
           alt="Bennington {code} pontoon" decoding="async" />
    </div>
  </section>

  <!-- ============ OPTIONS — replace the placeholder items below ============ -->
  <section class="series-section">
    <div class="wrap">
      <p class="eyebrow">Options</p>
      <h2>Available options</h2>
      <ul class="feature-list">
        <li>Placeholder: add option packages for the {code} here</li>
        <li>Placeholder: engine choices</li>
        <li>Placeholder: colors and trim options</li>
        <li>Placeholder: technology and audio upgrades</li>
      </ul>
    </div>
  </section>

  <!-- ============ WHAT'S NEW FOR 2027 — replace the placeholder items below ============ -->
  <section class="series-section">
    <div class="wrap">
      <p class="eyebrow">What's New for 2027</p>
      <h2>2027 updates</h2>
      <ul class="new-list">
        <li>Placeholder: add confirmed {code} 2027 updates here</li>
      </ul>
    </div>
  </section>

  <!-- ============ LINEUP NAVIGATOR — rendered by script.js, highlights the {series_name} ============ -->
  <div id="price-ladder"></div>

</main>

<div id="site-footer"></div>

<script src="../script.js"></script>
</body>
</html>
"""

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    outdir = os.path.join(root, "boats")
    os.makedirs(outdir, exist_ok=True)
    written = skipped = 0
    for series_id, codes in BOATS.items():
        series_name, series_page, photo = SERIES[series_id]
        for code in codes:
            path = os.path.join(outdir, slug(code) + ".html")
            if os.path.exists(path):
                skipped += 1
                continue
            with open(path, "w") as f:
                f.write(TEMPLATE.format(code=code, series_id=series_id,
                                        series_name=series_name,
                                        series_page=series_page, photo=photo))
            written += 1
    print(f"wrote {written} pages, skipped {skipped} existing")

if __name__ == "__main__":
    main()
