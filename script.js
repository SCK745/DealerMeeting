/* ============================================================================
   BENNINGTON LINEUP SITE — SHARED COMPONENTS
   ----------------------------------------------------------------------------
   This one file renders the pieces that appear on every page:

     1. SERIES data          — single source of truth for names, pricing,
                               taglines, photos, and step-up/step-down copy.
                               EDIT PRICING / COPY HERE — it flows to the
                               homepage ladder, every series-page ladder
                               widget, and the nav automatically.
     2. Nav bar              — injected into  <div id="site-nav">
     3. Footer               — injected into  <div id="site-footer">
     4. Price ladder         — injected into  <div id="price-ladder">
                               Two variants:
                                 "full"   — big staircase on the homepage
                                 "widget" — compact strip + step-up/step-down
                                            cards at the bottom of each
                                            series page
   Each page declares itself with  <body data-page="s">  (or "m", "r", "rx",
   "q", "qx", "home", "compare"). The nav highlight and ladder highlight key
   off that attribute.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   1. SERIES DATA — ordered from entry (S) to flagship (QX).
   ---------------------------------------------------------------------------
   priceBand:  PLACEHOLDER bands — replace with real MY26 dealer MSRP figures
               before launch. Keep them ascending S -> QX.
   stepUpWhy:  the one-line reason to move UP TO this series (shown on the
               page of the series directly below it).
   stepDownWhy:the one-line reason to move DOWN TO this series (shown on the
               page of the series directly above it).
   -------------------------------------------------------------------------- */
const SERIES = [
  {
    id: "s",
    name: "S Series",
    page: "s.html",
    tag: "Entry · Have It Your Way",
    tagline: "The customizable gateway into the Bennington family.",
    priceBand: "$35K–$55K", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NoBackgroundS-series.png",
    stepUpWhy: "", /* nothing below the S */
    stepDownWhy:
      "Step down to S for Bennington's most budget-friendly entry point — still highly customizable.",
  },
  {
    id: "m",
    name: "M Series",
    page: "m.html",
    tag: "Step-Up · Soul of the Lineup",
    tagline: "More standard equipment, more floorplans — the heart of Bennington.",
    priceBand: "$50K–$70K", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NoBackgroundM.png",
    stepUpWhy:
      "Step up to M for more standard equipment and floorplans the S can't reach.",
    stepDownWhy:
      "Step down to M for a more budget-friendly boat that keeps the 2026 Sport/Luxe refresh.",
  },
  {
    id: "r",
    name: "R Series",
    page: "r.html",
    tag: "Performance · Most Customizable",
    tagline: "Dynamic performance with extensive luxury floorplans.",
    priceBand: "$70K–$95K", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NoBackgroundR.png",
    stepUpWhy:
      "Step up to R for more luxury floorplans, deeper customization, and dynamic performance.",
    stepDownWhy:
      "Step down to R for broader floorplan choice at a lower starting price.",
  },
  {
    id: "rx",
    name: "RX Series",
    page: "rx.html",
    tag: "Sport · Athletic Silhouette",
    tagline: "Sport-tuned performance wrapped in plush comfort.",
    priceBand: "$95K–$120K", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NobackgroundRX.png",
    stepUpWhy:
      "Step up to RX for a sport-tuned, athletic take on the R platform.",
    stepDownWhy:
      "Step down to RX if sporty performance matters more to you than premium trim.",
  },
  {
    id: "q",
    name: "Q Series",
    page: "q.html",
    tag: "Premium · Luxury Cruising",
    tagline: "Luxury amenities and performance, one step below the flagship.",
    priceBand: "$115K–$150K", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NoBackgroundQ.png",
    stepUpWhy:
      "Step up to Q for premium luxury amenities and refined cruising performance.",
    stepDownWhy:
      "Step down to Q for premium luxury without the flagship price tag.",
  },
  {
    id: "qx",
    name: "QX Series",
    page: "qx.html",
    tag: "Flagship · All-New for 2026",
    tagline: "The pinnacle — fully redesigned for 2026.",
    priceBand: "$150K+", /* PLACEHOLDER — replace with real MSRP */
    photo: "NO Background boat photots/NoBackgroundQX.png",
    stepUpWhy:
      "Step up to QX for the fully redesigned 2026 flagship — Commander Dash 2.0, carbon fiber, up to 1,000 HP.",
    stepDownWhy: "", /* nothing above the QX */
  },
];

/* Pricing fine print shown wherever a price band appears. */
const PRICE_DISCLAIMER =
  "Starting MSRP, MY26 — excludes destination fee, options, and dealer fees. " +
  "Contact your dealer for exact pricing. (Price bands shown are placeholders.)";

/* Which page are we on? Set via <body data-page="..."> on every page. */
const CURRENT_PAGE = document.body.dataset.page || "home";

/* ---------------------------------------------------------------------------
   2. NAV BAR — Home | S | M | R | RX | Q | QX | Compare
   -------------------------------------------------------------------------- */
