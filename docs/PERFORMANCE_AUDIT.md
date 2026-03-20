# Homepage performance audit & changes

## Critical context: framework version

This project runs **Next.js 11.1.2** with the **Pages Router** (`pages/`). There is **no App Router** (`app/` directory).

Therefore the following **do not apply** today:

- React Server Components
- `"use client"` / server vs client component split
- `next/font` (recommended path is App Router; Pages can self-host fonts in CSS)

Optimizations below target **realistic gains** for Pages Router + static export: **JS bundle splitting**, **idle-time network work**, **scroll performance**, and **lazy images** where safe.

---

## 1. Main bottlenecks (audit)

| Area | Issue | Impact |
|------|--------|--------|
| Homepage composition | Services, About, Work, Testimonial imported **synchronously** in one parent | Large **initial JS** for hydration; all MUI icons + grids load before idle |
| Testimonials | **Immediate** `fetch('/api/upwork-testimonials')` on mount | Competes with LCP and main thread on first load; **404 on static export** but still costs a round trip |
| Navigation | `scroll` listener without `{ passive: true }` | Can block scrolling on low-end devices |
| About section image | No explicit `loading="lazy"` | Next defaults help, but explicit is clearer for below-fold content |
| Redux `_app` | Provider wraps **all** pages | Home doesn’t use `useSelector`; still pays Redux init (acceptable until a larger refactor) |
| Heavy UI stacks | MUI + Emotion + styled-components + many icon packages site-wide | **Bundle size** ceiling; fixing properly means incremental migration, not one PR |
| Hero | Two parallel carousels (desktop + mobile) + multiple `next/image` | Inherent cost; already defers extra slides with `slidesToRender` |

---

## 2. Files changed

| File | Change |
|------|--------|
| `components/home-page/home-page.tsx` | `next/dynamic` for Services, About, Work, Testimonial |
| `components/home-page/home-section-placeholder.tsx` | **New** – static placeholder while chunks load |
| `components/home-page/testimonial.tsx` | Defer Upwork fetch with `requestIdleCallback` / `setTimeout` + cancel on unmount |
| `components/layout/main-navigation.js` | Passive scroll listener; `router.pathname` in `useEffect` deps |
| `components/home-page/about-us.tsx` | `loading="lazy"` on secondary image |
| `docs/PERFORMANCE_AUDIT.md` | This document |
| `package.json` | Removed unused/heavy dependencies (`react-scripts`, `react-map-gl`, `react-date-range`, `geolib`, `date-fns`, `@heroicons/react`, `@icons/material`, `@badrap/bar-of-progress`, `react-spinkit`, testing-library stack, duplicate `typescript`); types consolidated under `devDependencies` |
| `components/map/map.tsx` | **Removed** – never imported; dropped Mapbox-heavy `react-map-gl` from the tree |
| `components/calendar/calendar.js` | **Removed** – only referenced from commented-out admin UI; dropped `react-date-range` CSS/JS |
| `styles/globals.css` | Single `font-family` on `body`; `::placeholder` instead of four vendor blocks |
| `next.config.js` | Removed unused `NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN` `env` wiring |

---

## 3. What changed & why

### A. Dynamic imports on the homepage (`home-page.tsx`)

- **Issue:** One synchronous import tree pulled in Services (MUI icons + `serviceItems` map), Work (`grid-item` + images), Testimonial (MUI + fetch), About (image) in the **first** client bundle chunk.
- **Change:** `next/dynamic` with `ssr: true` (default) + a tiny placeholder.
- **Why:** Smaller **initial JS** for the first interactive slice (nav + hero). Below-the-fold code downloads and parses **after** first paint. HTML from SSG/export is still complete for SEO.

### B. Idle-deferred testimonial API (`testimonial.tsx`)

- **Issue:** Fetch ran immediately in `useEffect`, contending with LCP/hydration.
- **Change:** `requestIdleCallback` when available (timeout 4s), else `setTimeout(1500)`; cleanup cancels work.
- **Why:** Keeps main thread freer during the critical window; Upwork enrichment is non-critical for first paint.

### C. Passive scroll (`main-navigation.js`)

- **Issue:** Scroll listener defaulted to non-passive; can force scroll jank.
- **Change:** `{ passive: true }`; effect depends on `router.pathname` so transparency tracks route changes.
- **Why:** Better scroll responsiveness; correct effect dependencies.

### D. Lazy about image (`about-us.tsx`)

- **Change:** `loading="lazy"` on the decorative image.
- **Why:** Signals non-critical fetch/decode when the section is below the fold (especially once dynamic-loaded).

---

## 4. What stayed client-side (and why)

| Piece | Why it stays interactive |
|-------|-------------------------|
| `MainNavigation` | Router, scroll state, mobile menu |
| `Hero` | Carousel, drag, timers, `useRouter` CTA |
| `Services` / `Work` / `Testimonial` | Clicks, filters, sliders, state |
| `Footer` / layout | Unchanged; already uses dynamic scroll-to-top |

---

## 5. Biggest improvements (this pass)

1. **Code-split** homepage below-the-fold sections → smaller initial JS.
2. **Deferred** non-critical testimonial network work.
3. **Smoother scroll** via passive listener + fixed effect deps.
4. **Leaner `node_modules` / install & CI** – removed Create React App (`react-scripts`), Mapbox stack, date-range UI, and other unused packages (see §2 table).

---

## 6. Remaining risks & next steps (higher effort)

1. **Upgrade path:** **Next.js 13+ App Router** unlocks Server Components, `next/font`, and finer streaming. Largest long-term win for “80+” Lighthouse-style scores.
2. **Images:** Convert hero/slides to **WebP/AVIF** (shrink bytes); keep `priority` only on first slide (already done).
3. **Icons:** Replace per-section `@material-ui/icons` barrels with **tree-shaken** SVGs or a single small icon set.
4. **Redux:** If only a few routes need the store, **lazy-load Provider** or split stores to avoid homepage paying Redux tax.
5. **Styled-components + MUI + Emotion:** Three styling systems inflate bundle; consolidating is a multi-week refactor.
6. **Hero DOM:** Two carousels duplicate images in markup; a single responsive carousel would cut DOM/image work (layout-sensitive change—do with visual QA).

---

## 7. How to verify

- Run production build locally: `npm run build` (or `npm run build:deploy` for static).
- Chrome DevTools → **Performance** + **Coverage** on `/`: confirm smaller initial script vs before.
- Lighthouse (mobile, throttled): compare **LCP**, **TTI**, **Total Blocking Time** before/after.
