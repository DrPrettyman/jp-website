import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { Eclipse } from 'lucide-react';

export const meta = () => generateMeta({ title: "PyEclipse", description: "An interactive data visualization of solar eclipse locations and intensities", path: "/projects/eclipse" });
import { LiaGithub } from "react-icons/lia";

const PyEclipseProject = () => {
  return (
    <Layout>
      <ContentBlock title="PyEclipse" icon={Eclipse} githubUrl="https://github.com/DrPrettyman/PyEclipse" maxWidth='4xl'>

        <div className="text-gray-700 dark:text-white">

          <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

          <p className="mb-4 text-justify">
            On the 12th of August 2026 the Moon's shadow sweeps across the north of Spain — the first total solar eclipse
            visible from mainland Spain since 1905. I live in the south, just outside the path of totality, and I wanted to
            know exactly what I'd get from my own back garden: how much of the Sun would be covered, and at what time of day.
            And once you start asking that question, the obvious follow-up is: when's the <i>next</i> one? If I miss this
            one behind a cloud, how long until I get another decent showing?
          </p>

          <p className="mb-8 text-justify">
            There are plenty of good eclipse resources online, but most of them are built around the path of totality —
            a thin ribbon across the map with everyone else left to guess. I wanted the opposite: pick any town, and get
            a list of every partial eclipse it will see over the next decade and a half, with the local time and the
            fraction of the solar disc obscured. A 65% partial eclipse is still very much worth stepping outside for, and
            nobody seems to tabulate those. So I wrote a small Python tool to do it, and a Plotly dashboard to explore
            the results.
          </p>

          <h2 className="text-2xl mb-4 font-bold">The Astronomy</h2>

          <p className="mb-4 text-justify">
            The heavy lifting is done by <a href='https://rhodesmill.org/skyfield/' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Skyfield</a>,
            which wraps JPL's DE421 ephemeris and gives you the apparent positions of the Sun and Moon from any point on
            Earth's surface. A solar eclipse can only happen at new moon, so for a given location and year the algorithm goes:
          </p>

          <ol className="mb-4 list-decimal list-inside space-y-2">
            <li className="text-justify">
              Find every new moon in the window using Skyfield's almanac routines (a discrete search on the Moon's phase angle).
            </li>
            <li className="text-justify">
              Throw away the ones that happen at night. For each new moon I compute the local sunrise and sunset and keep
              only the six-hour bracket around the new moon that overlaps daylight — no point checking an eclipse you
              can't see.
            </li>
            <li className="text-justify">
              Within each surviving window, minimise the angular separation between the apparent centres of the Sun and
              Moon. This is a simple coarse-to-fine line search — 30-minute steps, then 2-minute, then 10-second — which
              is more than accurate enough given the discs take over an hour to cross.
            </li>
            <li className="text-justify">
              Convert the apparent Sun–Earth and Moon–Earth distances into angular radii (<code>arcsin(R / d)</code> for
              each body). If the minimum separation is less than the sum of the two radii, the discs overlap and it's an
              eclipse at that location.
            </li>
            <li className="text-justify">
              Compute how much of the Sun is hidden from the geometry of two overlapping circles — the area of the
              circular–circular intersection divided by the area of the solar disc.
            </li>
          </ol>

          <p className="mb-8 text-justify">
            Timezones are resolved from the coordinates with <code>timezonefinder</code>, so every eclipse comes out
            stamped with the correct local time rather than UTC. The output is plain JSON: one record per location, each
            with a list of eclipse events (ISO datetime, minimum separation in degrees, and covered fraction). It's a
            geometric approximation — the discs are treated as perfect circles, and it ignores limb darkening, the
            Moon's rugged edge, and refraction close to the horizon — but for "should I take the afternoon off?" it's
            plenty.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Choosing Locations</h2>

          <p className="mb-4 text-justify">
            To build the map I needed a spread of points across the globe. I took the free
            {' '}<a href='https://simplemaps.com/data/world-cities' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">SimpleMaps world cities</a> dataset
            and wrote a small selection algorithm with an unapologetic European bias: 1–5 cities per European country
            depending on its land area, five cities each for the seven "big" countries (USA, Russia, China, Canada,
            Brazil, Australia, India), and a single city for every other country. A handful of hand-picked additions
            (Honolulu, Anchorage, Belfast, the Canaries) fill in places the population ranking would otherwise miss.
            That comes out at 279 locations.
          </p>

          <p className="mb-8 text-justify">
            The selection logic all lives in one file, so it's easy to swap in your own list — hand-pick observatory
            sites, use a regular lat/lon grid, or just add your home town. Running the finder over 2026–2040 for all 279
            locations produces just under 2,000 eclipse events.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Visualisation</h2>

          <p className="mb-4 text-justify">
            The dashboard is a single self-contained Plotly HTML file — Plotly loaded from a CDN, all the interactivity
            client-side, no Python backend needed to view it. It's two stacked panels: a <code>scattergeo</code> world
            map of the 279 locations on the bottom, and a bar chart on top. Click a city marker and a small injected
            JavaScript handler restyles the bar chart to that city's eclipses, with the date on the x-axis and the
            percentage of the Sun covered on the y-axis. The per-city data is precomputed into a lookup table and
            embedded in the page, so the click response is instant.
          </p>

          <p className="mb-4 text-justify">
            This is the same trick I used on my <a href="/projects/wine-exports-viz" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">wine trade</a> visualisation:
            Plotly's <code>write_html</code> takes a <code>post_script</code> argument that lets you attach a
            {' '}<code>plotly_click</code> listener to the exported figure, so you get genuinely interactive behaviour out
            of a static file. The result is below.
          </p>

          <div className="my-6 bg-white rounded-lg">
            <iframe
              src="/documents/eclipse_dashboard.html"
              width="100%"
              style={{
                border: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                minHeight: '900px',
                height: 'auto'
              }}
              scrolling="no"
              title="Solar Eclipse Dashboard"
              onLoad={(e) => {
                try {
                  const iframe = e.target;
                  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
                } catch (error) {
                  e.target.style.height = '900px';
                }
              }}
            />
          </div>

          <p className="mb-8 text-justify">
            You can open this visualisation <a href="/documents/eclipse_dashboard.html" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">directly in full-screen</a>,
            which is easier to use on a phone.
          </p>

          <h2 className="text-2xl mb-4 font-bold">What the Data Shows</h2>

          <p className="mb-4 text-justify">
            Every single one of the 279 locations sees at least two partial eclipses between 2026 and 2040, and most see
            six or more. Berlin does best with eleven. Partial eclipses are, it turns out, not rare at all once you stop
            insisting on totality — they're just poorly advertised.
          </p>

          <p className="mb-4 text-justify">
            And that August 2026 event really is the standout. It reads as a full 100% cover for Reykjavík, Valencia,
            Tunis and a swathe of locations in between — the shadow track runs from Greenland and Iceland down across the
            top of Spain and into the Mediterranean. If you're anywhere near that line next summer, it's worth the trip.
          </p>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default PyEclipseProject
