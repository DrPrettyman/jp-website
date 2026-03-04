import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

// Static routes for sitemap generation
const staticRoutes = [
  '/academic',
  '/professional',
  '/projects',
  '/projects/digraph-explorer',
  '/projects/prettymath',
  '/projects/wine-exports-viz',
  '/projects/mastermind',
  '/projects/fraud-detection',
  '/projects/jobmaster',
  '/projects/macaroni',
  '/projects/early-warning-signals',
  '/projects/ps-indicator',
  '/projects/multidim-ews',
  '/projects/ps-robustness',
  '/projects/adaptive-mesh',
  '/projects/steam-market-gap',
  '/projects/jobsearch-agent',
  '/blog',
  '/travels',
  '/travel/vanlife',
  '/freelance',
  '/tutor',
]

// Dynamic blog routes
const blogPosts = [
  'getting-started-with-react',
  'tailwind-css-intro',
  'data-visualization-react',
]

const blogTags = [
  'react',
  'javascript',
  'frontend',
  'tailwind',
  'css',
  'data-visualization',
  'recharts',
]

const dynamicRoutes = [
  ...blogPosts.map(id => `/blog/${id}`),
  ...blogTags.map(tag => `/blog/tag/${tag}`),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    Sitemap({
      hostname: 'https://joshua.prettyman.me',
      dynamicRoutes: [...staticRoutes, ...dynamicRoutes],
      outDir: 'build/client',
      generateRobotsTxt: true,
      exclude: [
        '/google380aa23fdeb1fbc1',
        '/documents/comtrade_wine_2023',
      ],
      robots: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/documents/' },
      ],
      readable: true,
    }),
  ],
  assetsInclude: ['**/*.shtml'],
  base: '/'
})
