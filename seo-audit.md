# SEO Audit & Remediation Plan

**Site:** joshua.prettyman.me
**Date:** 2026-03-03
**Stack:** React 18, Vite, React Router v7 (framework mode), Tailwind CSS

---

## Overview

This document catalogues every SEO issue found during the audit and provides a concrete fix for each. Issues are grouped into phases ordered by impact-to-effort ratio. Each phase can be shipped independently.

---

## Phase 1 — Quick Wins ✅ DONE

### 1.1 ✅ Add `/tutor` to the sitemap

Added `'/tutor'` to the `staticRoutes` array in `vite.config.js`.

### 1.2 ✅ Fix heading hierarchy — ContentBlock renders `<h1>` for every section

Changed both `<h1>` tags to `<h2>` in `src/components/ContentBlock.jsx`.

### 1.3 ✅ Add an `<h1>` to the Home page

Wrapped the "Hi, my name is Joshua" greeting in an `<h1>` in `src/pages/Home.jsx`.

### 1.4 ✅ Convert internal `<a>` tags to React Router `<Link>`

- Converted all three internal `<a>` links in `src/pages/Home.jsx` to `<Link>`.
- Refactored `src/components/ProjectCard.jsx` with a `LinkWrapper` that uses `<Link>` for internal paths and `<a>` for external URLs.

### 1.5 ✅ Add a 404 catch-all route

Created `src/pages/NotFound.jsx` and added `<Route path="*" element={<NotFound />} />` to `src/App.jsx`.

### 1.6 ✅ Fix headshot alt text

Changed `alt="Your profile"` to `alt="Joshua Prettyman"` in `src/pages/Home.jsx`. Also updated header headshot alt text.

---

## Phase 2 — Per-Page Titles & Meta Descriptions ✅ DONE

### 2.1 ✅ Install react-helmet-async

Installed and added `HelmetProvider` to `src/main.jsx`.

### 2.2 ✅ Create a reusable SEO component

Created `src/components/SEO.jsx` with `<title>`, `<meta description>`, `<link rel="canonical">`, Open Graph, and Twitter Card tags.

### 2.3 ✅ Add SEO component to every page

Added `<SEO>` to all pages with the following titles/descriptions:

| Page | title | description |
|------|-------|-------------|
| Home | *(just "Joshua Prettyman")* | Data scientist with a Ph.D. in mathematics... |
| Academic CV | Academic Background | Ph.D. in Mathematics from the University of Reading... |
| Professional CV | Professional Experience | Data scientist and software developer... |
| Projects | Projects | Portfolio of data science, machine learning... |
| Blog | Blog | Articles on data science, React... |
| Freelance | Freelance Data & Dev Services | Freelance data science and software development... |
| Tutor | Private Maths Tuition | Private maths tuition in English near Cartama... |
| Travels | Travels | Travel map and stories from travelling Europe... |
| BlogPost | *(dynamic: post.title)* | *(dynamic: post.excerpt)* |
| NotFound | 404 — Page Not Found | This page does not exist. |

All 14 project detail pages also have SEO components with project-specific titles and descriptions.

---

## Phase 3 — Structured Data / JSON-LD ✅ DONE

### 3.1 ✅ Person schema on the Home page

Added `Person` JSON-LD to `src/pages/Home.jsx` via `<Helmet>`.

### 3.2 ✅ Article schema on blog posts

Added `Article` JSON-LD to `src/pages/BlogPost.jsx` via `<Helmet>`.

### 3.3 ✅ Service schema on the Tutor page

Added `Service` JSON-LD to `src/pages/Tutor.jsx` via `<Helmet>`.

---

## Phase 4 — Image Optimisation ✅ DONE

### 4.1 ✅ Add `loading="lazy"` to all images below the fold

Added `loading="lazy"` to:
- `src/components/ProjectCard.jsx`
- `src/components/CVEntry.jsx`
- `src/components/BlogPost.jsx` (component)
- `src/pages/BlogPost.jsx` (page)
- `src/components/TravelCard.jsx`
- `src/pages/Tutor.jsx` (banner images)

Header and Home headshots correctly left without lazy loading.

### 4.2 ✅ Add explicit width and height to images

Added `width={40} height={40}` to the header headshot in `src/components/Header.jsx`.

### 4.3 ✅ Convert key images to WebP

Converted all key images to WebP using `cwebp -q 85`. Updated all references across:
- `src/components/Header.jsx` and `src/pages/Home.jsx` (headshot)
- `src/assets/cv-academic/manifest.json` (3 logos)
- `src/assets/cv-professional/manifest.json` (8 logos)
- `src/assets/cv-academic/publications.json` (6 logos)
- `src/assets/projects.json` (14 project thumbnails, excluding .svg)
- All project detail JSX pages (FraudDetection, SteamMarketGap, PSIndicator, PSRobustness, EarlyWarningSignals, MultidimEWS, AdaptiveMesh, DigraphExplorer)
- `src/pages/Tutor.jsx` (2 banner images)
- `src/pages/Travels.jsx` (vanlife image)

### 4.4 ⬜ Consider a Vite image optimisation plugin

Optional: For automated build-time compression, consider adding `vite-plugin-imagemin`.

---

## Phase 5 — Semantic HTML Improvements ✅ DONE

### 5.1 ✅ Add `<section>` elements

Changed the outer `<div>` to `<section>` in `src/components/ContentBlock.jsx`.

### 5.2 ✅ Add ARIA attributes to interactive elements