function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const links = [
    { id: "home", label: "Home", href: "index.html" },
    ...SERIES.map((s) => ({ id: s.id, label: s.name.split(" ")[0], href: s.page })),
    { id: "compare", label: "Compare", href: "compare.html" },
  ];

  mount.innerHTML = `
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="index.html" aria-label="Bennington home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">BENNINGTON</span>
        </a>
        <nav class="top-nav" aria-label="Primary">
          ${links
            .map(
              (l) =>
                `<a href="${l.href}" class="${l.id === CURRENT_PAGE ? "active" : ""} ${
                  l.id === "qx" ? "nav-flagship" : ""
                }">${l.label}</a>`
            )
            .join("")}
        </nav>
      </div>
    </header>`;
}

/* ---------------------------------------------------------------------------
   3. FOOTER
   -------------------------------------------------------------------------- */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div class="footer-brand">
          <span class="brand-mark dark" aria-hidden="true"></span>
          <span>BENNINGTON</span>
        </div>
        <p>&copy; ${new Date().getFullYear()} · Dealer lineup walkthrough. Not affiliated with
        Bennington Marine. ${PRICE_DISCLAIMER}</p>
      </div>
    </footer>`;
}

/* ---------------------------------------------------------------------------
   4. PRICE LADDER — the reusable component.
   ---------------------------------------------------------------------------
   Usage:  <div id="price-ladder"></div>  anywhere on a page.

   On the homepage (data-page="home") it renders the FULL staircase.
   On a series page it renders the compact WIDGET:
     - all six rungs, current one highlighted
     - "Next step up" / "Next step down" cards with a one-line reason
   -------------------------------------------------------------------------- */
function renderLadder() {
  const mount = document.getElementById("price-ladder");
  if (!mount) return;

  const currentIdx = SERIES.findIndex((s) => s.id === CURRENT_PAGE);
  const isWidget = currentIdx !== -1; // full staircase on home/compare, widget on series pages

  /* --- the six rungs (shared by both variants) --- */
  const rungs = SERIES.map((s, i) => {
    const isCurrent = i === currentIdx;
    return `
      <li style="--i:${i}">
        <a href="${s.page}" class="rung rung-${s.id} ${isCurrent ? "rung-current" : ""} ${
      s.id === "qx" ? "rung-flagship" : ""
    }" ${isCurrent ? 'aria-current="page"' : ""}>
          <span class="rung-num">0${i + 1}</span>
          <span class="rung-name">${s.name}</span>
          <span class="rung-tag">${s.tag}</span>
          <span class="rung-price">${s.priceBand}*</span>
          ${isCurrent ? '<span class="rung-you">You are here</span>' : ""}
        </a>
      </li>`;
  }).join("");

  /* --- step-up / step-down cards (widget variant only) --- */
  let stepCards = "";
  if (isWidget) {
    const up = SERIES[currentIdx + 1]; // series directly ABOVE
    const down = SERIES[currentIdx - 1]; // series directly BELOW
    stepCards = `
      <div class="ladder-steps">
        ${
          up
            ? `<a class="step-card step-up" href="${up.page}">
                 <span class="step-label">▲ Next step up · ${up.name} · ${up.priceBand}*</span>
                 <span class="step-why">${up.stepUpWhy}</span>
               </a>`
            : `<div class="step-card step-top"><span class="step-label">★ Top of the ladder</span>
                 <span class="step-why">The QX is Bennington's flagship — there is no step above.</span></div>`
        }
        ${
          down
            ? `<a class="step-card step-down" href="${down.page}">
                 <span class="step-label">▼ Next step down · ${down.name} · ${down.priceBand}*</span>
                 <span class="step-why">${down.stepDownWhy}</span>
               </a>`
            : `<div class="step-card step-bottom"><span class="step-label">● Entry point</span>
                 <span class="step-why">The S Series is where the Bennington ladder begins.</span></div>`
        }
      </div>`;
  }

  mount.innerHTML = `
    <section class="ladder ${isWidget ? "ladder-widget" : "ladder-full"}" aria-label="Bennington price ladder">
      <div class="wrap">
        ${
          isWidget
            ? `<p class="eyebrow">The Price Ladder</p>
               <h2 class="ladder-title">Where the ${SERIES[currentIdx].name} sits in the lineup</h2>`
            : ""
        }
        <ol class="ladder-rail" role="list">${rungs}</ol>
        ${stepCards}
        <p class="disclaimer">*${PRICE_DISCLAIMER}</p>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------------------
   Reveal-on-scroll — light touch, purely cosmetic.
   -------------------------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".rung, .section-head, .feature-list li, .new-list li, .cost-card, .step-card, .overview p, .compare-scroll, .home-card"
  );
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => io.observe(el));
}

/* ---- boot ---- */
renderNav();
renderFooter();
renderLadder();
initReveal();
