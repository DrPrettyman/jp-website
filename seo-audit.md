# SEO Audit & Remediation Plan

**Site:** joshua.prettyman.me
**Date:** 2026-03-03
**Stack:** React 18, Vite, React Router v7 (library mode), Tailwind CSS

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

## Phase 4 — Image Optimisation (partially done)

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

### 4.3 ⬜ Convert key images to WebP

Convert the most-loaded images to WebP format for smaller file sizes. Priority targets:

1. `/public/images/headshot.jpeg` — loaded on every page
2. Company logos in `/public/company_logo/`
3. Project screenshots in `/public/images/*/`

Use a tool like `cwebp` or an online converter. Keep the JPEG originals as fallbacks if needed, but modern browsers all support WebP.

### 4.4 ⬜ Consider a Vite image optimisation plugin

For automated build-time compression, consider adding `vite-plugin-imagemin`:

```bash
npm install -D vite-plugin-imagemin
```

This will compress all images during `npm run build` without manual conversion.

---

## Phase 5 — Semantic HTML Improvements ✅ DONE

### 5.1 ✅ Add `<section>` elements

Changed the outer `<div>` to `<section>` in `src/components/ContentBlock.jsx`.

### 5.2 ✅ Add ARIA attributes to interactive elements

Added to `src/components/Header.jsx`:
- Mobile menu button: `aria-label="Toggle menu"` and `aria-expanded={mobileMenuOpen}`
- "More" dropdown button: `aria-label="More pages"`, `aria-expanded={moreMenuOpen}`, `aria-haspopup="true"`

**Still TODO:** Add `aria-current="page"` to active navigation links (where `isActive(path)` is true).

### 5.3 ✅ Wrap blog post previews in `<article>`

Changed the outer `<div>` to `<article>` in `src/components/BlogPost.jsx`.

---

## Phase 6 — Prerendering / SSG ⬜ TODO

Currently the site is a pure client-side SPA. Googlebot handles this fine (it runs an evergreen Chromium renderer), so your content will be indexed. The main limitations of CSR are: (1) social media scrapers (Facebook, LinkedIn, Slack, etc.) don't execute JS, so link previews will be blank; (2) Bing and DuckDuckGo have less reliable JS rendering; (3) Google's "second wave" indexing adds a small delay. For a ~30-page portfolio site these are minor, but prerendering eliminates them entirely and is the cleanest long-term setup.

### Recommended approach: React Router v7 Framework Mode with prerendering

You are already on `react-router-dom@^7.1.5`. React Router v7 has a "Framework Mode" that supports static prerendering at build time — no runtime server needed. This is the natural upgrade path.

### 6.1 Install framework mode dependencies

```bash
npm install -D @react-router/dev
npm install @react-router/node
```

### 6.2 Update Vite config

**File:** `vite.config.js`

Replace `@vitejs/plugin-react` with `@react-router/dev/vite`:

```js
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  base: '/'
});
```

Note: The sitemap plugin (`vite-plugin-sitemap`) will need to be re-evaluated. React Router's prerender output may make it possible to generate the sitemap differently, or you can keep the plugin.

### 6.3 Create React Router config

Create `react-router.config.ts`:

```ts
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  prerender: [
    "/",
    "/academic",
    "/professional",
    "/projects",
    "/projects/digraph-explorer",
    "/projects/prettymath",
    "/projects/wine-exports-viz",
    "/projects/mastermind",
    "/projects/fraud-detection",
    "/projects/jobmaster",
    "/projects/macaroni",
    "/projects/early-warning-signals",
    "/projects/ps-indicator",
    "/projects/multidim-ews",
    "/projects/ps-robustness",
    "/projects/adaptive-mesh",
    "/projects/steam-market-gap",
    "/projects/jobsearch-agent",
    "/blog",
    "/blog/getting-started-with-react",
    "/blog/tailwind-css-intro",
    "/blog/data-visualization-react",
    "/travels",
    "/travel/vanlife",
    "/freelance",
    "/tutor",
  ],
} satisfies Config;
```

