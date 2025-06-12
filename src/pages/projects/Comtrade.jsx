import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { Wine } from 'lucide-react';
import { LiaGithub } from "react-icons/lia";

const ComtradeProject = () => {
  return (
    <Layout>
      <ContentBlock title="Wine Trade Data" icon={Wine} githubUrl="https://github.com/DrPrettyman/comtrade">
          
          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

            <p className="mb-4 text-justify">
              Living in Spain, where you can buy a bottle of wine for about €1 in the supermarket, I'm always shocked by the prices back in the UK. 
              But I'm also shocked by the origin of the wine. Here in Spain the vast majority is produced in-country, as you'd expect, but in the UK 
              it's from all over the world. Now I'm not expecting the shelves to be filled with Britsh wine (though it is becoming more common) but I would 
              hope to see a lot from our European wine-producing neighbours like France, Spain and Italy. Instead it seems that most (especially at the cheaper end of the spectrum)
              is imported from South Africa, Argentina, and especially Australia and New Zealand — literally the other side of the world. 
            </p>

            <p className="mb-8 text-justify">
              After a conversation (ok, a rant) with a relative about the environmental insanity of this antipodean alcohol addiction, it occured to me that this might 
              make a nice Data Viz project. I had the final product clear in my mind: an interactive map of the world which shows trade routes linking the countries. Click on France and 
              multiple lines spread across the globe showing the exports of French wine to various nations. 
            </p>
            
            <h2 className="text-2xl mb-4 font-bold">Finding and Cleaning the Data</h2>

            <p className="mb-4 text-justify">
              The first step, as always, is getting the data. It turns out that the UN's <a href='https://comtradeplus.un.org'>Comtrade database</a> has exactly what I wanted and is publically accessible. I wrote a Python script to 
              scrape the data from the Comtrade website and save as a csv. Unfortunately the countries are identified by UN M49 codes, rather than the more typical ISO-alpha codes ("USA", "FRA", etc.) 
              so I also scraped a conversion table from a different UN website to map the values. There was also some manual tinkering involved since the UN M49 codes differ slightly from the Comtrade ones,
              so I had to cross-reference some values. I also needed to know the HS commodity code for "Wine" (2204 by the way), so I scraped a json file from the Comtrade site which lists all of these codes.  
            </p>

            <p className="mb-4 text-justify">
              A quick inspection revealed that many exporter/importer combinations appear multiple times in the supposedly annually aggregated, with different associated values. Cross-referencing with 
              the GUI app on the comtrade site I found that the highest value is always the correct one, so I just had to group by exporter/importer and apply "max" to the values. I assume the lower values 
              are maybe those which are submitted part way through the year. 
            </p>

            <p className="mb-8 text-justify">
              So from this point I was able to group by exporter (using "sum") to see the total export value for each country, group by importer to see how much each country imported, or see 
              each exporter/importer pair individually, which is what I need to plot the trade route lines on the map. 
            </p>

            <h2 className="text-2xl mb-4 font-bold">Visualisation</h2>

            <p className="mb-4 text-justify">
              I have used many different Data Visualisation tools over the years, from oldschool XMGrace 
              which I ran on my old Linux machine to produce the charts in my academic papers and Ph.D. thesis,
              through the many fantastic python libraries (Plotly, Matplotlib, Seaborn), to custom Plotly charts 
              written in JavaScript and integrated into interactive Retool dashboards which formed the frontend 
              of <i>Macaroni</i>, the SaaS app I built whilst working at <i>Blink SEO</i>.
            </p>

            <p className="mb-4 text-justify">
              Of course, there's also Excel (and its imitators), which are always handy, Looker Studio (oh dear), and so many other low-code solutions, like Tableau. 
              I've used Tableau before but always returned to Python or JavaScript when I hit its limitations — but maybe I just wasn't giving it enough of a chance. 
              After all, it's a very popular business solution and people have made some very attractive visualisations on Tableau Public. So I gave it a go with this Comtrade data viz project.
            </p>

            <h3 className="text-lg mb-4 font-bold">Tableau</h3>

            <p className="mb-4 text-justify">
              Tableau looks great and promisses a lot, but I found it really difficult to get exactly what I wanted. I created a "sheet" with a map of countries coloured according to total exports, and 
              some buttons to switch to imports. So far so good. Now for the trade routes. After a lot of youtube, google and AI queries, I worked out that these could not be displayed on the same "sheet" as 
              the choropleth (coloured countries) map. So I created another sheet for the trade routes. Another (plain) world map, with just a load of lines. Dropping the two sheets into the same dashboard 
              I was able to set it up so that when I clicked on a country in Map 1, the associated trade routes would display on Map 2. Great. But I want them displayed on the same map! The obvious solution
              is to hide the map background in Map 2 and place it on top of Map 1, trying to align it exactly. It's inelegant and fiddly, but it sort-of works. It's the perfect alignment of the two 
              maps which is the real pain-point — very tricky and I just wish I had some more control! Over all I was not impressed by the experience and 
              decided to try doing the same thing with Python and Plotly. 
            </p>

            <h3 className="text-lg mb-4 font-bold">Plotly</h3>

            <p className="mb-4 text-justify">
              So 
            </p>

            <div className="my-6 bg-white rounded-lg">
              {/* <iframe 
                src="/documents/comtrade_wine_2023.html" 
                width="100%" 
                height="600" 
                style={{ border: 'none', borderRadius: '8px' }}
                title="Wine Trade Visualization"
              /> */}

              <iframe 
              src="/documents/comtrade_wine_2023.html" 
              width="100%" 
              style={{ 
                border: 'none', 
                borderRadius: '8px', 
                overflow: 'hidden',
                minHeight: '600px',
                height: 'auto'
              }}
              scrolling="no"
              title="Wine Trade Visualization"
              onLoad={(e) => {
                // Try to adjust height based on content (may not work due to cross-origin)
                try {
                  const iframe = e.target;
                  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
                } catch (error) {
                  // Fallback to fixed height if cross-origin restrictions apply
                  e.target.style.height = '800px';
                }
              }}
            />

            </div>

            <p className="mb-4 text-justify"></p>
            <h2 className="text-2xl mb-4 font-bold">What's the point of low-code?</h2>

            <p className="mb-4 text-justify">
              Once I'd got what I wanted using Plotly I tried asking Claude AI to do it, just to see what it would come up with. Actually very good! I even stole some ideas to go back and improve my own
              implementation. I just told Claude what data I had and what I wanted to acheive, and it did it. So that left me wondering: what's the point of Tableau in the age of AI?
            </p>

            <p className="mb-4 text-justify">
              I'm never a huge fan of low- and no-code solutions: there is always something you can't acheive and you end up thinking "I could do this myself in Python or JavaScript." But that's because I can, 
              and I know what's possible. For non-coders who just have a csv file, things like Looker or Tableau are lifesavers (I presume) and the lack of control is just the price you pay. You can always make 
              suggestions for new features in the next release and hope they listen.
            </p>

            <p className="mb-4 text-justify">
              But what with AI chatbots, surely anyone can code now? Can't anyone just tell Claude exactly what they want from a visualisation and get out a working Plotly Dash dashboard? Well, I'm not so sure it's that easy.
              It's still probablty a bit intimidating for complete non-coders, but I'll bet someone will make a nice UI for it. Just connect your database or upload your files (like with Tableau) then, instead of all 
              this clutter with a million different menus and widgets, just type in a description, or even upload a sketch. The backend connects to ChatGPT and in a few minutes you've got a perfect interactive dashboard! 
              I'm sure it's coming, if it's not already here. 
            </p>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default ComtradeProject
