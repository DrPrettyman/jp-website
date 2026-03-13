import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { Globe } from 'lucide-react';

export const meta = () => generateMeta({ title: "Private Scottish Tour Website", description: "A content-managed tour website built with Next.js and Sanity, with structured data SEO, location-based content strategy, and Resend email booking.", path: "/projects/private-scottish-tour" });

const CodeBlock = ({ children, title }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    {title && (
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        {title}
      </div>
    )}
    <pre className="bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto text-sm">
      <code className="text-gray-800 dark:text-gray-200">{children}</code>
    </pre>
  </div>
);

const PrivateScottishTourProject = () => {
  return (
    <Layout>
      <ContentBlock title="Private Scottish Tour" icon={Globe} maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Brief</h2>

            <p className="mb-4 text-justify">
              A friend of mine runs a private guiding business in Scotland — small groups, bespoke itineraries, the kind
              of experience that doesn't exist on a coach tour. He'd built up a client base on word of mouth, but had
              no real web presence. The goal was a site that could explain what he does, showcase destinations and
              itineraries, and let potential customers get in touch.
            </p>

            <p className="mb-8 text-justify">
              The harder problem was discoverability. People searching for a private Scottish tour search in a lot of
              different ways: by region, by landmark, by experience type. A site with a single "destinations" page
              wasn't going to cut it. The content strategy needed to match how people actually search.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/scottish-tour-homepage.webp"
                alt="Private Scottish Tour homepage"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Content Management with Sanity</h2>

            <p className="mb-4 text-justify">
              The content would change: new itineraries added each season, blog posts, updated destination write-ups.
              And the client needed to be able to manage it without touching code. A headless CMS was the obvious
              call, and Sanity was the right fit — the Studio UI is clean enough that a non-technical user can actually
              use it, and the GROQ query language is flexible enough to do interesting things on the frontend.
            </p>

            <p className="mb-4 text-justify">
              The schema ended up with 13 document types. The main content hierarchy is destinations, attractions
              (nested under destinations), and itineraries (which can reference both). Each destination covers a
              Scottish region with coordinates, a gallery, a long-form introduction, and a collection of
              experiences. Attractions sit underneath destinations with their own page, their own gallery, and a
              set of categorisation tags.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Document type</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">destination</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Scottish regions with coordinates, gallery, experiences</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">attraction</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Points of interest nested under a parent destination</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">attractionTag</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Categories (e.g. Castles, Whisky, Natural Landscapes)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">itinerary</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Multi-stop tours referencing destinations and attractions</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">post</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Blog posts with Portable Text body</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">homepage / homepageSection</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Singleton with reorderable sections, font picker, pinned items</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">siteSettings</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Global: logo, contact details, social links</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
              The homepage is a singleton with a list of reorderable sections, each with its own heading, background
              image, text, and optional "pinned items" (featured destinations, attractions, or itineraries). There's
              also a heading font picker with five options — the client wanted some control over the look without
              needing a developer. The first section is always treated as the hero.
            </p>

            <p className="mb-8 text-justify">
              Itinerary stops are polymorphic: a single <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">stops</code> array
              that accepts references to either a destination or an attraction. On the frontend they're distinguished
              by type and routed accordingly — attractions construct their URL as{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/destinations/[destSlug]/[attractionSlug]</code>,
              destinations as <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/destinations/[slug]</code>.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Content SEO</h2>

            <p className="mb-4 text-justify">
              The content strategy is really where this site gets interesting. Each document type generates its own
              indexable page, which means a single "add destination" action in Sanity Studio creates a destination
              landing page, and adding attractions underneath it creates a page per attraction. Categorisation tags
              get their own pages too, listing all matching attractions. You end up with a natural hierarchy of
              location-specific content without any custom code per page.
            </p>

            <p className="mb-4 text-justify">
              Every document type exposes an <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">seo</code> field
              with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">metaTitle</code>,{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">metaDescription</code>, and{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ogImage</code>. If the client leaves them
              blank, the page falls back to a sensible auto-generated title based on the content. For destinations that
              template looks like "Private Scottish Tour [Title] | Bespoke Tours of Scotland" — not glamorous, but it
              hits the right keywords.
            </p>

            <p className="mb-8 text-justify">
              The point of having attractions, destinations, tags, and itineraries as separate first-class pages is that
              search intent varies a lot. Someone searching "castle tours Scotland" hits a tag page. Someone searching
              "Eilean Donan guided tour" should hit the attraction page. Someone searching "Highland private tour"
              hits a destination page. None of these require manual effort once the content structure is in place.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Technical SEO</h2>

            <p className="mb-4 text-justify">
              Each page generates its metadata with Next.js's <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">generateMetadata()</code> function,
              pulling from Sanity at request time. OpenGraph and Twitter card tags are included, with locale set to
              en-GB. Images are served from Sanity's CDN via <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">@sanity/image-url</code>,
              with LQIP blur placeholders from Sanity's metadata for fast perceived loading.
            </p>

            <p className="mb-4 text-justify">
              The more interesting part is structured data. Every page type gets appropriate JSON-LD, generated using
              the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">schema-dts</code> package for type safety:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Page</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Schema type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Homepage</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">WebSite + Organization</code></td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Destination pages</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">TouristDestination + BreadcrumbList</code></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Attraction pages</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">TouristAttraction</code></td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tag pages</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">CollectionPage + ItemList</code></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Itinerary pages</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">TouristTrip + ItemList of stops</code></td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Blog posts</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">BlogPosting</code> with datePublished, author as Organization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
              The sitemap is generated dynamically at <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/sitemap.ts</code>.
              It fetches every document with a slug from Sanity, constructs the correct URL per type, sets priority
              levels (1.0 for the homepage, 0.9 for list pages, 0.8 for destination detail, 0.7 for attractions and tags),
              and uses each document's <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">_updatedAt</code> timestamp
              for <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">lastModified</code>. As the client adds
              content in Sanity, it automatically appears in the sitemap within an hour (Next.js ISR with a 3600s
              revalidation window). No manual updates needed.
            </p>

            <p className="mb-8 text-justify">
              Security headers are set in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">next.config.ts</code>:
              HSTS, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">X-Frame-Options: DENY</code>, content
              type sniffing prevention, and a Content Security Policy that allows exactly the third-party domains the
              site actually uses (Google Analytics, Elfsight for reviews, TripAdvisor, OpenStreetMap tiles).
            </p>

            <h2 className="text-2xl mb-4 font-bold">Booking and Email</h2>

            <p className="mb-4 text-justify">
              The booking flow is built around a client-side tour builder. Visitors browse destinations and attractions
              and add them to a wishlist, stored in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">localStorage</code> via
              React Context. They can also add whole pre-built itineraries. On the booking page, the form pre-populates
              with everything they've selected, and they fill in dates, passenger numbers, pick-up and drop-off locations,
              and a free-text message.
            </p>

            <p className="mb-4 text-justify">
              Pick-up and drop-off are autocomplete fields backed by a JSON file of Scottish towns, with keyboard navigation
              and click-outside handling. Small detail, but it prevents the client receiving "Fort William" spelled
              seventeen different ways.
            </p>

            <p className="mb-4 text-justify">
              On submission, the form POST hits a Next.js API route that sends two emails via Resend simultaneously.
              The owner gets a structured HTML email with all the booking details: a table of customer info, the
              selected itineraries, the added destinations and attractions (with parent destination for context),
              and the message. The customer gets a confirmation email with their key booking details and a note
              that they'll hear back within 24 hours. All user input is HTML-escaped before it touches the email
              template.
            </p>

            <CodeBlock title="Sending both emails in parallel">
{`await Promise.all([
  resend.emails.send({
    from: 'Private Scottish Tour <bookings@privatescottishtour.com>',
    to: [process.env.CONTACT_EMAIL],
    subject: \`New Booking Request from \${name}\`,
    html: ownerEmailHtml,
  }),
  resend.emails.send({
    from: 'Private Scottish Tour <bookings@privatescottishtour.com>',
    to: [email],
    subject: "We've received your tour request - Private Scottish Tour",
    html: confirmationEmailHtml,
  }),
]);`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              There's also a map view at <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/booking/map</code>
              (excluded from robots.txt) that renders the current tour selection on a Leaflet map, with each
              destination and attraction plotted from the geopoint coordinates stored in Sanity. It's a nice way
              for a prospective client to visualise their itinerary before submitting.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Next.js App Router + Sanity CMS with 13 document types</li>
                <li>Location-based content hierarchy: destinations → attractions → tags, all with individual indexed pages</li>
                <li>JSON-LD structured data per page type (TouristDestination, TouristAttraction, TouristTrip, etc.)</li>
                <li>Dynamic sitemap pulling from Sanity with per-document lastModified timestamps</li>
                <li>Security headers including HSTS, CSP, and X-Frame-Options</li>
                <li>Client-side tour builder with localStorage persistence</li>
                <li>Resend email: owner notification + customer confirmation sent in parallel on booking submission</li>
                <li>Scottish towns autocomplete for pick-up/drop-off with keyboard navigation</li>
                <li>Leaflet map for visualising tour selections, keyed off Sanity geopoint coordinates</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default PrivateScottishTourProject
