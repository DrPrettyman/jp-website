# SEO Audit & Remediation Plan

**Site:** joshua.prettyman.me
**Date:** 2026-03-03
**Stack:** React 18, Vite, React Router v7 (library mode), Tailwind CSS

---

## Overview

This document catalogues every SEO issue found during the audit and provides a concrete fix for each. Issues are grouped into phases ordered by impact-to-effort ratio. Each phase can be shipped independently.

---

## Phase 1 — Quick Wins (1-2 hours)

These are trivial fixes with immediate impact.

### 1.1 Add `/tutor` to the sitemap

The `/tutor` route exists in `src/App.jsx` but is missing from the sitemap config. This means search engines won't discover it through the sitemap.

**File:** `vite.config.js`

Add `'/tutor'` to the `staticRoutes` array (after `'/freelance'`).

---

### 1.2 Fix heading hierarchy — ContentBlock renders `<h1>` for every section

`src/components/ContentBlock.jsx` renders an `<h1>` on lines 13 and 34. Every page that uses ContentBlock (Work, Education, project pages, etc.) ends up with multiple `<h1>` tags. Search engines expect exactly one `<h1>` per page.

**File:** `src/components/ContentBlock.jsx`

Change both `<h1>` tags to `<h2>`:
- Line 13: `<h1 className="text-4xl ...">` → `<h2 className="text-4xl ...">`
- Line 34: `<h1 className="text-4xl ...">` → `<h2 className="text-4xl ...">`

Then, pages that use ContentBlock as a top-level title (like project detail pages that only have one ContentBlock) should add an explicit `<h1>` in the page component itself if they don't already have one. Most project pages pass their title via ContentBlock, so those are covered — the ContentBlock `<h2>` will serve as the visible heading while the page `<title>` (added in Phase 2) handles the SEO title.

---

### 1.3 Add an `<h1>` to the Home page

`src/pages/Home.jsx` has no `<h1>` at all. The "Hi, my name is Joshua" text is wrapped in `<span>` tags (lines 24-29).

**File:** `src/pages/Home.jsx`

Wrap the greeting in an `<h1>`:
```jsx
<h1 className="text-4xl font-bold">
  Hi, <span className="text-sm sm:text-lg">my name is Joshua.</span>
</h1>
```

Or use a visually-hidden `<h1>` if you don't want it to affect the layout:
```jsx
<h1 className="sr-only">Joshua Prettyman — Data Scientist & Mathematician</h1>
```

---

### 1.4 Convert internal `<a>` tags to React Router `<Link>`

`src/pages/Home.jsx` uses plain `<a href="...">` for internal links on lines 60, 74, and 95. This causes full page reloads instead of client-side navigation, hurting engagement metrics.

**File:** `src/pages/Home.jsx`

1. Add import: `import { Link } from 'react-router-dom'`
2. Replace:
   - Line 60: `<a href="/professional" ...>` → `<Link to="/professional" ...>`
   - Line 74: `<a href="/academic" ...>` → `<Link to="/academic" ...>`
   - Line 95: `<a href="/professional#tech-stack" ...>` → `<Link to="/professional#tech-stack" ...>`
3. Change the closing tags to `</Link>` accordingly.

Also check `src/components/ProjectCard.jsx` — it uses `<a>` for all links. Internal links (those starting with `/`) should use `<Link>` instead.

---

### 1.5 Add a 404 catch-all route

There is no fallback route. Visiting an invalid URL shows a blank page.

**File:** `src/App.jsx`

Add a catch-all route at the end of the `<Routes>` block:
```jsx
<Route path="*" element={<NotFound />} />
```

Create `src/pages/NotFound.jsx`:
```jsx
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <Layout>
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Page not found.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800">Go home</Link>
    </div>
  </Layout>
)

export default NotFound
```

---

### 1.6 Fix headshot alt text

`src/pages/Home.jsx` line 16 has `alt="Your profile"`. This should be descriptive.

**File:** `src/pages/Home.jsx`

Change `alt="Your profile"` to `alt="Joshua Prettyman"`.

---

## Phase 2 — Per-Page Titles & Meta Descriptions (2-3 hours)

