# Performance audit — Next.js 11 (Pages Router)

## Important: project shape

This repository uses **Next.js 11.1.2** with the **Pages Router** (`pages/`), **not** the App Router.

There is **no** `app/layout.tsx` or `app/page.tsx`. Patterns like `"use client"`, React Server Components, and `next/font` **do not apply** in the same way. Gains come from **bundle size**, **code splitting**, **fewer dependencies**, and **lighter client work** on each page.

---

## 1. Main bottlenecks (after images)

| Area | Impact | Notes |
|------|--------|--------|
| **Monolithic `app/company-data.ts`** | High | ~2.3k lines of arrays imported from many components. Any page that imports this module pays to **parse/evaluate** every export webpack keeps in that chunk. **Next step:** split into `app/data/*.ts` modules (e.g. `blog-data.ts`, `work-data.ts`) and re-export from a thin `company-data.ts` so each route pulls only what it needs. |
| **Dual UI stacks** | High | **Material UI v4 + v5 (@mui) + Emotion + styled-components** together increase JS and style injection. Long-term: converge on one system; short-term: avoid barrel icon imports. |
| **Redux (unused in UI)** | Medium | `Provider` wrapped the whole app but **no page** used the store. **Removed `Provider` from `_app`** so the store is not created on every load/navigation (runtime win). `react-redux` / `@reduxjs/toolkit` stay in `package.json` only so `app/store.ts` and `features/` keep type-checking; they should **not** ship in the client bundle if nothing imports them from pages. |
| **Homepage sections** | Medium | Below-the-fold chunks are already **`next/dynamic`** (`home-page.tsx`) — good. Hero + nav stay eager (needed for LCP). |
| **Blog grid** | Low–medium | Large list + MUI icons + `next/image`. Pagination limits DOM; **avoid duplicate** `blogItems` imports in `all-blog.tsx` (fixed). |
| **Fonts** | Medium | Google Fonts from `_document.tsx` add **render-blocking** CSS. Next 11 has no `next/font`; options: subset fewer weights, self-host WOFF2, or upgrade Next later. |
| **Lighthouse TBT** | — | Main-thread cost from React hydration + MUI + styled-components on each page. Reducing JS above is the lever. |

---

## 2. Client-side navigation speed (`router.prefetch`)

Next.js **Link** prefetches in **production** when links enter the viewport; **development** is often slower because prefetch is limited.

This repo adds:

- **`PrefetchCoreRoutes`** (`components/layout/prefetch-core-routes.tsx`) — after `router.isReady`, schedules **`router.prefetch()`** for main static routes during **`requestIdleCallback`** (staggered), so page JS is usually **already cached** before the user clicks. Skips when **Data Saver** (`navigator.connection.saveData`) is on.
- **Main nav + mobile menu** — explicit **`prefetch={true}`**, **`passHref`** + **`<a onMouseEnter={() => router.prefetch(...)}>`** so hovering a link warms the cache **before** click.
- **GET STARTED** — **`Link`** to `/contact` instead of **`router.push`**, so Next can prefetch like other nav links.

Measure navigations with a **production** build (`npm run build` + `npm run start` or static `deploy/`); dev mode will still feel heavier.

---

## 3. Other changes (earlier pass)

| File | Change |
|------|--------|
| `pages/_app.tsx` | Removed `react-redux` `Provider` and `store` import; mounts `PrefetchCoreRoutes`. |
| `package.json` | Added `webpack-bundle-analyzer`, script `analyze`. (Redux packages remain for unused `store` / `features` typings; **not** mounted in `_app`.) |
| `next.config.js` | `productionBrowserSourceMaps: false`; optional `BundleAnalyzerPlugin` when `ANALYZE=true`. |
| `scripts/run-analyze-build.cjs` | Runs production build with analysis enabled. |
| `.gitignore` | `/analyze/` |
| `components/blog-page/all-blog.tsx` | Dropped extra `blogItems` import; safe **empty state** when filters match nothing. |

---

## 4. Broken spinner imports (your 500 error)

If `_app.tsx` still contains:

```tsx
import PageRouteLoader from "../components/layout/page-route-loader";
import { PageTransition } from "../components/layout/page-transition";
```

but those files were deleted, webpack fails with **Module not found**. **Remove** those imports and any `<PageRouteLoader />` / `<PageTransition>` wrappers. The workspace `_app.tsx` no longer references them.

---

## 5. Bundle analysis

```bash
npm install
npm run analyze
```

Opens static reports under **`analyze/client.html`** and **`analyze/server.html`**. Use them to find the largest chunks (often MUI, `company-data`, or shared layout code).

---

## 6. Lighthouse (typical weak points here)

- **LCP**: Hero / first image; keep `priority` / preload only on the true LCP asset.
- **TBT / JS**: MUI + Emotion + styled-components + large data modules.
- **CLS**: Reserve space for images and carousels (you already use `next/image` with layout in many places).

---

## 7. Next optimizations (highest ROI)

1. **Split `company-data.ts`** into domain files + targeted imports (biggest JS win for blog/work/service pages).
2. **Icon strategy**: import **specific** icons only (you mostly do); avoid `@material-ui/icons` barrels anywhere.
3. **Upgrade path**: Next 13+ App Router + `next/font` + server components would be the largest architectural win—planned migration, not a same-day tweak.
4. **Optional**: `eslint.ignoreDuringBuilds: true` in `next.config.js` if ESLint blocks CI (does not affect runtime performance).

---

## 8. Remaining risks

- **`app/store.ts` / `features/`** remain for reference; they are **not** in the client bundle if unused. Re-add Redux only if you wire real state.
- **`npm run analyze`** runs a full production build; reports are large HTML files—do not deploy them to static hosting (ignored in `.gitignore`).
