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
            On the 12th of August 2026 there was a total solar eclipse over the north and east of Spain, the first one visible from the Spanish mainland since 1905. It was also visible from a very small part of the west of Iceland whilst the rest of Iceland, and the UK and Ireland, would have to make do with a "partial eclipse", so not complete darkness, just a bit of dimness. However, everyone in the UK still got pretty excited and started buying up special eclipse glasses to observe the event which promised "90% coverage". 
          </p>

          <p className="mb-4 text-justify">
            I, like many others, was surprised at how little visible effect a 90% eclipse actually had. I barely noticed it get any darker in Sheffield (UK), certainly not 90% darker, although through the eclipse glasses I could see that the sun was, indeed, mostly covered by the moon. I guess 10% of the sun is still pretty bright. This got me thinking that there must be partial eclipses with under 90% coverage all the time that nobody even notices: if the sun was just 30% obscured you'd have no idea, judging by the brightness of the day, but it would still be pretty cool to see directly (now we all have a pair of special glasses).  
          </p>

          <p className="mb-4 text-justify">
            So when is the next partial eclipse? This turns out to be a surprisingly annoying question to answer. Every eclipse site I found is built around "The Path of Totality": a thin band drawn across a map, and also a cool title for a Kung Fu movie. There's not really anything to tell you when the next 30% partial eclipse will be. I wanted a list of all the upcoming eclipse events for Sheffield, whatever the coverage. Turns out there have been loads during my lifetime, about one every two years. There will be a 36% one next August (2027) and then a 51% in January 2028. You can find this information online if you look, but it's usually a list of partial eclipses by country (and the coverage can vary quite a bit from one end of a country to the other). I thought it would be cool to have something a bit more visual and interactive. 
          </p>

          <h2 className="text-2xl mb-4 font-bold">Finding the Eclipses</h2>

          <p className="mb-4 text-justify">
            The astronomy is all done by <a href='https://rhodesmill.org/skyfield/' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Skyfield</a>, which wraps up JPL's planetary ephemeris and will hand you the apparent position of the Sun and the Moon as seen from any point on the Earth's surface. From there the logic is fairly obvious. A solar eclipse can only happen at a new moon, so I take every new moon in the range, put a six-hour window either side of it, and then throw away any part of that window when the Sun is below the horizon — which means also working out the sunrise and sunset times for the location and intersecting the two sets of intervals. Whatever survives is a stretch of time when the Moon is roughly between us and the Sun, and the Sun is actually up.
          </p>

          <p className="mb-4 text-justify">
            Then I need the moment of closest approach. The angular separation between the two discs dips to a minimum somewhere inside that window, which is a one-dimensional minimisation and there are perfectly good libraries for it, but I wrote a crude one instead: step forwards in 30 minute intervals until the separation starts increasing again, back up one step, repeat with 2 minutes, then again with 10 seconds. Not elegant, but the function is smooth and has a single trough over a few hours so it can't go wrong, and 10 seconds is finer than anything I care about.
          </p>

          <p className="mb-4 text-justify">
            The rest is geometry, which is the fun bit. Skyfield gives you the distance to each body, so the apparent angular radius of each is just <code>arcsin(R/d)</code> — about a quarter of a degree for both, which is the famous coincidence that makes total eclipses possible in the first place. If the minimum separation comes out less than the two radii added together then the discs overlap and there's an eclipse. How much of the Sun is covered is then the area of intersection of two circles divided by the area of the solar disc, which is a standard bit of circular-segment algebra and the only part of this project where I had to use a pencil and paper.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Choosing the Locations</h2>

          <p className="mb-4 text-justify">
            So I used my little script to give me a list for Sheffield but that felt a bit underwhelming after two hours of faff, so why not do it for lots of locations? Then I get to make it a dashboard with a world map as a location picker (I like maps).   
          </p>

          <p className="mb-4 text-justify">
            <a href='https://simplemaps.com/data/world-cities' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">SimpleMaps</a> publish a free world cities file with coordinates, areas and populations, so I wrote something to pick a spread out of it, heavily weighted towards Europe because that's where I am. European countries get between one and five cities depending on land area. The seven countries that are too big to sum up with a single city — Russia, Canada, the USA, China, Brazil, Australia, India — get five each. Everywhere else gets its largest city and that's it. I also hardcoded Belfast, Edinburgh, Cardiff (Caerdydd) and a few others. My Europe-centric system is obviously unfair on Indonesia, but there you go. If you want, you can clone the repo, add every town in Indonesia and re-run.
          </p>

          <p className="mb-8 text-justify">
            I ended up with 279 cities spread across the world and 1,976 eclipse events.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Visualisation</h2>

          <p className="mb-4 text-justify">
            Plotly again. Two stacked subplots: a <code>scattergeo</code> world map underneath with all 279 locations marked on it, and an empty bar chart sitting on top. Click a city and the
            bar chart fills in with that city's eclipses, date on the x-axis and percentage coverage on the y-axis.
          </p>

          <p className="mb-4 text-justify">
            The one irritating part was the width of the bars: if you pick a value that's too big then two eclipses a few weeks apart merge into a single block. So the script now goes through every city first, finds the smallest gap between consecutive eclipses anywhere in the dataset, and uses that as the width, capped at 90 days. Somewhat overengineered for the sake of about four cities.
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
            You can open it <a href="/documents/eclipse_dashboard.html" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">directly in full-screen</a> if it's fiddly, which it will be on a phone.
          </p>

          <p className="mb-8 text-justify">
            Clicking around, it seems nowhere does badly. Every one of the 279 locations gets at least two eclipses between now and 2040, most get six or more, and Berlin somehow gets eleven. Partial eclipses aren't rare at all, they're just not news. August 2026 shows up as a full 100% bar for Reykjavík, Valencia and Tunis, which gives you a decent sense of where the shadow goes: down past Iceland, across the top of Spain and out into the Mediterranean.
          </p>

          <p className="mb-4 text-justify">
            So have a look at the list for your own location and go observe some partial eclipses, with proper eye-wear. That 30% eclipse won't be on the news so nobody else will know about it and you'll be sat in the park staring directly at the sun with weird dark glasses. They'll think you're crazy but you'll be like "Wow, 30% of the sun is obscured by the moon, what a time to be alive!"
          </p>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default PyEclipseProject
