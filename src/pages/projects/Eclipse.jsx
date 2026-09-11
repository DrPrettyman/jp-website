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
            On the 12th of August 2026 there was a total solar eclipse over the north and east of Spain, the first one visible from the Spanish mainland since 1905. It was also visible from a very small part of the west of Iceland whilst the rest of Iceland, and the UK and Ireland, would have to make do with a "partial eclipse", so not complete darkness, just a but of dimness. However, everyone in the UK still got pretty excited and and started buying up special eclipse glasses to observe the event which promised "90% coverage". 
          </p>

          <p>  
            I, like many others, was surprised at how little visible effect a 90% eclipse actually had. I barely noticed it get any darker in Sheffield (UK), certainly not 90% darker, although through the eclipse glasses I could see that the sun was, indeed, mostly covered by the moon. I guess 10% of the sun is still pretty bright. This got me thinking that there must be partial eclipses with under 90% coverage all the time that nobody even notices: if the sun was just 30% obscured you'd have no idea, judging by the brightness of the day, but it would still be pretty cool to see directly (now we all have a pair of special glasses).  
          </p>

          <p className="mb-4 text-justify">
            So when is the next partial eclipse? This turns out to be a surprisingly annoying question to answer. Every eclipse site I found is built around "The Path of Totality": a thin band drawn across a map, and also a cool title for a Kung Fu movie. There's not really anything to tell you when the next 30% partial eclipse will be. I wanted a list of all the upcoming eclipse events for Sheffield, whatever the coverage. Turns out there have been loads during my lifetime, about one every two years. There will be a 36% one next August (2027) and then a 55% in January 2028. You can find this information online if you look, but it's usually a list of partial eclipses by country (and the coverage can vary quite a bit from one end of a country to the other). I thought it would be cool to have something a bit more visual and interactive. 
          </p>

          <h2 className="text-2xl mb-4 font-bold">Finding the Eclipses</h2>

          <p className="mb-4 text-justify">
            The astronomy is all done by <a href='https://rhodesmill.org/skyfield/' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Skyfield</a>, which
            wraps up JPL's planetary ephemeris and will hand you the apparent position of the Sun and the Moon as seen from
            any point on the Earth's surface. From there the logic is fairly obvious. A solar eclipse can only happen at a
            new moon, so I take every new moon in the range, put a six-hour window either side of it, and then throw away
            any part of that window when the Sun is below the horizon — which means also working out the sunrise and sunset
            times for the location and intersecting the two sets of intervals. Whatever survives is a stretch of time when
            the Moon is roughly between us and the Sun, and the Sun is actually up.
          </p>

          <p className="mb-4 text-justify">
            Then I need the moment of closest approach. The angular separation between the two discs dips to a minimum
            somewhere inside that window, which is a one-dimensional minimisation and there are perfectly good libraries
            for it, but I wrote a crude one instead: step forwards in 30 minute intervals until the separation starts
            increasing again, back up one step, repeat with 2 minutes, then again with 10 seconds. Not elegant, but the
            function is smooth and has a single trough over a few hours so it can't really go wrong, and 10 seconds is
            finer than anything I care about.
          </p>

          <p className="mb-4 text-justify">
            The rest is geometry, which is the fun bit. Skyfield gives you the distance to each body, so the apparent
            angular radius of each is just <code>arcsin(R/d)</code> — about a quarter of a degree for both, which is the
            famous coincidence that makes total eclipses possible in the first place. If the minimum separation comes out
            less than the two radii added together then the discs overlap and there's an eclipse. How much of the Sun is
            covered is then the area of intersection of two circles divided by the area of the solar disc, which is a
            standard bit of circular-segment algebra and the only part of this project where I got to use a pen.
          </p>

          <p className="mb-8 text-justify">
            All of which is an approximation. It treats both bodies as perfect discs, so it ignores the fact that the edge
            of the Moon is mountainous, and it does nothing about atmospheric refraction near the horizon. For deciding
            whether to take an afternoon off, it's fine.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Choosing the Locations</h2>

          <p className="mb-4 text-justify">
            I needed somewhere to point all this. <a href='https://simplemaps.com/data/world-cities' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">SimpleMaps</a> publish
            a free world cities file with coordinates and populations, so I wrote something to pick a spread out of it,
            heavily weighted towards Europe because that's where I am. European countries get between one and five cities
            depending on land area. The seven countries that are too big to sum up with a single city — Russia, Canada,
            the USA, China, Brazil, Australia, India — get five each. Everywhere else gets its largest city and that's it,
            which is obviously unfair on Indonesia, but there we are.
          </p>

          <p className="mb-4 text-justify">
            There's also a short hard-coded list of places I wanted in regardless of what the population ranking said:
            Sheffield, Belfast, Edinburgh, Cardiff (which the dataset insists on calling Caerdydd), Málaga, Santa Cruz,
            Honolulu and Anchorage. Some of those are there to cover awkward corners of the map and some are there because
            I wanted to know. That gives 279 locations in total.
          </p>

          <p className="mb-8 text-justify">
            Running the finder over all of them for 2026 to 2040 takes a while. Long enough, anyway, that I had the script
            print its progress and append each city to a JSONL file as it went rather than hold the lot in memory and write
            it out at the end, which is the sort of precaution you only start taking after you've lost a long run to a silly
            error once. The finished file has 1,976 eclipses in it.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Visualisation</h2>

          <p className="mb-4 text-justify">
            After the Tableau experiment on my <a href="/projects/wine-exports-viz" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">wine trade project</a> I
            felt no particular urge to repeat it, so this is Plotly again. Two stacked subplots: a <code>scattergeo</code> world
            map underneath with all 279 locations marked on it, and an empty bar chart sitting on top. Click a city and the
            bar chart fills in with that city's eclipses, date along the bottom and percentage of the Sun covered up the side.
          </p>

          <p className="mb-4 text-justify">
            The clicking is the same trick as last time. Plotly's <code>write_html</code> takes a <code>post_script</code> argument,
            so you can staple a bit of JavaScript onto the exported figure — here it's a <code>plotly_click</code> listener
            and a lookup table with all 279 cities baked into it, which restyles the bar trace whenever a marker is clicked.
            The result is one self-contained HTML file with nothing running behind it, which I like a lot.
          </p>

          <p className="mb-4 text-justify">
            The one genuinely irritating part was the width of the bars. Plotly wants it in milliseconds, and if you pick
            a value that's too big then two eclipses a few weeks apart merge into a single block. So the script now goes
            through every city first, finds the smallest gap between consecutive eclipses anywhere in the dataset, and uses
            that as the width, capped at 90 days. Somewhat overengineered for the sake of about four cities.
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

          <p className="mb-4 text-justify">
            You can open it <a href="/documents/eclipse_dashboard.html" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">directly in full-screen</a> if
            it's fiddly, which it will be on a phone.
          </p>

          <p className="mb-8 text-justify">
            Clicking around, the thing that surprised me is that nowhere does badly. Every one of the 279 locations gets at
            least two eclipses between now and 2040, most get six or more, and Berlin somehow gets eleven. Partial eclipses
            aren't rare at all, they're just not news. August 2026 shows up as a full 100% bar for Reykjavík, Valencia and
            Tunis, which gives you a decent sense of where the shadow goes: down past Greenland and Iceland, across the top
            of Spain and out into the Mediterranean.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Doing it the Hard Way</h2>

          <p className="mb-4 text-justify">
            What my method really amounts to, when you strip it back, is moving a clock hand forwards ten seconds at a time
            and looking up to see whether the Sun has gone out yet. It works because I have a computer and the computer
            doesn't get bored.
          </p>

          <p className="mb-4 text-justify">
            The Babylonians managed the same job without one. They spotted that eclipses repeat on a cycle of about 18 years,
            11 days and 8 hours — the Saros — which means you can predict the next one from a list of the last ones without
            knowing anything at all about angular radii or ephemerides. The eight hours is the good part: it's a third of a
            day, so by the time the cycle comes round the Earth has turned another 120°, and the repeat eclipse lands a third
            of the way further west. Wait three Saroses, about 54 years, and it comes back round to roughly where it started.
          </p>

          <p className="mb-4 text-justify">
            Two and a half thousand years of astronomy, then, and my contribution is to check every ten seconds.
          </p>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default PyEclipseProject