This is the highest-impact SEO change after Phase 1. Every page currently shows the same `<title>Joshua Prettyman</title>` in search results with no description.

### 2.1 Install react-helmet-async

```bash
npm install react-helmet-async
```

### 2.2 Add HelmetProvider to the app root

**File:** `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
```

### 2.3 Create a reusable SEO component

Create `src/components/SEO.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'

const SEO = ({
  title,
  description,
  path,
  type = 'website',
}) => {
  const siteTitle = 'Joshua Prettyman'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const url = path ? `https://joshua.prettyman.me${path}` : 'https://joshua.prettyman.me'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
```

### 2.4 Add SEO component to every page

Add `<SEO>` as the first child inside each page's `<Layout>`. Here are the recommended titles and descriptions for each page:

| Page | File | title | description |
|------|------|-------|-------------|
| Home | `Home.jsx` | *(empty — just "Joshua Prettyman")* | "Data scientist with a Ph.D. in mathematics. Software development, machine learning, and data analysis. Based in Malaga, Spain." |
| Academic CV | `Education.jsx` | "Academic Background" | "Ph.D. in Mathematics from the University of Reading, MRes from Imperial College London, MA from the University of Edinburgh. Publications and research." |
| Professional CV | `Work.jsx` | "Professional Experience" | "Data scientist and software developer. Experience at Blink SEO, the National Physical Laboratory, and university teaching." |
| Projects | `Projects.jsx` | "Projects" | "Portfolio of data science, machine learning, and software development projects." |
| Blog | `Blog.jsx` | "Blog" | "Articles on data science, React, and software development." |
| Freelance | `Freelance.jsx` | "Freelance Data & Dev Services" | "Freelance data science and software development services. Python, SQL, machine learning, and web development." |
| Tutor | `Tutor.jsx` | "Private Maths Tuition" | "Private maths tuition in English near Cartama, Malaga. Ph.D. in Mathematics, experienced teacher. GCSEs, A-levels, IB." |
| Travels | `Travels.jsx` | "Travels" | "Travel map and stories from travelling Europe in a campervan." |

For each project detail page, use the project name as the title and a one-sentence summary as the description.

For blog post pages (`BlogPost.jsx`), use the post title and excerpt dynamically:
```jsx
<SEO title={post.title} description={post.excerpt} path={`/blog/${post.id}`} type="article" />
```

---

## Phase 3 — Structured Data / JSON-LD (1-2 hours)

Structured data helps search engines understand what the site is and display rich results.

### 3.1 Person schema on the Home page

Add to `src/pages/Home.jsx` inside the `<Helmet>` (or via a script tag):

```jsx
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Joshua Prettyman",
      "jobTitle": "Data Scientist",
      "url": "https://joshua.prettyman.me",
      "sameAs": [
        "https://www.linkedin.com/in/prettyman/",
        "https://github.com/DrPrettyman"
      ],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "University of Reading" },
        { "@type": "CollegeOrUniversity", "name": "Imperial College London" },
        { "@type": "CollegeOrUniversity", "name": "University of Edinburgh" }
      ],
      "knowsAbout": ["Data Science", "Machine Learning", "Mathematics", "Python", "SQL"]
    })}
  </script>
</Helmet>
```

### 3.2 Article schema on blog posts

Add to `BlogPost.jsx` when a post is loaded:

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Joshua Prettyman"
    }
  })}
</script>
```