### 6.4 Create root layout

Move the content of `index.html` into `src/root.tsx`:

```tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: `
          const savedMode = localStorage.getItem('darkMode');
          if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          }
        `}} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
```

### 6.5 Create client entry point

Create `src/entry.client.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import "./styles/globals.css";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
);
```

### 6.6 Create routes file

Create `src/routes.ts`:

```ts
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./pages/Home.jsx"),
  route("/academic", "./pages/Education.jsx"),
  route("/professional", "./pages/Work.jsx"),
  route("/projects", "./pages/Projects.jsx"),
  route("/projects/digraph-explorer", "./pages/projects/DigraphExplorer.jsx"),
  route("/projects/prettymath", "./pages/projects/EducationalGames.jsx"),
  // ... all other project routes
  route("/blog", "./pages/Blog.jsx"),
  route("/blog/:id", "./pages/BlogPost.jsx"),
  route("/blog/tag/:tag", "./pages/Blog.jsx"),
  route("/travels", "./pages/Travels.jsx"),
  route("/travel/vanlife", "./pages/travel/Vanlife.jsx"),
  route("/freelance", "./pages/Freelance.jsx"),
  route("/tutor", "./pages/Tutor.jsx"),
  route("*?", "./pages/NotFound.jsx"),
] satisfies RouteConfig;
```

### 6.7 Incremental migration strategy

You don't have to migrate all routes at once. Start with a catchall that renders your existing `App` component, then migrate routes one at a time:

1. Create `src/catchall.tsx` that renders your existing `<App />`
2. Add `route("*?", "./catchall.tsx")` as the only route in `routes.ts`
3. Verify everything works
4. Move routes out of `App.jsx` into `routes.ts` one by one
5. Remove the catchall when all routes are migrated

### 6.8 Update build scripts

**File:** `package.json`

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "preview": "vite preview"
  }
}
```

### 6.9 What this achieves

After prerendering, `npm run build` will output a full HTML file for every route listed in the prerender config. Crawlers will see fully-rendered HTML with all content, headings, meta tags, and structured data — without needing to execute JavaScript.

---

## Phase 7 — Code Splitting ⬜ TODO (30 minutes, after Phase 6)

If you go the framework mode route (Phase 6), code splitting happens automatically per route. If you stay with the current SPA setup, add manual code splitting:

**File:** `src/App.jsx`

```jsx
import { lazy, Suspense } from 'react'

const Education = lazy(() => import('./pages/Education'))
const Work = lazy(() => import('./pages/Work'))
// ... etc

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academic" element={<Education />} />
          {/* ... */}
        </Routes>
      </Suspense>
    </Router>
  )
}
```

This reduces the initial JS bundle size since pages are only loaded when visited.

---

## Phase 8 — Miscellaneous Cleanup ⬜ TODO

### 8.1 Remove the `/cv` redirect route

`src/App.jsx` lines 4-9 define a `CVRedirect` component that uses `window.location.href` to redirect to the PDF. The Header already links directly to the PDF file (line 85). The redirect route is redundant — remove it unless external links point to `/cv`.

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
| 4 | Image optimisation (lazy load, dimensions) | ✅ Partially done (WebP conversion remaining) |
| 5 | Semantic HTML & ARIA | ✅ Done (aria-current remaining) |
| 6 | Prerendering via React Router v7 framework mode | ⬜ Not started |
| 7 | Code splitting | ⬜ Not started |
| 8 | Miscellaneous cleanup | ⬜ Not started |

### What's left

- **4.3** Convert key images to WebP (manual or via build plugin)
- **4.4** Consider `vite-plugin-imagemin` for build-time compression
- **5.2** Add `aria-current="page"` to active nav links in Header
- **Phase 6** Migrate to React Router v7 framework mode for prerendering (largest remaining item)
- **Phase 7** Code splitting (automatic if Phase 6 is done, manual otherwise)
- **Phase 8** Miscellaneous cleanup (CVRedirect removal, rel audit, blog dates)