Added to `src/components/Header.jsx`:
- Mobile menu button: `aria-label="Toggle menu"` and `aria-expanded={mobileMenuOpen}`
- "More" dropdown button: `aria-label="More pages"`, `aria-expanded={moreMenuOpen}`, `aria-haspopup="true"`

Added `aria-current={isActive(path) ? 'page' : undefined}` to all navigation `<Link>` elements (desktop nav, dropdown menu, and mobile menu).

### 5.3 ✅ Wrap blog post previews in `<article>`

Changed the outer `<div>` to `<article>` in `src/components/BlogPost.jsx`.

---

## Phase 6 — Prerendering / SSG ✅ DONE

Migrated from React Router v7 library mode (client-side SPA) to framework mode with static prerendering at build time. All 22 static routes are now prerendered to full HTML at build time.

### 6.1 ✅ Installed framework mode dependencies

Added `@react-router/dev`, `@react-router/node`, upgraded `react-router-dom` to `^7.13.1`.

### 6.2 ✅ Created framework mode files

- `react-router.config.ts` — Framework config with `ssr: false` and 22 prerender routes
- `src/root.jsx` — HTML shell (migrated from `index.html`), with `<Meta>` and `<Links>` for framework-managed head tags
- `src/entry.client.jsx` — Client hydration entry with `HydratedRouter`
- `src/routes.ts` — All route definitions migrated from `App.jsx`
- `src/pages/CVRedirect.jsx` — Extracted from inline component in `App.jsx`

### 6.3 ✅ Updated build config

- `vite.config.js`: Replaced `@vitejs/plugin-react` with `reactRouter()` plugin (kept `vite-plugin-sitemap`)
- `package.json` scripts: `"dev": "react-router dev"`, `"build": "react-router build"`

### 6.4 ✅ Fixed SSR compatibility for browser-only packages

Several packages access `window` or `document` at module level, which breaks Node.js prerendering:

- **animated-network-background**: Changed from `React.lazy` to client-only dynamic import via `useEffect` + state in `src/components/Layout.jsx`. This was the root cause of a multi-page prerender 500 error (the module-level `document` access corrupted server state between prerender passes).
- **Leaflet (react-leaflet)**: Lazy-loaded `TravelMap` in `src/pages/travel/Vanlife.jsx`
- **prettymath-games**: Lazy-loaded game components in `src/pages/projects/EducationalGames.jsx`
- **react-katex**: Changed named ESM imports to default import + destructuring in 4 project pages (PSRobustness, MultidimEWS, AdaptiveMesh, PSIndicator)

### 6.5 ✅ Migrated from react-helmet-async to React Router meta exports

Replaced `react-helmet-async` with React Router's native `meta` route exports, which are automatically rendered into the prerendered HTML:

- Created `src/utils/seo.js` with `generateMeta()` helper that produces title, description, canonical, OG, and Twitter meta descriptors
- Added `export const meta` to all 24 route modules
- Replaced `<Helmet>` JSON-LD blocks with inline `<script type="application/ld+json" dangerouslySetInnerHTML>` (Home, BlogPost, Tutor)
- Removed `HelmetProvider` from `src/root.jsx`
- Uninstalled `react-helmet-async`

### 6.6 ✅ Removed obsolete files

Deleted files superseded by framework mode: `index.html`, `src/App.jsx`, `src/main.jsx`, `src/components/SEO.jsx`

### 6.7 What this achieves

`npm run build` now outputs a full HTML file for every prerendered route. Each file contains:
- Complete rendered page content (headings, text, images)
- SEO meta tags (`<title>`, description, canonical, OG, Twitter) baked into `<head>`
- JSON-LD structured data where applicable
- Automatic code splitting per route (Phase 7 is now free)

Crawlers see fully-rendered HTML without needing to execute JavaScript. Social media scrapers (Facebook, LinkedIn, Slack) will now correctly display link previews.

---

## Phase 7 — Code Splitting ✅ DONE (automatic)

React Router v7 framework mode automatically code-splits per route. Each page's JS is only loaded when that route is visited. No manual configuration needed.

---

## Phase 8 — Miscellaneous Cleanup ⬜ TODO

### 8.1 Consider removing the `/cv` redirect route

`src/pages/CVRedirect.jsx` uses `window.location.href` to redirect to the PDF. The Header already links directly to the PDF file. The redirect route may be redundant — remove it unless external links point to `/cv`.

### 8.2 Add `rel="noopener noreferrer"` audit

Verify all external links have `rel="noopener noreferrer"`. The Header already does this correctly, but check Footer and other pages.

### 8.3 Blog post dates

Blog post dates are hardcoded as strings ("June 15, 2023"). If/when the blog scales, consider using ISO 8601 dates for both display formatting and structured data.

---

## Summary

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Quick wins (sitemap, headings, links, 404) | ✅ Done |
| 2 | Per-page titles, descriptions, OG tags | ✅ Done |
| 3 | JSON-LD structured data | ✅ Done |
| 4 | Image optimisation (lazy load, WebP, dimensions) | ✅ Done |
| 5 | Semantic HTML & ARIA | ✅ Done |
| 6 | Prerendering via React Router v7 framework mode | ✅ Done |
| 7 | Code splitting (automatic with framework mode) | ✅ Done |
| 8 | Miscellaneous cleanup | ⬜ Not started |

### What's left

- **4.4** Optional: `vite-plugin-imagemin` for build-time compression
- **Phase 8** Miscellaneous cleanup (CVRedirect removal, rel audit, blog dates)
