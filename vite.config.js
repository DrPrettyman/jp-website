import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// Static routes from App.jsx (excluding '/' since plugin auto-adds from index.html)
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
  '/blog',
  '/travels',
  '/travel/vanlife',
  '/freelance',
]

// Dynamic blog routes (blog post IDs from Blog.jsx)
const blogPosts = [
  'getting-started-with-react',
  'tailwind-css-intro',
  'data-visualization-react',
]

// Blog tags from the posts
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
    react(),
    Sitemap({
      hostname: 'https://joshua.prettyman.me',
      dynamicRoutes: [...staticRoutes, ...dynamicRoutes],
      outDir: 'dist',
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