### 3.3 Service schema on the Tutor page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Private Maths Tuition",
  "provider": {
    "@type": "Person",
    "name": "Joshua Prettyman"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Cartama, Malaga, Spain"
  },
  "description": "Private maths tuition in English for all levels.",
  "offers": {
    "@type": "Offer",
    "price": "30",
    "priceCurrency": "EUR"
  }
}
```

---

## Phase 4 — Image Optimisation (2-3 hours)

Images account for ~9 MB across 258 files with no optimisation.

### 4.1 Add `loading="lazy"` to all images below the fold

This is the single easiest performance win. Add `loading="lazy"` to every `<img>` tag that isn't visible on initial page load.

**Key files to update:**
- `src/components/ProjectCard.jsx` — project thumbnail images
- `src/pages/BlogPost.jsx` — blog cover images
- `src/components/CVEntry.jsx` — company logo images
- All project detail pages — screenshot images
- `src/components/TravelMap.jsx` — travel photo images

**Do NOT lazy-load:**
- The headshot in `src/components/Header.jsx` (always visible)
- The headshot in `src/pages/Home.jsx` (above the fold)

### 4.2 Add explicit width and height to images

This prevents Cumulative Layout Shift (CLS). Where images have a known display size, add `width` and `height` attributes. For example, the header headshot is always 40x40:

```jsx
<img src="/images/headshot.jpeg" alt="Joshua Prettyman" className="h-10 w-10 rounded-full" width={40} height={40} />
```

### 4.3 Convert key images to WebP

Convert the most-loaded images to WebP format for smaller file sizes. Priority targets:

1. `/public/images/headshot.jpeg` — loaded on every page
2. Company logos in `/public/company_logo/`
3. Project screenshots in `/public/images/*/`

Use a tool like `cwebp` or an online converter. Keep the JPEG originals as fallbacks if needed, but modern browsers all support WebP.

### 4.4 Consider a Vite image optimisation plugin

For automated build-time compression, consider adding `vite-plugin-imagemin`:

```bash
npm install -D vite-plugin-imagemin
```

This will compress all images during `npm run build` without manual conversion.

---

## Phase 5 — Semantic HTML Improvements (1 hour)

### 5.1 Add `<section>` elements

Replace generic `<div>` containers with `<section>` where content blocks represent distinct thematic sections. The `ContentBlock` component is a natural candidate:

**File:** `src/components/ContentBlock.jsx`

Change the outer `<div>` to `<section>`.

### 5.2 Add ARIA attributes to interactive elements

**File:** `src/components/Header.jsx`

- Mobile menu button (line 227): Add `aria-label="Toggle menu"` and `aria-expanded={mobileMenuOpen}`
- "More" dropdown button (line 128): Add `aria-label="More pages"` and `aria-expanded={moreMenuOpen}` and `aria-haspopup="true"`
- Add `aria-current="page"` to active navigation links (where `isActive(path)` is true)

### 5.3 Wrap blog post previews in `<article>`

**File:** `src/pages/Blog.jsx`

If blog post cards are rendered in a list, wrap each one in an `<article>` element.

---

## Phase 6 — Prerendering / SSG (half day)

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

## Phase 7 — Code Splitting (30 minutes, after Phase 6)

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

## Phase 8 — Miscellaneous Cleanup

### 8.1 Remove the `/cv` redirect route

`src/App.jsx` lines 4-9 define a `CVRedirect` component that uses `window.location.href` to redirect to the PDF. The Header already links directly to the PDF file (line 85). The redirect route is redundant — remove it unless external links point to `/cv`.

### 8.2 Add `rel="noopener noreferrer"` audit

Verify all external links have `rel="noopener noreferrer"`. The Header already does this correctly, but check Footer and other pages.

### 8.3 Blog post dates

Blog post dates are hardcoded as strings ("June 15, 2023"). If/when the blog scales, consider using ISO 8601 dates for both display formatting and structured data.

---

## Summary

| Phase | Description | Effort | Impact |
|-------|-------------|--------|--------|
| 1 | Quick wins (sitemap, headings, links, 404) | 1-2 hrs | High |
| 2 | Per-page titles, descriptions, OG tags | 2-3 hrs | High |
| 3 | JSON-LD structured data | 1-2 hrs | Medium |
| 4 | Image optimisation (lazy load, WebP, dimensions) | 2-3 hrs | Medium |
| 5 | Semantic HTML & ARIA | 1 hr | Low-Medium |
| 6 | Prerendering via React Router v7 framework mode | 4-6 hrs | Very High |
| 7 | Code splitting | 30 min | Low |
| 8 | Miscellaneous cleanup | 30 min | Low |

**Recommended order:** Phase 1 → Phase 2 → Phase 4 (quick image wins) → Phase 6 → everything else.

Phases 1-5 can be done without any architectural changes. Phase 6 is a larger migration but your existing React Router v7 dependency makes it the natural path to prerendered HTML.
